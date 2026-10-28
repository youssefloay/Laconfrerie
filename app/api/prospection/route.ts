import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { generateProspectEmail, generateFollowUpEmail, ProspectLead } from '@/lib/prospect-engine'

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

export async function GET() {
  const leads = getLeads()
  return NextResponse.json({ success: true, leads })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action } = body
    const leads = getLeads()

    if (action === 'generate') {
      const { leadId, customAngle } = body
      const lead = leads.find(l => l.id === leadId)
      if (!lead) return NextResponse.json({ error: 'Lead introuvable' }, { status: 404 })

      const email = generateProspectEmail(lead, customAngle)
      return NextResponse.json({ success: true, email })
    }

    if (action === 'send') {
      const { leadId, subject, bodyText, toEmail } = body
      const lead = leads.find(l => l.id === leadId)
      const recipient = toEmail || lead?.email

      if (!recipient) {
        return NextResponse.json({ error: 'Email destinataire manquant' }, { status: 400 })
      }

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${bodyText
            .split('\n\n')
            .map((p: string) => `<p style="margin-bottom: 14px;">${p.replace(/\n/g, '<br/>')}</p>`)
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
          to: recipient,
          subject,
          html: htmlBody,
          reply_to: 'contact@laconfrerietruck.fr'
        })
      })

      if (!res.ok) {
        const errorText = await res.text()
        return NextResponse.json({ error: `Erreur Resend: ${errorText}` }, { status: 500 })
      }

      if (lead) {
        lead.status = 'contacted'
        lead.lastContactDate = new Date().toISOString()
        lead.generatedEmail = {
          subject,
          body: bodyText,
          generatedAt: new Date().toISOString()
        }
        saveLeads(leads)
      }

      return NextResponse.json({ success: true, message: 'Email envoyé avec succès !' })
    }

    if (action === 'bulk_add') {
      const { items } = body
      if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: 'Liste d\'items vide ou invalide' }, { status: 400 })
      }

      let addedCount = 0
      const existingEmails = new Set(leads.map(l => l.email.toLowerCase().trim()))

      for (const item of items) {
        if (!item.company || !item.email) continue
        const cleanEmail = item.email.toLowerCase().trim()
        if (existingEmails.has(cleanEmail)) continue

        leads.push({
          id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
          company: item.company.trim(),
          contactName: item.contactName?.trim() || undefined,
          email: cleanEmail,
          category: item.category || 'entreprise',
          location: item.location?.trim() || 'Montpellier',
          description: item.description?.trim() || '',
          status: 'ready',
          lastContactDate: null
        })
        existingEmails.add(cleanEmail)
        addedCount++
      }

      saveLeads(leads)
      return NextResponse.json({ success: true, addedCount, totalLeads: leads.length })
    }

    if (action === 'add') {
      const { company, email, category, location, description } = body
      if (!company || !email) {
        return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
      }

      const newLead: ProspectLead = {
        id: `lead-${Date.now().toString().slice(-4)}`,
        company,
        email,
        category: category || 'entreprise',
        location: location || 'Montpellier',
        description: description || '',
        status: 'ready',
        lastContactDate: null
      }

      leads.unshift(newLead)
      saveLeads(leads)
      return NextResponse.json({ success: true, lead: newLead })
    }

    if (action === 'update_status') {
      const { leadId, status } = body
      const lead = leads.find(l => l.id === leadId)
      if (lead) {
        lead.status = status
        saveLeads(leads)
      }
      return NextResponse.json({ success: true, lead })
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
