"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Gift } from "lucide-react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg(null);
  setLoading(true);

  try {
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k) || sessionStorage.getItem(k) || "";

    const payload = {
      email: email.trim().toLowerCase(),
      subscribed: true,
      source: "lp",
      userGroup: "waitlist",
      utmSource: get("utm_source"),
      campaign: get("utm_campaign"),
      content:  get("utm_content"),
      medium:   get("utm_medium"),
      term:     get("utm_term"),
      landingPage: sessionStorage.getItem("landingPage") || window.location.pathname || "/reunions",
    };

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || "submit_failed");
    }

    setIsSubmitted(true);
    setEmail("");
  } catch (err) {
    console.error(err);
    setErrorMsg("Oups, une erreur est survenue. Réessayez dans un instant.");
  } finally {
    setLoading(false);
  }
};


  return (
    <section id="waitlist" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-primary/5 mx-2 sm:mx-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12" />

            <CardHeader className="text-center pb-6 sm:pb-8 relative px-4 sm:px-6 pt-6 sm:pt-8">
              <Badge
                variant="secondary"
                className="mx-auto mb-3 sm:mb-4 bg-accent/10 text-accent-foreground border-accent/20 text-xs sm:text-sm"
              >
                <Gift className="h-3 w-3 mr-1" />
                OFFRE DE LANCEMENT
              </Badge>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground text-balance leading-tight">
                Découvrez Audio
                <span className="text-primary">En</span>
                Texte en avant-première.
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground mt-3 sm:mt-4 text-pretty px-2 sm:px-0">
                Bénéficiez d&apos;un accès anticipé avec
                <span className="font-semibold text-accent"> 5h de transcription offertes </span>
                en rejoignant notre liste d&apos;attente.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative px-4 sm:px-6 pb-6 sm:pb-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="votre.email@exemple.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-border focus:border-primary text-base min-h-[48px] px-4"
                    aria-label="Adresse email"
                    autoComplete="email"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[48px] text-base font-medium"
                  >
                    {loading ? "Envoi…" : "🎁 Recevoir 5h offertes"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  {errorMsg && (
                    <p className="text-xs text-red-500 text-center -mt-1">{errorMsg}</p>
                  )}
                </form>
              ) : (
                <div className="text-center max-w-md mx-auto px-4 sm:px-0">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Bienvenue !</h3>
                  <p className="text-muted-foreground">
                    Vous recevrez un email dès que AudioEnTexte sera disponible.
                  </p>
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl font-bold text-secondary">🚀</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">+250/500 déjà inscrits</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl font-bold text-secondary">🔒</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Vos données ne sont pas stockées</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">🇫🇷</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Optimisé pour le français</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
