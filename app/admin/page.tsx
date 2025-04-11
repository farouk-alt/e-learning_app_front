"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
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
import { ArrowUpRight, BarChart3, BookOpen, FileText, GraduationCap, Lightbulb, Users } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for charts
  const userGrowthData = [
    { name: "Jan", students: 120, professors: 20 },
    { name: "Fév", students: 150, professors: 22 },
    { name: "Mar", students: 180, professors: 25 },
    { name: "Avr", students: 220, professors: 28 },
    { name: "Mai", students: 280, professors: 30 },
    { name: "Juin", students: 310, professors: 32 },
  ]

  const evaluationScoresData = [
    { name: "Prog. Java", average: 14.2, highest: 19.5, lowest: 8.5 },
    { name: "Bases de données", average: 13.8, highest: 18.0, lowest: 7.0 },
    { name: "Réseaux", average: 15.1, highest: 20.0, lowest: 9.5 },
    { name: "IA", average: 12.5, highest: 17.5, lowest: 6.0 },
    { name: "Mathématiques", average: 13.2, highest: 19.0, lowest: 8.0 },
  ]

  const userTypeData = [
    { name: "Étudiants", value: 850 },
    { name: "Professeurs", value: 120 },
    { name: "Administrateurs", value: 15 },
  ]

  const COLORS = ["#435395", "#06b5b4", "#f59e0b"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
          <p className="text-muted-foreground">
            Bienvenue sur le tableau de bord d'administration de la plateforme d'évaluation.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/users/new">Ajouter un utilisateur</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/courses/new">Ajouter un cours</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">985</div>
            <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total cours</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évaluations actives</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+5 depuis la semaine dernière</p>
          </CardContent>
        </Card>
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
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Croissance des utilisateurs</CardTitle>
                <CardDescription>Évolution du nombre d'utilisateurs au cours des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" name="Étudiants" stroke="#435395" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="professors" name="Professeurs" stroke="#06b5b4" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Répartition des utilisateurs</CardTitle>
                <CardDescription>Distribution par type d'utilisateur</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} utilisateurs`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Scores des évaluations</CardTitle>
                <CardDescription>Moyenne, note la plus haute et la plus basse par cours</CardDescription>
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
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Dernières actions sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    {
                      icon: <Users className="h-4 w-4 text-primary-blue" />,
                      title: "Nouvel utilisateur",
                      description: "Fatima Zahra s'est inscrite en tant qu'étudiante",
                      timestamp: "Il y a 2 heures",
                    },
                    {
                      icon: <FileText className="h-4 w-4 text-secondary-turquoise" />,
                      title: "Nouvelle évaluation",
                      description: "Prof. Dupont a créé une évaluation de Programmation Java",
                      timestamp: "Il y a 5 heures",
                    },
                    {
                      icon: <GraduationCap className="h-4 w-4 text-primary-blue" />,
                      title: "Résultats publiés",
                      description: "Résultats de l'évaluation de Bases de données disponibles",
                      timestamp: "Il y a 1 jour",
                    },
                    {
                      icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
                      title: "Recommandations IA",
                      description: "Nouvelles recommandations générées pour 15 étudiants",
                      timestamp: "Il y a 1 jour",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-4 mt-0.5">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Étudiants actifs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">720/850</div>
                <div className="mt-4 h-1 w-full bg-secondary/20">
                  <div className="h-1 bg-primary-blue" style={{ width: "85%" }}></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">85% des étudiants sont actifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Professeurs actifs</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">110/120</div>
                <div className="mt-4 h-1 w-full bg-secondary/20">
                  <div className="h-1 bg-secondary-turquoise" style={{ width: "92%" }}></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">92% des professeurs sont actifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nouveaux utilisateurs</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+48</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de rétention</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">+2% depuis le dernier trimestre</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Activité des utilisateurs</CardTitle>
              <CardDescription>Connexions quotidiennes au cours des 30 derniers jours</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={Array.from({ length: 30 }, (_, i) => ({
                    day: i + 1,
                    logins: Math.floor(Math.random() * 300) + 400,
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="logins" name="Connexions" stroke="#435395" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cours les plus populaires</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Programmation Java", students: 120 },
                    { name: "Intelligence Artificielle", students: 105 },
                    { name: "Bases de données", students: 95 },
                  ].map((course, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">{course.students} étudiants</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cours par département</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Informatique", courses: 18 },
                    { name: "Mathématiques", courses: 12 },
                    { name: "Électronique", courses: 8 },
                    { name: "Mécanique", courses: 4 },
                  ].map((dept, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept.name}</span>
                      <span className="text-sm text-muted-foreground">{dept.courses} cours</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Évaluations par cours</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5</div>
                <p className="text-xs text-muted-foreground">Moyenne d'évaluations par cours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Des étudiants terminent leurs cours</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Distribution des étudiants par cours</CardTitle>
              <CardDescription>Nombre d'étudiants inscrits par cours</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Programmation Java", students: 120 },
                    { name: "Intelligence Artificielle", students: 105 },
                    { name: "Bases de données", students: 95 },
                    { name: "Réseaux", students: 85 },
                    { name: "Mathématiques", students: 75 },
                    { name: "Systèmes d'exploitation", students: 70 },
                    { name: "Génie logiciel", students: 65 },
                    { name: "Sécurité informatique", students: 60 },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 120,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Étudiants" fill="#435395" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
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
                <CardTitle className="text-sm font-medium">Meilleure note</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19.5/20</div>
                <p className="text-xs text-muted-foreground">Programmation Java</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Étudiants en difficulté</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Nécessitant une assistance</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Performance par cours</CardTitle>
              <CardDescription>Moyenne des notes par cours</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Programmation Java", average: 14.2 },
                    { name: "Intelligence Artificielle", average: 12.5 },
                    { name: "Bases de données", average: 13.8 },
                    { name: "Réseaux", average: 15.1 },
                    { name: "Mathématiques", average: 13.2 },
                    { name: "Systèmes d'exploitation", average: 14.5 },
                    { name: "Génie logiciel", average: 13.9 },
                    { name: "Sécurité informatique", average: 14.8 },
                  ]}
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
                  <Bar dataKey="average" name="Moyenne" fill="#435395" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

