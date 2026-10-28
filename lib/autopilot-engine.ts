import fs from 'fs'
import path from 'path'
import { ProspectLead, generateProspectEmailWithGemini, formatOutboundEmailHTML } from './prospect-engine'

// Charge les variables d'environnement depuis .env.local si non définies
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  if (!process.env.RESEND_API_KEY) {
    const match = envContent.match(/RESEND_API_KEY=["']?([^"'\n\r]+)["']?/)
    if (match) process.env.RESEND_API_KEY = match[1]
  }
  if (!process.env.GEMINI_API_KEY) {
    const match = envContent.match(/GEMINI_API_KEY=["']?([^"'\n\r]+)["']?/)
    if (match) process.env.GEMINI_API_KEY = match[1]
  }
}

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')
const RESEND_API_KEY = process.env.RESEND_API_KEY
const SENDER_EMAIL = 'La Confrérie Foodtruck <contact@laconfrerietruck.fr>'

export const MONTPELLIER_ZONES = [
  'Parc Scientifique et Technologique du Millénaire (Montpellier)',
  'Parc d\'Activités Eurêka et Castelnau-le-Lez',
  'Parc d\'Activités Fréjorgues Ouest et Est (Mauguio / Aéroport)',
  'Zone d\'Activités Garosud et Tournezy (Montpellier Sud)',
  'Parc d\'Activités du Mas de Grille (Saint-Jean-de-Védas)',
  'Pôle tertiaire Port Marianne, Antigone et Bassin Jacques Cœur',
  'Parc d\'Activités de Lattes, Maurin et Boirargues',
  'Parc d\'Activités de Pérols et littoral Palavas-les-Flots',
  'Villeneuve-lès-Maguelone, Mireval et Vic-la-Gardiole',
  'Pôle Euromédecine et Parc 2000 (Montpellier Nord / Hôpitaux-Facultés)',
  'Parc d\'Activités de Saint-Aunès, Vendargues et Baillargues',
  'Domaines viticoles, Châteaux et Mas de réceptions de mariage (Hérault / Pic Saint-Loup)',
  'Lieux de réception et domaines de mariage (Vallée de l\'Hérault et Bassin de Thau)',
  'Centres de coworking, pépinières et incubateurs de la Métropole de Montpellier',
  'Agences événementielles, agences de communication et d\'incentive de Montpellier',
  'Zone d\'Activités de Jacou, Clapiers et Montferrier-sur-Lez'
]

function getLeads(): ProspectLead[] {
  if (!fs.existsSync(DATA_PATH)) return []
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function saveLeads(leads: ProspectLead[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

export async function scrapeLeadsWithGemini(
  zone?: string,
  category?: 'entreprise' | 'domaine' | 'coworking',
  count: number = 8
): Promise<Partial<ProspectLead>[]> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY non configurée dans .env.local')
  }

  const selectedZone = zone || MONTPELLIER_ZONES[Math.floor(Math.random() * MONTPELLIER_ZONES.length)]
  const catInstruction = category 
    ? `Cible exclusivement la catégorie : ${category}.`
    : `Varie les profils : entreprises de 15 à 200 salariés (afterworks), domaines de mariage/réception (lendemains de mariage), coworkings.`

  const prompt = `
Tu es un agent d'exploration B2B spécialisé dans le tissu économique de Montpellier et de l'Hérault (Occitanie).
Zone ciblée : "${selectedZone}".
${catInstruction}

Trouve ${count} entreprises, domaines de mariage ou coworkings réels situés dans cette zone ou la métropole de Montpellier qui ont un potentiel pour privatiser un Foodtruck traiteur gourmet (afterwork, séminaire, retour de noces, animation parvis).

Pour chaque entité, fournis :
- "company": Le nom officiel de l'entreprise ou du domaine
- "email": L'email de contact public ou vraisemblable (ex: contact@..., evenements@..., bonjour@...)
- "contactName": Titre ou nom du contact idéal (ex: "Office Manager", "Responsable CSE", "Direction Événements")
- "category": STRICTEMENT une de ces 3 valeurs : "entreprise", "domaine", "coworking"
- "location": Ville précise ou zone (ex: "Montpellier (Millénaire)", "Castelnau", "Villeneuve-lès-Maguelone")
- "description": 1 phrase percutante expliquant pourquoi ils ont besoin d'un foodtruck gourmet (ex: "60 collaborateurs, friands d'afterworks sans logistique").

Réponds STRICTEMENT sous forme d'un tableau JSON pur sans aucun texte introductif :
[
  {
    "company": "...",
    "email": "...",
    "contactName": "...",
    "category": "...",
    "location": "...",
    "description": "..."
  }
]
`

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Erreur Gemini Scraping (${res.status}): ${errorText}`)
  }

  const data = await res.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) return []

  try {
    const parsed = JSON.parse(rawText)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Erreur parsing JSON scraper:', e)
    return []
  }
}

async function sendOutboundEmail(to: string, subject: string, bodyText: string, lead?: Partial<ProspectLead>) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY non configurée.')
  }

  const htmlBody = formatOutboundEmailHTML(bodyText, lead)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to,
      subject,
      html: htmlBody,
      reply_to: 'contact@laconfrerietruck.fr'
    })
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Erreur Resend (${res.status}): ${errText}`)
  }

  return await res.json()
}

export interface AutopilotResult {
  zoneExplored: string
  scrapedCount: number
  newLeadsAdded: number
  sentCount: number
  logs: string[]
}

export async function runAutopilotCycle(options?: {
  zone?: string
  category?: 'entreprise' | 'domaine' | 'coworking'
  scrapeCount?: number
  sendImmediately?: boolean
  maxSendLimit?: number
}): Promise<AutopilotResult> {
  const logs: string[] = []
  const scrapeCount = options?.scrapeCount || 8
  const maxSend = options?.maxSendLimit || 5
  const sendImmediately = options?.sendImmediately ?? true
  const zone = options?.zone || MONTPELLIER_ZONES[Math.floor(Math.random() * MONTPELLIER_ZONES.length)]

  logs.push(`🔍 [1/3] Gemini explore la zone : "${zone}"...`)
  const discovered = await scrapeLeadsWithGemini(zone, options?.category, scrapeCount)
  logs.push(`✨ ${discovered.length} structures locales identifiées par Gemini.`)

  const leads = getLeads()
  const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))
  let addedCount = 0
  const newlyAddedLeads: ProspectLead[] = []

  for (const item of discovered) {
    if (!item.company || !item.email || !item.email.includes('@')) continue
    const cleanEmail = item.email.toLowerCase().trim()
    if (existingEmails.has(cleanEmail)) continue

    const newLead: ProspectLead = {
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      company: item.company.trim(),
      contactName: item.contactName?.trim(),
      email: cleanEmail,
      category: item.category || 'entreprise',
      location: item.location?.trim() || 'Montpellier',
      description: item.description?.trim() || 'Prospect sourcé automatiquement par Gemini.',
      status: 'ready',
      lastContactDate: null
    }

    leads.push(newLead)
    newlyAddedLeads.push(newLead)
    existingEmails.add(cleanEmail)
    addedCount++
  }

  saveLeads(leads)
  logs.push(`💾 [2/3] Base actualisée : +${addedCount} nouveaux prospects qualifiés enregistrés.`)

  let sentCount = 0
  if (sendImmediately && addedCount > 0) {
    const toSend = newlyAddedLeads.slice(0, maxSend)
    logs.push(`🚀 [3/3] Rédaction par Gemini & envoi automatique par Resend pour ${toSend.length} prospects...`)

    for (let i = 0; i < toSend.length; i++) {
      const lead = toSend[i]
      try {
        logs.push(`📝 Rédaction sur-mesure pour ${lead.company}...`)
        const generated = await generateProspectEmailWithGemini(lead)
        
        logs.push(`✉️ Envoi du mail officiel avec logo et visuels à ${lead.email}...`)
        await sendOutboundEmail(lead.email, generated.subject, generated.body, lead)

        lead.status = 'contacted'
        lead.lastContactDate = new Date().toISOString()
        lead.generatedEmail = {
          subject: generated.subject,
          body: generated.body,
          generatedAt: new Date().toISOString()
        }
        sentCount++
        logs.push(`✅ Succès pour ${lead.company}`)
      } catch (err: any) {
        logs.push(`❌ Échec pour ${lead.company}: ${err.message}`)
      }
      // Pause anti-spam de 2.5 secondes
      await new Promise(r => setTimeout(r, 2500))
    }

    saveLeads(leads)
  } else {
    logs.push(`ℹ️ Envoi automatique désactivé ou aucun nouveau lead. Les prospects restent au statut "Prêt".`)
  }

  logs.push(`🎉 Cycle Autopilot terminé avec succès !`)

  return {
    zoneExplored: zone,
    scrapedCount: discovered.length,
    newLeadsAdded: addedCount,
    sentCount,
    logs
  }
}
