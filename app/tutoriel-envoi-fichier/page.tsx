import { Footer } from "@/components/footer"
import { UtmCapture } from "@/components/utm-capture"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envoyer votre 1er fichier — AudioEnTexte",
  description:
    "Mini-tuto : envoyez un lien Smash ou WeTransfer à bonjour@audioentexte.com et recevez transcription + compte-rendu sous 24h.",
}

const MAILTO = (() => {
  const subject = encodeURIComponent("Transcription – Lien audio")
  const body = encodeURIComponent(
    [
      "Bonjour,",
      "",
      "Voici le lien de mon fichier audio : [collez ici votre lien Smash/WeTransfer]",
      "",
      "Merci !",
    ].join("\n")
  )
  return `mailto:bonjour@audioentexte.com?subject=${subject}&body=${body}`
})()

export default function TutorielPage() {
  return (
    <main className="min-h-screen bg-background">
      <UtmCapture />

      <section className="max-w-3xl mx-auto px-6 py-10 text-slate-800 dark:text-slate-100">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Envoyer votre 1er fichier (⩽ 2 minutes) ⏱️
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Vous recevrez par e-mail, sous 24h, <strong>la transcription</strong> + <strong>un
            compte-rendu</strong> à l’adresse email qui a envoyé le fichier.
          </p>
        </header>

        {/* Étapes */}
        <ol className="space-y-6">
          <li className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-lg font-semibold">1) Uploadez votre audio</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Utilisez votre service préféré&nbsp;:
              {" "}
              <a
                href="https://fromsmash.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-300 hover:decoration-slate-500"
              >
                Smash
              </a>
              {" "}ou{" "}
              <a
                href="https://wetransfer.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-300 hover:decoration-slate-500"
              >
                WeTransfer
              </a>
              .
              <br></br>Puis, copiez le <strong>lien de partage</strong>.
            </p>
          </li>

          <li className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-lg font-semibold">2) Envoyez-nous le lien par e-mail</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Cliquez ci-dessous&nbsp;: votre application e-mail s’ouvrira avec l’objet et le message
              pré-remplis. Collez simplement le lien Smash/WeTransfer.
            </p>
            <div className="mt-4">
              <a
                href={MAILTO}
                className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-white font-medium hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
              >
                ✉️ Envoyer mon lien à bonjour@audioentexte.com
              </a>
              <p className="mt-2 text-xs text-slate-500">
                Astuce&nbsp;: envoyez le mail depuis l’adresse sur laquelle vous souhaitez recevoir
                les fichiers.
              </p>
            </div>
          </li>

          <li className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-lg font-semibold">3) Recevez vos fichiers sous 24h</div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Nous vous renverrons par e-mail&nbsp;:
            </p>
            <ul className="mt-2 list-disc pl-6 text-slate-700 dark:text-slate-300">
              <li>✅ La transcription complète</li>
              <li>✅ Un compte-rendu clair, prêt à partager</li>
            </ul>
          </li>
        </ol>

        {/*  Réponses aux questions */}
        <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <h2 className="text-lg font-semibold">Réponses aux questions</h2>
          <ul className="mt-3 space-y-2 list-disc pl-6 text-slate-700 dark:text-slate-300">
            <li>Formats conseillés&nbsp;: MP3, M4A, WAV.</li>
            <li>Si besoin de consignes spécifiques, ajoutez-les dans le corps de l’e-mail.</li>
            <li>Nous répondons à la même adresse e-mail que l’expéditeur.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
