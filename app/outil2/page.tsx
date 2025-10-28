// app/page.tsx
"use client";

// --- IMPORTATIONS ---
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Eye, EyeOff, Check, ArrowLeft, RotateCcw, Upload, Users, ClipboardCheck, Target } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AudioPlayer } from '@/components/AudioPlayer';

// --- STRUCTURE DES DONNÉES AVEC NOUVEAU CHAMP "skillName" ---
interface Criterion {
  id: string;
  text: string;
  skillName: string; // NOUVEAU: Le nom de la compétence
  guidance: string;
  placeholderChampion: string; 
  placeholderTrainee: string;  
}
interface Section {
  title: string;
  shortTitle: string; 
  criteria: Criterion[];
}

const auditSections: Section[] = [
    {
    title: "1. PRÉPARATION & INTRODUCTION",
    shortTitle: "Intro",
    criteria: [
      { id: "s1c1", text: "L'objectif de l'appel a-t-il été clairement énoncé (agenda) ?", 
        skillName: "Définition de l'Agenda",
        guidance: `0 = Pas d'agenda...\n1 = Agenda flou...\n2 = Agenda énoncé mais non validé...\n3 = Agenda collaboratif...`,
        placeholderChampion: `Ex: A validé l'agenda avec le prospect : "Est-ce que cela vous convient ?"`,
        placeholderTrainee: `Ex: A simplement récité son plan sans demander l'avis du prospect.`
      },
      { id: "s1c2", text: "Le commercial a-t-il démontré une connaissance préalable du prospect ?", 
        skillName: "Recherche Préalable",
        guidance: `0 = Aucune recherche...\n1 = Question générique...\n2 = Fait référence à une info évidente...\n3 = Démontre une recherche approfondie...`,
        placeholderChampion: `Ex: A mentionné leur récente levée de fonds et a posé une question pertinente dessus.`,
        placeholderTrainee: `Ex: A demandé "Alors, que faites-vous chez [Nom de l'entreprise] ?"`,
      },
      { id: "s1c3", text: "Le ton est-il confiant et établit-il l'autorité ?", 
        skillName: "Posture & Autorité",
        guidance: `0 = Ton passif...\n1 = Hésitant, mots faibles...\n2 = Ton "commercial" standard...\n3 = Posture de consultant...`,
        placeholderChampion: `Ex: Ton posé, débit maîtrisé, à l'aise avec les silences.`,
        placeholderTrainee: `Ex: Parlait très vite, utilisait beaucoup "euh..." et "juste".`,
      },
    ],
  },
  {
    title: "2. PHASE DE DÉCOUVERTE",
    shortTitle: "Découverte",
    criteria: [
      { id: "s2c1", text: "A-t-il posé des questions sur les douleurs/problèmes actuels ('Pains') ?", 
        skillName: "Exploration des Douleurs",
        guidance: `0 = Questions sur la solution...\n1 = Questions factuelles...\n2 = Reste en surface...\n3 = Explore les conséquences...`,
        placeholderChampion: `Ex: A utilisé des questions ouvertes comme "Qu'est-ce qui vous frustre le plus aujourd'hui ?"`,
        placeholderTrainee: `Ex: A surtout posé des questions fermées (oui/non) sur leur situation actuelle.`,
      },
      { id: "s2c2", text: "A-t-il creusé pour quantifier l'impact de ces problèmes (en €, temps, risque) ?", 
        skillName: "Quantification de l'Impact",
        guidance: `0 = Évite le sujet financier...\n1 = Aucune quantification...\n2 = Tente mais n'obtient pas de chiffre...\n3 = Obtient un chiffre précis et le fait valider...`,
        placeholderChampion: `Ex: A obtenu une estimation chiffrée : "Ce problème vous coûte donc environ 15k€/an ?"`,
        placeholderTrainee: `Ex: Est resté sur du qualitatif : "c'est un problème", sans jamais demander "combien ?".`,
      },
      { id: "s2c3", text: "A-t-il validé le processus de décision & identifié les parties prenantes ?", 
        skillName: "Processus de Décision",
        guidance: `0 = Aucune question...\n1 = S'intéresse qu'au budget...\n2 = Pose "Qui décide ?" sans creuser...\n3 = Cartographie le processus complet...`,
        placeholderChampion: `Ex: A demandé "En dehors de vous, qui d'autre est généralement impliqué dans ce type de projet ?"`,
        placeholderTrainee: `Ex: A supposé que son interlocuteur était le seul décideur.`,
      },
      { id: "s2c4", text: "Le temps de parole est-il équilibré (prospect > 50%) ?",
        skillName: "Équilibre du Temps de Parole",
        guidance: `0 = Pitch >80%...\n1 = Monologue >70%...\n2 = Équilibré 50/50...\n3 = Prospect >60%...`,
        placeholderChampion: `Ex: Le prospect a parlé la majorité du temps, guidé par les questions du vendeur.`,
        placeholderTrainee: `Ex: A parlé pendant 5 minutes d'affilée pour présenter le produit.`,
      },
      { id: "s2c5", text: "A-t-il reformulé les enjeux pour s'assurer de sa bonne compréhension ?",
        skillName: "Reformulation & Écoute Active",
        guidance: `0 = N'écoute pas...\n1 = Aucune reformulation...\n2 = Reformulation simple...\n3 = Reformulation à impact...`,
        placeholderChampion: `Ex: A fait une super synthèse : "Donc si je résume, le problème X vous coûte Y..."`,
        placeholderTrainee: `Ex: A enchaîné ses questions sans jamais faire de pause pour valider sa compréhension.`,
      }
    ],
  },
    {
    title: "3. DÉMONSTRATION & VALEUR",
    shortTitle: "Démo",
    criteria: [
      { id: "s3c1", text: "La démo est-elle personnalisée en fonction de la découverte ?", 
        skillName: "Personnalisation de la Démo",
        guidance: `0 = Démo déconnectée...\n1 = Démo standard...\n2 = Tente de personnaliser...\n3 = Structure basée sur les douleurs...`,
        placeholderChampion: `Ex: A structuré sa démo autour des 3 problèmes cités par le prospect.`,
        placeholderTrainee: `Ex: A fait une démo générique, montrant des fonctionnalités inutiles pour ce prospect.`,
      },
      { id: "s3c2", text: "A-t-il connecté les fonctionnalités aux bénéfices/douleurs du prospect ?", 
        skillName: "Connexion aux Bénéfices",
        guidance: `0 = Caractéristiques techniques...\n1 = Langage de caractéristiques...\n2 = Bénéfices génériques...\n3 = Résolution de douleur...`,
        placeholderChampion: `Ex: A dit : "Ce bouton va vous faire gagner les 2h/semaine dont nous parlions."`,
        placeholderTrainee: `Ex: A dit : "Ce bouton permet d'exporter les données en CSV."`,
      },
    ],
  },
  {
    title: "4. OBJECTIONS & CLÔTURE",
    shortTitle: "Clôture",
    criteria: [
      { id: "s4c1", text: "Les objections sont-elles accueillies et comprises avant d'être traitées ?", 
        skillName: "Gestion des Objections",
        guidance: `0 = Se braque ou ignore...\n1 = Réponse défensive...\n2 = Contre-argumente directement...\n3 = Accueille, explore, répond...`,
        placeholderChampion: `Ex: A exploré l'objection : "Intéressant, par rapport à quoi trouvez-vous cela cher ?"`,
        placeholderTrainee: `Ex: A immédiatement contre-argumenté sur le prix, sans chercher à comprendre.`,
      },
      { id: "s4c2", text: "Les prochaines étapes sont-elles claires, mutuelles et datées ?", 
        skillName: "Clarté des Prochaines Étapes",
        guidance: `0 = Aucune prochaine étape...\n1 = Faux engagement...\n2 = Étape sans date précise...\n3 = RDV précis et daté...`,
        placeholderChampion: `Ex: A fixé un RDV précis dans le calendrier à la fin de l'appel.`,
        placeholderTrainee: `Ex: A terminé par un vague "Je vous envoie un mail et on se tient au courant."`,
      },
    ],
  },
];


// --- DÉFINITIONS DE TYPES ---
type Score = 0 | 1 | 2 | 3 | null;
interface AnalysisEntry {
  criterionId: string;
  championScore: Score;
  traineeScore: Score;
  championObservation: string;
  traineeObservation: string;
}
interface AppState {
    step: 'welcome' | 'analysis' | 'synthesis';
    names: { champion: string, trainee: string };
    audio: { championUrl: string | null, traineeUrl: string | null };
    analysisData: AnalysisEntry[];
    areGuidesVisible: boolean;
}

// --- SOUS-COMPOSANTS UI ---

const WelcomeStep = ({ onStart, initialState }: { onStart: (state: Partial<AppState>) => void; initialState: AppState }) => {
  const [names, setNames] = useState(initialState.names);
  const [audio, setAudio] = useState(initialState.audio);
  const [audioFiles, setAudioFiles] = useState<{ champion: File | null, trainee: File | null }>({ champion: null, trainee: null });

  const handleFileChange = (type: 'champion' | 'trainee', file: File | null) => {
    if(file){
        const key = type === 'champion' ? 'championUrl' : 'traineeUrl';
        const oldUrl = audio[key];
        if(oldUrl) URL.revokeObjectURL(oldUrl);
        setAudio(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
        setAudioFiles(prev => ({ ...prev, [type]: file }));
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Clonez vos meilleurs vendeurs</h1>
      <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">L'outil gratuit qui vous aide à passer de l'écoute passive des appels, à un coaching commercial structuré et basé sur la performance de vos meilleurs éléments.</p>
      
      <div className="mt-12 text-left">
          <h2 className="text-2xl font-bold text-slate-700 text-center mb-8">Comment ça marche ? En 3 étapes simples.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                      <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800">1. Comparez</h3>
                  <p className="text-sm text-slate-600 mt-2 text-center">Sélectionnez un de vos meilleurs vendeurs ("Champion") et un commercial que vous souhaitez coacher. Uploadez un enregistrement d'appel pour chacun.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                      <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800">2. Analysez</h3>
                  <p className="text-sm text-slate-600 mt-2 text-center">Écoutez les appels côte à côte en répondant aux questions affichées. L'outil vous guide question par question pour identifier les écarts de compétence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                      <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-center text-slate-800">3. Agissez</h3>
                  <p className="text-sm text-slate-600 mt-2 text-center">Recevez instantanément un rapport visuel et un plan de coaching pré-rempli, pointant les axes d'amélioration prioritaires.</p>
              </div>
          </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-left">
        <h3 className="text-xl font-bold text-slate-800 text-center mb-6">Prêt à démarrer ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="font-bold text-slate-700">Vendeur Champion</label>
            <input type="text" value={names.champion} onChange={(e) => setNames(prev => ({ ...prev, champion: e.target.value }))} placeholder="Ex: Laura Martin" className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
            <label htmlFor="champion-audio" className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 border border-slate-300 rounded-md hover:bg-slate-200 transition-colors"><Upload size={20} /> Uploader l'appel audio</label>
            <input id="champion-audio" type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileChange('champion', e.target.files?.[0] || null)} />
            {audioFiles.champion && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-grow text-left">
                  <p className="text-sm font-semibold text-green-800">{audioFiles.champion.name}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="font-bold text-slate-700">Vendeur à Coacher</label>
            <input type="text" value={names.trainee} onChange={(e) => setNames(prev => ({ ...prev, trainee: e.target.value }))} placeholder="Ex: Julien Petit" className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500" />
             <label htmlFor="trainee-audio" className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 border border-slate-300 rounded-md hover:bg-slate-200 transition-colors"><Upload size={20} /> Uploader l'appel audio</label>
            <input id="trainee-audio" type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileChange('trainee', e.target.files?.[0] || null)} />
            {audioFiles.trainee && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-grow text-left">
                  <p className="text-sm font-semibold text-green-800">{audioFiles.trainee.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => onStart({ names, audio })} disabled={!names.champion || !names.trainee} className="mt-8 w-full bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2 disabled:bg-slate-400 disabled:scale-100">
          <span>Démarrer l'Analyse</span><ArrowRight className="h-6 w-6" />
        </button>
        <div className="mt-4 text-xs text-center text-slate-500">
          <p>🔒 Cet outil est 100% privé. Vos fichiers audios et vos réponses ne quittent jamais votre navigateur.</p>
        </div>
      </div>
    </motion.div>
  );
};


const AnalysisStep = ({ state, setState, onComplete, onBack }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; onComplete: () => void; onBack: () => void; }) => {
    const flatCriteria = useMemo(() => 
        auditSections.flatMap(section => 
            section.criteria.map(criterion => ({
                ...criterion,
                sectionTitle: section.title
            }))
        ), []);

    const [currentCriterionIndex, setCurrentCriterionIndex] = useState(0);

    const handleUpdate = (criterionId: string, updatedEntry: Partial<AnalysisEntry>) => {
        setState(prev => ({ ...prev, analysisData: prev.analysisData.map(entry => entry.criterionId === criterionId ? { ...entry, ...updatedEntry } : entry) }));
    };
    
    const toggleGuides = () => setState(prev => ({ ...prev, areGuidesVisible: !prev.areGuidesVisible }));

    const nextCriterion = useCallback(() => {
        if (currentCriterionIndex < flatCriteria.length - 1) {
            setCurrentCriterionIndex(currentCriterionIndex + 1);
        } else {
            onComplete();
        }
    }, [currentCriterionIndex, flatCriteria.length, onComplete]);

    const prevCriterion = useCallback(() => {
        if (currentCriterionIndex > 0) {
            setCurrentCriterionIndex(currentCriterionIndex - 1);
        }
    }, [currentCriterionIndex]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter') {
                if (event.key === 'Enter' && (event.target as HTMLElement).tagName.toLowerCase() === 'textarea') return;
                event.preventDefault();
                nextCriterion();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                prevCriterion();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextCriterion, prevCriterion]);

    const currentCriterion = flatCriteria[currentCriterionIndex];
    const entry = state.analysisData.find(e => e.criterionId === currentCriterion.id)!;
    const progress = ((currentCriterionIndex + 1) / flatCriteria.length) * 100;

    const ScoreButton = ({ score, target, onClick }: { score: Score, target: 0 | 1 | 2 | 3, onClick: () => void }) => {
        const base = "w-10 h-10 rounded-full font-bold text-lg transition-all transform flex-shrink-0";
        const colors = { 0: 'bg-red-500', 1: 'bg-orange-500', 2: 'bg-yellow-500', 3: 'bg-green-500' };
        return (
            <motion.button whileTap={{ scale: 0.9 }} onClick={onClick} className={score === target ? `${base} ${colors[target]} text-white scale-110 shadow-lg` : `${base} bg-slate-200 text-slate-500 hover:bg-slate-300`}>{target}</motion.button>
        );
    };

    return (
        <div className="w-full h-screen max-h-screen flex flex-col p-4 md:p-8 overflow-hidden">
            <header className="flex-shrink-0">
                 <div className="flex justify-between items-center mb-4">
                    <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors"><ArrowLeft/><span>Retour</span></button>
                    <button onClick={toggleGuides} className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        {state.areGuidesVisible ? <EyeOff size={16}/> : <Eye size={16} />}
                        {state.areGuidesVisible ? 'Masquer guides' : 'Afficher guides'}
                    </button>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2"><motion.div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }} transition={{ ease: "easeInOut", duration: 0.5 }}></motion.div></div>
            </header>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                 <div>
                    <h3 className="font-bold text-sm text-slate-700 mb-2">{state.names.champion}</h3>
                    {state.audio.championUrl && <AudioPlayer audioUrl={state.audio.championUrl} waveColor="#86efac" progressColor="#107a37ff" height={60} />}
                </div>
                 <div>
                    <h3 className="font-bold text-sm text-slate-700 mb-2">{state.names.trainee}</h3>
                    {state.audio.traineeUrl && <AudioPlayer audioUrl={state.audio.traineeUrl} waveColor="#fca5a5" progressColor="#dc2626" height={60} />}
                </div>
            </div>

            <main className="flex-grow flex items-center justify-center relative">
                 <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentCriterionIndex}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full max-w-4xl"
                    >
                        {/* --- MODIFICATION ICI --- */}
                        <p className="font-semibold text-blue-600 mb-2">{currentCriterion.sectionTitle}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{currentCriterion.skillName}</h2>
                        <p className="mt-2 text-lg text-slate-600">{currentCriterion.text}</p>
                        {/* --- FIN DE LA MODIFICATION --- */}
                        
                        <AnimatePresence>
                        {state.areGuidesVisible && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                                animate={{ opacity: 1, height: 'auto', marginTop: '16px' }} 
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            >
                                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 text-slate-700 text-sm rounded-r-md whitespace-pre-line"
                                     dangerouslySetInnerHTML={{ __html: currentCriterion.guidance.replace(/(\d =)/g, '<span class="font-bold text-blue-800">$1</span>') }}>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                            <div>
                                <h4 className="font-bold text-center mb-2 text-slate-600">{state.names.champion}</h4>
                                <div className="flex justify-between items-center mb-2 px-2">{[0, 1, 2, 3].map(s => <ScoreButton key={s} score={entry.championScore} target={s as 0|1|2|3} onClick={() => handleUpdate(currentCriterion.id, { championScore: s as 0|1|2|3 })} />)}</div>
                                <label className="text-sm font-semibold text-slate-600 px-2 mb-1 block">Notes :</label>
                                <textarea value={entry.championObservation} onChange={(e) => handleUpdate(currentCriterion.id, { championObservation: e.target.value })} 
                                placeholder={currentCriterion.placeholderChampion}
                                className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 transition placeholder:italic" rows={4}></textarea>
                            </div>
                            <div>
                                <h4 className="font-bold text-center mb-2 text-slate-600">{state.names.trainee}</h4>
                                <div className="flex justify-between items-center mb-2 px-2">{[0, 1, 2, 3].map(s => <ScoreButton key={s} score={entry.traineeScore} target={s as 0|1|2|3} onClick={() => handleUpdate(currentCriterion.id, { traineeScore: s as 0|1|2|3 })} />)}</div>
                                <label className="text-sm font-semibold text-slate-600 px-2 mb-1 block">Notes :</label>                                
                                <textarea value={entry.traineeObservation} onChange={(e) => handleUpdate(currentCriterion.id, { traineeObservation: e.target.value })} 
                                placeholder={currentCriterion.placeholderTrainee}
                                className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 transition placeholder:italic" rows={4}></textarea>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
            
            <footer className="flex-shrink-0 flex items-center justify-center gap-4 mt-4">
                <button 
                    onClick={prevCriterion} 
                    disabled={currentCriterionIndex === 0} 
                    className="px-6 py-2 rounded-lg text-slate-600 font-semibold hover:bg-slate-200 disabled:opacity-30 transition-colors"
                >
                    Précédent
                </button>
                <button 
                    onClick={nextCriterion} 
                    className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                    {currentCriterionIndex < flatCriteria.length - 1 ? "Suivant" : "Terminer"}
                </button>
            </footer>
        </div>
    );
};

const ActionPlanSection = ({ state }: { state: AppState }) => {
    const actionPoints = [
        {
            title: "Temps de Parole : Comment l'aider à écouter plus et à pitcher moins ?",
            guide: "Quel est l'écart principal ? (Pitch trop long, monologue, pas assez de questions ouvertes...). Notez un exemple précis.",
            placeholder: `Ex: Julien parle 75% du temps. Il doit intégrer la technique de la "question miroir" utilisée par Laura pour faire développer le prospect.`
        },
        {
            title: "Objections : Quelle technique de champion peut-il utiliser pour transformer l'objection en discussion sur la valeur ?",
            guide: "Quelle est la différence d'approche entre les deux ? (Défensif vs Curieux, Justification vs Exploration...). Transcrivez la réponse de chacun.",
            placeholder: `Ex: Face à l'objection sur le prix, Julien se justifie. Laura, elle, répond "C'est une excellente question, qu'est-ce qui vous fait dire ça ?". On va faire un jeu de rôle sur cette réponse exacte.`
        },
        {
            title: "Questions : Comment l'amener à poser des questions qui quantifient la douleur du prospect ?",
            guide: "À quel moment le Champion a-t-il arrêté de parler des symptômes pour parler de l'impact Business (€) ? Notez sa question exacte.",
            placeholder: `Ex: Laura a demandé : "Concrètement, ces 5h perdues par semaine, ça représente quel coût pour l'entreprise sur l'année ?". Julien doit préparer 3 questions de quantification avant chaque appel.`
        },
        {
            title: "Connexion : Quel est l'ajustement à faire pour qu'il parle bénéfices plutôt que caractéristiques ?",
            guide: `Notez un exemple de phrase 'caractéristique' du vendeur à coacher, et comment le champion l'aurait formulée en 'bénéfice'.`,
            placeholder: `Ex: Julien dit "L'outil a un export CSV". Laura dirait "Cet export vous permettra de générer en 1 clic le rapport qui vous prend 2h chaque vendredi."`
        },
        {
            title: "Prochaines Étapes : Quelle phrase exacte peut-il utiliser pour obtenir un engagement clair ?",
            guide: `Comparez la phrase de fin du vendeur à coacher avec celle du champion. Quel est le mot ou la tournure de phrase qui change tout ?`,
            placeholder: `Ex: Julien termine par "Je vous envoie un mail". Laura, elle, conclut par "La prochaine étape logique est de valider ce point avec votre manager. Je vous propose qu'on fixe 30 min la semaine prochaine. Quel jour vous arrange ?".`
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 pb-2 border-slate-500">Plan de Coaching Guidé (Prochain 1-on-1)</h2>
            <div className="space-y-6">
                {actionPoints.map((point, index) => (
                    <div key={index}>
                        <label className="font-bold text-slate-600">{point.title}</label>
                        <p className="text-sm text-slate-500 mb-2">{point.guide}</p>
                        <textarea rows={3} className="w-full p-2 border border-slate-300 rounded-md transition focus:ring-2 focus:ring-blue-500 placeholder:italic" 
                        placeholder={point.placeholder}></textarea>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SynthesisStep = ({ state, onReset, onBackToAnalysis }: { state: AppState; onReset: () => void; onBackToAnalysis: () => void; }) => {
    const reportRef = useRef<HTMLDivElement>(null);
    
    const analysis = useMemo(() => {
        const { analysisData } = state;
        const allCriteria = auditSections.flatMap(s => s.criteria);

        const getCriterion = (id: string) => allCriteria.find(c => c.id === id);

        const withGaps = analysisData
            .filter(e => e.championScore !== null && e.traineeScore !== null)
            .map(e => ({
                ...e,
                gap: Math.abs(e.championScore! - e.traineeScore!),
                skillName: getCriterion(e.criterionId)?.skillName || '',
            }))
            .sort((a, b) => b.gap - a.gap);

        const strengthsToClone = analysisData
            .filter(e => e.championScore === 3)
            .map(e => ({
                ...e,
                skillName: getCriterion(e.criterionId)?.skillName || '',
            }));

        const scoredChampion = analysisData.filter(e => e.championScore !== null);
        const scoredTrainee = analysisData.filter(e => e.traineeScore !== null);
        const championAvg = scoredChampion.length > 0 ? (scoredChampion.reduce((sum, e) => sum + e.championScore!, 0) / scoredChampion.length) : 0;
        const traineeAvg = scoredTrainee.length > 0 ? (scoredTrainee.reduce((sum, e) => sum + e.traineeScore!, 0) / scoredTrainee.length) : 0;

        const radarData = auditSections.map(section => {
            const sectionCriterionIds = section.criteria.map(c => c.id);
            const sectionEntries = analysisData.filter(entry => sectionCriterionIds.includes(entry.criterionId));
            const championScores = sectionEntries.map(e => e.championScore).filter(s => s !== null) as number[];
            const traineeScores = sectionEntries.map(e => e.traineeScore).filter(s => s !== null) as number[];
            const championSectionAvg = championScores.length > 0 ? championScores.reduce((a, b) => a + b, 0) / championScores.length : 0;
            const traineeSectionAvg = traineeScores.length > 0 ? traineeScores.reduce((a, b) => a + b, 0) / traineeScores.length : 0;
            return { subject: section.shortTitle, champion: parseFloat(championSectionAvg.toFixed(2)), trainee: parseFloat(traineeSectionAvg.toFixed(2)), fullMark: 3 };
        });

        return { biggestGaps: withGaps.slice(0, 3), strengthsToClone: strengthsToClone.slice(0, 3), championAvg: championAvg.toFixed(1), traineeAvg: traineeAvg.toFixed(1), radarData };
    }, [state]);

    const handleExportPDF = () => {
        const reportElement = reportRef.current;
        if (reportElement) {
          html2canvas(reportElement, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const height = pdfWidth / ratio;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
            pdf.save(`Analyse_Coaching_${state.names.trainee}.pdf`);
          });
        }
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onReset} className="text-sm text-slate-500 hover:text-red-600 flex items-center space-x-1 transition-colors"><RotateCcw className="h-4 w-4"/><span>Nouvelle Analyse</span></button>
                    <button onClick={onBackToAnalysis} className="text-sm text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition-colors"><ArrowLeft className="h-4 w-4"/><span>Retour à l'analyse</span></button>
                </div>
                <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors shadow"><Download size={16} /> Exporter en PDF</button>
            </div>
            <div ref={reportRef} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200">
                <h1 className="text-3xl font-bold text-slate-800 text-center">Synthèse & Plan de Coaching</h1>
                <p className="text-center text-slate-500 mt-2">Pour <span className='font-bold'>{state.names.trainee}</span>, basé sur l'analyse avec <span className='font-bold'>{state.names.champion}</span></p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center bg-slate-50 p-4 rounded-lg flex justify-around">
                        <div><p className="text-sm text-slate-500">Score Final {state.names.champion}</p><p className="text-4xl font-bold text-green-600">{analysis.championAvg}</p></div>
                        <div><p className="text-sm text-slate-500">Score Final {state.names.trainee}</p><p className="text-4xl font-bold text-red-600">{analysis.traineeAvg}</p></div>
                    </div>
                    <div className="w-full h-64 md:h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysis.radarData}><PolarGrid /><PolarAngleAxis dataKey="subject" /><PolarRadiusAxis angle={30} domain={[0, 3]} tick={false} axisLine={false} /><Radar name={state.names.champion} dataKey="champion" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} /><Radar name={state.names.trainee} dataKey="trainee" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} /><Legend /></RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mt-10 space-y-10">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 pb-2 border-slate-300">Analyse Détaillée</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-red-600 mb-3">Axes de Coaching Prioritaires</h3>
                            <div className="space-y-4">
                                {analysis.biggestGaps.length > 0 ? analysis.biggestGaps.map(item => (
                                <div key={item.criterionId} className="p-3 bg-red-50/70 rounded-lg border-l-4 border-red-400">
                                    <p className="font-semibold">{item.skillName}</p>
                                    <p className="text-sm text-slate-600">Écart de <span className="font-bold">{item.gap}</span> points</p>
                                    {item.traineeObservation && <p className="text-xs mt-2 text-slate-500 italic">Votre note : "{item.traineeObservation}"</p>}
                                </div>
                                )) : <p className="text-slate-500">Veuillez compléter l'analyse.</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-green-600 mb-3">"Gestes de Champion" à Cloner</h3>
                            <div className="space-y-4">
                                {analysis.strengthsToClone.length > 0 ? analysis.strengthsToClone.map(item => (
                                <div key={item.criterionId} className="p-3 bg-green-50/70 rounded-lg border-l-4 border-green-500">
                                    <p className="font-semibold">{item.skillName}</p>
                                    {item.championObservation && <p className="text-xs mt-2 text-slate-500 italic">Votre note : "{item.championObservation}"</p>}
                                </div>
                                )) : <p className="text-slate-500">Aucune compétence notée 3/3.</p>}
                            </div>
                        </div>
                    </div>
                    <ActionPlanSection state={state} />
                </div>
            </div>

            <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-blue-200 ring-1 ring-blue-50">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl text-balance font-bold text-slate-800">Si vous l'avez fini, cet exercice a dû vous prendre au moins deux heures. Confiez-nous les prochains.</h2>
                    <p className="mt-2 text-slate-600 text-balance max-w-2xl mx-auto">Vous avez trouvé la bonne méthode. Si vous manquez de bande passante : déléguez-nous l'analyse et concentrez-vous sur le coaching.</p>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/70 p-6 rounded-lg">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-700">Notre Offre : "Audit de Performance Commerciale Express"</h3>
                        <p className="text-slate-600">Confiez-nous 2 enregistrements (votre champion & votre commercial à coacher). En 48h, recevez un plan d'action clé en main.</p>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Un rapport d'analyse 'prêt pour votre 1-to-1'.</span></li>
                            <li className="flex items-start gap-2"><Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Les moments clés timecodés et commentés par un expert.</span></li>
                            <li className="flex items-start gap-2"><Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Un script d'objection précis, et la logique derrière.</span></li>
                            <li className="flex items-start gap-2"><Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /><span>Une vidéo de débrief qui est votre ordre du jour.</span></li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border text-center">
                        <p className="text-lg text-balance font-semibold text-slate-700">Audit de Performance Commerciale Express :</p>
                        {/* <p className="text-sm text-balance mt-2">Moins que le temps que vous passeriez à le faire vous-même.</p> */}
                        <p className="my-2 text-5xl font-extrabold text-slate-800">399€ <span className="text-lg font-normal text-slate-500">HT</span></p>
                        <p className="text-sm text-slate-500 mb-4">Paiement unique, sans abonnement.</p>
                        <a href="#" className="w-full bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2">
                            <span className='text-balance'>Déléguer ma prochaine analyse</span>
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center"><p className="font-bold text-slate-700">"Nous faisons le travail fastidieux d'analyse. Vous gardez le rôle le plus important : celui du coach."</p></div>
            </div>
        </motion.div>
    );
};

// --- COMPOSANT PRINCIPAL DE LA PAGE ---
export default function ExpertSalesCoachApp() {
  const initialData = useMemo(() => auditSections.flatMap(s => s.criteria.map(c => ({ criterionId: c.id, championScore: null, traineeScore: null, championObservation: '', traineeObservation: '' }))), []);
  
  const initialState: AppState = useMemo(() => ({
      step: 'welcome',
      names: { champion: '', trainee: '' },
      audio: { championUrl: null, traineeUrl: null },
      analysisData: initialData,
      areGuidesVisible: true,
  }), [initialData]);
  
  const [appState, setAppState] = useState<AppState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('expertSalesCoachAppTypeform_v3');
      if (savedState) {
        const loadedState = JSON.parse(savedState);
        loadedState.audio = { championUrl: null, traineeUrl: null }; 
        if (typeof loadedState.areGuidesVisible === 'undefined') {
            loadedState.areGuidesVisible = true;
        }
        setAppState(loadedState);
      }
    } catch (error) { 
        console.error("Échec du chargement de l'état:", error); 
        setAppState(initialState);
    }
    setIsLoaded(true);
  }, [initialState]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
        const stateToSave = { ...appState, audio: { championUrl: null, traineeUrl: null }};
        localStorage.setItem('expertSalesCoachAppTypeform_v3', JSON.stringify(stateToSave));
    } catch (error) { console.error("Échec de la sauvegarde de l'état:", error); }
  }, [appState, isLoaded]);
  
  const handleStart = (startState: Partial<AppState>) => {
    setAppState(prev => ({...prev, ...startState, step: 'analysis'}));
  };
  
  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir commencer une nouvelle analyse ? Votre travail en cours sera perdu.")) {
        localStorage.removeItem('expertSalesCoachAppTypeform_v3');
        if (appState.audio.championUrl) URL.revokeObjectURL(appState.audio.championUrl);
        if (appState.audio.traineeUrl) URL.revokeObjectURL(appState.audio.traineeUrl);
        const freshInitialData = auditSections.flatMap(s => s.criteria.map(c => ({ criterionId: c.id, championScore: null, traineeScore: null, championObservation: '', traineeObservation: '' })));
        setAppState({
            ...initialState,
            analysisData: freshInitialData,
            names: { champion: '', trainee: '' },
            step: 'welcome'
        });
    }
  }

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Chargement de votre session...</div>;
  }
  
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 font-sans flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {appState.step === 'welcome' && <motion.div key="welcome" className="w-full h-full flex items-center justify-center p-4"><WelcomeStep onStart={handleStart} initialState={appState} /></motion.div>}
        {appState.step === 'analysis' && <AnalysisStep key="analysis" state={appState} setState={setAppState} onComplete={() => setAppState(prev => ({...prev, step: 'synthesis'}))} onBack={() => setAppState(prev => ({...prev, step: 'welcome'}))} />}
        {appState.step === 'synthesis' && <motion.div key="synthesis" className="w-full flex items-center justify-center p-4 md:p-8"><SynthesisStep state={appState} onReset={handleReset} onBackToAnalysis={() => setAppState(prev => ({...prev, step: 'analysis'}))} /></motion.div>}
      </AnimatePresence>
    </main>
  );
}