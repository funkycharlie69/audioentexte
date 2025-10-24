// Fichier : /pages/playbook.tsx
'use client';

import { useState, FormEvent } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

// --- COMPOSANT DE LA SQUEEZE PAGE AVEC UN BRANDING VIF ET PREMIUM ---
// Le thème sombre et le vert émeraude sont conçus pour évoquer la performance,
// la technologie et la croissance financière, en parfaite adéquation avec la cible "Antoine".

export default function SqueezePage() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    console.log('Soumission de l\'email :', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormState('success');
  };

  return (
    // MARKETING: Le fond sombre (dark mode) est une norme dans les SaaS B2B modernes.
    // Il est perçu comme premium et met en valeur le contenu.
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      
      <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-emerald-900/20 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* === COLONNE DE GAUCHE : LE VISUEL HYPNOTIQUE === */}
        <div className="relative p-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
          {/* MARKETING: Un effet de "glow" subtil rend le produit plus désirable et technologique. */}
          <div className="absolute -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/30 rounded-full blur-3xl" />
          
          <img 
            src="/playbook-cover.png" // REMPLACEZ PAR VOTRE IMAGE
            alt="Couverture du Playbook pour Cloner vos Meilleurs Vendeurs"
            className="w-[350px] h-auto object-cover transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl z-10"
          />
        </div>

        {/* === COLONNE DE DROITE : LA PERSUASION === */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          
          {/* --- TITRE ET SOUS-TITRE --- */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Vos commerciaux sont une 'boîte noire' ?
          </h1>
          {/* MARKETING: Le dégradé de texte sur le mot clé principal attire l'attention et renforce le branding. */}
          <p className="mt-4 text-lg text-slate-300">
            Découvrez la méthode pour enfin <span className="text-emerald-400 font-semibold">cloner la performance</span> de vos superstars et construire la machine de vente prévisible que votre board exige.
          </p>
          
          {/* --- BÉNÉFICES CLÉS --- */}
          <ul className="mt-8 space-y-4">
            <BenefitItem text="Identifiez l'écart de performance EXACT entre vos stars et le reste de l'équipe." />
            <BenefitItem text="Une méthode simple pour auditer n'importe quel appel, même sans être un expert du coaching." />
            <BenefitItem text="Transformez vos observations en 3 actions de coaching concrètes et immédiates." />
          </ul>

          {/* --- LE FORMULAIRE DE CAPTURE --- */}
          <div className="mt-10">
            {formState === 'success' ? (
              // MARKETING: Le message de succès est intégré au design, renforçant la confiance.
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-lg text-center font-semibold">
                Excellent ! Votre guide est en route vers votre boîte de réception.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 sr-only">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* MARKETING: Les champs de formulaire en mode sombre maintiennent la cohérence du design. */}
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-slate-600 bg-slate-700 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3 flex-grow placeholder:text-slate-400"
                    placeholder="Votre email professionnel"
                    required
                  />
                  {/* MARKETING: Le bouton est l'élément le plus vif. Il crie "CLIQUEZ-MOI". */}
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="bg-emerald-500 text-slate-900 font-bold text-lg rounded-md px-6 py-3 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {formState === 'loading' ? 'Envoi...' : 'Recevoir mon Playbook →'}
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  100% gratuit. Zéro spam. Désinscription en un clic.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}

// --- SOUS-COMPOSANT POUR LES BÉNÉFICES (adapté au thème sombre) ---
const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    {/* MARKETING: L'icône reprend la couleur d'accent pour une cohérence visuelle parfaite. */}
    <CheckCircleIcon className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
    <span className="text-slate-300">{text}</span>
  </li>
);