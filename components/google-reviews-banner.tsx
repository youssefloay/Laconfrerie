"use client"

import { useEffect, useRef } from "react"
import { Star, MessageSquareHeart, ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GoogleReviewsBanner() {
  const googleReviewUrl = "https://share.google/QqsfcUZtbe1Vgt9pE" // URL officielle fiche Google La Confrérie
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!widgetRef.current) return

    // Insertion propre du script Trustmary dans le container
    const script = document.createElement("script")
    script.src = "https://widget.trustmary.com/r-wyNFhX1"
    script.async = true
    widgetRef.current.appendChild(script)

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100 my-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 flex-shrink-0">
            <Award className="h-8 w-8 text-[#FFB300]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FFB300] text-[#FFB300]" />
              ))}
              <span className="font-extrabold text-gray-900 ml-1 text-base sm:text-lg">Avis Vérifiés Google</span>
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900">
              Des clients conquis, particuliers comme entreprises
            </h3>
            <p className="text-xs text-gray-500">
              Cuisine 100% maison, viandes sélectionnées et produits frais du terroir occitan.
            </p>
          </div>
        </div>

        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white rounded-xl text-xs font-bold gap-2 py-5"
          >
            <MessageSquareHeart className="h-4 w-4" />
            <span>Vous avez goûté ? Laissez un avis Google</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </div>

      {/* Emplacement dynamique du Widget Trustmary */}
      <div ref={widgetRef} className="min-h-[140px] w-full" />
    </div>
  )
}
