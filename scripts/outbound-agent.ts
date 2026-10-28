import fs from 'fs'
import path from 'path'
import { generateProspectEmail, generateFollowUpEmail, ProspectLead } from '../lib/prospect-engine'

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')
// Charge les variables d'environnement depuis .env.local si non définies
if (!process.env.RESEND_API_KEY) {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const match = envContent.match(/RESEND_API_KEY=["']?([^"'\n\r]+)["']?/)
    if (match) process.env.RESEND_API_KEY = match[1]
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const SENDER_EMAIL = 'La Confrérie Foodtruck <contact@laconfrerietruck.fr>'

function loadLeads(): ProspectLead[] {
  if (!fs.existsSync(DATA_PATH)) {
    return []
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function saveLeads(leads: ProspectLead[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

async function sendEmailViaResend(to: string, subject: string, bodyText: string) {
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${bodyText
        .split('\n\n')
        .map(p => `<p style="margin-bottom: 14px;">${p.replace(/\n/g, '<br/>')}</p>`)
        .join('')}
    </div>
  `

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
    const errorText = await res.text()
    throw new Error(`Erreur Resend (${res.status}): ${errorText}`)
  }

  return await res.json()
}

async function main() {
  const args = process.argv.slice(2)
  const mode = args[0] || '--help'

  const leads = loadLeads()

  if (mode === '--stats' || mode === '-s') {
    console.log('\n📊 === PIPELINE DE PROSPECTION LA CONFRÉRIE ===')
    console.log(`Total prospects : ${leads.length}`)
    const ready = leads.filter(l => l.status === 'ready').length
    const contacted = leads.filter(l => l.status === 'contacted').length
    const replied = leads.filter(l => l.status === 'replied').length
    console.log(`• Prêts à envoyer : ${ready}`)
    console.log(`• Contactés : ${contacted}`)
    console.log(`• Réponses reçues : ${replied}`)
    console.log('================================================\n')
    return
  }

  if (mode === '--preview' || mode === '-p') {
    console.log('\n🔍 === SIMULATION & GÉNÉRATION DES EMAILS IA (AUCUN ENVOI) ===\n')
    leads.forEach((lead, index) => {
      const email = generateProspectEmail(lead)
      console.log(`------------------------------------------------------------`)
      console.log(`[#${index + 1}] PROSPECT : ${lead.company} (${lead.category.toUpperCase()})`)
      console.log(`📍 Lieu : ${lead.location}`)
      console.log(`✉️ Email destinataire : ${lead.email}`)
      console.log(`🎯 Objet : ${email.subject}`)
      console.log(`📝 Contenu rédigé par l'IA :\n`)
      console.log(email.body)
      console.log(`------------------------------------------------------------\n`)
    })
    console.log(`💡 Pour envoyer réellement ces emails, lance : npx tsx scripts/outbound-agent.ts --send\n`)
    return
  }

  if (mode === '--send') {
    const targetId = args[1]
    const toSend = targetId 
      ? leads.filter(l => l.id === targetId)
      : leads.filter(l => l.status === 'ready')

    if (toSend.length === 0) {
      console.log('ℹ️ Aucun prospect en attente d\'envoi (statut "ready").')
      return
    }

    console.log(`\n🚀 Envoi en cours pour ${toSend.length} prospect(s)...\n`)

    for (const lead of toSend) {
      const email = generateProspectEmail(lead)
      console.log(`Envoi à ${lead.company} (${lead.email})...`)
      try {
        await sendEmailViaResend(lead.email, email.subject, email.body)
        lead.status = 'contacted'
        lead.lastContactDate = new Date().toISOString()
        lead.generatedEmail = {
          subject: email.subject,
          body: email.body,
          generatedAt: new Date().toISOString()
        }
        console.log(`✅ Succès pour ${lead.company}`)
      } catch (err: any) {
        console.error(`❌ Échec pour ${lead.company}: ${err.message}`)
      }
      // Petite pause de 1 seconde entre les envois
      await new Promise(r => setTimeout(r, 1000))
    }

    saveLeads(leads)
    console.log('\n✨ Campagne terminée et base prospects mise à jour dans data/prospects.json !\n')
    return
  }

  if (mode === '--add') {
    const [_, company, email, category, location, description] = args
    if (!company || !email) {
      console.log('Usage: npx tsx scripts/outbound-agent.ts --add "Nom Boîte" "email@boite.com" "entreprise|domaine|coworking" "Montpellier"')
      return
    }

    const newLead: ProspectLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      company,
      email,
      category: (category as any) || 'entreprise',
      location: location || 'Montpellier',
      description: description || '',
      status: 'ready',
      lastContactDate: null
    }

    leads.push(newLead)
    saveLeads(leads)
    console.log(`✅ Nouveau prospect ajouté avec succès : ${company} (${email})`)
    return
  }

  console.log(`
🤖 AGENT IA DE PROSPECTION OUTBOUND — LA CONFRÉRIE

Commandes disponibles :
  npx tsx scripts/outbound-agent.ts --preview         # Simuler et voir les emails IA rédigés
  npx tsx scripts/outbound-agent.ts --send            # Envoyer les emails réels aux prospects 'ready'
  npx tsx scripts/outbound-agent.ts --send <lead-id>  # Envoyer uniquement à un prospect spécifique
  npx tsx scripts/outbound-agent.ts --stats           # Voir les statistiques du pipeline
  npx tsx scripts/outbound-agent.ts --add "Nom" "email" "category" "Lieu"  # Ajouter un lead
`)
}

main().catch(console.error)
