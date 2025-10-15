"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

// --- Fonctions utilitaires (inchangées) ---
function getStoredTrackingData() {
  if (typeof window === 'undefined') return {};
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "landingPage"];
  const data: Record<string, string> = {};
  keys.forEach((key) => {
    const value = sessionStorage.getItem(key);
    if (value) data[key] = value;
  });
  return data;
}

// --- Types (simplifiés pour cette page) ---
type Step = 'details' | 'questionJob' | 'questionSize' | 'done';

// --- Composant Principal ---
export default function OnboardingPage() {
  const router = useRouter(); // Initialize router
  const [step, setStep] = useState<Step>('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- Fonctions de soumission ---

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !companyName || !email) {
      setErrorMsg("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const trackingData = getStoredTrackingData();
      const payload = { 
        email, 
        firstName, 
        lastName, 
        companyName, 
        source: "lp-onboarding-form", 
        userGroup: "waitlist", 
        subscribed: true,
        ...trackingData
      };
      
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Une erreur est survenue lors de l'inscription.");

      // Fire tracking events
      try {
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17593383683/v7uvCP-kl6AbEIP2lsVB",
            value: 1.0,
            currency: "EUR",
          });
        }
        const eventId = (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Date.now());
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead", { content_name: "Onboarding Lead", value: 0, currency: "EUR", ...trackingData }, { eventID: eventId });
        }
      } catch (analyticsError) {
        console.warn("Analytics Error:", analyticsError);
      }
      
      // CRUCIAL : Save email to sessionStorage for the next page
      sessionStorage.setItem('onboardingEmail', email);

      setStep('questionJob');
    } catch (err: any) {
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function handleJobRoleSelect(role: string) {
    setJobRole(role);
    setStep('questionSize');
  }

  async function handleCompanySizeSelect(size: string) {
    setLoading(true);
    setErrorMsg(null);
    try {
      const userEmail = sessionStorage.getItem('onboardingEmail');
      if (!userEmail) throw new Error("Email non trouvé, veuillez recommencer.");

      const payload = { email: userEmail, jobRole, companySize: size };
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour des informations.");
      
      // Redirect to the plan selection page
      router.push('/choisir-un-plan');

    } catch (err: any) {
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  // --- Rendu du composant ---
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="aet2.png" className="mx-auto h-10 w-auto" />
        <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Créer mon compte
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center text-sm font-semibold text-gray-500 mb-6">
          {step === 'details' && 'Étape 1 sur 3'}
          {step === 'questionJob' && 'Étape 2 sur 3'}
          {step === 'questionSize' && 'Étape 3 sur 3'}
        </p>
        
        {step === 'details' && (
           <form onSubmit={handleDetailsSubmit} className="space-y-2">
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
        {step === 'questionJob' && (
          <div className="space-y-6"><fieldset><legend className="text-center text-base font-semibold text-gray-900">Quel est votre poste ?</legend><div className="mt-4 grid grid-cols-2 gap-3">{['Direction', 'Marketing', 'Ventes', 'Tech', 'RH', 'Autre'].map((role) => (<button key={role} onClick={() => handleJobRoleSelect(role)} className="cursor-pointer bg-white rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-900 hover:bg-gray-50">{role}</button>))}</div></fieldset></div>
        )}
        {step === 'questionSize' && (
          <div className="space-y-6"><fieldset><legend className="text-center text-base font-semibold text-gray-900">Quelle est la taille de votre entreprise ?</legend><div className="mt-4 grid grid-cols-2 gap-3">{['1-10', '11-50', '51-200', '200+'].map((size) => (<button key={size} onClick={() => handleCompanySizeSelect(size)} disabled={loading} className="cursor-pointer bg-white rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50">{loading ? 'Finalisation...' : size}</button>))}</div></fieldset>{errorMsg && <p className="mt-4 text-center text-sm text-red-500">{errorMsg}</p>}</div>
        )}
      </div>
    </div>
  );
}
