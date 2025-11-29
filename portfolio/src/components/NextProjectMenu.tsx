import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

interface NextProjectMenuProps {
  currentProjectId: string;
  onSelectProject: (project: Project) => void;
}

export const NextProjectMenu: React.FC<NextProjectMenuProps> = ({ currentProjectId, onSelectProject }) => {
  const nextProjects = PROJECTS.filter(p => p.id !== currentProjectId);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 py-24 px-6 border-t border-black/5 dark:border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-l-2 border-zinc-300 dark:border-zinc-700 pl-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                Database_Query
            </h3>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white uppercase">
                Select Next Module
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer relative aspect-4/3 rounded-2xl overflow-hidden bg-zinc-300 dark:bg-black/5 border border-black/2 dark:border-white/10"
            >
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
               />
               
               <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 mb-1">
                          {project.category}
                      </p>
                      <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                          {project.title}
                      </h4>
                  </div>
               </div>

               <div 
                 className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 pointer-events-none"
                 style={{ borderColor: 'transparent' }} 
               >
                 <div className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ borderColor: project.themeColor }} />
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};