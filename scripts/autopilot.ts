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

import { runAutopilotCycle } from '../lib/autopilot-engine'

async function main() {
  console.log('\n🤖 ========================================================')
  console.log('    AGENT AUTOPILOT IA LA CONFRÉRIE (SCRAPING + ENVOI)')
  console.log('========================================================\n')

  const args = process.argv.slice(2)
  const countArg = args.find(a => a.startsWith('--count='))
  const sendArg = args.find(a => a.startsWith('--send='))
  const scrapeCount = countArg ? parseInt(countArg.split('=')[1], 10) : 8
  const maxSendLimit = sendArg ? parseInt(sendArg.split('=')[1], 10) : 3

  try {
    const result = await runAutopilotCycle({
      scrapeCount,
      sendImmediately: true,
      maxSendLimit
    })

    console.log('\n📋 --- JOURNAL D\'EXÉCUTION AUTOPILOT ---')
    result.logs.forEach(log => console.log(log))
    console.log('----------------------------------------\n')
    console.log(`🎯 Bilan : ${result.scrapedCount} cibles trouvées, +${result.newLeadsAdded} ajoutées, ${result.sentCount} emails envoyés avec succès.\n`)
  } catch (err: any) {
    console.error('\n❌ Erreur Autopilot :', err.message)
  }
}

main().catch(console.error)
