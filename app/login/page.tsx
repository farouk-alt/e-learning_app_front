"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, GraduationCap, School } from "lucide-react"
import FooterWithLanguage from "@/components/footer-with-language"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [userType, setUserType] = useState("student")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate email domain based on user type
    const professorDomain = "@iga.ac.ma"
    const studentDomain = "@etud.iga.ac.ma"
    const requiredDomain = userType === "professor" ? professorDomain : studentDomain

    if (!email.endsWith(requiredDomain)) {
      setError(`L'adresse email doit se terminer par ${requiredDomain}`)
      return
    }

    // Simulate login - in a real app, this would call an API
    if (userType === "professor") {
      router.push("/professor/dashboard")
    } else {
      router.push("/student/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center mb-4">
            <img src="/images/evalyo-logo.png" alt="Evalyo" className="h-16" />
          </Link>
          <p className="text-gray-600">Plateforme d&apos;évaluation en ligne</p>
        </div>

        <Tabs defaultValue="student" className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              <span>Étudiant</span>
            </TabsTrigger>
            <TabsTrigger value="professor" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Professeur</span>
            </TabsTrigger>
          </TabsList>

          <Card className="iga-shadow">
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                {userType === "professor"
                  ? "Accès réservé aux professeurs de l'IGA"
                  : "Accès réservé aux étudiants de l'IGA"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === "professor" ? "nom@iga.ac.ma" : "nom@etud.iga.ac.ma"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link href="/forgot-password" className="text-xs text-primary-blue hover:underline">
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-gray-600">
                En vous connectant, vous acceptez nos{" "}
                <Link href="/terms" className="text-primary-blue hover:underline">
                  conditions d&apos;utilisation
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Tabs>
      </div>

      <FooterWithLanguage />
    </div>
  )
}

