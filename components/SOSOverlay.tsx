
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Shield, MapPin, Loader2, PhoneCall } from 'lucide-react';

interface SOSOverlayProps {
  onClose: () => void;
}

const SOSOverlay: React.FC<SOSOverlayProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !isTriggered) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isTriggered) {
      setIsTriggered(true);
    }
  }, [countdown, isTriggered]);

  const cancel = () => {
    if (!isTriggered) onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="absolute top-8 right-8">
        {!isTriggered && (
          <button onClick={cancel} className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors">
            <X className="w-8 h-8" />
          </button>
        )}
      </div>

      {!isTriggered ? (
        <div className="space-y-8 animate-in zoom-in duration-300">
          <div className="relative">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center animate-ping absolute inset-0"></div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center relative shadow-2xl">
              <span className="text-7xl font-black text-red-600">{countdown}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">TRIGGERING SOS</h2>
            <p className="text-xl font-medium opacity-80 max-w-sm mx-auto">
              Alerting authorities, local hospitals, and your travel group in {countdown} seconds.
            </p>
          </div>

          <button 
            onClick={cancel}
            className="bg-white text-red-600 px-12 py-6 rounded-3xl font-black text-2xl hover:bg-slate-100 transition-all active:scale-95 shadow-2xl"
          >
            CANCEL EMERGENCY
          </button>
        </div>
      ) : (
        <div className="space-y-12 max-w-lg w-full">
          <div className="bg-white/10 p-12 rounded-[3rem] backdrop-blur-xl border border-white/20 space-y-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-full shadow-lg">
                <AlertTriangle className="w-16 h-16 text-red-600 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black">SOS BROADCASTING</h2>
              <p className="opacity-90 font-medium">Authorities have been notified.</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Tourist Police Agra', status: 'En route', time: '8 mins' },
                { label: 'Hospital Emergency', status: 'Notified', time: '--' },
                { label: 'Travel Group', status: 'Tracking', time: 'Active' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="text-left">
                    <p className="text-xs font-black uppercase opacity-60 tracking-widest">{item.label}</p>
                    <p className="font-bold">{item.status}</p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-black">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white rounded-2xl flex items-center gap-4 text-slate-800">
               <div className="bg-green-100 p-2 rounded-xl">
                  <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
               </div>
               <div className="text-left">
                  <p className="text-xs font-black text-slate-400 uppercase">Live Location</p>
                  <p className="text-sm font-bold truncate">27.1751° N, 78.0421° E</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <button className="bg-white text-red-600 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl">
               <PhoneCall className="w-6 h-6" />
               DIRECT CALL POLICE
             </button>
             <button 
              onClick={onClose}
              className="bg-transparent border-2 border-white/30 py-6 rounded-3xl font-black text-xl hover:bg-white/10 transition-colors"
             >
               DISMISS
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSOverlay;
