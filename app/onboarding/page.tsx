"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Fonctions utilitaires ---

// NOUVEAU : Liste des fournisseurs d'e-mails gratuits à bloquer.
// J'ai inclus les fournisseurs internationaux courants ainsi que les plus populaires en France.
const freeEmailProviders = [
  // Global
  'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'outlook.com', 'icloud.com',
  'live.com', 'msn.com', 'protonmail.com', 'gmx.com', 'yandex.com', 'mail.com',
  'zoho.com',
  // France
  'orange.fr', 'sfr.fr', 'free.fr', 'laposte.net', 'bbox.fr', 'wanadoo.fr', 'live.fr', 'hotmail.fr', 'yahoo.fr', 'outlook.fr', 'gmx.fr', 'club-internet.fr '
];

/**
 * NOUVEAU : Fonction de validation pour les e-mails professionnels.
 * @param email L'adresse e-mail à valider.
 * @returns `true` si l'e-mail a un format valide ET n'est pas dans la liste des fournisseurs gratuits.
 */
const isProfessionalEmail = (email: string): boolean => {
  // 1. Vérification basique du format de l'e-mail.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }
  // 2. Extraction du nom de domaine.
  const domain = email.split('@')[1].toLowerCase();
  
  // 3. Vérification si le domaine est dans notre liste de fournisseurs gratuits.
  return !freeEmailProviders.includes(domain);
};


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

// --- Types ---
type Step = 'details' | 'questionJob' | 'questionSize' | 'done';

// --- Composant Principal ---
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // NOUVEAU : État dédié pour l'erreur de l'e-mail pour une meilleure expérience utilisateur.
  const [emailError, setEmailError] = useState<string | null>(null);

  // --- Fonctions de soumission (mises à jour) ---

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null); // Réinitialiser le message d'erreur général

    // MISE À JOUR : Validation de l'e-mail professionnel avant tout.
    if (!isProfessionalEmail(email)) {
      setEmailError("Veuillez utiliser une adresse e-mail professionnelle.");
      // On arrête la soumission ici.
      return; 
    }

    if (!firstName || !lastName || !companyName || !email) {
      setErrorMsg("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    
    // Le reste de la fonction est inchangé...
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

      // ... tracking events ...
      
      sessionStorage.setItem('onboardingEmail', email);
      setStep('questionJob');
    } catch (err: any) {
      setErrorMsg(err.message || "Oups, une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }
  
  /**
   * NOUVEAU : Gère le changement de l'input email pour valider en temps réel.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Valider seulement s'il y a du texte, pour ne pas afficher d'erreur sur un champ vide.
    if (newEmail && !isProfessionalEmail(newEmail)) {
      setEmailError("Les e-mails personnels (gmail, outlook, etc.) ne sont pas acceptés.");
    } else {
      setEmailError(null); // Efface l'erreur si l'e-mail devient valide
    }
  };

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
            {/* Prénom, Nom, Entreprise (inchangés) */}
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

            {/* --- CHAMP EMAIL MODIFIÉ --- */}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Adresse e-mail professionnelle</label>
              <div className="mt-2">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  autoComplete="email" 
                  value={email} 
                  onChange={handleEmailChange} 
                  // MISE À JOUR : Classes conditionnelles pour le style visuel de l'erreur
                  className={`block w-full rounded-md border-0 bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset sm:text-sm/6 ${
                    emailError 
                    ? 'ring-red-500 focus:ring-red-500' 
                    : 'ring-gray-300 focus:ring-cyan-600'
                  }`}
                />
              </div>
              {/* NOUVEAU : Affichage du message d'erreur spécifique à l'e-mail */}
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>

            <div><button type="submit" disabled={loading} className="mt-6 flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50">{loading ? 'Création...' : 'Valider'}</button></div>
            {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
          </form>
        )}

        {/* Le reste des étapes est inchangé */}
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