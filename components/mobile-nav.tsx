"use client"

import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, MapPin, Calendar, ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/src/i18n/routing"
import { cn } from "@/lib/utils"

export function MobileNav() {
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 pb-safe backdrop-blur-lg md:hidden animate-slide-in-bottom">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const content = (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                item.active ? "text-menu-blue font-bold scale-110" : "text-gray-500 hover:text-menu-blue"
              )}
            >
              <div className={cn(
                "rounded-xl p-1.5 transition-colors duration-300",
                item.active ? "bg-menu-yellow text-menu-blue shadow-sm" : "bg-transparent"
              )}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-tighter line-clamp-1">{item.label}</span>
            </div>
          )

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                {content}
              </a>
            )
          }

          return (
            <Link key={item.href} href={item.href as any} className="flex-1">
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
