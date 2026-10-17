import React from 'react';
import { ShieldCheck, MessageCircle, Mail } from 'lucide-react';
import { PlatformSettings } from '../types';

interface FooterProps {
  settings: PlatformSettings;
  onOpenArchitectureGuide: () => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenArchitectureGuide,
  onOpenCheckout
}) => {
  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-neutral-400 text-xs py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (5 Col) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FFD700] to-[#4FC3F7] p-[1px] shrink-0">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center font-black text-xs text-[#FFD700]">
                  MDD
                </div>
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white">
                LES MILLIONNAIRES DU DIGITAL
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Plateforme d'accélération et de formation conçue pour accompagner les jeunes entrepreneurs d'Afrique francophone dans la vente de produits digitaux avec des solutions adaptées au continent.
            </p>

            <div className="text-[11px] text-neutral-500 font-mono">
              Fuseau de référence : Afrique/Douala (GMT+1)
            </div>
          </div>

          {/* Quick Links (3 Col) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Écosystème M.D.D.
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#systeme" className="hover:text-white transition-colors">
                  Le Système en 4 Étapes
                </a>
              </li>
              <li>
                <a href="#programme" className="hover:text-white transition-colors">
                  Ce que tu obtiens
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Questions Fréquentes
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenArchitectureGuide} 
                  className="hover:text-[#FFD700] transition-colors text-left"
                >
                  Documentation Paiements &amp; API
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support (4 Col) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Assistance &amp; Contact
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <MessageCircle className="w-4 h-4 text-[#4FC3F7]" />
                <span>WhatsApp : <strong className="font-mono text-white">{settings.supportWhatsApp}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                <span>E-mail : <strong className="font-mono text-white">{settings.supportEmail}</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenCheckout}
                className="w-full sm:w-auto px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-[#4FC3F7] text-white hover:text-[#4FC3F7] rounded-lg text-xs font-semibold transition-colors"
              >
                Accéder aux 4 Pôles M.D.D. (Accès Libre)
              </button>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Transparency */}
        <div className="pt-8 border-t border-neutral-900 space-y-3 text-[11px] text-neutral-500 leading-relaxed">
          <p>
            <strong>Avertissement légal :</strong> Le site « Les Millionnaires du Digital » (M.D.D.) dispense des formations professionnelles, des modèles et des ressources commerciales. Les résultats financiers varient selon le travail, la rigueur, les compétences et les conditions de marché de chaque utilisateur. Aucun gain automatique n'est promis ni garanti.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              &copy; {new Date().getFullYear()} Les Millionnaires du Digital (M.D.D.). Tous droits réservés.
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="hover:text-white cursor-pointer">Conditions Générales d'Utilisation</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer">Politique de Confidentialité</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
