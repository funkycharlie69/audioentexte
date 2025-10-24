// Indique que ce composant peut utiliser des hooks comme useState
'use client';

import { useState } from 'react';
// NOUVEAU: BanknotesIcon pour renforcer le thème de l'argent et du ROI
import { LightBulbIcon, UsersIcon, BanknotesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Le composant principal de la page
export default function SqueezePageVibrant() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email capturé : ${email}`);
    alert(`Merci ! Votre diagnostic va être envoyé à l'adresse : ${email}`);
    setEmail('');
  };

  return (
    // NOUVEAU: un fond blanc pur pour faire ressortir au maximum les couleurs vives
    <div className="bg-white min-h-screen font-sans">
      <main className="container mx-auto px-4 py-12 sm:py-20 max-w-3xl">

        {/* Section Principale (Hero) */}
        <div className="text-center">
          <img src="/aet2.png" alt="Logo AudioEnTexte" className="h-12 mx-auto mb-8" />
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Vos commerciaux sont une boîte noire ?
            <br/>
            {/* NOUVEAU: Titre avec un dégradé de verts pour un look SaaS moderne */}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Révélez enfin leur vrai potentiel.
            </span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez pourquoi vos meilleurs vendeurs surperforment (et comment le répliquer), sans passer des heures à réécouter des appels au hasard.
          </p>

          {/* Formulaire de Capture */}
          <form 
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre e-mail professionnel"
              required
              // NOUVEAU: Focus sur la nouvelle couleur de marque
              className="flex-grow w-full px-4 py-3 text-lg text-slate-900 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              // NOUVEAU: Bouton avec dégradé et transitions vives
              className="text-white font-semibold text-lg px-6 py-3 rounded-md shadow-lg 
                         bg-gradient-to-r from-emerald-500 to-teal-500 
                         hover:from-emerald-600 hover:to-teal-600
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                         transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Obtenir mon Plan d'Action
            </button>
          </form>
           <p className="mt-3 text-sm text-slate-500">100% gratuit - Recevez l'outil immédiatement par e-mail.</p>
        </div>

        {/* Section Problème (Agitation) */}
        <div className="mt-20 text-left bg-slate-50 p-8 rounded-xl shadow-lg ring-1 ring-slate-900/5">
          <h2 className="text-2xl font-bold text-slate-900 text-center">Le quotidien d'un Head of Sales en croissance...</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-4">
              {/* NOUVEAU: Icônes avec la nouvelle couleur */}
              <UsersIcon className="h-8 w-8 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Inconsistance des Résultats</h3>
                <p className="text-slate-600">Vous avez des stars, des moyens, et des nouveaux. Impossible de standardiser l'excellence et de rendre les revenus prévisibles.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <LightBulbIcon className="h-8 w-8 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Coaching Subjectif</h3>
                <p className="text-slate-600">Vos débriefings reposent sur l'intuition. Vous manquez de données concrètes pour prouver vos points et coacher efficacement.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              {/* NOUVEAU: Icône "argent" pour lier l'onboarding au coût */}
              <BanknotesIcon className="h-8 w-8 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Onboarding Coûteux et Lent</h3>
                <p className="text-slate-600">Chaque nouvelle recrue met 6 mois à être rentable. Un coût énorme et un frein pour votre objectif d'ARR.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Section Solution (Ce que vous recevez) */}
        <div className="mt-16 text-left">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Recevez votre "Diagnostic de Performance"
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-center">Un outil (Google Sheet) pour transformer un appel de vente en un plan de coaching ROIste en 15 minutes.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NOUVEAU: Effets de survol sur les cartes pour une page plus "vive" */}
            <div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 transition-all duration-300 hover:ring-emerald-400 hover:shadow-xl">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
              <h3 className="mt-3 font-semibold text-slate-800">Grille d'Analyse Objective</h3>
              <p className="mt-1 text-slate-600">Évaluez un appel sur des critères SaaS clés (qualification, démo, closing...) pour un feedback basé sur des faits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 transition-all duration-300 hover:ring-emerald-400 hover:shadow-xl">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
              <h3 className="mt-3 font-semibold text-slate-800">Matrice des Objections</h3>
              <p className="mt-1 text-slate-600">Identifiez les objections et évaluez l'efficacité de la réponse pour construire un "playbook" de vente.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 transition-all duration-300 hover:ring-emerald-400 hover:shadow-xl">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
              <h3 className="mt-3 font-semibold text-slate-800">Score de Performance</h3>
              <p className="mt-1 text-slate-600">Obtenez une note qui quantifie la qualité de l'appel et vous permet de suivre les progrès dans le temps.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 transition-all duration-300 hover:ring-emerald-400 hover:shadow-xl">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
              <h3 className="mt-3 font-semibold text-slate-800">Plan d'Action Immédiat</h3>
              <p className="mt-1 text-slate-600">À la fin, vous aurez identifié 1 à 2 axes de coaching concrets pour améliorer la performance dès demain.</p>
            </div>
          </div>
        </div>

        {/* Section Preuve Sociale */}
        <div className="mt-16">
          <figure className="bg-slate-900 text-white p-8 rounded-xl shadow-2xl">
            <blockquote className="text-center text-xl">
              {/* NOUVEAU: Copywriting du témoignage plus axé ARR */}
              <p>“Cet outil est une révélation. En analysant un seul appel de notre top vendeur, on a compris sa technique de closing et on l'a enseignée au reste de l'équipe. C'est un levier direct sur notre objectif d'ARR.”</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-4">
              {/* NOUVEAU: Placeholder avec la nouvelle identité visuelle */}
              <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">MG</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Mathieu G.</div>
                <div className="text-slate-300">Head of Sales @ ScaleUp SaaS</div>
              </div>
            </figcaption>
          </figure>
        </div>
        
        {/* Section CTA Final */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Prêt à construire une machine de vente ?</h2>
           <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Entrez votre e-mail pour recevoir votre outil d'analyse et réaliser votre premier coaching data-driven dans 5 minutes.
          </p>
          <form 
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre e-mail professionnel"
              required
              className="flex-grow w-full px-4 py-3 text-lg text-slate-900 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="text-white font-semibold text-lg px-6 py-3 rounded-md shadow-lg 
                         bg-gradient-to-r from-emerald-500 to-teal-500 
                         hover:from-emerald-600 hover:to-teal-600
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                         transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Obtenir mon Plan d'Action
            </button>
          </form>
        </div>
      </main>
      
      <footer className="text-center py-8 border-t border-slate-200">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} AudioEnTexte. Tous droits réservés.</p>
      </footer>
    </div>
  );
}