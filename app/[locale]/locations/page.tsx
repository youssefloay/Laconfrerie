"use client"

import { MapPin, Clock, ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

function MapButton({ label, address, city }: { label: string, address: string, city: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}`)}`, "_blank")}
    >
      <MapPin className="mr-1 h-3 w-3" />{label}
    </Button>
  )
}

export default function LocationsPage() {
  const t = useTranslations('LocationsPage')
  const commonT = useTranslations('HomePage.locations')
  const navT = useTranslations('Navigation')

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {navT('home')}
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">{t('title')}</h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
              <div className="w-full">
                <h3 className="font-display text-lg font-bold">{commonT('address')}</h3>
                <p className="text-gray-700">{commonT('city')}</p>

                <div className="mt-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1E88E5]" />
                  <span>{commonT('hours')}</span>
                </div>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <MapButton label={commonT('getDirections')} address={commonT('address')} city={commonT('city')} />
                  </div>
                </div>
                <div className="mt-4 h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${commonT('address')}, ${commonT('city')}`)}&output=embed`}
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

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4">{t('practicalInfo')}</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-bold">{t('tramStop')}</span> {commonT('tramDesc')}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">{t('payment')}</span> {t('paymentDesc')}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">{t('goodToKnow')}</span> {t('goodToKnowDesc')}
              </p>
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
