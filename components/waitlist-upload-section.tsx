"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Gift, Mic, Folder, Pause } from "lucide-react"
import Clarity from "@microsoft/clarity"

type Step = "upload" | "questions" | "done"
type UploadStatus = "idle" | "recording" | "signing" | "uploading" | "done" | "error"

export default function WaitlistUploadSection() {
  const [step, setStep] = useState<Step>("upload")

  // Upload states
  const [email, setEmail] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [message, setMessage] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // UI/UX helpers
  const recordInputRef = useRef<HTMLInputElement | null>(null) // capture="microphone"
  const browseInputRef = useRef<HTMLInputElement | null>(null) // sans capture
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showHelp, setShowHelp] = useState(false)

  // MediaRecorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // Questions
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

  // ---------- Recording UX ----------
  async function startRecording() {
    try {
      setErrorMsg(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunksRef.current = []
      mr.ondataavailable = (e) => e.data?.size && chunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp4" }) // iOS -> AAC/mp4
        const f = new File([blob], `memo-${Date.now()}.m4a`, { type: blob.type })
        setFile(f)
        setFileName(f.name)
        const url = URL.createObjectURL(blob)
        if (audioRef.current) audioRef.current.src = url
        mr.stream.getTracks().forEach(t => t.stop())
        mediaRecorderRef.current = null
        setStatus("idle")
      }
      mediaRecorderRef.current = mr
      mr.start()
      setStatus("recording")
    } catch {
      setErrorMsg("Micro non accessible. Vérifiez les permissions navigateur.")
    }
  }
  function stopRecording() {
    mediaRecorderRef.current?.stop()
  }

  // ---------- File select (commun aux 2 inputs) ----------
  function handleFilePicked(f: File | null) {
    setFile(f || null)
    setFileName(f?.name ?? "")
    if (f && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(f)
    }
  }

  // ---------- Submit upload ----------
  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !file) {
      setErrorMsg("Ajoutez votre email et un fichier audio.")
      return
    }

    setErrorMsg(null)
    setMessage("")

    try {
      if (file.size > 200 * 1024 * 1024) {
        throw new Error("Fichier trop volumineux (max 200 Mo pour ce premier test).")
      }

      setStatus("signing")
      setMessage("Préparation de l’upload…")

      const params = new URLSearchParams({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        email: email.trim().toLowerCase(),
      })
      const signed = await fetch(`/api/upload-url?${params.toString()}`)
      if (!signed.ok) throw new Error("Impossible d’obtenir l’URL d’upload")
      const { url, key } = await signed.json()

      setStatus("uploading")
      setMessage("Upload en cours…")
      const put = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })
      if (!put.ok) throw new Error(`Échec upload: ${put.status}`)

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
      if (!res.ok) {
        try { console.warn("waitlist upsert error:", await res.json()) } catch {}
      }

      try { Clarity?.event?.("waitlist_upload_submit") } catch {}
      try {
        const eventId =
          (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Date.now())
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead",
            { content_name: "Waitlist Upload", value: 0, currency: "EUR", ...utm, landingPage: payload.landingPage },
            { eventID: eventId }
          )
        }
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
      setStep("questions")
    } catch (err: any) {
      console.error(err)
      setStatus("error")
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  // ---------- Questions submit ----------
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
        try { console.warn("waitlist questions update error:", await res.json()) } catch {}
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
                  {/* Email */}
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

                  {/* Audio */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Fichier audio</label>

                    {/* 1) Input ENREGISTRER (avec capture) */}
                    <input
                      ref={recordInputRef}
                      id="audio-record"
                      name="audio-record"
                      type="file"
                      accept="audio/*,.m4a,.mp3,.wav"
                      capture="microphone"
                      className="sr-only"
                      onChange={(e) => handleFilePicked(e.target.files?.[0] ?? null)}
                    />

                    {/* 2) Input PARCOURIR (sans capture) */}
                    <input
                      ref={browseInputRef}
                      id="audio-browse"
                      name="audio-browse"
                      type="file"
                      accept="audio/*,.m4a,.mp3,.wav"
                      className="sr-only"
                      onChange={(e) => handleFilePicked(e.target.files?.[0] ?? null)}
                    />

                    {/* Actions principales */}
                    <div className="flex gap-2">
                      {/* Enregistrement in-app (primaire) */}
                      {status !== "recording" ? (
                        <Button type="button" onClick={startRecording} className="flex-1 min-h-[44px]">
                          <Mic className="mr-2 h-4 w-4" />
                          Enregistrer
                        </Button>
                      ) : (
                        <Button type="button" onClick={stopRecording} variant="destructive" className="flex-1 min-h-[44px]">
                          <Pause className="mr-2 h-4 w-4" />
                          Arrêter
                        </Button>
                      )}

                      {/* Parcourir fichiers (ouvre Fichiers/Drive sur iOS) */}
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          if (browseInputRef.current) {
                            browseInputRef.current.value = ""
                            browseInputRef.current.click()
                          }
                        }}
                        className="flex-1 min-h-[44px]"
                      >
                        <Folder className="mr-2 h-4 w-4" />
                        Parcourir
                      </Button>
                    </div>

                    {/* Optionnel : fallback vers le picker "Enregistrer" natif iOS */}
                    {/* <button
                      type="button"
                      className="mt-2 text-xs underline text-muted-foreground"
                      onClick={() => {
                        if (recordInputRef.current) {
                          recordInputRef.current.value = ""
                          recordInputRef.current.click()
                        }
                      }}
                    >
                      Ou utiliser l’enregistrement iOS
                    </button> */}

                    {/* Feedback sélection */}
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p aria-live="polite">{fileName || "Aucun fichier sélectionné"}</p>
                      <audio ref={audioRef} controls className="mt-1 w-full" preload="metadata">
                        Votre navigateur ne supporte pas l’audio.
                      </audio>
                      <p className="text-xs mt-1">Formats : MP3, M4A, WAV • Idéalement ≤ 60 min.</p>
                    </div>

                    {/* Aide iPhone repliable */}
                    <button
                      type="button"
                      onClick={() => setShowHelp((s) => !s)}
                      className="mt-2 text-xs underline text-muted-foreground"
                    >
                      {showHelp ? "Masquer" : "Où sont mes mémos vocaux sur iPhone ?"}
                    </button>
                    {showHelp && (
                      <ol className="mt-1 text-xs space-y-1 text-muted-foreground">
                        <li>1) Dans <strong>Dictaphone</strong>, ouvrez le mémo → ••• → <strong>Partager</strong>.</li>
                        <li>2) Choisissez <strong>Enregistrer dans Fichiers</strong> → “Sur mon iPhone/Dictaphone”.</li>
                        <li>3) Revenez ici → <strong>Parcourir</strong> → sélectionnez votre mémo.</li>
                        <li className="italic">Astuce : renommez le mémo pour le retrouver rapidement.</li>
                      </ol>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "recording" || status === "signing" || status === "uploading" || !file}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[48px] text-base font-medium"
                  >
                    {status === "uploading" ? "Envoi…" : "Recevoir mes fichiers"}
                    {status !== "uploading" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  {/* Messages */}
                  {message && <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>}
                  {errorMsg && <p className="text-xs text-red-500 text-center -mt-1">{errorMsg}</p>}

                  <p className="text-xs text-muted-foreground">
                    En envoyant un fichier, vous acceptez la suppression automatique 5 min après traitement.
                  </p>
                </form>
              )}

              {step === "questions" && (
                <div className="mx-auto max-w-md space-y-6">
                  <p className="text-center text-sm font-semibold text-card-foreground">
                    Répondez à ces 2 questions pour valider l'envoi
                  </p>

                  {/* Q1 */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-card-foreground">
                      Combien d'heures par mois envisagez-vous transcrire ?
                    </legend>
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
                    Nous vous enverrons la transcription + le compte-rendu sous 24 h à{" "}
                    <span className="font-bold">{submittedEmail || email}</span>.
                    <br /><br />
                    Pour un traitement prioritaire (sous 2h), répondez au mail de confirmation que vous allez recevoir.
                  </p>
                </div>
              )}

              {/* Proof points */}
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
