import React from 'react';
import { BentoCard } from './BentoCard';
import { VIDEO_ITEMS } from '../constants';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ onClick }) => {
  const currentVideo = VIDEO_ITEMS[0]; 
  
  const textColor = (currentVideo as any).textColor || 'text-white';
  const gradient = (currentVideo as any).overlayGradient || 'from-zinc-900 via-zinc-900/40 to-transparent';
  
  
  const isDarkText = textColor.includes('zinc-900') || textColor.includes('black');
  const tagBg = isDarkText ? 'bg-green-600/10 text-green-700 border-green-600/20' : 'bg-green-500/20 text-green-400 border-green-500/20';
  const metaColor = isDarkText ? 'text-zinc-600' : 'text-zinc-100';
  const subMetaColor = isDarkText ? 'text-zinc-500' : 'text-zinc-400';
  const shadowClass = isDarkText ? '' : 'drop-shadow-sm';

  return (
    <BentoCard 
      colSpan="md:col-span-7" 
      noPadding={true} 
      className="min-h-[320px] group relative bg-zinc-900 dark:bg-[#111] cursor-pointer"
      layoutId="card-playlist"
      onClick={onClick}
    >
        <img
            src={currentVideo.poster}
            alt={currentVideo.title}
            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500`} />
        
        <div className={`absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 ${textColor}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border mb-4 ${tagBg}`}>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Featured Playlist</span>
          </div>

          <h3 className={`font-bold text-2xl md:text-4xl mb-2 leading-tight max-w-lg ${shadowClass}`}>{currentVideo.title}</h3>
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden border border-white/20">
                 <img src={currentVideo.avatar} className="w-full h-full object-cover" alt="Channel" />
             </div>
             <div>
                <p className={`text-sm font-bold ${metaColor}`}>{currentVideo.channel}</p>
                <p className={`text-xs ${subMetaColor}`}>{VIDEO_ITEMS.length} Videos • Updated today</p>
             </div>
          </div>
        </div>

        
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <Play size={32} className="fill-black text-black ml-1" />
            </motion.div>
        </div>
    </BentoCard>
  );
};