
import React, { useState } from 'react';
import { AppView } from '../types';
import { 
  Shield, 
  AlertCircle, 
  MapPin, 
  Users, 
  ChevronRight, 
  CheckCircle2,
  MessageSquare,
  Camera,
  RefreshCw,
  ExternalLink,
  Cpu,
  Workflow
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chatWithSearch } from '../services/geminiService';

const safetyData = [
  { name: '08:00', score: 98 },
  { name: '10:00', score: 95 },
  { name: '12:00', score: 92 },
  { name: '14:00', score: 94 },
  { name: '16:00', score: 97 },
  { name: '18:00', score: 99 },
];

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [liveAlert, setLiveAlert] = useState<{ text: string, links?: any[] } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLiveAlerts = async () => {
    setIsRefreshing(true);
    try {
      const result = await chatWithSearch("Provide a very brief safety update or weather warning for tourists in India today. One short sentence.");
      setLiveAlert({ text: result.text, links: result.groundingLinks });
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Alert Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-2xl flex items-start gap-4 shadow-sm transition-colors">
        <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-300">Live Safety Intelligence</h4>
            <button 
              onClick={fetchLiveAlerts} 
              disabled={isRefreshing}
              className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-600 hover:text-amber-800 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Sync with Search'}
            </button>
          </div>
          <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
            {liveAlert ? liveAlert.text : "Regional Weather Alert: Heavy Fog reported in Uttarakhand region. Drive with caution near mountain passes."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card with Blockchain Animation */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Safety Score</span>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <h3 className="text-5xl font-black text-slate-800 dark:text-white">98</h3>
            <span className="text-green-600 font-bold mb-1 tracking-tight uppercase text-xs">Excellent</span>
          </div>
          
          {/* BLOCKCHAIN ANIMATION ITEM */}
          <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-100 dark:bg-orange-500/10 rounded-xl animate-pulse"></div>
              <Workflow className="w-5 h-5 text-orange-600 animate-[spin_4s_linear_infinite]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</p>
              <p className="text-xs font-bold text-orange-600 italic">Blockchain Established • All Systems GO</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Group</span>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Family Trip '24</h3>
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">8 Online</span>
          </div>
          <p className="text-slate-400 text-sm mt-3 font-medium">Location: Taj Mahal, Agra</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Verified Identity</span>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-lg text-white">
              <span className="text-xs font-black">ID</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tighter tabular-nums">BY-8832-7721</h3>
          </div>
          <p className="text-slate-400 text-sm mt-3 font-medium">Secured on Polygon Ledger</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Safety Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2 dark:text-white">
            Real-time Safety Pulse
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={safetyData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Nearby Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black mb-6 dark:text-white">Proximity Hub</h3>
            <div className="space-y-4">
              {[
                { label: 'Tourist Police Station', distance: '0.8km', type: 'security' },
                { label: 'Apollo First Aid Center', distance: '1.2km', type: 'medical' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-white dark:group-hover:bg-slate-700 transition-all">
                      <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-700 dark:text-white">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.distance} away</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => setView(AppView.CHATBOT)}
              className="bg-orange-600 p-8 rounded-[2.5rem] text-white hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 dark:shadow-none group active:scale-95"
            >
              <MessageSquare className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-black text-lg">AI Assistant</p>
                <p className="text-[10px] text-orange-200 font-bold uppercase tracking-widest">Grounding v4.2</p>
              </div>
            </button>
            <button 
              onClick={() => setView(AppView.VISION)}
              className="bg-slate-900 p-8 rounded-[2.5rem] text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-none group active:scale-95"
            >
              <Camera className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-black text-lg">Identify</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Scanner</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
