"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Gift } from "lucide-react"
import Clarity from "@microsoft/clarity"

type Step = "upload" | "questions" | "done"

export default function WaitlistUploadSection() {
  const [step, setStep] = useState<Step>("upload")
  const [email, setEmail] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "signing" | "uploading" | "done" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("");
const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Questions (reprend tes champs)
  const [hoursPerMonth, setHoursPerMonth] = useState<string>("")
  const [mainUseCase, setMainUseCase] = useState<string>("")
  const [useCaseOther, setUseCaseOther] = useState<string>("")

  const getUTM = () => {
    if (typeof window === "undefined") return {}
    const params = new URLSearchParams(window.location.search)
    const get = (k: string) => params.get(k) || sessionStorage.getItem(k) || ""
    return {
      utmSource: get("utm_source"),
      campaign:  get("utm_campaign"),
      content:   get("utm_content"),
      medium:    get("utm_medium"),
      term:      get("utm_term"),
    }
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !file) return
    setErrorMsg(null)
    setMessage("")
    try {
      // Petit garde-fou optionnel (200 Mo)
      if (file.size > 200 * 1024 * 1024) {
        throw new Error("Fichier trop volumineux (max 200 Mo pour ce premier test).")
      }

      setStatus("signing"); setMessage("Préparation de l’upload…")

      // 1) Obtenir une URL présignée pour PUT vers R2
      const params = new URLSearchParams({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        email: email.trim().toLowerCase(),
      })
      const signed = await fetch(`/api/upload-url?${params.toString()}`)
      if (!signed.ok) throw new Error("Impossible d’obtenir l’URL d’upload")
      const { url, key } = await signed.json()

      // 2) Uploader directement vers R2
      setStatus("uploading"); setMessage("Upload en cours…")
      const put = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })
      if (!put.ok) throw new Error(`Échec upload: ${put.status}`)

      // 3) Upsert Loops (waitlist) avec le statut d’upload
      const utm = getUTM()
      const payload = {
        email: email.trim().toLowerCase(),
        subscribed: true,
        source: "lp-upload",
        userGroup: "waitlist",
        landingPage: (typeof window !== "undefined" ? window.location.pathname : "/"),
        r2Key: key,
        fileName: file.name,
        fileSize: file.size,
        ...utm,
      }

      setLoading(true)
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      // Même si ça échoue on continue le flow (l’upload est fait)
      if (!res.ok) {
        try {
          const data = await res.json()
          console.warn("waitlist upsert error:", data)
        } catch {}
      }

      // 4) Analytics
      try {
        Clarity?.event?.("waitlist_upload_submit")
      } catch {}
      try {
        const eventId =
          (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Date.now())
        // Meta
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead", { content_name: "Waitlist Upload", value: 0, currency: "EUR", ...utm, landingPage: payload.landingPage }, { eventID: eventId })
        }
        // Google Ads
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "conversion", {
            send_to: `${process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683"}/${process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || "v7uvCP-kl6AbEIP2lsVB"}`,
            value: 1.0,
            currency: "EUR",
          })
        }
      } catch (e) {
        console.warn("analytics error", e)
      }

      setSubmittedEmail(payload.email)
      setStatus("done")
      setMessage("Fichier reçu. Merci !")
      setFile(null)
      setStep("questions") // 👉 enchaîne sur le questionnaire
    } catch (err: any) {
      console.error(err)
      setStatus("error")
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  async function handleQuestionsSubmit(skip = false) {
    setLoading(true)
    setErrorMsg(null)
    try {
      const body: Record<string, any> = { email: submittedEmail }
      if (!skip) {
        body.hoursPerMonth = hoursPerMonth || null
        body.mainUseCase = mainUseCase || null
        if (mainUseCase === "autre") body.useCaseOther = useCaseOther || null
      }
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        try {
          const data = await res.json()
          console.warn("waitlist questions update error:", data)
        } catch {}
      }
      setStep("done")
    } catch (e) {
      console.error(e)
      setStep("done")
    } finally {
      setLoading(false)
    }
  }

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
                Uploadez un audio → Recevez <strong>transcription</strong> + <strong>compte-rendu</strong>.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative px-4 sm:px-6 pb-6 sm:pb-8">
              {step === "upload" && (
                <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
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

                  <div>
                        <label className="block text-sm font-medium mb-1">Fichier audio</label>

                        {/* Hidden native input kept in the form for validation + submission */}
                        <input
                            ref={fileInputRef}
                            id="audio-upload"
                            name="audio"                 // keep if you also read FormData server-side
                            type="file"
                            accept="audio/*"
                            required
                            className="sr-only"
                            onChange={(e) => {
                            const f = e.target.files?.[0] ?? null;
                            setFile(f);
                            setFileName(f?.name ?? "");
                            }}
                        />

                        {/* Your visible control */}
                        <label
                            htmlFor="audio-upload"
                            className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 bg-accent hover:bg-accent/90"
                        >
                            <span className="text-sm">Sélectionner un fichier audio…</span>
                            {/* chevron */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                            </svg>
                        </label>

                        {/* Filename feedback */}
                        <p className="text-sm text-muted-foreground mt-1" aria-live="polite">
                            {fileName || "Aucun fichier sélectionné"}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                            Formats : MP3, M4A, WAV • Idéalement ≤ 60 min.
                        </p>
                    </div>


                  <Button type="submit" size="lg" disabled={status === "signing" || status === "uploading"} className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[48px] text-base font-medium">
                    {status === "uploading" ? "Upload…" : "Recevoir mes fichiers"}
                    {status !== "uploading" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  {message && <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>}
                  {errorMsg && <p className="text-xs text-red-500 text-center -mt-1">{errorMsg}</p>}

                  <p className="text-xs text-muted-foreground">
                    En envoyant un fichier, vous acceptez la suppression automatique sous 5 min après traitement.
                  </p>
                </form>
              )}

              {step === "questions" && (
                <div className="mx-auto max-w-md space-y-6">
                    <p className="text-center text-sm font-semibold text-card-foreground">Répondez à ces 2 questions pour valider l'envoi</p>
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
                    <Button onClick={() => handleQuestionsSubmit(false)} disabled={loading} className="min-h-[44px]">
                      {loading ? "Envoi…" : "Valider"}
                    </Button>
                  </div>
                </div>
              )}

              {step === "done" && (
                <div className="text-center max-w-md mx-auto px-4 sm:px-0">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Merci !</h3>
                  <p className="text-muted-foreground">
                    Nous vous enverrons la transcription + le compte-rendu sous 24 h à <span className="font-bold">{submittedEmail || email}</span>.
                    <br /> <br /> Pour un traitement prioritaire (sous 2h), répondez au mail de confirmation que vous allez recevoir.
                  </p>
                </div>
              )}

              {/* petits proof points */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🚀</div><div className="text-xs sm:text-sm text-muted-foreground">+312/500 déjà inscrits</div></div>
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🔒</div><div className="text-xs sm:text-sm text-muted-foreground">Suppression auto sous 5 min</div></div>
                <div className="flex flex-col items-center"><div className="text-xl sm:text-2xl">🇫🇷</div><div className="text-xs sm:text-sm text-muted-foreground">Optimisé pour le français</div></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
