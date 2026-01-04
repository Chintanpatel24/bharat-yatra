
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
  Image as ImageIcon
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSOS, setShowSOS] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Location error", err)
      );
    }
  }, []);

  // Primary navigation (Bottom Bar / Main Sidebar)
  const primaryNav = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.IDENTITY, label: 'Verified', icon: User },
    // SOS central in mobile
    { id: AppView.WALKIE_TALKIE, label: 'Walkie-Talkie', icon: Radio },
    { id: AppView.CHATBOT, label: 'AI Chat', icon: MessageSquare },
  ];

  // Overflow navigation (In the "Three Lines" menu)
  const overflowNav = [
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
      case AppView.SETTINGS: return <Settings />;
      case AppView.GALLERY: return <Gallery />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* PERSISTENT SIDEBAR - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 z-30 shadow-sm shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-100">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-800">Bharat Yatra</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          <p className="px-5 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Hub</p>
          {primaryNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                currentView === item.id 
                ? 'bg-orange-50 text-orange-600 font-bold border border-orange-100 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-active:scale-90 ${currentView === item.id ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
                ? 'bg-slate-100 text-slate-900 font-bold border border-slate-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className="text-[15px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-white">
          <button 
            onClick={() => setShowSOS(true)}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black py-4.5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-100 transition-all"
          >
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            TRIGGER SOS
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 lg:px-10 py-5 bg-white border-b border-slate-100 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-orange-600 lg:hidden" />
            <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
              {currentView.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors shadow-sm active:scale-90"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50 relative scroll-smooth">
          <div className="max-w-7xl mx-auto pb-32 lg:pb-0">
            {renderView()}
          </div>
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-40 h-20 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] shadow-2xl flex items-center px-4">
          <div className="flex-1 flex justify-around">
            {primaryNav.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`p-3 rounded-2xl transition-all active:scale-75 ${
                  currentView === item.id ? 'text-orange-600 bg-orange-50' : 'text-slate-400'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="flex justify-center -mt-10 mx-4 shrink-0">
            <button 
              onClick={() => setShowSOS(true)} 
              className="w-20 h-20 bg-red-600 rounded-full text-white flex items-center justify-center shadow-2xl shadow-red-200 border-8 border-white active:scale-90 transition-all animate-pulse"
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
                  currentView === item.id ? 'text-orange-600 bg-orange-50' : 'text-slate-400'
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
          <div className="w-80 h-full bg-white shadow-2xl p-8 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-lg tracking-tight">OPTIONS</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-full text-slate-400">
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
                    currentView === item.id ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
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
