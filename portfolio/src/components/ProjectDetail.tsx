import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Layers, User } from 'lucide-react';
import type { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-50 bg-[#F8F9FA] dark:bg-[#111] overflow-y-auto scroll-smooth"
    >
        <div className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center pointer-events-none">
            <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={onClose}
                className="pointer-events-auto bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
            >
                <ArrowLeft size={16} />
                Back to Grid
            </motion.button>

            <motion.a 
                href={project.liveUrl}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pointer-events-auto bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
                Visit Site
                <ArrowUpRight size={16} />
            </motion.a>
        </div>

        <div className="relative w-full h-[60vh] md:h-[70vh] z-10">
            {project.id === '3' ? (
                <video
                    src="/videos/Clinix.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                />
                ) : (
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#F8F9FA] dark:from-[#111] via-transparent to-black/30" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-6"
                >
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-black/50 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest rounded-md">
                            {tag}
                        </span>
                    ))}
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-display font-bold text-zinc-900 dark:text-white leading-none tracking-tighter uppercase mb-4"
                >
                    {project.title}
                </motion.h1>
                
                 <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    onClick={() => scrollToSection('project-content')}
                    className="absolute bottom-12 right-12 text-zinc-900/50 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hidden md:flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
                    <ArrowLeft className="-rotate-90" size={20} />
                </motion.button>
            </div>
        </div>

        <div id="project-content" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-4 space-y-8"
            >
                <div className="p-6 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 text-zinc-500 dark:text-zinc-400">
                        <User size={16} />
                        <span className="font-mono text-xs uppercase tracking-widest">Role</span>
                    </div>
                    <p className="text-zinc-900 dark:text-white font-bold text-lg">{project.role || 'Lead Designer'}</p>
                </div>

                <div className="p-6 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 text-zinc-500 dark:text-zinc-400">
                        <Calendar size={16} />
                        <span className="font-mono text-xs uppercase tracking-widest">Year</span>
                    </div>
                    <p className="text-zinc-900 dark:text-white font-bold text-lg">{project.year || '2024'}</p>
                </div>

                <div className="p-6 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 text-zinc-500 dark:text-zinc-400">
                        <Layers size={16} />
                        <span className="font-mono text-xs uppercase tracking-widest">Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-zinc-900 dark:text-white font-bold">{tag}{', '}</span>
                        ))}
                    </div>
                </div>
                
                 <button 
                    onClick={() => scrollToSection('project-gallery')}
                    className="w-full py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 font-mono text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                    View Gallery ↓
                </button>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="md:col-span-8"
            >
                <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-8">
                    The Brief
                </h2>
                <div className="prose dark:prose-invert prose-lg max-w-none text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                    <p>{project.longDescription || project.description}</p>
                    <p>
                        We approached this challenge by deconstructing the core user needs. 
                        By utilizing a component-based architecture, we ensured that the design 
                        system remained scalable while providing a bespoke feel for the end-user.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                    {[
                        { label: 'Performance', val: '+40%' },
                        { label: 'User Retention', val: '92%' },
                        { label: 'Conversion', val: '2.5x' }
                    ].map((stat, i) => (
                         <div key={i}>
                             <p className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2">{stat.val}</p>
                             <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">{stat.label}</p>
                         </div>
                    ))}
                </div>
            </motion.div>
        </div>

        <div id="project-gallery" className="max-w-7xl mx-auto px-4 md:px-6 pb-24 relative z-10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-8 pl-2">
                Project Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {project.gallery?.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-2xl overflow-hidden shadow-2xl ${i === 0 ? 'md:col-span-2' : ''}`}
                    >
                        {item.endsWith('.mp4') ? (
                            <video 
                                src={item} 
                                autoPlay 
                                loop 
                                muted 
                                controls
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <img 
                                src={item} 
                                alt={`Gallery ${i}`} 
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="bg-zinc-200 dark:bg-zinc-900 py-24 text-center relative z-10">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Next Case Study</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white cursor-pointer hover:opacity-50 transition-opacity" onClick={onClose}>
                View Next Project
            </h2>
        </div>
    </motion.div>
  );
};