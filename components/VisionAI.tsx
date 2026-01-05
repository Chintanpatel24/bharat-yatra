
import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Landmark, History, Search, Loader2 } from 'lucide-react';
import { analyzeLandmark } from '../services/geminiService';
import { LandmarkAnalysis } from '../types';

const VisionAI: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<LandmarkAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        processImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeLandmark(base64);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Monument Recognition AI</h2>
        <p className="text-slate-500">Scan any landmark in India for instant facts and safety tips</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera / Upload Section */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-8 border-white group">
            {!image ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
                <div className="bg-orange-100 p-6 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-12 h-12 text-orange-600" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg">Point your camera</h4>
                <p className="text-slate-400 text-sm mb-6">Capture a clear photo of the monument or upload an existing photo.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-xl"
                >
                  Launch Scanner
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <>
                <img src={image} alt="Target" className="w-full h-full object-cover" />
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl hover:bg-white/40 transition-colors text-white"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mb-4" />
                    <p className="font-bold animate-pulse">Analyzing Artifact...</p>
                    <p className="text-xs opacity-75 mt-2">Checking Global Database</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!result && !isAnalyzing ? (
            <div className="h-full flex flex-col justify-center p-8 bg-white border border-dashed border-slate-200 rounded-[2.5rem] text-slate-400">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">Waiting for artifact analysis...</p>
              <p className="text-sm mt-2 opacity-75 italic">"Our AI can identify thousands of ASI monuments instantly."</p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-2xl">
                    <Landmark className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{result.name}</h3>
                    <p className="text-slate-400 text-sm">Landmark Identification Successful</p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {result.description}
                </p>

                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Historical Facts</h4>
                  <ul className="space-y-2">
                    {result.historicalFacts.map((fact, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                        <span className="w-5 h-5 flex items-center justify-center bg-orange-600 text-white rounded-full text-[10px] shrink-0 font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
                  <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                    <History className="w-4 h-4" />
                    Safety & Visitor Tips
                  </h4>
                  <ul className="space-y-2">
                    {result.safetyTips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-800 flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VisionAI;
