import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
  {
    name: "Marc Biessy",
    role: "Fondateur, opsclean.com",
    avatar: "/marc-biessy.png",
    content:
      "Enfin une solution qui comprend parfaitement le français ! Les transcriptions sont d'une précision remarquable, même avec les accents.",
    rating: 5,
  },
  {
    name: "Enzo Benzoni",
    role: "Consultant, Wild",
    avatar: "/enzo-benzoni.png",
    content:
      "Je gagne des heures chaque semaine grâce aux comptes rendus automatiques. Un outil indispensable pour mes réunions clients.",
    rating: 5,
  },
  {
    name: "Josselin Trouilloud",
    role: "Vidéaste, JossTVisuals",
    avatar: "/josselin-trouilloud.png",
    content: "Marche super bien. Transcription fidèle à l'enregistrement.",
    rating: 5,
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-cyan-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ils nous font déjà confiance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Découvrez pourquoi les professionnels français choisissent Audio
            <span className="text-primary">En</span>
            Texte.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <blockquote className="text-card-foreground leading-relaxed mb-6">
                  “{t.content}”
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        sizes="40px"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {initials(t.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base font-medium min-h-[48px]"
            asChild
          >
            <Link href="#waitlist">Tester gratuitement →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
