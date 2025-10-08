// app/page.tsx
// AudioEnTexte — page d’accueil (inspirée par l’ordre des sections de granola.ai)
// Next.js App Router + TailwindCSS
// Remplacez les images / logos par vos assets réels (dossier /public)

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white font-bold">
              Æ
            </span>
            <span className="font-semibold">AudioEnTexte</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#prix" className="hover:text-cyan-700">Tarifs</Link>
            <Link href="#blog" className="hover:text-cyan-700">Blog</Link>
            <Link href="#carriere" className="hover:text-cyan-700">Carrières</Link>
            <Link
              href="/app"
              className="inline-flex items-center rounded-lg border border-cyan-600 px-3 py-1.5 text-cyan-700 hover:bg-cyan-50"
            >
              Ouvrir l’app
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center rounded-lg bg-cyan-600 px-3 py-1.5 text-white hover:bg-cyan-700"
            >
              Essayer gratuitement
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Simplified mobile menu button (add drawer if needed) */}
            <button aria-label="Ouvrir le menu" className="p-2 rounded-lg border hover:bg-gray-50">☰</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-gray-700">
              ✨ Nouveauté : Résumés et modèles intelligents
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
              Le bloc-notes IA pour celles et ceux qui <span className="text-cyan-700">enchaînent les réunions</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              AudioEnTexte transforme vos notes et transcriptions brutes en comptes-rendus clairs,
              actionnables et partageables en quelques secondes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/inscription" className="inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-3 text-white font-semibold hover:bg-cyan-700">
                Commencer gratuitement
              </Link>
              <Link href="/demo" className="inline-flex justify-center rounded-lg border px-5 py-3 font-semibold hover:bg-gray-50">
                Voir une démo
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-500">Aucune carte bancaire requise · Essayez sur vos prochaines réunions</p>
          </div>
          <div className="relative">
            {/* Placeholder for product mockup */}
            <div className="aspect-[4/3] w-full rounded-2xl border shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 p-2">
              <div className="h-full w-full rounded-xl bg-white ring-1 ring-gray-100 flex items-center justify-center text-gray-400">
                <span>Capture d’écran de l’app (remplacez par votre image)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / Logos */}
      <section aria-labelledby="trustedby" className="border-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 id="trustedby" className="text-center text-sm font-medium text-gray-500">
            Déjà adopté par des pros dans des entreprises françaises et internationales
          </h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {["Logo1","Logo2","Logo3","Logo4","Logo5","Logo6"].map((l)=>(
              <div key={l} className="h-10 opacity-50 grayscale bg-[url('/images/logos/placeholder.svg')] bg-center bg-no-repeat" aria-label={`Logo ${l}`} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how" className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-3xl">
          <h2 id="how" className="text-3xl sm:text-4xl font-bold">Comment ça marche</h2>
          <p className="mt-3 text-gray-600">
            Aussi simple qu’un bloc-notes — mais avec l’IA pour capter, structurer et diffuser vos décisions.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "1) Capture instantanée",
              desc: "Transcrivez l’audio de votre ordinateur, sans robot qui rejoint vos appels. Prenez vos propres notes comme d’habitude.",
              icon: "🎙️",
            },
            {
              title: "2) Notez l’essentiel",
              desc: "Notez librement. L’IA comprend le contexte, relie les points et complète les passages manquants en s’appuyant sur la transcription.",
              icon: "📝",
            },
            {
              title: "3) Résumé & plan d’action",
              desc: "En fin de réunion, obtenez un compte-rendu net : décisions, tâches, responsabilités et prochaines étapes.",
              icon: "✅",
            },
          ].map((it) => (
            <div key={it.title} className="rounded-2xl border p-6">
              <div className="text-3xl">{it.icon}</div>
              <h3 className="mt-4 font-semibold text-lg">{it.title}</h3>
              <p className="mt-2 text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Works everywhere, no bots */}
      <section aria-labelledby="platforms" className="bg-gray-50 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 id="platforms" className="text-3xl font-bold">Fonctionne sur vos outils — sans bots</h2>
            <p className="mt-3 text-gray-600">
              AudioEnTexte transcrit l’audio directement sur votre machine : aucun “bot” n’entre dans vos réunions.
              Compatible avec vos plateformes habituelles.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-700">
              {["Google Meet","Zoom","Microsoft Teams","Webex","Slack","Et plus"].map((p)=>(
                <li key={p} className="rounded-xl border bg-white px-3 py-2 text-center">{p}</li>
              ))}
            </ul>
          </div>
          <div className="aspect-video w-full rounded-2xl border bg-white ring-1 ring-gray-100 flex items-center justify-center text-gray-400">
            <span>Visuel “sans bots” (remplacez par une illustration)</span>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section aria-labelledby="templates" className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-3xl">
          <h2 id="templates" className="text-3xl sm:text-4xl font-bold">
            Modèles personnalisables pour vos réunions types
          </h2>
          <p className="mt-3 text-gray-600">
            Obtenez exactement la structure attendue par votre équipe — automatiquement.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["1:1","Entretien candidat","Comité de direction","Découverte client","Point d’avancement","Stand-up"].map((t)=>(
            <span key={t} className="rounded-full border bg-white px-4 py-2 text-sm">{t}</span>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <article className="rounded-2xl border bg-white p-6">
            <header className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Découverte client — Appel d’intro</h3>
                <p className="text-sm text-gray-500">Aujourd’hui · 14:30 · 3 participants</p>
              </div>
              <span className="rounded-lg bg-cyan-50 text-cyan-700 px-3 py-1 text-sm">Modèle</span>
            </header>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              {["À propos","Points clés","Décisions","Budget & échéances","Objections","Prochaines étapes"].map((b)=>(
                <div key={b} className="rounded-xl border p-3">
                  <div className="font-medium">{b}</div>
                  <p className="mt-1 text-gray-600">Contenu généré par l’IA à partir de vos notes + transcription.</p>
                </div>
              ))}
            </div>
          </article>

          <div className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center text-gray-400">
            <span>Prévisualisation du résumé (remplacez par capture d’écran)</span>
          </div>
        </div>
      </section>

      {/* Put your meetings to work */}
      <section aria-labelledby="actions" className="bg-gray-50 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 id="actions" className="text-3xl font-bold">Après la réunion, tout s’enchaîne</h2>
          <p className="mt-3 text-gray-600">AudioEnTexte inclut les meilleurs modèles d’IA pour accélérer vos suites d’action.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Rédiger l’email de suivi",
              "Lister les actions et responsables",
              "Extraire les questions posées",
              "Synthétiser les objections",
              "Récupérer le budget et les délais",
              "Identifier les participants & rôles",
              "Proposer un plan pour la semaine",
              "Générer une note interne",
              "Créer un mémo client",
            ].map((a)=>(
              <div key={a} className="rounded-xl border bg-white px-4 py-3 text-sm">{a}</div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/app" className="inline-flex rounded-lg bg-cyan-600 px-5 py-3 text-white font-semibold hover:bg-cyan-700">
              Ouvrir dans AudioEnTexte
            </Link>
          </div>
        </div>
      </section>

      {/* Share with one click */}
      <section aria-labelledby="share" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="share" className="text-3xl font-bold">Partage en un clic</h2>
            <p className="mt-3 text-gray-600">
              Diffusez vos notes là où votre équipe travaille déjà : lien sécurisé, export PDF, email ou
              partage direct vers vos outils collaboratifs.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Lien de lecture seule protégé</li>
              <li>• Export PDF / Markdown</li>
              <li>• Envoi aux canaux Slack/Teams</li>
              <li>• Ajout automatique aux dossiers clients</li>
            </ul>
          </div>
          <div className="aspect-[4/3] w-full rounded-2xl border bg-white ring-1 ring-gray-100 flex items-center justify-center text-gray-400">
            <span>Visuels de partage (remplacez par vos captures d’écran)</span>
          </div>
        </div>
      </section>

      {/* Built for back-to-back + CTA */}
      <section aria-labelledby="cta" className="relative overflow-hidden bg-cyan-700 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,white,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Conçu pour les journées “réunions non-stop”</h3>
              <p className="mt-2 text-cyan-50">Raccourcis clavier, latence faible, respect de la confidentialité.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Sécurité & confidentialité</h3>
              <p className="mt-2 text-cyan-50">Traitement conforme, chiffrement en transit et au repos, contrôle fin du partage.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Déploiement équipe</h3>
              <p className="mt-2 text-cyan-50">Groupes, modèles partagés, centralisation des décisions et tâches.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/inscription" className="inline-flex justify-center rounded-lg bg-white px-5 py-3 text-cyan-700 font-semibold hover:bg-cyan-50">
              Essayez sur vos prochaines réunions
            </Link>
            <Link href="/contact" className="inline-flex justify-center rounded-lg border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">
              Parler à un expert
            </Link>
          </div>
          <p className="mt-3 text-sm text-cyan-100">Gratuit pour commencer · Idéal pour les équipes Rév/Produit/RH</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white font-bold">Æ</span>
              <span className="font-semibold">AudioEnTexte</span>
            </div>
            <p className="mt-3 text-gray-600">Fait avec ❤️ en France</p>
          </div>
          <div>
            <div className="font-semibold">Produit</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/app" className="hover:underline">App</Link></li>
              <li><Link href="#templates" className="hover:underline">Modèles</Link></li>
              <li><Link href="#platforms" className="hover:underline">Intégrations</Link></li>
              <li><Link href="/status" className="hover:underline">État du service</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Ressources</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="#blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/help" className="hover:underline">Centre d’aide</Link></li>
              <li><Link href="/security" className="hover:underline">Sécurité & confidentialité</Link></li>
              <li><Link href="/enterprise" className="hover:underline">Entreprise</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Société</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="#carriere" className="hover:underline">Carrières</Link></li>
              <li><Link href="/legal/privacy" className="hover:underline">Politique de confidentialité</Link></li>
              <li><Link href="/legal/terms" className="hover:underline">Conditions d’utilisation</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} AudioEnTexte — Tous droits réservés
        </div>
      </footer>
    </main>
  );
}

