"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Waves, Building2, Truck, PartyPopper } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

type Lang = "fr" | "en" | "es" | "it" | "de"

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "it", flag: "🇮🇹", label: "IT" },
  { code: "de", flag: "🇩🇪", label: "DE" },
]

const T: Record<Lang, {
  tagline: string
  choose: string
  malbosc: string
  malboscSub: string
  villeneuve: string
  villeneuveSub: string
  malboscBadge: string
  villeneuveBadge: string
  eventsBadge: string
  eventsTitle: string
  eventsSub: string
}> = {
  fr: {
    tagline: "Deux spots, une même passion",
    choose: "Où êtes-vous ?",
    malbosc: "Malbosc · Montpellier",
    malboscSub: "191 Avenue de Fès",
    villeneuve: "Plage du Pilou",
    villeneuveSub: "Villeneuve-lès-Maguelone",
    malboscBadge: "Spot Urbain",
    villeneuveBadge: "Spot Plage 🏖️",
    eventsBadge: "PROS & MARIAGES · PRIVATISATION",
    eventsTitle: "Privatiser le Food Truck",
    eventsSub: "Entreprises, Mariages · Devis en 2 min ⚡"
  },
  en: {
    tagline: "Two spots, one passion",
    choose: "Where are you?",
    malbosc: "Malbosc · Montpellier",
    malboscSub: "191 Avenue de Fès",
    villeneuve: "Plage du Pilou",
    villeneuveSub: "Villeneuve-lès-Maguelone",
    malboscBadge: "City Spot",
    villeneuveBadge: "Beach Spot 🏖️",
    eventsBadge: "WEDDINGS & CORPORATE · CATERING",
    eventsTitle: "Book the Food Truck",
    eventsSub: "Corporate & Private events · Instant quote ⚡"
  },
  es: {
    tagline: "Dos spots, una misma pasión",
    choose: "¿Dónde estás?",
    malbosc: "Malbosc · Montpellier",
    malboscSub: "191 Avenue de Fès",
    villeneuve: "Plage du Pilou",
    villeneuveSub: "Villeneuve-lès-Maguelone",
    malboscBadge: "Spot Urbano",
    villeneuveBadge: "Spot Playa 🏖️",
    eventsBadge: "BODAS Y EMPRESAS · EVENTOS",
    eventsTitle: "Privatizar el Food Truck",
    eventsSub: "Presupuesto instantáneo en 2 min ⚡"
  },
  it: {
    tagline: "Due spot, una stessa passione",
    choose: "Dove sei?",
    malbosc: "Malbosc · Montpellier",
    malboscSub: "191 Avenue de Fès",
    villeneuve: "Plage du Pilou",
    villeneuveSub: "Villeneuve-lès-Maguelone",
    malboscBadge: "Spot Urbano",
    villeneuveBadge: "Spot Spiaggia 🏖️",
    eventsBadge: "MATRIMONI & AZIENDE · EVENTI",
    eventsTitle: "Privatizza il Food Truck",
    eventsSub: "Preventivo istantaneo in 2 min ⚡"
  },
  de: {
    tagline: "Zwei Spots, eine Leidenschaft",
    choose: "Wo bist du?",
    malbosc: "Malbosc · Montpellier",
    malboscSub: "191 Avenue de Fès",
    villeneuve: "Plage du Pilou",
    villeneuveSub: "Villeneuve-lès-Maguelone",
    malboscBadge: "Stadtspot",
    villeneuveBadge: "Strandspot 🏖️",
    eventsBadge: "HOCHZEITEN & FIRMEN · CATERING",
    eventsTitle: "Foodtruck mieten",
    eventsSub: "Sofortiges Angebot in 2 Min ⚡"
  },
}

export default function LocationSelector() {
  const locale = useLocale()
  const router = useRouter()
  const [lang, setLang] = useState<Lang>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as Lang
    if (saved && ["fr", "en", "es", "it", "de"].includes(saved)) {
      setLang(saved)
    }
  }, [])

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLang", newLang)
    }
  }

  const t = T[lang]

  const go = (path: string) => {
    const routeLocale = (lang === "en") ? "en" : locale
    router.push(`/${routeLocale}${path}`)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu/Dish Composition [5_4-2304x2880] a4e.jpg"
          alt="La Confrérie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

          {/* Logo */}
          <div className="flex flex-col items-center pt-8 pb-4 px-6">
            <SiteLogo size="medium" background="yellow" />
            <h1 className="mt-3 font-display text-2xl font-extrabold text-white tracking-tight text-center">LA CONFRÉRIE</h1>
            <p className="text-white/70 text-sm mt-0.5 text-center">{t.tagline}</p>
          </div>

          {/* Language picker */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-center gap-1 bg-white/10 rounded-2xl p-1.5">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLangChange(l.code)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex-1 justify-center ${
                    lang === l.code
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="hidden sm:inline">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-white/15 mb-4" />

          {/* Main Action: Privatisation Highlight (Obsidian & Gold VIP) */}
          <div className="px-4 pb-3">
            <button
              onClick={() => go("/devis")}
              className="group w-full flex items-center gap-4 bg-slate-950/90 hover:bg-slate-900 active:scale-[0.98] transition-all duration-200 rounded-2xl p-4 text-left shadow-2xl border-2 border-amber-400 relative overflow-hidden"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/20 border border-amber-400/40 group-hover:bg-amber-400/30 transition-colors">
                <Truck className="h-6 w-6 text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-xs">
                    {t.eventsBadge}
                  </span>
                </div>
                <p className="font-display font-black text-white text-lg leading-tight tracking-tight">{t.eventsTitle}</p>
                <p className="text-amber-200/90 text-xs mt-0.5 font-medium">{t.eventsSub}</p>
              </div>
              <svg className="h-6 w-6 text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Divider with label */}
          <div className="relative text-center my-2.5 px-6">
            <div className="absolute inset-0 flex items-center px-6"><div className="w-full border-t border-white/20"></div></div>
            <span className="relative bg-black/40 px-3.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
              {t.choose}
            </span>
          </div>

          {/* Location buttons */}
          <div className="px-4 pb-6 space-y-2.5">
            {/* Malbosc - Spot Urbain (Bleu Méditerranéen) */}
            <button
              onClick={() => go("/montpellier")}
              className="group w-full flex items-center gap-4 bg-[#1565C0] hover:bg-[#0D47A1] active:scale-[0.98] transition-all duration-200 rounded-2xl p-3.5 text-left shadow-lg hover:shadow-xl border border-blue-400/40"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">{t.malboscBadge}</span>
                </div>
                <p className="font-display font-bold text-white text-base leading-tight">{t.malbosc}</p>
                <p className="text-blue-100/75 text-xs mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />{t.malboscSub}</p>
              </div>
              <svg className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Villeneuve - Spot Plage (Corail Sunset) */}
            <button
              onClick={() => go("/villeneuve")}
              className="group w-full flex items-center gap-4 bg-gradient-to-r from-[#D84315] to-[#F4511E] hover:from-[#BF360C] hover:to-[#D84315] active:scale-[0.98] transition-all duration-200 rounded-2xl p-3.5 text-left shadow-lg hover:shadow-xl border border-orange-400/40"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-200">{t.villeneuveBadge}</span>
                </div>
                <p className="font-display font-bold text-white text-base leading-tight">{t.villeneuve}</p>
                <p className="text-orange-100/75 text-xs mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />{t.villeneuveSub}</p>
              </div>
              <svg className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
