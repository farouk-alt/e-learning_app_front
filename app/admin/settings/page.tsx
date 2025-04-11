"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, Lock, Save, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de la plateforme d'évaluation.</p>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Les paramètres ont été enregistrés avec succès.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les paramètres généraux de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nom de la plateforme</Label>
                <Input id="platform-name" defaultValue="Evalyo - Plateforme d'évaluation IGA" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">Description de la plateforme</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Plateforme d'évaluation en ligne pour l'Institut supérieur du Génie Appliqué"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="ar">Arabe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa_casablanca">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Sélectionner un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa_casablanca">Afrique/Casablanca</SelectItem>
                      <SelectItem value="europe_paris">Europe/Paris</SelectItem>
                      <SelectItem value="europe_london">Europe/Londres</SelectItem>
                      <SelectItem value="america_new_york">Amérique/New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la plateforme</Label>
                <div className="flex items-center gap-4">
                  <img src="/images/evalyo-logo.png" alt="Logo actuel" className="h-12" />
                  <Button variant="outline">Changer le logo</Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer le mode maintenance pour effectuer des mises à jour
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Configurez les paramètres de sécurité de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Politique de mot de passe</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-complexity">Complexité des mots de passe</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger des mots de passe complexes (majuscules, minuscules, chiffres, caractères spéciaux)
                    </p>
                  </div>
                  <Switch id="password-complexity" defaultChecked />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-min-length">Longueur minimale</Label>
                    <Input id="password-min-length" type="number" defaultValue="8" min="6" max="20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Expiration (jours)</Label>
                    <Input id="password-expiry" type="number" defaultValue="90" min="0" />
                    <p className="text-xs text-muted-foreground">0 = jamais</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentification</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer l'authentification à deux facteurs pour les comptes administrateurs
                    </p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lockout">Verrouillage de compte</Label>
                    <p className="text-sm text-muted-foreground">
                      Verrouiller les comptes après plusieurs tentatives de connexion échouées
                    </p>
                  </div>
                  <Switch id="lockout" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockout-attempts">Nombre de tentatives avant verrouillage</Label>
                  <Input id="lockout-attempts" type="number" defaultValue="5" min="1" max="10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" min="5" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Journalisation et audit</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activity-logging">Journalisation des activités</Label>
                    <p className="text-sm text-muted-foreground">
                      Enregistrer toutes les activités des utilisateurs pour des raisons de sécurité
                    </p>
                  </div>
                  <Switch id="activity-logging" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="log-retention">Conservation des journaux (jours)</Label>
                  <Input id="log-retention" type="number" defaultValue="90" min="30" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Lock className="mr-2 h-4 w-4" /> Enregistrer les paramètres de sécurité
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des permissions</CardTitle>
              <CardDescription>Configurez les permissions pour chaque rôle d'utilisateur.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Administrateurs</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Permission</div>
                    <div className="text-center">Lecture</div>
                    <div className="text-center">Écriture</div>
                    <div className="text-center">Suppression</div>
                  </div>

                  {[
                    { name: "Gestion des utilisateurs" },
                    { name: "Gestion des cours" },
                    { name: "Gestion des évaluations" },
                    { name: "Gestion des résultats" },
                    { name: "Paramètres système" },
                    { name: "Journaux d'audit" },
                  ].map((permission, i) => (
                    <div key={i} className="grid grid-cols-5 border-b p-3 text-sm">
                      <div className="col-span-2 font-medium">{permission.name}</div>
                      <div className="flex justify-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-center">
                        <Switch defaultChecked />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professeurs</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Permission</div>
                    <div className="text-center">Lecture</div>
                    <div className="text-center">Écriture</div>
                    <div className="text-center">Suppression</div>
                  </div>

                  {[
                    { name: "Gestion des utilisateurs" },
                    { name: "Gestion des cours" },
                    { name: "Gestion des évaluations" },
                    { name: "Gestion des résultats" },
                    { name: "Paramètres système" },
                    { name: "Journaux d'audit" },
                  ].map((permission, i) => (
                    <div key={i} className="grid grid-cols-5 border-b p-3 text-sm">
                      <div className="col-span-2 font-medium">{permission.name}</div>
                      <div className="flex justify-center">
                        <Switch
                          defaultChecked={
                            permission.name === "Gestion des utilisateurs"
                              ? false
                              : permission.name === "Paramètres système"
                                ? false
                                : permission.name === "Journaux d'audit"
                                  ? false
                                  : true
                          }
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          defaultChecked={
                            permission.name === "Gestion des utilisateurs"
                              ? false
                              : permission.name === "Paramètres système"
                                ? false
                                : permission.name === "Journaux d'audit"
                                  ? false
                                  : true
                          }
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          defaultChecked={
                            permission.name === "Gestion des cours"
                              ? true
                              : permission.name === "Gestion des évaluations"
                                ? true
                                : false
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Étudiants</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">Permission</div>
                    <div className="text-center">Lecture</div>
                    <div className="text-center">Écriture</div>
                    <div className="text-center">Suppression</div>
                  </div>

                  {[
                    { name: "Gestion des utilisateurs" },
                    { name: "Gestion des cours" },
                    { name: "Gestion des évaluations" },
                    { name: "Gestion des résultats" },
                    { name: "Paramètres système" },
                    { name: "Journaux d'audit" },
                  ].map((permission, i) => (
                    <div key={i} className="grid grid-cols-5 border-b p-3 text-sm">
                      <div className="col-span-2 font-medium">{permission.name}</div>
                      <div className="flex justify-center">
                        <Switch defaultChecked={permission.name === "Gestion des résultats" ? true : false} />
                      </div>
                      <div className="flex justify-center">
                        <Switch defaultChecked={false} />
                      </div>
                      <div className="flex justify-center">
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Shield className="mr-2 h-4 w-4" /> Enregistrer les permissions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des évaluations</CardTitle>
              <CardDescription>Configurez les paramètres par défaut pour les évaluations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres généraux</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-time">Temps par défaut (minutes)</Label>
                    <Input id="default-time" type="number" defaultValue="60" min="1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-points">Points par défaut par question</Label>
                    <Input id="default-points" type="number" defaultValue="2" min="1" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-correct">Correction automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer la correction automatique par défaut pour les QCM et réponses courtes
                    </p>
                  </div>
                  <Switch id="auto-correct" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shuffle-questions">Mélanger les questions</Label>
                    <p className="text-sm text-muted-foreground">Mélanger l'ordre des questions par défaut</p>
                  </div>
                  <Switch id="shuffle-questions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prevent-back">Empêcher le retour en arrière</Label>
                    <p className="text-sm text-muted-foreground">
                      Empêcher les étudiants de revenir aux questions précédentes
                    </p>
                  </div>
                  <Switch id="prevent-back" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-results">Afficher les résultats immédiatement</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher les résultats aux étudiants immédiatement après la soumission
                    </p>
                  </div>
                  <Switch id="show-results" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sécurité des évaluations</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prevent-copy">Empêcher le copier-coller</Label>
                    <p className="text-sm text-muted-foreground">
                      Empêcher les étudiants de copier-coller pendant les évaluations
                    </p>
                  </div>
                  <Switch id="prevent-copy" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-lock">Verrouillage du navigateur</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le mode plein écran et empêcher la navigation pendant les évaluations
                    </p>
                  </div>
                  <Switch id="browser-lock" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">Restriction d'IP</Label>
                    <p className="text-sm text-muted-foreground">
                      Limiter l'accès aux évaluations à certaines plages d'adresses IP
                    </p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code-length">Longueur des codes d'accès</Label>
                  <Input id="code-length" type="number" defaultValue="6" min="4" max="10" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Exportation des résultats</h3>

                <div className="space-y-2">
                  <Label htmlFor="export-format">Format d'exportation par défaut</Label>
                  <Select defaultValue="excel">
                    <SelectTrigger id="export-format">
                      <SelectValue placeholder="Sélectionner un format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-analytics">Inclure les analyses</Label>
                    <p className="text-sm text-muted-foreground">
                      Inclure les analyses et graphiques dans les exportations
                    </p>
                  </div>
                  <Switch id="include-analytics" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurez les notifications envoyées aux utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-new-eval">Nouvelles évaluations</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer un email aux étudiants lorsqu'une nouvelle évaluation est disponible
                    </p>
                  </div>
                  <Switch id="email-new-eval" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-results">Résultats d'évaluation</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer un email lorsque les résultats d'une évaluation sont publiés
                    </p>
                  </div>
                  <Switch id="email-results" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reminders">Rappels</Label>
                    <p className="text-sm text-muted-foreground">Envoyer des rappels pour les évaluations à venir</p>
                  </div>
                  <Switch id="email-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-recommendations">Recommandations IA</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer un email lorsque de nouvelles recommandations IA sont disponibles
                    </p>
                  </div>
                  <Switch id="email-recommendations" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications dans l'application</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-new-eval">Nouvelles évaluations</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher une notification lorsqu'une nouvelle évaluation est disponible
                    </p>
                  </div>
                  <Switch id="app-new-eval" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-results">Résultats d'évaluation</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher une notification lorsque les résultats d'une évaluation sont publiés
                    </p>
                  </div>
                  <Switch id="app-results" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-reminders">Rappels</Label>
                    <p className="text-sm text-muted-foreground">Afficher des rappels pour les évaluations à venir</p>
                  </div>
                  <Switch id="app-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-recommendations">Recommandations IA</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher une notification lorsque de nouvelles recommandations IA sont disponibles
                    </p>
                  </div>
                  <Switch id="app-recommendations" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuration SMTP</h3>

                <div className="space-y-2">
                  <Label htmlFor="smtp-server">Serveur SMTP</Label>
                  <Input id="smtp-server" defaultValue="smtp.iga.ac.ma" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port SMTP</Label>
                    <Input id="smtp-port" type="number" defaultValue="587" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Sécurité</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger id="smtp-security">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Nom d'utilisateur</Label>
                  <Input id="smtp-username" defaultValue="notifications@iga.ac.ma" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe</Label>
                  <Input id="smtp-password" type="password" value="••••••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-email">Email d'expédition</Label>
                  <Input id="from-email" defaultValue="no-reply@iga.ac.ma" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-name">Nom d'expédition</Label>
                  <Input id="from-name" defaultValue="Evalyo - Plateforme d'évaluation IGA" />
                </div>

                <Button variant="outline">Tester la configuration SMTP</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

