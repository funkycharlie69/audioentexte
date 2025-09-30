// app/tutoriel-envoi-fichier/page.tsx
import { Footer } from "@/components/footer"
import { UtmCapture } from "@/components/utm-capture"
import type { Metadata } from "next"
import UploadForm from "./UploadForm" // <-- client component

export const metadata: Metadata = {
  title: "Envoyer votre 1er fichier — AudioEnTexte",
  description: "Uploadez votre audio (MP3/M4A/WAV) et recevez transcription + compte rendu par e-mail.",
}

export default function TutorielPage() {
  return (
    <main className="min-h-screen bg-background">
      <UtmCapture />

      <section className="max-w-3xl mx-auto px-6 py-10 text-slate-800 dark:text-slate-100">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Uploadez votre 1er fichier audio
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Recevez <strong>la transcription</strong> + <strong>un compte-rendu</strong> à l'adresse e-mail indiquée.
          </p>
        </header>

        <UploadForm />

        <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <h2 className="text-lg font-semibold">Infos rapides</h2>
          <ul className="mt-3 space-y-2 list-disc pl-6 text-slate-700 dark:text-slate-300">
            <li>Formats acceptés : MP3, M4A, WAV (idéalement ≤ 10 min pour le 1er essai).</li>
            <li>Confidentialité : suppression automatique 5 minutes après traitement.</li>
            <li>En cas de souci d'envoi, écrivez à <a href="mailto:bonjour@audioentexte.com" className="font-bold">bonjour@audioentexte.com</a>.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
