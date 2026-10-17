import React, { useState } from 'react';
import { 
  ArrowLeft, ExternalLink, Copy, Check, Download, 
  FolderOpen, Sparkles, BookOpen, Headphones, ShieldCheck, 
  Search, ArrowRight, Share2, DollarSign, Filter
} from 'lucide-react';
import { MEGA_PACK_PRODUCTS, MegaPackProduct } from '../data/megaPackProducts';

interface MegaPackPageProps {
  onBack: () => void;
  onGoToAffiliation: () => void;
  onGoToCourse: () => void;
  onGoToCommunity: () => void;
}

export const MegaPackPage: React.FC<MegaPackPageProps> = ({
  onBack,
  onGoToAffiliation,
  onGoToCourse,
  onGoToCommunity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyLink = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProducts = MEGA_PACK_PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'audio') {
      return matchesSearch && p.isAudio;
    }
    if (selectedCategory === 'ebook') {
      return matchesSearch && !p.isAudio;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#4FC3F7]/30 selection:text-white pb-24">
      
      {/* Sticky Navigation Bar */}
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
            <span className="text-neutral-500 hidden sm:inline">Pôle Sélectionné :</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-[#FFD700] border border-amber-500/30 font-bold uppercase tracking-wider text-[10px]">
              Option 2 &bull; Méga Pack Produits Prêts à Vendre
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-4 shadow-lg shadow-amber-500/5">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>ACCÈS DIRECT AUX DOSSIERS GOOGLE DRIVE &bull; OPTION 2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5 text-balance">
            LE MÉGA PACK DES PRODUITS DIGITAUX PRÊTS À VENDRE
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Accédez directement à l'ensemble des 10 produits numériques ci-dessous via leurs liens officiels Google Drive. Téléchargez les e-books, livres audio et formations, et commencez à les commercialiser avec vos propres tarifs.
          </p>
        </div>

        {/* Global Commercial Rights Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
              <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
                Droits de Revente Maître (MRR) &amp; Utilisation Illimitée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
              Vous gardez <strong className="text-white">100% des montants perçus</strong> lors de vos ventes directes. Les prix conseillés vont de <strong className="text-[#FFD700]">1 500F à 5 000F CFA</strong> par produit selon votre marché cible.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://drive.google.com/drive/folders/18XX0e3ENGE3vVxaI8CybhYLG3In924Am"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#FFD700] hover:bg-yellow-400 text-black font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Ouvrir le Dossier n°1 (Drive)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-colors ${selectedCategory === 'all' ? 'bg-[#4FC3F7] text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}`}
            >
              Tous les produits (10)
            </button>
            <button
              onClick={() => setSelectedCategory('ebook')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${selectedCategory === 'ebook' ? 'bg-[#FFD700] text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>E-books / PDF (7)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('audio')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${selectedCategory === 'audio' ? 'bg-[#4FC3F7] text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Livres Audio &amp; MP3 (3)</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un e-book, audio..."
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#4FC3F7] rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 10 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const isCopied = copiedId === product.id;
            return (
              <div
                key={product.id}
                className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl"
              >
                <div>
                  
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700/80 flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                        #{String(product.id).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-mono text-[#4FC3F7] font-semibold">
                        {product.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-[#FFD700] border border-amber-500/20">
                      {product.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-neutral-100">
                    {product.title}
                  </h3>

                  {/* Price Tag (Prominent & Clear) */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-800 mb-3 text-xs">
                    <span className="text-neutral-400 font-medium">Prix de revente conseillé :</span>
                    <span className="font-mono font-black text-[#FFD700] text-sm">
                      {product.priceRange}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Format tag */}
                  <div className="text-[11px] font-mono text-neutral-500 mb-6 flex items-center gap-2">
                    {product.isAudio ? <Headphones className="w-3.5 h-3.5 text-[#4FC3F7]" /> : <BookOpen className="w-3.5 h-3.5 text-[#FFD700]" />}
                    <span>Format : {product.format}</span>
                  </div>

                </div>

                {/* Actions: Open Drive & Copy Link */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    
                    {/* Primary Button to open Google Drive */}
                    <a
                      href={product.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:col-span-8 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center group/btn"
                    >
                      <FolderOpen className="w-4 h-4 text-black shrink-0" />
                      <span className="tracking-wide">OUVRIR SUR GOOGLE DRIVE</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                    {/* Secondary Copy Button */}
                    <button
                      onClick={() => handleCopyLink(product.driveUrl, product.id)}
                      className="sm:col-span-4 py-3 px-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      title="Copier le lien direct vers le fichier Google Drive"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier Lien</span>
                        </>
                      )}
                    </button>

                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 truncate">
                    Lien : <span className="text-neutral-400">{product.driveUrl}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Practical Guide on How to Monetize the Pack */}
        <div className="mt-14 p-6 sm:p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>Guide d'Exploitation Commerciale Immédiate</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#4FC3F7]/10 text-[#4FC3F7] flex items-center justify-center font-bold font-mono">
                1
              </div>
              <h4 className="font-bold text-white text-sm">Téléchargez les Dossiers</h4>
              <p className="text-neutral-400">
                Ouvrez chaque lien Google Drive et téléchargez les fichiers sur votre smartphone ou ordinateur pour constituer votre propre catalogue local.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold font-mono">
                2
              </div>
              <h4 className="font-bold text-white text-sm">Fixez Vos Propres Prix</h4>
              <p className="text-neutral-400">
                Vous avez les droits de revente (MRR). Proposez chaque produit individuellement entre 3 000F et 5 000F CFA ou vendez le pack complet à 15 000F CFA.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                3
              </div>
              <h4 className="font-bold text-white text-sm">Encaissez Directement</h4>
              <p className="text-neutral-400">
                Partagez vos offres sur WhatsApp, TikTok et Facebook, et recevez vos paiements directement sur votre compte Mobile Money (Wave, Orange, MTN).
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links to other 3 options */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-neutral-400">Découvrir les autres pôles M.D.D. :</span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToAffiliation}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#FFD700] text-neutral-300 hover:text-[#FFD700] transition-colors"
            >
              Option 1 : Programme d'Affiliation (Sur Invitation)
            </button>
            <button
              onClick={onGoToCourse}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#4FC3F7] text-neutral-300 hover:text-[#4FC3F7] transition-colors"
            >
              Option 3 : Formations Vidéos (5 Modules)
            </button>
            <button
              onClick={onGoToCommunity}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-400 text-neutral-300 hover:text-emerald-400 transition-colors"
            >
              Option 4 : Communauté &amp; Lives du Samedi
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
