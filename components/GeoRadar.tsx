
import React from 'react';
import { Radar, ShieldAlert, Navigation, CircleDot } from 'lucide-react';

const GeoRadar: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Geo-Fencing Radar</h2>
        <p className="text-slate-500 font-medium">Real-time regional safety tier mapping</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Radar Visualization */}
        <div className="lg:col-span-2 relative flex items-center justify-center p-10 bg-slate-900 rounded-[3rem] shadow-2xl border-[12px] border-slate-800 overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,#3b82f6_1px,transparent_1px)] bg-[length:30px_30px]"></div>
          </div>
          
          {/* Radar Circles */}
          <div className="relative w-80 h-80 rounded-full border border-green-500/30 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full border border-yellow-500/30 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-red-500/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
              </div>
            </div>
            
            {/* Radar Sweep */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-transparent animate-[spin_4s_linear_infinite]"></div>
            
            {/* Mapped Dotted Locations */}
            <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-900/50"></div>
            <div className="absolute top-[60%] right-[10%] w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-900/50"></div>
            <div className="absolute bottom-[25%] left-[15%] w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-900/50"></div>
          </div>
          
          <div className="absolute bottom-8 left-8 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            GIS LINK: ACTIVE • SAT: 08
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-green-200 transition-all">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center">
              <CircleDot className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-black text-slate-800 dark:text-white text-sm">Zone Green</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Safe Passage</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-yellow-200 transition-all">
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="font-black text-slate-800 dark:text-white text-sm">Zone Yellow</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Caution Advised</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-red-200 transition-all">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="font-black text-slate-800 dark:text-white text-sm">Zone Red</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Restricted Entry</p>
            </div>
          </div>

          <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white p-6 rounded-3xl font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all mt-4">
            <Navigation className="w-5 h-5" />
            OPTIMIZE TRAVEL PATH
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoRadar;
