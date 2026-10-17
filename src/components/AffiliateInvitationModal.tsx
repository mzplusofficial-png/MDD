import React, { useState } from 'react';
import { X, Lock, MessageCircle, ShieldAlert, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { User } from '../types';

interface AffiliateInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAccessGranted?: () => void;
}

export const AffiliateInvitationModal: React.FC<AffiliateInvitationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAccessGranted
}) => {
  const [userName, setUserName] = useState(currentUser?.name || '');
  const [userEmail, setUserEmail] = useState(currentUser?.email || '');
  const [invitationCode, setInvitationCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetWhatsApp = '237691906670';
  const formattedPhone = '+237 691 90 66 70';

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Bonjour, je demande mon accès officiel au Programme d'Affiliation M.D.D.\n` +
      `Nom : ${userName.trim() || 'Non renseigné'}\n` +
      `Email : ${userEmail.trim() || 'Non renseigné'}\n` +
      `Je souhaite obtenir mon lien d'invitation personnel.`
    );
    return `https://wa.me/${targetWhatsApp}?text=${text}`;
  };

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);
    if (!invitationCode.trim()) {
      setCodeError('Veuillez entrer un code d’invitation valide.');
      return;
    }
    // Accept valid demo invitation codes (e.g. VIP2026, MDD-INVITE, or any admin code)
    if (
      invitationCode.toUpperCase().includes('VIP') || 
      invitationCode.toUpperCase().includes('MDD') ||
      invitationCode.toUpperCase().includes('INVIT')
    ) {
      if (onAccessGranted) onAccessGranted();
      onClose();
    } else {
      setCodeError('Code d’invitation non reconnu. Veuillez contacter le +237 691 90 66 70 pour obtenir votre invitation.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#FFD700] border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#FFD700] uppercase tracking-wider block">
                ACCÈS SUR INVITATION UNIQUEMENT
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Programme d'Affiliation M.D.D.
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Official Notice */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                Le programme d'affiliation et les produits digitaux prêts à vendre sont <strong className="text-white">accessibles exclusivement sur invitation</strong>.
              </div>
            </div>

            <div className="p-3.5 bg-black/70 rounded-lg border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
              <div className="text-[#4FC3F7] font-semibold">
                Consigne pour demander votre accès :
              </div>
              <p className="leading-relaxed">
                Demandez votre accès au programme d'affiliation. Contactez le <strong className="text-white font-mono text-sm underline decoration-[#4FC3F7]">{formattedPhone}</strong> en lui fournissant votre adresse e-mail et votre nom.
              </p>
            </div>
          </div>

          {/* Form to Pre-fill details */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Votre nom complet
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ex: Koffi Mensah"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Votre adresse e-mail
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Ex: contact@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Direct Primary Contact Action Button */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2.5 text-center mt-2 group"
            >
              <MessageCircle className="w-5 h-5 text-black" />
              <span className="tracking-wide">CONTACTER LE +237 691 90 66 70</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <p className="text-[11px] text-neutral-500 text-center font-mono">
              Un message WhatsApp pré-rempli avec votre nom et e-mail s'ouvrira directement.
            </p>
          </div>

          {/* Invitation Code unlock option (if already contacted) */}
          <div className="pt-4 border-t border-neutral-800/80">
            <span className="text-xs text-neutral-400 block mb-2 font-medium">
              Vous avez déjà reçu votre invitation de l'administrateur ?
            </span>

            <form onSubmit={handleValidateCode} className="flex gap-2">
              <input
                type="text"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                placeholder="Code invitation (ex: VIP2026)"
                className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-[#FFD700] rounded-lg px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-800 hover:bg-[#FFD700] hover:text-black text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Débloquer
              </button>
            </form>

            {codeError && (
              <p className="text-[11px] text-red-400 mt-1.5 font-medium">{codeError}</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>Support Officiel M.D.D. Douala</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
