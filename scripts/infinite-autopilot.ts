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
  generateProspectEmailWithGemini 
} from '../lib/prospect-engine'
import {
  safeDispatchEmail,
  isEmailAlreadySent,
  acquireAutopilotLock,
  releaseAutopilotLock
} from '../lib/email-guard'

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')

function getLeads(): ProspectLead[] {
  if (!fs.existsSync(DATA_PATH)) return []
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function saveLeads(leads: ProspectLead[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let isRunning = true
process.on('SIGINT', () => {
  console.log('\n\n🛑 Interruption demandée (Ctrl+C). Libération du verrou et arrêt propre...')
  isRunning = false
  releaseAutopilotLock()
  setTimeout(() => process.exit(0), 500)
})

process.on('exit', () => {
  releaseAutopilotLock()
})

async function runInfiniteAutopilot() {
  console.clear()
  console.log('╔══════════════════════════════════════════════════════════════════════════╗')
  console.log('║   🚀 AGENT PROSPECTION INFINI · LA CONFRÉRIE FOODTRUCK                   ║')
  console.log('║   Scraping continu de nouvelles zones + Envoi non-stop sans doublon      ║')
  console.log('╚══════════════════════════════════════════════════════════════════════════╝\n')

  console.log('🛡️ Règle absolue : GARDE-FOU ANTI-DUPLICATION STRICT (base + registre historique)')
  console.log('⏱️ Pacing anti-spam : 15 secondes de pause entre chaque envoi (délivrabilité)')
  console.log('📍 Zones couvertes : ' + MONTPELLIER_ZONES.length + ' micro-secteurs d\'entreprises et domaines')
  console.log('🛑 Pour quitter : Appuie sur Ctrl + C à tout moment (l\'avancement est sauvegardé)\n')

  // Acquisition du verrou de processus
  if (!acquireAutopilotLock('cli')) {
    console.error('⚠️ ATTENTION : Un autre processus Autopilot (Web ou CLI) est actuellement en cours.')
    console.error('Pour éviter les conflits d\'envoi et les doublons, ce script attend 15 secondes avant de réessayer...')
    await sleep(15000)
    if (!acquireAutopilotLock('cli')) {
      console.error('❌ Impossible de démarrer : le verrou est toujours actif. Arrête l\'autre instance avant.')
      process.exit(1)
    }
  }

  let totalSentSession = 0
  let totalDiscoveredSession = 0
  let cycleIndex = 0

  while (isRunning) {
    cycleIndex++
    const currentZone = MONTPELLIER_ZONES[(cycleIndex - 1) % MONTPELLIER_ZONES.length]

    // 1. Lire la base actuelle
    const leads = getLeads()
    const readyCount = leads.filter(l => l.status === 'ready' && !isEmailAlreadySent(l.email)).length
    const contactedCount = leads.filter(l => l.status === 'contacted' || isEmailAlreadySent(l.email)).length
    const existingCompanies = leads.map(l => l.company)
    const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))
    const existingNames = new Set(leads.map(l => l.company.toLowerCase().trim()))

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📍 [CYCLE #${cycleIndex}] Secteur : "${currentZone}"`)
    console.log(`📊 État base : ${leads.length} total | ⏳ ${readyCount} en attente | ✅ ${contactedCount} déjà contactés`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    // 2. Scraping par Gemini avec exclusion des entreprises déjà connues
    console.log(`🤖 [1/3] Gemini recherche de NOUVEAUX établissements (exclusion de ${existingCompanies.length} entités existantes)...`)
    let discovered: Partial<ProspectLead>[] = []
    try {
      discovered = await scrapeLeadsWithGemini(currentZone, undefined, 7, existingCompanies)
      console.log(`✨ ${discovered.length} structures ciblées par Gemini.`)
    } catch (err: any) {
      console.error(`⚠️ Erreur de scraping (${err.message}). On continue avec les prospects en attente...`)
    }

    // 3. Déduplication stricte et enregistrement (Base + Historique permanent)
    let newLeadsAdded = 0
    for (const item of discovered) {
      if (!item.company || !item.email || !item.email.includes('@')) continue
      const cleanEmail = item.email.toLowerCase().trim()
      const cleanName = item.company.toLowerCase().trim()

      if (existingEmails.has(cleanEmail) || existingNames.has(cleanName) || isEmailAlreadySent(cleanEmail)) {
        continue
      }

      const newLead: ProspectLead = {
        id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        company: item.company.trim(),
        contactName: item.contactName?.trim() || 'Direction / Responsable Événements',
        email: cleanEmail,
        category: item.category || 'entreprise',
        location: item.location?.trim() || currentZone.split('(')[0].trim(),
        description: item.description?.trim() || 'Sourcé automatiquement par Gemini.',
        status: 'ready',
        lastContactDate: null
      }

      leads.push(newLead)
      existingEmails.add(cleanEmail)
      existingNames.add(cleanName)
      newLeadsAdded++
    }

    if (newLeadsAdded > 0) {
      saveLeads(leads)
      totalDiscoveredSession += newLeadsAdded
      console.log(`📥 [2/3] +${newLeadsAdded} NOUVEAUX prospects uniques ajoutés en base. (Total: ${leads.length})`)
    } else {
      console.log(`ℹ️ [2/3] Pas de nouveaux leads dans ce lot, traitement de la file d'attente existante.`)
    }

    // 4. Traitement continu de la file des prospects en attente ("ready" ET JAMAIS contactés)
    const pendingLeads = leads.filter(l => l.status === 'ready' && !isEmailAlreadySent(l.email))
    const batchSize = Math.min(3, pendingLeads.length)

    if (batchSize > 0) {
      console.log(`\n🚀 [3/3] Expédition en cours pour ${batchSize} prospect(s) de la file...`)

      for (let i = 0; i < batchSize; i++) {
        if (!isRunning) break

        const lead = pendingLeads[i]
        console.log(`\n------------------------------------------------------------`)
        console.log(`🎯 [${i + 1}/${batchSize}] Cible : ${lead.company} (${lead.email})`)
        console.log(`📍 Lieu : ${lead.location} · Profil : ${lead.category}`)
        console.log(`✍️ Rédaction de l'email sur-mesure par Gemini...`)

        try {
          const generated = await generateProspectEmailWithGemini(lead)
          console.log(`✉️ Objet : "${generated.subject}"`)
          console.log(`📤 Expédition sécurisée via Resend...`)

          // 🛡️ Passerelle sécurisée avec garde-fou infranchissable
          const dispatch = await safeDispatchEmail({
            to: lead.email,
            subject: generated.subject,
            bodyText: generated.body,
            lead,
            source: 'autopilot_cli'
          })

          if (dispatch.skipped) {
            console.log(`⏭️ [DOUBLON ÉVITÉ] Cet email a déjà été contacté dans l'historique : ${lead.email}`)
          } else {
            totalSentSession++
            console.log(`✅ SUCCÈS ! Email délivré à ${lead.company}`)
            console.log(`📈 Bilan Session : ${totalSentSession} envoyés | ${totalDiscoveredSession} sourcés`)
          }

          lead.status = 'contacted'
          lead.lastContactDate = new Date().toISOString()
          lead.generatedEmail = {
            subject: generated.subject,
            body: generated.body,
            generatedAt: new Date().toISOString()
          }
          saveLeads(leads)
        } catch (err: any) {
          console.error(`❌ Échec envoi pour ${lead.company} : ${err.message}`)
          lead.status = 'replied' // Ne bloque pas la file
          saveLeads(leads)
        }

        // Pause de sécurité de 15s entre chaque email (délivrabilité et protection réputation)
        if (i < batchSize - 1 && isRunning) {
          console.log(`⏳ Pause anti-spam (15 secondes)...`)
          await sleep(15000)
        }
      }
    } else {
      console.log(`ℹ️ Tous les prospects en attente ont été contactés ! Recherche de nouvelles zones...`)
    }

    // Pause de 8 secondes avant de passer au secteur suivant
    if (isRunning) {
      console.log(`\n🔄 Passage à la zone suivante dans 8 secondes... (Ctrl+C pour stopper)`)
      await sleep(8000)
    }
  }

  releaseAutopilotLock()
  console.log(`\n🏁 Session Autopilot terminée. Bilan final :`)
  console.log(`   - Emails envoyés : ${totalSentSession}`)
  console.log(`   - Nouveaux établissements découverts : ${totalDiscoveredSession}`)
}

runInfiniteAutopilot().catch((err) => {
  releaseAutopilotLock()
  console.error(err)
})
