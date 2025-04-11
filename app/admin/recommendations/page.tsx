"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BookOpen,
  Check,
  Download,
  Edit,
  Lightbulb,
  MoreHorizontal,
  Search,
  Settings,
  ThumbsDown,
  ThumbsUp,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for recommendations
const mockRecommendations = [
  {
    id: 1,
    student: "Omar Benjelloun",
    course: "Programmation Java",
    type: "resource",
    status: "pending",
    content: "Tutoriels vidéo sur les algorithmes de base et exercices pratiques en POO",
    createdAt: "2023-06-10",
    feedback: null,
  },
  {
    id: 2,
    student: "Karim Idrissi",
    course: "Bases de données",
    type: "resource",
    status: "approved",
    content: "Ressources spécifiques sur les requêtes SQL et la modélisation de données",
    createdAt: "2023-06-09",
    feedback: "Recommandation pertinente, ressources ajoutées au cours",
  },
  {
    id: 3,
    student: "Nadia Mansouri",
    course: "Mathématiques",
    type: "approach",
    status: "pending",
    content: "Approches alternatives pour l'apprentissage des mathématiques, applications interactives",
    createdAt: "2023-06-08",
    feedback: null,
  },
  {
    id: 4,
    student: "Hassan Alami",
    course: "Réseaux",
    type: "plan",
    status: "rejected",
    content: "Plan de rattrapage personnalisé avec des objectifs hebdomadaires",
    createdAt: "2023-06-07",
    feedback: "Le plan proposé est trop intensif, besoin d'une approche plus progressive",
  },
  {
    id: 5,
    student: null,
    course: "Intelligence Artificielle",
    type: "course",
    status: "approved",
    content: "Ajouter plus d'exercices pratiques et des sessions de révision supplémentaires",
    createdAt: "2023-06-06",
    feedback: "Excellente suggestion, mise en œuvre prévue pour le prochain semestre",
  },
  {
    id: 6,
    student: null,
    course: "Bases de données",
    type: "course",
    status: "pending",
    content: "Mettre en place des groupes de travail mixtes avec des étudiants de différents niveaux",
    createdAt: "2023-06-05",
    feedback: null,
  },
  {
    id: 7,
    student: "Samira Tazi",
    course: "Intelligence Artificielle",
    type: "resource",
    status: "approved",
    content: "Ressources supplémentaires sur les réseaux de neurones et l'apprentissage profond",
    createdAt: "2023-06-04",
    feedback: "Ressources ajoutées à la bibliothèque du cours",
  },
  {
    id: 8,
    student: null,
    course: "Mathématiques",
    type: "evaluation",
    status: "pending",
    content: "Augmenter le temps pour les évaluations de 60 à 90 minutes",
    createdAt: "2023-06-03",
    feedback: null,
  },
]

export default function RecommendationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [reviewStatus, setReviewStatus] = useState("approved")
  const [aiSettings, setAiSettings] = useState({
    enableAutoRecommendations: true,
    recommendationFrequency: "weekly",
    minimumConfidenceThreshold: 70,
    notifyProfessorsOnNew: true,
    autoApproveHighConfidence: false,
  })

  // Filter recommendations
  const filteredRecommendations = mockRecommendations.filter((recommendation) => {
    const matchesSearch =
      recommendation.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      !recommendation.student ||
      recommendation.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recommendation.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === "all" || recommendation.course === courseFilter
    const matchesType = typeFilter === "all" || recommendation.type === typeFilter
    const matchesStatus = statusFilter === "all" || recommendation.status === statusFilter
    return matchesSearch && matchesCourse && matchesType && matchesStatus
  })

  const handleEditRecommendation = (recommendation: any) => {
    setSelectedRecommendation(recommendation)
    setIsEditDialogOpen(true)
  }

  const handleReviewRecommendation = (recommendation: any) => {
    setSelectedRecommendation(recommendation)
    setReviewStatus(recommendation.status === "approved" ? "approved" : "pending")
    setFeedback(recommendation.feedback || "")
    setIsReviewDialogOpen(true)
  }

  const saveRecommendationChanges = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the recommendation
    console.log(`Saving changes for recommendation: ${selectedRecommendation.id}`)
    setIsEditDialogOpen(false)
  }

  const saveRecommendationReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the recommendation status and feedback
    console.log(
      `Reviewing recommendation: ${selectedRecommendation.id}, status: ${reviewStatus}, feedback: ${feedback}`,
    )
    setIsReviewDialogOpen(false)
  }

  const saveAiSettings = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the AI settings
    console.log("Saving AI settings:", aiSettings)
    setIsSettingsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recommandations IA</h1>
          <p className="text-muted-foreground">
            Gérez les recommandations générées par l'IA pour les étudiants et les cours.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="mr-2 h-4 w-4" /> Paramètres IA
          </Button>
          <Button>
            <Lightbulb className="mr-2 h-4 w-4" /> Générer de nouvelles recommandations
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommandations</CardTitle>
          <CardDescription>
            Liste des recommandations générées par l'IA pour améliorer les performances des étudiants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par étudiant, cours ou contenu..."
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
                <SelectItem value="Réseaux">Réseaux</SelectItem>
                <SelectItem value="Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                <SelectItem value="Mathématiques">Mathématiques</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="resource">Ressources</SelectItem>
                <SelectItem value="approach">Approche pédagogique</SelectItem>
                <SelectItem value="plan">Plan personnalisé</SelectItem>
                <SelectItem value="course">Amélioration de cours</SelectItem>
                <SelectItem value="evaluation">Évaluation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
                <SelectItem value="rejected">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contenu</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecommendations.map((recommendation) => (
                  <TableRow key={recommendation.id}>
                    <TableCell>
                      {recommendation.student ? (
                        recommendation.student
                      ) : (
                        <span className="text-muted-foreground">Tous les étudiants</span>
                      )}
                    </TableCell>
                    <TableCell>{recommendation.course}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          recommendation.type === "resource"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                            : recommendation.type === "approach"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                              : recommendation.type === "plan"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                                : recommendation.type === "course"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                        }
                      >
                        {recommendation.type === "resource"
                          ? "Ressources"
                          : recommendation.type === "approach"
                            ? "Approche"
                            : recommendation.type === "plan"
                              ? "Plan"
                              : recommendation.type === "course"
                                ? "Cours"
                                : "Évaluation"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{recommendation.content}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          recommendation.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : recommendation.status === "rejected"
                              ? "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                        }
                      >
                        {recommendation.status === "approved"
                          ? "Approuvé"
                          : recommendation.status === "rejected"
                            ? "Rejeté"
                            : "En attente"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(recommendation.createdAt).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleReviewRecommendation(recommendation)}>
                            <Check className="mr-2 h-4 w-4" /> Examiner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRecommendation(recommendation)}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" /> Voir les étudiants concernés
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BookOpen className="mr-2 h-4 w-4" /> Voir le cours
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
            Affichage de {filteredRecommendations.length} recommandations sur {mockRecommendations.length}
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Recommendation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la recommandation</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la recommandation. Cliquez sur enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {selectedRecommendation && (
            <form onSubmit={saveRecommendationChanges}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="student" className="text-right">
                    Étudiant
                  </Label>
                  <Input
                    id="student"
                    defaultValue={selectedRecommendation.student || "Tous les étudiants"}
                    className="col-span-3"
                    disabled={!selectedRecommendation.student}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">
                    Cours
                  </Label>
                  <Select defaultValue={selectedRecommendation.course}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un cours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programmation Java">Programmation Java</SelectItem>
                      <SelectItem value="Bases de données">Bases de données</SelectItem>
                      <SelectItem value="Réseaux">Réseaux</SelectItem>
                      <SelectItem value="Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                      <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue={selectedRecommendation.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resource">Ressources</SelectItem>
                      <SelectItem value="approach">Approche pédagogique</SelectItem>
                      <SelectItem value="plan">Plan personnalisé</SelectItem>
                      <SelectItem value="course">Amélioration de cours</SelectItem>
                      <SelectItem value="evaluation">Évaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Contenu
                  </Label>
                  <Textarea
                    id="content"
                    defaultValue={selectedRecommendation.content}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer les modifications</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Recommendation Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Examiner la recommandation</DialogTitle>
            <DialogDescription>
              Examinez et approuvez ou rejetez cette recommandation générée par l'IA.
            </DialogDescription>
          </DialogHeader>
          {selectedRecommendation && (
            <form onSubmit={saveRecommendationReview}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Détails de la recommandation</Label>
                  <div className="rounded-md border p-4 space-y-2">
                    <div>
                      <span className="font-medium">Étudiant:</span>{" "}
                      {selectedRecommendation.student || "Tous les étudiants"}
                    </div>
                    <div>
                      <span className="font-medium">Cours:</span> {selectedRecommendation.course}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {selectedRecommendation.type === "resource"
                        ? "Ressources"
                        : selectedRecommendation.type === "approach"
                          ? "Approche pédagogique"
                          : selectedRecommendation.type === "plan"
                            ? "Plan personnalisé"
                            : selectedRecommendation.type === "course"
                              ? "Amélioration de cours"
                              : "Évaluation"}
                    </div>
                    <div>
                      <span className="font-medium">Contenu:</span> {selectedRecommendation.content}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Décision</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={reviewStatus === "approved" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setReviewStatus("approved")}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" /> Approuver
                    </Button>
                    <Button
                      type="button"
                      variant={reviewStatus === "rejected" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setReviewStatus("rejected")}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" /> Rejeter
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback (optionnel)</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Ajoutez un commentaire ou une explication pour cette décision..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer la décision</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Paramètres des recommandations IA</DialogTitle>
            <DialogDescription>
              Configurez le comportement du système de recommandations basé sur l'IA.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveAiSettings}>
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAutoRecommendations">Recommandations automatiques</Label>
                  <p className="text-sm text-muted-foreground">Activer la génération automatique de recommandations</p>
                </div>
                <Switch
                  id="enableAutoRecommendations"
                  checked={aiSettings.enableAutoRecommendations}
                  onCheckedChange={(checked) => setAiSettings({ ...aiSettings, enableAutoRecommendations: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendationFrequency">Fréquence des recommandations</Label>
                <Select
                  value={aiSettings.recommendationFrequency}
                  onValueChange={(value) => setAiSettings({ ...aiSettings, recommendationFrequency: value })}
                >
                  <SelectTrigger id="recommendationFrequency">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="biweekly">Bi-hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumConfidenceThreshold">
                  Seuil de confiance minimum ({aiSettings.minimumConfidenceThreshold}%)
                </Label>
                <Input
                  id="minimumConfidenceThreshold"
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={aiSettings.minimumConfidenceThreshold}
                  onChange={(e) =>
                    setAiSettings({
                      ...aiSettings,
                      minimumConfidenceThreshold: Number.parseInt(e.target.value),
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Seules les recommandations avec un niveau de confiance supérieur à ce seuil seront générées
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyProfessorsOnNew">Notifications aux professeurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifier les professeurs lorsque de nouvelles recommandations sont générées
                  </p>
                </div>
                <Switch
                  id="notifyProfessorsOnNew"
                  checked={aiSettings.notifyProfessorsOnNew}
                  onCheckedChange={(checked) => setAiSettings({ ...aiSettings, notifyProfessorsOnNew: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoApproveHighConfidence">Approbation automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver automatiquement les recommandations avec un niveau de confiance très élevé (>90%)
                  </p>
                </div>
                <Switch
                  id="autoApproveHighConfidence"
                  checked={aiSettings.autoApproveHighConfidence}
                  onCheckedChange={(checked) => setAiSettings({ ...aiSettings, autoApproveHighConfidence: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enregistrer les paramètres</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Recommandations par étudiant</TabsTrigger>
          <TabsTrigger value="courses">Recommandations par cours</TabsTrigger>
          <TabsTrigger value="insights">Insights IA</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Étudiants avec le plus de recommandations</CardTitle>
              <CardDescription>Les étudiants qui ont reçu le plus de recommandations personnalisées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Recommandations</TableHead>
                      <TableHead>Approuvées</TableHead>
                      <TableHead>En attente</TableHead>
                      <TableHead>Rejetées</TableHead>
                      <TableHead>Moyenne</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Omar Benjelloun",
                        total: 5,
                        approved: 2,
                        pending: 2,
                        rejected: 1,
                        average: 10.5,
                      },
                      {
                        name: "Karim Idrissi",
                        total: 4,
                        approved: 3,
                        pending: 1,
                        rejected: 0,
                        average: 12.5,
                      },
                      {
                        name: "Nadia Mansouri",
                        total: 3,
                        approved: 1,
                        pending: 2,
                        rejected: 0,
                        average: 11.0,
                      },
                      {
                        name: "Hassan Alami",
                        total: 3,
                        approved: 1,
                        pending: 1,
                        rejected: 1,
                        average: 9.5,
                      },
                      {
                        name: "Samira Tazi",
                        total: 2,
                        approved: 2,
                        pending: 0,
                        rejected: 0,
                        average: 10.0,
                      },
                    ].map((student, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.total}</TableCell>
                        <TableCell className="text-green-600">{student.approved}</TableCell>
                        <TableCell className="text-amber-600">{student.pending}</TableCell>
                        <TableCell className="text-red-600">{student.rejected}</TableCell>
                        <TableCell>{student.average}/20</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/students/${i + 1}`}>Voir le profil</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cours avec le plus de recommandations</CardTitle>
              <CardDescription>Les cours qui ont reçu le plus de recommandations d'amélioration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cours</TableHead>
                      <TableHead>Professeur</TableHead>
                      <TableHead>Recommandations</TableHead>
                      <TableHead>Approuvées</TableHead>
                      <TableHead>En attente</TableHead>
                      <TableHead>Rejetées</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Intelligence Artificielle",
                        professor: "Prof. Dupont",
                        total: 8,
                        approved: 4,
                        pending: 3,
                        rejected: 1,
                      },
                      {
                        name: "Bases de données",
                        professor: "Prof. Martin",
                        total: 6,
                        approved: 3,
                        pending: 2,
                        rejected: 1,
                      },
                      {
                        name: "Programmation Java",
                        professor: "Prof. Dupont",
                        total: 5,
                        approved: 2,
                        pending: 2,
                        rejected: 1,
                      },
                      {
                        name: "Mathématiques",
                        professor: "Prof. Leroy",
                        total: 4,
                        approved: 1,
                        pending: 3,
                        rejected: 0,
                      },
                      {
                        name: "Réseaux",
                        professor: "Prof. Dubois",
                        total: 3,
                        approved: 1,
                        pending: 1,
                        rejected: 1,
                      },
                    ].map((course, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>{course.total}</TableCell>
                        <TableCell className="text-green-600">{course.approved}</TableCell>
                        <TableCell className="text-amber-600">{course.pending}</TableCell>
                        <TableCell className="text-red-600">{course.rejected}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/courses/${i + 1}`}>Voir le cours</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights générés par l'IA</CardTitle>
              <CardDescription>Tendances et observations basées sur l'analyse des recommandations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tendances principales</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Ressources supplémentaires",
                      description:
                        "Les recommandations de ressources supplémentaires sont les plus fréquentes (42%) et ont le taux d'approbation le plus élevé (85%).",
                    },
                    {
                      title: "Intelligence Artificielle",
                      description:
                        "Le cours d'Intelligence Artificielle génère le plus de recommandations, principalement en raison de sa complexité et de l'évolution rapide du domaine.",
                    },
                    {
                      title: "Approches pédagogiques",
                      description:
                        "Les recommandations d'approches pédagogiques alternatives sont particulièrement efficaces pour les cours de mathématiques et d'algorithmique.",
                    },
                    {
                      title: "Plans personnalisés",
                      description:
                        "Les plans personnalisés ont un taux de réussite de 78% lorsqu'ils sont suivis par les étudiants en difficulté.",
                    },
                  ].map((insight, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{insight.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Efficacité des recommandations</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Amélioration des performances</p>
                          <p className="text-sm text-muted-foreground">
                            Les étudiants qui suivent les recommandations approuvées voient leur moyenne augmenter de
                            2.3 points en moyenne sur une période de 3 mois.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Taux d'engagement</p>
                          <p className="text-sm text-muted-foreground">
                            72% des étudiants consultent et suivent les recommandations qui leur sont proposées, ce qui
                            est un taux d'engagement élevé.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Précision des recommandations</p>
                          <p className="text-sm text-muted-foreground">
                            Le système d'IA a une précision de 85% dans l'identification des difficultés spécifiques des
                            étudiants, ce qui est en constante amélioration.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">4</span>
                        </div>
                        <div>
                          <p className="font-medium">Satisfaction des professeurs</p>
                          <p className="text-sm text-muted-foreground">
                            92% des professeurs trouvent les recommandations pour l'amélioration des cours utiles et
                            pertinentes.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Télécharger le rapport complet
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

