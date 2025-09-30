"use client"

import { useState } from "react"

export default function UploadForm() {
  const [email, setEmail] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "signing" | "uploading" | "done" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    try {
      setStatus("signing"); setMessage("Préparation de lupload…")

      const params = new URLSearchParams({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        email: email || "anonymous",
      })
      const res = await fetch(`/api/upload-url?${params.toString()}`)
      if (!res.ok) throw new Error("Impossible d'obtenir l'URL d'upload")
      const { url } = await res.json()

      setStatus("uploading"); setMessage("Upload en cours…")
      const put = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })
      if (!put.ok) throw new Error(`Échec upload: ${put.status}`)

      setStatus("done")
      setMessage("Fichier reçu. Vous recevrez le résultat sous 24 h. Merci !")
      setFile(null)
    } catch (err: any) {
      console.error(err)
      setStatus("error")
      setMessage(err.message || "Une erreur est survenue pendant l'upload.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <label className="block text-sm font-medium">Votre e-mail</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=""
        className="mt-1 w-full rounded-lg border px-3 py-2 bg-background"
      />

      <label className="block text-sm font-medium mt-4">Fichier audio</label>

{/* Hidden native input (still part of the form) */}
<input
  id="audio-file"
  name="audio"              // optional, keep if you also submit FormData
  type="file"
  accept="audio/*"
  required
  className="sr-only"
  onChange={(e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    // also reflect the filename in a <span> below (see data-filename target)
    const el = document.getElementById("audio-file-name");
    if (el) el.textContent = f ? f.name : "Aucun fichier sélectionné";
  }}
/>

{/* Your custom button that triggers the hidden input */}
<label
  htmlFor="audio-file"
  className="mt-1 inline-flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 hover:bg-accent"
>
  <span className="text-sm">Sélectionner un fichier audio…</span>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
  </svg>
</label>

{/* Filename display */}
<p id="audio-file-name" className="mt-1 text-sm text-muted-foreground">
  Aucun fichier sélectionné
</p>

      <button
        type="submit"
        disabled={status === "signing" || status === "uploading"}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:opacity-90 disabled:opacity-60"
      >
        {status === "uploading" ? "Upload…" : "Envoyer mon fichier"}
      </button>

      {message && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{message}</p>}

      <p className="mt-3 text-xs text-slate-500">
        En envoyant un fichier, vous acceptez la suppression automatique sous 5 minutes après traitement.
      </p>
    </form>
  )
}
