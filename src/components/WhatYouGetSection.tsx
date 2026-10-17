import React from 'react';
import { 
  Package, Layout, Sparkles, GraduationCap, 
  Video, Users, BarChart3, AlertCircle, Check
} from 'lucide-react';
import { PlatformSettings } from '../types';

interface WhatYouGetProps {
  settings: PlatformSettings;
  onJoinClick: () => void;
}

export const WhatYouGetSection: React.FC<WhatYouGetProps> = ({ settings, onJoinClick }) => {
  const deliverables = [
    {
      title: 'Catalogue de plus de 100 produits digitaux',
      desc: 'E-books professionnels, templates Canva, logiciels légers et masterclasses, prêts à être promus ou revendus selon les droits de licence clairs (MRR, PLR, Affiliation).',
      icon: Package
    },
    {
      title: 'Plus de 20 modèles de pages de vente',
      desc: 'Tunnels spécialement optimisés pour les écrans de smartphone et les vitesses de connexion 3G/4G en Afrique francophone, avec bouton direct WhatsApp.',
      icon: Layout
    },
    {
      title: 'Ressources marketing prêtes à l’emploi',
      desc: 'Scripts vidéo TikTok / Reels testés, accroches publicitaires percutantes, messages types WhatsApp pour lever les objections et calendriers éditoriaux.',
      icon: Sparkles
    },
    {
      title: 'Formation complète étape par étape',
      desc: 'Parcours vidéo structuré en 5 modules : des fondamentaux de l’entrepreneuriat numérique jusqu’à la négociation et l’automatisation des encaissements.',
      icon: GraduationCap
    },
    {
      title: 'Sessions privées hebdomadaires & coaching',
      desc: 'Chaque samedi à 19h00 (Heure de Douala GMT+1) : analyses en direct de pages de vente, audits de conversations WhatsApp et réponses à toutes vos questions.',
      icon: Video
    },
    {
      title: 'Communauté privée de membres engagés',
      desc: 'Entraide active, partage des stratégies qui fonctionnent actuellement dans vos pays respectifs et veille continue sur les nouvelles tendances.',
      icon: Users
    },
    {
      title: 'Tableau de bord de suivi commercial',
      desc: 'Outil de suivi précis de vos clics d’affilié, commandes passées, statuts de paiement Mobile Money et calcul automatique de vos commissions.',
      icon: BarChart3
    }
  ];

  return (
    <section id="programme" className="py-16 md:py-24 border-b border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FFD700] mb-2">
              Le Contenu du Programme
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 text-balance">
              Ce que tu obtiens en rejoignant M.D.D.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Une boîte à outils complète, sans frais cachés, conçue pour vous donner tous les leviers nécessaires au démarrage de votre activité en ligne.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onJoinClick}
              className="px-5 py-3 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors whitespace-nowrap"
            >
              Accéder aux 4 Pôles du Système
            </button>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Deliverables List (7 Col) */}
          <div className="lg:col-span-7 space-y-4">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-neutral-800 text-[#4FC3F7] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup Showcase (5 Col) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/mdd_digital_pack_1792201256151.jpg"
                alt="Pack digital des ressources M.D.D. : e-books, templates et écrans d'analytics"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <div className="p-5 bg-neutral-950 border-t border-neutral-800">
                <div className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                  Pack Ressources 2026 inclus
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  Tous les fichiers sont téléchargeables directement dans votre espace membre dès validation de votre inscription.
                </div>
              </div>
            </div>

            {/* Honest Ethical Transparency Note */}
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-white block mb-1">Avertissement de responsabilité &amp; réalisme :</strong>
                La réussite dans le commerce de produits digitaux dépend entièrement de votre travail, de l'application rigoureuse des méthodes enseignées et de votre constance. La plateforme fournit les outils, modèles et formations, mais ne garantit en aucun cas des gains automatiques ou sans effort.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
