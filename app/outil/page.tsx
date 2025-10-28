// app/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, Download, Zap, Check, ArrowLeft, RotateCcw } from 'lucide-react';

// --- DATA STRUCTURES & STATIC CONTENT ---
// This is your expertise, meticulously integrated from your document.

interface Criterion {
  id: string;
  text: string;
  guidance: string;
}

interface Section {
  title: string;
  criteria: Criterion[];
}

const auditSections: Section[] = [
  {
    title: "1. PRÉPARATION & INTRODUCTION",
    criteria: [
      { id: "s1c1", text: "L'objectif de l'appel a-t-il été clairement énoncé (agenda) ?", 
        guidance: `1 = Pas d'agenda. Le commercial improvise.\n2 = Agenda énoncé mais non validé.\n3 = Agenda collaboratif. Le contrôle est établi.` },
      { id: "s1c2", text: "Le commercial a-t-il démontré une connaissance préalable du prospect ?", 
        guidance: `1 = Question générique ("Alors, parlez-moi de votre entreprise.")\n2 = Fait référence à une info évidente (site web).\n3 = Démontre une recherche approfondie et pose une question pertinente.` },
      { id: "s1c3", text: "Le ton est-il confiant et établit-il l'autorité ?", 
        guidance: `1 = Hésitant, utilise des mots faibles ('juste', 'un peu').\n2 = Ton 'commercial' standard, positif mais en surface.\n3 = Posture de consultant, ton posé, assume les silences.` },
    ],
  },
  {
    title: "2. PHASE DE DÉCOUVERTE (La phase la plus critique)",
    criteria: [
      { id: "s2c1", text: "A-t-il posé des questions sur les douleurs/problèmes actuels ('Pains') ?", 
        guidance: `1 = Questions factuelles sur la situation.\n2 = Questions sur les problèmes, mais reste en surface.\n3 = Explore les conséquences émotionnelles de la douleur.` },
      { id: "s2c2", text: "A-t-il creusé pour quantifier l'impact de ces problèmes (en €, temps, risque) ?", 
        guidance: `1 = Aucune quantification. Reste sur le qualitatif ('c'est long').\n2 = Tente de quantifier mais n'obtient pas de chiffre précis.\n3 = Obtient un chiffre précis (€, heures, %) et le fait valider.` },
      { id: "s2c3", text: "A-t-il validé le processus de décision & identifié les parties prenantes ?", 
        guidance: `1 = Aucune question sur le process. Suppose que l'interlocuteur est le seul décideur.\n2 = Pose la question 'Qui décide ?', mais ne creuse pas le 'comment'.\n3 = Cartographie le processus complet (qui, quoi, quand, comment).` },
      { id: "s2c4", text: "Le temps de parole est-il équilibré (le prospect parle > 50%) ?", 
        guidance: `1 = Monologue du commercial (>70% de temps de parole).\n2 = Équilibré (50/50). C'est une conversation.\n3 = Le prospect parle >60%. Le commercial mène.` },
      { id: "s2c5", text: "A-t-il reformulé les enjeux pour s'assurer de sa bonne compréhension ?", 
        guidance: `1 = Aucune reformulation.\n2 = Reformulation simple ('Donc, votre problème est X').\n3 = Reformulation à impact liant problème, coût et objectif.` },
    ],
  },
  {
    title: "3. DÉMONSTRATION & PITCH DE LA VALEUR",
    criteria: [
      { id: "s3c1", text: "La démo est-elle personnalisée en fonction de la découverte ?", 
        guidance: `1 = Démo standard 'tour du propriétaire'.\n2 = Mentionne un problème du prospect mais suit un script standard.\n3 = La structure de la démo est basée sur les douleurs citées.` },
      { id: "s3c2", text: "A-t-il connecté les fonctionnalités aux bénéfices/douleurs du prospect ?", 
        guidance: `1 = Langage de caractéristiques ('Ce bouton exporte en CSV').\n2 = Langage de bénéfices génériques ('...pour gagner du temps').\n3 = Langage de résolution de douleur ('...ce qui élimine les X heures perdues').` },
    ],
  },
  {
    title: "4. GESTION OBJECTIONS & PROCHAINES ÉTAPES",
    criteria: [
      { id: "s4c1", text: "Les objections sont-elles accueillies et comprises avant d'être traitées ?", 
        guidance: `1 = Réponse défensive et immédiate. Coupe la parole.\n2 = Laisse finir mais contre-argumente directement.\n3 = Accueille, explore, puis répond ('Excellente question. Qu'entendez-vous par...?').` },
      { id: "s4c2", text: "Les prochaines étapes sont-elles claires, mutuelles et datées ?", 
        guidance: `1 = Faux engagement ('Je vous envoie un mail', 'N'hésitez pas').\n2 = Propose une étape mais sans date/heure précise.\n3 = Fixe un RDV précis dans l'agenda avec un objectif clair.` },
    ],
  },
];

type Score = 1 | 2 | 3 | null;
interface AuditEntry {
  criterionId: string;
  superstarScore: Score;
  commercialScore: Score;
  superstarObservation: string;
  commercialObservation: string;
}

// --- Animation Wrapper Component ---
const MotionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- UI COMPONENTS ---

const WelcomeStep = ({ onStart, initialNames }: { onStart: (names: { superstar: string, commercial: string }) => void; initialNames: { superstar: string, commercial: string } }) => {
  const [names, setNames] = useState(initialNames);
  
  return (
    <MotionWrapper className="w-full max-w-2xl mx-auto text-center">
      <div className="mx-auto h-12 w-12 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-xs text-slate-500 font-bold">LOGO</div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800">AUDIT COMPARATIF DE PERFORMANCE COMMERCIALE</h1>
      <p className="mt-4 text-lg text-slate-600">Ouvrez la boîte noire de vos commerciaux en 2 minutes.</p>
      <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="space-y-6">
          <input type="text" value={names.superstar} onChange={(e) => setNames(prev => ({ ...prev, superstar: e.target.value }))} placeholder="Nom de votre Superstar" className="w-full px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" />
          <input type="text" value={names.commercial} onChange={(e) => setNames(prev => ({ ...prev, commercial: e.target.value }))} placeholder="Nom du Commercial à coacher" className="w-full px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" />
        </div>
        <button onClick={() => onStart(names)} className="mt-8 w-full bg-emerald-600 text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2">
          <span>Commencer l'Audit</span><ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </MotionWrapper>
  );
};

const GuidanceTooltip = ({ guidance }: { guidance: string }) => (
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-72 p-3 bg-slate-800 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-pre-line">
      <p className="font-bold text-sm mb-2">Guide de Notation :</p>
      <div className='text-xs' dangerouslySetInnerHTML={{ __html: guidance.replace(/(\d =)/g, '<span class="font-bold text-emerald-400">$1</span>') }}></div>
      <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 -mr-1"></div>
    </div>
  );

const CriterionCardV2 = ({ criterion, entry, onUpdate, names }: { criterion: Criterion; entry: AuditEntry; onUpdate: (updatedEntry: Partial<AuditEntry>) => void; names: { superstar: string, commercial: string } }) => {
    const [activeTab, setActiveTab] = useState<'superstar' | 'commercial'>('superstar');

    const ScoreButton = ({ score, target, onClick }: { score: Score, target: 1 | 2 | 3, onClick: () => void }) => {
        const base = "w-10 h-10 rounded-full font-bold text-lg transition-all transform";
        const colors = { 1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-emerald-500' };
        return (
            <motion.button whileTap={{ scale: 0.9 }} onClick={onClick} className={score === target ? `${base} ${colors[target]} text-white scale-110 shadow-lg` : `${base} bg-slate-200 text-slate-500 hover:bg-slate-300`}>{target}</motion.button>
        );
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-lg shadow border border-slate-200/80">
            <div className="flex items-start space-x-3 mb-4 relative group">
                <HelpCircle className="h-5 w-5 text-slate-400 cursor-pointer flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 font-medium">{criterion.text}</p>
                <GuidanceTooltip guidance={criterion.guidance} />
            </div>
            <div className="hidden md:grid grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-around items-center mb-2">{[1, 2, 3].map(s => <ScoreButton key={s} score={entry.superstarScore} target={s as 1|2|3} onClick={() => onUpdate({ superstarScore: s as 1|2|3 })} />)}</div>
                    <textarea value={entry.superstarObservation} onChange={(e) => onUpdate({ superstarObservation: e.target.value })} placeholder={`Observation sur ${names.superstar}...`} className="w-full p-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition" rows={2}></textarea>
                </div>
                <div>
                    <div className="flex justify-around items-center mb-2">{[1, 2, 3].map(s => <ScoreButton key={s} score={entry.commercialScore} target={s as 1|2|3} onClick={() => onUpdate({ commercialScore: s as 1|2|3 })} />)}</div>
                    <textarea value={entry.commercialObservation} onChange={(e) => onUpdate({ commercialObservation: e.target.value })} placeholder={`Observation sur ${names.commercial}...`} className="w-full p-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition" rows={2}></textarea>
                </div>
            </div>
            <div className="md:hidden">
                <div className="flex border-b border-slate-200 mb-4">
                    <button onClick={() => setActiveTab('superstar')} className={`flex-1 py-2 font-medium transition-colors ${activeTab === 'superstar' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>{names.superstar}</button>
                    <button onClick={() => setActiveTab('commercial')} className={`flex-1 py-2 font-medium transition-colors ${activeTab === 'commercial' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500'}`}>{names.commercial}</button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, x: activeTab === 'superstar' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: activeTab === 'superstar' ? -10 : 10 }} transition={{ duration: 0.2 }}>
                        {activeTab === 'superstar' ? (
                            <div>
                                <div className="flex justify-around items-center mb-2">{[1, 2, 3].map(s => <ScoreButton key={s} score={entry.superstarScore} target={s as 1|2|3} onClick={() => onUpdate({ superstarScore: s as 1|2|3 })} />)}</div>
                                <textarea value={entry.superstarObservation} onChange={(e) => onUpdate({ superstarObservation: e.target.value })} placeholder={`Observation sur ${names.superstar}...`} className="w-full p-2 text-sm border border-slate-200 rounded-md" rows={2}></textarea>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-around items-center mb-2">{[1, 2, 3].map(s => <ScoreButton key={s} score={entry.commercialScore} target={s as 1|2|3} onClick={() => onUpdate({ commercialScore: s as 1|2|3 })} />)}</div>
                                <textarea value={entry.commercialObservation} onChange={(e) => onUpdate({ commercialObservation: e.target.value })} placeholder={`Observation sur ${names.commercial}...`} className="w-full p-2 text-sm border border-slate-200 rounded-md" rows={2}></textarea>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const AuditStep = ({ names, auditData, setAuditData, onComplete, onBack }: { names: { superstar: string; commercial: string }; auditData: AuditEntry[]; setAuditData: React.Dispatch<React.SetStateAction<AuditEntry[]>>; onComplete: () => void; onBack: () => void; }) => {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const handleUpdate = (criterionId: string, updatedEntry: Partial<AuditEntry>) => setAuditData(prev => prev.map(entry => entry.criterionId === criterionId ? { ...entry, ...updatedEntry } : entry));
    const isSectionComplete = (sectionIndex: number) => auditSections[sectionIndex].criteria.every(c => { const entry = auditData.find(e => e.criterionId === c.id); return entry?.superstarScore !== null && entry?.commercialScore !== null; });

    return (
        <MotionWrapper className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors"><ArrowLeft/><span>Retour</span></button>
                <h2 className="text-2xl font-bold text-slate-800 text-center">Grille d'Évaluation</h2>
                <div className="w-24 text-right text-sm text-slate-500">{currentSectionIndex + 1} / {auditSections.length}</div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8"><motion.div className="bg-emerald-600 h-2.5 rounded-full" animate={{ width: `${((currentSectionIndex + 1) / auditSections.length) * 100}%` }} transition={{ ease: "easeInOut", duration: 0.5 }}></motion.div></div>
            <AnimatePresence mode="wait">
                <motion.div key={currentSectionIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                             <h3 className="text-xl font-bold text-slate-700">{auditSections[currentSectionIndex].title}</h3>
                             {isSectionComplete(currentSectionIndex) && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center text-emerald-600"><Check/><span className="ml-1 font-medium">Complet</span></motion.div>}
                        </div>
                        <div className="hidden md:grid grid-cols-2 gap-6 mb-2">
                            <h4 className="font-bold text-center text-slate-600">{names.superstar}</h4>
                            <h4 className="font-bold text-center text-slate-600">{names.commercial}</h4>
                        </div>
                        <div className="space-y-4">
                            {auditSections[currentSectionIndex].criteria.map(criterion => {
                                const entry = auditData.find(e => e.criterionId === criterion.id)!;
                                return <CriterionCardV2 key={criterion.id} criterion={criterion} entry={entry} onUpdate={(updated) => handleUpdate(criterion.id, updated)} names={names} />;
                            })}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center mt-8">
                <button onClick={() => setCurrentSectionIndex(i => Math.max(0, i - 1))} disabled={currentSectionIndex === 0} className="px-6 py-2 rounded-lg bg-white border border-slate-300 font-semibold text-slate-700 disabled:opacity-50 transition-colors">Précédent</button>
                {currentSectionIndex < auditSections.length - 1 ? (
                    <button onClick={() => setCurrentSectionIndex(i => Math.min(auditSections.length - 1, i + 1))} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">Suivant</button>
                ) : (
                    <button onClick={onComplete} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold flex items-center space-x-2 hover:bg-emerald-700 transition-colors"><span>Générer la Synthèse</span><ArrowRight/></button>
                )}
            </div>
        </MotionWrapper>
    );
};

const SynthesisStep = ({ names, auditData, onReset }: { names: { superstar: string, commercial: string }; auditData: AuditEntry[]; onReset: () => void; }) => {
    const analysis = useMemo(() => {
      const withGaps = auditData.filter(e => e.superstarScore !== null && e.commercialScore !== null).map(e => ({...e, gap: Math.abs(e.superstarScore! - e.commercialScore!), criterionText: auditSections.flatMap(s => s.criteria).find(c => c.id === e.criterionId)!.text})).sort((a, b) => b.gap - a.gap);
      const superstarStrengths = auditData.filter(e => e.superstarScore === 3).map(e => ({ ...e, criterionText: auditSections.flatMap(s => s.criteria).find(c => c.id === e.criterionId)!.text }));
      const scoredSuperstar = auditData.filter(e => e.superstarScore !== null);
      const scoredCommercial = auditData.filter(e => e.commercialScore !== null);
      const superstarAvg = scoredSuperstar.length > 0 ? (scoredSuperstar.reduce((sum, e) => sum + e.superstarScore!, 0) / scoredSuperstar.length) : 0;
      const commercialAvg = scoredCommercial.length > 0 ? (scoredCommercial.reduce((sum, e) => sum + e.commercialScore!, 0) / scoredCommercial.length) : 0;
      return { biggestGaps: withGaps.slice(0, 3), strengthsToClone: superstarStrengths.slice(0, 3), superstarAvg: superstarAvg.toFixed(1), commercialAvg: commercialAvg.toFixed(1) };
    }, [auditData]);

    return (
        <MotionWrapper className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-4">
                <button onClick={onReset} className="text-sm text-slate-500 hover:text-red-600 flex items-center mx-auto space-x-1 transition-colors"><RotateCcw className="h-4 w-4"/><span>Recommencer un nouvel audit</span></button>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-800 text-center">Synthèse & Plan de Coaching</h1>
                <p className="text-center text-slate-500 mt-2">Pour {names.commercial}, basé sur l'analyse avec {names.superstar}</p>
                <div className="mt-8 flex justify-center items-center space-x-8 text-center bg-slate-50 p-4 rounded-lg">
                    <div><p className="text-sm text-slate-500">Score Final {names.superstar}</p><p className="text-3xl font-bold text-emerald-600">{analysis.superstarAvg}</p></div>
                    <div><p className="text-sm text-slate-500">Score Final {names.commercial}</p><p className="text-3xl font-bold text-red-600">{analysis.commercialAvg}</p></div>
                </div>
                <div className="mt-10 space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 pb-2 border-emerald-500">Analyse des Écarts de Performance Clés</h2>
                        <div className="space-y-4">
                            {analysis.biggestGaps.length > 0 ? analysis.biggestGaps.map(item => (
                                <div key={item.criterionId} className="p-4 bg-slate-50 rounded-lg"><p className="font-bold">{item.criterionText}</p><p className="text-sm text-slate-600">Écart de <span className="font-bold">{item.gap}</span> points (Score {names.superstar}: <span className="text-emerald-600 font-bold">{item.superstarScore}</span>, Score {names.commercial}: <span className="text-red-600 font-bold">{item.commercialScore}</span>)</p>{item.commercialObservation && <p className="text-xs mt-2 text-slate-500 italic">Observation: "{item.commercialObservation}"</p>}</div>
                            )) : <p className="text-slate-500">Veuillez compléter l'audit pour voir l'analyse.</p>}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 pb-2 border-emerald-500">Les Techniques de {names.superstar} à Cloner</h2>
                        <div className="space-y-4">
                            {analysis.strengthsToClone.length > 0 ? analysis.strengthsToClone.map(item => (
                                <div key={item.criterionId} className="p-4 bg-emerald-50/50 rounded-lg border-l-4 border-emerald-500"><p className="font-bold">{item.criterionText}</p>{item.superstarObservation && <p className="text-xs mt-2 text-slate-500 italic">Exemple: "{item.superstarObservation}"</p>}</div>
                            )) : <p className="text-slate-500">Aucune compétence notée 3/3 pour {names.superstar} dans cet audit.</p>}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 pb-2 border-emerald-500">Mon Plan d'Action Concret (Prochain 1-on-1)</h2>
                         <div className="space-y-6">
                            <div>
                                <label className="font-bold text-slate-600">La Compétence Cible <span className="text-slate-400 font-normal">(suggestion: {analysis.biggestGaps[0]?.criterionText || 'N/A'})</span></label>
                                <textarea rows={2} className="mt-1 w-full p-2 border border-slate-300 rounded-md transition focus:ring-2 focus:ring-emerald-500" placeholder="Quelle est la SEULE compétence qui, si améliorée, aura le plus grand impact pour ce commercial ?"></textarea>
                            </div>
                            <div>
                                <label className="font-bold text-slate-600">L'Exercice Concret</label>
                                <textarea rows={3} className="mt-1 w-full p-2 border border-slate-300 rounded-md transition focus:ring-2 focus:ring-emerald-500" placeholder="Quel exercice ou jeu de rôle précis peut-il faire ? (ex: 'Avant ton prochain appel, prépare 3 questions pour quantifier l'impact du problème de ton prospect.')"></textarea>
                            </div>
                            <div>
                                <label className="font-bold text-slate-600">La Mesure du Succès</label>
                                <textarea rows={2} className="mt-1 w-full p-2 border border-slate-300 rounded-md transition focus:ring-2 focus:ring-emerald-500" placeholder="Comment saurez-vous que le coaching a fonctionné ? (ex: 'Lors de notre prochain débrief, il devra me présenter l'impact chiffré du problème de son prospect.')"></textarea>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t-2 border-dashed flex flex-col md:flex-row items-center gap-6">
                    <button onClick={() => alert("La fonctionnalité d'export PDF serait implémentée ici.")} className="w-full md:w-auto flex-1 bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition flex items-center justify-center space-x-2"><Download className="h-5 w-5"/><span>Exporter le Plan en PDF</span></button>
                    <button onClick={() => alert("Redirection vers la page de l'offre payante.")} className="w-full md:w-auto flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center space-x-2"><Zap className="h-5 w-5"/><span>Laissez nos experts faire l'analyse pour vous</span></button>
                </div>
            </div>
        </MotionWrapper>
    );
};

// --- MAIN PAGE COMPONENT (with state persistence) ---
export default function CoachingAppPageV3() {
  const [step, setStep] = useState<'welcome' | 'audit' | 'synthesis'>('welcome');
  const [names, setNames] = useState({ superstar: '', commercial: '' });
  const initialData = useMemo(() => auditSections.flatMap(s => s.criteria.map(c => ({ criterionId: c.id, superstarScore: null, commercialScore: null, superstarObservation: '', commercialObservation: '' }))), []);
  const [auditData, setAuditData] = useState<AuditEntry[]>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('coachingAppState_v2'); // Use a new key for the new state structure
      if (savedState) {
        const { step, names, auditData } = JSON.parse(savedState);
        setStep(step);
        setNames(names);
        if (auditData && auditData.length === initialData.length) setAuditData(auditData);
      }
    } catch (error) { console.error("Failed to load state", error); }
    setIsLoaded(true);
  }, [initialData]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      const stateToSave = JSON.stringify({ step, names, auditData });
      localStorage.setItem('coachingAppState_v2', stateToSave);
    } catch (error) { console.error("Failed to save state", error); }
  }, [step, names, auditData, isLoaded]);

  const handleStart = (startNames: { superstar: string, commercial: string }) => {
    const isNewAudit = names.superstar !== startNames.superstar || names.commercial !== startNames.commercial;
    if (isNewAudit && JSON.stringify(auditData) !== JSON.stringify(initialData)) {
      if (window.confirm("Commencer un nouvel audit effacera les données existantes. Continuer ?")) {
        setAuditData(initialData);
      } else {
        return; // User cancelled
      }
    }
    setNames(startNames);
    setStep('audit');
  };
  
  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir recommencer ? Votre progression sera perdue.")) {
        localStorage.removeItem('coachingAppState_v2');
        setAuditData(initialData);
        setNames({ superstar: '', commercial: '' });
        setStep('welcome');
    }
  }

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Chargement de votre session...</div>;
  }
  
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <AnimatePresence mode="wait">
        {step === 'welcome' && <WelcomeStep key="welcome" onStart={handleStart} initialNames={names} />}
        {step === 'audit' && <AuditStep key="audit" names={names} auditData={auditData} setAuditData={setAuditData} onComplete={() => setStep('synthesis')} onBack={() => setStep('welcome')} />}
        {step === 'synthesis' && <SynthesisStep key="synthesis" names={names} auditData={auditData} onReset={handleReset} />}
      </AnimatePresence>
    </main>
  );
}