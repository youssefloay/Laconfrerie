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
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Plage+du+Pilou+Villeneuve-les-Maguelone"

export default function VilleneuveHome() {
  const t = useTranslations('HomePage')
  const navT = useTranslations('Navigation')
  const iconsT = useTranslations('FoodIcons')
  const menuItemsT = useTranslations('MenuItems')

  return (
    <div className="min-h-screen bg-menu-cream">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-menu-yellow opacity-70 animate-float" />
        <div className="absolute top-40 -right-20 h-48 w-48 rounded-full bg-menu-red opacity-60 animate-float animation-delay-1000" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-menu-blue opacity-50 animate-float animation-delay-2000" />

        <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <LanguageToggle />
          </div>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row text-menu-blue">
            <div className="text-center md:text-left">
              <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl animate-fade-in-up">
                LA CONFRÉRIE
                <span className="block text-menu-red">PLAGE 🏖️</span>
              </h1>
              <p className="mt-4 text-xl font-medium text-gray-700 animate-fade-in-up animation-delay-200">
                Des burgers à la plage, l'été à fond !
              </p>

              {/* Location chip */}
              <div className="mt-6 flex flex-col items-center gap-2 md:items-start animate-fade-in-up animation-delay-300">
                <div className="flex items-center gap-3 rounded-full bg-white/50 px-5 py-2 backdrop-blur-sm border border-menu-blue/10 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-menu-blue text-white">
                    <MapPin className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5722]">Villeneuve-lès-Maguelone</span>
                    <span className="text-sm font-bold text-menu-blue leading-none">Plage du Pilou · Entrée N°3</span>
                  </div>
                </div>
                {/* Menu deal badge */}
                <div className="flex items-center gap-2 rounded-full bg-[#FF7043] text-white px-5 py-2 shadow-md">
                  <span className="text-sm font-bold">🍟 Menu +5€ · Frites + Boisson avec tout burger</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start animate-fade-in-up animation-delay-400">
                <Link href="/villeneuve/locations">
                  <Button className="h-12 min-w-[160px] bg-menu-red hover:bg-[#C62828] text-white px-8 text-lg font-bold transition-all hover:scale-105 hover:shadow-lg border-0">
                    <MapPin className="mr-2 h-5 w-5" />Nous trouver
                  </Button>
                </Link>
                <Link href="/villeneuve/menu">
                  <Button variant="outline" className="h-12 min-w-[160px] border-2 border-menu-blue bg-transparent px-8 text-lg font-bold text-menu-blue hover:bg-menu-blue hover:text-white transition-all hover:scale-105 hover:shadow-lg">
                    <Phone className="mr-2 h-5 w-5" />Voir le menu
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

      {/* Menu Preview */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">MENU</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {/* Cheese Burger */}
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHEESE / VEGGIE BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/cheesy+ frites.jpeg" alt="Cheese Burger" width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <p className="mt-2 item-description">Steak, salade, tomate, oignon, cornichon, cheddar, sauce cheese</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">12,50€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>

                {/* Bacon Burger */}
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">BACON BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/bacon+ frites.jpeg" alt="Bacon Burger" width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <p className="mt-2 item-description">Steak, salade, tomate, oignon, cornichon, cheddar, bacon, sauce BBQ</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">13€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* César Salad */}
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">SALADE CÉSAR</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/salade cesar.jpeg" alt="Salade César" width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <p className="mt-2 item-description">Laitue, poulet, tomates cerise, œuf mollet, croutons, parmesan, sauce César</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">11,50€</span>
                  </div>
                </div>

                {/* Daily special */}
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-3 text-center mx-auto max-w-xs mb-2">
                    <p className="font-display font-bold text-[#E53935] text-sm">
                      Burger du Moment<br />
                      <span className="text-xs text-gray-700">Découvrez-le sur nos réseaux !</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/villeneuve/menu">
                <Button className="bg-[#E53935] hover:bg-[#C62828]">Voir le menu complet</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[#FFF8E1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up uppercase tracking-widest">GALERIE PHOTOS</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-300 italic">
              Découvrez nos préparations maison en images
            </p>
          </div>

          <div className="mx-auto max-w-5xl px-12">
            <Carousel opts={{ align: "center", loop: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {[
                  { src: "Dish Composition [5_4-2304x2880] a4e.jpg", alt: "La Confrérie" },
                  { src: "Tenders [5_4-440x550] be6.jpg", alt: "Tenders" },
                  { src: "cheesy+ frites.jpeg", alt: "Cheese Burger" },
                  { src: "bacon+ frites.jpeg", alt: "Bacon Burger" },
                  { src: "salade cesar.jpeg", alt: "Salade César" },
                  { src: "frites.jpeg", alt: "Frites Maison" },
                ].map((item, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="relative h-72 overflow-hidden rounded-2xl border-4 border-white shadow-xl group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <Image src={`/images/menu/${item.src}`} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-display font-medium text-lg uppercase tracking-wider">{item.alt}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 md:-left-12 bg-white text-menu-blue hover:bg-menu-blue hover:text-white border-0 shadow-lg" />
              <CarouselNext className="hidden md:flex -right-4 md:-right-12 bg-white text-menu-blue hover:bg-menu-blue hover:text-white border-0 shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="locations" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">OÙ NOUS TROUVER</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
                  <div>
                    <h3 className="font-display text-lg font-bold">Plage du Pilou · Entrée Plage N°3</h3>
                    <p className="text-gray-700">Villeneuve-lès-Maguelone</p>
                    <p className="text-sm text-gray-500 mt-1">À côté de la Stèle aux Démineurs du Languedoc</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#1E88E5]" />
                      <span>Ouvert cet été</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white" onClick={() => window.open(MAPS_URL, "_blank")}>
                        <MapPin className="mr-1 h-3 w-3" />Y aller
                      </Button>
                      <Link href="/villeneuve/locations">
                        <Button variant="outline" size="sm" className="text-xs border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white">
                          Plus d'infos
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Plage+du+Pilou+Villeneuve-les-Maguelone&output=embed"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="evenements" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">{t('events.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">{t('events.description')}</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: t('events.weddings'), desc: t('events.weddingsDesc'), emoji: "💍" },
                { title: t('events.festivals'), desc: t('events.festivalsDesc'), emoji: "🎪" },
                { title: t('events.corporate'), desc: t('events.corporateDesc'), emoji: "🏢" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg bg-[#FFF8E1] p-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] text-2xl">{item.emoji}</div>
                  <h4 className="font-display text-lg font-bold text-[#E53935]">{item.title}</h4>
                  <p className="mt-2 text-sm text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/villeneuve/evenements">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">{t('events.learnMore')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">{t('contact.title')}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]" />
          </div>
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#1E88E5]" />
                  <a href="mailto:contact@laconfrerietruck.fr" className="text-lg hover:text-[#FF5722]">contact@laconfrerietruck.fr</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#1E88E5]" />
                  <a href="tel:0662350953" className="text-lg hover:text-[#FF5722]">06 62 35 09 53</a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-[#1E88E5]" />
                  <a href="https://instagram.com/laconfrerietruck" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#FF5722]">@laconfrerietruck</a>
                </div>
                <div className="flex items-center gap-3">
                  <Facebook className="h-5 w-5 text-[#1E88E5]" />
                  <a href="https://facebook.com/laconfrerietruck" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#FF5722]">La Confrérie Foodtruck</a>
                </div>
              </div>
              <div>
                <div className="mb-4 flex justify-center"><SiteLogo size="medium" background="yellow" /></div>
                <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">{t('contact.reservations')}</h3>
                <p className="mb-4 text-gray-700">{t('contact.reservationsDesc')}</p>
                <Link href="/devis">
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] transition-all duration-300 hover:scale-105">{t('contact.getQuote')}</Button>
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
              <span className="font-display text-xl font-bold">LA CONFRÉRIE · PLAGE</span>
            </div>
            <div className="flex gap-6">
              <Link href="/villeneuve/menu" className="hover:text-[#FFD54F]">Menu</Link>
              <Link href="/villeneuve/locations" className="hover:text-[#FFD54F]">Localisation</Link>
              <Link href="/villeneuve/evenements" className="hover:text-[#FFD54F]">Événements</Link>
              <Link href="/villeneuve/contact" className="hover:text-[#FFD54F]">Contact</Link>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} La Confrérie Foodtruck</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
