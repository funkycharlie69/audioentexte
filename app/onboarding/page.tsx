// page.tsx
"use client"

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

// --- CONSTANTES & FONCTIONS UTILES ---

// Les plans tarifaires (sans le plan "Entreprise")
const tiers = [
  {
    name: 'Solo',
    id: 'tier-solo',
    // Mettez ici le VRAI lien de paiement Stripe pour le plan Solo
    stripeLink: 'https://buy.stripe.com/dRm00j4ZYar1f7TbJb00000', 
    priceMonthly: '19€',
    description: 'Idéal pour freelances et indépendants.',
    features: [
      '1 utilisateur',
      '15h de réunion par mois',
      '+100 langues supportées',
      'Compte rendu professionnel (modifiable)',
      'Partage (lien, email)',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    // Mettez ici le VRAI lien de paiement Stripe pour le plan Pro
    stripeLink: 'https://buy.stripe.com/28E6oH0JIfLl0cZ00t00001',
    priceMonthly: '39€',
    description: 'Parfait pour les équipes agiles.',
    features: [
      'Tout dans Solo, plus :',
      'Réunions illimitées',
      'Dossiers partagés & modèles d’entreprise',
      'Rôles admin',
      'Support prioritaire (24H)',
      'Partage (lien, Slack, email, Notion, Asana, ClickUp, Monday)',
    ],
    mostPopular: true,
  },
];

// Fonction utilitaire pour gérer les classes CSS conditionnelles
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}


// --- COMPOSANT PRINCIPAL ---

// Le flux a maintenant une étape 'selectPlan'
type Step = 'details' | 'questionJob' | 'questionSize' | 'selectPlan' | 'done';

export default function OnboardingPage() {
  // --- États du composant ---
  const [step, setStep] = useState<Step>('details');
  
  // Données de l'utilisateur
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Réponses aux questions
  const [jobRole, setJobRole] = useState('');
  const [companySize, setCompanySize] = useState('');

  // États pour l'UX
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null); // Pour savoir quel bouton est en chargement


  // --- Fonctions de soumission ---

  /**
   * Étape 1: Soumission des détails initiaux.
   */
  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !companyName || !email) {
      setErrorMsg("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = { email, firstName, lastName, companyName, source: "lp-onboarding", userGroup: "waitlist", subscribed: true };
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Une erreur est survenue lors de l'inscription.");
      setSubmittedEmail(email);
      setStep('questionJob');
    } catch (err: any) {
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Étape 2: Sélection du poste.
   */
  function handleJobRoleSelect(role: string) {
    setJobRole(role);
    setStep('questionSize');
  }

  /**
   * Étape 3: Soumission de la taille de l'entreprise et passage au choix du plan.
   */
  async function handleCompanySizeSelect(size: string) {
    setCompanySize(size);
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = { email: submittedEmail, jobRole, companySize: size };
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour des informations.");
      
      // Au lieu d'aller à 'done', on va maintenant à 'selectPlan'
      setStep('selectPlan');

    } catch (err: any) {
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Étape 4: Sélection du plan et redirection vers Stripe.
   */
  async function handlePlanSelection(planId: string, stripeLink: string) {
    setSelectedPlanId(planId); // Pour l'état de chargement du bouton
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = { email: submittedEmail, selectedPlan: planId };
      // On met à jour le contact avec le plan choisi (optionnel mais recommandé)
      await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      
      // Redirection vers Stripe
      window.location.href = stripeLink;

      // Note: l'étape 'done' ne sera jamais atteinte car l'utilisateur est redirigé.
      // Vous pouvez la garder pour un autre flux (ex: si paiement réussi, Stripe redirige vers une page /merci)

    } catch (err: any) {
       setErrorMsg("Impossible de procéder au paiement. Veuillez réessayer.");
    } finally {
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
          {step === 'done' ? 'Bienvenue !' : 
           step === 'selectPlan' ? 'Choisissez votre plan' : 'Créer mon compte'}
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-4xl">
        
        {step !== 'done' && step !== 'selectPlan' && (
          <p className="text-center text-sm font-semibold text-gray-500 mb-6">
            {step === 'details' && ''}
            {step === 'questionJob' && 'Étape 2 sur 3'}
            {step === 'questionSize' && 'Étape 3 sur 3'}
          </p>
        )}

        <div className={step !== 'selectPlan' ? 'sm:max-w-sm mx-auto' : ''}>
          {/* ÉTAPE 1: DÉTAILS DU COMPTE */}
          {step === 'details' && (
             <form onSubmit={handleDetailsSubmit} className="space-y-2">
              {/* ... champs inchangés ... */}
              <div>
                <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">Prénom</label>
                <div className="mt-2"><input id="firstName" name="firstName" type="text" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"/></div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Nom</label>
                <div className="mt-2"><input id="lastName" name="lastName" type="text" required autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"/></div>
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm/6 font-medium text-gray-900">Entreprise</label>
                <div className="mt-2"><input id="companyName" name="companyName" type="text" required autoComplete="organization" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"/></div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Adresse email</label>
                <div className="mt-2"><input id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm/6"/></div>
              </div>
              <div><button type="submit" disabled={loading} className="mt-6 flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50">{loading ? 'Création...' : 'Valider'}</button></div>
              {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
            </form>
          )}

          {/* ÉTAPE 2: QUESTION SUR LE POSTE */}
          {step === 'questionJob' && (
            <div className="space-y-6"><fieldset><legend className="text-center text-base font-semibold text-gray-900">Quel est votre poste ?</legend><div className="mt-4 grid grid-cols-2 gap-3">{['Direction', 'Marketing', 'Ventes', 'Tech', 'RH', 'Autre'].map((role) => (<button key={role} onClick={() => handleJobRoleSelect(role)} className="cursor-pointer bg-white rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-900 hover:bg-gray-50">{role}</button>))}</div></fieldset></div>
          )}

          {/* ÉTAPE 3: QUESTION SUR LA TAILLE DE L'ENTREPRISE */}
          {step === 'questionSize' && (
            <div className="space-y-6"><fieldset><legend className="text-center text-base font-semibold text-gray-900">Quelle est la taille de votre entreprise ?</legend><div className="mt-4 grid grid-cols-2 gap-3">{['1-10', '11-50', '51-200', '200+'].map((size) => (<button key={size} onClick={() => handleCompanySizeSelect(size)} disabled={loading} className="cursor-pointer bg-white rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50">{loading ? '...' : size}</button>))}</div></fieldset>{errorMsg && <p className="mt-4 text-center text-sm text-red-500">{errorMsg}</p>}</div>
          )}

          {/* ÉTAPE 4: SÉLECTION DU PLAN */}
          {step === 'selectPlan' && (
            <div>
                <p className="mx-auto max-w-2xl text-center text-lg/8 text-balance text-slate-600">
                    Gagnez 3-4h/semaine sur vos comptes rendus. <strong>Garantie de 30 jours satisfait ou remboursé en 1 clic.</strong>
                </p>
                <div className="isolate mx-auto mt-3 grid max-w-md grid-cols-1 gap-y-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {tiers.map((tier) => (
                        <div key={tier.id} className={classNames('flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg xl:p-10', tier.mostPopular ? 'lg:z-10' : 'lg:mt-8')}>
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 id={tier.id} className={classNames(tier.mostPopular ? 'text-cyan-600' : 'text-slate-900', 'text-lg/8 font-semibold')}>{tier.name}</h3>
                                    {tier.mostPopular && <p className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs/5 font-semibold text-cyan-600">Plus choisi</p>}
                                </div>
                                <p className="mt-4 text-sm/6 text-slate-600">{tier.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-semibold tracking-tight text-slate-900">{tier.priceMonthly}</span>
                                    <span className="text-sm/6 font-semibold text-slate-600">{tier.name === 'Solo' ? '/mois' : '/utilisateur/mois'}</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-slate-600">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-cyan-600" />
                                            {tier.name === 'Pro' ? <span className='font-bold'>{feature}</span> : feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => handlePlanSelection(tier.id, tier.stripeLink)}
                                disabled={loading}
                                aria-describedby={tier.id}
                                className={classNames('mt-8 block rounded-md px-3 py-2 text-center text-lg/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50', 
                                tier.mostPopular ? 'bg-cyan-600 text-white shadow-sm hover:bg-cyan-500' : 'text-cyan-600 ring-1 ring-inset ring-cyan-200 hover:ring-cyan-300')}>
                                {(loading && selectedPlanId === tier.id) ? 'Redirection...' : 'Choisir ce plan'}
                            </button>
                        </div>
                    ))}
                </div>
                 {errorMsg && <p className="mt-8 text-center text-sm text-red-500">{errorMsg}</p>}
            </div>
          )}

          {/* ÉTAPE FINALE: CONFIRMATION (plus vraiment utilisée dans ce flux) */}
          {step === 'done' && (
            <div className="text-center"><p className="text-gray-900">Votre compte a bien été créé. Merci !</p><p className="mt-2 text-sm text-gray-600">Vous allez recevoir un email de confirmation à <span className="font-semibold">{submittedEmail}</span>.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}