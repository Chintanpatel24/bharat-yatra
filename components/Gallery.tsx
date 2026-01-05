
import React, { useState } from 'react';
import { MapPin, Info, ArrowRight, Camera, X, Calendar, Landmark, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../types';

const visitedPlaces: GalleryItem[] = [
  {
    id: '1',
    title: 'Ajanta Caves',
    location: 'Aurangabad, Maharashtra',
    image: 'https://images.unsplash.com/photo-1626248674987-a3a8a914397a?w=1200&q=80',
    description: 'A masterpiece of Buddhist religious art, Ajanta features 30 rock-cut cave monuments including paintings and sculptures described by UNESCO as "the finest surviving examples of Indian art".'
  },
  {
    id: '2',
    title: 'Ellora Caves',
    location: 'Aurangabad, Maharashtra',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=1200&q=80',
    description: 'Ellora is a UNESCO World Heritage site featuring Hindu, Buddhist and Jain monuments, including the breathtaking Kailasa temple, a single rock-cut structure that is one of the largest in the world.'
  },
  {
    id: '3',
    title: 'Khajuraho Temples',
    location: 'Chhatarpur, Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1596395819057-e37f55a85199?w=800&q=80',
    description: 'UNESCO World Heritage site famous for its Nagara-style architectural symbolism and erotic sculptures.'
  },
  {
    id: '4',
    title: 'Sun Temple',
    location: 'Konark, Odisha',
    image: 'https://images.unsplash.com/photo-1621213233866-993f7734a742?w=800&q=80',
    description: 'A 13th-century CE Sun temple built in the shape of a gigantic chariot with elaborately carved stone wheels.'
  },
  {
    id: '5',
    title: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    description: 'Historic Hindu temple located on the southern bank of the Vaigai River, famous for its towering gopurams.'
  },
  {
    id: '6',
    title: 'Golden Temple',
    location: 'Amritsar, Punjab',
    image: 'https://images.unsplash.com/photo-1588096344316-f5f405efca7a?w=800&q=80',
    description: 'Harmandir Sahib, the preeminent spiritual site of Sikhism, known for its stunning gold-covered architecture.'
  }
];

const Gallery: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex items-center gap-4">
        <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-2xl">
          <Camera className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Heritage Gallery</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">Authentic Indian Heritage Visualized by AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visitedPlaces.map((place) => (
          <div key={place.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={place.image} 
                alt={place.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <MapPin className="w-3 h-3" />
                {place.location.split(',')[0]}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{place.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                {place.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Landmark className="w-3 h-3 text-orange-500" />
                  Historical Site
                </div>
                <button 
                  onClick={() => setSelectedPlace(place)}
                  className="text-orange-600 font-black text-sm flex items-center gap-1 group/btn hover:translate-x-1 transition-transform"
                >
                  Explore 
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedPlace(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in slide-in-from-bottom-10 duration-500" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur p-3 rounded-full text-white hover:bg-black/60 transition-all active:scale-90"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-80 relative">
              <img src={selectedPlace.image} alt={selectedPlace.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-8 left-10 right-10">
                <p className="text-orange-400 font-black text-xs uppercase tracking-[0.3em] mb-2">Heritage Discovery</p>
                <h2 className="text-5xl font-black text-white tracking-tight leading-none">{selectedPlace.title}</h2>
              </div>
            </div>

            <div className="p-12 space-y-10 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-inner">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</p>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white">{selectedPlace.location}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-inner">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Status</p>
                  </div>
                  <p className="font-bold text-green-600">SECURE • TIER 1</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-800 dark:text-white text-xl flex items-center gap-3">
                  <Info className="w-6 h-6 text-orange-600" />
                  Detailed Context
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-loose font-medium text-lg">
                  {selectedPlace.description}
                </p>
              </div>

              <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                BOOK GUIDED TOUR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
