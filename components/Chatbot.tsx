
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info, Globe, MapPin, Sparkles, ExternalLink, Trash2, AlertCircle, ChevronRight } from 'lucide-react';
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
      content: "Namaste! I am your enhanced Bharat Yatra AI. \n\nI can help you with:\n• Cultural landmarks and history (Pro Mode)\n• Real-time safety and weather alerts (Search Mode)\n• Finding nearby essential services (Nearby Mode)\n\nWhat can I assist you with today?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('pro');
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const clearChat = () => {
    if (confirm("Clear all messages?")) {
      setMessages([{ 
        role: 'assistant', 
        content: "Chat history cleared. Select a mode above to start a new conversation.", 
        timestamp: new Date() 
      }]);
      setError(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setError(null);
    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let result;
      if (mode === 'search') {
        result = await chatWithSearch(currentInput);
      } else if (mode === 'maps') {
        const lat = location?.lat || 28.6139; // Default to Delhi if no GPS
        const lng = location?.lng || 77.2090;
        result = await chatWithMaps(currentInput, lat, lng);
      } else {
        // Construct basic history from messages state
        const history = messages.slice(-6).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        result = await chatWithPro(currentInput, history);
      }

      const botMsg: Message = { 
        role: 'assistant', 
        content: result.text || "I was unable to process that. Please try rephrasing your request.", 
        timestamp: new Date(),
        groundingLinks: result.groundingLinks
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setError("AI core is temporarily unavailable. Please try again in a few seconds.");
      // Keep the user message but don't clear the input if it fails so they can retry
      setInput(currentInput);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)] flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-300">
      {/* Header & Modes */}
      <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-100">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg tracking-tight">Bharat Yatra Intelligence</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-green-600 font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
                <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 bg-slate-100 rounded-full">v3.5 PRO</span>
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
            title="Clear Chat History"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/80 rounded-[1.5rem] border border-slate-200/50">
          <button 
            onClick={() => setMode('pro')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'pro' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deep</span> Pro
          </button>
          <button 
            onClick={() => setMode('search')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'search' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live</span> Search
          </button>
          <button 
            onClick={() => setMode('maps')}
            className={`flex items-center justify-center gap-2 py-3 rounded-[1rem] text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'maps' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nearby</span> Help
          </button>
        </div>
      </div>

      {/* Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-slate-50/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md transition-transform active:scale-95 ${
                msg.role === 'user' ? 'bg-slate-200 border border-slate-300' : 'bg-orange-600 text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`group relative p-5 rounded-[2rem] shadow-sm border transition-all ${
                msg.role === 'user' 
                ? 'bg-slate-900 text-white border-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 border-slate-100 rounded-tl-none hover:shadow-md'
              }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ExternalLink className="w-3 h-3" />
                       Verified Knowledge Sources
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.groundingLinks.map((link, lIdx) => {
                        const uri = link.web?.uri || link.maps?.uri;
                        const title = link.web?.title || link.maps?.title || 'Resource Link';
                        if (!uri) return null;
                        return (
                          <a 
                            key={lIdx} 
                            href={uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-bold text-slate-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all group/link"
                          >
                            <span className="flex items-center gap-3 truncate">
                              {link.web ? <Globe className="w-4 h-4 text-blue-500" /> : <MapPin className="w-4 h-4 text-green-500" />}
                              <span className="truncate">{title}</span>
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover/link:text-orange-400 group-hover/link:translate-x-1 transition-all" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className={`text-[10px] mt-3 opacity-40 font-black uppercase tracking-tighter ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-100 px-6 py-4 rounded-[1.5rem] flex items-center gap-3 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Generating Insight...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center p-4">
            <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl flex items-center gap-3 border border-red-100 shadow-sm">
               <AlertCircle className="w-5 h-5" />
               <span className="text-sm font-bold">{error}</span>
               <button onClick={handleSend} className="text-xs underline font-black ml-2 hover:text-red-800">RETRY</button>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 lg:p-8 bg-white border-t border-slate-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                mode === 'pro' ? "Ask deep questions about landmarks..." : 
                mode === 'search' ? "Query for live safety & weather..." : 
                "Search for nearby hospitals or ATMs..."
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-4.5 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-[15px] font-medium shadow-inner resize-none overflow-y-auto min-h-[58px]"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-[58px] w-[58px] bg-orange-600 rounded-2xl text-white hover:bg-orange-700 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none transition-all shadow-xl shadow-orange-200 flex items-center justify-center shrink-0 active:scale-[0.85]"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-300 mt-4 font-bold uppercase tracking-[0.2em]">
          Bharat Yatra AI Assistant • Privacy Protected Local Processing
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
