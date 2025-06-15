import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import type { Metadata, Viewport } from "next"
import { SocialNav } from "@/components/social-nav"

export const viewport: Viewport = {
  themeColor: "#1E88E5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Événements | La Confrérie Foodtruck - Mariages, Festivals, Entreprises",
  description: "La Confrérie Foodtruck pour vos événements : mariages, festivals, événements d'entreprise. Une expérience culinaire unique avec notre foodtruck.",
  openGraph: {
    title: "Événements | La Confrérie Foodtruck",
    description: "La Confrérie Foodtruck pour vos événements : mariages, festivals, événements d'entreprise.",
    type: "website",
  }
}

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <SocialNav />
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">
          La Confrérie pour votre événement
        </h1>

        <div className="mx-auto max-w-4xl mb-12 text-center">
          <p className="text-lg text-gray-700">
            Pour vos événements spéciaux, nous proposons une carte étendue et personnalisable avec une variété de plats
            au-delà de nos burgers traditionnels.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-[#E53935] mb-8 text-center">
            Nos spécialités pour événements
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935]">BOBUN THAÏ</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="bobun" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  Vermicelles de riz, légumes croquants, poulet ou tofu, cacahuètes, sauce thaï
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">(option VG)</span>
                </div>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935]">POKEBOWL HAWAÏEN</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="pokebowl" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  Riz, saumon ou thon mariné, avocat, mangue, concombre, graines, sauce soja
                </p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">(option VG)</span>

                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935]">WRAP POULET</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="wrap" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">Tortilla, poulet grillé, crudités, sauce yaourt aux herbes</p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">(option VG)</span>
                </div>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935]">FRITURE DE CALAMARS</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="friture" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">Calamars frits, sauce tartare maison, quartier de citron</p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">(option VG)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FF5722]"
                >
                  <path d="M19 8.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 5 0Z" />
                  <path d="M10 9.5V10a2.5 2.5 0 0 0 5 0V9" />
                  <path d="M19 9.5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#E53935]">Mariages</h4>
              <p className="mt-2 text-sm text-gray-700">
                Offrez une expérience culinaire unique à vos invités avec nos délicieux plats artisanaux.
              </p>
            </div>

            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FF5722]"
                >
                  <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                  <circle cx="17" cy="7" r="5" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#E53935]">Festivals</h4>
              <p className="mt-2 text-sm text-gray-700">
                Nous nous adaptons à tous types d'événements avec une capacité de service importante.
              </p>
            </div>

            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FF5722]"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#E53935]">Événements d'entreprise</h4>
              <p className="mt-2 text-sm text-gray-700">
                Impressionnez vos collaborateurs avec une pause déjeuner originale et conviviale.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-[#F5F5F5] p-4 rounded-lg">
            <h4 className="font-display text-lg font-bold text-[#1E88E5] mb-2">Notre offre événementielle</h4>
            <p className="text-gray-700 mb-4">
              La Confrérie Foodtruck s'adapte à vos besoins pour rendre votre événement inoubliable. Nous proposons :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Des menus personnalisés selon vos préférences et votre budget</li>
              <li>Une équipe professionnelle et souriante</li>
              <li>Des produits frais et de qualité</li>
              <li>Une logistique adaptée à votre événement</li>
              <li>Des options végétariennes et véganes disponibles</li>
              <li>Des plats faits maison préparés sur place</li>
              <li>
                <span className="font-bold">Une variété de plats au-delà des burgers :</span> bobuns, pokebowls, wraps,
                fritures et bien plus
              </li>
            </ul>

            <div className="mt-8 p-4 border border-[#FFD54F] rounded-lg bg-white">
              <h4 className="font-display text-lg font-bold text-[#E53935] mb-2">Nos formules événementielles</h4>

              <div className="space-y-4">
                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">Formule Essentielle</h5>
                  <p className="text-sm text-gray-700">Burger au choix + Frites + Boisson</p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">À partir de 15€/personne</p>
                </div>

                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">Formule Conviviale</h5>
                  <p className="text-sm text-gray-700">
                    Assortiment de burgers à partager + Frites + Boissons + Dessert
                  </p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">À partir de 22€/personne</p>
                </div>

                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">Formule Premium</h5>
                  <p className="text-sm text-gray-700">
                    Apéritifs + Choix varié (burgers, bobuns, pokebowls, wraps) + Accompagnements + Desserts + Boissons
                  </p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">À partir de 30€/personne</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/devis">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">
                  <Mail className="mr-2 h-4 w-4" />
                  Demander un devis personnalisé
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
