import { 
  User, DigitalProduct, Course, SalesPageTemplate, 
  MarketingResource, Order, Commission, CommunityEvent, 
  CommunityAnnouncement, SupportTicket, PlatformSettings, AuditLog 
} from '../types';

export const INITIAL_SETTINGS: PlatformSettings = {
  programName: 'LES MILLIONNAIRES DU DIGITAL (M.D.D.)',
  tagline: "Le système d'accélération pour vendre des produits digitaux en Afrique francophone",
  membershipPriceFCFA: 6550,
  membershipPriceEUR: 9.99,
  defaultCommissionRatePercent: 40,
  registrationOpen: true,
  maxCohortMembers: 500,
  currentCohortCount: 342,
  supportWhatsApp: '+237691234567',
  supportEmail: 'contact@millionnairesdudigital.com',
  telegramGroupUrl: 'https://t.me/mdd_officiel',
  officialAnnouncement: '🚨 Prochaine Session Live Privée ce Samedi à 19h00 (Heure de Douala) : "Comment générer ses premières ventes avec WhatsApp Business sans publicité payante".',
  gateways: [
    {
      id: 'gw_cinetpay',
      name: 'CinetPay Afrique (Orange Money, MTN, Moov, Wave)',
      provider: 'cinetpay',
      supportedCountries: ['Cameroun', "Côte d'Ivoire", 'Sénégal', 'Bénin', 'Togo', 'RDC'],
      supportedMethods: ['orange_money', 'mtn_momo', 'wave', 'moov_money', 'bank_card'],
      apiKeySet: false,
      webhookConfigured: true,
      testMode: true,
      enabled: true
    },
    {
      id: 'gw_fedapay',
      name: 'FedaPay (Bénin, Togo, Côte d’Ivoire, Sénégal)',
      provider: 'fedapay',
      supportedCountries: ['Bénin', 'Togo', "Côte d'Ivoire", 'Sénégal'],
      supportedMethods: ['mtn_momo', 'moov_money', 'bank_card'],
      apiKeySet: false,
      webhookConfigured: false,
      testMode: true,
      enabled: true
    },
    {
      id: 'gw_wave',
      name: 'Wave Checkout (Sénégal, Côte d’Ivoire)',
      provider: 'wave_business',
      supportedCountries: ['Sénégal', "Côte d'Ivoire"],
      supportedMethods: ['wave'],
      apiKeySet: false,
      webhookConfigured: false,
      testMode: true,
      enabled: true
    },
    {
      id: 'gw_notchpay',
      name: 'Notch Pay (Cameroun - Orange Money, MTN MoMo)',
      provider: 'notchpay',
      supportedCountries: ['Cameroun'],
      supportedMethods: ['orange_money', 'mtn_momo'],
      apiKeySet: false,
      webhookConfigured: false,
      testMode: true,
      enabled: true
    }
  ]
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin_01',
    name: 'Amadou Diallo',
    email: 'admin@mdd.africa',
    whatsapp: '+237691234567',
    country: 'Cameroun',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-15T09:00:00Z',
    lastLoginAt: '2026-10-16T18:30:00Z',
    affiliateCode: 'MDD-ADMIN-01',
    subscriptionPlan: 'mdd_founder_lifetime',
    avatarUrl: '/src/assets/images/mdd_founder_mentor_1792201256358.jpg'
  },
  {
    id: 'usr_member_01',
    name: 'Koffi Mensah',
    email: 'koffi@gmail.com',
    whatsapp: '+2250788990011',
    country: "Côte d'Ivoire",
    role: 'member',
    status: 'active',
    createdAt: '2026-08-10T14:22:00Z',
    lastLoginAt: '2026-10-16T16:45:00Z',
    affiliateCode: 'MDD-KOFFI-92',
    subscriptionPlan: 'mdd_pass_premium',
    subscriptionExpiresAt: '2027-08-10T14:22:00Z'
  },
  {
    id: 'usr_member_02',
    name: 'Aminata Traoré',
    email: 'aminata@gmail.com',
    whatsapp: '+221771234567',
    country: 'Sénégal',
    role: 'member',
    status: 'active',
    createdAt: '2026-09-01T10:15:00Z',
    lastLoginAt: '2026-10-15T19:00:00Z',
    affiliateCode: 'MDD-AMINA-44',
    subscriptionPlan: 'mdd_pass_premium',
    subscriptionExpiresAt: '2027-09-01T10:15:00Z'
  },
  {
    id: 'usr_member_03',
    name: 'Boris Ondoa',
    email: 'boris.ondoa@yahoo.fr',
    whatsapp: '+237677894512',
    country: 'Cameroun',
    role: 'member',
    status: 'active',
    createdAt: '2026-09-18T11:40:00Z',
    lastLoginAt: '2026-10-14T08:20:00Z',
    affiliateCode: 'MDD-BORIS-77',
    subscriptionPlan: 'mdd_pass_premium',
    subscriptionExpiresAt: '2027-09-18T11:40:00Z'
  },
  {
    id: 'usr_member_04',
    name: 'Christian Mukendi',
    email: 'mukendi.chr@gmail.com',
    whatsapp: '+243819876543',
    country: 'RDC',
    role: 'member',
    status: 'pending_payment',
    createdAt: '2026-10-16T17:10:00Z',
    lastLoginAt: '2026-10-16T17:10:00Z',
    affiliateCode: 'MDD-MUKENDI-12'
  }
];

export const INITIAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod_01',
    title: 'Le Guide Ultime du Closing WhatsApp en Afrique',
    slug: 'closing-whatsapp-afrique',
    description: 'Manuel pratique de 120 pages décrivant les scripts exacts, réponses aux objections sur le Mobile Money et techniques de suivi qui transforment un contact curieux en client payant.',
    category: 'ebook',
    recommendedPriceFCFA: 10000,
    commissionRatePercent: 50,
    formats: ['PDF', 'EPUB', 'Guide Audio MP3'],
    rightsType: 'resale_rights',
    rightsDescription: 'Droits de Revente Maître (MRR) inclus : Vous pouvez revendre ce livre à vos clients et conserver 100% des bénéfices sans modifier le texte original.',
    promotionalGuide: 'Ciblez les commerçants de prêt-à-porter, vendeurs de mèches, infopreneurs et prestataires de services qui reçoivent des messages "prix svp" sans concrétiser.',
    salesPageUrl: '#modele-page-whatsapp',
    downloadUrl: '/downloads/guide_closing_whatsapp.pdf',
    coverImage: '/src/assets/images/mdd_digital_pack_1792201256151.jpg',
    stats: {
      viewsCount: 1420,
      salesCount: 184,
      revenueFCFA: 1840000,
      rating: 4.9
    },
    status: 'published',
    createdAt: '2026-02-10T10:00:00Z'
  },
  {
    id: 'prod_02',
    title: 'Pack 500+ Modèles Canva Pro E-commerce & Réseaux Sociaux',
    slug: 'pack-500-modeles-canva-pro',
    description: 'Une collection complète de visuels professionnels prêts à l’emploi pour Instagram, Facebook, statuts WhatsApp et bannières promotionnelles pour produits physiques et digitaux.',
    category: 'templates',
    recommendedPriceFCFA: 15000,
    commissionRatePercent: 60,
    formats: ['Liens Canva Editables', 'PNG HD', 'PSD Source'],
    rightsType: 'private_label',
    rightsDescription: 'Droits de Label Privé (PLR) : Vous pouvez modifier les couleurs, ajouter votre propre marque ou logo et vendre le pack sous votre nom d’entreprise.',
    promotionalGuide: 'Montrez une courte vidéo avant/après sur TikTok : "Comment j’ai créé un visuel professionnel pour ma boutique en 2 minutes sans graphiste".',
    salesPageUrl: '#modele-page-templates',
    downloadUrl: '/downloads/pack_500_canva_pro.zip',
    coverImage: '/src/assets/images/mdd_sales_funnel_1792201256194.jpg',
    stats: {
      viewsCount: 2890,
      salesCount: 310,
      revenueFCFA: 4650000,
      rating: 4.8
    },
    status: 'published',
    createdAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'prod_03',
    title: 'Masterclass Vidéo : Lancer un Système Digital Automatisé',
    slug: 'masterclass-systeme-digital-automatise',
    description: 'Formation vidéo complète de 6 heures pas à pas : de la création de l’offre jusqu’à la configuration des pages de vente et l’encaissement par Mobile Money.',
    category: 'video_course',
    recommendedPriceFCFA: 25000,
    commissionRatePercent: 40,
    formats: ['Vidéos Streaming HD', 'Fiches PDF', 'Checklists'],
    rightsType: 'affiliate_only',
    rightsDescription: 'Promotion en Affiliation Uniquement : Vous touchez 40% de commission nette (10 000 FCFA) par vente enregistrée via votre lien d’affilié officiel.',
    promotionalGuide: 'Partagez votre propre parcours d’apprentissage et montrez les coulisses de la mise en place de votre premier système de vente.',
    salesPageUrl: '#masterclass-funnel',
    downloadUrl: '',
    coverImage: '/src/assets/images/mdd_hero_cinematic_1792201255959.jpg',
    stats: {
      viewsCount: 3410,
      salesCount: 96,
      revenueFCFA: 2400000,
      rating: 5.0
    },
    status: 'published',
    createdAt: '2026-04-14T09:30:00Z'
  },
  {
    id: 'prod_04',
    title: '100 Scripts TikTok & Reels Viraux pour Vendre en Afrique',
    slug: '100-scripts-tiktok-reels-afrique',
    description: 'Les structures narratives exactes, accroches psychologiques et appels à l’action adaptés aux algorithmes de 2026 pour générer du trafic qualifié sans dépenser 1 FCFA en publicité.',
    category: 'templates',
    recommendedPriceFCFA: 9000,
    commissionRatePercent: 50,
    formats: ['PDF Interactif', 'Google Docs', 'Tableau Notion'],
    rightsType: 'private_label',
    rightsDescription: 'Droits de Label Privé (PLR) : Vous pouvez reformuler les scripts, intégrer vos propres exemples et les distribuer à vos abonnés ou clients.',
    promotionalGuide: 'Idéal pour attirer les jeunes créateurs qui veulent monétiser leur audience sans montrer obligatoirement leur visage.',
    salesPageUrl: '#modele-page-scripts',
    downloadUrl: '/downloads/100_scripts_viraux.pdf',
    coverImage: '/src/assets/images/mdd_digital_pack_1792201256151.jpg',
    stats: {
      viewsCount: 1980,
      salesCount: 224,
      revenueFCFA: 2016000,
      rating: 4.9
    },
    status: 'published',
    createdAt: '2026-05-20T15:00:00Z'
  },
  {
    id: 'prod_05',
    title: 'Guide Juridique & Fiscal du Commerce Électronique en Zone CEMAC/UEMOA',
    slug: 'guide-juridique-fiscal-afrique',
    description: 'Comprendre les formalités de déclaration, la TVA sur les services numériques, le rapatriement des fonds et la sécurisation des contrats de prestation en Afrique subsaharienne.',
    category: 'ebook',
    recommendedPriceFCFA: 12000,
    commissionRatePercent: 40,
    formats: ['PDF Document'],
    rightsType: 'personal_view_only',
    rightsDescription: 'Consultation Personnelle Uniquement : Ce document est strictement réservé à votre usage propre. Toute reproduction, revente ou partage public est strictement interdit.',
    promotionalGuide: 'À recommander aux entrepreneurs qui souhaitent structurer légalement leur société et ouvrir un compte bancaire professionnel.',
    salesPageUrl: '#',
    downloadUrl: '/downloads/guide_fiscal_cemac_uemoa.pdf',
    coverImage: '/src/assets/images/mdd_sales_funnel_1792201256194.jpg',
    stats: {
      viewsCount: 890,
      salesCount: 65,
      revenueFCFA: 780000,
      rating: 4.7
    },
    status: 'published',
    createdAt: '2026-06-10T11:00:00Z'
  }
];

export const INITIAL_COURSE: Course = {
  id: 'course_mdd_academy',
  title: "L'Académie des Millionnaires du Digital (M.D.D.)",
  description: 'Le parcours structuré étape par étape pour bâtir, automatiser et développer votre activité de vente de produits numériques en Afrique francophone.',
  coverImage: '/src/assets/images/mdd_hero_cinematic_1792201255959.jpg',
  level: 'Débutant',
  durationHours: 14.5,
  modulesCount: 5,
  lessonsCount: 16,
  createdAt: '2026-01-20T10:00:00Z',
  modules: [
    {
      id: 'mod_01',
      title: 'Module 1 : Les Fondations du Business Digital en Afrique',
      order: 1,
      description: 'Démystifier le commerce numérique, comprendre les réalités du marché local et adopter le bon état d’esprit.',
      lessons: [
        {
          id: 'les_01',
          title: '01. Pourquoi le produit digital est l’opportunité N°1 en Afrique aujourd’hui',
          durationMinutes: 18,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Analyse des barrières à l’entrée inexistantes (pas de stocks, pas de douanes) et de l’explosion de la pénétration de la 4G/5G et du Mobile Money.',
          resources: [
            { name: 'Feuille de route stratégique MDD 2026.pdf', type: 'pdf', size: '2.4 MB', url: '#' }
          ]
        },
        {
          id: 'les_02',
          title: '02. Comprendre les différents types de licences : MRR, PLR et Affiliation',
          durationMinutes: 22,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'La différence cruciale entre droits de revente, affiliation et label privé pour éviter les infractions et maximiser vos marges.',
          resources: [
            { name: 'Matrice comparative des licences commerciales.pdf', type: 'pdf', size: '1.1 MB', url: '#' }
          ]
        },
        {
          id: 'les_03',
          title: '03. Choisir sa niche rentable en zone CEMAC et UEMOA',
          durationMinutes: 25,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Les 4 grandes niches qui convertissent en Afrique : Argent & Business, Compétences & Carrière, Relations, Santé & Bien-être.',
          resources: [
            { name: 'Calculateur de rentabilité par niche.xlsx', type: 'doc', size: '450 KB', url: '#' }
          ]
        }
      ]
    },
    {
      id: 'mod_02',
      title: 'Module 2 : Mise en Place de l’Offre & Choix des Produits',
      order: 2,
      description: 'Naviguer dans le catalogue M.D.D., sélectionner son offre irrésistible et fixer un prix psychologique en FCFA.',
      lessons: [
        {
          id: 'les_04',
          title: '01. Analyse des produits à forte demande dans notre catalogue',
          durationMinutes: 20,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Comment tester la réceptivité de son audience avec un produit à moins de 10 000 FCFA avant de monter en gamme.',
          resources: []
        },
        {
          id: 'les_05',
          title: '02. Créer une offre groupée (Bundle) qui écrase toute concurrence',
          durationMinutes: 26,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Ajouter des bonus à forte valeur perçue (modèles, accès à un groupe WhatsApp, fiche pratique).',
          resources: [
            { name: 'Modèle de structure d’offre irrésistible.pdf', type: 'pdf', size: '1.8 MB', url: '#' }
          ]
        },
        {
          id: 'les_06',
          title: '03. Les grilles tarifaires en FCFA qui maximisent les conversions Mobile Money',
          durationMinutes: 19,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Pourquoi 6 550 FCFA, 9 900 FCFA et 15 000 FCFA fonctionnent mieux que des chiffres ronds.',
          resources: []
        }
      ]
    },
    {
      id: 'mod_03',
      title: 'Module 3 : Tunnels de Vente & Architecture WhatsApp',
      order: 3,
      description: 'Créer votre page de vente sans coder et automatiser la prise de contact sur WhatsApp Business.',
      lessons: [
        {
          id: 'les_07',
          title: '01. Anatomie d’une page de vente qui vend aux Africains',
          durationMinutes: 30,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Preuve sociale locale, clarté sur la livraison instantanée et réassurance sur les paiements par téléphone.',
          resources: [
            { name: 'Checklist audit page de vente.pdf', type: 'pdf', size: '890 KB', url: '#' }
          ]
        },
        {
          id: 'les_08',
          title: '02. Configuration professionnelle de WhatsApp Business & Catalogues',
          durationMinutes: 24,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Messages d’accueil, réponses rapides enregistrées, étiquettes clients (Prospect, Payé, À relancer).',
          resources: [
            { name: 'Pack de 20 réponses rapides WhatsApp.txt', type: 'doc', size: '45 KB', url: '#' }
          ]
        },
        {
          id: 'les_09',
          title: '03. Les passerelles de paiement locales : Orange Money, MTN MoMo, Wave',
          durationMinutes: 28,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Comment encaisser automatiquement ou valider manuellement les transactions en toute sécurité.',
          resources: []
        }
      ]
    },
    {
      id: 'mod_04',
      title: 'Module 4 : Acquisition de Trafic Organique (TikTok & Meta)',
      order: 4,
      description: 'Attirer des dizaines de prospects chaque jour sans dépenser d’argent en publicité payante.',
      lessons: [
        {
          id: 'les_10',
          title: '01. La stratégie TikTok 2026 pour vendre sans visage',
          durationMinutes: 32,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Formats d’écran partagé, études de cas rapides et storytelling captivant.',
          resources: [
            { name: 'Guide complet TikTok Organique Afrique.pdf', type: 'pdf', size: '3.2 MB', url: '#' }
          ]
        },
        {
          id: 'les_11',
          title: '02. Créer des vidéos virales avec CapCut et les templates fournis',
          durationMinutes: 27,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Rythme de montage, sous-titres animés, choix des musiques en tendance locale.',
          resources: []
        },
        {
          id: 'les_12',
          title: '03. Transformer ses spectateurs TikTok en contacts WhatsApp qualifiés',
          durationMinutes: 21,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Lien en bio optimisé, message pré-rempli et qualification instantanée du budget du prospect.',
          resources: []
        }
      ]
    },
    {
      id: 'mod_05',
      title: 'Module 5 : Closing, Fidélisation & Échelle du Chiffre d’Affaires',
      order: 5,
      description: 'Clôturer vos prospects indécis et construire une base de clients récurrents.',
      lessons: [
        {
          id: 'les_13',
          title: '01. Les 5 objections courantes en Afrique et comment les désamorcer',
          durationMinutes: 29,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Objection "C’est de l’arnaque", "Je n’ai pas d’argent maintenant", "Comment je vais recevoir le produit ?".',
          resources: [
            { name: 'Scripts de contre-objections validés.pdf', type: 'pdf', size: '1.2 MB', url: '#' }
          ]
        },
        {
          id: 'les_14',
          title: '02. La relance par statut WhatsApp : l’arme secrète',
          durationMinutes: 23,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'L’art de publier des témoignages réels, des coulisses et des rappels d’expiration d’offres.',
          resources: []
        },
        {
          id: 'les_15',
          title: '03. Atteindre son premier million de FCFA : feuille de calcul et objectifs',
          durationMinutes: 25,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Décomposition mathématique : 100 ventes à 10 000 FCFA ou 200 ventes à 5 000 FCFA. Gestion de la trésorerie.',
          resources: [
            { name: 'Plan d’action 90 jours vers 1M FCFA.pdf', type: 'pdf', size: '1.5 MB', url: '#' }
          ]
        }
      ]
    }
  ]
};

export const INITIAL_TEMPLATES: SalesPageTemplate[] = [
  {
    id: 'tmpl_01',
    title: 'Tunnel WhatsApp Direct (Spécial Vente Rapide Mobile)',
    targetAudience: 'Acheteurs sur smartphone (90% du trafic en Afrique)',
    recommendedProductType: 'E-books, guides PDF, mini-formations à moins de 15 000 FCFA',
    structure: [
      'Accroche percutante orientée douleur concrète',
      'Visuel 3D du produit avec mockups téléphone',
      'Pour qui est ce guide / Ce que vous allez maîtriser',
      'Preuve sociale & captures d’écrans WhatsApp',
      'Prix barré en FCFA avec compte à rebours',
      'Bouton unique : "Commander directement sur WhatsApp"'
    ],
    conversionRateEst: '12.4% de clics vers WhatsApp',
    customizableCopy: `[TITRE EN EXTRA GRAS] : COMMENT PASSER DE ZÉRO À TES PREMIÈRES VENTES SANS BUDGET PUBLICITAIRE.
Tu as déjà essayé de poster des produits sur tes statuts sans avoir de clients ?
Tu en as marre des "Prix en privé" qui ne mènent à rien ?
Découvre la méthode pas à pas utilisée par plus de 300 entrepreneurs en Afrique francophone.
Prix spécial lancement : 6 550 FCFA au lieu de 25 000 FCFA.
Paiement disponible par Orange Money, MTN MoMo, Wave et Carte Bancaire.`,
    htmlPreviewCode: `<div class="bg-black text-white p-8 max-w-xl mx-auto border border-neutral-800 rounded-xl">
  <div class="text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-2">MÉTHODE TESTÉE EN AFRIQUE</div>
  <h1 class="text-2xl font-black text-white mb-4">LE GUIDE ULTIME DU CLOSING WHATSAPP</h1>
  <p class="text-neutral-400 text-sm mb-6">Ne perds plus aucun prospect curieux. Transforme tes conversations en paiements Mobile Money confirmés.</p>
  <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-lg mb-6 flex justify-between items-center">
    <div>
      <span class="text-xs text-neutral-500 line-through">25 000 FCFA</span>
      <div class="text-xl font-bold text-[#4FC3F7]">6 550 FCFA</div>
    </div>
    <div class="text-xs text-[#FFD700] font-semibold bg-amber-500/10 px-3 py-1 rounded">ÉCONOMIE DE 74%</div>
  </div>
  <button class="w-full py-3 bg-[#4FC3F7] text-black font-bold rounded-lg hover:bg-[#38bdf8] transition-colors">
    COMMANDER SUR WHATSAPP EN 1 CLIC
  </button>
</div>`
  },
  {
    id: 'tmpl_02',
    title: 'Page de Vente "Lead Magnet to Premium Offer"',
    targetAudience: 'Professionnels, cadres, consultants et formateurs',
    recommendedProductType: 'Packs de modèles Canva, Kits d’automatisation, Formations vidéos',
    structure: [
      'Bannière d’alerte avec offre limitée',
      'Vidéo de démonstration ou VSL de 5 minutes',
      'Liste à puces des fonctionnalités avec bénéfices',
      'Garantie "Satisfait ou Accompagnement prolongé"',
      'Sélecteur de pays avec opérateurs Mobile Money affichés'
    ],
    conversionRateEst: '8.7% de taux d’achat direct',
    customizableCopy: `DÉCOUVREZ LE PACK PROFESSIONNEL LE PLUS COMPLET POUR LES CRÉATEURS AFRICAINS.
Plus de 500 modèles prêts à l'emploi. Téléchargement immédiat après validation du paiement.
Compatible avec les comptes Canva gratuits et payants.
Investissement : 15 000 FCFA (Valeur réelle : 120 000 FCFA).`,
    htmlPreviewCode: `<div class="bg-neutral-950 text-white p-8 max-w-2xl mx-auto border border-neutral-800 rounded-xl">
  <div class="text-center mb-6">
    <span class="text-xs font-semibold text-[#FFD700] bg-amber-500/10 px-3 py-1 rounded-full">PACK EXCLUSIF 2026</span>
    <h2 class="text-3xl font-black mt-3">500+ TEMPLATES CANVA PRO</h2>
    <p class="text-neutral-400 text-sm mt-2">Créez des visuels qui captivent vos clients sans perdre des heures sur Photoshop.</p>
  </div>
  <div class="grid grid-cols-2 gap-3 mb-6 text-xs text-neutral-300">
    <div class="p-3 bg-neutral-900 border border-neutral-800 rounded">✓ 250 Posts Instagram & Facebook</div>
    <div class="p-3 bg-neutral-900 border border-neutral-800 rounded">✓ 150 Statuts WhatsApp Haute Conversion</div>
    <div class="p-3 bg-neutral-900 border border-neutral-800 rounded">✓ 100 Bannières promotionnelles</div>
    <div class="p-3 bg-neutral-900 border border-neutral-800 rounded">✓ Droits de revente (PLR) inclus</div>
  </div>
  <div class="text-center">
    <button class="px-6 py-3 bg-[#FFD700] text-black font-extrabold rounded-lg hover:bg-yellow-400 transition-colors">
      TÉLÉCHARGER LE PACK (15 000 FCFA)
    </button>
  </div>
</div>`
  },
  {
    id: 'tmpl_03',
    title: 'Page de Capture Minimaliste & Accès Immédiat',
    targetAudience: 'Prospects issus des réseaux sociaux (TikTok / Instagram)',
    recommendedProductType: 'Produits d’appel, webinaires, e-books gratuits avec vente additionnelle',
    structure: [
      'Titre épuré et accrocheur',
      'Formulaire simplifié : Prénom + WhatsApp + Email',
      'Sélection du pays pour l’envoi automatique sur WhatsApp',
      'Redirection instantanée vers la page de paiement ou de téléchargement'
    ],
    conversionRateEst: '34.2% de taux d’inscription',
    customizableCopy: `Reçois gratuitement notre plan d'action en 5 étapes pour démarrer dans le business digital en Afrique en 2026.
Indique ton numéro WhatsApp pour recevoir le document PDF immédiatement.`,
    htmlPreviewCode: `<div class="bg-black text-white p-6 max-w-md mx-auto border border-neutral-800 rounded-xl">
  <h3 class="text-xl font-black mb-2 text-white">PLAN D'ACTION 2026 GRATUIT</h3>
  <p class="text-neutral-400 text-xs mb-4">Reçois le guide PDF directement sur ton WhatsApp en moins de 30 secondes.</p>
  <div class="space-y-3">
    <input type="text" placeholder="Ton prénom" class="w-full bg-neutral-900 border border-neutral-800 p-2.5 text-xs rounded text-white" />
    <input type="tel" placeholder="Ton numéro WhatsApp (+237 / +225...)" class="w-full bg-neutral-900 border border-neutral-800 p-2.5 text-xs rounded text-white" />
    <button class="w-full py-2.5 bg-[#4FC3F7] text-black text-xs font-bold rounded">RECEVOIR LE PLAN D'ACTION</button>
  </div>
</div>`
  }
];

export const INITIAL_RESOURCES: MarketingResource[] = [
  {
    id: 'res_01',
    title: 'Script Vidéo TikTok : "Ce que j’aurais aimé savoir avant de vendre en ligne en Afrique"',
    type: 'video_script',
    category: 'Vidéos & Reels',
    targetPlatform: 'TikTok',
    content: `[0-3s - ACCROCHE FORTE AVEC LE TÉLÉPHONE EN MAIN]
"Si tu as un compte WhatsApp et une connexion internet au Cameroun ou en Côte d’Ivoire, écoute ça très attentivement."
[3-10s - CASSER LA CROYANCE DU MANQUE D'ARGENT]
"Tu n’as pas besoin de 500 000 FCFA pour importer des perruques de Chine ou louer une boutique physique qui va te ruiner en loyer d'avance."
[10-25s - PRÉSENTATION DE L'ALTERNATIVE NUMÉRIQUE]
"Ce que les entrepreneurs intelligents font aujourd’hui, c'est vendre des solutions digitales toutes prêtes : guides, formations et templates qui se téléchargent instantanément. Tu achètes les droits de revente une fois, et tu peux encaisser par Orange Money ou Wave 50 fois par mois."
[25-30s - APPEL À L'ACTION CLAIR]
"Commente 'DIGITAL' ou clique sur le lien dans ma bio pour voir le catalogue complet."`,
    downloadsCount: 524,
    tags: ['TikTok', 'Script Viral', 'Trafic Gratuit'],
    isPremium: true,
    createdAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 'res_02',
    title: 'Sequence WhatsApp de Clôture : Réponse à l’objection "C’est combien ?"',
    type: 'whatsapp_swipe',
    category: 'Closing WhatsApp',
    targetPlatform: 'WhatsApp',
    content: `MESSAGE 1 (NE PAS DONNER LE PRIX TOUT DE SUITE DANS LE VIDE) :
"Bonjour [Prénom] ! Merci pour ton intérêt. Avec grand plaisir pour te donner tous les détails ! Avant de te préciser le tarif promotionnel actuel, dis-moi juste : tu aimerais utiliser ce guide pour ton propre business actuel, ou tu veux le revendre pour te créer une nouvelle source de revenus par Mobile Money ?"

MESSAGE 2 (APRÈS SA RÉPONSE) :
"Parfait ! C’est exactement pour cela que le pack a été conçu. Tu reçois le guide complet de 120 pages, plus les 20 modèles de réponses aux objections et la licence de revente autorisée.
Normalement le pack complet est vendu à 25 000 FCFA.
Mais pour cette semaine, l'accès complet est à seulement 6 550 FCFA (soit moins qu'un repas au restaurant).
Tu préfères régler par Orange Money, MTN MoMo ou Wave ?"`,
    downloadsCount: 780,
    tags: ['WhatsApp', 'Closing', 'Mobile Money', 'Objections'],
    isPremium: true,
    createdAt: '2026-03-12T14:00:00Z'
  },
  {
    id: 'res_03',
    title: 'Top 25 Accroches Publicitaires qui Captivent en Afrique Francophone',
    type: 'ad_hook',
    category: 'Publicité & Trafic',
    targetPlatform: 'Facebook',
    content: `1. "Arrête d’utiliser ton forfait internet uniquement pour regarder des vidéos drôles..."
2. "Pourquoi 95% des commerçants sur WhatsApp perdent leurs clients après avoir dit le prix."
3. "Le business en ligne qui demande 0 FCFA de frais de douane et 0 stock physique."
4. "Comment ce jeune de Douala génère 150 000 FCFA/semaine avec un simple document PDF."
5. "Si tu sais envoyer un message sur WhatsApp, tu as déjà 80% des compétences nécessaires."
6. "La vérité que personne ne te dit sur le dropshipping en Afrique..."
7. "Voici comment encaisser des paiements de Dakar, Abidjan et Yaoundé sans bouger de ta chambre."`,
    downloadsCount: 612,
    tags: ['Facebook Ads', 'Copywriting', 'Accroches'],
    isPremium: true,
    createdAt: '2026-04-02T11:30:00Z'
  },
  {
    id: 'res_04',
    title: 'Calendrier Éditorial Clé en Main : 30 Jours de Publications pour Vendre',
    type: 'content_calendar',
    category: 'Stratégie de Contenu',
    targetPlatform: 'Multi-plateforme',
    content: `Semaine 1 : Éducation & Prise de conscience
- Jour 1 : Le problème n°1 avec les jobs traditionnels face à l'inflation.
- Jour 2 : Qu’est-ce qu’un produit digital ? (Explications claires).
- Jour 3 : Mon parcours : comment j'ai découvert la vente de templates.
- Jour 4 : Démonstration en direct : modifier un visuel en 3 minutes.
- Jour 5 : Réponse aux questions des abonnés en commentaire.
- Jour 6 : Témoignage d'un membre qui a fait sa première vente.
- Jour 7 : Récapitulatif et ouverture d'une session de questions WhatsApp.`,
    downloadsCount: 890,
    tags: ['Planning', 'Organisation', '30 Jours'],
    isPremium: true,
    createdAt: '2026-05-15T09:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'MDD-ORD-2026-1001',
    userId: 'usr_member_01',
    userName: 'Koffi Mensah',
    userEmail: 'koffi@gmail.com',
    userWhatsapp: '+2250788990011',
    userCountry: "Côte d'Ivoire",
    itemType: 'subscription',
    itemId: 'sub_mdd_pass',
    itemTitle: 'Accès Annuel M.D.D. - Les Millionnaires du Digital',
    amountFCFA: 6550,
    currency: 'FCFA',
    paymentMethod: 'wave',
    paymentProvider: 'Wave',
    providerTransactionId: 'WAV-CI-98412850',
    status: 'confirmed',
    affiliateCode: 'MDD-ADMIN-01',
    commissionFCFA: 2620,
    createdAt: '2026-08-10T14:20:00Z',
    confirmedAt: '2026-08-10T14:22:15Z'
  },
  {
    id: 'ord_1002',
    orderNumber: 'MDD-ORD-2026-1002',
    userId: 'usr_member_02',
    userName: 'Aminata Traoré',
    userEmail: 'aminata@gmail.com',
    userWhatsapp: '+221771234567',
    userCountry: 'Sénégal',
    itemType: 'subscription',
    itemId: 'sub_mdd_pass',
    itemTitle: 'Accès Annuel M.D.D. - Les Millionnaires du Digital',
    amountFCFA: 6550,
    currency: 'FCFA',
    paymentMethod: 'orange_money',
    paymentProvider: 'Orange Money',
    providerTransactionId: 'OM-SN-77219482',
    status: 'confirmed',
    affiliateCode: 'MDD-KOFFI-92',
    commissionFCFA: 2620,
    createdAt: '2026-09-01T10:12:00Z',
    confirmedAt: '2026-09-01T10:15:00Z'
  },
  {
    id: 'ord_1003',
    orderNumber: 'MDD-ORD-2026-1003',
    userId: 'usr_member_03',
    userName: 'Boris Ondoa',
    userEmail: 'boris.ondoa@yahoo.fr',
    userWhatsapp: '+237677894512',
    userCountry: 'Cameroun',
    itemType: 'subscription',
    itemId: 'sub_mdd_pass',
    itemTitle: 'Accès Annuel M.D.D. - Les Millionnaires du Digital',
    amountFCFA: 6550,
    currency: 'FCFA',
    paymentMethod: 'mtn_momo',
    paymentProvider: 'MTN Mobile Money',
    providerTransactionId: 'MTN-CM-4439012',
    status: 'confirmed',
    affiliateCode: 'MDD-ADMIN-01',
    commissionFCFA: 2620,
    createdAt: '2026-09-18T11:38:00Z',
    confirmedAt: '2026-09-18T11:40:22Z'
  },
  {
    id: 'ord_1004',
    orderNumber: 'MDD-ORD-2026-1004',
    userId: 'usr_member_01',
    userName: 'Koffi Mensah',
    userEmail: 'koffi@gmail.com',
    userWhatsapp: '+2250788990011',
    userCountry: "Côte d'Ivoire",
    itemType: 'digital_product',
    itemId: 'prod_02',
    itemTitle: 'Pack 500+ Modèles Canva Pro E-commerce',
    amountFCFA: 15000,
    currency: 'FCFA',
    paymentMethod: 'wave',
    paymentProvider: 'Wave',
    providerTransactionId: 'WAV-CI-1194820',
    status: 'confirmed',
    createdAt: '2026-09-25T16:00:00Z',
    confirmedAt: '2026-09-25T16:02:10Z'
  },
  {
    id: 'ord_1005',
    orderNumber: 'MDD-ORD-2026-1005',
    userId: 'usr_member_04',
    userName: 'Christian Mukendi',
    userEmail: 'mukendi.chr@gmail.com',
    userWhatsapp: '+243819876543',
    userCountry: 'RDC',
    itemType: 'subscription',
    itemId: 'sub_mdd_pass',
    itemTitle: 'Accès Annuel M.D.D. - Les Millionnaires du Digital',
    amountFCFA: 6550,
    currency: 'FCFA',
    paymentMethod: 'airtel_money',
    paymentProvider: 'Airtel Money',
    status: 'pending',
    createdAt: '2026-10-16T17:10:00Z'
  }
];

export const INITIAL_COMMISSIONS: Commission[] = [
  {
    id: 'com_01',
    affiliateUserId: 'usr_member_01',
    affiliateName: 'Koffi Mensah',
    affiliateCode: 'MDD-KOFFI-92',
    orderId: 'ord_1002',
    orderAmountFCFA: 6550,
    commissionRatePercent: 40,
    commissionAmountFCFA: 2620,
    status: 'paid',
    createdAt: '2026-09-01T10:15:00Z',
    paidAt: '2026-09-05T12:00:00Z'
  },
  {
    id: 'com_02',
    affiliateUserId: 'usr_admin_01',
    affiliateName: 'Amadou Diallo',
    affiliateCode: 'MDD-ADMIN-01',
    orderId: 'ord_1001',
    orderAmountFCFA: 6550,
    commissionRatePercent: 40,
    commissionAmountFCFA: 2620,
    status: 'approved',
    createdAt: '2026-08-10T14:22:00Z'
  },
  {
    id: 'com_03',
    affiliateUserId: 'usr_admin_01',
    affiliateName: 'Amadou Diallo',
    affiliateCode: 'MDD-ADMIN-01',
    orderId: 'ord_1003',
    orderAmountFCFA: 6550,
    commissionRatePercent: 40,
    commissionAmountFCFA: 2620,
    status: 'approved',
    createdAt: '2026-09-18T11:40:00Z'
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'ev_01',
    title: 'Session Live Privée : "Multiplier ses ventes WhatsApp sans pub"',
    type: 'live_coaching',
    date: '2026-10-18',
    timeDouala: '19:00 (GMT+1 Douala)',
    meetingLink: 'https://meet.google.com/mdd-private-live',
    presenter: 'Amadou Diallo (Fondateur)',
    summary: 'Analyse en direct de 3 profils d’élèves, audit de leurs réponses aux prospects et mise en place de relances percutantes.',
    status: 'upcoming'
  },
  {
    id: 'ev_02',
    title: 'Atelier Pratique : "Création d’un produit digital avec l’IA en 48h"',
    type: 'masterclass',
    date: '2026-10-25',
    timeDouala: '18:30 (GMT+1 Douala)',
    meetingLink: 'https://meet.google.com/mdd-workshop-ai',
    presenter: 'Amadou Diallo & Invité Expert',
    summary: 'Structurer un guide PDF à haute valeur, générer les illustrations et packager le tout avec Canva Pro.',
    status: 'upcoming'
  },
  {
    id: 'ev_03',
    title: 'Replay : "Configuration pas-à-pas des comptes Orange Money & Wave Business"',
    type: 'replay',
    date: '2026-10-10',
    timeDouala: 'Replay disponible 24/7',
    replayVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    presenter: 'Amadou Diallo',
    summary: 'Comment séparer ses fonds personnels de ses encaissements professionnels et automatiser la vérification.',
    status: 'completed'
  }
];

export const INITIAL_ANNOUNCEMENTS: CommunityAnnouncement[] = [
  {
    id: 'ann_01',
    title: '🚀 Nouveau pack de 100 scripts TikTok & Reels disponible dans les ressources !',
    content: 'Chers membres, nous venons d’ajouter un nouveau document contenant 100 structures de vidéos testées pour l’Afrique. Téléchargez-le dès maintenant dans l’onglet Ressources Marketing.',
    date: '2026-10-15',
    priority: 'urgent',
    author: 'Équipe Pédagogique M.D.D.'
  },
  {
    id: 'ann_02',
    title: '⚠️ Rappel important sur les droits de revente et l’affiliation',
    content: 'Vérifiez toujours le macaron de droits de chaque produit dans le catalogue avant de le proposer. Les produits "Affiliation Uniquement" doivent impérativement être promus via votre lien unique pour garantir vos commissions.',
    date: '2026-10-08',
    priority: 'normal',
    author: 'Support Juridique'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    ticketNumber: 'TKT-2026-081',
    userId: 'usr_member_01',
    userName: 'Koffi Mensah',
    userEmail: 'koffi@gmail.com',
    userWhatsapp: '+2250788990011',
    subject: 'Question sur la personnalisation des liens d’affiliation',
    category: 'affiliation',
    status: 'resolved',
    createdAt: '2026-10-12T11:20:00Z',
    updatedAt: '2026-10-12T14:45:00Z',
    messages: [
      {
        id: 'msg_01',
        sender: 'user',
        senderName: 'Koffi Mensah',
        text: 'Bonjour l’équipe, comment puis-je raccourcir mon lien d’affiliation pour qu’il soit plus propre sur mes statuts WhatsApp ?',
        sentAt: '2026-10-12T11:20:00Z'
      },
      {
        id: 'msg_02',
        sender: 'admin',
        senderName: 'Support M.D.D.',
        text: 'Bonjour Koffi ! Vous pouvez utiliser un raccourcisseur gratuit comme TinyURL ou créer un lien WhatsApp direct avec votre code MDD-KOFFI-92 en suffixe. Nous avons mis un modèle dans les Ressources Marketing.',
        sentAt: '2026-10-12T14:45:00Z'
      }
    ]
  },
  {
    id: 'tkt_02',
    ticketNumber: 'TKT-2026-089',
    userId: 'usr_member_04',
    userName: 'Christian Mukendi',
    userEmail: 'mukendi.chr@gmail.com',
    userWhatsapp: '+243819876543',
    subject: 'Validation manuelle de mon paiement Airtel Money RDC',
    category: 'payment',
    status: 'in_progress',
    createdAt: '2026-10-16T17:15:00Z',
    updatedAt: '2026-10-16T17:30:00Z',
    messages: [
      {
        id: 'msg_03',
        sender: 'user',
        senderName: 'Christian Mukendi',
        text: 'Bonjour, j’ai envoyé 10$ par Airtel Money à Kinshasa. Voici la référence de transaction AIR-CD-89102.',
        sentAt: '2026-10-16T17:15:00Z'
      },
      {
        id: 'msg_04',
        sender: 'admin',
        senderName: 'Support Administratif',
        text: 'Bien reçu Christian, notre équipe de conformité vérifie le relevé d’encaissement et votre compte sera actif sous 30 minutes.',
        sentAt: '2026-10-16T17:30:00Z'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    action: 'Connexion Administrateur',
    performedBy: 'Amadou Diallo (admin@mdd.africa)',
    details: 'Authentification 2FA réussie depuis Douala, Cameroun',
    timestamp: '2026-10-16T18:30:00+01:00'
  },
  {
    id: 'log_02',
    action: 'Mise à jour Paramètres de la Plateforme',
    performedBy: 'Amadou Diallo',
    details: 'Maintien du tarif d’adhésion à 6 550 FCFA pour le lancement de la promotion',
    timestamp: '2026-10-16T12:00:00+01:00'
  },
  {
    id: 'log_03',
    action: 'Validation Commission Affilié',
    performedBy: 'Système Automatique',
    details: 'Commission de 2 620 FCFA approuvée pour Koffi Mensah (Commande #1002)',
    timestamp: '2026-09-01T10:15:00+01:00'
  }
];
