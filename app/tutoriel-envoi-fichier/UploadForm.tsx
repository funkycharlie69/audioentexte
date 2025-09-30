// app/tutoriel-envoi-fichier/UploadForm.tsx
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
      setStatus("signing"); setMessage("Préparation de l’upload…")

      const params = new URLSearchParams({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        email: email || "anonymous",
      })
      const res = await fetch(`/api/upload-url?${params.toString()}`)
      if (!res.ok) throw new Error("Impossible d’obtenir l’URL d’upload")
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
      setMessage(err.message || "Une erreur est survenue pendant l’upload.")
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
      <input
        type="file"
        required
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mt-1 w-full rounded-lg border px-3 py-2 bg-background"
      />

      <button
        type="submit"
        disabled={status === "signing" || status === "uploading"}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:opacity-90 disabled:opacity-60"
      >
        {status === "uploading" ? "Upload…" : "Envoyer mon fichier"}
      </button>

      {message && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{message}</p>}

      <p className="mt-3 text-xs text-slate-500">
        En envoyant un fichier, vous acceptez la suppression automatique sous 5 minutes.
      </p>
    </form>
  )
}
