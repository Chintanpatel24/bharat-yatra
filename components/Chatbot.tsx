
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info, Globe, MapPin, Sparkles, ExternalLink, Trash2 } from 'lucide-react';
import { chatWithPro, chatWithSearch, chatWithMaps } from '../services/geminiService';
import { Message } from '../types';

type ChatMode = 'pro' | 'search' | 'maps';

interface ChatbotProps {
  location: { lat: number; lng: number } | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ location }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Namaste! I am your enhanced Bharat Yatra AI. Switch modes below to use Pro intelligence, Real-time Web Search, or Nearby Place Discovery.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('pro');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: "Chat cleared. How can I assist you with your travels now?", 
      timestamp: new Date() 
    }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let result;
      if (mode === 'search') {
        result = await chatWithSearch(input);
      } else if (mode === 'maps') {
        const lat = location?.lat || 28.6139; // Default to Delhi if no GPS
        const lng = location?.lng || 77.2090;
        result = await chatWithMaps(input, lat, lng);
      } else {
        // Simple history mapping for generateContent
        const history = messages.slice(-4).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        result = await chatWithPro(input, history);
      }

      const botMsg: Message = { 
        role: 'assistant', 
        content: result.text || "I'm sorry, I couldn't process that response correctly.", 
        timestamp: new Date(),
        groundingLinks: result.groundingLinks
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection lost. Please ensure your internet is active and try again.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header & Modes */}
      <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-xl">
              <Bot className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Bharat Yatra Intelligence</h3>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Active System: {mode.toUpperCase()}
              </p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => setMode('pro')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'pro' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Gemini Pro
          </button>
          <button 
            onClick={() => setMode('search')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'search' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            Search
          </button>
          <button 
            onClick={() => setMode('maps')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'maps' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Nearby
          </button>
        </div>
      </div>

      {/* Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-orange-600 text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm border ${
                msg.role === 'user' 
                ? 'bg-slate-900 text-white border-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                
                {/* Grounding Links Section */}
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Sources</p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.groundingLinks.map((link, lIdx) => {
                        const uri = link.web?.uri || link.maps?.uri;
                        const title = link.web?.title || link.maps?.title || 'External Resource';
                        if (!uri) return null;
                        return (
                          <a 
                            key={lIdx} 
                            href={uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:border-orange-200 transition-all group"
                          >
                            <span className="flex items-center gap-2 truncate">
                              {link.web ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-green-500" />}
                              <span className="truncate">{title}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-orange-500" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className={`text-[10px] mt-2 opacity-50 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                <span className="text-xs text-slate-400 font-medium">Gemini is synthesizing info...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              mode === 'pro' ? "Ask about culture or history..." : 
              mode === 'search' ? "Search for live safety alerts..." : 
              "Find nearby help or resources..."
            }
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-orange-600 p-4 rounded-2xl text-white hover:bg-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
