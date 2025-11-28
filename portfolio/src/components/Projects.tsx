import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { BentoCard } from './ui/BentoCard';
import type { Project } from '../types';

interface ProjectsProps {
  onHoverProject: (color: string | null) => void;
  onSelectProject: (project: Project) => void;
  isDark: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ onHoverProject, onSelectProject, isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const currentProject = PROJECTS[currentIndex];

  useEffect(() => {
   
    const bgColor = isDark 
        ? (currentProject.darkThemeColor || '#09090b') 
        : (currentProject.lightThemeColor || '#F8F9FA');
        
    onHoverProject(bgColor);
    
    return () => {};
  }, [currentIndex, isDark, currentProject.darkThemeColor, currentProject.lightThemeColor, onHoverProject]);

  return (
    <div id="projects" className="w-full">
      <BentoCard 
        onClick={() => onSelectProject(currentProject)}
        className="h-[600px] md:h-[700px] p-0 relative group overflow-hidden border-0 ring-1 ring-zinc-900/5 dark:ring-white/10 rounded-2xl cursor-pointer"
      >
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentProject.id}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }} 
            className="absolute inset-0 w-full h-full"
          >
             <img 
              src={currentProject.image} 
              alt={currentProject.title} 
              className="w-full h-full object-cover opacity-50 dark:opacity-40 filter grayscale hover:grayscale-0 transition-all duration-700"
             />
             <div 
               className="absolute inset-0 mix-blend-multiply transition-colors duration-500"
               style={{ backgroundColor: currentProject.themeColor }}
             />
             <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
          
          <div className="flex justify-between items-start z-10">
            <div className="flex gap-2 items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <span className="text-white font-mono text-xs font-bold">0{currentIndex + 1}</span>
                <span className="text-white/30 font-mono text-xs">/</span>
                <span className="text-white/50 font-mono text-xs">0{PROJECTS.length}</span>
            </div>
            
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-white text-black flex items-center justify-center shadow-lg rounded-full hover:bg-zinc-200"
            >
                <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <div className="max-w-3xl z-10 relative pl-4 border-l-2 border-white/20">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentProject.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentProject.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/50 border border-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-widest text-white rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold mb-4 leading-none text-white tracking-tighter uppercase">
                        {currentProject.title}
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed font-sans">
                        {currentProject.description}
                    </p>
                    <p className="mt-4 text-xs font-mono uppercase tracking-widest text-white/60">
                        [Click to Initialize Case Study]
                    </p>
                </motion.div>
             </AnimatePresence>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-2 z-20">
             <button 
                onClick={prevProject}
                className="w-12 h-12 border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-full"
             >
                <ArrowLeft size={20} />
             </button>
             <button 
                onClick={nextProject}
                className="w-12 h-12 border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-full"
             >
                <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};