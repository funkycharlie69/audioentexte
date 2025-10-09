import { Footer } from "@/components/footer"
import { UtmCapture } from "@/components/utm-capture"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité – AudioEnTexte",
  description: "Découvrez comment nous protégeons vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
   <>
    <main className="min-h-screen bg-background">
      <UtmCapture />
      <section className="max-w-3xl mx-auto px-6 py-10 text-slate-800 dark:text-slate-100">
      <header className="mb-10">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight">
          Politique de confidentialité – AudioEnTexte
        </h1>
        {/* <p className="mt-2 text-sm sm:text-base text-slate-500">
          Dernière mise à jour :{" "}
          <time dateTime="2025-09-26">26 septembre 2025</time>
        </p> */}
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          AudioEnTexte (« nous », « notre », « nos ») exploite le site{" "}
          <a
            href="https://www.audioentexte.com"
            className="underline decoration-slate-300 hover:decoration-slate-500"
          >
            https://www.audioentexte.com
          </a>{" "}
          (le « Site ») et le service de transcription et de résumé (le « Service »).
        </p>
      </header>

      {/* 1) Responsable du traitement */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">1) Responsable du traitement</h2>
        <dl className="mt-3 grid grid-cols-1 gap-2">
          <div>
            <dt className="font-medium">Responsable</dt>
            <dd className="text-slate-700 dark:text-slate-300">
              AudioEnTexte
            </dd>
          </div>
          {/* <div>
            <dt className="font-medium">Adresse</dt>
            <dd className="text-slate-700 dark:text-slate-300">[Adresse complète]</dd>
          </div> */}
          <div>
            <dt className="font-medium">E-mail de contact</dt>
            <dd>
              <a
                href="mailto:bonjour@audioentexte.com"
                className="underline decoration-slate-300 hover:decoration-slate-500"
              >
                bonjour@audioentexte.com
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* 2) Données collectées */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">2) Données que nous collectons</h2>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Identité &amp; contact :</span> e-mail, nom (si fourni).
          </li>
          <li>
            <span className="font-medium">Contenu :</span> fichiers audio, métadonnées (nom du
            fichier, durée), transcriptions générées.
          </li>
          <li>
            <span className="font-medium">Facturation :</span> données nécessaires au paiement
            (traitées par notre prestataire de paiement).
          </li>
          <li>
            <span className="font-medium">Technique :</span> logs serveur, adresses IP, identifiants
            de session, cookies/traceurs, données d’usage (pages vues, appareils, navigateur).
          </li>
        </ul>
      </section>

      {/* 3) Finalités & bases légales */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">3) Finalités &amp; bases légales (RGPD)</h2>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Fournir le Service (exécution du contrat)</span> : réception,
            traitement et restitution de vos transcriptions.
          </li>
          <li>
            <span className="font-medium">Amélioration &amp; sécurité (intérêt légitime)</span> :
            statistiques agrégées, prévention des abus, qualité et disponibilité.
          </li>
          <li>
            <span className="font-medium">Communication (intérêt légitime/consentement)</span> :
            réponses à vos demandes ; newsletters si vous y consentez.
          </li>
          <li>
            <span className="font-medium">Obligations légales</span> : comptabilité, lutte contre la
            fraude, réponse aux autorités.
          </li>
        </ul>
      </section>

      {/* 4) Durées de conservation */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">4) Durées de conservation</h2>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Compte &amp; e-mail :</span> jusqu’à suppression du compte,
            puis <span className="font-medium">3 ans</span> maximum pour la preuve et la gestion des
            litiges.
          </li>
          <li>
            <span className="font-medium">Fichiers audio &amp; transcriptions :</span> conservés{" "}
            <span className="font-medium">[30 jours par défaut]</span> puis supprimés automatiquement,
            sauf action ou demande contraire de votre part.
          </li>
          <li>
            <span className="font-medium">Facturation :</span> <span className="font-medium">10 ans</span> (obligations comptables).
          </li>
          <li>
            <span className="font-medium">Logs techniques :</span> <span className="font-medium">12 mois</span> maximum.
          </li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Vous pouvez demander la suppression anticipée de vos fichiers/transcriptions à tout moment
          (voir vos droits ci-dessous).
        </p>
      </section>

      {/* 5) Partage & destinataires */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">5) Partage &amp; destinataires</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Nous partageons des données uniquement avec des{" "}
          <span className="font-medium">sous-traitants</span> nécessaires au Service (hébergement,
          e-mail, analytics, paiement, traitement IA) soumis à des obligations de confidentialité :
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Hébergement &amp; déploiement</span> (ex. : Vercel/Cloud provider)
          </li>
          <li>
            <span className="font-medium">Envoi d’e-mails &amp; CRM</span> (ex. : Loops)
          </li>
          <li>
            <span className="font-medium">Paiement</span> (ex. : Stripe)
          </li>
          <li>
            <span className="font-medium">Analyse d’audience</span> (ex. : outils analytics)
          </li>
          <li>
            <span className="font-medium">Fournisseurs d’IA</span> pour la transcription/résumé
            (ex. : moteurs de reconnaissance vocale)
          </li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Des transferts hors UE peuvent avoir lieu ; ils sont encadrés par des{" "}
          <span className="font-medium">Clauses Contractuelles Types</span> ou mécanismes équivalents.
        </p>
      </section>

      {/* 6) Cookies & analytics */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">6) Cookies &amp; analytics</h2>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Cookies essentiels</span> : fonctionnement du Site
            (authentification, sécurité, préférence de langue).
          </li>
          <li>
            <span className="font-medium">Mesure d’audience/marketing</span> : activés uniquement{" "}
            <span className="font-medium">avec votre consentement</span> via notre bandeau cookies.
          </li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Vous pouvez modifier vos préférences à tout moment depuis le bandeau/le lien « Cookies ».
        </p>
      </section>

      {/* 7) Sécurité */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">7) Sécurité</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (chiffrement en
          transit, contrôle d’accès, journaux de sécurité). Aucune méthode n’offre une sécurité
          absolue, mais nous améliorons en continu nos pratiques.
        </p>
      </section>

      {/* 8) Vos droits */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">8) Vos droits (RGPD)</h2>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">Accès, rectification, effacement</span>
          </li>
          <li>
            <span className="font-medium">Limitation &amp; opposition</span> au traitement
          </li>
          <li>
            <span className="font-medium">Portabilité</span> (données que vous nous avez fournies)
          </li>
          <li>
            <span className="font-medium">Retrait du consentement</span> à tout moment (pour les
            traitements fondés sur le consentement)
          </li>
        </ul>
        <p className="mt-3">
          Contact :{" "}
          <a
            href="mailto:bonjour@audioentexte.com"
            className="underline decoration-slate-300 hover:decoration-slate-500"
          >
            bonjour@audioentexte.com
          </a>
          <br />
          Vous pouvez aussi saisir la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-slate-300 hover:decoration-slate-500"
          >
            CNIL
          </a>{" "}
          si vous estimez que vos droits ne sont pas respectés.
        </p>
      </section>

      {/* 9) Mineurs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">9) Mineurs</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Le Service n’est pas destiné aux moins de <span className="font-medium">15 ans</span>. Si
          vous pensez qu’un mineur nous a transmis des données, contactez-nous pour suppression.
        </p>
      </section>

      {/* 10) Modifications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">10) Modifications</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Nous pouvons modifier cette politique. La version en vigueur est celle affichée sur cette
          page avec sa date de mise à jour. En cas de changement important, nous vous informerons par
          e-mail ou via le Site.
        </p>
      </section>

      {/* Contact */}
      <footer className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <h3 className="text-lg font-semibold">Contact</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Pour toute question ou demande relative à la confidentialité :{" "}
          <a
            href="mailto:bonjour@audioentexte.com"
            className="underline decoration-slate-300 hover:decoration-slate-500"
          >
            bonjour@audioentexte.com
          </a>
        </p>

      </footer>
    </section>
     <Footer />
    </main>
  </>
  )
}