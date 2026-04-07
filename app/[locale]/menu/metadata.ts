import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: "#1E88E5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Menu | La Confrérie Foodtruck - Burgers & Salades à Montpellier",
  description: "Découvrez notre menu de burgers gourmets et salades fraîches à Montpellier. Des ingrédients de qualité et des recettes savoureuses.",
  keywords: [
    "restaurant montpellier",
    "confrérie",
    "food truck montpellier",
    "la confrerie food truck",
    "restaurant montpellier",
    "restaurant frontignan plage",
    "takeout food near me",
    "montpellier restaurant",
    "fast food montpellier",
    "restaurant montpellier centre"
  ],
  openGraph: {
    title: "Menu | La Confrérie Foodtruck",
    description: "Découvrez notre menu de burgers gourmets et salades fraîches à Montpellier.",
    type: "website",
  }
}