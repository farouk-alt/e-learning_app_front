import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Clock, FileText, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import FooterWithLanguage from "@/components/footer-with-language"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Bell } from "lucide-react"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
            </Link>
            <nav className="ml-8 hidden md:flex space-x-6">
              <Link href="/student/dashboard" className="text-sm font-medium text-primary">
                Mes évaluations
              </Link>
              <Link href="/student/results" className="text-sm font-medium text-gray-600 hover:text-primary">
                Résultats
              </Link>
              <Link href="/student/recommendations" className="text-sm font-medium text-gray-600 hover:text-primary">
                Recommandations
              </Link>
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
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ahmed Benali</DropdownMenuLabel>
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

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mes évaluations</h1>
              <p className="text-muted-foreground">Bienvenue, Ahmed. Consultez vos évaluations en cours et passées.</p>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher..." className="w-full md:w-[200px] pl-8" />
              </div>

              <Card className="w-full md:w-auto">
                <CardContent className="p-3">
                  <form action="/student/join-assessment" method="get" className="flex gap-2">
                    <Input name="code" placeholder="Code d'évaluation" className="w-full md:w-[180px]" />
                    <Button type="submit" className="bg-[#0f172a] hover:bg-[#1e293b]">
                      Rejoindre
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">En cours</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Programmation Java", "Bases de données"].map((title, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>
                        Prof. {i === 0 ? "Dupont" : "Martin"} • {i === 0 ? "2ème année" : "3ème année"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4" />
                        <span>
                          Expire dans: {i + 1} jour{i > 0 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary-blue" />
                        <span>{i === 0 ? "QCM" : "Questions ouvertes"}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Durée:</span> {60 + i * 30} minutes
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Commencer l'évaluation</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Empty state */}
              {false && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Aucune évaluation en cours</AlertTitle>
                  <AlertDescription>
                    Vous n'avez pas d'évaluations actives pour le moment. Utilisez un code d'évaluation pour en
                    rejoindre une.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Mathématiques", "Physique appliquée"].map((title, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>
                        Prof. {i === 0 ? "Dubois" : "Leroy"} • {i === 0 ? "2ème année" : "3ème année"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4" />
                        <span>
                          Commence dans: {3 + i} jour{i > 0 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary-blue" />
                        <span>{i === 0 ? "QCM" : "Questions ouvertes"}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Durée:</span> {60 + i * 30} minutes
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        Pas encore disponible
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Algorithmique", "Systèmes d'exploitation", "Génie logiciel"].map((title, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>
                        Prof. {["Moreau", "Petit", "Lambert"][i]} • {i % 2 === 0 ? "2ème année" : "3ème année"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Note</span>
                        <span className="text-sm font-bold">{14 + i}/20</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-blue" style={{ width: `${((14 + i) / 20) * 100}%` }}></div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Terminé le: {new Date(Date.now() - (i + 1) * 86400000 * 3).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          Voir le corrigé
                        </Button>
                        <Button className="flex-1">Voir les recommandations</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FooterWithLanguage />
    </div>
  )
}

