// Gemini
'use client'

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// --- CONSTANTS & DATA ---
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Tarifs', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
];

const footerNavigation = {
    solutions: [
        { name: 'Comment ça marche', href: '/#how-it-works' },
        { name: 'Tarifs', href: '/#pricing' },
        { name: 'FAQ', href: '/#faq' },
        { name: 'Contact', href: 'mailto:bonjour@audioentexte.com' },
    ],
    legal: [
        { name: 'CGU', href: '/terms-and-conditions' },
        { name: 'Confidentialité', href: '/privacy-policy' },
        { name: 'Contrat de traitement (DPA)', href: '#' },
    ],
};


// --- UI COMPONENTS ---

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-900/10">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AudioEnTexte</span>
            <img alt="AudioEnTexte" src="/audio-en-texte.png" className="h-10 w-auto" />
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
            href="/onboarding"
            className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Essayer aujourd'hui
          </a>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-x-4 lg:hidden">
            <a
                href="/onboarding"
                className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white text-center shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                Essayer
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

const Footer = () => (
    <footer className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16 dark:border-white/10">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div>
                    <img alt="AudioEnTexte" src="/audio-en-texte.png" className="h-10 w-auto" />
                    <p className="text-sm text-slate-600 mt-4">Compte rendu de réunion parfait, sans prendre de notes.</p>
                </div>
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
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
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
             <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                <p className="text-xs leading-5 text-gray-500">&copy; 2024 AudioEnTexte. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
);

const TermsContent = () => (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <p className="text-base font-semibold leading-7 text-cyan-600">Dernière mise à jour : 26 Mars 2025</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conditions Générales d'Utilisation</h1>
            <div className="mt-10 max-w-2xl">
                <p>
                    Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique
                    des modalités de mise à disposition du site et des services par AudioEnTexte et de définir les conditions
                    d’accès et d’utilisation des services par « l'Utilisateur ».
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 1 : Mentions légales</h2>
                <p className="mt-6">
                    L'édition du site AudioEnTexte est assurée par la Société AudioEnTexte,
                    immatriculée au RCS de Paris sous le numéro 840376487, dont le siège social est situé au 56 avenue Leclerc, 69007 Lyon.
                    Adresse e-mail : bonjour@audioentexte.com.
                    Le Directeur de la publication est : Charles Murillon.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 2 : Accès au site</h2>
                <p className="mt-6">
                    Le site AudioEnTexte permet à l'Utilisateur un accès gratuit aux services suivants : transcription audio,
                    génération de comptes rendus, partage de documents. Le site est accessible gratuitement en tout lieu à tout
                    Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service
                    (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 3 : Collecte des données</h2>
                <p className="mt-6">
                    Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect
                    de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
                    et aux libertés. Pour plus d'informations, consultez notre Politique de Confidentialité.
                </p>
                <p className="mt-6">
                    L'Utilisateur conserve la pleine propriété de ses données. AudioEnTexte ne revend ni ne réutilise les contenus
                    téléchargés par l'Utilisateur à d'autres fins que l'exécution du service.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 4 : Propriété intellectuelle</h2>
                <p className="mt-6">
                    Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
                    d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                    L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des
                    différents contenus.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 5 : Responsabilité</h2>
                <p className="mt-6">
                    Les sources des informations diffusées sur le site AudioEnTexte sont réputées fiables mais le site ne garantit pas
                    qu’il soit exempt de défauts, d’erreurs ou d’omissions. Le service de transcription est fourni à titre indicatif.
                    La précision de la transcription et du compte rendu peut varier en fonction de la qualité de l'audio. AudioEnTexte
                    ne saurait être tenu pour responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 6 : Liens hypertextes</h2>
                <p className="mt-6">
                    Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces liens,
                    il sortira du site AudioEnTexte. Ce dernier n’a pas de contrôle sur les pages web sur lesquelles aboutissent ces
                    liens et ne saurait, en aucun cas, être responsable de leur contenu.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Article 7 : Droit applicable et juridiction compétente</h2>
                <p className="mt-6">
                    La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né
                    entre les parties, les tribunaux français seront seuls compétents pour en connaître. Pour toute question relative
                    à l’application des présentes CGU, vous pouvez joindre l’éditeur aux coordonnées inscrites à l’ARTICLE 1.
                </p>
            </div>
        </div>
    </div>
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

export default function TermsAndConditionsPage() {
  return (
    <div>
      <BackgroundGradient />
      <Header />
      <div className="relative isolate">
        <main>
          <TermsContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}