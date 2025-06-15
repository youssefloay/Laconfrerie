import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#1E88E5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Demander un Devis | La Confrérie Foodtruck",
  description: "Demandez un devis personnalisé pour votre événement. La Confrérie Foodtruck vous propose des formules adaptées à vos besoins.",
  openGraph: {
    title: "Demander un Devis | La Confrérie Foodtruck",
    description: "Demandez un devis personnalisé pour votre événement.",
    type: "website",
  }
} 