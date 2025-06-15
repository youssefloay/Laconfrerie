import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#1E88E5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Événements | La Confrérie Foodtruck - Mariages, Festivals, Entreprises",
  description: "La Confrérie Foodtruck pour vos événements : mariages, festivals, événements d'entreprise. Une expérience culinaire unique avec notre foodtruck.",
  openGraph: {
    title: "Événements | La Confrérie Foodtruck",
    description: "La Confrérie Foodtruck pour vos événements : mariages, festivals, événements d'entreprise.",
    type: "website",
  }
} 