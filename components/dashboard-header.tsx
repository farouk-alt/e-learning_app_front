import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, User, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  userType: "student" | "professor"
  userName: string
}

export default function DashboardHeader({ userType, userName }: DashboardHeaderProps) {
  const navItems =
    userType === "student"
      ? [
          { label: "Mes évaluations", href: "/student/dashboard" },
          { label: "Résultats", href: "/student/results" },
          { label: "Recommandations", href: "/student/recommendations" },
        ]
      : [
          { label: "Tableau de bord", href: "/professor/dashboard" },
          { label: "Mes évaluations", href: "/professor/assessments" },
          { label: "Résultats", href: "/professor/results" },
        ]

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/evalyo-logo.png" alt="Evalyo" width={160} height={64} className="h-16 w-auto" />
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item, i) => (
              <Link key={i} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Mon profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <Link href="/login" className="w-full">
                  Se déconnecter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

