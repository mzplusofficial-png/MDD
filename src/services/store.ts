import { useState, useEffect } from 'react';
import { 
  User, DigitalProduct, Course, SalesPageTemplate, 
  MarketingResource, Order, Commission, CommunityEvent, 
  CommunityAnnouncement, SupportTicket, PlatformSettings, AuditLog,
  PaymentMethod
} from '../types';
import {
  INITIAL_SETTINGS, INITIAL_USERS, INITIAL_PRODUCTS, 
  INITIAL_COURSE, INITIAL_TEMPLATES, INITIAL_RESOURCES, 
  INITIAL_ORDERS, INITIAL_COMMISSIONS, INITIAL_EVENTS, 
  INITIAL_ANNOUNCEMENTS, INITIAL_TICKETS, INITIAL_AUDIT_LOGS
} from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'mdd_current_user',
  USERS: 'mdd_users_list',
  SETTINGS: 'mdd_platform_settings',
  PRODUCTS: 'mdd_products_list',
  COURSE: 'mdd_course_data',
  COMPLETED_LESSONS: 'mdd_completed_lessons',
  TEMPLATES: 'mdd_templates_list',
  RESOURCES: 'mdd_resources_list',
  ORDERS: 'mdd_orders_list',
  COMMISSIONS: 'mdd_commissions_list',
  EVENTS: 'mdd_events_list',
  ANNOUNCEMENTS: 'mdd_announcements_list',
  TICKETS: 'mdd_tickets_list',
  AUDIT_LOGS: 'mdd_audit_logs'
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export function useMDDStore() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => 
    loadFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0])
  );
  
  const [users, setUsers] = useState<User[]>(() => 
    loadFromStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS)
  );

  const [settings, setSettings] = useState<PlatformSettings>(() => 
    loadFromStorage<PlatformSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const [products, setProducts] = useState<DigitalProduct[]>(() => 
    loadFromStorage<DigitalProduct[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );

  const [course, setCourse] = useState<Course>(() => 
    loadFromStorage<Course>(STORAGE_KEYS.COURSE, INITIAL_COURSE)
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => 
    loadFromStorage<string[]>(STORAGE_KEYS.COMPLETED_LESSONS, ['les_01', 'les_02'])
  );

  const [templates, setTemplates] = useState<SalesPageTemplate[]>(() => 
    loadFromStorage<SalesPageTemplate[]>(STORAGE_KEYS.TEMPLATES, INITIAL_TEMPLATES)
  );

  const [resources, setResources] = useState<MarketingResource[]>(() => 
    loadFromStorage<MarketingResource[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES)
  );

  const [orders, setOrders] = useState<Order[]>(() => 
    loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );

  const [commissions, setCommissions] = useState<Commission[]>(() => 
    loadFromStorage<Commission[]>(STORAGE_KEYS.COMMISSIONS, INITIAL_COMMISSIONS)
  );

  const [events, setEvents] = useState<CommunityEvent[]>(() => 
    loadFromStorage<CommunityEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS)
  );

  const [announcements, setAnnouncements] = useState<CommunityAnnouncement[]>(() => 
    loadFromStorage<CommunityAnnouncement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS)
  );

  const [tickets, setTickets] = useState<SupportTicket[]>(() => 
    loadFromStorage<SupportTicket[]>(STORAGE_KEYS.TICKETS, INITIAL_TICKETS)
  );

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => 
    loadFromStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS)
  );

  // Sync to localStorage
  useEffect(() => { saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.USERS, users); }, [users]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.COURSE, course); }, [course]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.COMPLETED_LESSONS, completedLessons); }, [completedLessons]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.TEMPLATES, templates); }, [templates]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.RESOURCES, resources); }, [resources]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.COMMISSIONS, commissions); }, [commissions]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.EVENTS, events); }, [events]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements); }, [announcements]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.TICKETS, tickets); }, [tickets]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.AUDIT_LOGS, auditLogs); }, [auditLogs]);

  // Actions: Audit Logging
  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      action,
      performedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Visiteur / Système',
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Actions: Authentication
  const login = (email: string, _password?: string): { success: boolean; message: string; user?: User } => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!found) {
      return { success: false, message: 'Aucun compte associé à cette adresse e-mail.' };
    }
    if (found.status === 'suspended') {
      return { success: false, message: 'Ce compte a été suspendu par l’administration. Contactez le support.' };
    }
    const updated = { ...found, lastLoginAt: new Date().toISOString() };
    setUsers(prev => prev.map(u => u.id === found.id ? updated : u));
    setCurrentUser(updated);
    logAction('Connexion Utilisateur', `Connexion réussie pour ${found.name} (${found.email})`);
    return { success: true, message: 'Connexion réussie !', user: updated };
  };

  const register = (data: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    referredByCode?: string;
  }): { success: boolean; message: string; user?: User } => {
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase().trim());
    if (existing) {
      return { success: false, message: 'Un compte existe déjà avec cette adresse e-mail.' };
    }

    const cleanName = data.name.trim().split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '') || 'MEMBRE';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newAffiliateCode = `MDD-${cleanName}-${randomDigits}`;

    const referrer = data.referredByCode 
      ? users.find(u => u.affiliateCode.toUpperCase() === data.referredByCode?.toUpperCase().trim())
      : undefined;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      whatsapp: data.whatsapp.trim(),
      country: data.country,
      role: 'member',
      status: 'active', // Granted trial/active status on registration
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      affiliateCode: newAffiliateCode,
      referredBy: referrer?.id,
      subscriptionPlan: 'mdd_pass_premium',
      subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    logAction('Inscription Nouveau Membre', `${newUser.name} (${newUser.country}) - Code parrain: ${data.referredByCode || 'Aucun'}`);
    return { success: true, message: 'Compte créé avec succès ! Bienvenue chez Les Millionnaires du Digital.', user: newUser };
  };

  const logout = () => {
    if (currentUser) {
      logAction('Déconnexion', `Déconnexion de ${currentUser.name}`);
    }
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
      logAction('Bascule de Compte (Mode Démo/Admin)', `Bascule vers ${target.name} (${target.role})`);
    }
  };

  // Actions: User Management (Admin)
  const updateUserStatus = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    logAction('Mise à jour Statut Utilisateur', `Utilisateur ID ${userId} passé à ${newStatus}`);
  };

  const updateUserRole = (userId: string, newRole: User['role']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    logAction('Modification Rôle Utilisateur', `Utilisateur ID ${userId} promu/assigné à ${newRole}`);
  };

  // Actions: Course Progression
  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const exists = prev.includes(lessonId);
      const next = exists ? prev.filter(id => id !== lessonId) : [...prev, lessonId];
      return next;
    });
  };

  // Actions: Products (Admin & Public)
  const addProduct = (product: Omit<DigitalProduct, 'id' | 'stats' | 'createdAt'>) => {
    const newProduct: DigitalProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
      stats: {
        viewsCount: 0,
        salesCount: 0,
        revenueFCFA: 0,
        rating: 5.0
      }
    };
    setProducts(prev => [newProduct, ...prev]);
    logAction('Ajout Produit Digital', `Nouveau produit créé: "${newProduct.title}" (${newProduct.recommendedPriceFCFA} FCFA)`);
  };

  const updateProduct = (id: string, updates: Partial<DigitalProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAction('Mise à jour Produit', `Produit ${id} modifié`);
  };

  // Actions: Marketing Resources & Templates
  const recordResourceDownload = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r));
  };

  const addMarketingResource = (resource: Omit<MarketingResource, 'id' | 'downloadsCount' | 'createdAt'>) => {
    const newRes: MarketingResource = {
      ...resource,
      id: `res_${Date.now()}`,
      downloadsCount: 0,
      createdAt: new Date().toISOString()
    };
    setResources(prev => [newRes, ...prev]);
    logAction('Ajout Ressource Marketing', `Nouvelle ressource: "${newRes.title}" (${newRes.type})`);
  };

  // Actions: Orders & Payment Simulation
  const createOrder = (orderData: {
    userId: string;
    userName: string;
    userEmail: string;
    userWhatsapp: string;
    userCountry: string;
    itemType: 'subscription' | 'digital_product';
    itemId: string;
    itemTitle: string;
    amountFCFA: number;
    paymentMethod: PaymentMethod;
    paymentProvider: Order['paymentProvider'];
    affiliateCode?: string;
  }): Order => {
    const orderNumber = `MDD-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Check if valid affiliate code
    let commissionFCFA = 0;
    if (orderData.affiliateCode) {
      const affiliateUser = users.find(u => u.affiliateCode.toUpperCase() === orderData.affiliateCode?.toUpperCase().trim());
      if (affiliateUser && affiliateUser.id !== orderData.userId) {
        commissionFCFA = Math.round((orderData.amountFCFA * settings.defaultCommissionRatePercent) / 100);
      }
    }

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      userId: orderData.userId,
      userName: orderData.userName,
      userEmail: orderData.userEmail,
      userWhatsapp: orderData.userWhatsapp,
      userCountry: orderData.userCountry,
      itemType: orderData.itemType,
      itemId: orderData.itemId,
      itemTitle: orderData.itemTitle,
      amountFCFA: orderData.amountFCFA,
      currency: 'FCFA',
      paymentMethod: orderData.paymentMethod,
      paymentProvider: orderData.paymentProvider,
      status: 'pending',
      affiliateCode: orderData.affiliateCode,
      commissionFCFA,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    logAction('Création de Commande', `Commande initiée ${orderNumber} (${newOrder.amountFCFA} FCFA via ${newOrder.paymentProvider})`);
    return newOrder;
  };

  const confirmOrderPayment = (orderId: string, providerTransactionId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const confirmedAt = new Date().toISOString();
    const updatedOrder: Order = {
      ...targetOrder,
      status: 'confirmed',
      providerTransactionId,
      confirmedAt
    };

    setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));

    // If order was for a user with pending_payment, activate account
    setUsers(prev => prev.map(u => {
      if (u.id === targetOrder.userId) {
        return {
          ...u,
          status: 'active',
          subscriptionPlan: 'mdd_pass_premium',
          subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      return u;
    }));

    // If affiliate was linked, create approved commission
    if (targetOrder.affiliateCode && targetOrder.commissionFCFA && targetOrder.commissionFCFA > 0) {
      const affiliateUser = users.find(u => u.affiliateCode.toUpperCase() === targetOrder.affiliateCode?.toUpperCase().trim());
      if (affiliateUser) {
        const newCommission: Commission = {
          id: `com_${Date.now()}`,
          affiliateUserId: affiliateUser.id,
          affiliateName: affiliateUser.name,
          affiliateCode: affiliateUser.affiliateCode,
          orderId: targetOrder.id,
          orderAmountFCFA: targetOrder.amountFCFA,
          commissionRatePercent: settings.defaultCommissionRatePercent,
          commissionAmountFCFA: targetOrder.commissionFCFA,
          status: 'approved',
          createdAt: confirmedAt
        };
        setCommissions(prev => [newCommission, ...prev]);
      }
    }

    logAction('Paiement Confirmé', `Commande ${targetOrder.orderNumber} validée avec succès via ${targetOrder.paymentProvider}. Réf: ${providerTransactionId}`);
  };

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled', failureReason: reason } : o));
    logAction('Annulation Commande', `Commande ${orderId} annulée. Motif: ${reason}`);
  };

  // Actions: Commissions
  const markCommissionPaid = (commissionId: string) => {
    const paidAt = new Date().toISOString();
    setCommissions(prev => prev.map(c => c.id === commissionId ? { ...c, status: 'paid', paidAt } : c));
    logAction('Paiement Commission', `Commission ID ${commissionId} marquée comme payée`);
  };

  // Actions: Support Tickets
  const createSupportTicket = (subject: string, category: SupportTicket['category'], initialMessage: string) => {
    if (!currentUser) return;
    const ticketNumber = `TKT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userWhatsapp: currentUser.whatsapp,
      subject,
      category,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'user',
          senderName: currentUser.name,
          text: initialMessage,
          sentAt: new Date().toISOString()
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
    logAction('Nouveau Ticket Support', `Ticket ${ticketNumber}: "${subject}" par ${currentUser.name}`);
  };

  const replyToTicket = (ticketId: string, text: string, sender: 'user' | 'admin') => {
    const target = tickets.find(t => t.id === ticketId);
    if (!target) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      sender,
      senderName: sender === 'admin' ? 'Support M.D.D.' : (currentUser?.name || 'Utilisateur'),
      text,
      sentAt: new Date().toISOString()
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: sender === 'admin' ? 'in_progress' : t.status,
          updatedAt: new Date().toISOString(),
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t));
    logAction('Mise à jour Ticket', `Ticket ${ticketId} passé à "${status}"`);
  };

  // Actions: Settings
  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logAction('Modification Paramètres', 'Paramètres de la plateforme mis à jour par l’administrateur');
  };

  // CSV Exporter Utility
  const exportToCSV = (type: 'users' | 'orders' | 'commissions' | 'products') => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let filename = `mdd_${type}_export_${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === 'users') {
      csvContent += 'ID,Nom,Email,WhatsApp,Pays,Role,Statut,Code Affiliation,Date Inscription\n';
      users.forEach(u => {
        csvContent += `"${u.id}","${u.name}","${u.email}","${u.whatsapp}","${u.country}","${u.role}","${u.status}","${u.affiliateCode}","${u.createdAt}"\n`;
      });
    } else if (type === 'orders') {
      csvContent += 'Numéro,Date,Client,Email,WhatsApp,Pays,Montant FCFA,Moyen Paiement,Statut,Réf Transaction,Code Parrain\n';
      orders.forEach(o => {
        csvContent += `"${o.orderNumber}","${o.createdAt}","${o.userName}","${o.userEmail}","${o.userWhatsapp}","${o.userCountry}","${o.amountFCFA}","${o.paymentProvider}","${o.status}","${o.providerTransactionId || ''}","${o.affiliateCode || ''}"\n`;
      });
    } else if (type === 'commissions') {
      csvContent += 'ID,Affilié,Code,Commande ID,Montant Vente FCFA,Taux %,Commission FCFA,Statut,Date\n';
      commissions.forEach(c => {
        csvContent += `"${c.id}","${c.affiliateName}","${c.affiliateCode}","${c.orderId}","${c.orderAmountFCFA}","${c.commissionRatePercent}","${c.commissionAmountFCFA}","${c.status}","${c.createdAt}"\n`;
      });
    } else if (type === 'products') {
      csvContent += 'ID,Titre,Catégorie,Prix Recommandé FCFA,Commission %,Licence,Ventes,Statut\n';
      products.forEach(p => {
        csvContent += `"${p.id}","${p.title}","${p.category}","${p.recommendedPriceFCFA}","${p.commissionRatePercent}","${p.rightsType}","${p.stats.salesCount}","${p.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAction('Export Données CSV', `Export du fichier ${filename}`);
  };

  // Reset to factory defaults
  const resetToFactoryDefaults = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_USERS[0]);
    setUsers(INITIAL_USERS);
    setSettings(INITIAL_SETTINGS);
    setProducts(INITIAL_PRODUCTS);
    setCourse(INITIAL_COURSE);
    setCompletedLessons(['les_01', 'les_02']);
    setTemplates(INITIAL_TEMPLATES);
    setResources(INITIAL_RESOURCES);
    setOrders(INITIAL_ORDERS);
    setCommissions(INITIAL_COMMISSIONS);
    setEvents(INITIAL_EVENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setTickets(INITIAL_TICKETS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    logAction('Réinitialisation Données', 'Données remises à l’état initial de démonstration');
  };

  return {
    currentUser,
    users,
    settings,
    products,
    course,
    completedLessons,
    templates,
    resources,
    orders,
    commissions,
    events,
    announcements,
    tickets,
    auditLogs,
    login,
    register,
    logout,
    switchUser,
    updateUserStatus,
    updateUserRole,
    toggleLessonComplete,
    addProduct,
    updateProduct,
    recordResourceDownload,
    addMarketingResource,
    createOrder,
    confirmOrderPayment,
    cancelOrder,
    markCommissionPaid,
    createSupportTicket,
    replyToTicket,
    updateTicketStatus,
    updateSettings,
    exportToCSV,
    resetToFactoryDefaults,
    logAction
  };
}
