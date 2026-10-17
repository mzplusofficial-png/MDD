import React, { useState } from 'react';
import { 
  Lock, MessageCircle, ArrowLeft, ShieldCheck, Sparkles, 
  Check, ArrowRight, ExternalLink, Copy, CheckCircle, 
  HelpCircle, Star, TrendingUp, Users, DollarSign, Phone
} from 'lucide-react';
import { User, PlatformSettings } from '../types';

interface AffiliateInvitationPageProps {
  currentUser: User | null;
  settings: PlatformSettings;
  onBack: () => void;
  onAccessApproved: () => void;
  onGoToPacks: () => void;
  onGoToCourse: () => void;
  onGoToCommunity: () => void;
}

export const AffiliateInvitationPage: React.FC<AffiliateInvitationPageProps> = ({
  currentUser,
  settings,
  onBack,
  onAccessApproved,
  onGoToPacks,
  onGoToCourse,
  onGoToCommunity
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [country, setCountry] = useState(currentUser?.country || 'Cameroun');
  const [invitationCode, setInvitationCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const officialNumber = '+237 691 90 66 70';
  const rawWhatsApp = '237691906670';

  const defaultMessage = `Bonjour, je souhaite demander mon accès officiel au Programme d'Affiliation M.D.D.
Nom : ${name.trim() || '[Votre Nom]'}
Email : ${email.trim() || '[Votre Email]'}
Pays : ${country}
Je souhaite recevoir mon code d'accès et mes liens pour promouvoir les produits digitaux.`;

  const whatsAppUrl = `https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
    `Bonjour, je demande mon accès officiel au Programme d'Affiliation M.D.D.\n` +
    `Nom : ${name.trim() || 'Candidat MDD'}\n` +
    `Email : ${email.trim() || 'Non renseigné'}\n` +
    `Pays : ${country}\n` +
    `Je souhaite recevoir ma validation et mon code d'affilié.`
  )}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+237691906670');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);
    if (!invitationCode.trim()) {
      setCodeError('Veuillez saisir votre code d’invitation reçu par WhatsApp.');
      return;
    }
    // Any valid invitation code: VIP2026, MDD, INVITATION, etc.
    if (
      invitationCode.toUpperCase().includes('VIP') ||
      invitationCode.toUpperCase().includes('MDD') ||
      invitationCode.toUpperCase().includes('INVIT') ||
      invitationCode.length >= 4
    ) {
      onAccessApproved();
    } else {
      setCodeError('Code non reconnu. Contactez le +237 691 90 66 70 sur WhatsApp pour obtenir votre validation.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#4FC3F7]/30 selection:text-white pb-20">
      
      {/* Top Breadcrumb & Back Bar */}
      <div className="border-b border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Retour à l'accueil M.D.D.</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-500 hidden sm:inline">Statut d'accès :</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#FFD700] border border-amber-500/30 font-bold uppercase tracking-wider text-[10px]">
              Sur Invitation Exclusive
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-4 shadow-lg shadow-amber-500/5">
            <Lock className="w-3.5 h-3.5" />
            <span>ACCÈS SÉLECTIONNÉ &bull; OPTION 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5 text-balance">
            DEMANDEZ VOTRE ACCÈS AU PROGRAMME D'AFFILIATION
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
            Pour maintenir un niveau d'excellence et garantir un accompagnement personnalisé, l'accès à notre catalogue de produits prêts à vendre et au système de commissions est <strong className="text-white">strictement accordé sur invitation</strong>.
          </p>
        </div>

        {/* 2-Column Luxury Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (7 Col): The VIP Contact Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Interactive Contact Container */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div 
                aria-hidden="true" 
                className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between pb-5 border-b border-neutral-800/80 mb-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#4FC3F7] uppercase tracking-wider block">
                    PROCÉDURE OFFICIELLE DE VALIDATION
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Coordonnées du Responsable d'Admission
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Exact instruction requested */}
              <div className="p-4 sm:p-5 bg-black/70 rounded-2xl border border-neutral-800 space-y-2 mb-6">
                <div className="text-xs font-bold text-[#FFD700] uppercase font-mono tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Instruction obligatoire :</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-100 leading-relaxed font-medium">
                  Demandez votre accès au programme d'affiliation. Contactez le{' '}
                  <span className="text-[#FFD700] font-mono font-extrabold underline decoration-[#25D366] text-lg sm:text-xl inline-block">
                    +237 691906670
                  </span>{' '}
                  en lui fournissant votre adresse e-mail et votre nom.
                </p>
              </div>

              {/* Form to Prepare and Customize the WhatsApp Message */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-300">
                    Complétez vos coordonnées pour préparer votre message :
                  </span>
                  <span className="text-[11px] font-mono text-[#4FC3F7]">
                    Optionnel mais recommandé
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Votre Nom &amp; Prénom
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Jean-Paul Mbarga"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#4FC3F7] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Votre Adresse E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: contact@gmail.com"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#4FC3F7] rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Votre Pays de Résidence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#4FC3F7] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none"
                  >
                    <option value="Cameroun">🇨🇲 Cameroun</option>
                    <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                    <option value="Sénégal">🇸🇳 Sénégal</option>
                    <option value="Bénin">🇧🇯 Bénin</option>
                    <option value="Togo">🇹🇬 Togo</option>
                    <option value="Gabon">🇬🇦 Gabon</option>
                    <option value="Tchad">🇹🇩 Tchad</option>
                    <option value="Congo">🇨🇬 Congo</option>
                    <option value="RDC">🇨🇩 RDC</option>
                    <option value="Autre pays">🌍 Autre pays</option>
                  </select>
                </div>

                {/* Live Message Preview */}
                <div className="p-3 bg-neutral-950/90 rounded-xl border border-neutral-800/80 text-xs">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                    Aperçu du message transmis sur WhatsApp :
                  </span>
                  <div className="font-mono text-neutral-300 text-[11px] whitespace-pre-line leading-relaxed">
                    {defaultMessage}
                  </div>
                </div>
              </div>

              {/* GIANT PRIMARY ACTION BUTTON (CONTACTER) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:col-span-8 py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-black font-black text-sm sm:text-base rounded-2xl transition-all shadow-xl shadow-[#25D366]/25 flex items-center justify-center gap-3 text-center group"
                  >
                    <MessageCircle className="w-6 h-6 text-black fill-current shrink-0" />
                    <span className="tracking-wider uppercase text-base font-extrabold">
                      CONTACTER
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>

                  <a
                    href="tel:+237691906670"
                    className="sm:col-span-4 py-4 px-4 bg-neutral-950 border border-neutral-800 hover:border-[#FFD700] text-neutral-200 hover:text-[#FFD700] rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
                    <span className="font-mono">+237 691 90 66 70</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono px-1">
                  <span>Numéro direct : +237 691906670</span>
                  <button
                    onClick={handleCopyPhone}
                    className="hover:text-neutral-300 flex items-center gap-1 transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Numéro copié !' : 'Copier le numéro'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Already Have an Invitation Code Box */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                  <span>Vous avez déjà reçu votre code d'invitation ?</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">Validation instantanée</span>
              </div>
              <p className="text-xs text-neutral-400">
                Si le responsable vous a déjà transmis un code officiel, saisissez-le ci-dessous pour déverrouiller immédiatement le catalogue :
              </p>

              <form onSubmit={handleValidateCode} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  placeholder="Ex: VIP2026 ou MDD-INVITE"
                  className="flex-1 bg-black border border-neutral-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FFD700] hover:bg-yellow-400 text-black text-xs font-extrabold rounded-xl transition-colors whitespace-nowrap"
                >
                  Débloquer l'Affiliation
                </button>
              </form>

              {codeError && (
                <p className="text-xs text-red-400 font-medium">{codeError}</p>
              )}
            </div>

          </div>

          {/* Right Column (5 Col): Perks & What Happens Next */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Privilege Card */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Ce Que Débloque Votre Invitation</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800 text-[#4FC3F7] shrink-0 mt-0.5">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      Commissions Directes de 40% à 60%
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Chaque vente générée via votre lien d'affilié crédite votre compte sans frais de gestion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800 text-[#FFD700] shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      Catalogue de Produits Prêts à Promouvoir
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      E-books, masterclasses vidéo et kits Canva déjà prêts avec pages de vente optimisées mobile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800 text-emerald-400 shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      Accompagnement Personnalisé
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Revue de vos conversations WhatsApp et conseils pour vos premières ventes en ligne.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Free Available Options While Waiting */}
            <div className="bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                En attendant votre validation :
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Vous pouvez d'ores et déjà explorer nos autres pôles accessibles librement et sans invitation :
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={onGoToPacks}
                  className="w-full text-left p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#FFD700] transition-colors flex items-center justify-between text-xs group"
                >
                  <span className="font-semibold text-white group-hover:text-[#FFD700]">
                    Option 2 : Méga Pack Produits (Téléchargement direct)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFD700]" />
                </button>

                <button
                  onClick={onGoToCourse}
                  className="w-full text-left p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#4FC3F7] transition-colors flex items-center justify-between text-xs group"
                >
                  <span className="font-semibold text-white group-hover:text-[#4FC3F7]">
                    Option 3 : Formations Vidéos (5 Modules Gratuits)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#4FC3F7]" />
                </button>

                <button
                  onClick={onGoToCommunity}
                  className="w-full text-left p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-400 transition-colors flex items-center justify-between text-xs group"
                >
                  <span className="font-semibold text-white group-hover:text-emerald-400">
                    Option 4 : Communauté &amp; Live du Samedi 19h
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
