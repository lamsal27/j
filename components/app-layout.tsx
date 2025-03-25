"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Archive, Database, Home, Menu, Moon, Settings, StickyNote, Sun, Tv, X, Briefcase } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Watchlist", href: "/watchlist", icon: Tv },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Archive", href: "/archive", icon: Archive },
  { name: "Data & Database", href: "/database", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const NavItems = () => (
    <>
      <div className="flex items-center gap-3 px-3 py-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Siddharth Lamsal</p>
          <p className="text-sm text-muted-foreground">siddharth@example.com</p>
        </div>
      </div>
      <div className="space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-xl">Personal Dashboard</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-6">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 font-semibold lg:hidden">
          <span className="text-xl">Dashboard</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r lg:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 px-6 py-4 font-semibold">
              <span className="text-xl">Personal Dashboard</span>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <NavItems />
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

