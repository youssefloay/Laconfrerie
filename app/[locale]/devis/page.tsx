"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { ArrowLeft, Mail, Calendar, Users, MapPin, Euro, Phone, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { DevisSimulator, FormulaOption } from "@/components/devis-simulator"
import { GoogleReviewsBanner } from "@/components/google-reviews-banner"

export default function DevisPage() {
  const t = useTranslations('QuotePage')
  const navT = useTranslations('Navigation')

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    typeEvenement: "",
    dateEvenement: "",
    heureDebut: "",
    heureFin: "",
    nombrePersonnes: "50-100",
    lieu: "",
    codePostal: "",
    budget: "",
    prestations: [] as string[],
    commentaires: "",
    formuleChoisie: "Conviviale & Gourmande",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceId, setReferenceId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrestationChange = (prestation: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      prestations: checked ? [...prev.prestations, prestation] : prev.prestations.filter((p) => p !== prestation),
    }))
  }

  const handleFormulaFromSimulator = (formula: FormulaOption, guests: number, options: string[]) => {
    setFormData((prev) => ({
      ...prev,
      formuleChoisie: formula.name,
      nombrePersonnes: `${guests}`,
      prestations: Array.from(new Set([...prev.prestations, formula.id, ...options]))
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.")
      }

      setReferenceId(result.referenceId || "LCF-" + Math.floor(100000 + Math.random() * 900000))
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Erreur soumission devis :", err)
      setErrorMessage(err.message || "Impossible d'envoyer votre demande. Merci de nous contacter par téléphone.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFF8E1] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-yellow-200 text-center animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-400">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#FF5722] bg-[#FFF8E1] px-3 py-1 rounded-full border border-[#FFD54F]">
            Demande bien reçue · Réf : {referenceId}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E88E5] mt-4 mb-3">
            Merci {formData.prenom} !
          </h1>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Votre demande de devis pour votre événement prévu le <strong>{formData.dateEvenement}</strong> à <strong>{formData.lieu}</strong> a été enregistrée avec succès.
          </p>

          <div className="bg-[#FFF8E1] rounded-2xl p-4 text-left text-sm text-gray-800 border border-yellow-200 mb-8 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Invités prévus :</span>
              <span className="font-bold">{formData.nombrePersonnes} personnes</span>
            </div>
            {formData.formuleChoisie && (
              <div className="flex justify-between">
                <span className="text-gray-500">Formule :</span>
                <span className="font-bold text-[#1E88E5]">{formData.formuleChoisie}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Proposition :</span>
              <span className="font-bold text-[#FF5722]">Étude sur-mesure sous 24h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Délai de réponse :</span>
              <span className="font-bold text-emerald-700">Sous 24h ouvrées</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+33662350953" className="w-full sm:w-auto">
              <Button className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-xl py-3 font-bold gap-2">
                <Phone className="h-4 w-4" />
                <span>Nous appeler directement</span>
              </Button>
            </a>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full rounded-xl py-3 font-bold">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToEvents')}
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <div className="flex justify-center mb-6">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#D84315] bg-[#FFD54F]/30 px-3.5 py-1.5 rounded-full border border-[#FFD54F]">
            Traiteur Foodtruck · Montpellier & Occitanie
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#1E88E5] mt-4 mb-3">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            {t('description')}
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <SocialNav />
        </div>

        {/* 1. Simulateur de budget interactif */}
        <div className="max-w-4xl mx-auto">
          <DevisSimulator onSelectFormula={handleFormulaFromSimulator} />
        </div>

        {/* 2. Formulaire de devis connecté */}
        <div id="formulaire-devis" className="mx-auto max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Coordonnées & Modalités de votre Événement
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Remplissez les détails ci-dessous pour bloquer une option sur votre date et recevoir votre proposition détaillée.
            </p>
            {formData.formuleChoisie && (
              <div className="mt-4 p-3 rounded-xl bg-[#E3F2FD] border border-[#BBDEFB] text-xs text-[#0D47A1] flex items-center gap-2">
                <span className="font-bold">Formule présélectionnée :</span>
                <span>{formData.formuleChoisie}</span>
                <span className="text-gray-600">({formData.nombrePersonnes} invités)</span>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prenom">{t('firstName')}</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  placeholder="Ex : Marie"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">{t('lastName')}</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  placeholder="Ex : Dupont"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="marie.dupont@exemple.fr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">{t('phone')}</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange("telephone", e.target.value)}
                  placeholder="06 12 34 56 78"
                  required
                />
              </div>
            </div>

            {/* Détails de l'événement */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="typeEvenement">{t('eventType')}</Label>
                <Select
                  value={formData.typeEvenement}
                  onValueChange={(value) => handleInputChange("typeEvenement", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholderSelectType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mariage">{t('types.wedding')}</SelectItem>
                    <SelectItem value="lendemain-mariage">Lendemain de Mariage (Brunch)</SelectItem>
                    <SelectItem value="entreprise">{t('types.business')}</SelectItem>
                    <SelectItem value="anniversaire">{t('types.birthday')}</SelectItem>
                    <SelectItem value="festival">{t('types.festival')}</SelectItem>
                    <SelectItem value="bapteme">{t('types.baptism')}</SelectItem>
                    <SelectItem value="autre">{t('types.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateEvenement">{t('eventDate')}</Label>
                <Input
                  id="dateEvenement"
                  type="date"
                  value={formData.dateEvenement}
                  onChange={(e) => handleInputChange("dateEvenement", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="heureDebut">{t('startTime')}</Label>
                <Input
                  id="heureDebut"
                  type="time"
                  value={formData.heureDebut}
                  onChange={(e) => handleInputChange("heureDebut", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heureFin">{t('endTime')}</Label>
                <Input
                  id="heureFin"
                  type="time"
                  value={formData.heureFin}
                  onChange={(e) => handleInputChange("heureFin", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombrePersonnes" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#1E88E5]" />
                  {t('numPeople')}
                </Label>
                <Input
                  id="nombrePersonnes"
                  value={formData.nombrePersonnes}
                  onChange={(e) => handleInputChange("nombrePersonnes", e.target.value)}
                  placeholder="Ex : 70 personnes"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-[#1E88E5]" />
                  {t('budget')}
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholderBudget')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-definir">À définir ensemble / Selon devis</SelectItem>
                    <SelectItem value="500-1000">500€ - 1000€</SelectItem>
                    <SelectItem value="1000-2000">1000€ - 2000€</SelectItem>
                    <SelectItem value="2000-3000">2000€ - 3000€</SelectItem>
                    <SelectItem value="3000-5000">3000€ - 5000€</SelectItem>
                    <SelectItem value="5000+">Plus de 5000€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lieu */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lieu">{t('location')}</Label>
                <Input
                  id="lieu"
                  value={formData.lieu}
                  onChange={(e) => handleInputChange("lieu", e.target.value)}
                  placeholder="Ex : Domaine viticole, Salle des fêtes, Entreprise..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codePostal">{t('postalCode')}</Label>
                <Input
                  id="codePostal"
                  value={formData.codePostal}
                  onChange={(e) => handleInputChange("codePostal", e.target.value)}
                  placeholder="34000 Montpellier, Castelnau, etc."
                  required
                />
              </div>
            </div>

            {/* Prestations souhaitées */}
            <div className="space-y-3 pt-2">
              <Label className="font-bold text-gray-800">{t('prestations')}</Label>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { id: "burgers", label: t('prestationsList.burgers') },
                  { id: "bobuns", label: t('prestationsList.bobuns') },
                  { id: "pokebowls", label: t('prestationsList.pokebowls') },
                  { id: "wraps", label: t('prestationsList.wraps') },
                  { id: "salades", label: t('prestationsList.salades') },
                  { id: "fritures", label: t('prestationsList.fritures') },
                  { id: "vegetarien", label: t('prestationsList.vegetarien') },
                  { id: "desserts", label: t('prestationsList.desserts') },
                  { id: "boissons", label: t('prestationsList.boissons') },
                  { id: "aperitif", label: t('prestationsList.aperitif') },
                ].map((prestation) => (
                  <div key={prestation.id} className="flex items-center space-x-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-100/80 transition-colors">
                    <Checkbox
                      id={prestation.id}
                      checked={formData.prestations.includes(prestation.id)}
                      onCheckedChange={(checked) => handlePrestationChange(prestation.id, checked as boolean)}
                    />
                    <Label htmlFor={prestation.id} className="cursor-pointer text-xs font-medium text-gray-800">
                      {prestation.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentaires */}
            <div className="space-y-2">
              <Label htmlFor="commentaires">
                {t('comments')}
              </Label>
              <Textarea
                id="commentaires"
                value={formData.commentaires}
                onChange={(e) => handleInputChange("commentaires", e.target.value)}
                placeholder={t('placeholderComments')}
                rows={4}
              />
            </div>

            {/* Bouton de soumission */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Traitement et envoi en cours...</span>
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>Envoyer ma demande de réservation</span>
                  </span>
                )}
              </Button>
              <p className="mt-3 text-xs text-gray-500">
                🔒 Vos données restent confidentielles. Réponse garantie sous 24h ouvrées.
              </p>
            </div>
          </form>
        </div>

        {/* 3. Avis Google & Témoignages */}
        <div className="max-w-4xl mx-auto">
          <GoogleReviewsBanner />
        </div>
      </div>
    </div>
  )
}
