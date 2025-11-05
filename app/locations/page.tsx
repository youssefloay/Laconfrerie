"use client"

import { MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { SocialNav } from "@/components/social-nav"

function MapButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
      onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=191%20Av.%20de%20Fes%2C%2034090%20Montpellier", "_blank")}
    >
      <MapPin className="mr-1 h-3 w-3" />Y aller
    </Button>
  )
}

export default function LocationsPage() {
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

        <h1 className="font-display text-4xl font-bold text-[#1E88E5] text-center mb-12">Notre emplacement</h1>
        <div className="flex justify-center mb-8">
          <SocialNav />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
              <div className="w-full">
                <h3 className="font-display text-lg font-bold">191 Avenue de Fes</h3>
                <p className="text-gray-700">34090 Montpellier</p>

                <div className="mt-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1E88E5]" />
                  <span>Lundi au vendredi: 11h30 - 14h30</span>
                </div>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <MapButton />
                  </div>
                </div>
                <div className="mt-4 h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=191%20Av.%20de%20Fes%2C%2034090%20Montpellier&output=embed"
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
            <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4">Informations pratiques</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-bold">Arrêt de tram :</span> Malbosc - Domaine d'Ô
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Stationnement :</span> Possibilité de stationnement à proximité
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Paiement :</span> Espèces, CB
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Bon à savoir :</span> Possibilité de commander à l'avance par téléphone
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
