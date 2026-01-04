
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
  CircleUser
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
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          {navItems.map((item) => (
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
        {/* PERSISTENT HEADER */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 lg:px-10 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <Shield className="w-7 h-7 text-orange-600" />
            <span className="font-black text-xl tracking-tighter">BHARAT YATRA</span>
          </div>

          <h2 className="hidden lg:block text-xl font-bold text-slate-800 capitalize tracking-tight">
            {currentView.replace('-', ' ')}
          </h2>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-green-700 tracking-wide uppercase">System Secured</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-600 transition-colors relative">
                <Bell className="w-5.5 h-5.5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <button 
                onClick={() => setCurrentView(AppView.SETTINGS)}
                className="group flex items-center gap-2 p-1 pr-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-red-400 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                   <CircleUser className="w-full h-full text-white/80" />
                </div>
                <span className="hidden md:block text-sm font-bold text-slate-700">Arjun Sharma</span>
              </button>

              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50 relative scroll-smooth">
          <div className="max-w-7xl mx-auto pb-24 lg:pb-0">
            {renderView()}
          </div>
        </main>

        {/* PERSISTENT MOBILE NAVIGATION */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-3 bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe shadow-2xl">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex-1 p-2 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-90 ${
                currentView === item.id ? 'text-orange-600 bg-orange-50/50' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          <div className="flex-1 flex justify-center -mt-12">
            <button 
              onClick={() => setShowSOS(true)} 
              className="w-16 h-16 bg-red-600 rounded-full text-white flex items-center justify-center shadow-2xl shadow-red-300 border-4 border-white active:scale-90 transition-all"
            >
              <AlertTriangle className="w-8 h-8" />
            </button>
          </div>
          {navItems.slice(4, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex-1 p-2 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-90 ${
                currentView === item.id ? 'text-orange-600 bg-orange-50/50' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-600" />
                <span className="font-black text-xl">NAVIGATION</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-400"><X /></button>
            </div>
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-5 px-6 py-4.5 rounded-2xl text-[16px] font-bold transition-all ${currentView === item.id ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="pt-6 border-t border-slate-100">
               <button 
                onClick={() => { setShowSOS(true); setSidebarOpen(false); }}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-center shadow-lg shadow-red-100"
               >
                 EMERGENCY SOS
               </button>
            </div>
          </div>
        </div>
      )}

      {showSOS && <SOSOverlay onClose={() => setShowSOS(false)} />}
    </div>
  );
};

export default App;
