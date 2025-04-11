"use client"

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
import { Copy, Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

// Mock data for evaluations
const mockEvaluations = [
  {
    id: 1,
    title: "Programmation Java - Examen final",
    course: "Programmation Java",
    professor: "Prof. Dupont",
    type: "exam",
    questions: 15,
    duration: 60,
    status: "active",
    createdAt: "2023-03-15",
    expiresAt: "2023-03-17",
    participants: "28/40",
    averageScore: "14.5/20",
  },
  {
    id: 2,
    title: "Bases de données - Contrôle continu",
    course: "Bases de données",
    professor: "Prof. Martin",
    type: "quiz",
    questions: 10,
    duration: 30,
    status: "active",
    createdAt: "2023-03-16",
    expiresAt: "2023-03-18",
    participants: "22/35",
    averageScore: "13.8/20",
  },
  {
    id: 3,
    title: "Réseaux informatiques - QCM",
    course: "Réseaux informatiques",
    professor: "Prof. Dubois",
    type: "quiz",
    questions: 20,
    duration: 45,
    status: "active",
    createdAt: "2023-03-14",
    expiresAt: "2023-03-17",
    participants: "15/40",
    averageScore: "15.1/20",
  },
  {
    id: 4,
    title: "Intelligence artificielle - Projet",
    course: "Intelligence Artificielle",
    professor: "Prof. Dupont",
    type: "project",
    questions: 5,
    duration: 120,
    status: "draft",
    createdAt: "2023-03-10",
    expiresAt: "",
    participants: "0/30",
    averageScore: "-",
  },
  {
    id: 5,
    title: "Mathématiques - Examen partiel",
    course: "Mathématiques",
    professor: "Prof. Leroy",
    type: "exam",
    questions: 12,
    duration: 90,
    status: "completed",
    createdAt: "2023-03-01",
    expiresAt: "2023-03-03",
    participants: "38/40",
    averageScore: "13.2/20",
  },
  {
    id: 6,
    title: "Algorithmique - Examen final",
    course: "Algorithmique",
    professor: "Prof. Martin",
    type: "exam",
    questions: 15,
    duration: 120,
    status: "completed",
    createdAt: "2023-02-28",
    expiresAt: "2023-03-02",
    participants: "32/35",
    averageScore: "14.5/20",
  },
]

export default function EvaluationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewQuestionsDialogOpen, setIsViewQuestionsDialogOpen] = useState(false)

  // Filter and sort evaluations
  const filteredEvaluations = mockEvaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === "all" || evaluation.course === courseFilter
    const matchesType = typeFilter === "all" || evaluation.type === typeFilter
    const matchesStatus = statusFilter === "all" || evaluation.status === statusFilter
    return matchesSearch && matchesCourse && matchesType && matchesStatus
  })

  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    let comparison = 0
    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title)
    } else if (sortBy === "course") {
      comparison = a.course.localeCompare(b.course)
    } else if (sortBy === "professor") {
      comparison = a.professor.localeCompare(b.professor)
    } else if (sortBy === "createdAt") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleDeleteEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation)
    setIsDeleteDialogOpen(true)
  }

  const handleViewQuestions = (evaluation: any) => {
    setSelectedEvaluation(evaluation)
    setIsViewQuestionsDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the evaluation
    console.log(`Deleting evaluation: ${selectedEvaluation.id}`)
    setIsDeleteDialogOpen(false)
  }

  // Mock data for questions in an evaluation
  const mockQuestionsInEvaluation = [
    {
      id: 1,
      text: "Quelle est la différence entre une classe abstraite et une interface en Java?",
      type: "open-ended",
      points: 4,
    },
    {
      id: 2,
      text: "Quelle est la complexité de l'algorithme de tri rapide (Quicksort) dans le cas moyen?",
      type: "multiple-choice",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      points: 2,
    },
    {
      id: 3,
      text: "Qu'est-ce que le polymorphisme en programmation orientée objet?",
      type: "short-answer",
      points: 3,
    },
    {
      id: 4,
      text: "Associez chaque concept à sa définition correcte:",
      type: "matching",
      options: ["Héritage", "Encapsulation", "Polymorphisme", "Abstraction"],
      points: 4,
    },
    {
      id: 5,
      text: "Écrivez un programme Java qui imprime les nombres premiers de 1 à 100.",
      type: "open-ended",
      points: 5,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des évaluations</h1>
          <p className="text-muted-foreground">Gérez toutes les évaluations de la plateforme.</p>
        </div>
        <Button asChild>
          <Link href="/admin/evaluations/new">
            <Plus className="mr-2 h-4 w-4" /> Créer une évaluation
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évaluations</CardTitle>
          <CardDescription>Liste de toutes les évaluations disponibles sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par titre, cours ou professeur..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par cours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les cours</SelectItem>
                <SelectItem value="Programmation Java">Programmation Java</SelectItem>
                <SelectItem value="Bases de données">Bases de données</SelectItem>
                <SelectItem value="Réseaux informatiques">Réseaux informatiques</SelectItem>
                <SelectItem value="Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                <SelectItem value="Algorithmique">Algorithmique</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="exam">Examen</SelectItem>
                <SelectItem value="quiz">QCM</SelectItem>
                <SelectItem value="project">Projet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Durée (min)</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell className="font-medium">{evaluation.title}</TableCell>
                    <TableCell>{evaluation.course}</TableCell>
                    <TableCell>{evaluation.professor}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          evaluation.type === "exam"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                            : evaluation.type === "quiz"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                        }
                      >
                        {evaluation.type === "exam" ? "Examen" : evaluation.type === "quiz" ? "QCM" : "Projet"}
                      </Badge>
                    </TableCell>
                    <TableCell>{evaluation.questions}</TableCell>
                    <TableCell>{evaluation.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          evaluation.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : evaluation.status === "draft"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                        }
                      >
                        {evaluation.status === "active"
                          ? "Actif"
                          : evaluation.status === "draft"
                            ? "Brouillon"
                            : "Terminé"}
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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/evaluations/${evaluation.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewQuestions(evaluation)}>
                            <Eye className="mr-2 h-4 w-4" /> Voir les questions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> Voir les résultats
                          </DropdownMenuItem>
                          {evaluation.status === "active" && (
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Copier le code
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvaluation(evaluation)}>
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
            Affichage de {sortedEvaluations.length} évaluations sur {mockEvaluations.length}
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Evaluation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette évaluation ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedEvaluation && (
            <div className="py-4">
              <p className="mb-2">
                <span className="font-semibold">Titre :</span> {selectedEvaluation.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Cours :</span> {selectedEvaluation.course}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Professeur :</span> {selectedEvaluation.professor}
              </p>
              <p>
                <span className="font-semibold">Questions :</span> {selectedEvaluation.questions}
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

      {/* View Questions Dialog */}
      <Dialog open={isViewQuestionsDialogOpen} onOpenChange={setIsViewQuestionsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Questions de l'évaluation</DialogTitle>
            <DialogDescription>
              {selectedEvaluation && `Liste des questions pour l'évaluation "${selectedEvaluation.title}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {mockQuestionsInEvaluation.map((question, index) => (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Question {index + 1}</span>
                      <Badge variant="outline">
                        {question.type === "multiple-choice"
                          ? "QCM"
                          : question.type === "short-answer"
                            ? "Réponse courte"
                            : question.type === "matching"
                              ? "Appariement"
                              : "Question ouverte"}
                      </Badge>
                    </div>
                    <span className="text-sm">
                      {question.points} pt{question.points > 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="mb-3">{question.text}</p>

                  {question.type === "multiple-choice" && question.options && (
                    <div className="space-y-2 pl-4">
                      {question.options.map((option, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div
                            className={`h-4 w-4 rounded-full border ${
                              j === question.correctAnswer ? "bg-primary-blue border-primary-blue" : ""
                            }`}
                          ></div>
                          <span className={j === question.correctAnswer ? "font-medium" : ""}>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "matching" && question.options && (
                    <div className="space-y-2 pl-4">
                      {question.options.map((option, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewQuestionsDialogOpen(false)}>
              Fermer
            </Button>
            <Button asChild>
              <Link href={selectedEvaluation ? `/admin/evaluations/${selectedEvaluation.id}/edit` : "#"}>
                <Edit className="mr-2 h-4 w-4" /> Modifier les questions
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

