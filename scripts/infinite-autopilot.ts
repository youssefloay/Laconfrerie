import fs from 'fs'
import path from 'path'

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

import { 
  scrapeLeadsWithGemini, 
  MONTPELLIER_ZONES 
} from '../lib/autopilot-engine'
import { 
  ProspectLead, 
  generateProspectEmailWithGemini, 
  formatOutboundEmailHTML 
} from '../lib/prospect-engine'

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')
const RESEND_API_KEY = process.env.RESEND_API_KEY
const SENDER_EMAIL = 'La Confrérie Foodtruck <contact@laconfrerietruck.fr>'

function getLeads(): ProspectLead[] {
  if (!fs.existsSync(DATA_PATH)) return []
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function saveLeads(leads: ProspectLead[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

async function sendEmailViaResend(to: string, subject: string, bodyText: string, lead?: Partial<ProspectLead>) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY non configurée.')

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
    throw new Error(`Resend (${res.status}): ${errText}`)
  }

  return await res.json()
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runInfiniteAutopilot() {
  console.clear()
  console.log('🔥 ======================================================================')
  console.log('   AGENT AUTOPILOT NON-STOP LA CONFRÉRIE (SCRAPING + ENVOI EN CONTINU)   ')
  console.log('======================================================================\n')
  console.log('⚡️ Mode : Continu sans interruption')
  console.log('🛡️ Règle : Zéro duplication (historique conservé dans data/prospects.json)')
  console.log('⏱️ Pause de sécurité : 15 secondes entre chaque email (protection réputation domaine)')
  console.log('🛑 Pour arrêter : Appuie sur Ctrl + C à tout moment.\n')

  let totalSentSession = 0
  let totalDiscoveredSession = 0
  let cycleIndex = 0

  while (true) {
    cycleIndex++
    const currentZone = MONTPELLIER_ZONES[(cycleIndex - 1) % MONTPELLIER_ZONES.length]

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📍 [CYCLE #${cycleIndex}] Exploration de la zone : "${currentZone}"`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    let discovered: Partial<ProspectLead>[] = []
    try {
      console.log(`🤖 Gemini recherche de nouvelles structures réelles...`)
      discovered = await scrapeLeadsWithGemini(currentZone, undefined, 6)
      console.log(`✨ ${discovered.length} cibles identifiées par Gemini dans cette zone.`)
    } catch (err: any) {
      console.error(`⚠️ Erreur de scraping sur cette zone (${err.message}). Pause de 10s et suite...`)
      await sleep(10000)
      continue
    }

    const leads = getLeads()
    const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))
    const existingNames = new Set(leads.map(l => l.company.toLowerCase().trim()))

    let newLeads: ProspectLead[] = []

    for (const item of discovered) {
      if (!item.company || !item.email || !item.email.includes('@')) continue
      const cleanEmail = item.email.toLowerCase().trim()
      const cleanName = item.company.toLowerCase().trim()

      // DÉDUPLICATION STRICTE (email ET nom de société)
      if (existingEmails.has(cleanEmail) || existingNames.has(cleanName)) {
        console.log(`⏭️ Déjà en base : ${item.company} (${cleanEmail}) — ignoré.`)
        continue
      }

      const newLead: ProspectLead = {
        id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        company: item.company.trim(),
        contactName: item.contactName?.trim(),
        email: cleanEmail,
        category: item.category || 'entreprise',
        location: item.location?.trim() || currentZone.split('(')[0].trim(),
        description: item.description?.trim() || 'Sourcé automatiquement par Gemini.',
        status: 'ready',
        lastContactDate: null
      }

      leads.push(newLead)
      newLeads.push(newLead)
      existingEmails.add(cleanEmail)
      existingNames.add(cleanName)
    }

    saveLeads(leads)
    totalDiscoveredSession += newLeads.length
    console.log(`📥 +${newLeads.length} nouveaux prospects uniques ajoutés en base. (Total base: ${leads.length})`)

    // ENVOI EN DIRECT DES NOUVEAUX PROSPECTS SOURCÉS
    if (newLeads.length > 0) {
      for (let i = 0; i < newLeads.length; i++) {
        const lead = newLeads[i]
        console.log(`\n------------------------------------------------------------`)
        console.log(`🎯 [ENVOI EN COURS] ${lead.company} (${lead.email})`)
        console.log(`📝 Rédaction sur-mesure par Gemini...`)

        try {
          const generated = await generateProspectEmailWithGemini(lead)
          console.log(`✉️ Objet : "${generated.subject}"`)
          console.log(`🚀 Expédition du mail officiel avec Logo HD & Photos Galerie...`)

          await sendEmailViaResend(lead.email, generated.subject, generated.body, lead)

          lead.status = 'contacted'
          lead.lastContactDate = new Date().toISOString()
          lead.generatedEmail = {
            subject: generated.subject,
            body: generated.body,
            generatedAt: new Date().toISOString()
          }
          saveLeads(leads)

          totalSentSession++
          console.log(`✅ SUCCÈS ! Email délivré à ${lead.company}.`)
          console.log(`📊 Statistiques session : ${totalSentSession} envoyés | ${totalDiscoveredSession} sourcés`)
        } catch (err: any) {
          console.error(`❌ Échec envoi pour ${lead.company}: ${err.message}`)
          lead.status = 'replied' // Marqué pour ne pas retenter indéfiniment
          saveLeads(leads)
        }

        // PAUSE ANTI-SPAM NATURELLE (15 secondes)
        console.log(`⏳ Pause de sécurité (15s) pour préserver la délivrabilité du domaine...`)
        await sleep(15000)
      }
    } else {
      console.log(`ℹ️ Tous les prospects trouvés dans cette zone étaient déjà contactés.`)
    }

    // Petite pause de 10s avant de passer à la zone géographique suivante
    console.log(`\n🔄 Passage à la zone suivante dans 10 secondes...`)
    await sleep(10000)
  }
}

runInfiniteAutopilot().catch(console.error)
