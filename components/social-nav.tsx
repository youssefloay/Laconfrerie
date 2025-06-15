import { Instagram, Facebook } from "lucide-react"

export function SocialNav() {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <a
        href="https://instagram.com/laconfrerietruck"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1E88E5] hover:text-[#FF5722] transition-colors"
        aria-label="Instagram La Confrérie Truck"
      >
        <Instagram className="h-6 w-6" />
      </a>
      <a
        href="https://www.facebook.com/la.confrerie.truck"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1E88E5] hover:text-[#FF5722] transition-colors"
        aria-label="Facebook La Confrérie Truck"
      >
        <Facebook className="h-6 w-6" />
      </a>
    </div>
  )
} 