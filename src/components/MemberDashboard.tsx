import React, { useState } from 'react';
import { 
  User, DigitalProduct, Course, SalesPageTemplate, 
  MarketingResource, Order, Commission, CommunityEvent, 
  CommunityAnnouncement, SupportTicket, PlatformSettings 
} from '../types';
import { 
  LayoutDashboard, BookOpen, ShoppingBag, FileCode, Sparkles, 
  Share2, Users, HelpCircle, User as UserIcon, CheckCircle2, 
  Circle, Play, Download, Copy, ExternalLink, Calendar, 
  Clock, Check, AlertCircle, MessageSquare, Send, ChevronRight,
  TrendingUp, Wallet, ArrowUpRight, Search, Filter, X, PackageOpen, MessageCircle,
  FolderOpen, Headphones
} from 'lucide-react';
import { MEGA_PACK_PRODUCTS } from '../data/megaPackProducts';

interface MemberDashboardProps {
  currentUser: User;
  settings: PlatformSettings;
  products: DigitalProduct[];
  course: Course;
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  templates: SalesPageTemplate[];
  resources: MarketingResource[];
  onDownloadResource: (id: string) => void;
  orders: Order[];
  commissions: Commission[];
  events: CommunityEvent[];
  announcements: CommunityAnnouncement[];
  tickets: SupportTicket[];
  onCreateTicket: (subject: string, category: SupportTicket['category'], message: string) => void;
  onReplyTicket: (ticketId: string, message: string) => void;
  onOpenCheckout: () => void;
  initialTab?: 'overview' | 'catalog' | 'packs' | 'course' | 'templates' | 'resources' | 'sales' | 'community' | 'support' | 'profile';
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  currentUser,
  settings,
  products,
  course,
  completedLessons,
  onToggleLesson,
  templates,
  resources,
  onDownloadResource,
  orders,
  commissions,
  events,
  announcements,
  tickets,
  onCreateTicket,
  onReplyTicket,
  onOpenCheckout,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'catalog' | 'packs' | 'course' | 'templates' | 'resources' | 'sales' | 'community' | 'support' | 'profile'
  >(initialTab || 'overview');

  // Search & Filters in Catalog
  const [productSearch, setProductSearch] = useState('');
  const [selectedRightsFilter, setSelectedRightsFilter] = useState<string>('all');
  const [selectedProductModal, setSelectedProductModal] = useState<DigitalProduct | null>(null);

  // Selected Lesson in Course
  const [activeLessonId, setActiveLessonId] = useState<string>(course.modules[0]?.lessons[0]?.id || 'les_01');

  // Templates
  const [selectedTemplate, setSelectedTemplate] = useState<SalesPageTemplate | null>(templates[0] || null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Marketing resource search
  const [resourceSearch, setResourceSearch] = useState('');
  const [copiedResourceText, setCopiedResourceText] = useState<string | null>(null);

  // Support Ticket Form
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket['category']>('product');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Affiliate link copy
  const [copiedAffiliateLink, setCopiedAffiliateLink] = useState(false);

  // Find active lesson object
  const currentLesson = course.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === activeLessonId) || course.modules[0]?.lessons[0];

  // User's commissions
  const userCommissions = commissions.filter(c => c.affiliateUserId === currentUser.id);
  const totalCommissionEarned = userCommissions
    .filter(c => c.status !== 'cancelled')
    .reduce((sum, c) => sum + c.commissionAmountFCFA, 0);

  // User's tickets
  const userTickets = tickets.filter(t => t.userId === currentUser.id);
  const activeTicket = userTickets.find(t => t.id === selectedTicketId) || userTickets[0];

  // Progress percentage
  const totalLessons = course.modules.flatMap(m => m.lessons).length;
  const progressPercent = Math.round((completedLessons.length / (totalLessons || 1)) * 100);

  const affiliateBaseUrl = `https://millionnairesdudigital.com/ref/${currentUser.affiliateCode}`;

  const handleCopyAffiliate = () => {
    navigator.clipboard.writeText(affiliateBaseUrl);
    setCopiedAffiliateLink(true);
    setTimeout(() => setCopiedAffiliateLink(false), 2000);
  };

  const handleCopyResource = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResourceText(id);
    onDownloadResource(id);
    setTimeout(() => setCopiedResourceText(null), 2000);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;
    onCreateTicket(newTicketSubject, newTicketCategory, newTicketMessage);
    setNewTicketSubject('');
    setNewTicketMessage('');
  };

  const handleReplyTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !ticketReplyText.trim()) return;
    onReplyTicket(activeTicket.id, ticketReplyText);
    setTicketReplyText('');
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesRights = selectedRightsFilter === 'all' || p.rightsType === selectedRightsFilter;
    return matchesSearch && matchesRights && p.status === 'published';
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Top Banner for Announcements */}
      {announcements.length > 0 && announcements[0].priority === 'urgent' && (
        <div className="bg-gradient-to-r from-amber-500/15 via-[#FFD700]/10 to-transparent border-b border-amber-500/30 px-4 py-2.5 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <span className="font-bold text-[#FFD700] uppercase font-mono tracking-wider shrink-0">Annonce M.D.D. :</span>
            <span className="truncate">{announcements[0].title}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Mobile Tab Selector (Compact horizontal scroll) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-neutral-800 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'catalog', label: '1. Affiliation & Produits', icon: ShoppingBag },
            { id: 'packs', label: '2. Méga Pack Produits', icon: PackageOpen },
            { id: 'course', label: '3. Formations Vidéo', icon: BookOpen },
            { id: 'community', label: '4. Communauté & Lives', icon: Users },
            { id: 'templates', label: 'Pages de Vente', icon: FileCode },
            { id: 'resources', label: 'Scripts & Ressources', icon: Sparkles },
            { id: 'sales', label: 'Commissions', icon: TrendingUp },
            { id: 'support', label: 'Assistance', icon: HelpCircle },
            { id: 'profile', label: 'Profil', icon: UserIcon },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap shrink-0 transition-colors ${activeTab === tab.id ? 'bg-[#4FC3F7] text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Navigation (3 Col) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            
            {/* User Profile Card */}
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#4FC3F7]/20 text-[#4FC3F7] flex items-center justify-center font-bold text-sm shrink-0 border border-[#4FC3F7]/30">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-neutral-400 truncate">{currentUser.country}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Statut d'accès :</span>
                <span className="text-emerald-400 font-bold uppercase font-mono">
                  ✓ Accès Illimité Actif
                </span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-2 space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'overview' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Tableau de bord</span>
              </button>

              <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase text-[#FFD700] tracking-wider font-bold">
                Les 4 Pôles Principaux
              </div>

              <button
                onClick={() => setActiveTab('catalog')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'catalog' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <ShoppingBag className="w-4 h-4 text-[#4FC3F7]" />
                <span>1. Affiliation &amp; Produits</span>
              </button>

              <button
                onClick={() => setActiveTab('packs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'packs' ? 'bg-[#FFD700]/15 text-[#FFD700] font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <PackageOpen className="w-4 h-4 text-[#FFD700]" />
                <span>2. Méga Pack Produits (MRR)</span>
              </button>

              <button
                onClick={() => setActiveTab('course')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'course' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <BookOpen className="w-4 h-4 text-[#4FC3F7]" />
                <span>3. Formations Vidéos</span>
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'community' ? 'bg-emerald-500/15 text-emerald-400 font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>4. Communauté &amp; Lives</span>
              </button>

              <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase text-neutral-500 tracking-wider font-bold">
                Outils de Vente
              </div>

              <button
                onClick={() => setActiveTab('templates')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'templates' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <FileCode className="w-4 h-4" />
                <span>Pages de vente</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'resources' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Scripts &amp; Ressources</span>
              </button>

              <button
                onClick={() => setActiveTab('sales')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'sales' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Mes Commissions</span>
              </button>

              <button
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'support' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Assistance</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'profile' ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Mon profil</span>
              </button>
            </nav>

            {/* Quick Affiliate Link Widget in Sidebar */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold block mb-1">
                Mon Code Affilié :
              </span>
              <div className="font-mono font-bold text-white mb-2">{currentUser.affiliateCode}</div>
              <button
                onClick={handleCopyAffiliate}
                className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedAffiliateLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAffiliateLink ? 'Lien copié !' : 'Copier mon lien de parrainage'}</span>
              </button>
            </div>

          </div>

          {/* Main Content Area (9 Col) */}
          <div className="lg:col-span-9">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="max-w-2xl">
                    <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider block mb-1">
                      BIENVENUE CHEZ LES MILLIONNAIRES DU DIGITAL
                    </span>
                    <h2 className="text-2xl font-black text-white mb-2">
                      Bonjour, {currentUser.name} !
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      Votre espace de travail est prêt. Découvrez les produits à forte demande, téléchargez vos scripts de vente et rejoignez les sessions privées hebdomadaires.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('course')}
                        className="px-4 py-2 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors"
                      >
                        Reprendre la Formation
                      </button>
                      <button
                        onClick={() => setActiveTab('catalog')}
                        className="px-4 py-2 bg-neutral-800 text-white font-bold text-xs rounded-lg hover:bg-neutral-700 transition-colors"
                      >
                        Voir le Catalogue Produits
                      </button>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                    <span className="text-xs text-neutral-400 block mb-1">Progression Formation</span>
                    <div className="text-2xl font-black text-white font-mono tabular-nums mb-2">
                      {progressPercent}%
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#4FC3F7] h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      {completedLessons.length} / {totalLessons} leçons terminées
                    </span>
                  </div>

                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                    <span className="text-xs text-neutral-400 block mb-1">Mes Commissions Générées</span>
                    <div className="text-2xl font-black text-[#FFD700] font-mono tabular-nums mb-1">
                      {totalCommissionEarned.toLocaleString('fr-FR')} FCFA
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      Taux appliqué : {settings.defaultCommissionRatePercent}%
                    </span>
                  </div>

                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                    <span className="text-xs text-neutral-400 block mb-1">Prochain Coaching Live</span>
                    <div className="text-sm font-bold text-white mb-1">
                      Samedi 19h00 (Douala)
                    </div>
                    <span className="text-[11px] text-[#4FC3F7] block">
                      Live Google Meet privé
                    </span>
                  </div>
                </div>

                {/* Upcoming Live & Announcements Strip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4FC3F7]" />
                        <span>Prochain Événement en Direct</span>
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">Douala (GMT+1)</span>
                    </div>
                    {events[0] && (
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{events[0].title}</div>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">{events[0].summary}</p>
                        <a
                          href={events[0].meetingLink || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4FC3F7]/10 text-[#4FC3F7] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 rounded-lg text-xs font-semibold"
                        >
                          <span>Lien d'accès Google Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FFD700]" />
                        <span>Dernières Ressources Ajoutées</span>
                      </span>
                      <button 
                        onClick={() => setActiveTab('resources')}
                        className="text-[11px] text-[#4FC3F7] hover:underline"
                      >
                        Voir tout &rarr;
                      </button>
                    </div>
                    <div className="space-y-2">
                      {resources.slice(0, 2).map(r => (
                        <div key={r.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80 flex items-center justify-between">
                          <span className="text-xs font-medium text-neutral-300 truncate max-w-[240px]">{r.title}</span>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase">{r.targetPlatform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. CATALOG TAB */}
            {activeTab === 'catalog' && (
              <div className="space-y-6">
                
                {/* INVITATION-ONLY GATEWAY BANNER */}
                <div className="bg-gradient-to-r from-amber-500/15 via-neutral-900 to-neutral-950 border border-amber-500/40 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-[#FFD700] border border-amber-500/30 uppercase tracking-wider">
                        ACCÈS SUR INVITATION UNIQUEMENT
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">Option 1 &bull; Programme d'Affiliation</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      Demandez votre accès au programme d'affiliation
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      L'accès à ce programme et aux liens d'affiliation est strictement sur invitation. Contactez le <strong className="text-white font-mono text-sm underline decoration-[#4FC3F7]">+237 691 90 66 70</strong> en lui fournissant votre adresse e-mail et votre nom pour recevoir votre validation.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <a
                      href={`https://wa.me/237691906670?text=${encodeURIComponent(`Bonjour, je demande mon accès au Programme d'Affiliation M.D.D.\nNom : ${currentUser.name}\nEmail : ${currentUser.email}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.99]"
                    >
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>CONTACTER LE +237 691 90 66 70</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">Catalogue de Produits Digitaux</h2>
                    <p className="text-xs text-neutral-400">
                      Chaque produit précise clairement vos droits d'exploitation légaux (Revente, Label Privé, Affiliation).
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative min-w-[240px]">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Rechercher un produit..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>

                {/* Rights Filter Tabs (Interactive Segmented Control) */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
                  {[
                    { id: 'all', label: 'Tous les produits' },
                    { id: 'resale_rights', label: 'Droits de Revente (MRR)' },
                    { id: 'private_label', label: 'Label Privé (PLR)' },
                    { id: 'affiliate_only', label: 'Affiliation Uniquement' },
                    { id: 'personal_view_only', label: 'Usage Personnel' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedRightsFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${selectedRightsFilter === tab.id ? 'bg-[#4FC3F7] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map(p => {
                    return (
                      <div
                        key={p.id}
                        className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-colors group"
                      >
                        <div>
                          {/* Image */}
                          <div className="aspect-video w-full bg-neutral-950 overflow-hidden relative">
                            <img
                              src={p.coverImage}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-700 text-[11px] font-mono font-bold text-[#FFD700]">
                              {p.recommendedPriceFCFA.toLocaleString('fr-FR')} FCFA
                            </div>
                          </div>

                          <div className="p-5">
                            {/* Unboxed Metadata (Design Constitution) */}
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-2">
                              <span className="font-semibold text-[#4FC3F7] uppercase">{p.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{p.formats.join(', ')}</span>
                            </div>

                            <h3 className="text-base font-bold text-white mb-2 leading-snug">
                              {p.title}
                            </h3>

                            <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                              {p.description}
                            </p>

                            {/* License Card (Crucial Requirement) */}
                            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 mb-4 text-xs">
                              <div className="text-[11px] font-bold text-white mb-1 flex items-center justify-between">
                                <span>Licence autorisée :</span>
                                <span className="font-mono text-[#FFD700]">
                                  {p.rightsType === 'resale_rights' && 'Droits de Revente (MRR)'}
                                  {p.rightsType === 'private_label' && 'Droits de Label Privé (PLR)'}
                                  {p.rightsType === 'affiliate_only' && `Affiliation (${p.commissionRatePercent}% Com)`}
                                  {p.rightsType === 'personal_view_only' && 'Consultation Seule'}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 leading-tight">
                                {p.rightsDescription}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-neutral-800/40 flex items-center justify-between gap-3">
                          <button
                            onClick={() => setSelectedProductModal(p)}
                            className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors text-center"
                          >
                            Fiche Détaillée &amp; Guide Promo
                          </button>

                          {p.downloadUrl && (
                            <button
                              onClick={() => alert(`Téléchargement de ${p.title} initié avec succès.`)}
                              className="p-2 bg-neutral-800 hover:bg-[#4FC3F7] hover:text-black rounded-lg transition-colors text-neutral-300"
                              title="Télécharger les fichiers"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Product Modal */}
                {selectedProductModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                    <div className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 relative">
                      <button
                        onClick={() => setSelectedProductModal(null)}
                        className="absolute right-4 top-4 p-1 rounded-lg text-neutral-400 hover:text-white bg-neutral-800"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="text-xs font-mono font-bold text-[#FFD700] uppercase mb-1">
                        FICHE TECHNIQUE PRODUIT
                      </div>
                      <h3 className="text-xl font-black text-white mb-3">
                        {selectedProductModal.title}
                      </h3>

                      <div className="space-y-4 text-xs text-neutral-300">
                        <div>
                          <strong className="text-white block mb-1">Description complète :</strong>
                          <p className="leading-relaxed">{selectedProductModal.description}</p>
                        </div>

                        <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                          <strong className="text-[#FFD700] block mb-1">Droits d'exploitation &amp; Licence :</strong>
                          <p>{selectedProductModal.rightsDescription}</p>
                        </div>

                        <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                          <strong className="text-[#4FC3F7] block mb-1">Guide de Promotion &amp; Closing Conseillé :</strong>
                          <p className="leading-relaxed">{selectedProductModal.promotionalGuide}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                          <div>
                            <span className="text-neutral-400">Prix conseillé : </span>
                            <span className="font-bold text-white font-mono">{selectedProductModal.recommendedPriceFCFA.toLocaleString('fr-FR')} FCFA</span>
                          </div>

                          <button
                            onClick={() => {
                              alert(`Lien de tracking affilié copié : ${affiliateBaseUrl}?product=${selectedProductModal.id}`);
                              setSelectedProductModal(null);
                            }}
                            className="px-4 py-2 bg-[#4FC3F7] text-black font-bold rounded-lg hover:bg-[#38bdf8]"
                          >
                            Copier mon lien de vente
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* OPTION 2: MEGA PACK MULTI-PRODUITS DIGITAUX (MRR & PLR) */}
            {activeTab === 'packs' && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                    OPTION 2 &bull; TÉLÉCHARGEMENT DIRECT
                  </div>
                  <h2 className="text-2xl font-black text-white">Le Méga Pack de Plusieurs Produits Digitaux</h2>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Téléchargez nos packs complets d'e-books, templates Canva, scripts et tunnels de vente. Licences de revente (MRR) et de label privé (PLR) incluses.
                  </p>
                </div>

                {/* Banner Certificate */}
                <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#FFD700] uppercase tracking-widest block">
                      CERTIFICAT OFFICIEL DE LICENCE COMMERCIALE
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      Droits de Revente (MRR) &amp; Label Privé (PLR) Accordés
                    </h3>
                    <p className="text-xs text-neutral-300">
                      Titulaire de la licence : <strong className="text-white">{currentUser.name}</strong> ({currentUser.country}). Vous êtes légalement autorisé à commercialiser ou modifier les contenus de ces packs.
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`Certificat de licence généré pour ${currentUser.name} (Réf: CERT-MDD-${currentUser.affiliateCode})`)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-[#FFD700] rounded-lg border border-amber-500/30 whitespace-nowrap"
                  >
                    Télécharger Mon Certificat
                  </button>
                </div>

                {/* Section of the 10 Real Products with Google Drive Links */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-[#FFD700]" />
                        <span>Les 10 Produits Prêts à Vendre (Liens Google Drive)</span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Ouvrez directement les dossiers ou fichiers Google Drive ci-dessous pour télécharger vos contenus.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MEGA_PACK_PRODUCTS.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-lg"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold text-[#FFD700] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              #{String(prod.id).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] font-mono text-[#4FC3F7]">{prod.category}</span>
                          </div>

                          <h4 className="text-base font-bold text-white mb-2 leading-snug">
                            {prod.title}
                          </h4>

                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 border border-neutral-800 mb-2.5 text-xs">
                            <span className="text-neutral-400 font-medium">Prix conseillé :</span>
                            <span className="font-mono font-bold text-[#FFD700]">{prod.priceRange}</span>
                          </div>

                          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                          <a
                            href={prod.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center"
                          >
                            <FolderOpen className="w-4 h-4 shrink-0" />
                            <span>Ouvrir sur Google Drive</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(prod.driveUrl);
                              alert(`Lien Google Drive copié :\n${prod.driveUrl}`);
                            }}
                            className="p-2.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors"
                            title="Copier le lien Google Drive"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Mega Bundles (Canva & Scripts) */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <h3 className="text-base font-bold text-white mb-3">
                    Ressources &amp; Modèles Inclus dans le Pack
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">Pack 500+ Templates Canva Pro</div>
                        <div className="text-[11px] text-neutral-400">Posts, bannières et statuts WhatsApp éditables</div>
                      </div>
                      <button
                        onClick={() => alert('Dossier Canva Pro : Tous les liens d’accès sont inclus dans vos documents.')}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg text-[#FFD700]"
                      >
                        Accéder
                      </button>
                    </div>

                    <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">Pack 100 Scripts Vidéo TikTok &amp; Reels</div>
                        <div className="text-[11px] text-neutral-400">Structures virales pour vendre sans montrer son visage</div>
                      </div>
                      <button
                        onClick={() => alert('Dossier Scripts : Inclus dans la bibliothèque de ressources M.D.D.')}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg text-[#4FC3F7]"
                      >
                        Accéder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. COURSES & FORMATIONS TAB */}
            {activeTab === 'course' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">{course.title}</h2>
                  <p className="text-xs text-neutral-400">{course.description}</p>
                </div>

                {/* Video Player & Lesson Viewer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Video Box (8 Col) */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="aspect-video w-full bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 relative">
                      <iframe
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>

                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">{currentLesson.title}</h3>
                        <button
                          onClick={() => onToggleLesson(currentLesson.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${completedLessons.includes(currentLesson.id) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-300 hover:text-white'}`}
                        >
                          {completedLessons.includes(currentLesson.id) ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Leçon Validée ✓</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-4 h-4 text-neutral-400" />
                              <span>Marquer comme terminée</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {currentLesson.summary}
                      </p>

                      {currentLesson.resources.length > 0 && (
                        <div className="pt-3 border-t border-neutral-800">
                          <span className="text-xs font-bold text-white block mb-2">Documents à télécharger :</span>
                          <div className="space-y-1.5">
                            {currentLesson.resources.map((res, i) => (
                              <button
                                key={i}
                                onClick={() => alert(`Téléchargement du fichier : ${res.name}`)}
                                className="w-full flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                              >
                                <span className="truncate">{res.name} ({res.size})</span>
                                <Download className="w-3.5 h-3.5 text-[#4FC3F7]" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modules Accordion Playlist (4 Col) */}
                  <div className="lg:col-span-4 bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-4 max-h-[600px] overflow-y-auto">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Sommaire des Modules
                    </span>

                    <div className="space-y-4">
                      {course.modules.map(mod => (
                        <div key={mod.id} className="space-y-1.5">
                          <div className="text-xs font-bold text-[#FFD700] px-2 py-1 bg-neutral-950 rounded border border-neutral-800">
                            {mod.title}
                          </div>
                          
                          <div className="space-y-1 pl-1">
                            {mod.lessons.map(les => {
                              const isActive = les.id === currentLesson.id;
                              const isCompleted = completedLessons.includes(les.id);
                              return (
                                <button
                                  key={les.id}
                                  onClick={() => setActiveLessonId(les.id)}
                                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${isActive ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'}`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    ) : (
                                      <Play className="w-3 h-3 text-neutral-500 shrink-0" />
                                    )}
                                    <span className="truncate">{les.title}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">{les.durationMinutes}m</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 4. SALES PAGE TEMPLATES TAB */}
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Modèles de Pages de Vente Haute Conversion</h2>
                  <p className="text-xs text-neutral-400">
                    Structures adaptées à la vente sur mobile en Afrique avec liens de redirection WhatsApp et boutons d'encaissement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {templates.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl)}
                      className={`p-4 rounded-xl border text-left transition-all ${selectedTemplate?.id === tmpl.id ? 'bg-neutral-900 border-[#4FC3F7] text-white shadow-lg' : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white'}`}
                    >
                      <h3 className="font-bold text-sm text-white mb-1">{tmpl.title}</h3>
                      <div className="text-[11px] text-neutral-400 mb-2">{tmpl.targetAudience}</div>
                      <div className="text-[10px] font-mono text-[#FFD700]">Taux estimé : {tmpl.conversionRateEst}</div>
                    </button>
                  ))}
                </div>

                {selectedTemplate && (
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedTemplate.title}</h3>
                        <p className="text-xs text-neutral-400">Conseillé pour : {selectedTemplate.recommendedProductType}</p>
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedTemplate.htmlPreviewCode);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2000);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors"
                      >
                        {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedCode ? 'Code HTML Copié !' : 'Copier le Code HTML'}</span>
                      </button>
                    </div>

                    {/* Structure Breakdown */}
                    <div>
                      <span className="text-xs font-bold text-[#FFD700] uppercase block mb-2">Structure psychologique de la page :</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {selectedTemplate.structure.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80 flex items-center gap-2">
                            <span className="text-[#4FC3F7] font-mono font-bold">0{idx+1}.</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Copy text hook */}
                    <div>
                      <span className="text-xs font-bold text-white block mb-1">Textes &amp; Accroches suggérées :</span>
                      <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300 whitespace-pre-line">
                        {selectedTemplate.customizableCopy}
                      </div>
                    </div>

                    {/* Interactive Live Visual Preview */}
                    <div>
                      <span className="text-xs font-bold text-white block mb-2">Aperçu en direct du rendu :</span>
                      <div 
                        className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: selectedTemplate.htmlPreviewCode }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. MARKETING RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">Ressources Marketing &amp; Scripts Clé en Main</h2>
                    <p className="text-xs text-neutral-400">
                      Copiez-collez les scripts vidéo et messages WhatsApp pour promouvoir vos offres sans hésiter.
                    </p>
                  </div>

                  <div className="relative min-w-[240px]">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      placeholder="Filtrer les scripts..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {resources
                    .filter(r => r.title.toLowerCase().includes(resourceSearch.toLowerCase()) || r.content.toLowerCase().includes(resourceSearch.toLowerCase()))
                    .map(res => (
                      <div key={res.id} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1">
                              <span className="font-bold text-[#FFD700] uppercase">{res.targetPlatform}</span>
                              <span>&bull;</span>
                              <span>{res.category}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white">{res.title}</h3>
                          </div>

                          <button
                            onClick={() => handleCopyResource(res.content, res.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-[#4FC3F7] hover:text-black rounded-lg text-xs font-semibold text-neutral-300 transition-colors"
                          >
                            {copiedResourceText === res.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedResourceText === res.id ? 'Copié !' : 'Copier le script'}</span>
                          </button>
                        </div>

                        <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-neutral-300 font-mono whitespace-pre-line leading-relaxed">
                          {res.content}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <div>Téléchargé {res.downloadsCount} fois</div>
                          <div className="flex gap-2">
                            {res.tags.map((t, idx) => (
                              <span key={idx}>#{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 6. MY SALES & AFFILIATION TAB */}
            {activeTab === 'sales' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Mes Ventes &amp; Affiliation</h2>
                  <p className="text-xs text-neutral-400">
                    Suivez chaque commande attribuée à votre identifiant, vos commissions validées et vos paiements reçus.
                  </p>
                </div>

                {/* Unique Affiliate Card */}
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 space-y-3">
                  <div className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">
                    Votre Lien Unique d'Affiliation
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={affiliateBaseUrl}
                      className="flex-1 bg-black border border-neutral-800 rounded-lg py-2.5 px-3 text-xs text-cyan-300 font-mono focus:outline-none"
                    />
                    <button
                      onClick={handleCopyAffiliate}
                      className="px-4 py-2.5 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      {copiedAffiliateLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedAffiliateLink ? 'Copié dans le presse-papier !' : 'Copier Mon Lien'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Partagez ce lien sur vos statuts WhatsApp, biographies TikTok ou messages privés. Chaque client qui adhère ou achète un produit via votre lien vous rapporte {settings.defaultCommissionRatePercent}% de commission nette.
                  </p>
                </div>

                {/* Commissions Table */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Historique de mes commissions</h3>
                    <span className="text-xs font-mono text-neutral-400">
                      Total : {userCommissions.length} transactions
                    </span>
                  </div>

                  {userCommissions.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-400">
                      Vous n'avez pas encore de commission enregistrée. Commencez par partager vos premiers scripts sur WhatsApp !
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                          <tr>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Montant Vente</th>
                            <th className="py-3 px-4">Taux</th>
                            <th className="py-3 px-4">Commission Nette</th>
                            <th className="py-3 px-4">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                          {userCommissions.map(c => (
                            <tr key={c.id} className="hover:bg-neutral-800/40">
                              <td className="py-3 px-4 text-neutral-300 font-mono">{c.createdAt.slice(0, 10)}</td>
                              <td className="py-3 px-4 font-mono font-semibold text-white">{c.orderAmountFCFA.toLocaleString('fr-FR')} FCFA</td>
                              <td className="py-3 px-4 font-mono text-neutral-400">{c.commissionRatePercent}%</td>
                              <td className="py-3 px-4 font-mono font-bold text-[#FFD700]">{c.commissionAmountFCFA.toLocaleString('fr-FR')} FCFA</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${c.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}>
                                  {c.status === 'paid' ? 'Payé ✓' : 'Approuvé'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 7. COMMUNITY & EVENTS TAB */}
            {activeTab === 'community' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Communauté &amp; Sessions en Direct</h2>
                  <p className="text-xs text-neutral-400">
                    Les rencontres hebdomadaires du samedi, les liens officiels et les replays disponibles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map(ev => (
                    <div key={ev.id} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-[#4FC3F7] uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                            {ev.type === 'live_coaching' && 'Coaching Live'}
                            {ev.type === 'masterclass' && 'Masterclass Pratique'}
                            {ev.type === 'replay' && 'Replay Vidéo'}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">{ev.timeDouala}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">{ev.title}</h3>
                        <p className="text-xs text-neutral-300 leading-relaxed">{ev.summary}</p>
                      </div>

                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400">Par {ev.presenter}</span>
                        {ev.meetingLink && (
                          <a
                            href={ev.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-[#4FC3F7] text-black font-bold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors"
                          >
                            Participer au Direct
                          </a>
                        )}
                        {ev.replayVideoUrl && (
                          <button
                            onClick={() => alert('Ouverture du lecteur de replay vidéo.')}
                            className="px-3 py-1.5 bg-neutral-800 text-white font-bold text-xs rounded-lg hover:bg-neutral-700 transition-colors"
                          >
                            Visionner le Replay
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* External Group Access */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Rejoindre le Groupe Privé WhatsApp &amp; Telegram</h3>
                    <p className="text-xs text-neutral-400">
                      Échangez avec les autres membres au quotidien, partagez vos doutes et célébrez vos premières ventes.
                    </p>
                  </div>
                  <a
                    href="https://chat.whatsapp.com/demo-mdd-afrique"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg whitespace-nowrap text-center transition-colors"
                  >
                    Rejoindre le Groupe WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* 8. SUPPORT & ASSISTANCE TAB */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Centre d'Assistance &amp; Tickets</h2>
                  <p className="text-xs text-neutral-400">
                    Une équipe d'accompagnement dédiée pour vous répondre sous 2 heures ouvrées.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Create Ticket Form (5 Col) */}
                  <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-white mb-3">Ouvrir une nouvelle demande</h3>
                    <form onSubmit={handleCreateTicketSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Catégorie</label>
                        <select
                          value={newTicketCategory}
                          onChange={(e) => setNewTicketCategory(e.target.value as any)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                        >
                          <option value="product">Question sur un produit / Licence</option>
                          <option value="payment">Paiement Mobile Money / Validation</option>
                          <option value="access">Accès aux formations &amp; vidéos</option>
                          <option value="affiliation">Affiliation &amp; Retrait de commissions</option>
                          <option value="other">Autre demande</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Objet de la demande</label>
                        <input
                          type="text"
                          value={newTicketSubject}
                          onChange={(e) => setNewTicketSubject(e.target.value)}
                          placeholder="Ex: Problème d'ouverture de fichier PDF"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4FC3F7]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Votre message détaillé</label>
                        <textarea
                          rows={4}
                          value={newTicketMessage}
                          onChange={(e) => setNewTicketMessage(e.target.value)}
                          placeholder="Expliquez précisément votre situation..."
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#4FC3F7]"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8] transition-colors"
                      >
                        ENVOYER MA DEMANDE AU SUPPORT
                      </button>
                    </form>
                  </div>

                  {/* Tickets List & Chat (7 Col) */}
                  <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-4">
                    <h3 className="text-sm font-bold text-white">Mes échanges en cours</h3>

                    {userTickets.length === 0 ? (
                      <div className="p-8 text-center text-xs text-neutral-400">
                        Aucun ticket ouvert. Vous n'avez aucune demande en attente.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Selector if multiple */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {userTickets.map(t => (
                            <button
                              key={t.id}
                              onClick={() => setSelectedTicketId(t.id)}
                              className={`px-3 py-1.5 rounded text-xs font-medium shrink-0 transition-colors ${activeTicket?.id === t.id ? 'bg-[#4FC3F7] text-black font-bold' : 'bg-neutral-800 text-neutral-300'}`}
                            >
                              {t.ticketNumber} ({t.status})
                            </button>
                          ))}
                        </div>

                        {activeTicket && (
                          <div className="space-y-3">
                            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                              <div className="text-xs font-bold text-white mb-0.5">{activeTicket.subject}</div>
                              <div className="text-[10px] text-neutral-500 font-mono">Statut : {activeTicket.status} &bull; Créé le {activeTicket.createdAt.slice(0, 10)}</div>
                            </div>

                            {/* Message Thread */}
                            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                              {activeTicket.messages.map(msg => (
                                <div
                                  key={msg.id}
                                  className={`p-3 rounded-lg text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-neutral-800 text-neutral-200 ml-4' : 'bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 mr-4'}`}
                                >
                                  <div className="text-[10px] font-bold mb-1 opacity-75">{msg.senderName} ({msg.sentAt.slice(11, 16)})</div>
                                  <div>{msg.text}</div>
                                </div>
                              ))}
                            </div>

                            {/* Reply Input */}
                            <form onSubmit={handleReplyTicketSubmit} className="flex gap-2 pt-2">
                              <input
                                type="text"
                                value={ticketReplyText}
                                onChange={(e) => setTicketReplyText(e.target.value)}
                                placeholder="Répondre au conseiller..."
                                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4FC3F7]"
                              />
                              <button
                                type="submit"
                                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white text-xs font-semibold"
                              >
                                Envoyer
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* 9. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Mon Profil &amp; Sécurité</h2>
                  <p className="text-xs text-neutral-400">
                    Vos informations personnelles de facturation et vos coordonnées WhatsApp.
                  </p>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 max-w-xl space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Nom complet</label>
                    <input
                      type="text"
                      readOnly
                      value={currentUser.name}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Adresse e-mail</label>
                    <input
                      type="email"
                      readOnly
                      value={currentUser.email}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Pays</label>
                      <input
                        type="text"
                        readOnly
                        value={currentUser.country}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Numéro WhatsApp</label>
                      <input
                        type="text"
                        readOnly
                        value={currentUser.whatsapp}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Identifiant d'Affilié</label>
                    <input
                      type="text"
                      readOnly
                      value={currentUser.affiliateCode}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-[#FFD700] font-mono font-bold"
                    />
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Formule souscrite :</span>
                    <span className="text-xs font-mono font-bold text-[#4FC3F7] uppercase">
                      Pass Annuel Actif (Valide jusqu'en 2027)
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
