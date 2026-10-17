import React from 'react';
import { ShoppingBag, PackageOpen, GraduationCap, Users, ArrowRight, Check, Sparkles } from 'lucide-react';

interface CoreOptionsSectionProps {
  onSelectOption: (tab: 'catalog' | 'packs' | 'course' | 'community') => void;
}

export const CoreOptionsSection: React.FC<CoreOptionsSectionProps> = ({ onSelectOption }) => {
  const options = [
    {
      id: 'catalog',
      number: 'Option 1',
      badge: 'Prêt à Vendre Immédiatement',
      badgeColor: 'text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/30',
      title: "Programme d'Affiliation & Produits Digitaux Prêts à Vendre",
      desc: "Accédez à un catalogue complet de produits numériques testés. Vous recevez un lien d'affilié unique pour chaque produit et touchez des commissions directes sans créer de contenu vous-même.",
      features: [
        "Catalogue de produits immédiatement opérationnels",
        "Lien d'affiliation personnel généré en 1 clic",
        "Commissions nettes de 40% à 60% par vente",
        "Guides de promotion et scripts de vente fournis"
      ],
      cta: "Accéder aux Produits & à l'Affiliation",
      icon: ShoppingBag,
      accentBorder: 'hover:border-[#4FC3F7]'
    },
    {
      id: 'packs',
      number: 'Option 2',
      badge: 'Droits de Revente MRR & PLR',
      badgeColor: 'text-[#FFD700] bg-[#FFD700]/10 border-[#FFD700]/30',
      title: "Le Méga Pack de Plusieurs Produits Digitaux",
      desc: "Téléchargez directement notre pack massif contenant des dizaines d'e-books, guides complets et plus de 500 templates Canva Pro modifiables avec droits légaux de revente.",
      features: [
        "Plus de 100 e-books et guides pratiques complets",
        "Pack de 500+ templates Canva Pro éditables",
        "Licences de revente maître (MRR) & label privé (PLR)",
        "Téléchargement direct immédiat sans restriction"
      ],
      cta: "Explorer & Télécharger les Packs",
      icon: PackageOpen,
      accentBorder: 'hover:border-[#FFD700]'
    },
    {
      id: 'course',
      number: 'Option 3',
      badge: 'Académie Pratique Vidéo',
      badgeColor: 'text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/30',
      title: "Les Formations Vidéos & Masterclasses",
      desc: "Apprenez les méthodes concrètes pour vendre sur internet depuis l'Afrique francophone : closing par WhatsApp, création de vidéos TikTok virales sans montrer votre visage et automatisation.",
      features: [
        "5 modules structurés de A à Z pour débutants",
        "Lecteur vidéo fluide avec suivi de progression (%)",
        "Méthode WhatsApp Business pour convertir des prospects",
        "Documents, fiches d'exercices et plans d'action"
      ],
      cta: "Accéder aux Formations Vidéo",
      icon: GraduationCap,
      accentBorder: 'hover:border-[#4FC3F7]'
    },
    {
      id: 'community',
      number: 'Option 4',
      badge: 'Réseau & Sessions en Direct',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      title: "La Communauté & Sessions Hebdomadaires",
      desc: "Ne restez plus isolé. Participez à nos rencontres en visioconférence chaque samedi soir à 19h00 (Heure de Douala), échangez avec d'autres entrepreneurs et visionnez tous les replays.",
      features: [
        "Sessions interactives en direct chaque samedi (19h Douala)",
        "Liens Google Meet pour poser vos questions aux mentors",
        "Replays vidéo disponibles 24h/24",
        "Réseau privé d'entraide et partage d'expérience"
      ],
      cta: "Rejoindre la Communauté & les Lives",
      icon: Users,
      accentBorder: 'hover:border-emerald-500'
    }
  ];

  return (
    <section id="options" className="py-16 md:py-24 border-b border-neutral-800 bg-neutral-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Navigation Principale M.D.D.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-balance">
            Choisis ton pôle d'action immédiat
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Tout est accessible directement, sans modalité ni barrière de paiement. Sélectionne ce dont tu as besoin dès aujourd'hui.
          </p>
        </div>

        {/* 4 Core Options Grid (2x2 or 4x1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className={`bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${opt.accentBorder} shadow-xl group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      {opt.number}
                    </span>
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${opt.badgeColor}`}>
                      {opt.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-neutral-800/80 text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <h3 className="text-xl font-black text-white leading-snug">
                      {opt.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {opt.desc}
                  </p>

                  <div className="space-y-2.5 mb-8 pt-4 border-t border-neutral-800/80">
                    {opt.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onSelectOption(opt.id as any)}
                    className="w-full py-3.5 bg-neutral-800 hover:bg-[#4FC3F7] hover:text-black text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#4FC3F7]/10"
                  >
                    <span>{opt.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
