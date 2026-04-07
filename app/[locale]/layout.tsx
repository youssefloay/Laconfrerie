import type React from "react"
import type { Metadata, Viewport } from "next"
import { Baloo_2, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "La Confrérie Foodtruck | Burgers & Salades à Montpellier",
  description: "Savourez nos délicieux burgers et salades à Montpellier ! Foodtruck à Montpellier, ouvert du lundi au vendredi de 11h30 à 14h30. Commandez en ligne ou venez nous retrouver sur place !",
  generator: 'v0.dev',
  applicationName: 'La Confrérie Foodtruck',
  keywords: [
    'foodtruck', 'burgers', 'salades', 'Montpellier',
    'restaurant mobile', 'événements', 'mariages', 'festivals', 'cuisine street food',
    'restauration rapide', 'été', 'Méditerranée', 'Hérault', 'Montpellier',
    'traiteur événementiel', 'catering', 'food truck', 'burger gourmet', 'salade fraîche'
  ],
  authors: [{ name: 'La Confrérie Foodtruck', url: 'https://laconfrerie-foodtruck.fr' }],
  creator: 'La Confrérie Foodtruck',
  publisher: 'La Confrérie Foodtruck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
    url: false,
  },
  metadataBase: new URL('https://laconfrerie-foodtruck.fr'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    title: 'La Confrérie Foodtruck | Burgers & Salades à Montpellier',
    description: "Savourez nos délicieux burgers et salades à Montpellier ! Foodtruck à Montpellier, ouvert du lundi au vendredi de 11h30 à 14h30.",
    url: 'https://laconfrerie-foodtruck.fr',
    siteName: 'La Confrérie Foodtruck',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: 'La Confrérie Foodtruck Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Confrérie Foodtruck | Burgers & Salades à Montpellier',
    description: 'Savourez nos délicieux burgers et salades à Montpellier !',
    images: ['/images/logo.png'],
    creator: '@laconfrerie',
    site: '@laconfrerie',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'ionos-verification': 'votre-code-verification-ionos',
    }
  },
  category: 'food',
  classification: 'restaurant',
  referrer: 'origin-when-cross-origin',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'La Confrérie Foodtruck',
    'application-name': 'La Confrérie Foodtruck',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/logo.png',
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'La Confrérie Foodtruck',
  }
}

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import { BottomNav } from "@/components/bottom-nav"

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable} ${baloo.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <div className="pb-16 md:pb-24">
              {children}
            </div>
            <BottomNav />
            <Analytics />
            <GoogleAnalytics gaId="G-GSJHW3W7E9" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
