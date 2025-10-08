'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon, // Nouvelle icône
  BoltIcon, // Nouvelle icône
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Comment ça marche ?', href: '#features' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
]
// Section "Features" renommée pour être plus orientée bénéfices
const value_proposition = [
  {
    name: 'Retrouvez vos décisions clés',
    description:
      'Chaque compte rendu identifie clairement les décisions prises pour que tout le monde soit aligné.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Identifiez les prochaines étapes',
    description:
      'Ne quittez plus jamais une réunion sans un plan d\'action clair. Chaque tâche est assignée à son responsable.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Partagez en un clic',
    description:
      'Envoyez la synthèse de la réunion instantanément via Slack, Notion, email ou un simple lien.',
    icon: BoltIcon,
  },
  {
    name: 'Précision remarquable, même en français',
    description:
      'Notre IA, optimisée pour la langue française, capture les nuances de vos conversations avec une clarté exceptionnelle.',
    icon: CheckIcon,
  },
]
// Nouvelle section pour les différenciateurs
const differentiators = [
  {
    name: 'Fonctionne partout, en ligne et hors ligne',
    description:
      'Sur tous vos outils (Meet, Teams, Zoom...) mais aussi lors de vos réunions en personne ou pour vos appels téléphoniques.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Aucune installation requise',
    description:
      'Pas de bot à inviter, pas de plugin à installer. Notre app est universelle et fonctionne discrètement en arrière-plan.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Synthèse actionnable instantanée',
    description:
      'À la seconde où votre réunion se termine, votre compte rendu est prêt. Gagnez un temps précieux sur la relecture et la mise en forme.',
    icon: BoltIcon,
  },
  {
    name: 'Vos données sont en sécurité, en France',
    description:
      'Conformité RGPD, serveurs à Paris. Vos conversations vous appartiennent et ne sont jamais utilisées à d\'autres fins.',
    icon: LockClosedIcon,
  },
]
const tiers = [
  {
    name: 'Essai Gratuit',
    id: 'tier-free',
    href: '#', // Lien vers la page d'inscription
    priceMonthly: '0€',
    description: 'Découvrez la magie de notre IA avec votre première réunion.',
    features: ['1 transcription offerte', 'Résumé et plan d\'action IA', 'Toutes les intégrations'],
    mostPopular: false,
  },
  {
    name: 'Business',
    id: 'tier-business',
    href: '#', // Lien vers la page de paiement
    priceMonthly: '49€',
    description: 'La solution complète pour aligner et faire collaborer toute votre équipe.',
    features: [
      'Réunions illimitées',
      'Analyse avancée des conversations',
      'Gestion des membres de l\'équipe',
      'Support prioritaire',
    ],
    mostPopular: true,
  },
  {
    name: 'Entreprise',
    id: 'tier-enterprise',
    href: '#', // Lien vers un formulaire de contact/démo
    priceMonthly: 'Sur devis',
    description: 'Une infrastructure et un support dédiés pour votre organisation.',
    features: [
      'Déploiement sur site ou cloud privé',
      'SSO & sécurité sur-mesure',
      'Gestionnaire de compte dédié',
      'Accès API',
    ],
    mostPopular: false,
  },
]
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
    question: "Pourquoi un essai gratuit plutôt qu'un plan gratuit ?",
    answer:
      "Nous voulons que vous testiez la pleine puissance de notre outil sans restriction. L'essai vous donne accès à une expérience complète. Ensuite, nos plans payants vous assurent un service de haute qualité, sécurisé et un support dédié, sans jamais utiliser vos données.",
  },
  {
    id: 4,
    question: "Mes données sont-elles vraiment en sécurité ?",
    answer:
      "La sécurité est notre priorité. Nous sommes une entreprise française, conforme au RGPD. Vos données sont chiffrées, hébergées sur des serveurs à Paris, et ne sont jamais utilisées pour entraîner nos modèles. Vous en gardez le contrôle total.",
  },
]
const footerNavigation = {
    solutions: [
    { name: 'Fonctionnalités', href: '#' },
    { name: 'Intégrations', href: '#' },
    { name: 'Tarifs', href: '#' },
  ],
  support: [
    { name: 'Contacter le support', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
  company: [
    { name: 'À propos', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Nous rejoindre', href: '#' },
  ],
  legal: [
    { name: 'Conditions de service', href: '#' },
    { name: 'Politique de confidentialité', href: '#' },
    { name: 'Sécurité', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">AudioEnTexte</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto not-dark:hidden"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
              Se connecter <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Votre Entreprise</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/30">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Se connecter
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75 dark:opacity-20"
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
                  Transformez vos réunions en plans d'action clairs avec notre Scribe IA
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                  Votre scribe IA qui transforme chaque conversation en plan d'action clair. Concentrez-vous sur l'essentiel, on s'occupe du reste.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#" // Lien vers l'inscription gratuite
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Essayer gratuitement
                  </a>
                  <a href="#features" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Comment ça marche <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                 {/* Ce visuel devrait montrer une synthèse actionnable (Décisions, Actions, etc.) */}
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/2.5 dark:ring-white/10">
                  <img
                    alt="App screenshot"
                    src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 dark:hidden"
                  />
                  <img
                    alt="App screenshot"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 not-dark:hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div id="features" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 scroll-mt-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Votre Scribe IA</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Sortez de réunion avec un plan d'action clair
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Fini les notes désorganisées. Notre IA structure vos conversations en résumés actionnables que vous pouvez utiliser immédiatement.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {value_proposition.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        
        {/* Differentiators Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
             <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Simplicité et Puissance</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Ce que les autres ne font pas
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {differentiators.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                        <feature.icon className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                        {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                        <p className="flex-auto">{feature.description}</p>
                    </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              className="absolute inset-0 size-full object-cover brightness-150 saturate-0"
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div className="relative mx-auto max-w-2xl lg:mx-0">
               <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                  <p>
                    “Nos réunions sont 2x plus productives. On gagne 3 à 4 heures par semaine sur la rédaction des comptes rendus. C'est simple, efficace, et le fait que ce soit une solution française nous a définitivement convaincus.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Julien Moreau</div>
                  <div className="mt-1">CEO de La Boîte Française</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div id="pricing" className="py-24 sm:pt-48 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Gagnez 3h par semaine</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                Un tarif simple pour un gain de temps énorme
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
              Commencez gratuitement, puis choisissez le plan qui évolue avec vous. Tous nos abonnements sont sans engagement et garantis 60 jours.
            </p>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {tiers.map((tier, tierIdx) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                    tierIdx === 0 ? '-mr-px lg:rounded-r-none' : '',
                    tierIdx === tiers.length - 1 ? '-ml-px lg:rounded-l-none' : '',
                    'flex flex-col justify-between rounded-3xl bg-white p-8 inset-ring inset-ring-gray-200 xl:p-10 dark:bg-gray-800/50 dark:inset-ring-gray-700',
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white',
                          'text-lg/8 font-semibold',
                        )}
                      >
                        {tier.name}
                      </h3>
                      {tier.mostPopular ? (
                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                          Le plus populaire
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm/6 text-gray-600 dark:text-gray-400">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {tier.priceMonthly}
                      </span>
                      {tier.name !== 'Entreprise' && tier.name !== 'Essai Gratuit' && (
                        <span className="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">/mois</span>
                      )}
                    </p>
                    <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 dark:text-gray-400">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                          />
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
                        ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400'
                        : 'text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300 dark:text-white dark:bg-white/10 dark:hover:bg-white/20',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    )}
                  >
                     {tier.name === 'Essai Gratuit' ? 'Commencer gratuitement' : tier.name === 'Entreprise' ? 'Nous contacter' : 'Choisir ce plan'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
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
        </div>

        {/* CTA section */}
        <div className="relative -z-10 mt-32 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              Boostez votre productivité, pas vos comptes rendus.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">
             Créez votre compte et laissez notre IA faire le travail. Votre première réunion est offerte.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#" // Lien vers l'inscription gratuite
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400"
              >
                Tester maintenant
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                Demander une démo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32 dark:border-white/10">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <img
              alt="AudioEnTexte"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-9 dark:hidden"
            />
            <img
              alt="AudioEnTexte"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-9 not-dark:hidden"
            />
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Solutions</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Entreprise</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Légal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
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
    </div>
  )
}