
import React, { useState } from 'react';
import { ShieldCheck, Share2, Download, History, ExternalLink, QrCode, Check } from 'lucide-react';

const IdentityVault: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const shareUrl = "https://github-readme-stats.vercel.app";
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Bharat Yatra Verified ID',
          text: 'Check out my verified travel identity on Bharat Yatra.',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        // Temporary feedback
        setTimeout(() => setIsSharing(false), 2000);
        return;
      }
    } catch (err) {
      console.error("Sharing failed", err);
    }
    
    setTimeout(() => setIsSharing(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">Digital Identity Vault</h2>
        <p className="text-slate-500 font-medium">Secured by India Stack & Polygon L2 Blockchain</p>
      </div>

      {/* Main Card */}
      <div className="relative overflow-visible">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-100 rounded-full blur-[100px] -z-10 opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-100 rounded-full blur-[100px] -z-10 opacity-40 animate-pulse"></div>
        
        <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100/50">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 flex items-center justify-center rounded-2xl text-white font-black text-2xl italic shadow-lg">
                BY
              </div>
              <div>
                <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.2em] mb-0.5">Global Protocol</p>
                <p className="text-lg font-bold text-slate-800">Verified Travel ID</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100 text-xs font-black shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              BLOCKCHAIN VERIFIED
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mb-12">
            <div className="w-full md:w-40 h-52 bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border-4 border-white shrink-0">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="group cursor-default">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-2xl font-black text-slate-800 group-hover:text-orange-600 transition-colors">ARJUN SHARMA</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nationality</p>
                  <p className="font-bold text-slate-800">INDIAN</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expiry Date</p>
                  <p className="font-bold text-slate-800">DEC 2029</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ledger Fingerprint</p>
                <p className="text-[11px] font-mono font-bold text-slate-500 break-all bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-inner">
                  0x71C7...B751B74...01B5f6d8976F
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-10 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unique Protocol Number</p>
              <p className="text-3xl font-black text-slate-800 tracking-tighter tabular-nums">BY-8832-7721-0004</p>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 hover:scale-105 transition-transform cursor-pointer">
              <QrCode className="w-16 h-16 text-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Share Securely', icon: isSharing ? Check : Share2, onClick: handleShare, active: isSharing },
          { label: 'Download PDF', icon: Download },
          { label: 'Access History', icon: History },
          { label: 'Verify External', icon: ExternalLink },
        ].map((action, idx) => (
          <button 
            key={idx} 
            onClick={action.onClick}
            className={`p-5 rounded-[2rem] border transition-all group flex flex-col items-center gap-3 active:scale-90 ${
              action.active 
              ? 'bg-green-600 border-green-600 shadow-lg shadow-green-100' 
              : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50 shadow-sm'
            }`}
          >
            <action.icon className={`w-7 h-7 transition-colors ${
              action.active ? 'text-white' : 'text-slate-400 group-hover:text-orange-600'
            }`} />
            <span className={`text-[11px] font-black uppercase tracking-tighter ${
              action.active ? 'text-white' : 'text-slate-600 group-hover:text-orange-700'
            }`}>{action.active ? 'COPIED!' : action.label}</span>
          </button>
        ))}
      </div>

      {/* Safety Note */}
      <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
           <ShieldCheck className="w-24 h-24 text-white" />
        </div>
        <div className="flex gap-5 relative z-10">
          <div className="bg-white/20 p-3 rounded-2xl shrink-0">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="font-black text-white text-lg mb-1 tracking-tight">Zero-Knowledge Verification</h4>
            <p className="text-sm text-blue-100 font-medium leading-relaxed">
              When you share this ID, only a cryptographic proof of your identity is sent. Your sensitive Aadhaar/Passport data stays encrypted on your device and never touches our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVault;
