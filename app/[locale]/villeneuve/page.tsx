"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"

const MAPS_URL = "https://maps.app.goo.gl/qqWYoJfGuXGZj1pM7"

type Lang = "fr" | "en" | "es" | "it" | "de"

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "it", flag: "🇮🇹", label: "IT" },
  { code: "de", flag: "🇩🇪", label: "DE" },
]

const UI: Record<Lang, {
  subtitle: string
  findUs: string
  viewMenu: string
  menuTitle: string
  cheeseDesc: string
  baconDesc: string
  cesarDesc: string
  dailySpecial: string
  dailyDesc: string
  seeFullMenu: string
  galleryTitle: string
  galleryDesc: string
  locationTitle: string
  openSummer: string
  moreInfo: string
  eventsTitle: string
  eventsDesc: string
  weddings: string
  weddingsDesc: string
  festivals: string
  festivalsDesc: string
  corporate: string
  corporateDesc: string
  eventsBtn: string
  contactTitle: string
  reservations: string
  reservationsDesc: string
  quoteBtn: string
}> = {
  fr: {
    subtitle: "Des burgers à la plage, l'été à fond !", findUs: "Nous trouver", viewMenu: "Voir le menu", menuTitle: "MENU",
    cheeseDesc: "Steak, salade, tomate, oignon, cornichon, cheddar, sauce cheese", baconDesc: "Steak, salade, tomate, oignon, cornichon, cheddar, bacon, sauce BBQ",
    cesarDesc: "Laitue, poulet, tomates cerise, œuf mollet, croutons, parmesan, sauce César", dailySpecial: "Burger du Moment", dailyDesc: "Découvrez-le sur nos réseaux !",
    seeFullMenu: "Voir le menu complet", galleryTitle: "GALERIE PHOTOS", galleryDesc: "Découvrez nos préparations maison en images",
    locationTitle: "OÙ NOUS TROUVER", openSummer: "Ouvert cet été", moreInfo: "Plus d'infos",
    eventsTitle: "ÉVÉNEMENTS", eventsDesc: "La Confrérie se déplace pour tous vos événements", weddings: "Mariages & Lendemains", weddingsDesc: "Un repas convivial pour le plus beau jour de votre vie.",
    festivals: "Festivals & Concerts", festivalsDesc: "Une restauration rapide et de qualité pour les grands rassemblements.", corporate: "Événements d'Entreprise", corporateDesc: "Séminaires, repas d'équipe ou fêtes de fin d'année.",
    eventsBtn: "Découvrir nos offres", contactTitle: "CONTACT", reservations: "Réservations & Privatisation", reservationsDesc: "Pour vos événements, demandez un devis gratuit en quelques clics.", quoteBtn: "Demander un devis"
  },
  en: {
    subtitle: "Burgers at the beach, summer vibes!", findUs: "Find Us", viewMenu: "View Menu", menuTitle: "MENU",
    cheeseDesc: "Beef patty, lettuce, tomato, onion, pickles, cheddar, cheese sauce", baconDesc: "Beef patty, lettuce, tomato, onion, pickles, cheddar, bacon, BBQ sauce",
    cesarDesc: "Lettuce, chicken, cherry tomatoes, soft-boiled egg, croutons, parmesan, Caesar dressing", dailySpecial: "Burger of the Moment", dailyDesc: "Find it on our socials!",
    seeFullMenu: "See full menu", galleryTitle: "PHOTO GALLERY", galleryDesc: "Discover our homemade food in pictures",
    locationTitle: "WHERE TO FIND US", openSummer: "Open this summer", moreInfo: "More info",
    eventsTitle: "EVENTS", eventsDesc: "La Confrérie comes to all your events", weddings: "Weddings & Next Day", weddingsDesc: "A friendly meal for the best day of your life.",
    festivals: "Festivals & Concerts", festivalsDesc: "Fast and quality catering for large gatherings.", corporate: "Corporate Events", corporateDesc: "Seminars, team meals, or end-of-year parties.",
    eventsBtn: "Discover our offers", contactTitle: "CONTACT", reservations: "Reservations & Privatization", reservationsDesc: "For your events, request a free quote in a few clicks.", quoteBtn: "Request a quote"
  },
  es: {
    subtitle: "¡Hamburguesas en la playa, a tope el verano!", findUs: "Encuéntranos", viewMenu: "Ver Menú", menuTitle: "MENÚ",
    cheeseDesc: "Carne, lechuga, tomate, cebolla, pepinillos, cheddar, salsa de queso", baconDesc: "Carne, lechuga, tomate, cebolla, pepinillos, cheddar, bacon, salsa BBQ",
    cesarDesc: "Lechuga, pollo, tomates cherry, huevo mollet, picatostes, parmesano, salsa César", dailySpecial: "Burger del Momento", dailyDesc: "¡Descúbrelo en nuestras redes!",
    seeFullMenu: "Ver menú completo", galleryTitle: "GALERÍA DE FOTOS", galleryDesc: "Descubre nuestras preparaciones caseras en imágenes",
    locationTitle: "DÓNDE ENCONTRARNOS", openSummer: "Abierto este verano", moreInfo: "Más información",
    eventsTitle: "EVENTOS", eventsDesc: "La Confrérie se desplaza para todos tus eventos", weddings: "Bodas y Tornabodas", weddingsDesc: "Una comida amigable para el mejor día de tu vida.",
    festivals: "Festivales y Conciertos", festivalsDesc: "Catering rápido y de calidad para grandes eventos.", corporate: "Eventos Corporativos", corporateDesc: "Seminarios, comidas de equipo o fiestas de fin de año.",
    eventsBtn: "Descubrir ofertas", contactTitle: "CONTACTO", reservations: "Reservas y Privatización", reservationsDesc: "Para tus eventos, solicita un presupuesto gratuito en unos pocos clics.", quoteBtn: "Solicitar presupuesto"
  },
  it: {
    subtitle: "Burger in spiaggia, estate al top!", findUs: "Dove Siamo", viewMenu: "Vedi Menù", menuTitle: "MENÙ",
    cheeseDesc: "Carne, lattuga, pomodoro, cipolla, cetriolini, cheddar, salsa al formaggio", baconDesc: "Carne, lattuga, pomodoro, cipolla, cetriolini, cheddar, bacon, salsa BBQ",
    cesarDesc: "Lattuga, pollo, pomodorini, uovo barzotto, crostini, parmigiano, salsa César", dailySpecial: "Burger del Momento", dailyDesc: "Scoprilo sui nostri social!",
    seeFullMenu: "Vedi menù completo", galleryTitle: "GALLERIA FOTO", galleryDesc: "Scopri le nostre preparazioni fatte in casa",
    locationTitle: "DOVE TROVARCI", openSummer: "Aperto quest'estate", moreInfo: "Più info",
    eventsTitle: "EVENTI", eventsDesc: "La Confrérie viene a tutti i tuoi eventi", weddings: "Matrimoni & Giorno Dopo", weddingsDesc: "Un pasto conviviale per il giorno più bello della tua vita.",
    festivals: "Festival & Concerti", festivalsDesc: "Ristorazione rapida e di qualità per grandi eventi.", corporate: "Eventi Aziendali", corporateDesc: "Seminari, pranzi di squadra o feste di fine anno.",
    eventsBtn: "Scopri le nostre offerte", contactTitle: "CONTATTO", reservations: "Prenotazioni & Privatizzazione", reservationsDesc: "Per i tuoi eventi, richiedi un preventivo gratuito in pochi clic.", quoteBtn: "Richiedi preventivo"
  },
  de: {
    subtitle: "Burger am Strand, Sommer pur!", findUs: "Finde Uns", viewMenu: "Menü ansehen", menuTitle: "MENÜ",
    cheeseDesc: "Rindfleisch, Salat, Tomate, Zwiebel, Gurken, Cheddar, Käsesauce", baconDesc: "Rindfleisch, Salat, Tomate, Zwiebel, Gurken, Cheddar, Bacon, BBQ-Sauce",
    cesarDesc: "Salat, Huhn, Kirschtomaten, weiches Ei, Croutons, Parmesan, Caesar-Dressing", dailySpecial: "Burger des Tages", dailyDesc: "Finde ihn auf Social Media!",
    seeFullMenu: "Komplettes Menü", galleryTitle: "FOTOGALERIE", galleryDesc: "Entdecke unsere hausgemachten Speisen",
    locationTitle: "WO SIE UNS FINDEN", openSummer: "Diesen Sommer geöffnet", moreInfo: "Mehr Info",
    eventsTitle: "VERANSTALTUNGEN", eventsDesc: "La Confrérie kommt zu allen Ihren Veranstaltungen", weddings: "Hochzeiten & Danach", weddingsDesc: "Ein geselliges Essen für den schönsten Tag Ihres Lebens.",
    festivals: "Festivals & Konzerte", festivalsDesc: "Schnelles und hochwertiges Catering für Großveranstaltungen.", corporate: "Firmenfeiern", corporateDesc: "Seminare, Teamessen oder Jahresendfeiern.",
    eventsBtn: "Unsere Angebote", contactTitle: "KONTAKT", reservations: "Reservierungen & Privatisierung", reservationsDesc: "Für Ihre Veranstaltungen fordern Sie in wenigen Klicks ein kostenloses Angebot an.", quoteBtn: "Angebot anfordern"
  }
}

export default function VilleneuveHome() {
  const [lang, setLang] = useState<Lang>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as Lang
    if (saved && ["fr", "en", "es", "it", "de"].includes(saved)) {
      setLang(saved)
    }
  }, [])

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem("preferredLang", newLang)
  }

  const ui = UI[lang]

  return (
    <div className="min-h-screen bg-menu-cream">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-menu-yellow opacity-70 animate-float" />
        <div className="absolute top-40 -right-20 h-48 w-48 rounded-full bg-menu-red opacity-60 animate-float animation-delay-1000" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-menu-blue opacity-50 animate-float animation-delay-2000" />

        <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* 5-language switcher (like the menu) */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-md border border-gray-100 z-50">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLangChange(l.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    lang === l.code ? "bg-menu-blue text-white shadow-sm scale-105" : "text-gray-500 hover:bg-menu-cream hover:text-menu-blue"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="hidden sm:inline">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row text-menu-blue">
            <div className="text-center md:text-left">
              <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl animate-fade-in-up">
                LA CONFRÉRIE
                <span className="block text-menu-red">PLAGE 🏖️</span>
              </h1>
              <p className="mt-4 text-xl font-medium text-gray-700 animate-fade-in-up animation-delay-200">
                {ui.subtitle}
              </p>

              {/* Location chip - REMOVED the meal deal banner */}
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
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start animate-fade-in-up animation-delay-400">
                <Link href="/villeneuve/locations">
                  <Button className="h-12 min-w-[160px] bg-menu-red hover:bg-[#C62828] text-white px-8 text-lg font-bold transition-all hover:scale-105 hover:shadow-lg border-0">
                    <MapPin className="mr-2 h-5 w-5" />{ui.findUs}
                  </Button>
                </Link>
                <Link href="/villeneuve/menu">
                  <Button variant="outline" className="h-12 min-w-[160px] border-2 border-menu-blue bg-transparent px-8 text-lg font-bold text-menu-blue hover:bg-menu-blue hover:text-white transition-all hover:scale-105 hover:shadow-lg">
                    <Phone className="mr-2 h-5 w-5" />{ui.viewMenu}
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
            <h2 className="section-title animate-fade-in-up">{ui.menuTitle}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {/* Cheese Burger */}
                <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up animation-delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">CHEESE BURGER</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F]">
                      <Image src="/images/menu/cheesy+ frites.jpeg" alt="Cheese Burger" width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <p className="mt-2 item-description">{ui.cheeseDesc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">12,50€</span>
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
                  <p className="mt-2 item-description">{ui.baconDesc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">13€</span>
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
                  <p className="mt-2 item-description">{ui.cesarDesc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#FF5722]">11,50€</span>
                    <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>
                  </div>
                </div>

                {/* Daily special */}
                <div className="rounded-lg bg-[#FFF8E1] p-4">
                  <div className="flex items-center justify-center rounded-full bg-[#FFD54F] p-3 text-center mx-auto max-w-xs mb-2">
                    <p className="font-display font-bold text-[#E53935] text-sm">
                      {ui.dailySpecial}<br />
                      <span className="text-xs text-gray-700">{ui.dailyDesc}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/villeneuve/menu">
                <Button className="bg-[#E53935] hover:bg-[#C62828]">{ui.seeFullMenu}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[#FFF8E1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up uppercase tracking-widest">{ui.galleryTitle}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-300 italic">
              {ui.galleryDesc}
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
            <h2 className="section-title animate-fade-in-up">{ui.locationTitle}</h2>
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
                      <span>{ui.openSummer}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white" onClick={() => window.open(MAPS_URL, "_blank")}>
                        <MapPin className="mr-1 h-3 w-3" />Y aller
                      </Button>
                      <Link href="/villeneuve/locations">
                        <Button variant="outline" size="sm" className="text-xs border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white">
                          {ui.moreInfo}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1736.5823434069232!2d3.8841219203894712!3d43.506965565791376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b1d991f5a3c9%3A0x6b74c029cdc4784d!2sLa%20Confr%C3%A9rie%20Foodtruck!5e1!3m2!1sen!2sfr!4v1781303011695!5m2!1sen!2sfr"
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
            <h2 className="section-title animate-fade-in-up">{ui.eventsTitle}</h2>
            <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F] animate-fade-in-up animation-delay-200" />
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">{ui.eventsDesc}</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: ui.weddings, desc: ui.weddingsDesc, emoji: "💍" },
                { title: ui.festivals, desc: ui.festivalsDesc, emoji: "🎪" },
                { title: ui.corporate, desc: ui.corporateDesc, emoji: "🏢" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg bg-[#FFF8E1] p-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F] text-2xl">{item.emoji}</div>
                  <h4 className="font-display text-lg font-bold text-[#E53935]">{item.title}</h4>
                  <p className="mt-2 text-sm text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/devis">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">{ui.eventsBtn}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title animate-fade-in-up">{ui.contactTitle}</h2>
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
                <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">{ui.reservations}</h3>
                <p className="mb-4 text-gray-700">{ui.reservationsDesc}</p>
                <Link href="/devis">
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] transition-all duration-300 hover:scale-105">{ui.quoteBtn}</Button>
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
              <Link href="/devis" className="hover:text-[#FFD54F]">Événements</Link>
              <Link href="/villeneuve/contact" className="hover:text-[#FFD54F]">Contact</Link>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} La Confrérie Foodtruck</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
