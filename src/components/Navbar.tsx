import React, { useState } from 'react';
import { User, PlatformSettings } from '../types';
import { 
  Menu, X, Shield, User as UserIcon, LogOut, 
  Sparkles, ExternalLink, ChevronDown, CheckCircle
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  settings: PlatformSettings;
  activeView: 'home' | 'member' | 'admin';
  setActiveView: (view: 'home' | 'member' | 'admin') => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onOpenCheckout: () => void;
  onOpenArchitectureGuide: () => void;
  onLogout: () => void;
  onSwitchUser: (userId: string) => void;
  allUsers: User[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  settings,
  activeView,
  setActiveView,
  onOpenAuth,
  onOpenCheckout,
  onOpenArchitectureGuide,
  onLogout,
  onSwitchUser,
  allUsers
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-8">
          
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FFD700] to-[#4FC3F7] p-[1.5px] shrink-0">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center font-black text-xs text-[#FFD700] tracking-tighter">
                  MDD
                </div>
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-neutral-200 transition-colors">
                LES MILLIONNAIRES DU DIGITAL
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean single-line prose) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <button 
              onClick={() => setActiveView('home')} 
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeView === 'home' ? 'text-[#4FC3F7]' : ''}`}
            >
              Accueil
            </button>
            <a 
              href="#options" 
              onClick={(e) => {
                if (activeView !== 'home') {
                  e.preventDefault();
                  setActiveView('home');
                  setTimeout(() => {
                    document.getElementById('options')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-[#FFD700] hover:text-yellow-300 transition-colors whitespace-nowrap shrink-0"
            >
              Les 4 Pôles M.D.D.
            </a>
            <a 
              href="#systeme" 
              onClick={(e) => {
                if (activeView !== 'home') {
                  e.preventDefault();
                  setActiveView('home');
                  setTimeout(() => {
                    document.getElementById('systeme')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Le Système
            </a>
            <a 
              href="#faq" 
              onClick={(e) => {
                if (activeView !== 'home') {
                  e.preventDefault();
                  setActiveView('home');
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary Action & User Status */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-medium transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#4FC3F7]/20 text-[#4FC3F7] flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="font-semibold max-w-[120px] truncate">{currentUser.name}</span>
                  {currentUser.role === 'admin' ? (
                    <span className="text-[10px] bg-[#FFD700]/10 text-[#FFD700] px-1.5 py-0.5 rounded font-mono font-semibold">ADMIN</span>
                  ) : (
                    <span className="text-[10px] bg-[#4FC3F7]/10 text-[#4FC3F7] px-1.5 py-0.5 rounded font-mono font-semibold">MEMBRE</span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-4 py-2 border-b border-neutral-800">
                      <p className="text-xs text-neutral-400">Connecté en tant que</p>
                      <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-neutral-500 font-mono">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveView('member');
                          setAccountDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-neutral-800 transition-colors ${activeView === 'member' ? 'text-[#4FC3F7] font-bold' : 'text-neutral-300'}`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Espace Membre (Accès Direct)</span>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setActiveView('admin');
                            setAccountDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-neutral-800 transition-colors ${activeView === 'admin' ? 'text-[#FFD700] font-bold' : 'text-neutral-300'}`}
                        >
                          <Shield className="w-4 h-4 text-[#FFD700]" />
                          <span>Console Administration</span>
                        </button>
                      )}
                    </div>

                    {/* Quick Demo Account Switcher */}
                    <div className="border-t border-neutral-800 px-4 py-2">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-1.5">
                        Test Rapide :
                      </p>
                      <div className="space-y-1">
                        {allUsers.slice(0, 3).map(u => (
                          <button
                            key={u.id}
                            onClick={() => {
                              onSwitchUser(u.id);
                              setAccountDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between ${currentUser.id === u.id ? 'bg-[#4FC3F7]/10 text-[#4FC3F7]' : 'text-neutral-400 hover:text-white'}`}
                          >
                            <span className="truncate">{u.name} ({u.role})</span>
                            {currentUser.id === u.id && <CheckCircle className="w-3 h-3 text-[#4FC3F7]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-neutral-800 pt-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-neutral-800 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  Connexion
                </button>
                <button
                  onClick={onOpenCheckout}
                  className="px-4 py-2 text-xs font-bold text-black bg-[#4FC3F7] rounded-lg hover:bg-[#38bdf8] transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-[#4FC3F7]/10 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Accès Gratuit Immédiat</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={onOpenCheckout}
                className="px-2.5 py-1.5 text-[11px] font-bold text-black bg-[#4FC3F7] rounded-md whitespace-nowrap"
              >
                Rejoindre
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0A0A0A] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-2 text-sm font-medium text-neutral-300">
            <button
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-white"
            >
              Accueil
            </button>
            <a
              href="#systeme"
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="py-2 hover:text-white"
            >
              Le Système (4 Étapes)
            </a>
            <a
              href="#programme"
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="py-2 hover:text-white"
            >
              Ce Que Tu Obtiens
            </a>
            <a
              href="#faq"
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="py-2 hover:text-white"
            >
              FAQ
            </a>
            <button
              onClick={() => {
                onOpenArchitectureGuide();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#FFD700]"
            >
              Documentation Paiements & API
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="text-xs text-neutral-400">
                  Connecté : <span className="font-semibold text-white">{currentUser.name}</span> ({currentUser.role})
                </div>
                <button
                  onClick={() => {
                    setActiveView('member');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-center rounded-lg bg-neutral-800 text-white"
                >
                  Ouvrir Espace Membre
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-xs font-bold text-center rounded-lg bg-amber-500/20 text-[#FFD700] border border-amber-500/30"
                  >
                    Console Administrateur
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs text-red-400 text-center"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-xs font-semibold text-center rounded-lg bg-neutral-900 border border-neutral-800 text-white"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    onOpenCheckout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-xs font-bold text-center rounded-lg bg-[#4FC3F7] text-black"
                >
                  Rejoindre M.D.D.
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
