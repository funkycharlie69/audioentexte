// Gemini
'use client'

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShareIcon,
  SparklesIcon,
  ChartBarIcon, // New Icon
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  MicrophoneIcon,
  BanknotesIcon, // New Icon
  LightBulbIcon, // New Icon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, CheckIcon, UserGroupIcon, ArrowDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import ExitIntentPopup from '../components/ExitIntentPopup';

// --- CONSTANTS & DATA (UPDATED FOR SALES PERSONA) ---

const navigation = [
  { name: 'Fonctionnalités', href: '#how-it-works' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const testimonials = [
  {
    body: "J'ai enfin une visibilité complète sur ce qui se passe sur le terrain. On a pu créer un guide des meilleures réponses aux objections qui a augmenté notre taux de closing de 15% en un trimestre.",
    author: {
      name: 'Claire Lemoine',
      handle: 'Directrice Commerciale, ScaleUp SaaS',
      imageUrl: '/claire-lemoine.png', // Placeholder - replace with a real image
    },
  },
  {
    body: "C'est comme avoir un coach personnel 24/7. Je peux réécouter les appels de notre meilleur vendeur et comprendre exactement ce qu'il fait de différent. Ça a divisé mon temps de formation par deux.",
    author: {
      name: 'Julien Moreau',
      handle: 'Account Executive, FinTech',
      imageUrl: '/julien-moreau.png', // Placeholder - replace with a real image
    },
  },
  {
    body: "L'investissement le plus rentable de l'année. L'impact sur la performance de l'équipe commerciale a été direct et mesurable.",
    author: {
      name: 'David Bernard',
      handle: 'CEO, Solutions B2B',
      imageUrl: '/david-bernard.png', // Placeholder - replace with a real image
    },
  },
];

const tiers = [
  {
    name: 'Équipe',
    id: 'tier-equipe',
    href: 'mailto:bonjour@audioentexte.com?subject=Demande de démo - Offre Équipe',
    priceMonthly: '99€',
    description: 'Pour les équipes qui veulent cloner leurs meilleurs vendeurs.',
    features: [
      'Jusqu\'à 10 utilisateurs',
      'Analyse d\'appels illimitée',
      'Transcription & résumé IA',
      'Détection des objections & sujets clés',
      'Bibliothèque d\'appels pour coaching',
      'Support prioritaire (24H)',
    ],
    mostPopular: true,
  },
  {
    name: 'Performance',
    id: 'tier-performance',
    href: 'mailto:bonjour@audioentexte.com?subject=Demande de démo - Offre Performance',
    priceMonthly: 'Sur Devis',
    description: 'Analyses avancées et intégrations pour dépasser vos objectifs.',
    features: [
      'Tout dans Équipe, plus :',
      'Utilisateurs illimités',
      'Analyses de performance par commercial',
      'Intégrations CRM (à venir)',
      'Accompagnement et formation dédiés',
      'Hébergement dédié 🇫🇷 et DPA',
    ],
    mostPopular: false,
  },
];

const faqs = [
    {
    id: 1,
    question: "Comment l'IA identifie-t-elle les moments clés d'un appel ?",
    answer:
      "Notre IA est spécialisée dans le français et entraînée pour reconnaître les schémas de vente. Elle détecte les questions, les signaux d'achat (ex: \"quel est le délai de mise en place ?\"), les objections (ex: \"vous êtes plus chers que...\") et les mentions de concurrents pour vous fournir une analyse pertinente.",
  },
  {
    id: 2,
    question: "Est-ce compatible avec notre CRM (Salesforce, HubSpot...) ?",
    answer:
      "Des intégrations natives sont sur notre feuille de route. En attendant, notre plateforme vous permet de partager facilement les analyses et les extraits d'appels via un lien, pour les ajouter manuellement à votre CRM. L'objectif est de rendre ce processus automatique très prochainement.",
  },
  {
    id: 3,
    question: "Comment garantissez-vous la confidentialité de nos appels commerciaux ?",
    answer:
      "La sécurité est notre priorité absolue. Toutes vos données sont chiffrées et hébergées en France sur des serveurs à Paris. Vous restez l'unique propriétaire de vos enregistrements et pouvez les supprimer à tout moment. Nous ne revendons ni n'utilisons jamais vos données.",
  },
  {
    id: 4,
    question: "Quelle est votre politique de remboursement ?",
    answer:
      "Nous proposons une garantie \"Impact ou remboursé\" de 30 jours. Si vous n'observez pas une amélioration dans la clarté de votre coaching ou dans la performance de votre équipe, nous vous remboursons intégralement, sans justification.",
  },
];


const footerNavigation = {
  solutions: [
    { name: 'Fonctionnalités', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: 'mailto:bonjour@audioentexte.com' },
  ],
  legal: [
    { name: 'CGU', href: '/terms-and-conditions' },
    { name: 'Confidentialité', href: '#' },
  ],
};

// --- UTILITY FUNCTIONS ---
const getFutureDate = (daysToAdd) => {
  const future = new Date();
  future.setDate(future.getDate() + daysToAdd);
  return future.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// --- NOUVEAU COMPOSANT POUR L'ANALYSE D'APPEL ---
const AnalyseAppelPliable = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white p-6 ring-1 border-2 border-primary ring-slate-900/10 sm:p-8 relative">
        <div
          className={`
            overflow-hidden 
            transition-all duration-700 ease-in-out
            ${isExpanded ? 'max-h-[2000px]' : 'max-h-[500px]'} 
          `}
        >
          {/* Contenu de l'analyse d'appel */}
          <div className="flex gap-5 flex-col items-center justify-between">
            <div className="flex items-center gap-x-4">
              <span className="ml-2 shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                AFFAIRE GAGNÉE
              </span>
              <span className="shrink-0 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                Durée : 28min
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Analyse d'Appel - Démo Acmé Inc.
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Commercial : Julien Moreau | Client : Sarah Martin
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 text-sm">
            <div>
              <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                <BanknotesIcon className="size-5 text-cyan-600" />
                Signaux d'Achat & Prochaines Étapes
              </h3>
              <p className="mt-3 text-slate-600">
                Le client a posé <strong>3 questions sur l'intégration</strong> (timing, coût, support), indiquant un fort intérêt. La prochaine étape claire est l'envoi du devis pour <strong>15 licences</strong> avec le récapitulatif des fonctionnalités discutées.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                <LightBulbIcon className="size-5 text-cyan-600" />
                Objections et Réponses Efficaces
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                <li>
                  <strong>Objection Prix :</strong> Le client a mentionné que le concurrent X était moins cher.
                </li>
                <li>
                  <strong>Réponse de Julien (Efficace) :</strong> "C'est vrai, ils ont un positionnement différent. Notre solution inclut le support dédié et l'IA d'analyse, ce qui représente une économie de 20h par mois pour un manager. Sur l'année, c'est un ROI bien plus important."
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                <ChartBarIcon className="size-5 text-cyan-600" />
                Statistiques Clés
              </h3>
               <div className="mt-3 flex flex-wrap gap-4">
                  <div>
                    <dt className="text-xs text-slate-500">Temps de parole</dt>
                    <dd className="font-medium text-slate-800">45% Vendeur / 55% Client</dd>
                  </div>
                   <div>
                    <dt className="text-xs text-slate-500">Sujet principal</dt>
                    <dd className="font-medium text-slate-800">Intégration & ROI</dd>
                  </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="flex items-center gap-x-2 font-semibold text-slate-800">
                <ClipboardDocumentCheckIcon className="size-5 text-cyan-600" />
                Plan de Coaching
              </h3>
              <div className="mt-3 space-y-2">
                <div className="rounded-md border border-green-200 bg-green-50 p-3">
                  <div className="font-medium text-green-900"><strong>Point Fort :</strong> Excellente gestion de l'objection sur le prix. À ajouter à la bibliothèque de coaching pour former les nouveaux.</div>
                </div>
                 <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                  <div className="font-medium text-amber-900"><strong>Axe d'amélioration :</strong> Proposer plus tôt dans l'appel de parler du ROI pour ancrer la valeur avant de discuter du prix.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-6 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={toggleExpansion}
          className="flex items-center gap-2 rounded-full bg-cyan-600/10 px-4 py-2 text-sm font-semibold text-cyan-700 hover:bg-cyan-600/20 transition-colors"
        >
          {isExpanded ? 'Voir moins' : 'Voir l\'analyse complète'}
          {isExpanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
        </button>
      </div>
    </div>
  );
};


// --- UI COMPONENTS ---

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-900/10">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">AudioEnTexte</span>
            <img alt="AudioEnTexte" src="/aet2.png" className="h-10 md:h-15 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-slate-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="mailto:bonjour@audioentexte.com?subject=Demande de démo"
            className="rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Demander une démo
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center gap-x-4 lg:hidden">
            <a
                href="mailto:bonjour@audioentexte.com?subject=Demande de démo"
                className={"rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"}
            >
                Demander une démo
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
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">AudioEnTexte</span>
              <img
                alt="AudioEnTexte"
                src="/aet2.png"
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
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

const Hero = () => (
  <div className="relative">
    <div className="py-24 pt-16">
      <div className="mx-auto max-w-7xl px-7 lg:px-8 relative">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 sm:text-6xl">
            Transformez chaque commercial <br /> en <span className="text-cyan-600">top performeur.</span>
          </h1>
          <h2 className="mt-8 text-lg text-balance text-slate-600 sm:text-2xl/8">
            Notre IA analyse vos appels de vente, identifie les stratégies gagnantes de vos meilleurs éléments et crée un <strong>guide de coaching sur-mesure</strong> pour toute l'équipe.
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-x-6">
            <a
              href="mailto:bonjour@audioentexte.com?subject=Demande de démo"
              className="rounded-md bg-cyan-600 px-5 py-4 text-lg font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Demander une démo →
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Optimisé pour le français ・ Garantie 30 jours Impact ou Remboursé
          </p>
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

        <div className="mt-16 flow-root sm:mt-24">
            <AnalyseAppelPliable />
        </div>
      </div>
    </div>
  </div>
);


const LogoCloud = () => (
    <div className="mx-auto py-24 text-center max-w-7xl px-16">
        <h2 className="text-lg/7 font-semibold text-slate-700">
            Ils dépassent leurs objectifs avec nous
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-16 lg:gap-x-30 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
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
    <div id="how-it-works" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-base/7 font-semibold text-cyan-600">Le secret des équipes qui surperforment</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                    Une méthode de vente unifiée et <span className="text-cyan-600">basée sur vos succès.</span>
                </p>
            </div>
            <div className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3">
                <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <MicrophoneIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">1. Enregistrez vos appels</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Connectez votre outil de visio (Meet, Teams, Zoom) ou importez des enregistrements. Notre technologie fonctionne sans bot et capture l'audio en haute fidélité.
                    </p>
                </div>
                <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <SparklesIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">2. Laissez l'IA identifier ce qui fonctionne</h3>
                    <p className="mt-2 text-base text-slate-600">
                       Notre IA transcrit et analyse chaque conversation pour en extraire les pépites : les meilleures réponses aux objections, les questions qui engagent, et les signaux d'achat.
                    </p>
                </div>
                <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg flex flex-col">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-600 text-white">
                        <UsersIcon className="size-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">3. Coachez et uniformisez la performance</h3>
                    <p className="mt-2 text-base text-slate-600">
                        Créez une bibliothèque des meilleurs moments et partagez-la avec toute l'équipe pour accélérer l'onboarding et diffuser les bonnes pratiques à grande échelle.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const Pricing = () => (
    <div id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-cyan-600">Tarifs</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                    Un investissement, pas une dépense.
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-balance text-slate-600">
               Choisissez le plan qui correspond à votre ambition. Chaque plan est conçu pour générer un ROI mesurable sur votre performance commerciale.
            </p>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {tiers.map((tier, tierIdx) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            tier.mostPopular ? 'lg:z-10 rounded-3xl' : 'lg:my-8',
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
                                {tier.priceMonthly !== 'Sur Devis' && (
                                  <span className="text-sm/6 font-semibold text-slate-600">
                                    /utilisateur/mois
                                  </span>
                                )}
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-slate-600">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-cyan-600" />
                                        {feature.includes(":") ? <strong>{feature.split(':')[0]}:</strong> : ""}{" "}
                                        {feature.includes(":") ? feature.split(':')[1] : feature}
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
                           {tier.name === 'Performance' ? 'Nous contacter' : 'Demander une démo'}
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
    <div id="faq" className="mx-auto max-w-2xl px-6 pb-8 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32 scroll-mt-24 bg-slate-50">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Vos questions, nos réponses
        </h2>
        <dl className="mt-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
                <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
                    <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">
                        {faq.question}
                    </dt>
                    <dd className="mt-4 lg:col-span-7 lg:mt-0">
                        <p className="text-base/7 text-gray-600">{faq.answer}</p>
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
    <div id="contact" className="relative mt-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                Prêt à dépasser vos objectifs ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
                Discutons de la manière dont notre IA peut aider votre équipe à vendre plus et mieux. Prenez rendez-vous pour une démo personnalisée de 15 minutes.
            </p>
            <div className="mt-10 flex-vert items-center justify-center gap-x-6">
                <a
                  href="mailto:bonjour@audioentexte.com?subject=Demande de démo"
                  className="rounded-md bg-cyan-600 px-5 py-4 text-lg font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Demander une démo →
                </a>
                <p className="mt-5 text-xs text-gray-500">
                    Garantie 30 jours Impact ou Remboursé
                </p>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="relative mx-auto mt-24 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div>
                  <img alt="AudioEnTexte" src="/aet2.png" className="h-15" />
                  <p className="mt-4 text-sm text-slate-600">L'IA au service de votre performance commerciale.</p>
                </div>
                <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm/6 font-semibold text-gray-900">Produit</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {footerNavigation.solutions.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div className="mt-0 md:mt-0">
                            <h3 className="text-sm/6 font-semibold text-gray-900">Légal</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {footerNavigation.legal.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
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
  const [showExitPopup, setShowExitPopup] = useState(false);
  const popupShown = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Exit intent logic can remain the same as it's a general marketing tactic
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handleMouseLeave = (event: MouseEvent) => {
      const hasScrolledEnough = window.scrollY > window.innerHeight * 2.5;
      const isExitingTop = event.clientY <= 0;
      if (isExitingTop && hasScrolledEnough && !popupShown.current) {
        setShowExitPopup(true);
        popupShown.current = true;
      }
    };

    const handleScroll = () => {
      if (popupShown.current) return;
      const currentScrollY = window.scrollY;
      if (
        currentScrollY > window.innerHeight * 5 &&
        currentScrollY < lastScrollY.current
      ) {
        setShowExitPopup(true);
        popupShown.current = true;
        document.removeEventListener('scroll', handleScroll);
      }
      lastScrollY.current = currentScrollY;
    };

    if (isMobile) {
      document.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('scroll', handleScroll);
      } else {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

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
      {/* <ExitIntentPopup 
        isOpen={showExitPopup} 
        onClose={() => setShowExitPopup(false)} 
      /> */}
    </div>
  );
}