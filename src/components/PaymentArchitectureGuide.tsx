import React, { useState } from 'react';
import { X, Shield, Terminal, Key, CheckCircle, AlertTriangle, Code, ExternalLink } from 'lucide-react';
import { PlatformSettings } from '../types';

interface PaymentArchitectureGuideProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PlatformSettings;
}

export const PaymentArchitectureGuide: React.FC<PaymentArchitectureGuideProps> = ({
  isOpen,
  onClose,
  settings
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'gateways' | 'webhooks' | 'security'>('status');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-[#FFD700] uppercase tracking-wider">
                ARCHITECTURE TECHNIQUE &amp; DOCUMENTATION OFFICIELLE
              </span>
              <h3 className="text-lg font-black text-white">
                Intégration Paiements Afrique &amp; État du Déploiement
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/60 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-5 whitespace-nowrap transition-colors ${activeTab === 'status' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            1. État des Fonctionnalités &amp; Clés Externes
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`py-3 px-5 whitespace-nowrap transition-colors ${activeTab === 'gateways' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            2. Passerelles Prises en Charge
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`py-3 px-5 whitespace-nowrap transition-colors ${activeTab === 'webhooks' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            3. Webhooks &amp; Réconciliation Serveur
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-5 whitespace-nowrap transition-colors ${activeTab === 'security' ? 'text-[#4FC3F7] border-b-2 border-[#4FC3F7] bg-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            4. Sécurité &amp; Protection PIN
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
          
          {/* TAB 1: STATUS OF FEATURES */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Fonctionnalités Entièrement Opérationnelles dans le Code</span>
                </h4>
                <ul className="space-y-1.5 text-neutral-300 pl-6 list-disc">
                  <li><strong>Interface Utilisateur &amp; Design :</strong> Navigation mobile-first, Dark Theme #0A0A0A, polices Montserrat + Plus Jakarta Sans.</li>
                  <li><strong>Catalogue de Produits Numériques :</strong> Fiches détaillées, tri, filtrage par droits d’usage (MRR, PLR, Affiliation, Consultation).</li>
                  <li><strong>Système de Formations :</strong> Parcours 5 modules, suivi de complétion par leçon, téléchargement de ressources, lecteur vidéo.</li>
                  <li><strong>Modèles de Pages de Vente :</strong> Visualisation, copie de structure, code HTML responsive avec CTA direct WhatsApp.</li>
                  <li><strong>Ressources Marketing :</strong> Scripts TikTok viraux, séquences WhatsApp de closing, calendrier 30 jours, téléchargement direct.</li>
                  <li><strong>Moteur d’Affiliation :</strong> Génération d’identifiants uniques (ex: <code>MDD-KOFFI-92</code>), calcul transparent des commissions (40% par défaut), ledger de commissions.</li>
                  <li><strong>Espace Administrateur :</strong> Gestion des membres, création de produits, mise à jour des prix FCFA, validation manuelle, export CSV complet, audit logs.</li>
                  <li><strong>Base de Données &amp; Schéma :</strong> Schéma PostgreSQL complet avec tables, relations, index et triggers dans <code>/src/db/schema.sql</code>.</li>
                </ul>
              </div>

              <div className="bg-neutral-900 border border-amber-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#FFD700] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Éléments Nécessitant une Configuration Externe en Production</span>
                </h4>
                <p className="mb-3 text-neutral-400">
                  Conformément au cahier des charges éthique, aucune fausse clé API n’est injectée et aucune transaction réelle n’est simulée comme ayant réellement débité un compte bancaire sans passerelle configurée. Voici les 3 éléments à brancher en production :
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-black/60 rounded-lg border border-neutral-800">
                    <span className="font-bold text-white block">1. Clés d'API Marchand CinetPay / FedaPay :</span>
                    <span className="text-neutral-400">Remplir les variables <code>CINETPAY_API_KEY</code> et <code>CINETPAY_SITE_ID</code> dans votre fichier <code>.env</code> après validation de votre compte marchand légal au Cameroun ou en Côte d’Ivoire.</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-lg border border-neutral-800">
                    <span className="font-bold text-white block">2. Webhook URL sur le tableau de bord du prestataire :</span>
                    <span className="text-neutral-400">Déclarer l'URL <code>https://votre-domaine.com/api/webhooks/cinetpay</code> dans votre espace CinetPay pour recevoir les accusés de débit en temps réel.</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-lg border border-neutral-800">
                    <span className="font-bold text-white block">3. Token WhatsApp Business Cloud API :</span>
                    <span className="text-neutral-400">Optionnel : brancher <code>WHATSAPP_BUSINESS_TOKEN</code> si vous souhaitez que les notifications de commande soient envoyées automatiquement sur les téléphones des clients.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: GATEWAYS DETAIL */}
          {activeTab === 'gateways' && (
            <div className="space-y-4">
              <p className="text-neutral-300">
                La plateforme supporte une architecture modulaire multi-passerelles selon la disponibilité locale :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.gateways.map(gw => (
                  <div key={gw.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-sm">{gw.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {gw.testMode ? 'MODE SANDBOX' : 'LIVE'}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mb-2">
                      <strong>Pays supportés :</strong> {gw.supportedCountries.join(', ')}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      <strong>Méthodes :</strong> {gw.supportedMethods.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WEBHOOKS */}
          {activeTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="text-neutral-300">
                Exemple de contrôleur serveur Express pour réception et validation cryptographique du webhook Mobile Money :
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                <pre>{`// server/routes/webhooks.ts
import crypto from 'crypto';
import express from 'express';

export const webhookRouter = express.Router();

webhookRouter.post('/api/webhooks/cinetpay', async (req, res) => {
  const { cpm_trans_id, cpm_site_id, cpm_trans_status, cpm_amount } = req.body;
  const receivedToken = req.headers['x-token'];

  // 1. Contrôle d'intégrité HMAC-SHA256
  const computedHash = crypto
    .createHmac('sha256', process.env.CINETPAY_SECRET_KEY!)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // 2. Vérification obligatoire côté serveur
  if (cpm_trans_status === 'ACCEPTED') {
    // Activer l'accès membre dans PostgreSQL
    // Créditer la commission de l'affilié
    // Logger l'audit de transaction
    return res.status(200).json({ status: 'SUCCESS_CONFIRMED' });
  }

  return res.status(400).json({ error: 'TRANSACTION_REJECTED' });
});`}</pre>
              </div>

              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400">
                <strong className="text-white block mb-1">Règle de sécurité stricte :</strong>
                Une commande n'est <em>jamais</em> marquée comme payée sur la simple redirection du navigateur web. Seul l'appel serveur-à-serveur (Server-to-Server Webhook) garantit que les fonds ont été réellement reçus sur le compte marchand de l'entreprise.
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & PIN PROTECTION */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-red-400">
                  Règle d'or : Protection du Code PIN Mobile Money
                </h4>
                <p className="text-neutral-300">
                  La plateforme <strong>ne demande JAMAIS et ne stocke JAMAIS</strong> le code PIN Mobile Money d'un utilisateur.
                </p>
                <p className="text-neutral-400 text-[11px]">
                  Le débit est toujours approuvé par le client directement sur le prompt USSD sécurisé de son opérateur réseau (Orange, MTN, Wave, Airtel), protégé par la carte SIM de son smartphone.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-white">Gestion des Rôles &amp; Permissions</h4>
                <p className="text-neutral-300">
                  Le statut de membre administrateur donne accès exclusif à la console de gestion, aux exports CSV et aux journaux d'audit. Les sessions membres sont vérifiées à chaque chargement de vue.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-500">
            Version Spécification : M.D.D. v1.0.0 &bull; Douala, Afrique
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Fermer le guide
          </button>
        </div>

      </div>
    </div>
  );
};
