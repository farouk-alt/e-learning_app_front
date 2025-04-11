"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Download, Edit, MoreHorizontal, Search, Trash2, UserPlus, Users } from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Ahmed Benali",
    email: "ahmed.benali@etud.iga.ac.ma",
    role: "student",
    status: "active",
    registrationDate: "2023-09-01",
    lastLogin: "2023-06-10",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    email: "fatima.zahra@etud.iga.ac.ma",
    role: "student",
    status: "active",
    registrationDate: "2023-09-02",
    lastLogin: "2023-06-12",
  },
  {
    id: 3,
    name: "Prof. Dupont",
    email: "dupont@iga.ac.ma",
    role: "professor",
    status: "active",
    registrationDate: "2022-08-15",
    lastLogin: "2023-06-15",
  },
  {
    id: 4,
    name: "Prof. Martin",
    email: "martin@iga.ac.ma",
    role: "professor",
    status: "active",
    registrationDate: "2022-08-20",
    lastLogin: "2023-06-14",
  },
  {
    id: 5,
    name: "Admin",
    email: "admin@iga.ac.ma",
    role: "admin",
    status: "active",
    registrationDate: "2022-01-01",
    lastLogin: "2023-06-15",
  },
  {
    id: 6,
    name: "Karim Idrissi",
    email: "karim.idrissi@etud.iga.ac.ma",
    role: "student",
    status: "inactive",
    registrationDate: "2023-09-03",
    lastLogin: "2023-05-20",
  },
  {
    id: 7,
    name: "Leila Alaoui",
    email: "leila.alaoui@etud.iga.ac.ma",
    role: "student",
    status: "active",
    registrationDate: "2023-09-04",
    lastLogin: "2023-06-11",
  },
  {
    id: 8,
    name: "Prof. Dubois",
    email: "dubois@iga.ac.ma",
    role: "professor",
    status: "inactive",
    registrationDate: "2022-08-25",
    lastLogin: "2023-04-10",
  },
  {
    id: 9,
    name: "Omar Benjelloun",
    email: "omar.benjelloun@etud.iga.ac.ma",
    role: "student",
    status: "active",
    registrationDate: "2023-09-05",
    lastLogin: "2023-06-13",
  },
  {
    id: 10,
    name: "Salma Tazi",
    email: "salma.tazi@etud.iga.ac.ma",
    role: "student",
    status: "active",
    registrationDate: "2023-09-06",
    lastLogin: "2023-06-14",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filter and sort users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "email") {
      comparison = a.email.localeCompare(b.email)
    } else if (sortBy === "registrationDate") {
      comparison = new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime()
    } else if (sortBy === "lastLogin") {
      comparison = new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the user
    console.log(`Deleting user: ${selectedUser.id}`)
    setIsDeleteDialogOpen(false)
  }

  const saveUserChanges = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the user
    console.log(`Saving changes for user: ${selectedUser.id}`)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez tous les utilisateurs de la plateforme d'évaluation.</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/new">
            <UserPlus className="mr-2 h-4 w-4" /> Ajouter un utilisateur
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>Liste de tous les utilisateurs enregistrés sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom ou email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="student">Étudiants</SelectItem>
                <SelectItem value="professor">Professeurs</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [field, order] = value.split("-")
                setSortBy(field)
                setSortOrder(order)
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                <SelectItem value="email-asc">Email (A-Z)</SelectItem>
                <SelectItem value="email-desc">Email (Z-A)</SelectItem>
                <SelectItem value="registrationDate-asc">Date d'inscription (ancien)</SelectItem>
                <SelectItem value="registrationDate-desc">Date d'inscription (récent)</SelectItem>
                <SelectItem value="lastLogin-asc">Dernière connexion (ancien)</SelectItem>
                <SelectItem value="lastLogin-desc">Dernière connexion (récent)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                            : user.role === "professor"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                              : "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                        }
                      >
                        {user.role === "admin"
                          ? "Administrateur"
                          : user.role === "professor"
                            ? "Professeur"
                            : "Étudiant"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                        }
                      >
                        {user.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" /> Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Affichage de {sortedUsers.length} utilisateurs sur {mockUsers.length}
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </CardFooter>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'utilisateur. Cliquez sur enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={saveUserChanges}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rôle
                  </Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Étudiant</SelectItem>
                      <SelectItem value="professor">Professeur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer les modifications</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="mb-2">
                <span className="font-semibold">Nom :</span> {selectedUser.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email :</span> {selectedUser.email}
              </p>
              <p>
                <span className="font-semibold">Rôle :</span>{" "}
                {selectedUser.role === "admin"
                  ? "Administrateur"
                  : selectedUser.role === "professor"
                    ? "Professeur"
                    : "Étudiant"}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

