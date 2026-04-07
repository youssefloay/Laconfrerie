"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'

import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function MenuPage() {
  const t = useTranslations('MenuPage')
  const navT = useTranslations('Navigation')

  return (
    <div className="min-h-screen bg-menu-cream">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-menu-blue">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {navT('home')}
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        {/* Modifier la section du logo */}
        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <h1 className="section-title text-center mb-12 animate-fade-in-up">{t('title')}</h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
        </div>

        {/* Burgers */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('burgers')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">HAMBURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <FoodIcon name="burger" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak au choix, laitue, tomates, oignons rouges, cornichons, ketchup, mayonnaise. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">12,9€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('burgers').toLowerCase().includes('veggie') ? '' : 'Option Veggie 🌱'}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">BACON BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <Image 
                        src="/images/burgers/bacon.jpeg" 
                        alt="Bacon Burger" 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak au choix, laitue, tomates, oignons rouges, cornichons, cheddar, bacon, sauce BBQ. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">15,5€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHEESY BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <Image 
                        src="/images/burgers/cheese.jpeg" 
                        alt="Cheesy Burger" 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak au choix, cheddar, laitue, tomates, oignons rouges, cornichons, sauce cheese. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,5€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-600">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHICKEN BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Poulet frit, cheddar, laitue, oignons frits, sauce Curry Mango. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,9€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">RACLETTE BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <FoodIcon name="burger" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Steak au choix, raclette, oignons caramélisés, laitue, tomates, cornichons, sauce burger. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">16,9€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full mt-6">
              <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-4 text-center mx-auto max-w-xs">
                <p className="font-display font-bold text-[#E53935] whitespace-pre-line">
                  {t('veggieNote')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sides */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('sides')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">FRITES MAISON</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="fries" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">TENDERS X4</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">7,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">TENDERS X6</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">9,00 €</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">TENDERS X8</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">11,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">PETITE SALADE</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">ROQUETTE & PARMESAN</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">5,00 €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desserts */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('desserts')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                {t('homemadeDesserts')}
              </p>
              <p className="text-gray-700 font-semibold">
                {t('discoverOnSite')}
              </p>
            </div>
          </div>
        </div>

        {/* Plat du jour */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('dailySpecial')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                {t('dailySpecialNote')}
              </p>
              <p className="text-gray-700 font-semibold">
                {t('homemadeNote')}
              </p>
            </div>
          </div>
        </div>

        {/* Salades */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('salads')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">SALADE CÉSAR</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Laitue, poulet, tomates cerise, oeuf mollet, croûtons, parmesan, sauce César
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">12,50€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">SALADE DU MOMENT</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Retrouvez-la sur notre pancarte ou nos réseaux (Instagram, Facebook).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boissons */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{t('drinks')}</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CANETTE</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">2,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">EAU</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">1,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">BIÈRE HEINEKEN</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,00 €</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CAFÉ</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">2,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">BOUTEILLE DE VIN</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">11 €</span>
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
              {t('eventQuestion')}
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              {t('eventDesc')}
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
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">{t('eventCTA')}</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu Etudiant */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="rounded-2xl bg-menu-blue p-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FoodIcon name="burger" size={120} />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">{t('studentOffer')}</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="text-center">
                  <p className="text-lg opacity-90 mb-1">{t('studentPromo')}</p>
                  <p className="text-4xl font-bold text-menu-yellow">10,50€</p>
                </div>
                <div className="hidden md:block h-12 w-px bg-white/20"></div>
                <div className="text-center">
                  <p className="text-lg opacity-90 mb-1">{t('studentDiscount')}</p>
                  <p className="text-4xl font-bold text-menu-yellow">-10%</p>
                </div>
              </div>
              <p className="mt-6 text-sm opacity-80 italic">{t('studentRequirement')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

