
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  User, 
  Users, 
  MessageSquare, 
  Camera, 
  Radio, 
  Settings as SettingsIcon, 
  Bell, 
  Menu, 
  X,
  AlertTriangle,
  CircleUser,
  LayoutDashboard,
  Image as ImageIcon,
  Radar,
  Moon,
  Sun
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import IdentityVault from './components/IdentityVault';
import GroupManager from './components/GroupManager';
import Chatbot from './components/Chatbot';
import VisionAI from './components/VisionAI';
import WalkieTalkie from './components/WalkieTalkie';
import SOSOverlay from './components/SOSOverlay';
import Settings from './components/Settings';
import Gallery from './components/Gallery';
import GeoRadar from './components/GeoRadar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  // Changed default state to true for dark mode initialization
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Location error", err)
      );
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const primaryNav = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.IDENTITY, label: 'Verified ID', icon: User },
    { id: AppView.WALKIE_TALKIE, label: 'Walkie-Talkie', icon: Radio },
    { id: AppView.CHATBOT, label: 'AI Assistant', icon: MessageSquare },
  ];

  const overflowNav = [
    { id: AppView.RADAR, label: 'Geo-Radar', icon: Radar },
    { id: AppView.GALLERY, label: 'Gallery', icon: ImageIcon },
    { id: AppView.GROUPS, label: 'Groups', icon: Users },
    { id: AppView.VISION, label: 'Vision AI', icon: Camera },
    { id: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard setView={setCurrentView} />;
      case AppView.IDENTITY: return <IdentityVault />;
      case AppView.GROUPS: return <GroupManager />;
      case AppView.CHATBOT: return <Chatbot location={location} />;
      case AppView.VISION: return <VisionAI />;
      case AppView.WALKIE_TALKIE: return <WalkieTalkie />;
      case AppView.SETTINGS: return <Settings isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      case AppView.GALLERY: return <Gallery />;
      case AppView.RADAR: return <GeoRadar />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* PERSISTENT SIDEBAR - Desktop */}
      <aside className={`hidden lg:flex flex-col w-72 border-r z-30 shadow-sm shrink-0 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-8 flex items-center gap-3">
          <div className="bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-100 dark:shadow-none">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className={`font-extrabold text-2xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Bharat Yatra</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          <p className="px-5 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Hub</p>
          {primaryNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                currentView === item.id 
                ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-100 dark:border-orange-500/20 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-active:scale-90 ${currentView === item.id ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="text-[15px]">{item.label}</span>
            </button>
          ))}

          <p className="px-5 mt-8 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resources</p>
          {overflowNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                currentView === item.id 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`} />
              <span className="text-[15px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={`p-6 border-t transition-colors ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <button 
            onClick={() => setShowSOS(true)}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black py-4.5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-100 dark:shadow-none transition-all"
          >
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            TRIGGER SOS
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className={`sticky top-0 z-20 flex items-center justify-between px-6 lg:px-10 py-5 border-b shrink-0 transition-all ${isDarkMode ? 'bg-slate-900/80 border-slate-800 backdrop-blur-md' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-orange-600 lg:hidden" />
            <h2 className={`text-xl font-bold capitalize tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {currentView.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle - Positioned to the left of the Menu */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-3 rounded-2xl transition-all active:scale-90 ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-sm'}`}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`p-3 rounded-2xl transition-all active:scale-90 ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-sm'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto p-4 lg:p-10 relative scroll-smooth transition-all ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto pb-32 lg:pb-0">
            {renderView()}
          </div>
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className={`lg:hidden fixed bottom-6 left-6 right-6 z-40 h-20 backdrop-blur-xl border rounded-[2.5rem] shadow-2xl flex items-center px-4 transition-all ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-100'}`}>
          <div className="flex-1 flex justify-around">
            {primaryNav.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`p-3 rounded-2xl transition-all active:scale-75 ${
                  currentView === item.id ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/20' : 'text-slate-400'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="flex justify-center -mt-10 mx-4 shrink-0">
            <button 
              onClick={() => setShowSOS(true)} 
              className="w-20 h-20 bg-red-600 rounded-full text-white flex items-center justify-center shadow-2xl shadow-red-200 dark:shadow-red-950/50 border-8 border-white dark:border-slate-900 active:scale-90 transition-all animate-pulse"
            >
              <AlertTriangle className="w-10 h-10" />
            </button>
          </div>

          <div className="flex-1 flex justify-around">
            {primaryNav.slice(2, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`p-3 rounded-2xl transition-all active:scale-75 ${
                  currentView === item.id ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/20' : 'text-slate-400'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* OVERFLOW MENU DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex justify-end" onClick={() => setIsMenuOpen(false)}>
          <div className={`w-80 h-full shadow-2xl p-8 flex flex-col transition-all ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <span className={`font-black text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>OPTIONS</span>
              <button onClick={() => setIsMenuOpen(false)} className={`p-2.5 rounded-full text-slate-400 transition-all ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-3 overflow-y-auto">
              <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">More Tools</p>
              {overflowNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setIsMenuOpen(false); }}
                  className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-[16px] font-bold transition-all ${
                    currentView === item.id ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {showSOS && <SOSOverlay onClose={() => setShowSOS(false)} />}
    </div>
  );
};

export default App;
