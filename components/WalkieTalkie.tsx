
import React, { useState, useEffect } from 'react';
import { Mic, Radio, Volume2, Users, Wifi, Activity } from 'lucide-react';

const WalkieTalkie: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [channel, setChannel] = useState('04');
  const [isReceiving, setIsReceiving] = useState(false);
  const [decibels, setDecibels] = useState<number[]>([]);

  // Simulation of audio waves
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPressed || isReceiving) {
        setDecibels(prev => {
          const newArr = [...prev, Math.random() * 60 + 20];
          return newArr.slice(-20);
        });
      } else {
        setDecibels([]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPressed, isReceiving]);

  const simulateIncoming = () => {
    if (isPressed) return;
    setIsReceiving(true);
    setTimeout(() => setIsReceiving(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Satellite PTT</h2>
        <p className="text-slate-500">Low-bandwidth voice for remote areas</p>
      </div>

      <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border-[12px] border-slate-800">
        {/* Signal Lines Design */}
        <div className="absolute top-0 inset-x-0 h-1 bg-blue-500/20"></div>
        
        {/* Display Screen */}
        <div className="bg-[#1a1c1e] p-6 rounded-2xl border border-slate-800 shadow-inner mb-8 text-[#00ff9f]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">SAT-LINK ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">E2EE</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-60 font-black uppercase mb-1">Channel</p>
              <p className="text-4xl font-black italic tracking-tighter">CH-{channel}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-60 font-black uppercase mb-1">Status</p>
              <p className="text-lg font-bold tracking-tight">
                {isPressed ? 'TRANSMITTING...' : isReceiving ? 'RECEIVING...' : 'READY'}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end gap-1 h-12 overflow-hidden">
            {decibels.map((d, i) => (
              <div key={i} className="flex-1 bg-current opacity-60 rounded-full" style={{ height: `${d}%` }}></div>
            ))}
            {decibels.length === 0 && Array.from({length: 20}).map((_, i) => (
               <div key={i} className="flex-1 bg-current opacity-10 h-1 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <button 
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all shadow-2xl ${
                isPressed 
                ? 'bg-red-600 scale-95 shadow-red-900/50' 
                : 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:scale-95 shadow-black/50'
              }`}
            >
              <div className="p-4 bg-black/20 rounded-full mb-1">
                <Mic className={`w-12 h-12 text-white ${isPressed ? 'animate-pulse' : ''}`} />
              </div>
              <span className="text-[10px] font-black tracking-widest text-white/70 uppercase">PUSH TO TALK</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={simulateIncoming}
              className="bg-slate-800 p-4 rounded-2xl flex items-center justify-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <Volume2 className="w-5 h-5" />
              <span className="font-bold text-sm">Monitor</span>
            </button>
            <button className="bg-slate-800 p-4 rounded-2xl flex items-center justify-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700">
              <Users className="w-5 h-5" />
              <span className="font-bold text-sm">Group PTT</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
        <div className="flex gap-4 items-start">
          <Radio className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800">Satellite Fallback Mode</h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              When standard cellular networks fail, Bharat Yatra automatically switches to low-bitrate packetized audio via GSAT series satellites. No separate hardware required for emergency text/voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkieTalkie;
