import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages, Zap, Crown, Shield, Users, Mail } from "lucide-react"

const features = [
  {
    icon: Languages,
    title: "Expert en Français",
    description: "Algorithme spécialement entraîné sur la langue française pour une précision inégalée.",
    badge: "IA Française",
    color: "text-primary",
  },
  {
    icon: Mail,
    title: "Résumés Email Intelligents",
    description: "Génération automatique de résumés professionnels prêts à être partagés par email.",
    badge: "Automatique",
    color: "text-secondary",
  },
  {
    icon: Crown,
    title: "Modèle Freemium",
    description: "Commencez gratuitement avec 30 minutes/mois. Passez au premium pour plus de fonctionnalités.",
    badge: "Gratuit",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Transcription Rapide",
    description: "Traitement en temps réel. Vos fichiers audio sont transcrits en quelques secondes.",
    badge: "Instantané",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description: "Vos données sont chiffrées et supprimées automatiquement après traitement.",
    badge: "RGPD",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Partagez facilement vos transcriptions et résumés avec votre équipe.",
    badge: "Équipe",
    color: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
            Pourquoi choisir AudioEnTexte ?
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground text-pretty px-2 sm:px-0">
            La solution la plus avancée pour transformer vos enregistrements français en contenu professionnel.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-border/50 hover:border-primary/20 transition-colors p-1 sm:p-0"
            >
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <feature.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${feature.color} flex-shrink-0`} />
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs px-2 py-1">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl text-card-foreground leading-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <CardDescription className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
