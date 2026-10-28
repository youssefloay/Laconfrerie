"use client"

import { useState } from "react"
import { Users, Sparkles, Check, ArrowDown, ShieldCheck, HeartHandshake, UtensilsCrossed, Clock, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface FormulaOption {
  id: string
  name: string
  badge?: string
  tagline: string
  description: string
  highlights: string[]
  serviceInfo: string
}

const FORMULAS: FormulaOption[] = [
  {
    id: "street-food",
    name: "Street Food Festive",
    badge: "Populaire Entreprises",
    tagline: "Dynamique, gourmand & décontracté",
    description: "Idéal pour les afterworks rythmés, séminaires d'entreprise et pots de départ où vous voulez un service fluide et sans attente.",
    highlights: [
      "1 Plat au choix des convives (Burgers maison, Bo-buns thaï frais ou Wraps)",
      "Portion généreuse de frites fraîches maison & sauces artisanales",
      "Option végétarienne gourmande garantie pour chaque plat",
      "1 Boisson fraîche au choix (bières locales ou softs artisanaux)"
    ],
    serviceInfo: "Service au comptoir dynamique · ~60 à 100 repas/heure"
  },
  {
    id: "conviviale",
    name: "Conviviale & Gourmande",
    badge: "Le Choix Coup de Cœur",
    tagline: "L'expérience complète salée & sucrée",
    description: "La formule parfaite pour les lendemains de mariage (brunch retour de noces) et fêtes familiales ou anniversaires.",
    highlights: [
      "Carte élargie au choix (Burgers signature, Pokebowls, Bo-buns, Tenders marinés)",
      "Frites maison croustillantes servies à volonté pendant le service",
      "Desserts artisanaux maison préparés par notre chef",
      "Boissons au choix & ambiance musicale au camion"
    ],
    serviceInfo: "Formule décontractée · Plats dressés à la minute"
  },
  {
    id: "prestige",
    name: "Prestige & Cocktail Traiteur",
    badge: "Prestation Complète",
    tagline: "Accueil cocktail + plats signature au camion",
    description: "Une véritable prestation traiteur clé en main qui allie l'accueil cocktail finger food et les plats chauds/frais servis minute.",
    highlights: [
      "Cocktail d'accueil finger food (tenders croustillants, bouchées thaï, sauces maison)",
      "Plats chauds & bols fraîcheur au choix au comptoir du camion",
      "Buffet gourmand de desserts maison & bar à cafés/thés",
      "Équipe dédiée et privatisation longue durée du food truck"
    ],
    serviceInfo: "Service dînatoire complet · Animation festive clé en main"
  }
]

interface DevisSimulatorProps {
  onSelectFormula?: (formula: FormulaOption, guests: number, options: string[]) => void
}

export function DevisSimulator({ onSelectFormula }: DevisSimulatorProps) {
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>("conviviale")
  const [guests, setGuests] = useState<number>(60)
  const [withDessert, setWithDessert] = useState<boolean>(true)
  const [withCoffeeBar, setWithCoffeeBar] = useState<boolean>(false)

  const selectedFormula = FORMULAS.find(f => f.id === selectedFormulaId) || FORMULAS[1]

  const handleApply = () => {
    const optionsApplied: string[] = []
    if (withDessert) optionsApplied.push("Desserts maison inclus")
    if (withCoffeeBar) optionsApplied.push("Bar à café / thés")

    if (onSelectFormula) {
      onSelectFormula(selectedFormula, guests, optionsApplied)
    }

    const formElement = document.getElementById("formulaire-devis")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Dimensionnement logistique selon le nombre d'invités
  const getLogisticsText = (nb: number) => {
    if (nb <= 40) return "1 Foodtruck · 1 à 2 cuisiniers · Service ultra-rapide en 1h"
    if (nb <= 90) return "1 Foodtruck · 2 cuisiniers · Service fluide en continu 1h30 à 2h"
    if (nb <= 160) return "1 Foodtruck dimensionné grands groupes · 3 personnes en cuisine · Débit soutenu"
    return "Grand événement · Équipe renforcée ou double camion · Capacité 200+ personnes"
  }

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-yellow-200/70 mb-12">
      {/* En-tête du configurateur */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-menu-yellow/20 text-[#D84315] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Configurateur d'Événement Sur-Mesure
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E88E5]">
            Configurez votre formule en quelques clics
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Sélectionnez l'ambiance et le nombre d'invités pour une proposition tarifaire 100% adaptée à votre projet.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#FFF8E1] px-4 py-2 rounded-2xl border border-[#FFD54F]">
          <ShieldCheck className="h-5 w-5 text-[#FF5722]" />
          <span className="text-xs font-semibold text-gray-800">Montpellier & Occitanie · Déplacement offert &lt; 30km</span>
        </div>
      </div>

      {/* 1. Choix du nombre de convives */}
      <div className="py-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <label className="font-display font-bold text-gray-800 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#1E88E5]" />
            Nombre d'invités estimé :
          </label>
          <span className="px-4 py-1.5 bg-[#1E88E5] text-white font-extrabold rounded-xl text-base sm:text-lg shadow-sm">
            {guests} personnes
          </span>
        </div>

        <input
          type="range"
          min={25}
          max={250}
          step={5}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E88E5]"
        />

        <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
          <span>25 pers</span>
          <span>50 pers</span>
          <span>100 pers</span>
          <span>150 pers</span>
          <span>250+ pers</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-[#1E88E5] bg-[#E3F2FD]/50 px-3 py-2 rounded-xl">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="font-medium">Dimensionnement : {getLogisticsText(guests)}</span>
        </div>
      </div>

      {/* 2. Choix de la Formule */}
      <div className="py-6 border-b border-gray-100">
        <label className="block font-display font-bold text-gray-800 mb-4">
          Choisissez l'ambiance et la formule souhaitée :
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          {FORMULAS.map((formula) => {
            const isSelected = formula.id === selectedFormulaId
            return (
              <div
                key={formula.id}
                onClick={() => setSelectedFormulaId(formula.id)}
                className={`cursor-pointer rounded-2xl p-5 transition-all duration-200 border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1E88E5] bg-[#E3F2FD]/40 shadow-md scale-[1.01]"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {formula.badge && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD54F] text-[#D84315] shadow-xs">
                    {formula.badge}
                  </span>
                )}

                <div>
                  <div className="mb-2">
                    <h4 className="font-display font-bold text-lg text-gray-900">{formula.name}</h4>
                    <p className="text-xs font-semibold text-[#FF5722] mt-0.5">{formula.tagline}</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">{formula.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {formula.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-[11px] text-gray-500 mb-2 italic flex items-center gap-1">
                    <UtensilsCrossed className="h-3 w-3 text-gray-400" />
                    {formula.serviceInfo}
                  </p>
                  <span className={`text-xs font-bold block text-center py-2 rounded-xl transition-colors ${
                    isSelected ? "bg-[#1E88E5] text-white shadow-xs" : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}>
                    {isSelected ? "✓ Formule Sélectionnée" : "Sélectionner cette formule"}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Options complémentaires */}
      <div className="py-6 border-b border-gray-100 flex flex-wrap gap-4 items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Options souhaitées :</span>
        
        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={withDessert}
            onChange={(e) => setWithDessert(e.target.checked)}
            className="rounded text-[#1E88E5] focus:ring-[#1E88E5]"
          />
          <span>Desserts artisanaux maison inclus</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={withCoffeeBar}
            onChange={(e) => setWithCoffeeBar(e.target.checked)}
            className="rounded text-[#1E88E5] focus:ring-[#1E88E5]"
          />
          <span>Bar à Cafés & Thés après repas</span>
        </label>
      </div>

      {/* Résumé & Bouton validation */}
      <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] -mx-6 -mb-6 p-6 sm:p-8 rounded-b-3xl border-t border-yellow-200">
        <div>
          <span className="text-xs uppercase font-black text-gray-500 tracking-wider">Proposition Commerciale</span>
          <div className="mt-1">
            <h4 className="font-display text-2xl font-extrabold text-[#D84315]">
              Étude & Devis Sur-Mesure Gratuits
            </h4>
            <p className="text-xs text-gray-600 mt-1 max-w-md">
              Chaque événement est unique. Nous calculons le meilleur tarif selon vos effectifs, vos envies de menu et la logistique de votre lieu.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <HeartHandshake className="h-3.5 w-3.5 text-[#1E88E5]" />
            Réponse garantie avec proposition personnalisée sous 24h ouvrées.
          </p>
        </div>

        <Button
          onClick={handleApply}
          className="w-full md:w-auto bg-[#1E88E5] hover:bg-[#1565C0] text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all font-display font-bold text-base flex items-center justify-center gap-2 group flex-shrink-0"
        >
          <span>Appliquer & Compléter ma Demande</span>
          <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
