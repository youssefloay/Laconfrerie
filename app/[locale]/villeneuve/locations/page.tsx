"use client"

import { MapPin, Clock, ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

const MAPS_URL = "https://maps.app.goo.gl/qqWYoJfGuXGZj1pM7"

export default function VilleneuveLocationsPage() {
  const t = useTranslations('LocationsPage')

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/villeneuve">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />Accueil Villeneuve
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">Notre Emplacement</h1>
        <div className="flex justify-center mb-8"><SocialNav /></div>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Location card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
              <div className="w-full">
                <h3 className="font-display text-xl font-bold text-menu-blue">Plage du Pilou · Entrée Plage N°3</h3>
                <p className="text-gray-700 mt-1">Villeneuve-lès-Maguelone</p>
                <p className="text-sm text-gray-500 mt-1">À côté de la Stèle aux Démineurs du Languedoc</p>

                <div className="mt-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1E88E5]" />
                  <span className="text-gray-700">Ouvert cet été</span>
                </div>

                <div className="mt-4">
                  <Button variant="outline" size="sm" className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white" onClick={() => window.open(MAPS_URL, "_blank")}>
                    <MapPin className="mr-1 h-3 w-3" />Y aller
                  </Button>
                </div>

                <div className="mt-4 h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1736.5823434069232!2d3.8841219203894712!3d43.506965565791376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b1d991f5a3c9%3A0x6b74c029cdc4784d!2sLa%20Confr%C3%A9rie%20Foodtruck!5e1!3m2!1sen!2sfr!4v1781303011695!5m2!1sen!2sfr"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Practical info */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4">{t('practicalInfo')}</h3>
            <div className="space-y-4">
              <p className="text-gray-700"><span className="font-bold">Accès :</span> Entrée Plage N°3 — À côté de la Stèle aux Démineurs du Languedoc</p>
              <p className="text-gray-700"><span className="font-bold">{t('payment')}</span> {t('paymentDesc')}</p>
              <p className="text-gray-700"><span className="font-bold">{t('goodToKnow')}</span> {t('goodToKnowDesc')}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <SiteLogo size="medium" background="yellow" />
          </div>
        </div>
      </div>
    </div>
  )
}
