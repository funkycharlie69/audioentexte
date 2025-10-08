// Gemini
'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ShareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { CheckIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Comment ça marche', href: '#how-it-works' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
]

const testimonials = [
    {
      body: 'Compte rendu envoyé au client en 10 minutes, tâches claires pour toute l’équipe. On a arrêté les prises de notes à la main.',
      author: {
        name: 'Sophie L.',
        handle: 'Cheffe de projet, agence conseil',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: 'AudioEnTexte est devenu indispensable. C’est comme si je vivais dans le futur.',
      author: {
        name: 'John Borthwick',
        handle: 'Investisseur, Betaworks',
        imageUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: "L'addiction est réelle - à ce stade, je ne peux plus imaginer ma life sans. Puissant sans effort.",
      author: {
        name: 'Adriana Vitagliano',
        handle: 'VC, Firstminute',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
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
      'Compte rendu IA (modifiable)',
      'Partage (lien, Slack, email, Notion, etc.)',
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
      'Support prioritaire (jour ouvré)',
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
      'Accompagnement et formation',
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
]

const footerNavigation = {
  solutions: [
    { name: 'Scribe IA', href: '#features' },
    { name: 'Différences', href: '#differentiators' },
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
    { name: 'Confidentialité', href: '#' },
    { name: 'Contrat de traitement (DPA)', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // On applique le fond dégradé sur le conteneur principal de la page.
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">AudioEnTexte</span>
              <img
                alt="AudioEnTexte"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-slate-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#login" className="text-sm/6 font-semibold text-slate-900">
              Se connecter <span aria-hidden="true">&rarr;</span>
            </a>
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
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Se connecter
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      
      <div className="relative isolate">
        <main>
          {/* Hero section */}
          <div className="relative pt-14">
            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <h1 className="text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                    Compte rendu de réunion parfait, sans prendre de notes.
                  </h1>
                  <p className="mt-8 text-lg text-pretty text-slate-600 sm:text-xl/8">
                    Concentrez-vous sur la conversation, AudioEnTexte rédige pour vous un plan d'action clair et prêt à partager.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-x-6">
                    <a
                      href="#pricing"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Essayer aujourd'hui →
                    </a>
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  30 jours satisfait ou remboursé ・ Remboursement en 1 clic
                </p>
                </div>
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <img
                      alt="Capture d'écran de l'application montrant un compte rendu généré"
                      src="https://placehold.co/2432x1442/ffffff/374151?text=Apercu+app+ou+Compte+Rendu+Généré"
                      width={2432}
                      height={1442}
                      className="rounded-md shadow-2xl ring-1 ring-slate-900/10"
                    />
                  </div>
                </div>
              </div>
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
        </div>

          {/* How it works Section - Bento Grid */}
          <div id="how-it-works" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Comment ça marche</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  C'est comme un bloc-notes, mais qui transcrit et résume pour vous.
                </p>
              </div>
              <div className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-3 lg:grid-rows-2">
                {/* Box 1: Step 1 (Left, Large) */}
                <div className="lg:row-span-2 rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <PlayCircleIcon className="size-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">1. Enregistrez sans effort <br /> (en ligne & hors ligne)</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Lancez l'enregistrement sur Meet, Zoom, Teams, <strong>et même en personne</strong>. Pas de bot à inviter, on utilise le micro et la sortie audio de votre appareil.
                  </p>
                </div>
                
                {/* Box 2: Step 2 (Middle, Top) */}
                <div className="lg:col-start-2 rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <SparklesIcon className="size-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">2. Recevez un plan d'action</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Dès la fin de la réunion, recevez une synthèse professionnelle avec <strong>les décisions, les prochaines étapes et les responsables</strong>.
                  </p>
                </div>
                
                {/* Box 3: Step 3 (Middle, Bottom) */}
                <div className="lg:col-start-2 lg:row-start-2 rounded-3xl bg-white/60 p-8 ring-1 ring-black/5 shadow-lg backdrop-blur-lg flex flex-col">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <ShareIcon className="size-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-slate-900">3. Partagez instantanément</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Envoyez le compte rendu à votre équipe en un clic <strong>via Slack, Notion, par email ou simplement avec un lien</strong>.
                  </p>
                </div>
                
                {/* Box 4: Testimonial (Right, Large) */}
                <div className="mt-16 rounded-2xl p-8 text-center sm:mt-24">
                  <figure>
                    <blockquote className="text-lg font-medium leading-8 text-slate-900">
                        <p>“{testimonials[0].body}”</p>
                    </blockquote>
                    <figcaption className="mt-6">
                        <img
                            className="mx-auto h-10 w-10 rounded-full"
                            src={testimonials[0].author.imageUrl}
                            alt=""
                        />
                        <div className="mt-4 flex flex-col items-center justify-center space-y-1 text-base">
                            <div className="font-semibold text-slate-900">{testimonials[0].author.name}</div>
                            <div className="text-slate-600">{testimonials[0].author.handle}</div>
                        </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing section */}
          <div id="pricing" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Tarifs</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl">
                  Un tarif simple et transparent
                </p>
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-slate-600">
                Essayez dès aujourd'hui avec notre garantie de 30 jours satisfait ou remboursé.
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
                        <h3
                          id={tier.id}
                          className={classNames(
                            tier.mostPopular ? 'text-indigo-600' : 'text-slate-900',
                            'text-lg/8 font-semibold',
                          )}
                        >
                          {tier.name}
                        </h3>
                        {tier.mostPopular ? (
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                            Plus choisi
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-4 text-sm/6 text-slate-600">{tier.description}</p>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-semibold tracking-tight text-slate-900">
                          {tier.priceMonthly}
                        </span>
                        {tier.priceMonthly !== 'Sur Devis' && (
                          <span className="text-sm/6 font-semibold text-slate-600">/mois</span>
                        )}
                      </p>
                      <ul role="list" className="mt-8 space-y-3 text-sm/6 text-slate-600">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              aria-hidden="true"
                              className="h-6 w-5 flex-none text-indigo-600"
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
                          ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                          : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                        'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                      )}
                    >
                      {tier.name === 'Entreprise' ? 'Nous contacter' : 'Choisir ce plan'}
                    </a>
                  </div>
                ))}
              </div>
              <figure className="mt-16 rounded-2xl p-8 text-center sm:mt-24">
                  <blockquote className="text-lg font-medium leading-8 text-slate-900">
                      <p>“{testimonials[1].body}”</p>
                  </blockquote>
                  <figcaption className="mt-6">
                      <img
                          className="mx-auto h-10 w-10 rounded-full"
                          src={testimonials[1].author.imageUrl}
                          alt=""
                      />
                      <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                          <div className="font-semibold text-slate-900">{testimonials[1].author.name}</div>
                          <div className="text-slate-600">{testimonials[1].author.handle}</div>
                      </div>
                  </figcaption>
              </figure>
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
          <figure className="mt-16 rounded-2xl p-8 text-center sm:mt-24">
                  <blockquote className="text-lg font-medium leading-8 text-slate-900">
                      <p>“{testimonials[2].body}”</p>
                  </blockquote>
                  <figcaption className="mt-6">
                      <img
                          className="mx-auto h-10 w-10 rounded-full"
                          src={testimonials[2].author.imageUrl}
                          alt=""
                      />
                      <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                          <div className="font-semibold text-slate-900">{testimonials[2].author.name}</div>
                          <div className="text-slate-600">{testimonials[2].author.handle}</div>
                      </div>
                  </figcaption>
              </figure>
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
    </div>
  )
}
