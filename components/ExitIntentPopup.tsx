'use client'

import { useState } from 'react'; // <-- Import useState
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'; // <-- Import CheckCircleIcon

// --- TYPE DEFINITION ---
interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup = ({ isOpen, onClose }: ExitIntentPopupProps) => {
  // --- STATE MANAGEMENT ---
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!email) {
      setError('Veuillez entrer une adresse email.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          source: 'popup', // Hardcoded source for your API
        }),
      });

      if (!response.ok) {
        throw new Error('Une erreur s\'est produite. Veuillez réessayer.');
      }

      setIsSuccess(true); // Show the success message

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form state when the dialog is closed
  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
        setError(null);
    }, 300); // Delay allows for closing animation
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-xl w-full space-y-4 rounded-2xl bg-white p-8 sm:p-10 relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <span className="sr-only">Fermer</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>

          {isSuccess ? (
            // --- SUCCESS VIEW ---
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
              <DialogTitle as="h2" className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                Parfait, c'est envoyé !
              </DialogTitle>
              <p className="mt-2 text-slate-600">
                Votre code de réduction de -20% est en route vers votre boîte de réception.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 w-full rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500"
              >
                Fermer
              </button>
            </div>
          ) : (
            // --- FORM VIEW (YOUR NEW DESIGN) ---
            <>
              <DialogTitle as="h2" className="text-3xl font-semibold tracking-tight text-slate-900 text-center">
                Attendez,
                <br /><span className="text-2xl text-balance">vous êtes sur le point de </span><span className="text-2xl text-cyan-600">perdre 4h cette semaine.</span>
              </DialogTitle>
              <p className="mt-4 text-center text-slate-600 text-balance">
                C'est le temps moyen que nos clients récupèrent en arrêtant de rédiger des comptes rendus. Concentrez-vous sur l'essentiel, on s'occupe du reste.
                <br /><br /><strong>Voici <span className="text-cyan-600">-20% sur vos 3 premiers mois</span> pour vous lancer.</strong>
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <label htmlFor="email-address" className="sr-only">Adresse email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email} // <-- Bind value to state
                  onChange={(e) => setEmail(e.target.value)} // <-- Update state on change
                  disabled={isSubmitting} // <-- Disable during submission
                  className="w-full min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 disabled:opacity-50"
                  placeholder="Votre adresse email"
                />
                <button
                  type="submit"
                  disabled={isSubmitting} // <-- Disable during submission
                  className="flex-none rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Je récupère mon temps (et -20%) →'}
                </button>
                {error && <p className="text-sm text-red-600 text-center mt-1">{error}</p>}
              </form>
              <p className="mt-3 text-xs text-center text-slate-500">
                Testez sans risque : 30 jours satisfait ou remboursé en 1 clic.
              </p>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ExitIntentPopup;