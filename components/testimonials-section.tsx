import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Journaliste, Le Figaro",
    avatar: "/professional-woman-journalist.png",
    content:
      "Enfin une solution qui comprend parfaitement le français ! Les transcriptions sont d'une précision remarquable, même avec les accents régionaux.",
    rating: 5,
  },
  {
    name: "Thomas Martin",
    role: "Consultant, Deloitte",
    avatar: "/professional-man-consultant.png",
    content:
      "Les résumés email générés automatiquement me font gagner des heures chaque semaine. Un outil indispensable pour mes réunions clients.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Avocate, Cabinet Laurent & Associés",
    avatar: "/professional-woman-lawyer.png",
    content:
      "La qualité de transcription est exceptionnelle pour le vocabulaire juridique français. Je recommande vivement cette solution.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ils nous font déjà confiance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Découvrez pourquoi les professionnels français choisissent AudioEnTexte.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <blockquote className="text-card-foreground leading-relaxed mb-6">"{testimonial.content}"</blockquote>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
