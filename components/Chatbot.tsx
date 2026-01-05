
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Globe, MapPin, Sparkles, ExternalLink, Trash2 } from 'lucide-react';
import { chatWithPro, chatWithSearch, chatWithMaps } from '../services/geminiService';
import { Message } from '../types';

type ChatMode = 'pro' | 'search' | 'maps';

interface ChatbotProps {
  location: { lat: number; lng: number } | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ location }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Namaste. I am the Bharat Yatra travel assistant. Currently initializing internal travel protocols...", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('pro');
  const [turnCount, setTurnCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMsg: Message = { role: 'user', content: currentInput, timestamp: new Date() };
    
    // Clear field immediately
    setInput('');
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      let responseContent = '';
      let links = undefined;

      // Mock sequence for initial turns as requested
      if (turnCount === 0) {
        await new Promise(r => setTimeout(r, 1200));
        responseContent = "SYSTEM ERROR: Primary travel server is currently not available. Establishing fallback node...";
      } else if (turnCount === 1) {
        await new Promise(r => setTimeout(r, 1500));
        responseContent = "ERROR: The backend for Bharat Chatbot is not fully established yet. Please contact support or try in 5 minutes.";
      } else if (turnCount === 2) {
        await new Promise(r => setTimeout(r, 1500));
        responseContent = "LOG: Connection to national travel grid failed. Retrying secure synchronization with Gemini brain...";
      } else {
        // Real Gemini takeover afterTurn 3
        let result;
        if (mode === 'search') {
          result = await chatWithSearch(currentInput);
        } else if (mode === 'maps') {
          const lat = location?.lat || 28.6139;
          const lng = location?.lng || 77.2090;
          result = await chatWithMaps(currentInput, lat, lng);
        } else {
          const history = messages.slice(-6).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));
          result = await chatWithPro(currentInput, history);
        }
        responseContent = result.text || "I am currently unable to process that specific Indian travel request.";
        links = result.groundingLinks;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseContent, 
        timestamp: new Date(),
        groundingLinks: links
      }]);
      setTurnCount(prev => prev + 1);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "CRITICAL: Connection synchronization error. Please check your data roaming status.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)] flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-xl tracking-tight">Bharat Intel Engine</h3>
              <p className="flex items-center gap-2 text-[10px] text-green-500 font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Connected to National Grid
              </p>
            </div>
          </div>
          <button onClick={() => { setMessages([messages[0]]); setTurnCount(0); }} className="p-3 text-slate-300 hover:text-red-500 rounded-2xl transition-all">
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-2 bg-slate-100 dark:bg-slate-800 rounded-[2rem]">
          {['pro', 'search', 'maps'].map((m) => (
            <button 
              key={m}
              onClick={() => setMode(m as any)}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {m === 'pro' && <Sparkles className="w-4 h-4" />}
              {m === 'search' && <Globe className="w-4 h-4" />}
              {m === 'maps' && <MapPin className="w-4 h-4" />}
              {m}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 bg-slate-50/20 dark:bg-slate-950/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-900 text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-6 h-6 text-slate-500" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={`p-6 rounded-[2.5rem] shadow-sm border ${
                msg.role === 'user' 
                ? 'bg-orange-600 text-white border-orange-500 rounded-tr-none' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-100 dark:border-slate-800 rounded-tl-none'
              }`}>
                <p className={`text-[15px] leading-relaxed font-medium ${msg.content.includes('ERROR') || msg.content.includes('LOG') ? 'font-mono text-red-500 dark:text-red-400' : ''}`}>
                  {msg.content}
                </p>
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingLinks.map((link, lIdx) => {
                        const uri = link.web?.uri || link.maps?.uri;
                        if (!uri) return null;
                        return (
                          <a 
                            key={lIdx} 
                            href={uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.web?.title || link.maps?.title || 'Link'}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm w-fit">
            <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Bharat Ledger...</span>
          </div>
        )}
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto flex items-end gap-4">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Describe your travel query..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] px-8 py-5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-white font-medium resize-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-[64px] w-[64px] bg-orange-600 rounded-3xl text-white hover:bg-orange-700 disabled:opacity-50 transition-all shadow-2xl shadow-orange-100 dark:shadow-none flex items-center justify-center active:scale-90"
          >
            <Send className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
