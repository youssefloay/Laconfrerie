"use client"

import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, MapPin, Calendar, ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/src/i18n/routing"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const t = useTranslations("Navigation")
  const locale = pathname.split("/")[1] || "fr"

  const navItems = [
    {
      label: t("home"),
      href: "/",
      icon: Home,
      active: pathname === `/${locale}` || pathname === `/${locale}/`,
    },
    {
      label: "Menu",
      href: "/menu",
      icon: UtensilsCrossed,
      active: pathname.includes("/menu"),
    },
    {
      label: t("locations"),
      href: "/locations",
      icon: MapPin,
      active: pathname.includes("/locations"),
    },
    {
      label: t("events"),
      href: "/evenements",
      icon: Calendar,
      active: pathname.includes("/evenements"),
    },
    {
      label: "Uber",
      href: "https://www.ubereats.com/fr/store/la-confrerie/8FcWf8cVSG-PBm69V6POGQ?effect=",
      icon: ShoppingCart,
      external: true,
      active: false,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe pointer-events-none">
      <nav className={cn(
        "bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl transition-all duration-500 pointer-events-auto",
        // Mobile: full width, straight edges
        "w-full h-16 flex items-center justify-around px-4",
        // Desktop: floating dock style
        "md:w-auto md:min-w-[450px] md:h-14 md:mb-6 md:rounded-full md:px-8 md:gap-4 md:border-white/20"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon
          const content = (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-all duration-300 md:flex-row md:gap-3 group",
                item.active ? "text-menu-blue font-bold" : "text-gray-500 hover:text-menu-blue"
              )}
            >
              <div className={cn(
                "rounded-xl p-1.5 transition-all duration-300 group-hover:scale-110",
                item.active ? "bg-menu-yellow text-menu-blue shadow-sm" : "bg-transparent"
              )}>
                <Icon size={18} />
              </div>
              <span className={cn(
                "text-[9px] uppercase tracking-tighter md:text-xs md:font-semibold transition-all",
                item.active ? "scale-100 opacity-100" : "scale-95 opacity-80 group-hover:scale-100 group-hover:opacity-100"
              )}>
                {item.label}
              </span>
            </div>
          )

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none"
              >
                {content}
              </a>
            )
          }

          return (
            <Link key={item.href} href={item.href as any} className="flex-1 md:flex-none">
              {content}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
