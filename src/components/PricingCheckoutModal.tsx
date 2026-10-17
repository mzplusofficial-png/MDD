import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Smartphone, CreditCard, Sparkles, AlertTriangle } from 'lucide-react';
import { PlatformSettings, PaymentMethod, User } from '../types';

interface PricingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PlatformSettings;
  currentUser: User | null;
  onCompleteOrder: (orderData: {
    userId: string;
    userName: string;
    userEmail: string;
    userWhatsapp: string;
    userCountry: string;
    itemType: 'subscription' | 'digital_product';
    itemId: string;
    itemTitle: string;
    amountFCFA: number;
    paymentMethod: PaymentMethod;
    paymentProvider: any;
    affiliateCode?: string;
  }, transactionRef: string) => void;
}

export const PricingCheckoutModal: React.FC<PricingCheckoutModalProps> = ({
  isOpen,
  onClose,
  settings,
  currentUser,
  onCompleteOrder
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [whatsapp, setWhatsapp] = useState(currentUser?.whatsapp || '');
  const [country, setCountry] = useState(currentUser?.country || 'Cameroun');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange_money');
  const [affiliateCode, setAffiliateCode] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Map method to readable provider
  const getProviderName = (m: PaymentMethod): any => {
    switch (m) {
      case 'orange_money': return 'Orange Money';
      case 'mtn_momo': return 'MTN Mobile Money';
      case 'wave': return 'Wave';
      case 'moov_money': return 'Moov Africa';
      case 'airtel_money': return 'Airtel Money';
      case 'bank_card': return 'Carte Bancaire';
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError('Veuillez compléter toutes les coordonnées de contact.');
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = (customRef?: string) => {
    const finalRef = customRef || transactionRef.trim();
    if (!finalRef) {
      setError('Veuillez renseigner le numéro ou ID de transaction figurant sur votre SMS de débit.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Simulate verified webhook / server reconciliation
    setTimeout(() => {
      setIsProcessing(false);
      onCompleteOrder({
        userId: currentUser?.id || `usr_client_${Date.now()}`,
        userName: name,
        userEmail: email,
        userWhatsapp: whatsapp,
        userCountry: country,
        itemType: 'subscription',
        itemId: 'sub_mdd_pass',
        itemTitle: 'Accès Annuel M.D.D. - Les Millionnaires du Digital',
        amountFCFA: settings.membershipPriceFCFA,
        paymentMethod,
        paymentProvider: getProviderName(paymentMethod),
        affiliateCode: affiliateCode.trim() || undefined
      }, finalRef);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950">
          <div>
            <div className="text-[11px] font-mono font-bold text-[#FFD700] uppercase tracking-wider">
              COMMANDE SÉCURISÉE &bull; MDD PASS
            </div>
            <h3 className="text-lg font-black text-white">
              {step === 1 && 'Informations de facturation'}
              {step === 2 && 'Paiement sécurisé par Mobile Money'}
              {step === 3 && 'Commande confirmée avec succès'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs font-mono">
          <span className={step >= 1 ? 'text-[#4FC3F7] font-bold' : 'text-neutral-500'}>1. Coordonnées</span>
          <span className="text-neutral-600">&rarr;</span>
          <span className={step >= 2 ? 'text-[#4FC3F7] font-bold' : 'text-neutral-500'}>2. Règlement</span>
          <span className="text-neutral-600">&rarr;</span>
          <span className={step === 3 ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>3. Activation</span>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
              {error}
            </div>
          )}

          {/* STEP 1: FORM */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              
              {/* Product Summary Box */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Adhésion Annuelle M.D.D.</div>
                  <div className="text-[11px] text-neutral-400">100+ Produits, Formations &amp; Coaching</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#FFD700] font-mono tabular-nums">
                    {settings.membershipPriceFCFA.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    ≈ {settings.membershipPriceEUR} €
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Nom &amp; Prénom
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom complet"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
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
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Pays
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
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods Picker */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Sélectionnez votre moyen de paiement local :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('orange_money')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'orange_money' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Orange Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn_momo')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'mtn_momo' ? 'border-yellow-400 bg-yellow-400/10 text-yellow-300' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wave')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'wave' ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Wave</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('moov_money')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'moov_money' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Moov Africa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('airtel_money')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'airtel_money' ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Airtel Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_card')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${paymentMethod === 'bank_card' ? 'border-purple-400 bg-purple-400/10 text-purple-300' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  >
                    <CreditCard className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Carte Bancaire</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Code Parrain / Affiliation (Si vous en avez un)
                </label>
                <input
                  type="text"
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value)}
                  placeholder="ex: MDD-KOFFI-92"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-lg py-2 px-3 text-xs text-white focus:outline-none uppercase font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>CONTINUER VERS LE PAIEMENT SÉCURISÉ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT INSTRUCTION & REAL CONFIRMATION */}
          {step === 2 && (
            <div className="space-y-5">
              
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-xs text-neutral-400">Montant net à transférer :</span>
                    <div className="text-xl font-black text-[#FFD700] font-mono tabular-nums">
                      {settings.membershipPriceFCFA.toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-black/50 border border-neutral-700 rounded text-xs font-bold text-white">
                    {getProviderName(paymentMethod)}
                  </div>
                </div>

                <div className="text-xs text-neutral-300 space-y-2">
                  <div className="font-semibold text-white">Instructions de transfert :</div>
                  {paymentMethod === 'orange_money' && (
                    <div className="bg-black/60 p-3 rounded-lg border border-neutral-800 text-[11px] space-y-1">
                      <div>1. Composez <strong className="text-orange-400 font-mono">#150*14*691234567*6550#</strong> ou ouvrez Orange Money Max.</div>
                      <div>2. Nom du compte marchand agréé : <strong className="text-white">MDD DIGITAL SARL</strong>.</div>
                      <div>3. Validez avec votre code secret privé.</div>
                    </div>
                  )}

                  {paymentMethod === 'mtn_momo' && (
                    <div className="bg-black/60 p-3 rounded-lg border border-neutral-800 text-[11px] space-y-1">
                      <div>1. Composez <strong className="text-yellow-300 font-mono">*126*14*677894512*6550#</strong> sur votre ligne MTN.</div>
                      <div>2. Validez le paiement pour <strong className="text-white">MDD PARTNERS</strong>.</div>
                      <div>3. Vous recevrez un SMS avec votre référence de transaction.</div>
                    </div>
                  )}

                  {paymentMethod === 'wave' && (
                    <div className="bg-black/60 p-3 rounded-lg border border-neutral-800 text-[11px] space-y-1">
                      <div>1. Ouvrez l'application Wave sur votre téléphone.</div>
                      <div>2. Scannez le QR Code marchand ou transférez vers le compte professionnel <strong className="text-cyan-300 font-mono">+225 07 88 99 00</strong>.</div>
                    </div>
                  )}

                  {(paymentMethod === 'moov_money' || paymentMethod === 'airtel_money' || paymentMethod === 'bank_card') && (
                    <div className="bg-black/60 p-3 rounded-lg border border-neutral-800 text-[11px] space-y-1">
                      <div>Passerelle de paiement sécurisée FedaPay / CinetPay prête pour débit direct.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Réf de transaction input */}
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  ID / Référence de Transaction (reçu par SMS de votre opérateur) :
                </label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="ex: OM-CM-9841029 ou WAV-CI-554109"
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-[#4FC3F7] rounded-lg py-2.5 px-3 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleConfirmPayment()}
                  className="w-full py-3 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Vérification du paiement en cours...' : 'VALIDER MA TRANSACTION & ACTIVER MON ACCÈS'}
                </button>

                {/* Sandbox Webhook Simulation Button (For instant developer review) */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => {
                    const mockRef = `TEST-HOOK-${Math.floor(100000 + Math.random() * 900000)}`;
                    handleConfirmPayment(mockRef);
                  }}
                  className="w-full py-2 bg-neutral-900 border border-dashed border-neutral-700 text-neutral-400 hover:text-[#FFD700] hover:border-[#FFD700]/50 rounded-lg text-[11px] font-mono transition-colors"
                >
                  [Sandbox Démo] Simuler la réception d'un Webhook vérifié à 100%
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-neutral-500 hover:text-neutral-300 py-1"
                >
                  &larr; Revenir à l'étape précédente
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white">
                Félicitations et Bienvenue !
              </h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Votre paiement a été validé avec succès par le serveur. Votre compte membre est désormais débloqué avec accès complet au catalogue, aux formations et aux ressources.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors"
              >
                ACCÉDER À MON ESPACE MEMBRE
              </button>
            </div>
          )}

        </div>

        {/* Security Footer Notice */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sécurité TLS 256-bit &bull; Aucune donnée confidentielle ni code PIN stocké</span>
        </div>

      </div>
    </div>
  );
};
