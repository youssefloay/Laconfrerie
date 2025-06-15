import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import type { Metadata } from "next"
import { SocialNav } from "@/components/social-nav"

export const metadata: Metadata = {
  title: "Menu | La Confrérie Foodtruck - Burgers & Salades à Villeneuve-lès-Maguelone",
  description: "Découvrez notre menu de burgers gourmets et salades fraîches. Des ingrédients de qualité et des recettes savoureuses à la Plage du Pilou.",
  openGraph: {
    title: "Menu | La Confrérie Foodtruck",
    description: "Découvrez notre menu de burgers gourmets et salades fraîches à la Plage du Pilou.",
    type: "website",
  }
}

export default function MenuPage() {
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

        {/* Modifier la section du logo */}
        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#E53935] text-center mb-12">Notre Menu</h1>

        {/* Burgers */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="font-display text-3xl font-bold text-[#1E88E5] mb-8 text-center">Nos Burgers</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">CHEESE BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="burger" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak, salade, tomate, oignon, cornichon, cheddar, sauce cheese
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">12.5€</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">BACON BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="bacon" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak, salade, tomate, oignon, cornichon, cheddar, bacon, sauce BBQ
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">13€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">VEGGIE BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="burger" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak, salade, tomate, oignon, cornichon, cheddar, sauce cheese
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">12.5€</span>
                    <span className="text-xs text-gray-500">(100% VG)</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">BURGER DU MOMENT</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="specialite" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Demandez notre création du moment, élaborée avec des produits de saison
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">13.5€</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full mt-6">
              <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-4 text-center mx-auto max-w-xs">
                <p className="font-display font-bold text-[#E53935]">
                  +5€ FRITES
                  <br />
                  ET BOISSON
                  <br />
                  <span className="text-xs">(avec burger uniquement)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Salades */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="font-display text-3xl font-bold text-[#1E88E5] mb-8 text-center">Nos Salades</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">SALADE CÉSAR</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Laitue, poulet, tomates cerise, oeuf mollet, croûtons, parmesan, sauce César
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">10.5€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">SALADE DU MOMENT</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">Demandez notre salade de saison</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accompagnements et Boissons */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="font-display text-3xl font-bold text-[#1E88E5] mb-8 text-center">
            Accompagnements & Boissons
          </h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">TENDERS</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>4 pièces</span>
                      <span className="font-bold text-[#FF5722]">5.9€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6 pièces</span>
                      <span className="font-bold text-[#FF5722]">7.9€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8 pièces</span>
                      <span className="font-bold text-[#FF5722]">9.9€</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">FRITES MAISON</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="fries" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">4€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-[#E53935]">BOISSONS</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Café</span>
                      <span className="font-bold text-[#FF5722]">2€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Canette</span>
                      <span className="font-bold text-[#FF5722]">3.5€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bière</span>
                      <span className="font-bold text-[#FF5722]">4€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eau</span>
                      <span className="font-bold text-[#FF5722]">2€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note sur les événements */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="rounded-2xl bg-[#E3F2FD] p-6 shadow-lg md:p-8">
            <h2 className="font-display text-2xl font-bold text-[#1E88E5] mb-4 text-center">
              Vous organisez un événement ?
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Pour vos mariages, festivals ou événements d'entreprise, nous proposons une carte étendue avec des options
              supplémentaires :
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="bobun" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Bobuns</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="pokebowl" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Pokebowls</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="wrap" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Wraps</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="friture" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Fritures</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="dessert" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Desserts</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="specialite" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">Spécialités</h4>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/evenements">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">Découvrir nos offres événementielles</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
