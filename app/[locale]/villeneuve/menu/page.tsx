"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/src/i18n/routing"
import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"

type Lang = "fr" | "en" | "es" | "it" | "de"
const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "it", flag: "🇮🇹", label: "IT" },
  { code: "de", flag: "🇩🇪", label: "DE" },
]

const UI: Record<Lang, {
  back: string; title: string; burgers: string; salads: string; sides: string; drinks: string
  veggieNote: string; menuDeal: string; daily: string; dailyDesc: string; kidsMenu: string
  serving: string; homeLink: string
}> = {
  fr: { back: "Accueil", title: "Notre Carte", burgers: "Burgers", salads: "Salades", sides: "Accompagnements", drinks: "Boissons", veggieNote: "🌱 Tous nos burgers existent aussi en version végétarienne", menuDeal: "Menu +5€ · Frites + Boisson Soft avec tout burger", daily: "BURGER DU MOMENT", dailyDesc: "Découvrez-le sur notre tableau ou nos réseaux !", kidsMenu: "MENU ENFANT", serving: "Servi avec frites maison.", homeLink: "Retour à l'accueil" },
  en: { back: "Home", title: "Our Menu", burgers: "Burgers", salads: "Salads", sides: "Sides", drinks: "Drinks", veggieNote: "🌱 All our burgers are also available as veggie", menuDeal: "Meal deal +5€ · Fries & Soft Drink with any burger", daily: "BURGER OF THE MOMENT", dailyDesc: "Find it on our board or socials!", kidsMenu: "KIDS MEAL", serving: "Served with homemade fries.", homeLink: "Back to home" },
  es: { back: "Inicio", title: "Nuestra Carta", burgers: "Burgers", salads: "Ensaladas", sides: "Acompañamientos", drinks: "Bebidas", veggieNote: "🌱 Todos nuestros burgers también en versión veggie", menuDeal: "Menú +5€ · Patatas + Bebida con cualquier burger", daily: "BURGER DEL MOMENTO", dailyDesc: "¡Descúbrelo en nuestro tablero o redes!", kidsMenu: "MENÚ INFANTIL", serving: "Servido con patatas fritas caseras.", homeLink: "Volver al inicio" },
  it: { back: "Home", title: "La Nostra Carta", burgers: "Burger", salads: "Insalate", sides: "Contorni", drinks: "Bevande", veggieNote: "🌱 Tutti i nostri burger disponibili anche in versione veggie", menuDeal: "Menu +5€ · Patatine + Bibita con qualsiasi burger", daily: "BURGER DEL MOMENTO", dailyDesc: "Scoprilo sulla nostra lavagna o sui social!", kidsMenu: "MENU BAMBINI", serving: "Servito con patatine casalinghe.", homeLink: "Torna alla home" },
  de: { back: "Start", title: "Unsere Karte", burgers: "Burger", salads: "Salate", sides: "Beilagen", drinks: "Getränke", veggieNote: "🌱 Alle Burger auch als veggie Version erhältlich", menuDeal: "Menü +5€ · Pommes & Softdrink zu jedem Burger", daily: "BURGER DES TAGES", dailyDesc: "Finden Sie es auf unserer Tafel oder Social Media!", kidsMenu: "KINDERMENU", serving: "Mit hausgemachten Pommes serviert.", homeLink: "Zurück zur Startseite" },
}

const ITEMS: Record<Lang, {
  cheese: { name: string; desc: string }
  veggie: { name: string; desc: string }
  bacon: { name: string; desc: string }
  cesar: { name: string; desc: string }
  t4: string; t6: string; t8: string
  kids: string
  frites: string; beignet: string
  cafe: string; canette: string; biereHK: string; eau: string; biereArt: string; rose: string
}> = {
  fr: {
    cheese: { name: "CHEESE BURGER", desc: "Steak, salade, tomate, oignon, cornichon, cheddar, sauce cheese" },
    veggie: { name: "VEGGIE BURGER", desc: "Steak végétal, salade, tomate, oignon, cornichon, cheddar, sauce cheese" },
    bacon: { name: "BACON BURGER", desc: "Steak, salade, tomate, oignon, cornichon, cheddar, bacon, sauce BBQ" },
    cesar: { name: "SALADE CÉSAR", desc: "Laitue, poulet, tomates cerise, œuf mollet, croutons, parmesan, sauce César" },
    t4: "4 pièces", t6: "6 pièces", t8: "8 pièces",
    kids: "2 Tenders + Frites + Rocket 🍦",
    frites: "FRITES MAISON", beignet: "BEIGNET",
    cafe: "CAFÉ", canette: "CANETTE", biereHK: "BIÈRE HEINEKEN", eau: "EAU", biereArt: "BIÈRE ARTISANALE", rose: "VIN ROSÉ",
  },
  en: {
    cheese: { name: "CHEESE BURGER", desc: "Beef patty, lettuce, tomato, onion, pickles, cheddar, cheese sauce" },
    veggie: { name: "VEGGIE BURGER", desc: "Veggie patty, lettuce, tomato, onion, pickles, cheddar, cheese sauce" },
    bacon: { name: "BACON BURGER", desc: "Beef patty, lettuce, tomato, onion, pickles, cheddar, bacon, BBQ sauce" },
    cesar: { name: "CAESAR SALAD", desc: "Lettuce, chicken, cherry tomatoes, soft-boiled egg, croutons, parmesan, Caesar dressing" },
    t4: "4 pieces", t6: "6 pieces", t8: "8 pieces",
    kids: "2 Tenders + Fries + Rocket ice cream 🍦",
    frites: "HOMEMADE FRIES", beignet: "DONUT",
    cafe: "COFFEE", canette: "SOFT DRINK (CAN)", biereHK: "HEINEKEN BEER", eau: "WATER", biereArt: "CRAFT BEER", rose: "ROSÉ WINE",
  },
  es: {
    cheese: { name: "CHEESE BURGER", desc: "Carne, lechuga, tomate, cebolla, pepinillos, cheddar, salsa de queso" },
    veggie: { name: "VEGGIE BURGER", desc: "Carne vegetal, lechuga, tomate, cebolla, pepinillos, cheddar, salsa de queso" },
    bacon: { name: "BACON BURGER", desc: "Carne, lechuga, tomate, cebolla, pepinillos, cheddar, bacon, salsa BBQ" },
    cesar: { name: "ENSALADA CÉSAR", desc: "Lechuga, pollo, tomates cherry, huevo mollet, picatostes, parmesano, salsa César" },
    t4: "4 piezas", t6: "6 piezas", t8: "8 piezas",
    kids: "2 Tenders + Patatas + Rocket (helado) 🍦",
    frites: "PATATAS FRITAS CASERAS", beignet: "BUÑUELO",
    cafe: "CAFÉ", canette: "REFRESCO (LATA)", biereHK: "CERVEZA HEINEKEN", eau: "AGUA", biereArt: "CERVEZA ARTESANAL", rose: "VINO ROSADO",
  },
  it: {
    cheese: { name: "CHEESE BURGER", desc: "Carne, lattuga, pomodoro, cipolla, cetriolini, cheddar, salsa al formaggio" },
    veggie: { name: "VEGGIE BURGER", desc: "Carne vegetale, lattuga, pomodoro, cipolla, cetriolini, cheddar, salsa al formaggio" },
    bacon: { name: "BACON BURGER", desc: "Carne, lattuga, pomodoro, cipolla, cetriolini, cheddar, bacon, salsa BBQ" },
    cesar: { name: "INSALATA CÉSAR", desc: "Lattuga, pollo, pomodorini, uovo barzotto, crostini, parmigiano, salsa César" },
    t4: "4 pezzi", t6: "6 pezzi", t8: "8 pezzi",
    kids: "2 Tenders + Patatine + Rocket (gelato) 🍦",
    frites: "PATATINE CASALINGHE", beignet: "BOMBOLONE",
    cafe: "CAFFÈ", canette: "BIBITA (LATTINA)", biereHK: "BIRRA HEINEKEN", eau: "ACQUA", biereArt: "BIRRA ARTIGIANALE", rose: "VINO ROSATO",
  },
  de: {
    cheese: { name: "CHEESE BURGER", desc: "Rindfleisch, Salat, Tomate, Zwiebel, Gurken, Cheddar, Käsesauce" },
    veggie: { name: "VEGGIE BURGER", desc: "Veggie-Patty, Salat, Tomate, Zwiebel, Gurken, Cheddar, Käsesauce" },
    bacon: { name: "BACON BURGER", desc: "Rindfleisch, Salat, Tomate, Zwiebel, Gurken, Cheddar, Bacon, BBQ-Sauce" },
    cesar: { name: "CAESAR SALAT", desc: "Salat, Huhn, Kirschtomaten, weiches Ei, Croutons, Parmesan, Caesar-Dressing" },
    t4: "4 Stück", t6: "6 Stück", t8: "8 Stück",
    kids: "2 Tenders + Pommes + Rocket (Eis) 🍦",
    frites: "HAUSGEMACHTE POMMES", beignet: "BERLINER",
    cafe: "KAFFEE", canette: "SOFTDRINK (DOSE)", biereHK: "HEINEKEN BIER", eau: "WASSER", biereArt: "CRAFTBIER", rose: "ROSÉ WEIN",
  },
}

function MenuItem({ name, desc, price, img, alt, veggie }: { name: string; desc?: string; price: string; img: string; alt: string; veggie?: boolean }) {
  return (
    <div className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-[#FFF3C4] animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <h3 className="item-title">{name}</h3>
        <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 border-2 border-[#FFD54F] flex-shrink-0 ml-2">
          <Image src={img} alt={alt} width={128} height={128} className="object-cover w-full h-full" />
        </div>
      </div>
      {desc && <p className="mt-2 item-description">{desc}</p>}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-[#FF5722]">{price}</span>
        {veggie && <span className="text-xs text-green-600 font-semibold">Option Veggie 🌱</span>}
      </div>
    </div>
  )
}

function TenderRow({ label, price }: { label: string; price: string }) {
  return (
    <div className="rounded-lg bg-[#FFF8E1] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="item-title">TENDERS · {label}</h3>
        <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F] flex-shrink-0">
          <Image src="/images/menu/Tenders [5_4-440x550] be6.jpg" alt="Tenders" width={128} height={128} className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="mt-2"><span className="price">{price}</span></div>
    </div>
  )
}

export default function VilleneuveMenuPage() {
  const [lang, setLang] = useState<Lang>("fr")

  import("react").then(({ useEffect }) => {
    useEffect(() => {
      const saved = localStorage.getItem("preferredLang") as Lang
      if (saved && ["fr", "en", "es", "it", "de"].includes(saved)) {
        setLang(saved)
      }
    }, [])
  })

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem("preferredLang", newLang)
  }

  const ui = UI[lang]
  const items = ITEMS[lang]

  return (
    <div className="min-h-screen bg-menu-cream">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/villeneuve">
            <Button variant="ghost" className="text-menu-blue">
              <ArrowLeft className="mr-2 h-4 w-4" />{ui.back}
            </Button>
          </Link>
          {/* 5-language switcher */}
          <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-md border border-gray-100">
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

        {/* Logo & title */}
        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>
        <h1 className="section-title text-center mb-4 animate-fade-in-up">{ui.title}</h1>

        <div className="flex justify-center mb-8"><SocialNav /></div>

        {/* BURGERS */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{ui.burgers} 🍔</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <MenuItem name={items.cheese.name} desc={items.cheese.desc} price="12,50€" img="/images/menu/cheesy+ frites.jpeg" alt="Cheese Burger" />
                <MenuItem name={items.veggie.name} desc={items.veggie.desc} price="12,50€" img="/images/menu/cheesy+ frites.jpeg" alt="Veggie Burger" veggie />
              </div>
              <div className="space-y-6">
                <MenuItem name={items.bacon.name} desc={items.bacon.desc} price="13€" img="/images/menu/bacon+ frites.jpeg" alt="Bacon Burger" />
                {/* Burger du moment */}
                <div className="rounded-lg bg-[#FFF8E1] p-4 border-2 border-dashed border-[#FFD54F]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{ui.daily}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F] flex-shrink-0 ml-2">
                      <Image src="/images/menu/Dish Composition [5_4-2304x2880] a4e.jpg" alt="Burger du moment" width={128} height={128} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <p className="mt-2 item-description italic">{ui.dailyDesc}</p>
                </div>
              </div>
            </div>
            {/* Meal deal — displayed inside the burgers card */}
            <div className="mt-6 bg-gradient-to-r from-[#FF7043] to-[#FFB300] rounded-2xl p-4 text-center text-white shadow-md">
              <p className="font-extrabold">🍟 {ui.menuDeal}</p>
            </div>
          </div>
        </div>

        {/* SALADS */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{ui.salads} 🥗</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <MenuItem name={items.cesar.name} desc={items.cesar.desc} price="11,50€" img="/images/menu/salade cesar.jpeg" alt="Salade César" veggie />
          </div>
        </div>

        {/* TENDERS */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">TENDERS 🍗</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <TenderRow label={items.t4} price="7€" />
              <TenderRow label={items.t6} price="9€" />
              <TenderRow label={items.t8} price="11€" />
            </div>
          </div>
        </div>

        {/* KIDS MENU */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{ui.kidsMenu} 👶</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="rounded-lg bg-[#FFF8E1] p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="item-title">{ui.kidsMenu}</h3>
                <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F] flex-shrink-0 ml-2">
                  <Image src="/images/menu/kids_menu.png" alt="Kids Menu" width={128} height={128} className="object-cover w-full h-full" />
                </div>
              </div>
              <p className="mt-2 item-description">{items.kids}</p>
              <div className="mt-2"><span className="price">8€</span></div>
            </div>
          </div>
        </div>

        {/* SIDES */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{ui.sides} 🍟</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="item-title">{items.frites}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F] flex-shrink-0 ml-2">
                    <Image src="/images/menu/frites.jpeg" alt="Frites" width={128} height={128} className="object-cover w-full h-full" />
                  </div>
                </div>
                <div className="mt-2"><span className="price">4€</span></div>
              </div>
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="item-title">{items.beignet}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="dessert" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <div className="mt-2"><span className="price">3€</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* DRINKS */}
        <div className="mx-auto max-w-4xl mb-16">
          <h2 className="section-title mb-8 text-center">{ui.drinks} 🥤</h2>
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { name: items.cafe, price: "2€", img: "/images/menu/coffee.png" },
                { name: items.canette, price: "3,50€", img: "/images/menu/soft_drink.png" },
                { name: items.biereHK, price: "4€", img: "/images/menu/beer.png" },
                { name: items.eau, price: "2€", img: "/images/menu/water.png" },
                { name: items.biereArt, price: "6,50€", img: "/images/menu/craft_beer.png" },
                { name: items.rose, price: "12€", img: "/images/menu/rose_wine.png" },
              ].map((d) => (
                <div key={d.name} className="rounded-lg bg-[#FFF8E1] p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="item-title">{d.name}</h3>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border-2 border-[#FFD54F] flex-shrink-0 ml-2">
                      {d.img ? (
                        <Image src={d.img} alt={d.name} width={128} height={128} className="object-cover w-full h-full" />
                      ) : (
                        <FoodIcon name="drink" size={32} className="text-[#FF5722]" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2"><span className="price">{d.price}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
