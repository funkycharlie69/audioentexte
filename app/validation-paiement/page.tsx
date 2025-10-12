// page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, SparklesIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

// Un composant interne pour gérer l'affichage des informations de manière conditionnelle
function ClientDataProvider({ children }: { children: React.ReactNode }) {
  // Ce "wrapper" permet d'utiliser les hooks de Next.js
  // sans suspendre le rendu de toute la page.
  return <>{children}</>;
}

export default function MaintenanceRefundPage() {
  // États pour stocker les informations du client
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Hook pour lire les paramètres de l'URL
  const searchParams = useSearchParams();

  useEffect(() => {
    // On récupère le prénom et l'email depuis l'URL à l'arrivée sur la page
    const clientName = searchParams.get('name');
    const clientEmail = searchParams.get('email');
    
    if (clientName) {
      // Met en majuscule la première lettre du prénom pour un rendu plus propre
      setName(clientName.charAt(0).toUpperCase() + clientName.slice(1));
    }
    if (clientEmail) {
      setEmail(clientEmail);
    }
  }, [searchParams]); // Se déclenche quand les searchParams sont disponibles

  return (
    <ClientDataProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
          
          {/* 1. Logo */}
          <img
            alt="AudioEnTexte Logo"
            src="/aet2.png"
            className="mx-auto h-12 w-auto"
          />

          {/* 1. Titre personnalisé et rassurant */}
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Information importante
          </h1>
          <p className="mt-6 text-base/7 text-slate-600">
            Suite à une demande beaucoup plus forte que prévu, nous mettons à niveau notre infrastructure pour garantir une expérience parfaite. L'application est donc temporairement en maintenance.
          </p>

          {/* 2. Preuve du remboursement */}
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-left">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-8 w-8 flex-shrink-0 text-cyan-600" />
              <h2 className="text-lg font-semibold text-slate-800">Votre remboursement est confirmé</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Nous avons initié le <strong className="text-slate-900">remboursement intégral et immédiat</strong> de votre paiement. Un email de confirmation de la part de Stripe va vous être envoyé.
              {email && (
                <span> Un email de confirmation de la part de Stripe va vous être envoyé à l'adresse <strong className="text-slate-900">{email}</strong>.</span>
              )}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Note : Le remboursement peut prendre 5 à 10 jours ouvrés pour apparaître sur votre relevé de compte, selon les délais de votre banque.
            </p>
          </div>

          {/* 3. Vision du futur pour maintenir l'enthousiasme */}
          <div className="mt-8 text-left">
             <div className="flex items-center gap-3">
               <SparklesIcon className="h-8 w-8 flex-shrink-0 text-cyan-600" />
               <h2 className="text-lg font-semibold text-slate-800">Ce qui vous attend</h2>
            </div>
             <p className="mt-3 text-sm text-slate-600">
               La nouvelle version sera plus rapide, plus fiable et prête à vous faire gagner encore plus de temps. Nous avons hâte de vous la faire découvrir !
             </p>
          </div>
          
          {/* 4 & 5. Action simple et offre améliorée */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-800">Un nouveau départ, avec nos excuses</h2>
            <p className="mt-2 text-base text-slate-600">
              Pour nous faire pardonner, une réduction de <strong className="text-slate-900">50% sur 3 mois</strong> sera <strong className="text-slate-900">automatiquement appliquée</strong> lors de votre réinscription via le lien personnel que nous vous enverrons.
            </p>
          </div>

          {/* 9. Preuve sociale */}
          <div className="mt-10 border-t border-b border-slate-200 py-8">
            <figure>
              <blockquote className="text-base text-slate-700">
                <p>“J'ai vraiment gagné des heures sur le suivi de mes projets !”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Enzo Benzoni</span> – Directeur Social Media, Agence Wild
              </figcaption>
            </figure>
          </div>

          {/* 10. Message de fin */}
          <p className="mt-8 text-sm text-slate-500">
            À très bientôt,
            <br />
            L'équipe AudioEnTexte
          </p>
        </div>
      </div>
    </ClientDataProvider>
  );
}