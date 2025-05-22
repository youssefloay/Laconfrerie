import type React from "react"
import {
  Utensils,
  Coffee,
  Salad,
  Truck,
  Beef,
  Sandwich,
  Drumstick,
  Banana,
  Fish,
  IceCreamBowlIcon as Bowl,
  WrapTextIcon as Wrap,
  ChefHat,
} from "lucide-react"

interface FoodIconProps {
  name: string
  size?: number
  className?: string
}

export function FoodIcon({ name, size = 24, className = "" }: FoodIconProps) {
  // Map de noms à des icônes Lucide plus adaptées aux produits
  const iconMap: Record<string, React.ReactNode> = {
    burger: <Beef size={size} className={className} />,
    fries: <Utensils size={size} className={className} />,
    salad: <Salad size={size} className={className} />,
    drink: <Coffee size={size} className={className} />,
    foodtruck: <Truck size={size} className={className} />,
    tenders: <Drumstick size={size} className={className} />,
    bacon: <Sandwich size={size} className={className} />,
    dessert: <Banana size={size} className={className} />,
    bobun: <Bowl size={size} className={className} />,
    pokebowl: <Bowl size={size} className={className} />,
    wrap: <Wrap size={size} className={className} />,
    friture: <Fish size={size} className={className} />,
    specialite: <ChefHat size={size} className={className} />,
  }

  // Retourne l'icône correspondante ou une icône par défaut
  return <>{iconMap[name] || <Utensils size={size} className={className} />}</>
}
