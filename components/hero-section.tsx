"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, FileText, FileCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Affiche la barre sticky quand le CTA principal N'EST PAS visible
        setShowSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0, // déclenche dès que l’élément sort totalement du viewport
      }
    );

    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-35 from-cyan-100 to-white py-12 sm:py-20 lg:py-32">
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-5 -m-10 mx-auto max-w-3xl text-center">
          <Image
            src="/logo_aet.png"
            alt="AudioEnTexte logo"
            width={150}
            height={150}
            className="centered-logo mx-auto mb-4"
            priority
          />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 sm:mb-6 bg-accent/10 text-accent-foreground border-accent/20 text-xs sm:text-sm"
          >
            🇫🇷 Offre de lancement ・ 500 places disponibles
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
            <span className="text-primary">Transcription audio en texte</span>{" "}
            <br />
            <span className="text-foreground">+ </span>
            <br />
            <span className="text-foreground">Résumé professionnel</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground text-pretty px-2 sm:px-0">
            Fini la prise de notes : transformez vos réunions et interviews en comptes rendus exploitables.
            Jusqu'à 90% de temps gagné (2h → 1 min).
          </p>

          {/* CTA principal — OBSERVÉ */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base font-medium min-h-[48px]"
              asChild
            >
              <Link href="#waitlist" aria-label="Tester gratuitement">
                🎁 Tester gratuitement →
              </Link>
            </Button>
          </div>

          <div className="-mt-1 sm:mt-6 text-base text-xs leading-7 sm:leading-8 text-muted-foreground text-pretty px-2 sm:px-0">
            sans carte bancaire ・ optimisé pour le français
          </div>

          {/* Proof row */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 text-muted-foreground px-4 sm:px-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">✅ +350/500 déjà inscrits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">✅ Forfait Gratuit : 1h/mois</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">🔒 Fichiers non stockés, supprimés après traitement</span>
            </div>
          </div>

          {/* Bloc démonstration simplifié: Audio -> Transcription & Compte rendu */}
          <div className="relative mx-auto mt-16 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Icône audio */}
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mic className="h-8 w-8" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">Enregistrement audio</p>
            </div>

            {/* Flèches divergentes */}
            <div className="relative my-6 h-20">
              <svg
                viewBox="0 0 400 120"
                className="absolute inset-0 h-full w-full text-primary/60"
                aria-hidden="true"
              >
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 z" fill="currentColor" />
                  </marker>
                </defs>
                {/* Flèche gauche */}
                <path
                  d="M200 10 C 200 60, 120 60, 90 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow)"
                />
                {/* Flèche droite */}
                <path
                  d="M200 10 C 200 60, 280 60, 310 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow)"
                />
              </svg>
            </div>

            {/* Résultats */}
            <div className="grid grid-cols-2 gap-6">
              {/* Transcription */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-primary">
                  <FileText className="h-7 w-7" />
                </div>
                <p className="mt-2 text-xs font-medium text-gray-700">Transcription claire</p>
              </div>

              {/* Compte rendu */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-primary">
                  <FileCheck className="h-7 w-7" />
                </div>
                <p className="mt-2 text-xs font-medium text-gray-700">Résumé pro prêt à partager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA — apparaît quand le CTA principal sort de l’écran */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur supports-[backdrop-filter]:bg-background/80 bg-background/95",
          "transition-transform duration-300",
          showSticky ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        // padding safe-area iOS
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden={!showSticky}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Transcription FR + Résumé</span>
              <span>Sans carte bancaire</span>
            </div>
            <div className="flex-1 sm:flex-none" />
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px]"
            >
              <Link href="#waitlist" aria-label="tester gratuitement">
                🎁 Tester gratuitement →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
