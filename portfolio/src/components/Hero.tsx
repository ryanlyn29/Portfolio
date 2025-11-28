import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, MapPin, ArrowUpRight, TreePalm, Moon, Sun, Terminal, MessageCircle } from 'lucide-react';
import { BentoCard } from './ui/BentoCard';
import { SKILLS } from '../constants';

interface HeroProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({ toggleTheme, isDark }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[800px]">
      
      
      <BentoCard 
        colSpan="md:col-span-2 lg:col-span-2" 
        rowSpan="md:row-span-2" 
        hideDefaultBackground
        className="order-1 md:order-1 p-8 md:p-12 justify-between group 
        bg-teal-100/60 dark:bg-teal-900/30 backdrop-blur-md border border-teal-400 dark:border-teal-800 
        hover:bg-teal-200/70 dark:hover:bg-teal-900/50 transition-colors duration-500 rounded-2xl"
      >
        <div>
           <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-3 py-1 bg-teal-950/10 dark:bg-teal-950/50 border-l-2 border-teal-900 dark:border-white mb-8 rounded-r-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-900 dark:bg-white animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-teal-900 dark:text-white">System Online</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] text-teal-950 dark:text-white mb-4">
              RYAN<span className="text-teal-600 dark:text-teal-400">_</span>
            </h1>
        </div>
        <div className="mt-8 border-t border-teal-950/10 dark:border-white/10 pt-8 relative">
          
          <div className="absolute -left-6 top-8 bottom-0 w-px bg-teal-900/20 dark:bg-teal-400/10 hidden sm:block">
            <div className="absolute top-0 -left-1 w-2 h-px bg-teal-900/30 dark:bg-teal-400/20" />
            <div className="absolute bottom-0 -left-1 w-2 h-px bg-teal-900/30 dark:bg-teal-400/20" />
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 origin-center -rotate-90">
                <span className="text-[8px] font-mono text-teal-900/50 dark:text-teal-400/30 uppercase tracking-widest whitespace-nowrap">COORD.Z-09</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-teal-900/80 dark:text-teal-100/70 font-normal leading-relaxed max-w-md font-sans pl-2 sm:pl-0">
            Computer Engineering student passionate about <span className="text-teal-950 dark:text-white font-bold bg-teal-950/10 dark:bg-teal-950/50 px-2 rounded-md">full-stack development</span>.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <ArrowDownRight size={32} className="text-teal-950 dark:text-white" />
        </div>
      </BentoCard>

     
     <BentoCard 
        colSpan="md:col-span-1" 
        rowSpan="md:row-span-2" 
        className="order-2 md:order-2 min-h-60 md:min-h-0 p-0 relative group bg-black border border-gray-800/60 rounded-2xl flex items-center justify-center"
    >
        <TreePalm 
            className="w-24 h-24 text-black dark:text-teal-300 opacity-80 group-hover:opacity-100 transition-all duration-700" 
        />

        <div className="absolute inset-0 bg-linear-to-t from-zinc-600 via-transparent to-transparent opacity-90" />

        <div className="absolute bottom-6 left-6 pl-4">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-300 mb-1">Operator</p>
            <p className="text-xl font-bold text-white dark:text-teal-300 tracking-tight">South<br/>Florida</p>
        </div>
      </BentoCard>

      <BentoCard 
        colSpan="md:col-span-1" 
        hideDefaultBackground
        className="order-3 md:order-3 lg:order-3 p-6 justify-between 
        bg-cyan-200/60 dark:bg-cyan-900/40 backdrop-blur-md border border-cyan-400 dark:border-cyan-800 
        hover:bg-cyan-300/70 dark:hover:bg-cyan-800 rounded-2xl"
      >
         <div className="flex justify-between items-start">
            <div className="p-2 bg-cyan-950 dark:bg-white text-cyan-200 dark:text-cyan-950 rounded-lg">
              <MapPin size={20} />
            </div>
            <span className="text-[10px] font-mono text-cyan-900 dark:text-cyan-200 font-bold">COORDS: 37.77, -122.41</span>
         </div>
         <div>
            <p className="text-[10px] text-cyan-800 dark:text-cyan-300 uppercase tracking-widest font-bold mb-1 font-mono">Base Station</p>
            <p className="text-2xl font-bold text-cyan-950 dark:text-white tracking-tight">Florida International University</p>
         </div>
      </BentoCard>

      <BentoCard 
        colSpan="md:col-span-1"
        onClick={toggleTheme}
        hideDefaultBackground
        className={`order-6 md:order-6 lg:order-4 p-6 flex flex-col items-center justify-center gap-4 cursor-pointer group border border-amber-400 transition-colors duration-500 rounded-2xl backdrop-blur-md
        ${isDark 
            ? 'bg-indigo-950/50 border-indigo-800 hover:bg-indigo-900/70' 
            : 'bg-amber-100/60 border-amber-200 hover:bg-amber-200/70'
        }`}
      >
        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${isDark ? 'bg-indigo-900/50' : 'bg-amber-500/10'}`}>
           {isDark ? (
             <Moon size={28} className="text-indigo-200" />
           ) : (
             <Sun size={28} className="text-amber-600" />
           )}
        </div>
        <p className={`font-mono font-bold text-xs uppercase tracking-[0.2em] ${isDark ? 'text-indigo-200' : 'text-amber-900'}`}>
          {isDark ? "Night Ops" : "Day Ops"}
        </p>
      </BentoCard>

      <BentoCard 
        colSpan="md:col-span-2 lg:col-span-2" 
        hideDefaultBackground
        className="order-7 md:order-7 lg:order-5 p-0 overflow-hidden relative flex items-center 
        bg-indigo-200/60 dark:bg-indigo-900/40 backdrop-blur-md border border-indigo-300 dark:border-indigo-800 
        hover:bg-indigo-300/70 dark:hover:bg-indigo-800 transition-colors rounded-2xl"
      >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-indigo-200/80 dark:from-indigo-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-indigo-200/80 dark:from-indigo-900/80 to-transparent z-10 pointer-events-none" />
          
          <motion.div 
             className="flex gap-12 whitespace-nowrap px-8"
             animate={{ x: [0, -1000] }}
             transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
             {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
                <div key={i} className="flex items-center gap-4 text-indigo-400 dark:text-indigo-600/50 text-3xl font-bold uppercase tracking-tight font-mono">
                   <span className={i % 2 === 0 ? "text-indigo-950 dark:text-white/80" : "text-indigo-500/50 dark:text-indigo-400/50"}>{skill.name}</span> 
                   <span className="text-amber-500 text-sm">///</span>
                </div>
             ))}
          </motion.div>
      </BentoCard>

      <BentoCard 
        colSpan="md:col-span-1" 
        hideDefaultBackground
        className="order-5 md:order-5 lg:order-6 p-6 justify-between group 
        bg-violet-200/60 dark:bg-violet-900/40 backdrop-blur-md border border-violet-300 dark:border-violet-800 
        hover:bg-violet-300/70 dark:hover:bg-violet-800 rounded-2xl"
      >
         <div className="flex justify-between items-start">
             <div className="p-2 bg-violet-950 dark:bg-white text-violet-200 dark:text-violet-950 rounded-lg">
                <Terminal size={20} />
             </div>
             <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-900 dark:text-white" />
         </div>
         <div>
            <p className="text-[10px] text-violet-800 dark:text-violet-300 uppercase tracking-widest font-bold mb-1 font-mono">Specialization</p>
            <p className="text-lg font-bold text-violet-950 dark:text-white leading-tight">SOFTWARE<br/>ENGINEERING</p>
         </div>
      </BentoCard>

      <BentoCard 
        colSpan="md:col-span-1" 
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        hideDefaultBackground
        className="order-4 md:order-4 lg:order-7 p-6 justify-center items-center gap-4 group cursor-pointer text-center 
        bg-rose-300/60 dark:bg-rose-900/40 backdrop-blur-md border border-rose-400 dark:border-rose-800 
        hover:bg-rose-400/70 dark:hover:bg-rose-800 rounded-2xl"
      >
          <div className="p-3 bg-rose-950/20 dark:bg-rose-950/50 rounded-xl group-hover:bg-rose-950 transition-colors">
              <MessageCircle size={24} className="text-rose-900 dark:text-rose-200" />
          </div>
          <p className="font-bold text-xl text-rose-950 dark:text-white tracking-tight">CONTACT</p>
      </BentoCard>
      
    </div>
  );
};