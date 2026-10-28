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
  'Parc d\'Activités du Mas de Grille et La Lauze (Saint-Jean-de-Védas)',
  'Pôle tertiaire Port Marianne, Antigone et Bassin Jacques Cœur',
  'Parc d\'Activités de Lattes, Maurin, Boirargues et Vasconia',
  'Zone commerciale et tertiaire de Pérols et Sud de France Arena',
  'Villeneuve-lès-Maguelone, Mireval et Vic-la-Gardiole',
  'Pôle Euromédecine et Parc 2000 (Montpellier Nord / Hôpitaux-Facultés)',
  'Ecoparc et Parcs d\'Activités de Saint-Aunès, Vendargues et Baillargues',
  'Domaines viticoles, Châteaux et Mas de réceptions de mariage (Pic Saint-Loup : Saint-Mathieu-de-Tréviers, Assas, Valflaunès)',
  'Lieux de réception et domaines de mariage (Vallée de l\'Hérault : Gignac, Aniane, Montpeyroux)',
  'Domaines et châteaux de mariage autour du Bassin de Thau (Mèze, Bouzigues, Loupian, Marseillan)',
  'Domaines et mas de charme pour séminaires et mariages (Pézenas et Biterrois)',
  'Centres de coworking, tiers-lieux et incubateurs (The Babel Community, Halle Tropisme, Le Réservoir, Start Way, WIGI)',
  'Pépinières d\'entreprises innovantes et French Tech (Cap Alpha, Cap Omega, MIBI)',
  'Agences événementielles, agences de communication et wedding planners de l\'Hérault',
  'Cabinets d\'avocats d\'affaires, experts-comptables et cabinets de conseil de Montpellier',
  'Entreprises du BTP, promoteurs immobiliers et architectes de la Métropole',
  'Concessions automobiles, concessions motos et bateaux (Route de la Mer, Garosud, Castelnau)',
  'Clubs de padel, complexes sportifs indoor, tennis et golfs (Massane, Fontcaude, 4Padel, My Center Padel)',
  'Cliniques privées, centres médicaux et sièges de mutuelles / santé (Occitanie)',
  'Écoles supérieures privées, campus étudiants et BDE de Montpellier',
  'Hôtels 3*, 4*, 5* et résidences hôtelières séminaires de Montpellier et du littoral',
  'Parcs d\'activités de Juvignac, Saint-Georges-d\'Orques et Grabels',
  'Parcs d\'activités de Jacou, Clapiers, Montferrier-sur-Lez et Prades-le-Lez',
  'Zone artisanale et commerciale de Castries et Lunel',
  'Sièges sociaux agroalimentaires et coopératives viticoles de l\'Hérault',
  'Agences immobilières de prestige et conciergeries haut de gamme (Littoral & Métropole)',
  'Agences web, studios digitaux et startups du digital de Montpellier'
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
  count: number = 8,
  excludeCompanies: string[] = []
): Promise<Partial<ProspectLead>[]> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY non configurée dans .env.local')
  }

  const selectedZone = zone || MONTPELLIER_ZONES[Math.floor(Math.random() * MONTPELLIER_ZONES.length)]
  const catInstruction = category 
    ? `Cible exclusivement la catégorie : ${category}.`
    : `Varie les profils : entreprises de 15 à 250 salariés (afterworks, déjeuners d'équipe), domaines de mariage/réception (lendemains de mariage, brunch retour de noces), coworkings et tiers-lieux.`

  const exclusionText = excludeCompanies.length > 0
    ? `\nIMPORTANT : Exclus STRICTEMENT les entreprises suivantes déjà enregistrées pour éviter tout doublon :\n${excludeCompanies.slice(-50).join(', ')}\n`
    : ''

  const prompt = `
Tu es un agent expert en prospection B2B spécialisé dans le tissu économique réel de Montpellier et de l'Hérault (Occitanie).
Zone ciblée : "${selectedZone}".
${catInstruction}
${exclusionText}

Trouve ${count} entreprises, domaines de mariage ou coworkings réels situés dans cette zone ou la métropole de Montpellier qui ont un potentiel fort pour privatiser un Foodtruck traiteur gourmet (afterwork, séminaire d'entreprise, lendemain de mariage/retour de noces, animation parvis).

Pour chaque entité, fournis :
- "company": Le nom officiel de l'entreprise ou du domaine (exclus toute entité déjà citée)
- "email": L'email de contact public ou de direction (ex: contact@..., evenements@..., direction@..., bonjour@...)
- "contactName": Titre ou fonction du contact idéal (ex: "Office Manager", "Responsable CSE", "Direction Événements", "Propriétaire du domaine")
- "category": STRICTEMENT une de ces 3 valeurs : "entreprise", "domaine", "coworking"
- "location": Ville précise ou zone (ex: "Montpellier (Millénaire)", "Castelnau-le-Lez", "Villeneuve-lès-Maguelone", "Pérols")
- "description": 1 phrase percutante expliquant leur besoin d'un foodtruck gourmet (ex: "50 collaborateurs, recherche d'une formule burgers gourmets sans contrainte logistique").

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

  const modelsToTry = [
    'gemini-3.1-flash-lite-preview',
    'gemini-2.5-flash',
    'gemini-flash-latest'
  ]

  let rawText = ''
  let lastError = ''

  for (const model of modelsToTry) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      })

      if (res.ok) {
        const data = await res.json()
        rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
        if (rawText) break
      } else {
        lastError = await res.text()
      }
    } catch (e: any) {
      lastError = e.message
    }
  }

  if (!rawText) {
    console.error('Erreur scraping Gemini sur tous les modèles:', lastError)
    return []
  }

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

  const leads = getLeads()
  const existingCompanies = leads.map(l => l.company)
  const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))
  const existingNames = new Set(leads.map(l => l.company.toLowerCase().trim()))

  logs.push(`🔍 [1/3] Gemini explore la zone : "${zone}" (avec exclusion des entreprises déjà connues)...`)
  const discovered = await scrapeLeadsWithGemini(zone, options?.category, scrapeCount, existingCompanies)
  logs.push(`✨ ${discovered.length} structures locales identifiées par Gemini.`)

  let addedCount = 0
  const newlyAddedLeads: ProspectLead[] = []

  for (const item of discovered) {
    if (!item.company || !item.email || !item.email.includes('@')) continue
    const cleanEmail = item.email.toLowerCase().trim()
    const cleanName = item.company.toLowerCase().trim()

    // DÉDUPLICATION STRICTE (email ET nom de société)
    if (existingEmails.has(cleanEmail) || existingNames.has(cleanName)) continue

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
    existingNames.add(cleanName)
    addedCount++
  }

  saveLeads(leads)
  logs.push(`💾 [2/3] Base actualisée : +${addedCount} nouveaux prospects qualifiés enregistrés. (Total base: ${leads.length})`)

  let sentCount = 0
  const readyQueue = leads.filter(l => l.status === 'ready')

  if (sendImmediately && readyQueue.length > 0) {
    const toSend = readyQueue.slice(0, maxSend)
    logs.push(`🚀 [3/3] Rédaction par Gemini & expédition par Resend pour ${toSend.length} prospects en attente...`)

    for (let i = 0; i < toSend.length; i++) {
      const lead = toSend[i]
      try {
        logs.push(`📝 [${i + 1}/${toSend.length}] Rédaction sur-mesure pour ${lead.company}...`)
        const generated = await generateProspectEmailWithGemini(lead)
        
        logs.push(`✉️ Expédition mail officiel à ${lead.email} ("${generated.subject}")...`)
        await sendOutboundEmail(lead.email, generated.subject, generated.body, lead)

        lead.status = 'contacted'
        lead.lastContactDate = new Date().toISOString()
        lead.generatedEmail = {
          subject: generated.subject,
          body: generated.body,
          generatedAt: new Date().toISOString()
        }
        sentCount++
        saveLeads(leads)
        logs.push(`✅ Succès pour ${lead.company}`)
      } catch (err: any) {
        logs.push(`❌ Échec pour ${lead.company}: ${err.message}`)
        lead.status = 'replied' // Marqué pour ne pas bloquer la file
        saveLeads(leads)
      }
      // Pause de courtoisie de 3 secondes
      await new Promise(r => setTimeout(r, 3000))
    }
  } else {
    logs.push(`ℹ️ Aucun prospect en attente d'envoi ou envoi désactivé.`)
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
