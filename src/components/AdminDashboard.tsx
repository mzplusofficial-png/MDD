import React, { useState } from 'react';
import { 
  User, DigitalProduct, Course, SalesPageTemplate, 
  MarketingResource, Order, Commission, CommunityEvent, 
  CommunityAnnouncement, SupportTicket, PlatformSettings, AuditLog, ProductRightsType 
} from '../types';
import { 
  Shield, Users, ShoppingBag, BookOpen, FileText, 
  CreditCard, Award, Calendar, Bell, HelpCircle, 
  Settings, History, Download, Plus, Check, X, 
  Search, Filter, Trash2, Edit3, ArrowUpRight, AlertCircle, RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  settings: PlatformSettings;
  products: DigitalProduct[];
  course: Course;
  templates: SalesPageTemplate[];
  resources: MarketingResource[];
  orders: Order[];
  commissions: Commission[];
  events: CommunityEvent[];
  announcements: CommunityAnnouncement[];
  tickets: SupportTicket[];
  auditLogs: AuditLog[];
  onUpdateUserStatus: (userId: string, status: User['status']) => void;
  onUpdateUserRole: (userId: string, role: User['role']) => void;
  onAddProduct: (product: any) => void;
  onUpdateProduct: (id: string, updates: Partial<DigitalProduct>) => void;
  onAddMarketingResource: (res: any) => void;
  onConfirmOrderPayment: (orderId: string, ref: string) => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onMarkCommissionPaid: (commissionId: string) => void;
  onReplyTicket: (ticketId: string, message: string) => void;
  onUpdateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  onUpdateSettings: (newSettings: Partial<PlatformSettings>) => void;
  onExportCSV: (type: 'users' | 'orders' | 'commissions' | 'products') => void;
  onResetDefaults: () => void;
  onBackToMemberView: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  users,
  settings,
  products,
  course,
  templates,
  resources,
  orders,
  commissions,
  events,
  announcements,
  tickets,
  auditLogs,
  onUpdateUserStatus,
  onUpdateUserRole,
  onAddProduct,
  onUpdateProduct,
  onAddMarketingResource,
  onConfirmOrderPayment,
  onCancelOrder,
  onMarkCommissionPaid,
  onReplyTicket,
  onUpdateTicketStatus,
  onUpdateSettings,
  onExportCSV,
  onResetDefaults,
  onBackToMemberView
}) => {
  const [adminTab, setAdminTab] = useState<
    'overview' | 'users' | 'products' | 'orders' | 'commissions' | 'tickets' | 'settings' | 'audit'
  >('overview');

  // Filter states
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // New Product Modal Form
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<DigitalProduct['category']>('ebook');
  const [newProdPrice, setNewProdPrice] = useState(10000);
  const [newProdCommission, setNewProdCommission] = useState(50);
  const [newProdRightsType, setNewProdRightsType] = useState<ProductRightsType>('resale_rights');
  const [newProdRightsDesc, setNewProdRightsDesc] = useState('Droits de revente maître autorisés.');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPromoGuide, setNewProdPromoGuide] = useState('');

  // Settings form
  const [editPriceFCFA, setEditPriceFCFA] = useState(settings.membershipPriceFCFA);
  const [editCommissionRate, setEditCommissionRate] = useState(settings.defaultCommissionRatePercent);
  const [editAnnouncement, setEditAnnouncement] = useState(settings.officialAnnouncement || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Ticket reply in admin
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // KPI Calculations
  const totalRevenueFCFA = orders
    .filter(o => o.status === 'confirmed')
    .reduce((sum, o) => sum + o.amountFCFA, 0);

  const totalCommissionsPaidFCFA = commissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmountFCFA, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const activeUsersCount = users.filter(u => u.status === 'active').length;

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle.trim() || !newProdDesc.trim()) return;

    onAddProduct({
      title: newProdTitle.trim(),
      slug: newProdTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description: newProdDesc.trim(),
      category: newProdCategory,
      recommendedPriceFCFA: Number(newProdPrice),
      commissionRatePercent: Number(newProdCommission),
      formats: ['PDF', 'Document'],
      rightsType: newProdRightsType,
      rightsDescription: newProdRightsDesc,
      promotionalGuide: newProdPromoGuide || 'Partagez avec votre audience cible en mettant en avant les bénéfices directs.',
      coverImage: '/src/assets/images/mdd_digital_pack_1792201256151.jpg',
      status: 'published'
    });

    setIsAddingProduct(false);
    setNewProdTitle('');
    setNewProdDesc('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      membershipPriceFCFA: Number(editPriceFCFA),
      defaultCommissionRatePercent: Number(editCommissionRate),
      officialAnnouncement: editAnnouncement
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleAdminTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !adminReplyText.trim()) return;
    onReplyTicket(selectedTicketId, adminReplyText);
    setAdminReplyText('');
  };

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      
      {/* Top Admin Notice Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
              PANEL D'ADMINISTRATION M.D.D. &bull; ACCÈS RESTREINT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMemberView}
              className="text-xs text-[#4FC3F7] hover:underline flex items-center gap-1"
            >
              <span>Basculer vers la vue Membre</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-neutral-800 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Vue Globale', icon: Shield },
            { id: 'users', label: `Membres (${users.length})`, icon: Users },
            { id: 'products', label: `Produits (${products.length})`, icon: ShoppingBag },
            { id: 'orders', label: `Commandes (${orders.length})`, icon: CreditCard },
            { id: 'commissions', label: `Commissions (${commissions.length})`, icon: Award },
            { id: 'tickets', label: `Support (${tickets.filter(t => t.status === 'open').length})`, icon: HelpCircle },
            { id: 'settings', label: 'Paramètres Plateforme', icon: Settings },
            { id: 'audit', label: 'Journal d’Audit', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap shrink-0 transition-colors ${adminTab === tab.id ? 'bg-[#FFD700] text-black font-extrabold' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 font-medium block mb-1">Membres Inscrits</span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                  {users.length}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  {activeUsersCount} comptes actifs
                </div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 font-medium block mb-1">Chiffre d’Affaires Confirmé</span>
                <div className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono tabular-nums">
                  {totalRevenueFCFA.toLocaleString('fr-FR')} FCFA
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-1">
                  {orders.filter(o => o.status === 'confirmed').length} transactions validées
                </div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 font-medium block mb-1">Commissions Payées</span>
                <div className="text-2xl sm:text-3xl font-black text-[#4FC3F7] font-mono tabular-nums">
                  {totalCommissionsPaidFCFA.toLocaleString('fr-FR')} FCFA
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-1">
                  Redistribuées aux affiliés
                </div>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 font-medium block mb-1">Paiements en Attente</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
                  {pendingOrdersCount}
                </div>
                <div className="text-[11px] text-amber-300 font-mono mt-1">
                  Validation manuelle requise
                </div>
              </div>
            </div>

            {/* CSV Exports & Quick Actions Strip */}
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">Exports Officiels de Données (CSV)</h3>
                <p className="text-xs text-neutral-400">Téléchargez les listes certifiées pour votre comptabilité et audit.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onExportCSV('users')}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 text-neutral-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Membres CSV</span>
                </button>
                <button
                  onClick={() => onExportCSV('orders')}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 text-neutral-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Commandes CSV</span>
                </button>
                <button
                  onClick={() => onExportCSV('commissions')}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 text-neutral-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Commissions CSV</span>
                </button>
              </div>
            </div>

            {/* Pending Orders Alert Box (If any) */}
            {pendingOrdersCount > 0 && (
              <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{pendingOrdersCount} Commande(s) en attente de confirmation manuelle</span>
                  </div>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="text-xs text-[#FFD700] hover:underline"
                  >
                    Gérer dans l'onglet Commandes &rarr;
                  </button>
                </div>
                <div className="space-y-2">
                  {orders.filter(o => o.status === 'pending').map(order => (
                    <div key={order.id} className="p-3 bg-black/60 rounded-lg border border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-white">{order.userName}</span>
                        <span className="text-neutral-400 font-mono ml-2">({order.amountFCFA.toLocaleString('fr-FR')} FCFA via {order.paymentProvider})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const mockRef = prompt('Saisir la référence de validation SMS/Opérateur :', 'OM-VERIF-MANUAL');
                            if (mockRef) onConfirmOrderPayment(order.id, mockRef);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs"
                        >
                          Valider le Paiement
                        </button>
                        <button
                          onClick={() => onCancelOrder(order.id, 'Paiement non reçu')}
                          className="px-2 py-1 bg-red-950 text-red-300 hover:bg-red-900 rounded text-xs"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 2. USERS MANAGEMENT TAB */}
        {adminTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Gestion des Membres &amp; Utilisateurs</h2>
                <p className="text-xs text-neutral-400">Contrôle des rôles, permissions et statuts d'accès au programme.</p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Rechercher par nom, email ou pays..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Utilisateur</th>
                      <th className="py-3 px-4">WhatsApp / Pays</th>
                      <th className="py-3 px-4">Rôle</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4">Code Affilié</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {users
                      .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.country.toLowerCase().includes(userSearch.toLowerCase()))
                      .map(u => (
                        <tr key={u.id} className="hover:bg-neutral-800/40">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{u.name}</div>
                            <div className="text-[11px] text-neutral-400">{u.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-neutral-300 font-mono">{u.whatsapp}</div>
                            <div className="text-[11px] text-neutral-500">{u.country}</div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => onUpdateUserRole(u.id, u.role === 'admin' ? 'member' : 'admin')}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${u.role === 'admin' ? 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30' : 'bg-neutral-800 text-neutral-300'}`}
                              title="Cliquer pour changer le rôle"
                            >
                              {u.role.toUpperCase()}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => onUpdateUserStatus(u.id, u.status === 'active' ? 'suspended' : 'active')}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}
                              title="Cliquer pour activer/suspendre"
                            >
                              {u.status === 'active' ? 'Actif' : 'Suspendu'}
                            </button>
                          </td>
                          <td className="py-3 px-4 font-mono text-neutral-300">{u.affiliateCode}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => alert(`Fiche complète de ${u.name} : Inscription le ${u.createdAt}`)}
                              className="text-xs text-[#4FC3F7] hover:underline"
                            >
                              Détails
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCTS MANAGEMENT TAB */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Gestion du Catalogue Produits</h2>
                <p className="text-xs text-neutral-400">Définissez les prix, commissions et licences légales de chaque ressource.</p>
              </div>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="px-4 py-2 bg-[#FFD700] text-black font-extrabold text-xs rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Produit Digital</span>
              </button>
            </div>

            {/* Add Product Modal Form */}
            {isAddingProduct && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 className="text-sm font-bold text-white">Créer un nouveau produit numérique</h3>
                  <button onClick={() => setIsAddingProduct(false)} className="text-neutral-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateProductSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Titre du produit</label>
                      <input
                        type="text"
                        value={newProdTitle}
                        onChange={(e) => setNewProdTitle(e.target.value)}
                        placeholder="Ex: Le Guide Ultime de la Vente..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Catégorie</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="ebook">E-book &amp; Document PDF</option>
                        <option value="templates">Templates &amp; Modèles</option>
                        <option value="video_course">Formation Vidéo</option>
                        <option value="software">Logiciel / Outil</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Prix de vente conseillé (FCFA)</label>
                      <input
                        type="number"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Taux de Commission Affilié (%)</label>
                      <input
                        type="number"
                        value={newProdCommission}
                        onChange={(e) => setNewProdCommission(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Droits d'exploitation autorisés</label>
                      <select
                        value={newProdRightsType}
                        onChange={(e) => setNewProdRightsType(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="resale_rights">Droits de Revente (MRR)</option>
                        <option value="private_label">Droits de Label Privé (PLR)</option>
                        <option value="affiliate_only">Affiliation Uniquement</option>
                        <option value="personal_view_only">Consultation Seule</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Description concise</label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Ce que contient ce produit..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingProduct(false)}
                      className="px-4 py-2 bg-neutral-800 text-xs font-semibold rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FFD700] text-black text-xs font-extrabold rounded-lg hover:bg-yellow-400"
                    >
                      Enregistrer &amp; Publier
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Produit</th>
                      <th className="py-3 px-4">Catégorie</th>
                      <th className="py-3 px-4">Prix FCFA</th>
                      <th className="py-3 px-4">Licence Légale</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-neutral-800/40">
                        <td className="py-3 px-4 font-bold text-white max-w-xs truncate">{p.title}</td>
                        <td className="py-3 px-4 text-neutral-400 uppercase font-mono">{p.category}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#FFD700]">{p.recommendedPriceFCFA.toLocaleString('fr-FR')} FCFA</td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs text-[#4FC3F7]">
                            {p.rightsType === 'resale_rights' && 'MRR (Revente)'}
                            {p.rightsType === 'private_label' && 'PLR (Modifiable)'}
                            {p.rightsType === 'affiliate_only' && 'Affiliation Seule'}
                            {p.rightsType === 'personal_view_only' && 'Usage Perso'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              const newPrice = prompt('Nouveau prix de vente en FCFA :', String(p.recommendedPriceFCFA));
                              if (newPrice) onUpdateProduct(p.id, { recommendedPriceFCFA: Number(newPrice) });
                            }}
                            className="text-xs text-[#4FC3F7] hover:underline"
                          >
                            Modifier Prix
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDERS & TRANSACTIONS MANAGEMENT TAB */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Commandes &amp; Flux de Transactions</h2>
                <p className="text-xs text-neutral-400">Revue des paiements Mobile Money et rapprochement bancaire.</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-2.5 text-xs text-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente uniquement</option>
                  <option value="confirmed">Confirmées uniquement</option>
                  <option value="cancelled">Annulées uniquement</option>
                </select>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">N° Commande</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Montant FCFA</th>
                      <th className="py-3 px-4">Opérateur</th>
                      <th className="py-3 px-4">Réf Transaction</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {orders
                      .filter(o => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                      .map(o => (
                        <tr key={o.id} className="hover:bg-neutral-800/40">
                          <td className="py-3 px-4 font-mono font-bold text-neutral-300">{o.orderNumber}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{o.userName}</div>
                            <div className="text-[11px] text-neutral-400">{o.userCountry} &bull; {o.userWhatsapp}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#FFD700]">{o.amountFCFA.toLocaleString('fr-FR')} FCFA</td>
                          <td className="py-3 px-4 font-mono text-neutral-300">{o.paymentProvider}</td>
                          <td className="py-3 px-4 font-mono text-cyan-300 text-[11px]">{o.providerTransactionId || '—'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${o.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : (o.status === 'pending' ? 'bg-amber-500/10 text-amber-300' : 'bg-red-500/10 text-red-400')}`}>
                              {o.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {o.status === 'pending' && (
                              <button
                                onClick={() => onConfirmOrderPayment(o.id, `MANUAL-ADMIN-${Date.now().toString().slice(-6)}`)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold"
                              >
                                Valider
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. COMMISSIONS TAB */}
        {adminTab === 'commissions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Grand Livre des Commissions d'Affiliation</h2>
              <p className="text-xs text-neutral-400">Attribution des commissions et déclenchement des paiements aux affiliés.</p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Affilié</th>
                      <th className="py-3 px-4">Code Parrain</th>
                      <th className="py-3 px-4">Montant Vente</th>
                      <th className="py-3 px-4">Commission Nette</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {commissions.map(c => (
                      <tr key={c.id} className="hover:bg-neutral-800/40">
                        <td className="py-3 px-4 font-bold text-white">{c.affiliateName}</td>
                        <td className="py-3 px-4 font-mono text-cyan-300">{c.affiliateCode}</td>
                        <td className="py-3 px-4 font-mono text-neutral-300">{c.orderAmountFCFA.toLocaleString('fr-FR')} FCFA</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#FFD700]">{c.commissionAmountFCFA.toLocaleString('fr-FR')} FCFA</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${c.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}>
                            {c.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {c.status === 'approved' && (
                            <button
                              onClick={() => onMarkCommissionPaid(c.id)}
                              className="px-2.5 py-1 bg-[#4FC3F7] text-black font-extrabold rounded text-[10px]"
                            >
                              Marquer Payé
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. SUPPORT TICKETS TAB */}
        {adminTab === 'tickets' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Gestion des Demandes d'Assistance</h2>
              <p className="text-xs text-neutral-400">Réponses directes aux requêtes des apprenants et membres.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-2">
                {tickets.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${activeTicket?.id === t.id ? 'bg-neutral-900 border-[#FFD700] text-white shadow-lg' : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-[#4FC3F7]">{t.ticketNumber}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${t.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}>
                        {t.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white truncate">{t.subject}</div>
                    <div className="text-[11px] text-neutral-500 truncate">{t.userName} &bull; {t.category}</div>
                  </button>
                ))}
              </div>

              {activeTicket && (
                <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <h3 className="text-sm font-bold text-white">{activeTicket.subject}</h3>
                      <div className="text-[11px] text-neutral-400">Demandeur : {activeTicket.userName} ({activeTicket.userEmail} &bull; {activeTicket.userWhatsapp})</div>
                    </div>
                    <button
                      onClick={() => onUpdateTicketStatus(activeTicket.id, activeTicket.status === 'resolved' ? 'open' : 'resolved')}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs rounded text-neutral-300 font-semibold"
                    >
                      {activeTicket.status === 'resolved' ? 'Rouvrir' : 'Clôturer le ticket'}
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {activeTicket.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-lg text-xs leading-relaxed ${msg.sender === 'admin' ? 'bg-amber-950/30 border border-amber-800/40 text-amber-200 ml-4' : 'bg-neutral-800 text-neutral-200 mr-4'}`}
                      >
                        <div className="text-[10px] font-bold mb-1 opacity-75">{msg.senderName} ({msg.sentAt.slice(11, 16)})</div>
                        <div>{msg.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <form onSubmit={handleAdminTicketReply} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      placeholder="Votre réponse d'administrateur..."
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFD700]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FFD700] text-black text-xs font-bold rounded-lg hover:bg-yellow-400"
                    >
                      Répondre
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7. SETTINGS TAB */}
        {adminTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-black text-white">Paramètres Généraux de la Plateforme</h2>
              <p className="text-xs text-neutral-400">Modifiez le prix d'adhésion en FCFA, le taux des commissions et les avis officiels.</p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Paramètres enregistrés avec succès ! Le nouveau tarif est immédiatement effectif.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Prix de l'adhésion M.D.D. (FCFA)
                  </label>
                  <input
                    type="number"
                    value={editPriceFCFA}
                    onChange={(e) => setEditPriceFCFA(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono font-bold"
                    required
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Configurable : défaut 6 550 FCFA</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Taux de Commission Affilié (%)
                  </label>
                  <input
                    type="number"
                    value={editCommissionRate}
                    onChange={(e) => setEditCommissionRate(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono font-bold"
                    required
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Par défaut 40%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Bannière d'Annonce Officielle
                </label>
                <textarea
                  rows={2}
                  value={editAnnouncement}
                  onChange={(e) => setEditAnnouncement(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FFD700] text-black font-extrabold text-xs rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  ENREGISTRER LES MODIFICATIONS
                </button>
              </div>
            </form>

            {/* Factory Reset button */}
            <div className="pt-6 border-t border-neutral-800">
              <div className="bg-red-950/20 border border-red-800/40 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-red-400 mb-1">Zone de Réinitialisation Démo</h4>
                  <p className="text-[11px] text-neutral-400">Remettre l'ensemble des données (utilisateurs, commandes) à l'état initial.</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Voulez-vous réinitialiser toutes les données de test ?')) {
                      onResetDefaults();
                    }
                  }}
                  className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 8. AUDIT LOGS TAB */}
        {adminTab === 'audit' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Journal d’Audit &amp; Sécurité (Africa/Douala)</h2>
              <p className="text-xs text-neutral-400">Traçabilité complète des actions administratives et des opérations sensibles.</p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Horodatage (Douala)</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Opérateur</th>
                      <th className="py-3 px-4">Détails</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-neutral-800/40">
                        <td className="py-3 px-4 font-mono text-neutral-400 whitespace-nowrap">
                          {log.timestamp.slice(0, 19).replace('T', ' ')}
                        </td>
                        <td className="py-3 px-4 font-bold text-white whitespace-nowrap">{log.action}</td>
                        <td className="py-3 px-4 text-cyan-300 font-mono whitespace-nowrap">{log.performedBy}</td>
                        <td className="py-3 px-4 text-neutral-300">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
