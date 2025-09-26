import { Button } from "@/components/ui/button";
import { FileText, Mic, Video } from "lucide-react";
import Link from "next/link";

type Props = {
  showCTA?: boolean;
};

export function ProsUseCasesSectionUltra({ showCTA = true }: Props) {
  return (
    <section id="use-cases" className="py-8 sm:py-12 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
            Cas d’usage pros
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Déployez AudioEnTexte là où l’impact est immédiat.
          </p>
        </div>

        <div className="mt-6 space-y-4 sm:space-y-6">
          {/* Réunions */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="font-medium leading-5">Réunions client</div>
              <div className="text-sm text-muted-foreground">
                Compte rendu structuré + actions à suivre.
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Interviews */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mic className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="font-medium leading-5">Interviews</div>
              <div className="text-sm text-muted-foreground">
                Verbatims précis prêts pour l’analyse.
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Podcasts / Webinars */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Video className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="font-medium leading-5">Podcasts / Webinars</div>
              <div className="text-sm text-muted-foreground">
                Chapitres + synthèse en minutes.
              </div>
            </div>
          </div>
        </div>

        {/* Micro-preuve */}
        <div className="mt-5 text-center text-xs sm:text-sm text-muted-foreground">
          Déjà adopté par <span className="font-medium text-foreground">consultants</span>,{" "}
          <span className="font-medium text-foreground">agences</span> et{" "}
          <span className="font-medium text-foreground">formateurs</span>.
        </div>

        {/* CTA optionnel */}
        {showCTA && (
          <div className="mt-4 sm:mt-6 text-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="#waitlist">🎁 Tester gratuitement 5h →</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
