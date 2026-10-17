import React from 'react';
import { KeyRound, Library, Megaphone, TrendingUp } from 'lucide-react';

export const SystemStepsSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Accède à la plateforme et à ses ressources',
      description: 'Dès ton inscription, active ton accès sécurisé pour débloquer l’ensemble de l’écosystème : formations pas-à-pas, modèles techniques et liens privés.',
      icon: KeyRound,
      accent: 'text-[#4FC3F7]',
      border: 'border-[#4FC3F7]/30'
    },
    {
      number: '02',
      title: 'Découvre les produits digitaux disponibles',
      description: 'Explore un catalogue vérifié d’e-books, templates et masterclasses. Chaque fiche détaille précisément la licence autorisée : affiliation, revente directe ou label privé.',
      icon: Library,
      accent: 'text-[#FFD700]',
      border: 'border-[#FFD700]/30'
    },
    {
      number: '03',
      title: 'Apprends à les promouvoir et réalise tes ventes',
      description: 'Utilise nos scripts vidéo TikTok, accroches publicitaires et messages WhatsApp prêts à l’emploi. Enregistre tes commandes et encaisse via Orange Money, MTN ou Wave.',
      icon: Megaphone,
      accent: 'text-[#4FC3F7]',
      border: 'border-[#4FC3F7]/30'
    },
    {
      number: '04',
      title: 'Suis tes performances et améliore tes stratégies',
      description: 'Consulte ton tableau de bord personnel : clics, commandes générées, commissions validées et historiques de transactions en temps réel.',
      icon: TrendingUp,
      accent: 'text-[#FFD700]',
      border: 'border-[#FFD700]/30'
    }
  ];

  return (
    <section id="systeme" className="py-16 md:py-24 border-b border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4FC3F7] mb-2">
            Méthodologie Éprouvée
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 text-balance">
            Comment fonctionne le système M.D.D. ?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Un processus clair et méthodique en 4 étapes pour passer de la découverte à la première vente sans compétences informatiques préalables.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-2xl font-black font-mono ${step.accent} tabular-nums`}>
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-lg bg-neutral-800/80 text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 text-[11px] text-neutral-500 font-mono">
                  Étape {step.number} / 04
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
