'use client'

import { useState, useEffect } from 'react'
import { 
  Building2, 
  Castle, 
  Users, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Mail, 
  MapPin, 
  RefreshCw,
  Eye,
  X,
  Upload,
  Bot,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProspectLead, formatOutboundEmailHTML } from '@/lib/prospect-engine'

export default function ProspectionPage() {
  const [leads, setLeads] = useState<ProspectLead[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Modal / Preview state
  const [activeLead, setActiveLead] = useState<ProspectLead | null>(null)
  const [customAngle, setCustomAngle] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [modalTab, setModalTab] = useState<'preview' | 'edit'>('preview')

  // Add lead form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCompany, setNewCompany] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newCategory, setNewCategory] = useState<'entreprise' | 'domaine' | 'coworking'>('entreprise')
  const [newLocation, setNewLocation] = useState('Montpellier')
  const [newDescription, setNewDescription] = useState('')

  // Bulk import state
  const [importing, setImporting] = useState(false)
  const [importMessage, setImportMessage] = useState<string | null>(null)

  // Autopilot state
  const [autopilotRunning, setAutopilotRunning] = useState(false)
  const [autopilotLogs, setAutopilotLogs] = useState<string[]>([])
  const [showAutopilotModal, setShowAutopilotModal] = useState(false)

  const handleRunAutopilot = async () => {
    setAutopilotRunning(true)
    setShowAutopilotModal(true)
    setAutopilotLogs([
      "🚀 Initialisation de l'Autopilot Gemini...",
      "🔍 Exploration du tissu économique de Montpellier en cours..."
    ])

    try {
      const res = await fetch('/api/prospection/autopilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scrapeCount: 6, maxSendLimit: 3, sendImmediately: true })
      })
      const data = await res.json()
      if (data.success && data.result) {
        setAutopilotLogs(data.result.logs)
        await fetchLeads()
      } else {
        setAutopilotLogs(prev => [...prev, `❌ Erreur: ${data.error || 'Erreur inconnue'}`])
      }
    } catch (err: any) {
      setAutopilotLogs(prev => [...prev, `❌ Échec: ${err.message}`])
    } finally {
      setAutopilotRunning(false)
    }
  }

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setImportMessage(null)

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
        if (lines.length < 2) {
          setImportMessage("Fichier CSV vide ou sans données.")
          setImporting(false)
          return
        }

        const header = lines[0].toLowerCase().split(/[,;\t]/).map(h => h.trim().replace(/^["']|["']$/g, ''))
        const compIdx = header.findIndex(h => h.includes('societe') || h.includes('company') || h.includes('entreprise') || h.includes('nom'))
        const mailIdx = header.findIndex(h => h.includes('email') || h.includes('mail') || h.includes('courriel'))
        const contactIdx = header.findIndex(h => h.includes('contact') || h.includes('prenom') || h.includes('responsable'))
        const catIdx = header.findIndex(h => h.includes('cat') || h.includes('secteur') || h.includes('type'))
        const locIdx = header.findIndex(h => h.includes('ville') || h.includes('location') || h.includes('adresse') || h.includes('zone'))
        const descIdx = header.findIndex(h => h.includes('desc') || h.includes('note') || h.includes('activite'))

        const parsedItems: any[] = []

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(/[,;\t]/).map(v => v.trim().replace(/^["']|["']$/g, ''))
          const company = compIdx !== -1 ? values[compIdx] : values[0]
          const email = mailIdx !== -1 ? values[mailIdx] : values[1]

          if (!company || !email || !email.includes('@')) continue

          const catRaw = catIdx !== -1 ? (values[catIdx] || '').toLowerCase() : ''
          let category = 'entreprise'
          if (catRaw.includes('mariage') || catRaw.includes('domaine') || catRaw.includes('chateau') || catRaw.includes('mas')) {
            category = 'domaine'
          } else if (catRaw.includes('cowork') || catRaw.includes('tiers') || catRaw.includes('incub')) {
            category = 'coworking'
          }

          parsedItems.push({
            company,
            email: email.toLowerCase(),
            contactName: contactIdx !== -1 ? values[contactIdx] : undefined,
            category,
            location: locIdx !== -1 && values[locIdx] ? values[locIdx] : 'Montpellier',
            description: descIdx !== -1 ? values[descIdx] : ''
          })
        }

        if (parsedItems.length === 0) {
          setImportMessage("Aucun email valide détecté dans le fichier.")
          setImporting(false)
          return
        }

        const res = await fetch('/api/prospection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'bulk_add', items: parsedItems })
        })
        const data = await res.json()
        if (data.success) {
          setImportMessage(`🎉 ${data.addedCount} nouveaux prospects importés avec succès ! (Total: ${data.totalLeads})`)
          await fetchLeads()
        } else {
          setImportMessage(`Erreur: ${data.error}`)
        }
      } catch (err: any) {
        setImportMessage(`Erreur lors de la lecture: ${err.message}`)
      } finally {
        setImporting(false)
      }
    }
    reader.readAsText(file)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/prospection')
      const data = await res.json()
      if (data.leads) setLeads(data.leads)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenLead = async (lead: ProspectLead) => {
    setActiveLead(lead)
    setSendSuccess(false)
    setSendError(null)
    setCustomAngle('')
    setGenerating(true)

    try {
      const res = await fetch('/api/prospection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', leadId: lead.id })
      })
      const data = await res.json()
      if (data.email) {
        setEmailSubject(data.email.subject)
        setEmailBody(data.email.body)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const handleRegenerate = async () => {
    if (!activeLead) return
    setGenerating(true)
    try {
      const res = await fetch('/api/prospection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'generate', 
          leadId: activeLead.id, 
          customAngle: customAngle.trim() || undefined 
        })
      })
      const data = await res.json()
      if (data.email) {
        setEmailSubject(data.email.subject)
        setEmailBody(data.email.body)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const handleSendEmail = async (overrideRecipient?: string) => {
    if (!activeLead) return
    setSending(true)
    setSendError(null)
    setSendSuccess(false)

    try {
      const res = await fetch('/api/prospection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          leadId: activeLead.id,
          toEmail: overrideRecipient || activeLead.email,
          subject: emailSubject,
          bodyText: emailBody
        })
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      setSendSuccess(true)
      await fetchLeads()
    } catch (err: any) {
      setSendError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCompany || !newEmail) return

    try {
      const res = await fetch('/api/prospection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          company: newCompany,
          email: newEmail,
          category: newCategory,
          location: newLocation,
          description: newDescription
        })
      })
      const data = await res.json()
      if (data.lead) {
        setShowAddForm(false)
        setNewCompany('')
        setNewEmail('')
        setNewDescription('')
        await fetchLeads()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filteredLeads = leads.filter(l => {
    const matchesCategory = filterCategory === 'all' || l.category === filterCategory
    const matchesSearch = searchQuery === '' || 
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = {
    total: leads.length,
    ready: leads.filter(l => l.status === 'ready').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted' || l.status === 'replied').length,
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Agent Outbound IA
                </span>
                <span className="text-xs text-slate-400">· La Confrérie Foodtruck</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Pilote de Prospection Privatisations
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Génération automatique d'offres sur-mesure pour entreprises, domaines de mariage et coworkings d'Occitanie.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button 
                onClick={handleRunAutopilot}
                disabled={autopilotRunning}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black gap-2 shadow-lg shadow-amber-500/25 rounded-xl border border-amber-300"
              >
                <Bot className={`w-4 h-4 ${autopilotRunning ? 'animate-spin' : ''}`} />
                <span>{autopilotRunning ? 'Autopilot en cours...' : '🤖 Lancer Autopilot Gemini'}</span>
              </Button>

              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept=".csv" 
                  className="hidden" 
                  onChange={handleCSVUpload}
                  disabled={importing}
                />
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-sm">
                  <Upload className={`w-4 h-4 text-amber-400 ${importing ? 'animate-bounce' : ''}`} />
                  <span>{importing ? 'Importation...' : 'Importer CSV'}</span>
                </span>
              </label>

              <Button 
                onClick={() => setShowAddForm(true)}
                variant="outline"
                className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white font-bold gap-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </div>
          </div>

          {importMessage && (
            <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-300 text-xs font-bold flex items-center justify-between">
              <span>{importMessage}</span>
              <button onClick={() => setImportMessage(null)} className="text-amber-300/70 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Cibles</p>
              <p className="text-2xl font-black text-white mt-1">{stats.total}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">Prêts à contacter</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{stats.ready}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p className="text-xs font-medium text-blue-400 uppercase tracking-wider">Emails Envoyés</p>
              <p className="text-2xl font-black text-blue-400 mt-1">{stats.contacted}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Réponses / Deals</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">{stats.converted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tous ({leads.length})
            </button>
            <button
              onClick={() => setFilterCategory('entreprise')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'entreprise'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Entreprises
            </button>
            <button
              onClick={() => setFilterCategory('domaine')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'domaine'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Castle className="w-4 h-4" />
              Domaines Mariage
            </button>
            <button
              onClick={() => setFilterCategory('coworking')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                filterCategory === 'coworking'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Coworkings
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une entreprise..."
              className="pl-10 bg-white border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Lead Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Chargement des prospects...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">Aucun prospect ne correspond aux critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLeads.map((lead) => {
              const isContacted = lead.status === 'contacted'
              const badgeColors = {
                entreprise: 'bg-blue-50 text-blue-700 border-blue-200',
                domaine: 'bg-purple-50 text-purple-700 border-purple-200',
                coworking: 'bg-orange-50 text-orange-700 border-orange-200',
                autre: 'bg-slate-50 text-slate-700 border-slate-200',
              }[lead.category]

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColors}`}>
                        {lead.category}
                      </span>
                      {isContacted ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Contacté
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          Prêt
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-900">{lead.company}</h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {lead.description || 'Entreprise cible pour événementiel foodtruck.'}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate mb-4">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      onClick={() => handleOpenLead(lead)}
                      className={`w-full font-bold gap-2 rounded-xl transition-all ${
                        isContacted
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-slate-950 hover:bg-slate-800 text-white shadow-md'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{isContacted ? 'Voir / Relancer' : 'Rédiger & Envoyer'}</span>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* AI Email Modal */}
      {activeLead && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Proposition IA
                  </span>
                  <span className="text-xs text-slate-400">· {activeLead.category}</span>
                </div>
                <h2 className="text-xl font-black text-white">{activeLead.company}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Destinataire : {activeLead.email}</p>
              </div>
              <button 
                onClick={() => setActiveLead(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setModalTab('preview')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    modalTab === 'preview' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-500" />
                  Aperçu de l'email officiel (avec Logo & Photos)
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('edit')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    modalTab === 'edit' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  Modifier le texte / Ajuster l'angle IA
                </button>
              </div>

              {modalTab === 'preview' ? (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                  <div className="bg-slate-200/80 px-4 py-2 border-b border-slate-300 text-[11px] font-bold text-slate-600 flex items-center justify-between">
                    <span className="truncate mr-2">Objet : {emailSubject}</span>
                    <span className="text-slate-400 flex-shrink-0">Rendu exact destinataire</span>
                  </div>
                  <iframe
                    srcDoc={formatOutboundEmailHTML(emailBody, activeLead)}
                    className="w-full h-[450px] border-0 bg-white"
                    title="Aperçu email officiel"
                  />
                </div>
              ) : (
                <>
                  {/* Optional Prompt Refinement */}
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
                    <label className="text-xs font-bold text-amber-900 block mb-1">
                      Ajuster l'angle de l'IA (optionnel) :
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={customAngle}
                        onChange={(e) => setCustomAngle(e.target.value)}
                        placeholder="Ex: Proposer un afterwork jeudi soir, ou mentionner leur nouveau bureau..."
                        className="bg-white border-amber-300 text-xs rounded-xl"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRegenerate}
                        disabled={generating}
                        className="border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs gap-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
                        Réécrire avec Gemini
                      </Button>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Objet de l'email
                    </label>
                    <Input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="font-bold text-sm bg-slate-50 border-slate-200 rounded-xl"
                    />
                  </div>

                  {/* Body Textarea */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Message rédigé par l'IA (modifiable)
                    </label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={12}
                      className="w-full p-3 font-sans text-xs sm:text-sm leading-relaxed bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </>
              )}

              {sendSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Email envoyé avec succès au prospect via l'API Resend !</span>
                </div>
              )}

              {sendError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold">
                  {sendError}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendEmail('contact@laconfrerietruck.fr')}
                disabled={sending || generating}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 w-full sm:w-auto"
              >
                Tester sur mon email d'abord
              </Button>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  onClick={() => setActiveLead(null)}
                  className="font-medium text-slate-500 hover:text-slate-900"
                >
                  Fermer
                </Button>
                <Button
                  onClick={() => handleSendEmail()}
                  disabled={sending || generating || !emailSubject || !emailBody}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold gap-2 px-6 rounded-xl shadow-lg shadow-amber-400/20 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Envoi en cours...' : 'Envoyer au prospect'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-black text-slate-900">Ajouter un nouveau prospect</h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nom de l'entreprise *</label>
                <Input
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Ex: Ubisoft, Dell, Domaine de..."
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email de contact *</label>
                <Input
                  required
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="contact@entreprise.com"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-xs font-semibold rounded-xl p-2.5"
                  >
                    <option value="entreprise">Entreprise / PME</option>
                    <option value="domaine">Domaine Mariage</option>
                    <option value="coworking">Coworking / Tiers-lieu</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ville / Zone</label>
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Ex: Montpellier Millénaire"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notes / Contexte (optionnel)</label>
                <Textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Ex: 50 salariés, cherche une animation pour leur séminaire annuel..."
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl">
                  Enregistrer la cible
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Autopilot Progress Modal */}
      {showAutopilotModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                  <Bot className={`w-5 h-5 text-amber-400 ${autopilotRunning ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Autopilot Gemini en Action</h3>
                  <p className="text-xs text-slate-400">
                    {autopilotRunning ? "Exploration, scraping et envois en cours..." : "Cycle terminé !"}
                  </p>
                </div>
              </div>
              {!autopilotRunning && (
                <button onClick={() => setShowAutopilotModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-6">
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2 max-h-72 overflow-y-auto">
                {autopilotLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">›</span>
                    <span className={log.startsWith('✅') ? 'text-emerald-400 font-bold' : log.startsWith('❌') ? 'text-red-400 font-bold' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
                {autopilotRunning && (
                  <div className="flex items-center gap-2 text-amber-400 animate-pulse pt-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemini analyse et traite les données...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-end">
              <Button
                onClick={() => setShowAutopilotModal(false)}
                disabled={autopilotRunning}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl"
              >
                {autopilotRunning ? "Veuillez patienter..." : "Fermer le journal"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
