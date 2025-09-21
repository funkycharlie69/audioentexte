import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// (Optional) imports not currently used: Mic, FileText, Mail from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-12 sm:py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/abstract-audio-waves-pattern-light-blue.jpg')] opacity-5 bg-cover bg-center" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 sm:mb-6 bg-accent/10 text-accent-foreground border-accent/20 text-xs sm:text-sm"
          >
            🇫🇷 Créé par des français, pour des français.
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
            <span className="text-primary">Transcription audio en texte</span>{" "}
            <span className="text-foreground">+ Résumé automatique instantané</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground text-pretty px-2 sm:px-0">
            Fini la prise de notes et les transcriptions interminables.
            Obtenez une version claire + un résumé prêt à partager en quelques secondes.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base font-medium min-h-[48px]"
            >
              Rejoindre la liste d&apos;attente
            </Button>
            <div className="-mt-3 flex items-center">
              <span className="text-xs font-medium text-primary">↳ 5h de transcription offertes</span>
            </div>
          </div>

          {/* Proof row */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 text-muted-foreground px-4 sm:px-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">✅ 250+ déjà inscrits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">✅ Forfait Gratuit : 1h/mois</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">✅ Offre lancement : 5h offertes</span>
            </div>
          </div>

          {/* Bloc démonstration: Audio -> Transcription & Résumé */}
          <div className="relative mx-auto mt-8 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            {/* En-tête: icône / aperçu du fichier audio */}
            <div className="flex items-center gap-3">
              <img
                src="/mic.png"
                alt="Fichier audio"
                className="h-12 w-12 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium text-gray-900">Réunion produit – 58 min</p>
                <p className="text-xs text-gray-500">MP3 • Français • Qualité micro standard</p>
              </div>
            </div>

            {/* Flèches divergentes (mobile-first) */}
            <div className="relative my-5 h-20">
              {/* SVG des flèches (courbées) */}
              <svg
                viewBox="0 0 400 120"
                className="absolute inset-0 h-full w-full text-teal-600"
                aria-hidden="true"
              >
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 z" fill="currentColor"></path>
                  </marker>
                </defs>
                {/* Flèche gauche */}
                <path
                  d="M200 10 C 200 60, 120 60, 90 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow)"
                ></path>
                {/* Flèche droite */}
                <path
                  d="M200 10 C 200 60, 280 60, 310 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow)"
                ></path>
              </svg>
            </div>

            {/* Deux résultats: Transcription (gauche) & Résumé (droite) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Carte Transcription */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-500">Transcription</p>
                <div className="mt-1 space-y-1 text-[11px] text-left leading-4 text-gray-800">
                  <p>Bonjour à tous, on démarre sur la roadmap Q4… On priorise le parcours d'onboarding mobile…
                  Pour les délais, il nous faut les maquettes d’ici mardi…
                  OK pour un pilote avec 50 comptes…
                  </p>
                </div>
              </div>

              {/* Carte Résumé */}
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-500">
                  Compte Rendu
                </p>
                <ul className="mt-1 list-disc space-y-1 text-left pl-4 text-[11px] leading-5 text-gray-900">
                  <li>🎯 Priorité : onboarding mobile (Q4)</li>
                  <li>📅 Maquettes attendues mardi</li>
                  <li>🧪 Pilote : 50 comptes</li>
                  <li>✅ Prochaine étape : chiffrage dev &amp; planning</li>
                </ul>
                <div className="mt-2 text-[10px] text-gray-500">Lisible, actionnable, partage immédiat</div>
              </div>
            </div>

            {/* Légende/assurance */}
            <p className="mt-4 text-center text-[11px] text-gray-500">
              Transcription précise en français + résumé professionnel prêt à envoyer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
