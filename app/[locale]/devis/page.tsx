"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { ArrowLeft, Mail, Calendar, Users, MapPin, Euro } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

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
    nombrePersonnes: "",
    lieu: "",
    codePostal: "",
    budget: "",
    prestations: [] as string[],
    commentaires: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrestationChange = (prestation: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      prestations: checked ? [...prev.prestations, prestation] : prev.prestations.filter((p) => p !== prestation),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFF8E1] flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-[#1E88E5] mb-4">Merci !</h1>
            <p className="text-lg text-gray-700 mb-8">Votre demande a été envoyée avec succès. Nous vous répondrons très bientôt.</p>
            <Link href="/">
              <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">Retour à l'accueil</Button>
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
          <Link href="/evenements">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToEvents')}
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] mb-4 text-center">{t('title')}</h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prenom">{t('firstName')}</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">{t('lastName')}</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
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
                    <SelectItem value="anniversaire">{t('types.birthday')}</SelectItem>
                    <SelectItem value="entreprise">{t('types.business')}</SelectItem>
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
                  <Users className="h-4 w-4" />
                  {t('numPeople')}
                </Label>
                <Select
                  value={formData.nombrePersonnes}
                  onValueChange={(value) => handleInputChange("nombrePersonnes", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholderNumPeople')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20-50">20 - 50 personnes</SelectItem>
                    <SelectItem value="50-100">50 - 100 personnes</SelectItem>
                    <SelectItem value="100-150">100 - 150 personnes</SelectItem>
                    <SelectItem value="150-200">150 - 200 personnes</SelectItem>
                    <SelectItem value="200-300">200 - 300 personnes</SelectItem>
                    <SelectItem value="300+">Plus de 300 personnes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  {t('budget')}
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholderBudget')} />
                  </SelectTrigger>
                  <SelectContent>
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
            <div className="space-y-2">
              <Label htmlFor="lieu">{t('location')}</Label>
              <Input
                id="lieu"
                value={formData.lieu}
                onChange={(e) => handleInputChange("lieu", e.target.value)}
                placeholder={t('placeholderLocation')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codePostal">{t('postalCode')}</Label>
              <Input
                id="codePostal"
                value={formData.codePostal}
                onChange={(e) => handleInputChange("codePostal", e.target.value)}
                placeholder={t('placeholderPostalCode')}
                required
              />
            </div>

            {/* Prestations souhaitées */}
            <div className="grid gap-4 md:grid-cols-2">
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
                <div key={prestation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={prestation.id}
                    checked={formData.prestations.includes(prestation.id)}
                    onCheckedChange={(checked) => handlePrestationChange(prestation.id, checked as boolean)}
                  />
                  <Label htmlFor={prestation.id}>{prestation.label}</Label>
                </div>
              ))}
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
                rows={5}
              />
            </div>

            {/* Bouton de soumission */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1E88E5] hover:bg-[#1565C0] px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    {t('submit')}
                  </>
                )}
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                {t('responseTime')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
