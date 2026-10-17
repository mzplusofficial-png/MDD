import React, { useState } from 'react';
import { X, Lock, Mail, Phone, Globe, UserCheck, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLogin: (email: string, password?: string) => { success: boolean; message: string; user?: User };
  onRegister: (data: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    referredByCode?: string;
  }) => { success: boolean; message: string; user?: User };
  onSwitchUser: (userId: string) => void;
  allUsers: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLogin,
  onRegister,
  onSwitchUser,
  allUsers
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('Cameroun');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [referredByCode, setReferredByCode] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Veuillez renseigner votre adresse e-mail.');
      return;
    }
    const res = onLogin(email, password);
    if (res.success) {
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Veuillez saisir votre nom complet.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    if (!whatsapp.trim()) {
      setError('Veuillez saisir votre numéro WhatsApp.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!termsAccepted) {
      setError('Vous devez accepter les conditions d’utilisation.');
      return;
    }

    const res = onRegister({
      name,
      email,
      whatsapp,
      country,
      referredByCode: referredByCode.trim() || undefined
    });

    if (res.success) {
      setSuccess('Compte créé avec succès ! Redirection vers votre espace...');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError(res.message);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Veuillez renseigner votre adresse e-mail.');
      return;
    }
    setSuccess('Si un compte est associé à cette adresse, un lien sécurisé de réinitialisation vient de vous être expédié par e-mail.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
              AUTHENTIFICATION M.D.D.
            </span>
            <h3 className="text-lg font-black text-white">
              {mode === 'login' && 'Connexion à votre espace'}
              {mode === 'register' && 'Créer votre compte membre'}
              {mode === 'forgot' && 'Réinitialiser votre mot de passe'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Fast Login Switcher (Essential for rapid review) */}
        <div className="bg-neutral-900/60 p-3 border-b border-neutral-800 text-xs">
          <div className="text-[11px] font-semibold text-neutral-400 mb-1.5 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-[#4FC3F7]" />
            <span>Comptes de Démonstration Disponibles (Accès 1 Clic) :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onSwitchUser('usr_admin_01');
                onClose();
              }}
              className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-[#FFD700] hover:bg-amber-500/20 text-[11px] font-semibold"
            >
              👑 Amadou (Admin)
            </button>
            <button
              onClick={() => {
                onSwitchUser('usr_member_01');
                onClose();
              }}
              className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[#4FC3F7] hover:bg-cyan-500/20 text-[11px] font-semibold"
            >
              👤 Koffi (Membre CI)
            </button>
            <button
              onClick={() => {
                onSwitchUser('usr_member_02');
                onClose();
              }}
              className="px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded text-neutral-300 hover:bg-neutral-700 text-[11px]"
            >
              👤 Aminata (Membre SN)
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
            className={`flex-1 py-3 text-center transition-colors ${mode === 'login' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900/40' : 'text-neutral-400 hover:text-white'}`}
          >
            Se Connecter
          </button>
          <button
            onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
            className={`flex-1 py-3 text-center transition-colors ${mode === 'register' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900/40' : 'text-neutral-400 hover:text-white'}`}
          >
            Créer un Compte
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@gmail.com"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2.5 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(null); }}
                    className="text-[11px] text-[#4FC3F7] hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2.5 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors mt-2"
              >
                SE CONNECTER
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Jean-Paul Mbarga"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Pays de résidence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-2 text-xs text-white focus:outline-none"
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

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+237 / +225..."
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 caractères"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Confirmation
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Répéter mot de passe"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Code Parrain / Affilié (Optionnel)
                </label>
                <input
                  type="text"
                  value={referredByCode}
                  onChange={(e) => setReferredByCode(e.target.value)}
                  placeholder="ex: MDD-KOFFI-92"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none uppercase font-mono"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded bg-neutral-900 border-neutral-700 text-[#4FC3F7] focus:ring-0"
                />
                <label htmlFor="terms" className="text-[11px] text-neutral-400 leading-tight">
                  J'accepte les conditions d'utilisation et la politique de protection des données de M.D.D.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors mt-2"
              >
                CRÉER MON COMPTE MEMBRE
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-neutral-400">
                Saisissez l'adresse e-mail avec laquelle vous avez créé votre compte pour recevoir les instructions de réinitialisation.
              </p>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@gmail.com"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2.5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFD700] text-black font-extrabold text-xs rounded-lg hover:bg-yellow-400 transition-colors"
              >
                ENVOYER LE LIEN DE RÉINITIALISATION
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-neutral-400 hover:text-white"
              >
                Retour à la connexion
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
