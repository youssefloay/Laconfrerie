"use client"

import { MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"

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

        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF5722]" />
              <div className="w-full">
                <h3 className="font-display text-lg font-bold">Plage du Pilou</h3>
                <p className="text-gray-700">À côté de la Stèle aux démineurs du Languedoc</p>
                <p className="text-gray-700">34750 Villeneuve-lès-Maguelone</p>

                <div className="mt-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1E88E5]" />
                  <span>Tous les jours: 11h30 - 18h30</span>
                </div>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                      onClick={() =>
                        window.open(`https://www.google.com/maps/search/?api=1&query=43.506683,3.883924`, "_blank")
                      }
                    >
                      <MapPin className="mr-1 h-3 w-3" />Y aller
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">GPS: 43.506683, 3.883924</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="font-display text-xl font-bold text-[#1E88E5] mb-4">Informations pratiques</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-bold">Accès :</span> Parking gratuit à proximité, accès direct à la plage
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Services :</span> Tables et chaises à disposition, parasols
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
