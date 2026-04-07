"use client"

import { ArrowLeft, Mail } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { FoodIcon } from "@/components/food-icon"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function EvenementsPage() {
  const t = useTranslations('EventsPage')
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

        <div className="flex justify-center mb-8">
          <SiteLogo size="medium" background="yellow" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">
          {t('title')}
        </h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
        </div>

        <div className="mx-auto max-w-4xl mb-12 text-center">
          <p className="text-lg text-gray-700">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-[#E53935] mb-8 text-center">
            {t('specialties')}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935] uppercase">{t('bobun')}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="bobun" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  {t('bobunDesc')}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t('vgOption')}</span>
                </div>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935] uppercase">{t('pokebowl')}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="pokebowl" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  {t('pokebowlDesc')}
                </p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{t('vgOption')}</span>

                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935] uppercase">{t('wrap')}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="wrap" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{t('wrapDesc')}</p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{t('vgOption')}</span>
                </div>
              </div>

              <div className="rounded-lg bg-[#FFF8E1] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-[#E53935] uppercase">{t('friture')}</h3>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
                    <FoodIcon name="friture" size={32} className="text-[#FF5722]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{t('fritureDesc')}</p>
                <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{t('vgOption')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
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
              <h4 className="font-display text-lg font-bold text-[#E53935]">{t.raw('offerList')[6].split(':')[0]}</h4>
              <p className="mt-2 text-sm text-gray-700">
                {t.raw('offerList')[4]}
              </p>
            </div>
            {/* ... other event types like Festivals, Entreprise could be localized too but keeping layout simple */}
            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
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
              <h4 className="font-display text-lg font-bold text-[#E53935]">Festivals</h4>
              <p className="mt-2 text-sm text-gray-700">
                {t.raw('offerList')[3]}
              </p>
            </div>

            <div className="rounded-lg bg-[#FFF8E1] p-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54F]">
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
              <h4 className="font-display text-lg font-bold text-[#E53935]">Business</h4>
              <p className="mt-2 text-sm text-gray-700">
                {t.raw('offerList')[0]}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-[#F5F5F5] p-4 rounded-lg">
            <h4 className="font-display text-lg font-bold text-[#1E88E5] mb-2">{t('offerTitle')}</h4>
            <p className="text-gray-700 mb-4">
              {t('offerSubtitle')}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {(t.raw('offerList') as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="mt-8 p-4 border border-[#FFD54F] rounded-lg bg-white">
              <h4 className="font-display text-lg font-bold text-[#E53935] mb-2">{t('formulasTitle')}</h4>

              <div className="space-y-4">
                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">{t('formulaEssential')}</h5>
                  <p className="text-sm text-gray-700">{t('formulaEssentialDesc')}</p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">{t('formulaEssentialPrice')}</p>
                </div>

                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">{t('formulaFriendly')}</h5>
                  <p className="text-sm text-gray-700">
                    {t('formulaFriendlyDesc')}
                  </p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">{t('formulaFriendlyPrice')}</p>
                </div>

                <div className="p-3 border-l-4 border-[#1E88E5]">
                  <h5 className="font-bold">{t('formulaPremium')}</h5>
                  <p className="text-sm text-gray-700">
                    {t('formulaPremiumDesc')}
                  </p>
                  <p className="text-sm font-bold text-[#FF5722] mt-1">{t('formulaPremiumPrice')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/devis">
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0]">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('getQuote')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
