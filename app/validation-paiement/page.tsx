// page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

// Le composant wrapper reste inchangé
function ClientDataProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function MaintenanceRefundPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const clientName = searchParams.get('name');
    const clientEmail = searchParams.get('email');
    
    if (clientName) {
      setName(clientName.charAt(0).toUpperCase() + clientName.slice(1));
    }
    if (clientEmail) {
      setEmail(clientEmail);
    }
  }, [searchParams]);

  return (
    <ClientDataProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
          
          <img
            alt="AudioEnTexte Logo"
            src="/aet2.png"
            className="mx-auto h-12 w-auto"
          />

          {/* --- CHANGEMENT 1 : Titre et introduction personnalisés et empathiques --- */}
          {/* On passe d'un titre froid à un message de bienvenue qui prend immédiatement la responsabilité. */}
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Merci pour votre confiance, {name || 'cher client'}
          </h1>
          <p className="mt-6 text-base/7 text-slate-600">
            <strong>Pour être totalement transparent</strong>, votre enthousiasme a dépassé nos prévisions les plus optimistes. Pour garantir une expérience parfaite, nous effectuons une mise à niveau majeure. Je suis sincèrement désolé pour ce faux départ.
          </p>

          {/* --- CHANGEMENT 2 : Bloc de remboursement reformulé pour être plus proactif --- */}
          {/* On montre que c'est la PREMIÈRE chose que vous avez faite, ce qui prouve que le client est la priorité. */}
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 text-left">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-8 w-8 flex-shrink-0 text-cyan-600" />
              <h2 className="text-lg font-semibold text-slate-800">Votre confiance est notre priorité</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              La première chose que nous avons faite a été d'initier le <strong className="text-slate-900">remboursement intégral et immédiat</strong> de votre paiement.
              {email ? (
                <span> Un email de confirmation de Stripe est en route vers <strong className="text-slate-900">{email}</strong>.</span>
              ) : (
                <span> Un email de confirmation de la part de Stripe va vous être envoyé.</span>
              )}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Note : Le remboursement peut prendre 5 à 10 jours ouvrés pour apparaître sur votre relevé, selon les délais de votre banque.
            </p>
          </div>

          {/* --- CHANGEMENT 3 : Vision du futur plus inspirante --- */}
          {/* On vend le bénéfice final, pas juste des features techniques. */}
          <div className="mt-8 text-left">
             <div className="flex items-center gap-3">
               <SparklesIcon className="h-8 w-8 flex-shrink-0 text-cyan-600" />
               <h2 className="text-lg font-semibold text-slate-800">Alors, que va-t-il se passer ?</h2>
            </div>
             <p className="mt-3 text-sm text-slate-600">
               Nous vous préparons une expérience exceptionnelle. Imaginez des comptes rendus encore plus précis, générés en un temps record. Vous serez parmi les premiers prévenus dès que tout sera prêt.
             </p>
          </div>
          
          {/* --- CHANGEMENT 4 : Offre reformulée comme un geste personnel --- */}
          <div className="mt-8 text-left ">
            <div className="flex items-center gap-3">
               <RocketLaunchIcon className="h-8 w-8 flex-shrink-0 text-cyan-600" />
               <h2 className="text-lg font-semibold text-slate-800">Pour nous faire pardonner et repartir du bon pied</h2>
            </div>
            <p className="mt-2 text-base text-slate-600">
              Nous avons déjà crédité votre compte d'une offre de "re-bienvenue". Une réduction de <strong className="text-slate-900">50% sur 3 mois</strong> sera automatiquement appliquée via le lien personnel que nous vous enverrons par email.
            </p>
          </div>

          {/* Le témoignage est une excellente idée, on le garde pour ré-ancrer la valeur perçue */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <figure>
              <blockquote className="text-base text-slate-700">
                <p>“Compte rendu envoyé en 10 minutes, tâches claires pour toute l’équipe. On a arrêté les prises de notes à la main.”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Marc Biessy</span> – Co-Fondateur, Ops Clean
              </figcaption>
            </figure>
          </div>

          {/* --- CHANGEMENT 5 : Signature personnelle du fondateur --- */}
          {/* C'est le changement le plus important. Il transforme un message corporate en un engagement humain. */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            {/* Vous pouvez ajouter une petite photo de vous ici pour encore plus de personnalisation */}
            {/* <img src="/path-to-your-photo.jpg" alt="Charles, Fondateur" className="mx-auto h-16 w-16 rounded-full" /> */}
            <p className="mt-4 text-base font-semibold text-slate-800">
              Charles
            </p>
            <p className="text-sm text-slate-500">
              Fondateur, AudioEnTexte
            </p>
          </div>
        </div>
      </div>
    </ClientDataProvider>
  );
}