"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Calendar, Users, MapPin, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"

export default function DevisPage() {
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
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-display text-[#1E88E5]">Demande envoyée !</CardTitle>
              <CardDescription className="text-lg">
                Merci pour votre demande de devis. Nous vous contacterons dans les 24h pour discuter de votre projet.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/">
                <Button className="bg-[#FF5722] hover:bg-[#E64A19]">Retour à l'accueil</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/evenements">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux événements
            </Button>
          </Link>
        </div>

        {/* Modifier la section du logo */}
        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-[#1E88E5] mb-4">Demande de devis personnalisé</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Remplissez ce formulaire et nous vous proposerons une offre sur mesure pour votre événement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-[#E53935]">Vos informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => handleInputChange("prenom", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom *</Label>
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Détails de l'événement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-[#E53935] flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Votre événement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="typeEvenement">Type d'événement *</Label>
                    <Select
                      value={formData.typeEvenement}
                      onValueChange={(value) => handleInputChange("typeEvenement", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mariage">Mariage</SelectItem>
                        <SelectItem value="anniversaire">Anniversaire</SelectItem>
                        <SelectItem value="entreprise">Événement d'entreprise</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="bapteme">Baptême / Communion</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateEvenement">Date de l'événement *</Label>
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
                    <Label htmlFor="heureDebut">Heure de début</Label>
                    <Input
                      id="heureDebut"
                      type="time"
                      value={formData.heureDebut}
                      onChange={(e) => handleInputChange("heureDebut", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heureFin">Heure de fin</Label>
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
                      Nombre de personnes *
                    </Label>
                    <Select
                      value={formData.nombrePersonnes}
                      onValueChange={(value) => handleInputChange("nombrePersonnes", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nombre d'invités" />
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
                      Budget approximatif
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Votre budget" />
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
              </CardContent>
            </Card>

            {/* Lieu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-[#E53935] flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lieu de l'événement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lieu">Adresse ou lieu *</Label>
                  <Input
                    id="lieu"
                    value={formData.lieu}
                    onChange={(e) => handleInputChange("lieu", e.target.value)}
                    placeholder="Adresse complète ou nom du lieu"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codePostal">Code postal *</Label>
                  <Input
                    id="codePostal"
                    value={formData.codePostal}
                    onChange={(e) => handleInputChange("codePostal", e.target.value)}
                    placeholder="34000"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prestations souhaitées */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-[#E53935]">Prestations souhaitées</CardTitle>
                <CardDescription>Sélectionnez les services qui vous intéressent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { id: "burgers", label: "Burgers classiques" },
                    { id: "bobuns", label: "Bobuns thaï" },
                    { id: "pokebowls", label: "Pokebowls" },
                    { id: "wraps", label: "Wraps" },
                    { id: "salades", label: "Salades" },
                    { id: "fritures", label: "Fritures de poisson" },
                    { id: "vegetarien", label: "Options végétariennes" },
                    { id: "desserts", label: "Desserts" },
                    { id: "boissons", label: "Boissons" },
                    { id: "aperitif", label: "Apéritif" },
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
              </CardContent>
            </Card>

            {/* Commentaires */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-[#E53935]">Informations complémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="commentaires">
                    Décrivez votre projet, vos attentes particulières, contraintes...
                  </Label>
                  <Textarea
                    id="commentaires"
                    value={formData.commentaires}
                    onChange={(e) => handleInputChange("commentaires", e.target.value)}
                    placeholder="Parlez-nous de votre événement, de vos préférences culinaires, des contraintes du lieu, etc."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

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
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma demande
                  </>
                )}
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                Nous vous répondrons dans les 24h avec une proposition personnalisée
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
