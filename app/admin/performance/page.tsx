"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"
import { BarChart3, Download, FileText, Lightbulb, Users } from "lucide-react"

export default function PerformancePage() {
  const [courseFilter, setCourseFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("semester")

  // Mock data for charts
  const evaluationScoresData = [
    { name: "Prog. Java", average: 14.2, highest: 19.5, lowest: 8.5 },
    { name: "Bases de données", average: 13.8, highest: 18.0, lowest: 7.0 },
    { name: "Réseaux", average: 15.1, highest: 20.0, lowest: 9.5 },
    { name: "IA", average: 12.5, highest: 17.5, lowest: 6.0 },
    { name: "Mathématiques", average: 13.2, highest: 19.0, lowest: 8.0 },
  ]

  const studentPerformanceData = [
    { name: "Ahmed B.", java: 16.5, databases: 15.0, networks: 17.0, ai: 14.5, math: 15.5 },
    { name: "Fatima Z.", java: 15.0, databases: 16.5, networks: 14.0, ai: 13.0, math: 14.0 },
    { name: "Karim I.", java: 12.5, databases: 13.0, networks: 11.0, ai: 10.0, math: 12.0 },
    { name: "Leila A.", java: 14.0, databases: 15.5, networks: 16.0, ai: 13.5, math: 14.5 },
    { name: "Omar B.", java: 10.5, databases: 11.0, networks: 9.5, ai: 8.0, math: 10.0 },
  ]

  const passRateData = [
    { name: "Prog. Java", pass: 85, fail: 15 },
    { name: "Bases de données", pass: 80, fail: 20 },
    { name: "Réseaux", pass: 90, fail: 10 },
    { name: "IA", pass: 75, fail: 25 },
    { name: "Mathématiques", pass: 78, fail: 22 },
  ]

  const COLORS = ["#435395", "#06b5b4", "#f59e0b", "#ef4444", "#8b5cf6"]

  // Mock data for top students
  const topStudents = [
    { id: 1, name: "Ahmed Benali", average: 16.5, evaluations: 10, courses: 5 },
    { id: 2, name: "Salma Tazi", average: 17.5, evaluations: 10, courses: 5 },
    { id: 3, name: "Fatima Zahra", average: 15.0, evaluations: 10, courses: 5 },
    { id: 4, name: "Leila Alaoui", average: 14.0, evaluations: 8, courses: 4 },
    { id: 5, name: "Youssef Amrani", average: 13.0, evaluations: 6, courses: 3 },
  ]

  // Mock data for students needing assistance
  const studentsNeedingAssistance = [
    { id: 6, name: "Omar Benjelloun", average: 10.5, evaluations: 5, courses: 3, issues: "Algorithmes, POO" },
    { id: 7, name: "Karim Idrissi", average: 12.5, evaluations: 7, courses: 4, issues: "Bases de données" },
    { id: 8, name: "Nadia Mansouri", average: 11.0, evaluations: 6, courses: 3, issues: "Mathématiques" },
    { id: 9, name: "Hassan Alami", average: 9.5, evaluations: 5, courses: 3, issues: "Programmation, Réseaux" },
    { id: 10, name: "Samira Tazi", average: 10.0, evaluations: 6, courses: 3, issues: "IA, Algorithmes" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance des étudiants</h1>
          <p className="text-muted-foreground">Analysez les performances des étudiants et identifiez les tendances.</p>
        </div>
        <div className="flex gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par cours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les cours</SelectItem>
              <SelectItem value="java">Programmation Java</SelectItem>
              <SelectItem value="db">Bases de données</SelectItem>
              <SelectItem value="networks">Réseaux</SelectItem>
              <SelectItem value="ai">Intelligence artificielle</SelectItem>
              <SelectItem value="math">Mathématiques</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Dernier mois</SelectItem>
              <SelectItem value="semester">Semestre actuel</SelectItem>
              <SelectItem value="year">Année académique</SelectItem>
              <SelectItem value="all">Toutes les données</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2/20</div>
            <p className="text-xs text-muted-foreground">+0.8 depuis le dernier semestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+5% depuis le dernier semestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Étudiants évalués</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
            <p className="text-xs text-muted-foreground">Sur 985 étudiants inscrits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évaluations complétées</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Sur 60 évaluations créées</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="courses">Par cours</TabsTrigger>
          <TabsTrigger value="students">Par étudiant</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance par cours</CardTitle>
                <CardDescription>Moyenne des notes par cours</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={evaluationScoresData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lowest" name="Note min" fill="#f97316" />
                    <Bar dataKey="average" name="Moyenne" fill="#435395" />
                    <Bar dataKey="highest" name="Note max" fill="#06b5b4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de réussite par cours</CardTitle>
                <CardDescription>Pourcentage d'étudiants ayant réussi chaque cours</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={passRateData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    stackOffset="expand"
                    layout="vertical"
                    barSize={30}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="pass" name="Réussite" stackId="a" fill="#06b5b4" />
                    <Bar dataKey="fail" name="Échec" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top étudiants</CardTitle>
              <CardDescription>Les étudiants les plus performants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Moyenne générale</TableHead>
                      <TableHead>Évaluations complétées</TableHead>
                      <TableHead>Cours suivis</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-green-600 font-medium">{student.average}/20</TableCell>
                        <TableCell>{student.evaluations}</TableCell>
                        <TableCell>{student.courses}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/students/${student.id}`}>Voir le profil</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Étudiants nécessitant une assistance</CardTitle>
              <CardDescription>Étudiants avec des difficultés identifiées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Moyenne générale</TableHead>
                      <TableHead>Évaluations complétées</TableHead>
                      <TableHead>Difficultés identifiées</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsNeedingAssistance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-red-600 font-medium">{student.average}/20</TableCell>
                        <TableCell>{student.evaluations}</TableCell>
                        <TableCell>{student.issues}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/students/${student.id}`}>Voir le profil</Link>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Lightbulb className="h-3 w-3" /> Recommandations
                            </Button>
                          </div>
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
              <CardTitle>Performance détaillée par cours</CardTitle>
              <CardDescription>Analyse des résultats pour chaque cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cours</TableHead>
                      <TableHead>Professeur</TableHead>
                      <TableHead>Étudiants</TableHead>
                      <TableHead>Moyenne</TableHead>
                      <TableHead>Taux de réussite</TableHead>
                      <TableHead>Évaluations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Programmation Java",
                        professor: "Prof. Dupont",
                        students: 120,
                        average: 14.2,
                        passRate: "85%",
                        evaluations: 5,
                      },
                      {
                        name: "Bases de données",
                        professor: "Prof. Martin",
                        students: 95,
                        average: 13.8,
                        passRate: "80%",
                        evaluations: 4,
                      },
                      {
                        name: "Réseaux informatiques",
                        professor: "Prof. Dubois",
                        students: 85,
                        average: 15.1,
                        passRate: "90%",
                        evaluations: 3,
                      },
                      {
                        name: "Intelligence Artificielle",
                        professor: "Prof. Dupont",
                        students: 105,
                        average: 12.5,
                        passRate: "75%",
                        evaluations: 4,
                      },
                      {
                        name: "Mathématiques",
                        professor: "Prof. Leroy",
                        students: 75,
                        average: 13.2,
                        passRate: "78%",
                        evaluations: 3,
                      },
                    ].map((course, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>{course.average}/20</TableCell>
                        <TableCell>{course.passRate}</TableCell>
                        <TableCell>{course.evaluations}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/courses/${i + 1}`}>Voir les détails</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
                <CardDescription>Distribution des notes par intervalle</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { range: "0-5", count: 15 },
                      { range: "5-10", count: 85 },
                      { range: "10-12", count: 150 },
                      { range: "12-14", count: 220 },
                      { range: "14-16", count: 250 },
                      { range: "16-18", count: 100 },
                      { range: "18-20", count: 30 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Nombre d'étudiants" fill="#435395" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des moyennes</CardTitle>
                <CardDescription>Évolution des moyennes par cours au fil du temps</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", java: 13.5, db: 12.8, networks: 14.2, ai: 11.5, math: 12.5 },
                      { month: "Fév", java: 13.8, db: 13.0, networks: 14.5, ai: 11.8, math: 12.8 },
                      { month: "Mar", java: 14.0, db: 13.2, networks: 14.8, ai: 12.0, math: 13.0 },
                      { month: "Avr", java: 14.2, db: 13.5, networks: 15.0, ai: 12.2, math: 13.2 },
                      { month: "Mai", java: 14.5, db: 13.8, networks: 15.1, ai: 12.5, math: 13.2 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[10, 16]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="java" name="Prog. Java" stroke="#435395" />
                    <Line type="monotone" dataKey="db" name="Bases de données" stroke="#06b5b4" />
                    <Line type="monotone" dataKey="networks" name="Réseaux" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="ai" name="IA" stroke="#ef4444" />
                    <Line type="monotone" dataKey="math" name="Mathématiques" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des étudiants par matière</CardTitle>
              <CardDescription>Comparaison des notes par étudiant et par matière</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={studentPerformanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="java" name="Prog. Java" fill="#435395" />
                  <Bar dataKey="databases" name="Bases de données" fill="#06b5b4" />
                  <Bar dataKey="networks" name="Réseaux" fill="#f59e0b" />
                  <Bar dataKey="ai" name="IA" fill="#ef4444" />
                  <Bar dataKey="math" name="Mathématiques" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par niveau</CardTitle>
                <CardDescription>Répartition des étudiants par niveau de performance</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Excellent (16-20)", value: 130 },
                        { name: "Bon (14-16)", value: 250 },
                        { name: "Moyen (12-14)", value: 220 },
                        { name: "Passable (10-12)", value: 150 },
                        { name: "Insuffisant (<10)", value: 100 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2, 3, 4].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} étudiants`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assiduité et performance</CardTitle>
                <CardDescription>Corrélation entre l'assiduité et les résultats</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { attendance: "< 50%", average: 8.5 },
                      { attendance: "50-60%", average: 10.2 },
                      { attendance: "60-70%", average: 11.8 },
                      { attendance: "70-80%", average: 13.5 },
                      { attendance: "80-90%", average: 15.2 },
                      { attendance: "> 90%", average: 16.8 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="attendance" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" name="Moyenne" stroke="#435395" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommandations générées par l'IA</CardTitle>
              <CardDescription>Suggestions basées sur l'analyse des performances des étudiants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recommandations pour les cours</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      course: "Intelligence Artificielle",
                      issue: "Taux de réussite faible (75%)",
                      recommendation:
                        "Ajouter plus d'exercices pratiques et des sessions de révision supplémentaires. Les concepts théoriques semblent difficiles à assimiler pour les étudiants.",
                    },
                    {
                      course: "Bases de données",
                      issue: "Écart important entre les meilleures et les moins bonnes notes",
                      recommendation:
                        "Mettre en place des groupes de travail mixtes avec des étudiants de différents niveaux pour favoriser l'entraide et le partage de connaissances.",
                    },
                    {
                      course: "Mathématiques",
                      issue: "Progression lente des moyennes",
                      recommendation:
                        "Revoir la méthode d'enseignement et proposer des approches plus visuelles et interactives pour les concepts abstraits.",
                    },
                    {
                      course: "Programmation Java",
                      issue: "Certains étudiants excellents, d'autres en difficulté",
                      recommendation:
                        "Proposer des parcours différenciés avec des défis supplémentaires pour les plus avancés et des ressources de rattrapage pour ceux en difficulté.",
                    },
                  ].map((item, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{item.course}</CardTitle>
                        <CardDescription>{item.issue}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{item.recommendation}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recommandations pour les étudiants en difficulté</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      student: "Omar Benjelloun",
                      issues: "Algorithmes, POO",
                      recommendation:
                        "Proposer des tutoriels vidéo sur les algorithmes de base et des exercices pratiques supplémentaires en POO. Envisager un tutorat individuel.",
                    },
                    {
                      student: "Karim Idrissi",
                      issues: "Bases de données",
                      recommendation:
                        "Recommander des ressources spécifiques sur les requêtes SQL et la modélisation de données. Organiser des sessions pratiques supplémentaires.",
                    },
                    {
                      student: "Nadia Mansouri",
                      issues: "Mathématiques",
                      recommendation:
                        "Proposer des approches alternatives pour l'apprentissage des mathématiques, comme des applications interactives et des exercices progressifs.",
                    },
                    {
                      student: "Hassan Alami",
                      issues: "Programmation, Réseaux",
                      recommendation:
                        "Mettre en place un plan de rattrapage personnalisé avec des objectifs hebdomadaires et un suivi régulier des progrès.",
                    },
                  ].map((item, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{item.student}</CardTitle>
                        <CardDescription>Difficultés: {item.issues}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{item.recommendation}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Lightbulb className="mr-2 h-4 w-4" /> Appliquer les recommandations
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Améliorations suggérées pour les évaluations</h3>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Ajuster la difficulté des QCM</p>
                          <p className="text-sm text-muted-foreground">
                            Les QCM de Programmation Java ont un taux de réussite trop élevé (95%), ce qui suggère
                            qu'ils pourraient être trop faciles. Envisagez d'augmenter légèrement la difficulté.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Revoir les questions ouvertes en IA</p>
                          <p className="text-sm text-muted-foreground">
                            Les questions ouvertes en Intelligence Artificielle ont un taux de réussite très bas (45%).
                            Envisagez de les reformuler ou de fournir plus de contexte.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Augmenter le temps pour les évaluations de Mathématiques</p>
                          <p className="text-sm text-muted-foreground">
                            De nombreux étudiants n'ont pas pu terminer l'évaluation de Mathématiques dans le temps
                            imparti. Envisagez d'augmenter la durée de 60 à 90 minutes.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <span className="text-primary-blue font-medium">4</span>
                        </div>
                        <div>
                          <p className="font-medium">Ajouter plus de questions pratiques en Bases de données</p>
                          <p className="text-sm text-muted-foreground">
                            Les étudiants réussissent mieux les questions pratiques que théoriques en Bases de données.
                            Envisagez d'augmenter la proportion de questions pratiques.
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
                <Download className="mr-2 h-4 w-4" /> Télécharger toutes les recommandations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

