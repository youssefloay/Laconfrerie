"use client"

import { ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import { LanguageToggle } from "@/components/language-toggle"

export default function VilleneuveEventsPage() {
  const t = useTranslations('EventsPage')
  const iconsT = useTranslations('FoodIcons')

  return (
    <div className="min-h-screen bg-menu-cream">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/villeneuve">
            <Button variant="ghost" className="text-menu-blue">
              <ArrowLeft className="mr-2 h-4 w-4" />Accueil Villeneuve
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <div className="flex justify-center mb-8"><SiteLogo size="medium" background="yellow" /></div>

        <div className="text-center mb-12">
          <h1 className="section-title animate-fade-in-up">{t('title')}</h1>
          <div className="mx-auto mt-2 h-1 w-24 bg-[#FFD54F]" />
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12">
          {/* Specialties */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1E88E5] mb-6 text-center">{t('specialties')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { key: 'bobun', name: t('bobun'), desc: t('bobunDesc'), icon: 'bobun' as const },
                { key: 'pokebowl', name: t('pokebowl'), desc: t('pokebowlDesc'), icon: 'pokebowl' as const },
                { key: 'wrap', name: t('wrap'), desc: t('wrapDesc'), icon: 'wrap' as const },
                { key: 'friture', name: t('friture'), desc: t('fritureDesc'), icon: 'friture' as const },
              ].map((item) => (
                <div key={item.key} className="rounded-lg bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD54F]">
                      <FoodIcon name={item.icon} size={24} className="text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#E53935]">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulas */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1E88E5] mb-6 text-center">{t('formulasTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: t('formulaEssential'), desc: t('formulaEssentialDesc'), price: t('formulaEssentialPrice'), color: 'bg-[#E3F2FD]' },
                { name: t('formulaFriendly'), desc: t('formulaFriendlyDesc'), price: t('formulaFriendlyPrice'), color: 'bg-[#FFF8E1]' },
                { name: t('formulaPremium'), desc: t('formulaPremiumDesc'), price: t('formulaPremiumPrice'), color: 'bg-[#FCE4EC]' },
              ].map((f) => (
                <div key={f.name} className={`rounded-xl ${f.color} p-6 shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <h3 className="font-display text-lg font-bold text-[#1E88E5] mb-2">{f.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{f.desc}</p>
                  <span className="font-extrabold text-[#FF5722] text-xl">{f.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/devis">
              <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-8 py-3 text-lg font-bold hover:scale-105 transition-all">
                {t('getQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
