"use client"

import { Mail, Phone, Instagram, Facebook, ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { LanguageToggle } from "@/components/language-toggle"

export default function VilleneuveContactPage() {
  const t = useTranslations('ContactPage')
  const homeT = useTranslations('HomePage.contact')

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

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">{t('title')}</h1>

        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#1E88E5]" />
                <a href="mailto:contact@laconfrerietruck.fr" className="text-lg hover:text-[#FF5722] transition-colors">contact@laconfrerietruck.fr</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#1E88E5]" />
                <a href="tel:0662350953" className="text-lg hover:text-[#FF5722] transition-colors">06 62 35 09 53</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-[#1E88E5]" />
                <a href="https://instagram.com/laconfrerietruck" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#FF5722] transition-colors">@laconfrerietruck</a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-[#1E88E5]" />
                <a href="https://facebook.com/laconfrerietruck" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#FF5722] transition-colors">La Confrérie Foodtruck</a>
              </div>
            </div>

            <div>
              <div className="mb-4 flex justify-center">
                <SiteLogo size="medium" background="yellow" />
              </div>
              <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">{t('reservations')}</h3>
              <p className="mb-4 text-gray-700">{t('eventQuestion')}</p>
              <Link href="/devis">
                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] transition-all duration-300 hover:scale-105 hover:shadow-lg">
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
