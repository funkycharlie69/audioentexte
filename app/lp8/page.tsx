// Gemini
'use client'

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShareIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, CheckIcon, UserGroupIcon, ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

// --- CONSTANTS & DATA ---
// On sort les données statiques des composants pour de meilleures performances.

const navigation = [
  { name: 'Comment ça marche', href: '#how-it-works' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const testimonials = [
  {
    body: 'Compte rendu envoyé en 10 minutes, tâches claires pour toute l’équipe. On a arrêté les prises de notes à la main.',
    author: {
      name: 'Marc Biessy',
      handle: 'Co-Fondateur, Ops Clean',
      imageUrl: '/marc-biessy.png',
    },
  },
  {
    body: 'AudioEnTexte est devenu indispensable. C’est comme si je vivais dans le futur.',
    author: {
      name: 'Maxime Dubois',
      handle: 'Dirigeant, Atelier Loupiote',
      imageUrl: '/maxime-dubois.png',
    },
  },
  {
    body: "L'addiction est réelle... à ce stade, je ne peux plus imaginer ma life sans. Puissant sans effort.",
    author: {
      name: 'Josselin Trouilloud',
      handle: 'Vidéaste, JossTVisuals',
      imageUrl: '/josselin-trouilloud.png',
    },
  },
];

const tiers = [
  {
    name: 'Solo',
    id: 'tier-solo',
    href: '/onboarding',
    priceMonthly: '19€',
    description: 'Idéal pour une personne. Gagnez 3-4h/semaine sur vos comptes rendus.',
    features: [
      '1 utilisateur',
      'Réunions illimitées',
      '+100 langues supportées',
      'Compte rendu professionnel (modifiable)',
      'Partage (lien, email)',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/onboarding',
    priceMonthly: '39€',
    description: 'Parfait pour les équipes qui veulent standardiser la qualité des notes et le suivi.',
    features: [
      'Tout dans Solo, plus :',
      'Dossiers partagés & modèles d’entreprise',
      'Rôles admin',
      'Support prioritaire (24H)',
      'Partage (lien, Slack, email, Notion, Asana, ClickUp, Monday)',
    ],
    mostPopular: true,
  },
  {
    name: 'Entreprise',
    id: 'tier-enterprise',
    href: 'mailto:bonjour@audioentexte.com ?subject=Demande%20de%20rendez-vous%20-%20Offre%20Entreprise &body=Bonjour%20%2C%0A%0AJe%20souhaiterais%20obtenir%20plus%20d%27informations%20sur%20votre%20offre%20Entreprise.%0A%0AMon%20nom%20est%20...%0AMon%20entreprise%20est%20...%0ANombre%20de%20collaborateurs%20...%0A%0AMerci.%0A',
    priceMonthly: 'Sur Devis',
    description: 'Contrats & conformité avancée pour organisations exigeantes.',
    features: [
      'Hébergement dédié 🇫🇷 et DPA',
      'Contrôles SSO/SCIM & audit',
      'Politiques de rétention sur mesure',
      'Accompagnement et formation',
    ],
    mostPopular: false,
  },
];

const faqs = [
    {
    id: 1,
    question: "Est-ce que ça fonctionne aussi pour les réunions en personne ?",
    answer:
      "Oui, absolument. C'est un de nos gros avantages. L'application utilise le micro de votre ordinateur ou de votre téléphone, ce qui lui permet de fonctionner pour les réunions en ligne (Google Meet, Teams, etc.), mais aussi en physique, et même pour les appels téléphoniques.",
  },
  {
    id: 2,
    question: "Comment ça marche sans plugin ni bot à inviter ?",
    answer:
      "Notre application de bureau capture l'audio de votre ordinateur (micro et sortie son) de manière universelle. Vous n'avez donc rien à installer sur vos outils de visioconférence. C'est 'plug & play', simple et efficace.",
  },
  {
    id: 3,
    question: "Quelle est votre politique de remboursement ?",
    answer:
      "Vous bénéficiez d'une garantie \"satisfait ou remboursé\" de 30 jours. Si notre service ne vous convient pas, vous pouvez demander un remboursement complet, sans aucune justification.",
  },
  {
    id: 4,
    question: 'Où sont hébergées mes données ?',
    answer:
      "En France, sur des serveurs à Paris. Vous conservez la pleine propriété de vos fichiers. Nous ne revendons ni ne réutilisons jamais vos contenus.",
  },
  {
    id: 5,
    question: 'Pouvez-vous supprimer mes données ?',
    answer:
      "Oui. Vous pouvez supprimer vos données à tout moment depuis votre compte, ou activer la suppression automatique après traitement.",
  },
];

const footerNavigation = {
  solutions: [
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  support: [
    { name: "Centre d’aide", href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'À propos', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Carrières', href: '#' },
    { name: 'Presse', href: '#' },
  ],
  legal: [
    { name: 'CGU', href: '#' },
    { name: 'Confidentialité', href: '/terms-and-conditions' },
    { name: 'Contrat de traitement (DPA)', href: '#' },
  ],
};

// --- UTILITY FUNCTIONS ---

/**
 * Fonction utilitaire pour obtenir une date future formatée
 * @param {number} daysToAdd - Nombre de jours à ajouter à la date actuelle.
 * @returns {string} - La date formatée (ex: "12 oct.").
 */
const getFutureDate = (daysToAdd) => {
  const future = new Date();
  future.setDate(future.getDate() + daysToAdd);
  return future.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

/**
 * Concatène les noms de classes CSS de manière conditionnelle.
 * @param {...string} classes - Les classes à joindre.
 * @returns {string}
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// --- UI COMPONENTS ---

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Modification pour un header sticky avec un fond lors du scroll
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-900/10">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">AudioEnTexte</span>
            <img alt="AudioEnTexte" src="/audio-en-texte2.png" className="h-9 w-auto" />
          </a>
        </div>
        
        {/* Liens de navigation pour le desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-slate-900">
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Bouton CTA pour le desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/onboarding"
            className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Essayer aujourd'hui
          </a>
        </div>
        
        {/* Boutons pour le mobile : CTA toujours visible + Menu Burger */}
        <div className="flex flex-1 justify-end items-center gap-x-4 lg:hidden">
            <a
                href="/onboarding"
                className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white text-center shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                Essayer aujourd'hui
            </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>

      {/* Panel du menu burger pour mobile */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">AudioEnTexte</span>
              <img
                alt="AudioEnTexte"
                src="/audio-en-texte.png"
                className="h-12 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-slate-700"
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)} // Ferme le menu au clic
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {/* Le lien de connexion a été retiré car le bouton CTA est maintenant toujours visible */}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

const Hero = () => (
  <div className="relative pt-14">
    <div className="py-24 pt-16">
      <div className="absolute -rotate-12 top-5 left-5 w-20 h-20">
        <img src="/france.png" alt="Entreprise Française" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-5xl text-center">
          {/* Pill: Available On Platforms - START */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-x-3 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
              <p>Disponible sur :</p>
              <div className="flex items-center gap-x-2.5 text-slate-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Logo Apple" className="h-4 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Windows_logo_2012-Black.svg" alt="Logo Microsoft" className="h-4 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/14/14415.png" alt="Logo Android" className="h-4 w-auto" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 sm:text-6xl">
            Compte rendu de réunion parfait, <span className="text-cyan-600">sans prendre de notes.</span>
          </h1>
          <p className="mt-8 text-lg text-balance text-slate-600 sm:text-2xl/8">
            <strong>Concentrez-vous sur la conversation</strong>, AudioEnTexte rédige pour vous un plan d'action clair et prêt à partager.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-x-6">
            <a
              href="/onboarding"
              className="rounded-md bg-cyan-600 px-5 py-4 text-lg font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Essayer aujourd'hui →
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            30 jours satisfait ou remboursé en 1 clic
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-16 flow-root sm:mt-24">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
            
            {/* Étape 1: */}
            <div className="grid gap-4 grid-cols-2 grid-row-3 items-center">
              <p className="text-center text-sm font-medium text-slate-500 col-span-2">Réunion en ligne ou en présentiel</p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png" alt="Teams Logo" className="size-10 shrink-0 mx-auto" />
              <img src="https://www.logo.wine/a/logo/Google_Meet/Google_Meet-Logo.wine.svg" alt="Google Meet Logo" className="size-10 shrink-0 mx-auto" />
              <img src="https://www.logo.wine/a/logo/Slack_Technologies/Slack_Technologies-Mark-Logo.wine.svg" alt="Slack Logo" className="size-10 shrink-0 mx-auto" />
              <UserGroupIcon className="size-10 shrink-0 mx-auto" />
            </div>

            <ArrowDownIcon className="size-8 text-cyan-600 lg:hidden" />
            <ArrowRightIcon className="hidden size-8 text-cyan-600 lg:block" />
            
            {/* Étape 2: Icône IA */}
            <div className="flex flex-col text-center items-center gap-4">
              <p className="text-sm font-medium text-balance text-slate-500">Notre IA travaille pour vous</p>
              <div className="flex shrink-0 items-center justify-center rounded-full bg-slate-100 p-4 ring-1 ring-slate-200 sm:p-4">
                <SparklesIcon className="size-12 text-cyan-600 sm:size-10" />
              </div>
            </div>
            
            <ArrowDownIcon className="size-8 text-cyan-600 lg:hidden" />
            <ArrowRightIcon className="hidden size-8 text-cyan-600 lg:block" />

            {/* Étape 3: Le Compte Rendu */}
            <div className="flex flex-col gap-4 w-full max-w-3xl shrink-0 origin-center transform lg:w-2/3 lg:origin-left lg:scale-100">
              <p className="text-sm text-center font-medium text-balance text-slate-500">Votre compte rendu</p>
              <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10 sm:p-8">
                <div className="flex gap-5 flex-col items-center justify-between">
                  <div className="ml-2 shrink-0 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                    Généré en 58s (Réunion de 47min)
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      Compte Rendu Réunion - Lancement Phoenix
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Date : {new Date().toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-200 pt-6 text-sm">
                  <div>
                    <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                      <ChatBubbleBottomCenterTextIcon className="size-5 text-cyan-600" />
                      Résumé Exécutif
                    </h3>
                    <p className="mt-3 text-slate-600">
                      La préparation du lancement de Phoenix avance bien, avec la finalisation du login SSO. La décision clé de la réunion est d'opter pour un <strong>essai gratuit de 14 jours</strong> plutôt qu'un modèle freemium pour le lancement, afin de maximiser les retours qualitatifs. Le marketing a <strong>besoin des visuels finaux</strong> pour la landing page.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                      <UsersIcon className="size-5 text-cyan-600" />
                      Participants
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">Léa (Produit)</span>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Marc (Tech)</span>
                      <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Sophie (Marketing)</span>
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Alex (CEO)</span>
                    </div>
                  </div>
                   <div className="mt-6">
                    <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                      <CheckCircleIcon className="size-5 text-cyan-600" />
                      Décisions Clés
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>
                        <strong>Modèle de lancement :</strong> L'équipe opte pour un essai gratuit de 14 jours. Le modèle freemium sera réévalué pour le T2 2026.
                      </li>
                      <li>
                        <strong>Périmètre Beta :</strong> La fonctionnalité de reporting avancé est dépriorisée pour la V1 afin de tenir la date de lancement.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                      <ClipboardDocumentCheckIcon className="size-5 text-cyan-600" />
                      Plan d'Action
                    </h3>
                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-1 gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
                        <div className="font-medium text-slate-900 sm:col-span-2">Déployer la version beta sur le serveur de staging</div>
                        <div className="flex items-center justify-start gap-x-2 sm:justify-end">
                          <span className="text-xs font-medium text-blue-700">Marc</span>
                          <span className="text-xs text-slate-500">→ {getFutureDate(5)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
                        <div className="font-medium text-slate-900 sm:col-span-2">Mettre à jour la landing page avec l'offre d'essai</div>
                        <div className="flex items-center justify-start gap-x-2 sm:justify-end">
                          <span className="text-xs font-medium text-purple-700">Sophie</span>
                          <span className="text-xs text-slate-500">→ {getFutureDate(15)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
                        <div className="font-medium text-slate-900 sm:col-span-2">Préparer le script de la vidéo de démo</div>
                        <div className="flex items-center justify-start gap-x-2 sm:justify-end">
                          <span className="text-xs font-medium text-red-700">Léa</span>
                          <span className="text-xs text-slate-500">→ {getFutureDate(20)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LogoCloud = () => (
    <div className="mx-auto py-24 text-center max-w-7xl px-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-cyan-600">
            Pour ceux qui visent aussi haut
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-30 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/alan.png" alt="Alan" width={158} height={48} />
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/Swile_black.png" alt="Swile" width={158} height={48} />
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/sodikart.png" alt="Sodikart" width={158} height={48} />
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/manomano.png" alt="ManoMano" width={158} height={48} />
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/openclassrooms.png" alt="OpenClassrooms" width={158} height={48} />
            <img className="col-span-1 max-h-12 w-full object-contain dark:invert" src="/ipsos.jpg" alt="Ipsos" width={158} height={48} />
        </div>
    </div>
);

const HowItWorks = () => (
    <div id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-base/7 font-semibold text-cyan-600">Comment ça marche</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                    Comme un bloc-notes qui <span className="text-cyan-600">transcrit et résume pour vous.</span>
                </p>
            </div>
            <div className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3">
                <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <MicrophoneIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">1. Enregistrez sans effort <br /> (en ligne & hors ligne)</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Lancez l'enregistrement sur Meet, Zoom, Teams, <strong>et même en personne</strong>. Pas de bot à inviter, on utilise le micro et la sortie audio de votre appareil.
                    </p>
                </div>
                <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <ClipboardDocumentCheckIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">2. Recevez un plan d'action</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Dès la fin de la réunion, recevez une synthèse professionnelle avec <strong>les décisions, les prochaines étapes et les responsables</strong>.
                    </p>
                </div>
                <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <ShareIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">3. Partagez instantanément</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Envoyez le compte rendu à votre équipe en un clic <strong>via Slack, Notion, par email ou simplement avec un lien</strong>.
                    </p>
                </div>
            </div>
            <div className="mt-16 sm:mt-24">
                <figure className="mx-auto max-w-4xl text-center">
                    <blockquote className="text-lg text-pretty font-medium leading-8 text-slate-900 sm:text-xl sm:leading-9">
                        <p>“{testimonials[0].body}”</p>
                    </blockquote>
                    <figcaption className="mt-8">
                        <img className="mx-auto h-12 w-12 rounded-full" src={testimonials[0].author.imageUrl} alt="" />
                        <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                            <div className="font-semibold text-slate-900">{testimonials[0].author.name}</div>
                            <div className="text-slate-600">{testimonials[0].author.handle}</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
);

const Pricing = () => (
    <div id="pricing" className="py-24">
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:top-auto sm:right-[calc(50%-6rem)] sm:translate-y-0 sm:justify-end">
            <div
                style={{ clipPath: 'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)' }}
                className="aspect-1108/632 w-277 flex-none bg-linear-to-r from-cyan-500 to-blue-500 opacity-20"
            />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-cyan-600">Tarifs</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                    Un tarif simple et transparent
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-balance text-slate-600">
                Essayez dès aujourd'hui avec notre garantie de 30 jours satisfait ou remboursé en 1 clic.
            </p>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {tiers.map((tier, tierIdx) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                            tierIdx === 0 ? 'lg:rounded-r-none' : '',
                            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                            'flex flex-col justify-between rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg xl:p-10',
                        )}
                    >
                        <div>
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 id={tier.id} className={classNames(tier.mostPopular ? 'text-cyan-600' : 'text-slate-900', 'text-lg/8 font-semibold')}>
                                    {tier.name}
                                </h3>
                                {tier.mostPopular ? (
                                    <p className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs/5 font-semibold text-cyan-600">
                                        Plus choisi
                                    </p>
                                ) : null}
                            </div>
                            <p className="mt-4 text-sm/6 text-slate-600">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-semibold tracking-tight text-slate-900">{tier.priceMonthly}</span>
                                {tier.priceMonthly !== 'Sur Devis' && <span className="text-sm/6 font-semibold text-slate-600">/utilisateur/mois</span>}
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-slate-600">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-cyan-600" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a
                            href={tier.href}
                            aria-describedby={tier.id}
                            className={classNames(
                                tier.mostPopular
                                    ? 'bg-cyan-600 text-white shadow-sm hover:bg-cyan-500'
                                    : 'text-cyan-600 ring-1 ring-inset ring-cyan-200 hover:ring-cyan-300',
                                'mt-8 block rounded-md px-3 py-2 text-center text-lg/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600',
                            )}
                        >
                            {tier.name === 'Entreprise' ? 'Nous contacter' : 'Choisir ce plan'}
                        </a>
                    </div>
                ))}
            </div>
            <figure className="mt-16 rounded-2xl p-8 text-center sm:mt-24">
                <blockquote className="text-lg text-pretty font-medium leading-8 text-slate-900">
                    <p>“{testimonials[1].body}”</p>
                </blockquote>
                <figcaption className="mt-6">
                    <img className="mx-auto h-10 w-10 rounded-full" src={testimonials[1].author.imageUrl} alt="" />
                    <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                        <div className="font-semibold text-slate-900">{testimonials[1].author.name}</div>
                        <div className="text-slate-600">{testimonials[1].author.handle}</div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </div>
);

const FAQ = () => (
    <div id="faq" className="mx-auto max-w-2xl px-6 pb-8 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32 scroll-mt-24">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Questions fréquentes
        </h2>
        <dl className="mt-20 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq) => (
                <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
                    <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5 dark:text-white">
                        {faq.question}
                    </dt>
                    <dd className="mt-4 lg:col-span-7 lg:mt-0">
                        <p className="text-base/7 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </dd>
                </div>
            ))}
        </dl>
        <figure className="mt-16 rounded-2xl p-8 text-center sm:mt-24">
            <blockquote className="text-lg text-pretty font-medium leading-8 text-slate-900">
                <p>“{testimonials[2].body}”</p>
            </blockquote>
            <figcaption className="mt-6">
                <img className="mx-auto h-10 w-10 rounded-full" src={testimonials[2].author.imageUrl} alt="" />
                <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-slate-900">{testimonials[2].author.name}</div>
                    <div className="text-slate-600">{testimonials[2].author.handle}</div>
                </div>
            </figcaption>
        </figure>
    </div>
);

const CTA = () => (
    <div id="contact" className="relative mt-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                Prêt à décupler votre productivité ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">
                Laissez notre IA faire le travail. Créez votre compte et testez nos fonctionnalités sans risque avec notre garantie de 30 jours.
            </p>
            <div className="mt-10 flex-vert items-center justify-center gap-x-6">
                <a
                  href="/onboarding"
                  className="rounded-md bg-cyan-600 px-5 py-4 text-lg font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Essayer aujourd'hui →
                </a>
                <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
                    30 jours satisfait ou remboursé en 1 clic
                </p>
            </div>
        </div>
        <div aria-hidden="true" className="absolute top-full right-0 left-1/2 -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block">
            <div
                style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                className="aspect-1155/678 w-288.75 bg-linear-to-tr from-cyan-500 to-blue-500 opacity-30"
            />
        </div>
    </div>
);

const Footer = () => (
    <footer className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16 dark:border-white/10">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <img alt="AudioEnTexte" src="/audio-en-texte.png" className="h-15 dark:hidden" />
                <img alt="AudioEnTexte" src="/audio-en-texte.png" className="h-9 not-dark:hidden" />
                <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Solutions</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {footerNavigation.solutions.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <div className="mt-10 md:mt-0"> ... </div> */}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {/* <div> ... </div> */}
                        <div className="mt-0 md:mt-0">
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Légal</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {footerNavigation.legal.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

const BackgroundGradient = () => (
    <div aria-hidden="true" className="absolute top-0 right-0 left-0 -z-10 hidden -translate-y-10 transform-gpu overflow-hidden blur-3xl sm:block">
        <div
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            className="aspect-1155/678 w-288.75 bg-linear-to-tr from-cyan-500 to-blue-500 opacity-10"
        />
    </div>
);


// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  // On applique le fond dégradé sur le conteneur principal de la page.
  return (
    <div>
      <BackgroundGradient />
      <Header />
      <div className="relative isolate">
        <main>
          <Hero />
          <LogoCloud />
          <HowItWorks />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}