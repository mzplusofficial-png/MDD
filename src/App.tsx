import React, { useState } from 'react';
import { useMDDStore } from './services/store';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoreOptionsSection } from './components/CoreOptionsSection';
import { SystemStepsSection } from './components/SystemStepsSection';
import { WhatYouGetSection } from './components/WhatYouGetSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AffiliateInvitationModal } from './components/AffiliateInvitationModal';
import { AffiliateInvitationPage } from './components/AffiliateInvitationPage';
import { MegaPackPage } from './components/MegaPackPage';
import { CourseAcademyPage } from './components/CourseAcademyPage';
import { MemberDashboard } from './components/MemberDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Shield, Sparkles } from 'lucide-react';

export default function App() {
  const store = useMDDStore();
  
  const [activeView, setActiveView] = useState<'home' | 'member' | 'admin' | 'affiliate-invitation' | 'mega-pack' | 'course'>('home');
  const [selectedMemberTab, setSelectedMemberTab] = useState<'overview' | 'catalog' | 'packs' | 'course' | 'templates' | 'resources' | 'sales' | 'community' | 'support' | 'profile'>('overview');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleNavigateToOption = (tab: 'catalog' | 'packs' | 'course' | 'community') => {
    // When clicking the Affiliate Program Option, open the designated dedicated invitation interface
    if (tab === 'catalog') {
      setActiveView('affiliate-invitation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // When clicking the Mega Pack Option, open the designated dedicated Google Drive interface
    if (tab === 'packs') {
      setActiveView('mega-pack');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // When clicking the Course Option, open the designated dedicated Academy interface
    if (tab === 'course') {
      setActiveView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!store.currentUser) {
      store.switchUser('usr_member_01');
    }

    setSelectedMemberTab(tab);
    setActiveView('member');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectAccess = () => {
    if (!store.currentUser) {
      store.switchUser('usr_member_01');
    }
    setSelectedMemberTab('overview');
    setActiveView('member');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#4FC3F7]/30 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        currentUser={store.currentUser}
        settings={store.settings}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={handleOpenAuth}
        onOpenCheckout={handleDirectAccess}
        onOpenArchitectureGuide={handleDirectAccess}
        onLogout={store.logout}
        onSwitchUser={store.switchUser}
        allUsers={store.users}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        
        {/* PUBLIC LANDING VIEW */}
        {activeView === 'home' && (
          <div>
            <HeroSection
              settings={store.settings}
              onJoinClick={() => {
                document.getElementById('options')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onDiscoverClick={() => {
                document.getElementById('systeme')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* THE 4 CORE OPTIONS REQUESTED BY USER */}
            <CoreOptionsSection onSelectOption={handleNavigateToOption} />

            <SystemStepsSection />

            <WhatYouGetSection
              settings={store.settings}
              onJoinClick={handleDirectAccess}
            />

            <TargetAudienceSection />

            {/* Quick Demo Switch Banner in Home */}
            <section className="py-8 bg-neutral-950 border-y border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-neutral-300">
                    Mode Démonstration &bull; Accédez directement aux espaces protégés :
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      store.switchUser('usr_member_01');
                      setSelectedMemberTab('overview');
                      setActiveView('member');
                    }}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-[#4FC3F7] text-[#4FC3F7] rounded-lg font-semibold transition-colors"
                  >
                    Ouvrir Espace Membre (Koffi M.)
                  </button>
                  <button
                    onClick={() => {
                      store.switchUser('usr_admin_01');
                      setActiveView('admin');
                    }}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-[#FFD700] text-[#FFD700] rounded-lg font-semibold transition-colors"
                  >
                    Ouvrir Console Admin (Amadou D.)
                  </button>
                </div>
              </div>
            </section>

            <FAQSection />

            <Footer
              settings={store.settings}
              onOpenArchitectureGuide={handleDirectAccess}
              onOpenCheckout={handleDirectAccess}
            />
          </div>
        )}

        {/* MEMBER AREA VIEW */}
        {activeView === 'member' && (
          <div>
            {store.currentUser ? (
              <MemberDashboard
                key={selectedMemberTab}
                initialTab={selectedMemberTab}
                currentUser={store.currentUser}
                settings={store.settings}
                products={store.products}
                course={store.course}
                completedLessons={store.completedLessons}
                onToggleLesson={store.toggleLessonComplete}
                templates={store.templates}
                resources={store.resources}
                onDownloadResource={store.recordResourceDownload}
                orders={store.orders}
                commissions={store.commissions}
                events={store.events}
                announcements={store.announcements}
                tickets={store.tickets}
                onCreateTicket={store.createSupportTicket}
                onReplyTicket={(ticketId, message) => store.replyToTicket(ticketId, message, 'user')}
                onOpenCheckout={handleDirectAccess}
              />
            ) : (
              <div className="max-w-md mx-auto my-20 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 bg-[#4FC3F7]/10 text-[#4FC3F7] rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Espace Réservé aux Membres</h3>
                <p className="text-xs text-neutral-400">
                  Connectez-vous avec votre adresse e-mail ou utilisez un compte de test pour accéder à l'espace de formation et aux ressources.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="w-full py-2.5 bg-[#4FC3F7] text-black font-extrabold text-xs rounded-lg hover:bg-[#38bdf8]"
                  >
                    Se Connecter
                  </button>
                  <button
                    onClick={() => {
                      store.switchUser('usr_member_01');
                    }}
                    className="w-full py-2 bg-neutral-800 text-white font-semibold text-xs rounded-lg hover:bg-neutral-700"
                  >
                    Connexion 1-Clic Démo Membre
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {activeView === 'admin' && (
          <div>
            {store.currentUser?.role === 'admin' ? (
              <AdminDashboard
                currentUser={store.currentUser}
                users={store.users}
                settings={store.settings}
                products={store.products}
                course={store.course}
                templates={store.templates}
                resources={store.resources}
                orders={store.orders}
                commissions={store.commissions}
                events={store.events}
                announcements={store.announcements}
                tickets={store.tickets}
                auditLogs={store.auditLogs}
                onUpdateUserStatus={store.updateUserStatus}
                onUpdateUserRole={store.updateUserRole}
                onAddProduct={store.addProduct}
                onUpdateProduct={store.updateProduct}
                onAddMarketingResource={store.addMarketingResource}
                onConfirmOrderPayment={store.confirmOrderPayment}
                onCancelOrder={store.cancelOrder}
                onMarkCommissionPaid={store.markCommissionPaid}
                onReplyTicket={(ticketId, message) => store.replyToTicket(ticketId, message, 'admin')}
                onUpdateTicketStatus={store.updateTicketStatus}
                onUpdateSettings={store.updateSettings}
                onExportCSV={store.exportToCSV}
                onResetDefaults={store.resetToFactoryDefaults}
                onBackToMemberView={() => setActiveView('member')}
              />
            ) : (
              <div className="max-w-md mx-auto my-20 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 text-[#FFD700] rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Console Administrateur Protégée</h3>
                <p className="text-xs text-neutral-400">
                  Cette zone requiert le rôle d'administrateur système pour la gestion des utilisateurs, des prix et des commissions.
                </p>
                <button
                  onClick={() => {
                    store.switchUser('usr_admin_01');
                  }}
                  className="w-full py-2.5 bg-[#FFD700] text-black font-extrabold text-xs rounded-lg hover:bg-yellow-400"
                >
                  Basculer sur le compte Administrateur (Amadou D.)
                </button>
              </div>
            )}
          </div>
        )}

        {/* AFFILIATE INVITATION DEDICATED NEW INTERFACE */}
        {activeView === 'affiliate-invitation' && (
          <AffiliateInvitationPage
            currentUser={store.currentUser}
            settings={store.settings}
            onBack={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAccessApproved={() => {
              if (!store.currentUser) {
                store.switchUser('usr_member_01');
              }
              setSelectedMemberTab('catalog');
              setActiveView('member');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPacks={() => {
              setActiveView('mega-pack');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCourse={() => {
              setActiveView('course');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCommunity={() => {
              if (!store.currentUser) {
                store.switchUser('usr_member_01');
              }
              setSelectedMemberTab('community');
              setActiveView('member');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* OPTION 2: DEDICATED MEGA PACK DIGITAL PRODUCTS PAGE */}
        {activeView === 'mega-pack' && (
          <MegaPackPage
            onBack={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToAffiliation={() => {
              setActiveView('affiliate-invitation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCourse={() => {
              setActiveView('course');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCommunity={() => {
              if (!store.currentUser) {
                store.switchUser('usr_member_01');
              }
              setSelectedMemberTab('community');
              setActiveView('member');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* OPTION 3: DEDICATED ACADEMY & FORMATIONS PAGE */}
        {activeView === 'course' && (
          <CourseAcademyPage
            course={store.course}
            completedLessons={store.completedLessons}
            onToggleLesson={store.toggleLessonComplete}
            currentUser={store.currentUser}
            onBack={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToAffiliation={() => {
              setActiveView('affiliate-invitation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToMegaPack={() => {
              setActiveView('mega-pack');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCommunity={() => {
              if (!store.currentUser) {
                store.switchUser('usr_member_01');
              }
              setSelectedMemberTab('community');
              setActiveView('member');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLogin={store.login}
        onRegister={store.register}
        onSwitchUser={store.switchUser}
        allUsers={store.users}
      />

      <AffiliateInvitationModal
        isOpen={isAffiliateModalOpen}
        onClose={() => setIsAffiliateModalOpen(false)}
        currentUser={store.currentUser}
        onAccessGranted={() => {
          setSelectedMemberTab('catalog');
          setActiveView('member');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
