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
  const menuItemsT = useTranslations('MenuItems')
  const iconsT = useTranslations('FoodIcons')

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
                    <h3 className="item-title">{menuItemsT('hamburger.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3 border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/cheesy+ frites.jpeg" 
                        alt={menuItemsT('hamburger.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('hamburger.description')} {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">12,9€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('veggieOption')}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('baconBurger.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3 border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/bacon+ frites.jpeg" 
                        alt={menuItemsT('baconBurger.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('baconBurger.description')}. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">15,5€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('veggieOption')}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('cheesyBurger.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3 border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/cheesy+ frites.jpeg" 
                        alt={menuItemsT('cheesyBurger.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('cheesyBurger.description')}. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,5€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('veggieOption')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-600">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('chickenBurger.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3 border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/chicken+frites.jpeg" 
                        alt={menuItemsT('chickenBurger.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('chickenBurger.description')}. {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,9€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('veggieOption')}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('racletteBurger.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3 border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/raclette+frites.jpeg" 
                        alt={menuItemsT('racletteBurger.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('racletteBurger.description')} {t('servingSuggestion')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">16,9€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('veggieOption')}</span>
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
                    <h3 className="item-title">{menuItemsT('fries.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/frites.jpeg" 
                        alt={menuItemsT('fries.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('tenders.name')} X4</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                       <Image 
                        src="/images/menu/Tenders [5_4-440x550] be6.jpg" 
                        alt={menuItemsT('tenders.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">7,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('tenders.name')} X6</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                       <Image 
                        src="/images/menu/Tenders [5_4-440x550] be6.jpg" 
                        alt={menuItemsT('tenders.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
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
                    <h3 className="item-title">{menuItemsT('tenders.name')} X8</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                       <Image 
                        src="/images/menu/Tenders [5_4-440x550] be6.jpg" 
                        alt={menuItemsT('tenders.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">11,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('smallSalad.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/salade cesar.jpeg" 
                        alt={menuItemsT('smallSalad.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('arugulaSalad.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image 
                        src="/images/menu/roquette et parmesan.jpeg" 
                        alt={menuItemsT('arugulaSalad.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
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
                    <h3 className="item-title">{menuItemsT('caesarSalad.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                       <Image 
                        src="/images/menu/salade cesar.jpeg" 
                        alt={menuItemsT('caesarSalad.name')} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('caesarSalad.description')}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">12,50€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('dailySalad.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name="salad" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {menuItemsT('dailySalad.description')}
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
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('softDrink.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/soft_drink.png" alt={menuItemsT('softDrink.name')} width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">2,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('water.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/water.png" alt={menuItemsT('water.name')} width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">1,50 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('beer.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/beer.png" alt={menuItemsT('beer.name')} width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">3,00 €</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('coffee.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/coffee.png" alt={menuItemsT('coffee.name')} width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="price">2,00 €</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{menuItemsT('wine.name')}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/rose_wine.png" alt={menuItemsT('wine.name')} width={128} height={128} className="object-cover w-full h-full" />
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
                <h4 className="font-bold">{iconsT('bobun')}</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="pokebowl" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">{iconsT('pokebowl')}</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="wrap" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">{iconsT('wrap')}</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="friture" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">{iconsT('friture')}</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="dessert" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">{iconsT('dessert')}</h4>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54F]">
                  <FoodIcon name="specialite" size={24} className="text-[#FF5722]" />
                </div>
                <h4 className="font-bold">{iconsT('specialite')}</h4>
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

      {/* Sticky Uber Eats Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-gentle md:bottom-20 md:right-10">
        <a
          href="https://www.ubereats.com/fr/store/la-confrerie/8FcWf8cVSG-PBm69V6POGQ?effect="
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-110"
        >
          <Image 
            src="/images/uber-eats-button.png" 
            alt="Order online with Uber Eats" 
            width={200} 
            height={60} 
            className="h-14 w-auto shadow-2xl rounded-2xl border-2 border-white/50"
          />
        </a>
      </div>
    </div>
  )
}

