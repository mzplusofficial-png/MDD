import React from 'react';
import { UserCheck, BookOpen, Briefcase, Video, Building2 } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const audiences = [
    {
      title: 'Aux Débutants',
      badge: 'Zéro Prérequis',
      desc: 'Même si vous n’avez jamais vendu en ligne et n’y connaissez rien en code, nos guides pas-à-pas et vidéos vous prennent par la main pour vos premières actions.',
      icon: UserCheck
    },
    {
      title: 'Aux Étudiants',
      badge: 'Flexibilité & Autonomie',
      desc: 'Pour développer des compétences concrètes très demandées (marketing, rédaction, création de contenu) et générer des revenus depuis votre smartphone.',
      icon: BookOpen
    },
    {
      title: 'Aux Salariés',
      badge: 'Revenu Complémentaire',
      desc: 'Pour bâtir un actif numérique en consacrant 1 à 2 heures par soirée, sans perturber votre emploi actuel ni dépendre d’un seul salaire.',
      icon: Briefcase
    },
    {
      title: 'Aux Créateurs de Contenu',
      badge: 'Monétisation d’Audience',
      desc: 'Pour cesser de dépendre uniquement des placements de produits éphémères et vendre vos propres offres numériques à forte valeur ajoutée.',
      icon: Video
    },
    {
      title: 'Aux Entrepreneurs Existants',
      badge: 'Diversification & Marge',
      desc: 'Pour ajouter des produits dématérialisés à vos activités physiques, éliminer les frais logistiques et maximiser votre rentabilité nette.',
      icon: Building2
    }
  ];

  return (
    <section className="py-16 md:py-24 border-b border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4FC3F7] mb-2">
            Public Cible
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 text-balance">
            Pour qui est conçu le programme ?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Une méthodologie universelle, pensée pour s’adapter aux contraintes de temps et de budget des Africains francophones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud, index) => {
            const Icon = aud.icon;
            return (
              <div
                key={index}
                className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-neutral-800 text-[#FFD700]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {aud.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Tile: Recap box */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-[#4FC3F7]/30 rounded-xl p-6 flex flex-col justify-center">
            <div className="text-xs font-bold text-[#4FC3F7] uppercase tracking-wider mb-2">
              Le point commun
            </div>
            <div className="text-sm font-semibold text-white mb-2">
              Une volonté sincère d'apprendre et de passer à l'action.
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Si vous êtes prêt à appliquer avec rigueur les consignes et à respecter vos clients, ce système vous donnera toute la structure nécessaire.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
