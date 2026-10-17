-- ==============================================================================
-- PROJET : LES MILLIONNAIRES DU DIGITAL (M.D.D.)
-- SCHÉMA DE BASE DE DONNÉES POSTGRESQL (PRODUCTION-READY)
-- Devise de référence : FCFA (XAF/XOF)
-- Fuseau horaire : Africa/Douala
-- ==============================================================================

-- Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Table des utilisateurs (Utilisateurs & Gestion des Rôles)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'instructor', 'moderator')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending_payment', 'suspended')),
    affiliate_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by UUID REFERENCES users(id) ON DELETE SET NULL,
    avatar_url TEXT,
    subscription_plan VARCHAR(100) DEFAULT 'mdd_pass_premium',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala'),
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_affiliate_code ON users(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. Table des produits digitaux
CREATE TABLE IF NOT EXISTS digital_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    recommended_price_fcfa NUMERIC(12, 2) NOT NULL,
    commission_rate_percent NUMERIC(5, 2) NOT NULL DEFAULT 50.00,
    formats JSONB NOT NULL DEFAULT '["PDF"]',
    rights_type VARCHAR(50) NOT NULL CHECK (rights_type IN ('affiliate_only', 'resale_rights', 'private_label', 'personal_view_only')),
    rights_description TEXT NOT NULL,
    promotional_guide TEXT NOT NULL,
    sales_page_url TEXT,
    download_url TEXT,
    cover_image TEXT,
    views_count INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    revenue_fcfa NUMERIC(14, 2) DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

CREATE INDEX IF NOT EXISTS idx_products_category ON digital_products(category);
CREATE INDEX IF NOT EXISTS idx_products_rights ON digital_products(rights_type);

-- 3. Formations, Modules et Leçons
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT,
    level VARCHAR(50) DEFAULT 'Débutant',
    duration_hours NUMERIC(5, 2) DEFAULT 10.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

CREATE TABLE IF NOT EXISTS course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 15,
    video_url TEXT NOT NULL,
    summary TEXT,
    resources JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- Suivi de progression des apprenants
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, lesson_id)
);

-- 4. Modèles de pages de vente
CREATE TABLE IF NOT EXISTS sales_page_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    target_audience VARCHAR(255) NOT NULL,
    recommended_product_type VARCHAR(255) NOT NULL,
    structure JSONB NOT NULL,
    customizable_copy TEXT NOT NULL,
    conversion_rate_est VARCHAR(50),
    preview_image TEXT,
    html_preview_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- 5. Ressources Marketing
CREATE TABLE IF NOT EXISTS marketing_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('video_script', 'ad_hook', 'social_post', 'whatsapp_swipe', 'email_sequence', 'content_calendar', 'promo_guide')),
    category VARCHAR(100) NOT NULL,
    target_platform VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    downloads_count INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]',
    is_premium BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- 6. Commandes et Transactions
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_whatsapp VARCHAR(50) NOT NULL,
    user_country VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('subscription', 'digital_product')),
    item_id UUID NOT NULL,
    item_title VARCHAR(255) NOT NULL,
    amount_fcfa NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'FCFA',
    payment_method VARCHAR(50) NOT NULL,
    payment_provider VARCHAR(100) NOT NULL,
    provider_transaction_id VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded')),
    failure_reason TEXT,
    affiliate_code VARCHAR(50),
    commission_fcfa NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala'),
    confirmed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_affiliate_code ON orders(affiliate_code);

-- 7. Commissions d'affiliation
CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    affiliate_name VARCHAR(255) NOT NULL,
    affiliate_code VARCHAR(50) NOT NULL,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_amount_fcfa NUMERIC(12, 2) NOT NULL,
    commission_rate_percent NUMERIC(5, 2) NOT NULL,
    commission_amount_fcfa NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala'),
    paid_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_commissions_affiliate ON commissions(affiliate_user_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);

-- 8. Événements communautaires & Annonces
CREATE TABLE IF NOT EXISTS community_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    time_douala VARCHAR(50) NOT NULL,
    meeting_link TEXT,
    replay_video_url TEXT,
    presenter VARCHAR(255) NOT NULL,
    summary TEXT,
    status VARCHAR(50) DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

CREATE TABLE IF NOT EXISTS community_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'normal',
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- 9. Tickets de Support & Assistance
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_whatsapp VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    messages JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- 10. Paramètres de la Plateforme (Configurable par l'Administrateur)
CREATE TABLE IF NOT EXISTS platform_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    program_name VARCHAR(255) DEFAULT 'LES MILLIONNAIRES DU DIGITAL',
    membership_price_fcfa NUMERIC(12, 2) DEFAULT 6550.00,
    membership_price_eur NUMERIC(8, 2) DEFAULT 9.99,
    default_commission_rate_percent NUMERIC(5, 2) DEFAULT 40.00,
    registration_open BOOLEAN DEFAULT TRUE,
    max_cohort_members INTEGER DEFAULT 500,
    support_whatsapp VARCHAR(50) DEFAULT '+237690000000',
    support_email VARCHAR(255) DEFAULT 'contact@millionnairesdudigital.com',
    gateways_config JSONB DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);

-- 11. Journal d'Audit & Sécurité (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(255) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    ip_address VARCHAR(100),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Douala')
);
