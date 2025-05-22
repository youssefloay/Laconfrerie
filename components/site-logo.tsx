import Image from "next/image"
import Link from "next/link"

interface SiteLogoProps {
  size?: "small" | "medium" | "large"
  className?: string
  background?: "yellow" | "blue" | "white" | "none"
}

export function SiteLogo({ size = "medium", className = "", background = "yellow" }: SiteLogoProps) {
  // Définir les dimensions en fonction de la taille
  const dimensions = {
    small: { width: 80, height: 80 },
    medium: { width: 150, height: 150 },
    large: { width: 250, height: 250 },
  }

  const { width, height } = dimensions[size]

  // Définir les couleurs d'arrière-plan
  const bgColors = {
    yellow: "bg-[#FFD54F]",
    blue: "bg-[#1E88E5]",
    white: "bg-white",
    none: "",
  }

  const bgColor = bgColors[background]

  return (
    <div
      className={`${className} ${background !== "none" ? "rounded-full overflow-hidden flex items-center justify-center " + bgColor : ""}`}
      style={{ width, height }}
    >
      <Link href="/">
        <div className="relative flex items-center justify-center" style={{ width: width * 0.9, height: height * 0.9 }}>
          <Image
            src="/images/logo.png"
            alt="La Confrérie Foodtruck"
            width={width * 0.9}
            height={height * 0.9}
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  )
}
