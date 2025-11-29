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
        className="h-[600px] md:h-[700px] p-0 relative group overflow-hidden border-0 ring-1 ring-zinc-900/5 dark:ring-white/10 rounded-2xl cursor-pointer shadow-2xl"
      >
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentProject.id}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: "transform, opacity" }}
          >

             <motion.img 
              src={currentProject.image} 
              alt={currentProject.title} 
              className="w-full h-full object-cover opacity-50 dark:opacity-40 filter grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ willChange: "transform" }}
             />
             
             <div 
               className="absolute inset-0 mix-blend-multiply transition-colors duration-500"
               style={{ backgroundColor: currentProject.themeColor }}
             />
             
             <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
          
          <div className="flex justify-between items-start">
            <motion.div 
               key={`counter-${currentIndex}`}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex gap-2 items-center bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
            >
                <span className="text-white font-mono text-xs font-bold">0{currentIndex + 1}</span>
                <span className="text-white/30 font-mono text-xs">/</span>
                <span className="text-white/50 font-mono text-xs">0{PROJECTS.length}</span>
            </motion.div>
            
            <motion.div 
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-10 h-10 bg-white text-black flex items-center justify-center shadow-lg rounded-full hover:bg-zinc-200 transition-colors"
            >
                <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <div className="max-w-3xl pl-4 border-l-2 border-white/20 group-hover:border-white/50 transition-colors duration-500">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentProject.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentProject.tags.map((tag, i) => (
                            <motion.span 
                                key={tag} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05) }}
                                className="px-3 py-1 bg-black/50 border border-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-widest text-white rounded-md"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                    
                    <motion.div
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <h2 className="text-5xl md:text-8xl font-display font-bold mb-4 leading-none text-white tracking-tighter uppercase drop-shadow-lg">
                            {currentProject.title}
                        </h2>
                    </motion.div>

                    <p className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed font-sans drop-shadow-md">
                        {currentProject.description}
                    </p>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                        Click to Initialize Case Study
                    </motion.p>
                </motion.div>
             </AnimatePresence>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-2">
             <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "white", color: "black" }}
                whileTap={{ scale: 0.95 }}
                onClick={prevProject}
                className="w-12 h-12 border cursor-pointer border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors rounded-full"
             >
                <ArrowLeft size={20} />
             </motion.button>
             <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "white", color: "black" }}
                whileTap={{ scale: 0.95 }}
                onClick={nextProject}
                className="w-12 h-12 border cursor-pointer border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors rounded-full"
             >
                <ArrowRight size={20} />
             </motion.button>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};