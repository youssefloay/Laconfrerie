import fs from 'fs'
import path from 'path'

// Charge les variables d'environnement depuis .env.local
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

import { generateProspectEmailWithGemini, formatOutboundEmailHTML, ProspectLead } from '../lib/prospect-engine'

const RESEND_API_KEY = process.env.RESEND_API_KEY

async function main() {
  const recipient = process.argv[2] || 'laconfrerie.villeneuve@gmail.com'

  console.log(`\n🚀 Test d'envoi en direct pour : ${recipient}...`)

  const testLead: ProspectLead = {
    id: 'test-lead-live',
    company: 'Entreprise Partenaire (Test Live)',
    contactName: 'Youssef',
    email: recipient,
    category: 'entreprise',
    location: 'Montpellier (Millénaire)',
    description: 'Équipe de 45 collaborateurs souhaitant organiser un afterwork gourmet festif.',
    status: 'ready',
    lastContactDate: null
  }

  console.log('🤖 1. Rédaction du message personnalisé par Google Gemini AI...')
  const generated = await generateProspectEmailWithGemini(testLead)
  console.log(`🎯 Objet généré : "${generated.subject}"`)

  console.log('🎨 2. Génération du template officiel (Logo HD, photos Burgers, badges, CTA)...')
  const htmlBody = formatOutboundEmailHTML(generated.body, testLead)

  console.log(`✉️ 3. Expédition via Resend à ${recipient}...`)

  // Essai 1 : avec le domaine officiel
  let fromAddress = 'La Confrérie Foodtruck <contact@laconfrerietruck.fr>'
  let res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipient,
      subject: `[TEST LIVE] ${generated.subject}`,
      html: htmlBody,
      reply_to: 'contact@laconfrerietruck.fr'
    })
  })

  // Si le domaine n'est pas encore vérifié dans Resend, bascule sur onboarding@resend.dev (qui fonctionne pour l'email du compte)
  if (!res.ok) {
    const errText = await res.text()
    if (errText.includes('domain is not verified')) {
      console.log('ℹ️ Domaine non encore validé sur Resend. Bascule automatique sur onboarding@resend.dev pour le test...')
      fromAddress = 'La Confrérie Foodtruck <onboarding@resend.dev>'
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: recipient,
          subject: `[TEST LIVE] ${generated.subject}`,
          html: htmlBody,
          reply_to: 'contact@laconfrerietruck.fr'
        })
      })
    } else {
      console.error(`❌ Erreur Resend: ${errText}`)
      return
    }
  }

  if (!res.ok) {
    const finalErr = await res.text()
    console.error(`❌ Échec de l'envoi du test: ${finalErr}`)
    return
  }

  const result = await res.json()
  console.log(`\n🎉 SUCCÈS TOTAL !`)
  console.log(`ID Email Resend : ${result.id}`)
  console.log(`Vérifie ta boîte de réception sur : ${recipient} (regarde aussi dans Spam / Promotions si besoin) !\n`)
}

main().catch(console.error)
