// Gemini
'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  XMarkIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import { BoltIcon, CheckIcon, DevicePhoneMobileIcon, MicrophoneIcon, PlayIcon, } from '@heroicons/react/20/solid'
import { MicIcon } from 'lucide-react'

const navigation = [
  { name: 'Produit', href: '#features' },
  { name: 'Sécurité', href: '#security' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'Ressources', href: '#faq' },
]

const keyDifferences = [
  {
    name: 'Universel et sans friction',
    description:
      "Fonctionne partout : Google Meet, Teams, Zoom, en présentiel ou par téléphone. Pas de bot à inviter ni d'installation complexe. Lancez l'enregistrement et c'est parti.",
    icon: ArrowPathIcon,
  },
  {
    name: "De l'audio au plan d'action",
    description:
      "Recevez une synthèse claire avec les décisions, les prochaines actions et les risques identifiés. Assignez des responsables et partagez en un clic sur Slack, Notion, etc.",
    icon: FingerPrintIcon,
  },
  {
    name: 'Précision et expertise française',
    description:
      "Notre IA est spécifiquement entraînée pour le français, offrant une transcription d'une clarté extrême, même sur des enregistrements imparfaits. Corrigez facilement si besoin.",
    icon: MicIcon,
  },
  {
    name: 'Sécurité et souveraineté',
    description:
      'Conformité RGPD, serveurs en France. Vos données sont chiffrées, vous appartiennent, ne sont jamais revendues et peuvent être supprimées à tout moment.',
    icon: LockClosedIcon,
  },
]


const tiers = [
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#checkout',
    priceMonthly: '39€',
    description: 'Idéal pour freelances & consultants qui veulent gagner 3-4h/semaine sur leurs comptes rendus.',
    features: [
      'Réunions illimitées',
      'Transcription en français',
      'Compte rendu pro (modifiable facilement)',
      'Partage (lien, Slack, email, Notion, Monday, ClickUp, Asana)',
    ],
    mostPopular: false,
  },
  {
    name: 'Business',
    id: 'tier-business',
    href: '#checkout',
    priceMonthly: '69€',
    description: 'Parfait pour les équipes de 2 à 50 personnes qui veulent standardiser la qualité des notes et le suivi.',
    features: [
      'Tout dans Pro, plus :',
      'Dossiers partagés & modèles d’entreprise',
      'Rôles admin',
      'SLA support prioritaire (jour ouvré)',
    ],
    mostPopular: true,
  },
  {
    name: 'Entreprise',
    id: 'tier-enterprise',
    href: '#contact',
    priceMonthly: 'Sur Devis',
    description: 'Contrats & conformité avancée pour organisations exigeantes.',
    features: [
      'Hébergement dédié 🇫🇷 et DPA',
      'Contrôles SSO/SCIM & audit',
      'Politiques de rétention sur mesure',
      'Accompagnement déploiement & formation',
    ],
    mostPopular: false,
  },
]

const faqs = [
  {
    id: 1,
    question: 'Puis-je l’utiliser sans « bot » qui rejoint mes réunions ?',
    answer:
      "Oui. AudioEnTexte enregistre l’audio côté appareil (micro + sortie), donc pas d’invité robot. Idéal quand vos clients refusent les bots.",
  },
  {
    id: 2,
    question: 'Quelle précision puis-je attendre ?',
    answer:
      "Une précision remarquable sur un audio intelligible en français. Sur enregistrements très dégradés, notre modèle reste robuste et vous pouvez corriger en un clic.",
  },
  {
    id: 3,
    question: "Quelle est votre politique de remboursement ?",
    answer:
      "Vous bénéficiez d'une garantie \"satisfait ou remboursé\" de 30 jours. Si notre service ne vous convient pas, vous pouvez demander un remboursement complet en un clic depuis votre compte, sans aucune justification.",
  },
  {
    id: 4,
    question: 'Où sont hébergées mes données et qui en est propriétaire ?',
    answer:
      "En France, sur des serveurs à Paris. Vous conservez la pleine propriété de vos fichiers audio et textes. Nous ne revendons ni ne réutilisons vos contenus.",
  },
  {
    id: 5,
    question: 'Pouvez-vous supprimer mes données ?',
    answer:
      "Oui. Sur simple demande, suppression sous 24h. Vous pouvez aussi activer la suppression automatique une fois le traitement terminé.",
  },
]

const footerNavigation = {
  solutions: [
    { name: 'Produit', href: '#features' },
    { name: 'Sécurité', href: '#security' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Ressources', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  support: [
    { name: 'Centre d’aide', href: '#' },
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
    { name: 'Confidentialité', href: '#' },
    { name: 'Contrat de traitement (DPA)', href: '#' },
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
                alt="AudioEnTexte"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt="AudioEnTexte"
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
              <span className="sr-only">Ouvrir le menu</span>
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
            <a href="#login" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
              Se connecter <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">AudioEnTexte</span>
                <img
                  alt="AudioEnTexte"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt="AudioEnTexte"
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
                    href="#login"
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
                <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                  <span className="text-indigo-600">Votre scribe IA. </span>
                  <br />
                  {/* Gagnez 4h par semaine sur vos comptes rendus. */}
                  "On a arreté les prises de notes à la main."
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                    <strong>Concentrez‑vous sur la conversation,</strong> on s’occupe du reste. AudioEnTexte sort de chaque réunion un plan d’action clair : décisions, actions, responsables - prêt à partager.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-x-6">
                  <a
                    href="#pricing"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                  >
                    Commencer →
                  </a>
                  {/* <a href="#demo" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    Voir une démo (1 min) <span aria-hidden="true">→</span>
                  </a> */}
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  30 jours satisfait ou remboursé ・ Remboursement en 1 clic
                </p>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/2.5 dark:ring-white/10">
                  <img
                    alt="Capture de l’app"
                    src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 dark:hidden"
                  />
                  <img
                    alt="Capture de l’app (mode sombre)"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 not-dark:hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75 dark:opacity-20"
            />
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold mb-8 text-gray-900 dark:text-white">Ils nous font confiance</h2>
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Client 1"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
            />
            <img
              alt="Client 1"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
            />

            <img
              alt="Client 2"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
            />
            <img
              alt="Client 2"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
            />

            <img
              alt="Client 3"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
            />
            <img
              alt="Client 3"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
            />

            <img
              alt="Client 4"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 dark:hidden"
            />
            <img
              alt="Client 4"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-2 lg:col-span-1"
            />

            <img
              alt="Client 5"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:hidden"
            />
            <img
              alt="Client 5"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-auto lg:col-span-1"
            />
          </div>
          <div className="mt-16 flex justify-center">
            {/* <p className="relative rounded-full bg-white/25 px-4 py-1.5 text-sm/6 text-gray-600 inset-ring inset-ring-gray-900/10 dark:bg-gray-800/25 dark:text-gray-400 dark:inset-ring-white/10">
              <span className="hidden md:inline">Étude de cas : comment une équipe a réduit de 70 % le temps de compte rendu.</span>
              <a
                href="#case-study"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <span aria-hidden="true" className="absolute inset-0" /> Lire l’étude <span aria-hidden="true">&rarr;</span>
              </a>
            </p> */}
          </div>
        </div>

        {/* Bento Grid Section */}
        <div id="features" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">La différence AudioEnTexte</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
                        Plus qu'une simple transcription
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                        Plus de notes dispersées ni de tâches oubliées. Centralisez vos décisions et actions, puis partagez-les en un clic avec l’équipe.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-2">
                    {/* Card 1: Universel et sans friction */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:bg-gray-800" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
                            <div className="p-10 flex-1 flex flex-col justify-center">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                    {(() => { const Icon = keyDifferences[0].icon; return <Icon aria-hidden="true" className="size-6 text-white" />; })()}
                                </div>
                                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                                    {keyDifferences[0].name}
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                                    {keyDifferences[0].description}
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:outline-white/15" />
                    </div>

                    {/* Card 2: De l'audio au plan d'action */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-tr-4xl dark:bg-gray-800" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-tr-[2rem]">
                            <div className="p-10 flex-1 flex flex-col justify-center">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                    {(() => { const Icon = keyDifferences[1].icon; return <Icon aria-hidden="true" className="size-6 text-white" />; })()}
                                </div>
                                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                                    {keyDifferences[1].name}
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                                    {keyDifferences[1].description}
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:outline-white/15" />
                    </div>

                    {/* Card 3: Précision et expertise française */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-bl-4xl dark:bg-gray-800" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-bl-[2rem]">
                            <div className="p-10 flex-1 flex flex-col justify-center">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                    {(() => { const Icon = keyDifferences[2].icon; return <Icon aria-hidden="true" className="size-6 text-white" />; })()}
                                </div>
                                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                                    {keyDifferences[2].name}
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                                    {keyDifferences[2].description}
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:outline-white/15" />
                    </div>
                    
                    {/* Card 4: Sécurité et souveraineté */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                            <div className="p-10 flex-1 flex flex-col justify-center">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                    {(() => { const Icon = keyDifferences[3].icon; return <Icon aria-hidden="true" className="size-6 text-white" />; })()}
                                </div>
                                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white">
                                    {keyDifferences[3].name}
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                                    {keyDifferences[3].description}
                                </p>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:outline-white/15" />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Testimonial section */}
        <section id="security" className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] dark:opacity-10" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center dark:bg-gray-900 dark:shadow-indigo-500/5 dark:ring-white/5" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <img
                    alt="Logo client"
                    src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg"
                    className="mx-auto h-12 dark:hidden"
                />
                <img
                    alt="Logo client"
                    src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-400.svg"
                    className="mx-auto h-12 not-dark:hidden"
                />
                <figure className="mt-10">
                <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 dark:text-white">
                    <p>
                    « Compte rendu envoyé au client en 10 minutes, tâches claires pour toute l’équipe. On a arrêté les prises de notes à la main. »
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <img
                        alt="Sophie L."
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="mx-auto size-10 rounded-full"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900 dark:text-white">Sophie L.</div>
                    <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900 dark:fill-white">
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="text-gray-600 dark:text-gray-400">Cheffe de projet, agence conseil</div>
                    </div>
                </figcaption>
                </figure>
            </div>
        </section>

        {/* Pricing section */}
        <div id="pricing" className="py-24 sm:pt-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Tarifs</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                Des forfaits simples et transparents
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
              Tous nos forfaits incluent une garantie de 30 jours satisfait ou remboursé. Testez en choisissant le plan qui vous convient.
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
                          Plus choisi
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm/6 text-gray-600 dark:text-gray-400">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {tier.priceMonthly}
                      </span>
                      {tier.priceMonthly !== 'Sur Devis' && (
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
                        ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400'
                        : 'text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300 dark:bg-white/10 dark:text-white dark:inset-ring-white/5 dark:hover:bg-white/20 dark:hover:inset-ring-white/5 dark:focus-visible:outline-white/75',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500',
                    )}
                  >
                    {tier.name === 'Entreprise' ? 'Nous contacter' : 'Choisir ce plan'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div id="faq" className="mx-auto max-w-2xl px-6 pb-8 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Questions fréquentes
          </h2>
          <dl className="mt-20 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5 dark:text-white">{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base/7 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div id="contact" className="relative -z-10 mt-32 px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:top-auto sm:right-[calc(50%-6rem)] sm:bottom-0 sm:translate-y-0 sm:justify-end"
          >
            <div
              style={{
                clipPath:
                  'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)',
              }}
              className="aspect-1108/632 w-277 flex-none bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              Prêt à décupler votre productivité ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">
             Laissez notre IA faire le travail. Créez votre compte et testez nos fonctionnalités sans risque avec notre garantie de 30 jours.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#pricing"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              >
                Créez mon compte
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute top-full right-0 left-1/2 -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
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

