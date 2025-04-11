"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function NewUserPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    status: "active",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to create the user
    console.log("Creating user:", formData)
    router.push("/admin/users")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Ajouter un utilisateur</h1>
        </div>
      </div>

      <Tabs defaultValue="student" onValueChange={setUserType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="student">Étudiant</TabsTrigger>
          <TabsTrigger value="professor">Professeur</TabsTrigger>
          <TabsTrigger value="admin">Administrateur</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nouvel étudiant</CardTitle>
              <CardDescription>Ajoutez un nouvel étudiant à la plateforme d'évaluation.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="prenom.nom@etud.iga.ac.ma"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    L'email doit se terminer par @etud.iga.ac.ma pour les étudiants.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Classe</Label>
                    <Select defaultValue="3a">
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1ère année</SelectItem>
                        <SelectItem value="2a">2ème année</SelectItem>
                        <SelectItem value="3a">3ème année</SelectItem>
                        <SelectItem value="4a">4ème année</SelectItem>
                        <SelectItem value="5a">5ème année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      defaultValue={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/admin/users">Annuler</Link>
                </Button>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Créer l'étudiant
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="professor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nouveau professeur</CardTitle>
              <CardDescription>Ajoutez un nouveau professeur à la plateforme d'évaluation.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="prenom.nom@iga.ac.ma"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    L'email doit se terminer par @iga.ac.ma pour les professeurs.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Département</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Sélectionner un département" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Informatique</SelectItem>
                        <SelectItem value="math">Mathématiques</SelectItem>
                        <SelectItem value="physics">Physique</SelectItem>
                        <SelectItem value="elec">Électronique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      defaultValue={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/admin/users">Annuler</Link>
                </Button>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Créer le professeur
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nouvel administrateur</CardTitle>
              <CardDescription>Ajoutez un nouvel administrateur à la plateforme d'évaluation.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="prenom.nom@iga.ac.ma"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    L'email doit se terminer par @iga.ac.ma pour les administrateurs.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permissions">Niveau de permissions</Label>
                  <Select defaultValue="full">
                    <SelectTrigger id="permissions">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Administrateur complet</SelectItem>
                      <SelectItem value="limited">Administrateur limité</SelectItem>
                      <SelectItem value="readonly">Lecture seule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/admin/users">Annuler</Link>
                </Button>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Créer l'administrateur
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

