
import React, { useState } from 'react';
import { ShieldCheck, Share2, Download, History, ExternalLink, QrCode, Check, CreditCard, Loader2, Fingerprint, Cpu, ArrowRight } from 'lucide-react';

const IdentityVault: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<'view' | 'verify'>('view');
  
  // Distinct state for each document type
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [license, setLicense] = useState('');
  
  const [verifiedId, setVerifiedId] = useState('BY-8832-7721-0004');
  const [status, setStatus] = useState('Active');

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
      }
    } catch (err) {
      await navigator.clipboard.writeText(shareUrl);
    } finally {
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  const startVerification = (type: 'Aadhaar' | 'PAN' | 'License') => {
    const val = type === 'Aadhaar' ? aadhar : type === 'PAN' ? pan : license;
    if (!val) return;

    setIsVerifying(true);
    // Simulate Blockchain Minting Process
    setTimeout(() => {
      // Generate a unique ID that looks blockchain-connected
      const prefix = type.toUpperCase().slice(0, 3);
      const hashPart = Math.random().toString(16).substring(2, 6).toUpperCase();
      const newId = `BY-${prefix}-${hashPart}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setVerifiedId(newId);
      setIsVerifying(false);
      setStep('view');
      setStatus('Minted on Blockchain');
      // Clear inputs
      setAadhar('');
      setPan('');
      setLicense('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">Digital Identity Vault</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium italic">Verified by AI & Secured by Blockchain Protocol</p>
      </div>

      {step === 'view' ? (
        <div className="relative overflow-visible group">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-100 dark:bg-orange-500/10 rounded-full blur-[100px] -z-10 opacity-40 animate-pulse"></div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 p-10 rounded-[3rem] shadow-2xl shadow-orange-100/50 dark:shadow-none transition-all group-hover:scale-[1.01]">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 dark:bg-slate-800 flex items-center justify-center rounded-2xl text-white font-black text-2xl italic shadow-lg">
                  BY
                </div>
                <div>
                  <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.2em] mb-0.5">Global Protocol</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">Verified Travel ID</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full border border-green-100 dark:border-green-500/20 text-xs font-black shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  {status.toUpperCase()}
                </div>
                <button 
                  onClick={() => setStep('verify')}
                  className="text-[10px] font-black text-slate-400 hover:text-orange-600 underline uppercase tracking-widest"
                >
                  Update Records
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mb-12">
              <div className="w-full md:w-40 h-52 bg-slate-100 dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-inner border-4 border-white dark:border-slate-700 shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-white">ARJUN SHARMA</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nationality</p>
                    <p className="font-bold text-slate-800 dark:text-white">INDIAN</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="font-bold text-green-600">VERIFIED</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Cpu className="w-3 h-3 text-orange-500" /> Blockchain Hash
                   </p>
                   <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 break-all leading-tight">
                    0x71C7...B751B74...01B5f6d8976F
                   </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unique Blockchain Protocol Number</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter tabular-nums">{verifiedId}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-transform group-hover:rotate-6">
                <QrCode className="w-16 h-16 text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">Identity Verification</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Update your digital ledger with authentic Indian documentation.</p>
          </div>

          <div className="space-y-6">
            {/* Aadhaar Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group-focus-within:text-orange-500 transition-colors">Aadhaar Card Number</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                  placeholder="1234 5678 9012"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-white font-bold"
                />
                <button 
                  onClick={() => startVerification('Aadhaar')}
                  disabled={!aadhar || isVerifying}
                  className="bg-orange-600 text-white px-6 rounded-2xl font-black hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-30 flex items-center gap-2"
                >
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  Verify
                </button>
              </div>
            </div>

            {/* PAN Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group-focus-within:text-blue-500 transition-colors">PAN Card Number</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  placeholder="ABCDE1234F"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-white font-bold uppercase"
                />
                <button 
                  onClick={() => startVerification('PAN')}
                  disabled={!pan || isVerifying}
                  className="bg-blue-600 text-white px-6 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-30 flex items-center gap-2"
                >
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  Verify
                </button>
              </div>
            </div>

            {/* License Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group-focus-within:text-green-500 transition-colors">Vehicle License Number</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="DL14 20110012345"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-slate-800 dark:text-white font-bold uppercase"
                />
                <button 
                  onClick={() => startVerification('License')}
                  disabled={!license || isVerifying}
                  className="bg-green-600 text-white px-6 rounded-2xl font-black hover:bg-green-700 transition-all active:scale-95 disabled:opacity-30 flex items-center gap-2"
                >
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  Verify
                </button>
              </div>
            </div>
          </div>

          {isVerifying && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 bg-orange-50 dark:bg-orange-500/5 rounded-[2rem] border border-orange-100 dark:border-orange-500/10 animate-pulse">
              <div className="relative">
                 <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
                 <Cpu className="w-12 h-12 text-orange-600 relative z-10" />
              </div>
              <div className="text-center">
                <p className="font-black text-orange-900 dark:text-orange-300">BLOCKCHAIN MINTING IN PROGRESS</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] mt-1">AI Protocol Establishment Confirmed</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setStep('view')}
            className="w-full py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-200 transition-all"
          >
            Go Back to Vault
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'share', label: 'Share ID', icon: isSharing ? Check : Share2, onClick: handleShare, active: isSharing },
          { id: 'download', label: 'PDF Copy', icon: Download },
          { id: 'history', label: 'Log Activity', icon: History },
          { id: 'verify', label: 'Scan Link', icon: ExternalLink },
        ].map((action, idx) => (
          <button 
            key={idx} 
            onClick={action.onClick}
            className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-3 active:scale-90 ${
              action.active 
              ? 'bg-green-600 border-green-600 shadow-xl' 
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30'
            }`}
          >
            <action.icon className={`w-6 h-6 ${action.active ? 'text-white' : 'text-slate-400 group-hover:text-orange-600'}`} />
            <span className={`text-[10px] font-black uppercase tracking-tighter ${action.active ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdentityVault;
