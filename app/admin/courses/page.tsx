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
import { Download, Edit, FileText, MoreHorizontal, Plus, Search, Trash2, Users } from "lucide-react"

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    name: "Programmation Java",
    code: "INFO301",
    department: "Informatique",
    professor: "Prof. Dupont",
    students: 120,
    evaluations: 5,
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Bases de données",
    code: "INFO302",
    department: "Informatique",
    professor: "Prof. Martin",
    students: 95,
    evaluations: 4,
    status: "active",
    createdAt: "2023-01-20",
  },
  {
    id: 3,
    name: "Réseaux informatiques",
    code: "INFO303",
    department: "Informatique",
    professor: "Prof. Dubois",
    students: 85,
    evaluations: 3,
    status: "active",
    createdAt: "2023-01-25",
  },
  {
    id: 4,
    name: "Intelligence Artificielle",
    code: "INFO401",
    department: "Informatique",
    professor: "Prof. Dupont",
    students: 105,
    evaluations: 4,
    status: "active",
    createdAt: "2023-02-01",
  },
  {
    id: 5,
    name: "Mathématiques",
    code: "MATH201",
    department: "Mathématiques",
    professor: "Prof. Leroy",
    students: 75,
    evaluations: 3,
    status: "active",
    createdAt: "2023-02-05",
  },
  {
    id: 6,
    name: "Systèmes d'exploitation",
    code: "INFO304",
    department: "Informatique",
    professor: "Prof. Martin",
    students: 70,
    evaluations: 2,
    status: "inactive",
    createdAt: "2023-02-10",
  },
  {
    id: 7,
    name: "Génie logiciel",
    code: "INFO402",
    department: "Informatique",
    professor: "Prof. Dubois",
    students: 65,
    evaluations: 2,
    status: "active",
    createdAt: "2023-02-15",
  },
  {
    id: 8,
    name: "Sécurité informatique",
    code: "INFO403",
    department: "Informatique",
    professor: "Prof. Dupont",
    students: 60,
    evaluations: 2,
    status: "active",
    createdAt: "2023-02-20",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewStudentsDialogOpen, setIsViewStudentsDialogOpen] = useState(false)

  // Filter and sort courses
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let comparison = 0
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "code") {
      comparison = a.code.localeCompare(b.code)
    } else if (sortBy === "professor") {
      comparison = a.professor.localeCompare(b.professor)
    } else if (sortBy === "students") {
      comparison = a.students - b.students
    } else if (sortBy === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course)
    setIsEditDialogOpen(true)
  }

  const handleDeleteCourse = (course: any) => {
    setSelectedCourse(course)
    setIsDeleteDialogOpen(true)
  }

  const handleViewStudents = (course: any) => {
    setSelectedCourse(course)
    setIsViewStudentsDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the course
    console.log(`Deleting course: ${selectedCourse.id}`)
    setIsDeleteDialogOpen(false)
  }

  const saveCourseChanges = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the course
    console.log(`Saving changes for course: ${selectedCourse.id}`)
    setIsEditDialogOpen(false)
  }

  // Mock data for students in a course
  const mockStudentsInCourse = [
    { id: 1, name: "Ahmed Benali", email: "ahmed.benali@etud.iga.ac.ma", status: "active" },
    { id: 2, name: "Fatima Zahra", email: "fatima.zahra@etud.iga.ac.ma", status: "active" },
    { id: 3, name: "Karim Idrissi", email: "karim.idrissi@etud.iga.ac.ma", status: "inactive" },
    { id: 4, name: "Leila Alaoui", email: "leila.alaoui@etud.iga.ac.ma", status: "active" },
    { id: 5, name: "Omar Benjelloun", email: "omar.benjelloun@etud.iga.ac.ma", status: "active" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des cours</h1>
          <p className="text-muted-foreground">Gérez tous les cours de la plateforme d'évaluation.</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" /> Ajouter un cours
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cours</CardTitle>
          <CardDescription>Liste de tous les cours disponibles sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom, code ou professeur..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                <SelectItem value="Informatique">Informatique</SelectItem>
                <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                <SelectItem value="Physique">Physique</SelectItem>
                <SelectItem value="Électronique">Électronique</SelectItem>
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
                <SelectItem value="code-asc">Code (A-Z)</SelectItem>
                <SelectItem value="code-desc">Code (Z-A)</SelectItem>
                <SelectItem value="professor-asc">Professeur (A-Z)</SelectItem>
                <SelectItem value="professor-desc">Professeur (Z-A)</SelectItem>
                <SelectItem value="students-asc">Étudiants (croissant)</SelectItem>
                <SelectItem value="students-desc">Étudiants (décroissant)</SelectItem>
                <SelectItem value="createdAt-asc">Date de création (ancien)</SelectItem>
                <SelectItem value="createdAt-desc">Date de création (récent)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Étudiants</TableHead>
                  <TableHead>Évaluations</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>{course.professor}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.evaluations}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          course.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                        }
                      >
                        {course.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewStudents(course)}>
                            <Users className="mr-2 h-4 w-4" /> Voir les étudiants
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> Voir les évaluations
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course)}>
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
            Affichage de {sortedCourses.length} cours sur {mockCourses.length}
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le cours</DialogTitle>
            <DialogDescription>
              Modifiez les informations du cours. Cliquez sur enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <form onSubmit={saveCourseChanges}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input id="name" defaultValue={selectedCourse.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <Input id="code" defaultValue={selectedCourse.code} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Département
                  </Label>
                  <Select defaultValue={selectedCourse.department}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informatique">Informatique</SelectItem>
                      <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                      <SelectItem value="Physique">Physique</SelectItem>
                      <SelectItem value="Électronique">Électronique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="professor" className="text-right">
                    Professeur
                  </Label>
                  <Select defaultValue={selectedCourse.professor}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un professeur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prof. Dupont">Prof. Dupont</SelectItem>
                      <SelectItem value="Prof. Martin">Prof. Martin</SelectItem>
                      <SelectItem value="Prof. Dubois">Prof. Dubois</SelectItem>
                      <SelectItem value="Prof. Leroy">Prof. Leroy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select defaultValue={selectedCourse.status}>
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

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce cours ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="py-4">
              <p className="mb-2">
                <span className="font-semibold">Nom :</span> {selectedCourse.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Code :</span> {selectedCourse.code}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Professeur :</span> {selectedCourse.professor}
              </p>
              <p>
                <span className="font-semibold">Étudiants inscrits :</span> {selectedCourse.students}
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

      {/* View Students Dialog */}
      <Dialog open={isViewStudentsDialogOpen} onOpenChange={setIsViewStudentsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Étudiants inscrits</DialogTitle>
            <DialogDescription>
              {selectedCourse && `Liste des étudiants inscrits au cours ${selectedCourse.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudentsInCourse.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            student.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                              : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                          }
                        >
                          {student.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Voir les détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewStudentsDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Ajouter des étudiants</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

