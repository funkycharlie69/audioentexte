// app/bridge/page.tsx
// Page pont — ultra simple (Hook → Story → Offer)
// Couleurs : primaire #008891, secondaire #D9A615

import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="min-h-dvh bg-white text-black">
      {/* Barre d’étape */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-3xl px-4 py-4 text-center">
          <p className="text-sm text-black/70">Étape 2/3 : Préparation de votre transcription</p>
          <div className="mx-auto mt-2 h-2 w-full rounded bg-black/10" aria-hidden="true">
            <div className="h-2 rounded bg-[#008891]" style={{ width: "66.6667%" }} />
          </div>
        </div>
      </header>

      {/* HOOK */}
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:py-12">
        {/* Loader simple */}
        <div className="mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" fill="none" />
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Votre transcription arrive… gagnez du temps dès aujourd’hui.
        </h1>
        <p className="mt-2 text-base text-black/80">
          Accédez au traitement prioritaire et à des fonctions avancées pendant la préparation.
        </p>

        {/* CTA UNIQUE */}
        <div className="mt-6">
          <a
            href="/pro"
            className="inline-flex items-center gap-2 rounded-lg bg-[#008891] px-5 py-3 text-white transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#008891]/30"
          >
            <span>Obtenir mon accès prioritaire (-30&nbsp;%)</span>
            <ArrowIcon />
          </a>
        </div>

        {/* Preuve sociale compacte */}
        <p className="mt-4 text-sm text-black/60">
          Note moyenne <strong>4,8/5</strong> — “J’économise des heures chaque semaine.”
          <span className="text-black/40"> — Claire D., directrice conseil</span>
        </p>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-3xl px-4 pb-8 text-center">
        <p className="mx-auto text-black/90">
          Après chaque réunion, je réécoutais pendant des heures. Je perdais des détails.
          J’ai créé <strong>AudioEnTexte</strong> avec mon équipe pour transformer chaque enregistrement
          en texte clair et en résumé prêt à l’emploi, en quelques secondes. Utile pour
          <em> réunions, entretiens, cours, appels, tables rondes</em>.
        </p>
      </section>

      {/* OFFER (bénéfices → sans deuxième bouton) */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <ul className="mx-auto max-w-xl space-y-2 text-sm text-black/85">
          <li className="flex items-start justify-center gap-2">
            <CheckIcon /> <span>Réception rapide grâce au traitement prioritaire.</span>
          </li>
          <li className="flex items-start justify-center gap-2">
            <CheckIcon /> <span>Résumé actionnable : points clés, décisions, tâches.</span>
          </li>
          <li className="flex items-start justify-center gap-2">
            <CheckIcon /> <span>Exports prêts à partager (Word, PDF, Markdown).</span>
          </li>
          <li className="flex items-start justify-center gap-2">
            <CheckIcon /> <span>Transcriptions longues, illimitées (usage raisonnable).</span>
          </li>
        </ul>

        {/* Rareté discrète */}
        <p className="mt-6 text-center text-xs text-black/60">
          Accès prioritaire ouvert par vagues — remise <strong>-30&nbsp;%</strong> réservée à cette page.
        </p>
      </section>

      <Footer />
    </main>
  );
}

/** Icône check */
function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 flex-none text-[#D9A615]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Petite flèche */
function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
