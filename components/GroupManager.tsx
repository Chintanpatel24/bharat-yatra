
import React, { useState } from 'react';
import { Users, MapPin, Phone, MessageCircle, MoreVertical, Plus, HeartPulse, X, Search, Check, Globe } from 'lucide-react';
import { GroupMember } from '../types';

const initialMembers: GroupMember[] = [
  { id: '1', name: 'Arjun (Me)', status: 'active', lastSeen: 'Just now', location: { lat: 27.1751, lng: 78.0421 } },
  { id: '2', name: 'Sneha', status: 'active', lastSeen: '2m ago', location: { lat: 27.1752, lng: 78.0422 } },
  { id: '3', name: 'Amit', status: 'away', lastSeen: '15m ago', location: { lat: 27.1748, lng: 78.0418 } },
  { id: '4', name: 'Rajesh', status: 'emergency', lastSeen: '1m ago', location: { lat: 27.1755, lng: 78.0425 } },
];

const GroupManager: React.FC = () => {
  const [members, setMembers] = useState<GroupMember[]>(initialMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      const newMember: GroupMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: newMemberName,
        status: 'active',
        lastSeen: 'Just joined',
        location: { lat: 27.1751, lng: 78.0421 }
      };
      setMembers([...members, newMember]);
      setNewMemberName('');
      setIsAdding(false);
      setShowAddModal(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Family Trip '24</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{members.length} Members • Global Sat-Tracking Enabled</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none bg-orange-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 dark:shadow-none flex items-center justify-center gap-3 active:scale-95"
          >
            <Plus className="w-6 h-6" />
            Invite Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Satellite Status</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {members.map((member) => (
              <div key={member.id} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner border-2 border-white dark:border-slate-700">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 ${
                    member.status === 'active' ? 'bg-green-500' : 
                    member.status === 'away' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-800 dark:text-white truncate">{member.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Seen {member.lastSeen}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl hover:text-orange-600 transition-all"><Phone className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Map Simulation */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[3.5rem] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[500px] relative group">
          <div className="absolute inset-0 bg-slate-900 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
             <div className="w-[60%] h-[60%] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>

          <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10 bg-slate-900/50 backdrop-blur-md">
            <h3 className="font-black text-white text-sm tracking-widest uppercase">Live Vector Map • GR-22</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-green-500 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Synchronized
            </div>
          </div>

          <div className="flex-1 relative p-10">
            {/* Topographic Lines Style Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]"></div>
            
            {members.map((member, i) => (
              <div key={member.id} className="absolute transition-all duration-1000" style={{
                top: `${25 + (i * 15)}%`,
                left: `${30 + (i * 12)}%`
              }}>
                <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                  <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden relative z-20 transition-transform hover:scale-125 cursor-pointer">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} alt={member.name} />
                  </div>
                  <div className={`w-3 h-3 rotate-45 -mt-1.5 shadow-xl relative z-10 ${member.status === 'emergency' ? 'bg-red-500' : 'bg-white'}`}></div>
                  <div className="mt-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">{member.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-8 right-8 space-y-3">
              <button className="bg-white text-slate-900 p-4 rounded-3xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                <Globe className="w-4 h-4" />
                Sat View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManager;
