
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  User, 
  Users, 
  MessageSquare, 
  Camera, 
  Radio, 
  Settings, 
  Bell, 
  Menu, 
  X,
  AlertTriangle,
  Map as MapIcon,
  CreditCard
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import IdentityVault from './components/IdentityVault';
import GroupManager from './components/GroupManager';
import Chatbot from './components/Chatbot';
import VisionAI from './components/VisionAI';
import WalkieTalkie from './components/WalkieTalkie';
import SOSOverlay from './components/SOSOverlay';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: Shield },
    { id: AppView.IDENTITY, label: 'Verified ID', icon: User },
    { id: AppView.GROUPS, label: 'Groups', icon: Users },
    { id: AppView.CHATBOT, label: 'AI Assistant', icon: MessageSquare },
    { id: AppView.VISION, label: 'Vision AI', icon: Camera },
    { id: AppView.WALKIE_TALKIE, label: 'Walkie-Talkie', icon: Radio },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard setView={setCurrentView} />;
      case AppView.IDENTITY: return <IdentityVault />;
      case AppView.GROUPS: return <GroupManager />;
      case AppView.CHATBOT: return <Chatbot location={location} />;
      case AppView.VISION: return <VisionAI />;
      case AppView.WALKIE_TALKIE: return <WalkieTalkie />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Bharat Yatra</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                ? 'bg-orange-50 text-orange-600 font-semibold border border-orange-100 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setShowSOS(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            TRIGGER SOS
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar & Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-lg">Bharat Yatra</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Top Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 capitalize">
            {currentView.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-green-700">Safety System Online</span>
            </div>
            <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50 relative">
          {renderView()}
        </main>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex items-center justify-around p-3 bg-white border-t border-slate-200 pb-safe">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 ${
                currentView === item.id ? 'text-orange-600' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          <button onClick={() => setShowSOS(true)} className="p-2 bg-red-600 rounded-full text-white -mt-8 border-4 border-white shadow-xl shadow-red-200">
            <AlertTriangle className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Overlay Menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl">Menu</span>
              <button onClick={() => setSidebarOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 py-3 text-lg font-medium ${currentView === item.id ? 'text-orange-600' : 'text-slate-600'}`}
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
