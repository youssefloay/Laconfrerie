import type React from "react"
import type { Metadata } from "next"
import { Baloo_2, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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

export const metadata: Metadata = {
  title: "La Confrérie Foodtruck | Burgers & Salades à Villeneuve-lès-Maguelone",
  description: "Savourez nos délicieux burgers et salades dans une ambiance estivale à la Plage du Pilou ! Foodtruck à Villeneuve-lès-Maguelone, ouvert tous les jours de 11h30 à 18h30. Commandez en ligne ou venez nous retrouver sur la plage !",
  generator: 'v0.dev',
  applicationName: 'La Confrérie Foodtruck',
  keywords: [
    'foodtruck', 'burgers', 'salades', 'Villeneuve-lès-Maguelone', 'Plage du Pilou',
    'restaurant mobile', 'événements', 'mariages', 'festivals', 'cuisine street food',
    'restauration rapide', 'plage', 'été', 'Méditerranée', 'Hérault', 'Montpellier',
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
    title: 'La Confrérie Foodtruck | Burgers & Salades à Villeneuve-lès-Maguelone',
    description: 'Savourez nos délicieux burgers et salades dans une ambiance estivale à la Plage du Pilou ! Foodtruck à Villeneuve-lès-Maguelone, ouvert tous les jours de 11h30 à 18h30.',
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
    title: 'La Confrérie Foodtruck | Burgers & Salades à Villeneuve-lès-Maguelone',
    description: 'Savourez nos délicieux burgers et salades dans une ambiance estivale à la Plage du Pilou !',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${baloo.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Analytics />
          <GoogleAnalytics gaId="G-GSJHW3W7E9" />
        </ThemeProvider>
      </body>
    </html>
  )
}
