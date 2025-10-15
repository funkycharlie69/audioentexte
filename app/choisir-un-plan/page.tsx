"use client"

import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

// --- CONSTANTES & FONCTIONS UTILES ---
const tiers = [
  {
    name: 'Solo',
    id: 'tier-solo',
    stripeLink: 'https://buy.stripe.com/dRm00j4ZYar1f7TbJb00000', 
    priceMonthly: '19€',
    description: 'Idéal pour freelances et indépendants.',
    features: [ '1 utilisateur', '15h de réunion par mois', '+100 langues supportées', 'Compte rendu professionnel (modifiable)', 'Partage (lien, email)' ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    stripeLink: 'https://buy.stripe.com/28E6oH0JIfLl0cZ00t00001',
    priceMonthly: '39€',
    description: 'Parfait pour les équipes agiles.',
    features: [ 'Tout dans Solo, plus :', 'Réunions illimitées', 'Dossiers partagés & modèles d’entreprise', 'Rôles admin', 'Support prioritaire (24H)', 'Partage (lien, Slack, email, Notion, Asana, ClickUp, Monday)' ],
    mostPopular: true,
  },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- Composant Principal ---
export default function ChoosePlanPage() {
  // NOUVEAU : État pour gérer l'affichage (formulaire email OU plans)
  const [step, setStep] = useState<'email' | 'plans'>('email'); 
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    // Vérifie si l'email existe déjà depuis le parcours d'onboarding
    const emailFromStorage = sessionStorage.getItem('onboardingEmail');
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
      setStep('plans'); // Si oui, on passe directement à l'affichage des plans
    }
    // Si non, l'état initial 'email' reste, affichant le formulaire
  }, []);

  // NOUVEAU : Gère la soumission de l'email pour l'accès direct
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    if (!userEmail) {
      setErrorMsg("Veuillez entrer une adresse email valide.");
      return;
    }

    // Ici, vous pouvez optionnellement déjà créer/mettre à jour le contact dans Loops
    // C'est une bonne pratique pour capturer le lead même s'il ne choisit pas de plan.
    setLoading(true);
    try {
        const payload = { email: userEmail, source: "direct-to-pricing" };
        await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        sessionStorage.setItem('onboardingEmail', userEmail); // On sauvegarde l'email pour la session
        setStep('plans'); // On affiche les plans
    } catch (err) {
        setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    } finally {
        setLoading(false);
    }
  }


  async function handlePlanSelection(planId: string, planName: string, stripeLink: string) {
    if (!userEmail) {
        setErrorMsg("Votre email n'a pas été trouvé. Veuillez recommencer.");
        return;
    }
    setSelectedPlanId(planId);
    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = { 
        email: userEmail, 
        selectedPlan: planName
      };
      await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      window.location.href = stripeLink;
    } catch (err: any) {
       setErrorMsg("Impossible de procéder au paiement. Veuillez réessayer.");
       setLoading(false);
       setSelectedPlanId(null);
    }
  }

  // --- Rendu du composant ---
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="aet2.png" className="mx-auto h-10 w-auto" />
        <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {step === 'email' ? 'Identifiez-vous pour continuer' : 'Choisissez votre plan'}
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* NOUVEAU : Affichage conditionnel */}
        {step === 'email' ? (
          <div className="sm:max-w-sm mx-auto">
            <p className="text-center text-slate-600 mb-6">
              Pour associer un plan à votre compte, veuillez entrer votre adresse email.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Adresse email</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" required autoComplete="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"/>
                </div>
              </div>
              <div>
                <button type="submit" disabled={loading} className="mt-2 flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-500 disabled:opacity-50">
                  {loading ? 'Vérification...' : 'Continuer'}
                </button>
              </div>
              {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
            </form>
          </div>
        ) : (
          <div>
            <p className="mx-auto max-w-2xl text-center text-lg/8 text-balance text-slate-600">
                Dernière étape ! Gagnez 3-4h/semaine sur vos comptes rendus. <strong>Garantie de 30 jours satisfait ou remboursé en 1 clic.</strong>
            </p>
            <div className="isolate mx-auto mt-3 grid max-w-md grid-cols-1 gap-y-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {tiers.map((tier) => (
                <div key={tier.id} className={classNames('flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg xl:p-10', tier.mostPopular ? 'lg:z-10' : 'lg:mt-8')}>
                  <div>
                    <div className="flex items-center justify-between gap-x-4"><h3 id={tier.id} className={classNames(tier.mostPopular ? 'text-cyan-600' : 'text-slate-900', 'text-lg/8 font-semibold')}>{tier.name}</h3>{tier.mostPopular && <p className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs/5 font-semibold text-cyan-600">Plus choisi</p>}</div>
                    <p className="mt-4 text-sm/6 text-slate-600">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1"><span className="text-4xl font-semibold tracking-tight text-slate-900">{tier.priceMonthly}</span><span className="text-sm/6 font-semibold text-slate-600">{tier.name === 'Solo' ? '/mois' : '/utilisateur/mois'}</span></p>
                    <ul role="list" className="mt-8 space-y-3 text-sm/6 text-slate-600">{tier.features.map((feature) => (<li key={feature} className="flex gap-x-3"><CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-cyan-600" />{tier.name === 'Pro' ? <span className='font-bold'>{feature}</span> : feature}</li>))}</ul>
                  </div>
                  <button 
                    onClick={() => handlePlanSelection(tier.id, tier.name, tier.stripeLink)} 
                    disabled={loading || !userEmail} 
                    aria-describedby={tier.id} 
                    className={classNames('mt-8 block rounded-md px-3 py-2 text-center text-lg/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50', tier.mostPopular ? 'bg-cyan-600 text-white shadow-sm hover:bg-cyan-500' : 'text-cyan-600 ring-1 ring-inset ring-cyan-200 hover:ring-cyan-300')}>
                    {(loading && selectedPlanId === tier.id) ? 'Redirection...' : 'Choisir ce plan'}
                  </button>
                </div>
              ))}
            </div>
            {errorMsg && <p className="mt-8 text-center text-sm text-red-500">{errorMsg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

