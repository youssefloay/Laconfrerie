import Image from "next/image"

interface FoodImageProps {
  name: string
  width: number
  height: number
  alt: string
  className?: string
}

export function FoodImage({ name, width, height, alt, className = "" }: FoodImageProps) {
  // Map of food items to their image URLs
  const foodImages: Record<string, string> = {
    burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    fries: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1000&auto=format&fit=crop",
    salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
    drink: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop",
    foodtruck: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=1000&auto=format&fit=crop",
    tenders: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1000&auto=format&fit=crop",
  }

  // Get the image URL or use a placeholder if not found
  const imageUrl = foodImages[name] || `/placeholder.svg?height=${height}&width=${width}&text=${name}`

  return (
    <Image
      src={imageUrl || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover rounded-lg ${className}`}
    />
  )
}
