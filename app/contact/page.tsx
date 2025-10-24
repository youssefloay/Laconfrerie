import Link from "next/link"
import { ArrowLeft, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import type { Metadata, Viewport } from "next"
import { SocialNav } from "@/components/social-nav"

export const viewport: Viewport = {
  themeColor: "#1E88E5",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Contact | La Confrérie Foodtruck - Villeneuve-lès-Maguelone",
  description: "Contactez La Confrérie Foodtruck pour vos événements ou réservations. Retrouvez-nous à la Plage du Pilou à Villeneuve-lès-Maguelone.",
  openGraph: {
    title: "Contact | La Confrérie Foodtruck",
    description: "Contactez-nous pour vos événements ou réservations à la Plage du Pilou.",
    type: "website",
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-[#1E88E5]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <h1 className="font-display text-4xl font-bold text-[#FF5722] text-center mb-12">Contactez-nous</h1>
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
              <h3 className="mb-4 font-display text-xl font-bold text-[#1E88E5] text-center">Réservations</h3>
              <p className="mb-4 text-gray-700">
                Vous organisez un événement ? Contactez-nous pour réserver notre foodtruck !
              </p>
              <Link href="/devis">
                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19]">Demander un devis</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
