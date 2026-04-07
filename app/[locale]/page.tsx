"use client"

import Image from "next/image"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'

import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function Home() {
  const t = useTranslations('HomePage')
  const navT = useTranslations('Navigation')
  const iconsT = useTranslations('FoodIcons')

  return (
    <div className="min-h-screen bg-menu-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-menu-yellow opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-20 h-48 w-48 rounded-full bg-menu-red opacity-60 animate-float animation-delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-menu-blue opacity-50 animate-float animation-delay-2000"></div>

        <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <LanguageToggle />
          </div>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h1 className="font-cooper text-5xl font-bold text-menu-blue md:text-6xl">
                {t('hero.title')}
                <span className="block text-menu-red">{t('hero.subtitle')}</span>
              </h1>
              <p className="mt-4 text-lg text-gray-700">{t('hero.description')}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <Link href="/locations">
                  <Button className="bg-menu-red hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-300">
                    <MapPin className="mr-2 h-4 w-4" />
                    {t('hero.findUs')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-menu-blue text-menu-blue hover:bg-menu-blue hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-400"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {t('hero.contactUs')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80 animate-bounce-gentle">
              <SiteLogo size="large" background="yellow" />
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SocialNav />
      </div>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">{t('menu.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200"></div>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHEESY BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <Image 
                        src="/images/burgers/cheese.jpeg" 
                        alt="Cheese Burger" 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="mt-2 item-description">
                    Steak au choix, cheddar, laitue, tomates, oignons rouges, cornichons, sauce cheese
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,50€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('menu.veggieOption')}</span>
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
                  <p className="mt-2 item-description">
                    Steak au choix, laitue, tomates, oignons rouges, cornichons, cheddar, bacon, sauce BBQ
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">15,50€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('menu.veggieOption')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHICKEN BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
                      <FoodIcon name="tenders" size={32} className="text-[#FF5722]" />
                    </div>
                  </div>
                  <p className="mt-2 item-description">
                    Poulet frit, cheddar, laitue, oignons frits, sauce Curry Mango
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">14,90€</span>
                    <span className="text-xs text-green-600 font-semibold">{t('menu.veggieOption')}</span>
                  </div>
                </div>

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
                    <span className="font-bold text-[#FF5722]">12,50€</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-3 text-center mx-auto max-w-xs mb-4">
                <p className="font-display font-bold text-[#E53935]">
                  <span className="text-sm font-bold text-gray-700">{t('menu.dailySpecial')}</span>
                  <br />
                  <span className="text-xs text-gray-700">{t('menu.dailySpecialDesc')}</span>
                </p>
              </div>
              <div className="text-center">
                <Link href="/menu">
                  <Button className="bg-[#E53935] hover:bg-[#C62828]">{t('menu.viewFull')}</Button>
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
            <h2 className="section-title animate-fade-in-up">{t('locations.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200"></div>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
                  <div>
                    <h3 className="font-display text-lg font-bold">{t('locations.address')}</h3>
                    <p className="text-gray-700">{t('locations.city')}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#1E88E5]" />
                      <span>{t('locations.hours')}</span>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p><span className="font-semibold">{t('locations.tram')}</span> {t('locations.tramDesc')}</p>
                      <p><span className="font-semibold">{t('locations.parking')}</span> {t('locations.parkingDesc')}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${t('locations.address')}, ${t('locations.city')}`)}`, "_blank")}
                        >
                          <MapPin className="mr-1 h-3 w-3" />{t('locations.getDirections')}
                        </Button>
                        <Link href="/locations">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
                          >
                            {t('locations.moreInfo')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${t('locations.address')}, ${t('locations.city')}`)}&output=embed`}
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
            <h2 className="section-title animate-fade-in-up">{t('events.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200"></div>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              {t('events.description')}
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-[#FFF8E1] p-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-400">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
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
                <h4 className="font-display text-lg font-bold text-[#E53935]">{t('events.weddings')}</h4>
                <p className="mt-2 text-sm text-gray-700">{t('events.weddingsDesc')}</p>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-500">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
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
                <h4 className="font-display text-lg font-bold text-[#E53935]">{t('events.festivals')}</h4>
                <p className="mt-2 text-sm text-gray-700">{t('events.festivalsDesc')}</p>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-600">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] transition-transform duration-300 hover:scale-110 hover:rotate-3">
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
                <h4 className="font-display text-lg font-bold text-[#E53935]">{t('events.corporate')}</h4>
                <p className="mt-2 text-sm text-gray-700">{t('events.corporateDesc')}</p>
              </div>
            </div>

            <div className="mt-8 bg-[#F5F5F5] p-6 rounded-lg">
              <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4 text-center">
                {t('events.specialties')}
              </h3>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="bobun" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('bobun')}</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="pokebowl" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('pokebowl')}</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="wrap" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('wrap')}</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="friture" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('friture')}</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="dessert" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('dessert')}</p>
                </div>

                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="specialite" size={20} className="text-[#FF5722]" />
                  </div>
                  <p className="text-xs font-bold">{iconsT('specialite')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/evenements">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">
                  {t('events.learnMore')}
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
            <h2 className="section-title animate-fade-in-up">{t('contact.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]"></div>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#1E88E5]" />
                  <a href="mailto:contact@laconfrerietruck.fr" className="text-lg hover:text-[#FF5722]">
                    contact@laconfrerietruck.fr
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#1E88E5]" />
                  <a href="tel:0662350953" className="text-lg hover:text-[#FF5722]">
                    06 62 35 09 53
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
                    href="https://facebook.com/laconfrerietruck"
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
                <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">{t('contact.reservations')}</h3>
                <p className="mb-4 text-gray-700">
                  {t('contact.reservationsDesc')}
                </p>
                <Link href="/devis">
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-400">{t('contact.getQuote')}</Button>
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
              <span className="font-display text-xl font-bold">{t('hero.title')}</span>
            </div>

            <div className="flex gap-6">
              <Link href="/menu" className="hover:text-[#FFD54F]">
                {navT('menu')}
              </Link>
              <Link href="/locations" className="hover:text-[#FFD54F]">
                {navT('locations')}
              </Link>
              <Link href="/evenements" className="hover:text-[#FFD54F]">
                {navT('events')}
              </Link>
              <Link href="/contact" className="hover:text-[#FFD54F]">
                {navT('contact')}
              </Link>
            </div>

            <div className="text-sm">{t('footer.rights', { year: new Date().getFullYear() })}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
