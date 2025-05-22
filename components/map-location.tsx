"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapLocationProps {
  name: string
  address: string
  city: string
  postalCode: string
  lat: number
  lng: number
}

export function MapLocation({ name, address, city, postalCode, lat, lng }: MapLocationProps) {
  const [showMap, setShowMap] = useState(false)

  const handleOpenMap = () => {
    // Ouvrir Google Maps dans un nouvel onglet
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")
  }

  const handleShowMap = () => {
    setShowMap(!showMap)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
          onClick={handleShowMap}
        >
          {showMap ? "Masquer la carte" : "Voir sur la carte"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-xs border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
          onClick={handleOpenMap}
        >
          <MapPin className="mr-1 h-3 w-3" />Y aller
        </Button>
      </div>

      {showMap && (
        <div className="mt-2 h-48 w-full overflow-hidden rounded-md border border-gray-200">
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              Coordonnées GPS: {lat}, {lng}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
