
import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  Shield, 
  Globe, 
  Smartphone, 
  LogOut, 
  ChevronRight, 
  Lock, 
  Fingerprint,
  Moon,
  Volume2
} from 'lucide-react';

const Settings: React.FC = () => {
  const [toggles, setToggles] = useState({
    notifications: true,
    location: true,
    satellite: false,
    analytics: true,
    darkMode: false,
    biometrics: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Safety & Privacy',
      items: [
        { id: 'location', label: 'Real-time Tracking', icon: MapPin, type: 'toggle', desc: 'Allow groups to see your live position' },
        { id: 'satellite', label: 'Satellite Fallback', icon: Globe, type: 'toggle', desc: 'Enable emergency SMS via L-band' },
        { id: 'biometrics', label: 'Biometric Access', icon: Fingerprint, type: 'toggle', desc: 'Use FaceID for Identity Vault' },
      ]
    },
    {
      title: 'App Experience',
      items: [
        { id: 'notifications', label: 'Emergency Alerts', icon: Bell, type: 'toggle', desc: 'High-priority regional safety pings' },
        { id: 'darkMode', label: 'Dark Mode', icon: Moon, type: 'toggle', desc: 'Optimized for night visibility' },
        { id: 'volume', label: 'PTT Volume', icon: Volume2, type: 'link', desc: 'Manage walkie-talkie gain' },
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-[80px] opacity-30"></div>
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-orange-500 to-red-500 border-4 border-white shadow-xl flex items-center justify-center shrink-0">
           <span className="text-3xl font-black text-white">AS</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black text-slate-800">Arjun Sharma</h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-3">Premium Safety Member</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <span className="px-3 py-1.5 bg-green-50 text-green-700 text-[10px] font-black rounded-xl border border-green-100">KYC VERIFIED</span>
             <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-xl border border-blue-100">BLOCKCHAIN ID ACTIVE</span>
          </div>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">{section.title}</h4>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              {section.items.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group ${i !== section.items.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-white transition-colors group-hover:shadow-sm">
                       <item.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  
                  {item.type === 'toggle' ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggle(item.id as any); }}
                      className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${toggles[item.id as keyof typeof toggles] ? 'bg-orange-500' : 'bg-slate-200'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${toggles[item.id as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <button className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-600 font-black rounded-[2.5rem] border border-red-100 hover:bg-red-600 hover:text-white transition-all group active:scale-[0.98]">
           <LogOut className="w-6 h-6 group-hover:rotate-12 transition-transform" />
           LOG OUT FROM DEVICE
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">Version 4.2.0 (Alpha) • Bharat Yatra Safety Protocol</p>
      </div>
    </div>
  );
};

export default Settings;
