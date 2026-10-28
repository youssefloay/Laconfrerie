import fs from 'fs'
import path from 'path'
import { formatOutboundEmailHTML, ProspectLead } from './prospect-engine'

const DATA_DIR = path.join(process.cwd(), 'data')
const HISTORY_PATH = path.join(DATA_DIR, 'sent_history.json')
const LOCK_PATH = path.join(DATA_DIR, 'autopilot.lock')
const SENDER_EMAIL = 'La Confrérie Foodtruck <contact@laconfrerietruck.fr>'

export interface SentHistoryRecord {
  email: string
  company: string
  subject: string
  sentAt: string
  source: 'autopilot_cli' | 'autopilot_web' | 'manual_dashboard' | 'initial_seed'
  resendId?: string
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

/**
 * Charge l'historique complet et inaltérable des emails déjà envoyés.
 */
export function getSentHistory(): Record<string, SentHistoryRecord> {
  ensureDataDir()
  if (!fs.existsSync(HISTORY_PATH)) {
    return {}
  }
  try {
    return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

/**
 * Sauvegarde synchrone sur disque de l'historique des envois.
 */
export function saveSentHistory(history: Record<string, SentHistoryRecord>) {
  ensureDataDir()
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2), 'utf-8')
}

/**
 * Vérifie de manière absolue si un email a DÉJÀ reçu un message un jour.
 */
export function isEmailAlreadySent(email: string): boolean {
  if (!email) return true
  const cleanEmail = email.toLowerCase().trim()
  const history = getSentHistory()
  return Boolean(history[cleanEmail])
}

/**
 * Enregistre définitivement un email comme envoyé pour bloquer tout doublon futur.
 */
export function recordEmailSent(record: SentHistoryRecord) {
  const cleanEmail = record.email.toLowerCase().trim()
  const history = getSentHistory()
  history[cleanEmail] = {
    ...record,
    email: cleanEmail,
    sentAt: record.sentAt || new Date().toISOString()
  }
  saveSentHistory(history)
}

/**
 * Verrou de processus pour empêcher que l'Autopilot Web et le CLI ne tournent en même temps.
 */
export function acquireAutopilotLock(source: 'cli' | 'web'): boolean {
  ensureDataDir()
  if (fs.existsSync(LOCK_PATH)) {
    try {
      const lockData = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf-8'))
      const lockTime = new Date(lockData.startedAt).getTime()
      const now = Date.now()
      // Si le verrou date de plus de 4 minutes, on considère le processus planté et on libère
      if (now - lockTime < 4 * 60 * 1000) {
        return false // Verrou actif d'une autre session
      }
    } catch {
      // JSON invalide, on écrase
    }
  }

  try {
    fs.writeFileSync(LOCK_PATH, JSON.stringify({
      pid: process.pid,
      source,
      startedAt: new Date().toISOString()
    }), 'utf-8')
    return true
  } catch {
    return false
  }
}

export function releaseAutopilotLock() {
  try {
    if (fs.existsSync(LOCK_PATH)) {
      fs.unlinkSync(LOCK_PATH)
    }
  } catch {
    // Ignore error
  }
}

/**
 * Passerelle UNIQUE et SÉCURISÉE d'expédition Resend.
 * Bloque catégoriquement tout envoi si l'adresse a déjà été contactée.
 */
export async function safeDispatchEmail(params: {
  to: string
  subject: string
  bodyText: string
  lead?: Partial<ProspectLead>
  source?: 'autopilot_cli' | 'autopilot_web' | 'manual_dashboard'
}): Promise<{
  success: boolean
  skipped?: boolean
  reason?: string
  id?: string
}> {
  const cleanEmail = params.to.toLowerCase().trim()

  // 🛡️ 1. VÉRIFICATION ABSOLUE ANTI-DUPLICATION
  if (isEmailAlreadySent(cleanEmail)) {
    return {
      success: false,
      skipped: true,
      reason: `DUPLICATE_BLOCKED: L'adresse ${cleanEmail} a déjà été contactée par le passé. Envoi annulé.`
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY non configurée.')
  }

  const htmlBody = formatOutboundEmailHTML(params.bodyText, params.lead || { company: cleanEmail })

  // 2. Appel Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: cleanEmail,
      subject: params.subject,
      html: htmlBody,
      reply_to: 'contact@laconfrerietruck.fr'
    })
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Erreur Resend (${res.status}): ${errorText}`)
  }

  const data = await res.json()

  // 🛡️ 3. ENREGISTREMENT IMMÉDIAT DANS LE REGISTRE HISTORIQUE INALTÉRABLE
  recordEmailSent({
    email: cleanEmail,
    company: params.lead?.company || cleanEmail,
    subject: params.subject,
    sentAt: new Date().toISOString(),
    source: params.source || 'manual_dashboard',
    resendId: data?.id
  })

  return {
    success: true,
    id: data?.id
  }
}
