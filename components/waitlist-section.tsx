"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Gift } from "lucide-react";

type Step = "email" | "questions" | "done";

export function WaitlistSection() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string>(""); // pour la 2e requête
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Q1
  const [hoursPerMonth, setHoursPerMonth] = useState<string>("");
  // Q2
  const [mainUseCase, setMainUseCase] = useState<string>("");
  const [useCaseOther, setUseCaseOther] = useState<string>("");

  const getUTM = () => {
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k) || sessionStorage.getItem(k) || "";
    return {
      utmSource: get("utm_source"),
      campaign:  get("utm_campaign"),
      content:   get("utm_content"),
      medium:    get("utm_medium"),
      term:      get("utm_term"),
    };
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const utm = getUTM();
      const payload = {
        email: email.trim().toLowerCase(),
        subscribed: true,
        source: "lp",
        userGroup: "waitlist",
        landingPage: window.location.pathname || "/reunions",
        ...utm,
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

      // Analytics (inchangé) : Meta Lead + Google Ads conversion
      const eventId =
        (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Date.now());
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { content_name: "Waitlist", value: 0, currency: "EUR", ...utm, landingPage: payload.landingPage }, { eventID: eventId });
      }
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: `${process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683"}/${process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || "v7uvCP-kl6AbEIP2lsVB"}`,
          value: 1.0,
          currency: "EUR",
        });
      }

      setSubmittedEmail(payload.email); // garde l'email pour l'étape 2
      setEmail("");
      setStep("questions");            // ↩️ passe aux 2 questions
    } catch (err) {
      console.error(err);
      setErrorMsg("Oups, une erreur est survenue. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  const sendFollowupAnswers = async (skip = false) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Si l'utilisateur “passe”, on envoie quand même un update léger (ou rien).
      const body: Record<string, any> = { email: submittedEmail };
      if (!skip) {
        body.hoursPerMonth = hoursPerMonth || null;
        body.mainUseCase = mainUseCase || null;
        if (mainUseCase === "autre") body.useCaseOther = useCaseOther || null;
      }

      const res = await fetch("/api/waitlist", {
        method: "POST",                      // même endpoint, Loops fera un upsert
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "update_failed");
      }
      setStep("done");
    } catch (err) {
      console.error(err);
      // même si l’update échoue, on peut terminer le flow (l’email est déjà en base)
      setStep("done");
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
              <Badge variant="secondary" className="mx-auto mb-3 sm:mb-4 bg-accent/10 text-accent-foreground border-accent/20 text-xs sm:text-sm">
                <Gift className="h-3 w-3 mr-1" />
                OFFRE DE LANCEMENT
              </Badge>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground text-balance leading-tight">
                Découvrez Audio<span className="text-primary">En</span>Texte en avant-première.
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-muted-foreground mt-3 sm:mt-4 text-pretty px-2 sm:px-0">
                Bénéficiez de <span className="font-semibold text-accent">5h de transcription offertes</span> en rejoignant la liste d'attente.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative px-4 sm:px-6 pb-6 sm:pb-8">
              {step === "email" && (
                <form onSubmit={handleSubmitEmail} className="flex flex-col gap-4 max-w-md mx-auto">
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
                  <p className="text-xs -mt-2">Votre email devra être validé.</p>
                  <Button type="submit" size="lg" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[48px] text-base font-medium">
                    {loading ? "Envoi…" : "🎁 Recevoir 5h offertes"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  {errorMsg && <p className="text-xs text-red-500 text-center -mt-1">{errorMsg}</p>}
                </form>
              )}

              {step === "questions" && (
                <div className="mx-auto max-w-md space-y-6">
                  {/* Q1 */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-card-foreground">Combien d'heures par mois envisagez-vous transcrire ?</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {["<1h","1–5h","5–20h","20h+"].map((v) => (
                        <label key={v} className={`cursor-pointer rounded-lg border p-3 text-sm ${hoursPerMonth === v ? "border-primary bg-primary/5" : "border-border"}`}>
                          <input
                            type="radio"
                            name="hours"
                            value={v}
                            className="sr-only"
                            checked={hoursPerMonth === v}
                            onChange={() => setHoursPerMonth(v)}
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Q2 */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-card-foreground">Type de transcription principale</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: "reunion", label: "Réunion" },
                        { key: "entretien", label: "Entretien" },
                        { key: "cours", label: "Cours" },
                        { key: "podcast", label: "Podcast" },
                        { key: "medic_juridique", label: "Médic/Juridique" },
                        { key: "autre", label: "Autre" },
                      ].map((opt) => (
                        <label key={opt.key} className={`cursor-pointer rounded-lg border p-3 text-sm ${mainUseCase === opt.key ? "border-primary bg-primary/5" : "border-border"}`}>
                          <input
                            type="radio"
                            name="usecase"
                            value={opt.key}
                            className="sr-only"
                            checked={mainUseCase === opt.key}
                            onChange={() => setMainUseCase(opt.key)}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>

                    {mainUseCase === "autre" && (
                      <Input
                        placeholder="Précisez…"
                        value={useCaseOther}
                        onChange={(e) => setUseCaseOther(e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </fieldset>

                  <div className="flex items-center justify-center gap-3">
                    <Button onClick={() => sendFollowupAnswers(false)} disabled={loading} className="min-h-[44px]">
                      {loading ? "Envoi…" : "Valider"}
                    </Button>
                    {/* <Button variant="secondary" onClick={() => sendFollowupAnswers(true)} disabled={loading} className="min-h-[44px]">
                      Passer
                    </Button> */}
                  </div>
                </div>
              )}

              {step === "done" && (
                <div className="text-center max-w-md mx-auto px-4 sm:px-0">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Merci !</h3>
                  <p className="text-muted-foreground">Vous recevrez un e-mail dès que AudioEnTexte sera disponible.</p>
                </div>
              )}

              {/* petits proof points */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🚀</div><div className="text-xs sm:text-sm text-muted-foreground">+250/500 déjà inscrits</div></div>
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🔒</div><div className="text-xs sm:text-sm text-muted-foreground">Vos données ne sont pas stockées</div></div>
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🇫🇷</div><div className="text-xs sm:text-sm text-muted-foreground">Optimisé pour le français</div></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
