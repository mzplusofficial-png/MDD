export type UserRole = 'admin' | 'member';
export type UserStatus = 'active' | 'pending_payment' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string;
  avatarUrl?: string;
  affiliateCode: string;
  referredBy?: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string;
}

export type ProductRightsType = 
  | 'affiliate_only'     // Promotion en affiliation uniquement (commission)
  | 'resale_rights'      // Droits de revente (MRR - Master Resell Rights)
  | 'private_label'      // Droits de label privé (PLR - modifiable)
  | 'personal_view_only';// Consultation personnelle uniquement

export interface DigitalProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'ebook' | 'video_course' | 'templates' | 'software' | 'audio' | 'coaching_kit';
  recommendedPriceFCFA: number;
  commissionRatePercent: number; // e.g. 50%
  formats: string[]; // e.g. ['PDF', 'EPUB', 'MP4', 'Canva']
  rightsType: ProductRightsType;
  rightsDescription: string;
  promotionalGuide: string;
  salesPageUrl?: string;
  downloadUrl?: string;
  coverImage: string;
  stats: {
    viewsCount: number;
    salesCount: number;
    revenueFCFA: number;
    rating: number;
  };
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

export interface LessonResource {
  name: string;
  type: 'pdf' | 'zip' | 'link' | 'doc';
  size?: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // Embed or mock stream
  isCompleted?: boolean;
  summary: string;
  resources: LessonResource[];
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  durationHours: number;
  modulesCount: number;
  lessonsCount: number;
  modules: CourseModule[];
  createdAt: string;
}

export interface SalesPageTemplate {
  id: string;
  title: string;
  targetAudience: string;
  recommendedProductType: string;
  structure: string[];
  customizableCopy: string;
  conversionRateEst: string;
  previewImage?: string;
  htmlPreviewCode: string;
}

export type MarketingResourceType = 
  | 'video_script' 
  | 'ad_hook' 
  | 'social_post' 
  | 'whatsapp_swipe' 
  | 'email_sequence' 
  | 'content_calendar' 
  | 'promo_guide';

export interface MarketingResource {
  id: string;
  title: string;
  type: MarketingResourceType;
  category: string;
  targetPlatform: 'TikTok' | 'Instagram' | 'WhatsApp' | 'Facebook' | 'Email' | 'Multi-plateforme';
  content: string;
  downloadsCount: number;
  tags: string[];
  isPremium: boolean;
  createdAt: string;
}

export type PaymentMethod = 
  | 'orange_money' 
  | 'mtn_momo' 
  | 'wave' 
  | 'moov_money' 
  | 'airtel_money' 
  | 'bank_card';

export type PaymentStatus = 'pending' | 'confirmed' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userWhatsapp: string;
  userCountry: string;
  itemType: 'subscription' | 'digital_product';
  itemId: string;
  itemTitle: string;
  amountFCFA: number;
  currency: 'FCFA';
  paymentMethod: PaymentMethod;
  paymentProvider: 'Orange Money' | 'MTN Mobile Money' | 'Wave' | 'Moov Africa' | 'Airtel Money' | 'Carte Bancaire';
  providerTransactionId?: string;
  status: PaymentStatus;
  failureReason?: string;
  affiliateCode?: string;
  commissionFCFA?: number;
  createdAt: string;
  confirmedAt?: string;
}

export interface Commission {
  id: string;
  affiliateUserId: string;
  affiliateName: string;
  affiliateCode: string;
  orderId: string;
  orderAmountFCFA: number;
  commissionRatePercent: number;
  commissionAmountFCFA: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  createdAt: string;
  paidAt?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: 'live_coaching' | 'weekly_qa' | 'masterclass' | 'replay';
  date: string;
  timeDouala: string; // Ex: '19:00 (GMT+1)'
  meetingLink?: string;
  replayVideoUrl?: string;
  presenter: string;
  summary: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface CommunityAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'normal' | 'urgent';
  author: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'user' | 'admin';
  senderName: string;
  text: string;
  sentAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userWhatsapp: string;
  subject: string;
  category: 'payment' | 'access' | 'product' | 'affiliation' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messages: SupportTicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentGatewayConfig {
  id: string;
  name: string;
  provider: 'cinetpay' | 'fedapay' | 'paydunya' | 'notchpay' | 'wave_business';
  supportedCountries: string[];
  supportedMethods: PaymentMethod[];
  apiKeySet: boolean;
  webhookConfigured: boolean;
  testMode: boolean;
  enabled: boolean;
}

export interface PlatformSettings {
  programName: string;
  tagline: string;
  membershipPriceFCFA: number;
  membershipPriceEUR: number;
  defaultCommissionRatePercent: number;
  registrationOpen: boolean;
  maxCohortMembers: number;
  currentCohortCount: number;
  supportWhatsApp: string;
  supportEmail: string;
  telegramGroupUrl?: string;
  officialAnnouncement?: string;
  gateways: PaymentGatewayConfig[];
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
