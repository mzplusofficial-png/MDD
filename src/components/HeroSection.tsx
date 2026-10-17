import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap } from 'lucide-react';
import { PlatformSettings } from '../types';

interface HeroSectionProps {
  settings: PlatformSettings;
  onJoinClick: () => void;
  onDiscoverClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onJoinClick,
  onDiscoverClick,
}) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-neutral-800 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#4FC3F7]/10 via-[#FFD700]/5 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker - Editorial Unboxed metadata */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD700] mb-5">
          <span>Plateforme Panafricaine Officielle</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>Système & Licences 2026</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span className="text-[#4FC3F7]">Zone CEMAC & UEMOA</span>
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance mb-6">
              TON BUSINESS DIGITAL COMMENCE ICI.
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Découvre un système conçu pour t'aider à te lancer dans la vente de produits digitaux, avec des outils, des ressources marketing et un accompagnement adaptés aux réalités africaines.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onJoinClick}
                className="px-6 py-3.5 bg-[#4FC3F7] text-black font-extrabold text-sm rounded-lg hover:bg-[#38bdf8] transition-all transform active:scale-[0.99] text-center shadow-lg shadow-[#4FC3F7]/20 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>ACCÉDER AUX 4 PÔLES DU SYSTÈME</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscoverClick}
                className="px-6 py-3.5 bg-neutral-900 border border-neutral-700 text-white font-bold text-sm rounded-lg hover:bg-neutral-800 transition-colors text-center whitespace-nowrap shrink-0"
              >
                DÉCOUVRIR LE SYSTÈME
              </button>
            </div>

            {/* Trust and Supported African Countries */}
            <div className="pt-6 border-t border-neutral-800/80">
              <div className="text-xs text-neutral-400 font-medium mb-2.5">
                Communauté active et entrepreneurs formés dans 9 pays :
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-300 font-medium">
                <span>🇨🇲 Cameroun</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇨🇮 Côte d'Ivoire</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇸🇳 Sénégal</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇧🇯 Bénin</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇹🇬 Togo</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇬🇦 Gabon</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇹🇩 Tchad</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇨🇬 Congo</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>🇨🇩 RDC</span>
              </div>
            </div>

          </div>

          {/* Right Column: Marquee Cinematic Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src="/src/assets/images/mdd_hero_cinematic_1792201255959.jpg"
                alt="Entrepreneur digital africain travaillant dans un cadre moderne avec vue sur la métropole"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-video lg:aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                      Écosystème M.D.D. 2026
                    </div>
                    <div className="text-white text-sm font-semibold mt-0.5">
                      Business model sans stock &amp; sans douane
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-neutral-700 text-xs font-mono font-bold text-[#4FC3F7]">
                    ACCÈS LIBRE 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Strip below Hero (Strict Design Constitution) */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-800">
          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl md:text-3xl font-black text-white font-mono tabular-nums mb-1">
              100+
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Produits digitaux prêts à promouvoir &amp; vendre
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl md:text-3xl font-black text-[#4FC3F7] font-mono tabular-nums mb-1">
              20+
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Modèles de pages de vente haute conversion
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl md:text-3xl font-black text-[#FFD700] font-mono tabular-nums mb-1">
              40% à 60%
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Commissions nettes directes par vente d'affilié
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl md:text-3xl font-black text-white font-mono tabular-nums mb-1">
              100%
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Ressources et lives du samedi en accès libre
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
