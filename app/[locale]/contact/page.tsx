"use client"

import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/routing'
import { ArrowLeft, Mail, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function ContactPage() {
  const t = useTranslations('ContactPage')
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

        <h1 className="font-display text-4xl font-bold text-[#FF5722] text-center mb-12">{t('title')}</h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
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
                  href="https://www.facebook.com/la.confrerie.truck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-[#FF5722]"
                >
                  La Confrérie Truck
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 flex justify-center">
                <SiteLogo size="medium" background="yellow" />
              </div>
              <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">{t('reservations')}</h3>
              <p className="mb-4 text-gray-700">
                {t('eventQuestion')}
              </p>
              <Link href="/devis">
                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19]">{t('getQuote')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
