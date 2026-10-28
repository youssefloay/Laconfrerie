import fs from 'fs'
import path from 'path'
import { ProspectLead } from '../lib/prospect-engine'

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')

function loadLeads(): ProspectLead[] {
  if (!fs.existsSync(DATA_PATH)) return []
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

function saveLeads(leads: ProspectLead[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

function parseCSV(content: string): Partial<ProspectLead>[] {
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length < 2) return []

  const header = lines[0].toLowerCase().split(/[,;\t]/).map(h => h.trim().replace(/^["']|["']$/g, ''))
  
  // Detect columns
  const companyIdx = header.findIndex(h => h.includes('societe') || h.includes('company') || h.includes('entreprise') || h.includes('nom'))
  const emailIdx = header.findIndex(h => h.includes('email') || h.includes('mail') || h.includes('courriel'))
  const contactIdx = header.findIndex(h => h.includes('contact') || h.includes('prenom') || h.includes('responsable'))
  const categoryIdx = header.findIndex(h => h.includes('categorie') || h.includes('category') || h.includes('secteur') || h.includes('type'))
  const locationIdx = header.findIndex(h => h.includes('ville') || h.includes('location') || h.includes('adresse') || h.includes('zone'))
  const descIdx = header.findIndex(h => h.includes('desc') || h.includes('note') || h.includes('activite'))

  const results: Partial<ProspectLead>[] = []

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i]
    // Simple split handling quotes roughly
    const values = rawLine.split(/[,;\t]/).map(v => v.trim().replace(/^["']|["']$/g, ''))
    
    const company = companyIdx !== -1 ? values[companyIdx] : values[0]
    const email = emailIdx !== -1 ? values[emailIdx] : values[1]

    if (!company || !email || !email.includes('@')) continue

    const categoryRaw = categoryIdx !== -1 ? (values[categoryIdx] || '').toLowerCase() : ''
    let category: 'entreprise' | 'domaine' | 'coworking' = 'entreprise'
    if (categoryRaw.includes('mariage') || categoryRaw.includes('domaine') || categoryRaw.includes('chateau') || categoryRaw.includes('mas')) {
      category = 'domaine'
    } else if (categoryRaw.includes('cowork') || categoryRaw.includes('tiers') || categoryRaw.includes('incub')) {
      category = 'coworking'
    }

    results.push({
      company,
      email: email.toLowerCase(),
      contactName: contactIdx !== -1 ? values[contactIdx] : undefined,
      category,
      location: locationIdx !== -1 && values[locationIdx] ? values[locationIdx] : 'Montpellier & Alentours',
      description: descIdx !== -1 ? values[descIdx] : ''
    })
  }

  return results
}

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.log(`
📥 IMPORTATEUR DE LEADS MASSIF (CSV / JSON)

Usage:
  npx tsx scripts/import-leads.ts <chemin_vers_fichier.csv>

Exemple:
  npx tsx scripts/import-leads.ts data/montpellier_1000_leads.csv
`)
    return
  }

  const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Fichier introuvable: ${absolutePath}`)
    return
  }

  console.log(`📂 Lecture de : ${absolutePath}...`)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')
  
  let newItems: Partial<ProspectLead>[] = []
  if (filePath.endsWith('.json')) {
    newItems = JSON.parse(fileContent)
  } else {
    newItems = parseCSV(fileContent)
  }

  console.log(`🔍 Lignes valides trouvées : ${newItems.length}`)

  const leads = loadLeads()
  const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))
  let added = 0

  for (const item of newItems) {
    if (!item.company || !item.email) continue
    const cleanEmail = item.email.toLowerCase().trim()
    if (existingEmails.has(cleanEmail)) continue

    leads.push({
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      company: item.company.trim(),
      contactName: item.contactName?.trim(),
      email: cleanEmail,
      category: item.category || 'entreprise',
      location: item.location?.trim() || 'Montpellier',
      description: item.description?.trim() || '',
      status: 'ready',
      lastContactDate: null
    })
    existingEmails.add(cleanEmail)
    added++
  }

  saveLeads(leads)
  console.log(`\n🎉 Succès ! ${added} nouveaux prospects importés dans data/prospects.json !`)
  console.log(`📊 Total actuel dans la base : ${leads.length} prospects.`)
}

main().catch(console.error)
