"use client"

import Link from "next/link"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#FFD54F] opacity-70"></div>
        <div className="absolute top-40 -right-20 h-48 w-48 rounded-full bg-[#FF7043] opacity-60"></div>
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#4FC3F7] opacity-50"></div>

        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h1 className="font-display text-5xl font-bold text-[#1E88E5] md:text-6xl">
                LA CONFRÉRIE
                <span className="block text-[#FF5722]">FOODTRUCK</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700">Savourez nos délicieux burgers dans une ambiance estivale !</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <Link href="/locations">
                  <Button className="bg-[#FF5722] hover:bg-[#E64A19]">
                    <MapPin className="mr-2 h-4 w-4" />
                    Nous trouver
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
              <SiteLogo size="large" background="yellow" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-[#E53935]">MENU</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]"></div>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
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
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-3 text-center mx-auto max-w-xs mb-4">
                <p className="font-display font-bold text-[#E53935]">
                  +5€ FRITES ET BOISSON
                  <br />
                  <span className="text-xs">(avec burger uniquement)</span>
                </p>
              </div>
              <div className="text-center">
                <Link href="/menu">
                  <Button className="bg-[#E53935] hover:bg-[#C62828]">Voir le menu complet</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Hours Section */}
      <section id="locations" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-[#1E88E5]">OÙ NOUS TROUVER</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]"></div>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
                  <div>
                    <h3 className="font-display text-lg font-bold">Plage du Pilou</h3>
                    <p className="text-gray-700">À côté de la Stèle aux démineurs du Languedoc</p>
                    <p className="text-gray-700">34750 Villeneuve-lès-Maguelone</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#1E88E5]" />
                      <span>Tous les jours: 11h30 - 18h30</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">GPS: 43.506683, 3.883924</div>
                    <div className="mt-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                          onClick={() => window.open("https://maps.app.goo.gl/co6Xn3KF6ieAuDhB7", "_blank")}
                        >
                          <MapPin className="mr-1 h-3 w-3" />Y aller
                        </Button>
                        <Link href="/locations">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
                          >
                            Plus d'informations
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2717836843!2d3.881335776777344!3d43.50668347110525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b1c1c1c1c1c1%3A0x0!2sPlage%20du%20Pilou!5e0!3m2!1sfr!2sfr!4v1716567890123!5m2!1sfr!2sfr&markers=color:red%7Clabel:F%7C43.506683,3.883924"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section id="evenements" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-[#1E88E5]">ÉVÉNEMENTS</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]"></div>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              Pour vos événements, nous proposons une carte étendue avec bobuns, pokebowls, wraps et bien plus !
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
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
                <p className="mt-2 text-sm text-gray-700">Offrez une expérience culinaire unique à vos invités.</p>
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
                <p className="mt-2 text-sm text-gray-700">Nous nous adaptons à tous types d'événements.</p>
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
                  Impressionnez vos collaborateurs avec une pause déjeuner originale.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-[#F5F5F5] p-6 rounded-lg">
              <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4 text-center">
                Nos spécialités pour événements
              </h3>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="bobun" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Bobuns</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="pokebowl" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Pokebowls</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="wrap" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Wraps</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="friture" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Fritures</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="dessert" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Desserts</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="specialite" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">Spécialités</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/evenements">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">
                  En savoir plus sur nos services événementiels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-[#FF5722]">CONTACTEZ-NOUS</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]"></div>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#1E88E5]" />
                  <a href="tel:0612345678" className="text-lg hover:text-[#FF5722]">
                    06 12 34 56 78
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#1E88E5]" />
                  <a href="mailto:laconfrerie.villeneuve@gmail.com" className="text-lg hover:text-[#FF5722]">
                    laconfrerie.villeneuve@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-[#1E88E5]" />
                  <a
                    href="https://instagram.com/laconfrerietruck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-[#FF5722]"
                  >
                    @laconfrerietruck
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Facebook className="h-5 w-5 text-[#1E88E5]" />
                  <a
                    href="https://facebook.com/laconfreriefoodtruck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-[#FF5722]"
                  >
                    La Confrérie Foodtruck
                  </a>
                </div>
              </div>

              <div>
                <div className="mb-4 flex justify-center">
                  <SiteLogo size="medium" background="yellow" />
                </div>
                <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">Réservations</h3>
                <p className="mb-4 text-gray-700">
                  Vous organisez un événement ? Contactez-nous pour réserver notre foodtruck !
                </p>
                <Link href="/devis">
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19]">Demander un devis</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E88E5] py-8 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <SiteLogo size="small" background="white" />
              <span className="font-display text-xl font-bold">LA CONFRÉRIE</span>
            </div>

            <div className="flex gap-6">
              <Link href="/menu" className="hover:text-[#FFD54F]">
                Menu
              </Link>
              <Link href="/locations" className="hover:text-[#FFD54F]">
                Emplacements
              </Link>
              <Link href="/evenements" className="hover:text-[#FFD54F]">
                Événements
              </Link>
              <Link href="/contact" className="hover:text-[#FFD54F]">
                Contact
              </Link>
            </div>

            <div className="text-sm">© {new Date().getFullYear()} La Confrérie Foodtruck. Tous droits réservés.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
