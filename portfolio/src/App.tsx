import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { BentoCard } from './components/BentoCard';
import { VideoCard } from  "./VideoCard.tsx";
import { PROJECTS, VIDEO_ITEMS } from './constants';
import { 
  ArrowUpRight, Plus, ChevronLeft, ChevronRight,
  Github, Code2, Linkedin, User, Layers, Mail, Copy, CheckCircle,
  Calendar as CalendarIcon, Cloud, Calculator, CheckSquare, Music, Camera, Twitter, Quote,
  Search, Grid, Settings, Smartphone, ExternalLink, Wifi, BatteryFull
} from 'lucide-react';
import { Modal } from './components/Modal';
import { motion, AnimatePresence } from 'framer-motion';

type ModalState = {
  isOpen: boolean;
  type: 'project' | 'about' | 'skills' | 'playlist' | null;
  data: any;
};


const StatusBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000 * 10); 
    return () => clearInterval(timer);
  }, []);

  const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dayString = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center text-xs font-bold tracking-wide text-zinc-900 dark:text-white pointer-events-none select-none font-inter">
       <div className="flex items-center gap-2">
           <span>{timeString}</span>
           <span>{dayString}</span>
           <span>{dateString}</span>
       </div>
       <div className="flex items-center gap-2">
           <Wifi size={16} strokeWidth={2.5} />
           <div className="flex items-center gap-1">
               <span>100%</span>
               <div className="relative">
                 <BatteryFull size={20} strokeWidth={2.5} />
               </div>
           </div>
       </div>
    </div>
  );
};



const ToolsPage = ({ openModal }: { openModal: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-8 pt-12 md:pt-14 pb-32 content-start w-full max-w-[1920px] mx-auto">
      
      <BentoCard colSpan="md:col-span-8" className="bg-zinc-100 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 min-h-[140px] !p-6">
          <div className="flex flex-row items-center justify-between w-full h-full">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Workspace</h2>
              <p className="text-zinc-500 text-sm mt-1">Productivity & Utilities</p>
            </div>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
               <Calculator className="text-blue-500" size={32} />
            </div>
          </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" className="bg-sky-500 text-white border-sky-400 relative overflow-hidden min-h-[140px] !p-6">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col justify-between h-full">
             <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                      <Cloud size={20} className="text-white/90" />
                      <span className="text-sm font-medium text-white/90">Miami, FL</span>
                  </div>
                  <div className="text-right">
                       <div className="text-xs font-medium text-sky-100">H:85° L:76°</div>
                  </div>
             </div>
             <div className="flex items-end justify-between mt-2">
                <div className="text-5xl font-bold tracking-tighter">82°</div>
                <p className="text-sky-100 text-sm font-medium">Partly Cloudy</p>
             </div>
          </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bg-white dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 p-5 !p-5">
          <div className="flex justify-between items-center mb-4 px-4 pt-4">
              <span className="font-bold text-lg text-zinc-900 dark:text-white">October</span>
              <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400 font-medium">2025</span>
                  <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                      <CalendarIcon size={14} className="text-zinc-500 dark:text-zinc-400" />
                  </div>
              </div>
          </div>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-500">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div
                      key={day}
                      className={`flex items-center justify-center
                        w-10 h-10 rounded-full
                        text-xs font-medium transition-all mx-auto
                        ${
                          day === 14
                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 cursor-pointer'
                        }
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="w-1 h-8 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Next Up</p>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">Project Launch Meeting</p>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">10:00</span>
              </div>
          </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" noPadding={true} className="flex flex-col border-none">
          <div className="bg-[#facc15] p-6 pb-3">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <div className="p-2 bg-black/5 rounded-lg">
                        <CheckSquare size={18} className="text-zinc-900" />
                      </div>
                      <h3 className="font-bold text-lg text-zinc-900">Tasks</h3>
                  </div>
                  <span className="px-2 py-1 bg-white/30 rounded-md text-xs font-bold text-zinc-900 backdrop-blur-md">3 Pending</span>
              </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-[#1c1c1e] p-6 pt-4">
              <div className="space-y-3">
                  {[
                      { txt: 'Review PRs', done: true },
                      { txt: 'Update Portfolio', done: false },
                      { txt: 'Client Meeting', done: false }
                  ].map((task, i) => (
                      <div key={i} className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.done ? 'bg-zinc-900 border-zinc-900 dark:bg-white dark:border-white' : 'border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-900 dark:group-hover:border-white'}`}>
                              {task.done && <Plus size={12} className="text-white dark:text-black rotate-45 stroke-[4]" />}
                          </div>
                          <span className={`text-sm font-medium text-zinc-700 dark:text-zinc-200 ${task.done ? 'line-through opacity-50' : 'opacity-90'}`}>{task.txt}</span>
                      </div>
                  ))}
              </div>
          </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bg-zinc-100 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white !p-6">
          <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-end items-end mb-6 space-y-1">
                  <span className="text-zinc-400 text-xs font-mono">1,240 + 350</span>
                  <span className="text-4xl font-light tracking-tight text-zinc-900 dark:text-white">1,590</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                  {['C', '±', '%', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map((btn, i) => (
                      <button key={i} className={`
                          h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all active:scale-95 shadow-sm
                          ${btn === '=' 
                             ? 'col-span-2 bg-orange-500 hover:bg-orange-600 text-white' 
                             : typeof btn === 'number' || btn === '.' 
                                ? 'bg-white dark:bg-[#2c2c2e] hover:bg-zinc-50 dark:hover:bg-[#3a3a3c] text-zinc-900 dark:text-zinc-100' 
                                : 'bg-zinc-200 dark:bg-[#3a3a3c] text-zinc-900 dark:text-orange-400 font-bold'
                          }
                      `}>
                          {btn}
                      </button>
                  ))}
              </div>
          </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" className="bg-white dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 flex flex-col justify-between gap-8 !p-6">
           
           <div className="flex flex-col gap-2 mb-5">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-purple-500/10 rounded-lg">
                        <Layers size={14} className="text-purple-500" />
                      </div>
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Memory</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-zinc-400">14.2 GB</span>
               </div>
               <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[70%] rounded-full" />
               </div>
           </div>

           <div className="flex flex-col gap-2 mb-5">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-green-500/10 rounded-lg">
                        <Grid size={14} className="text-green-500" />
                      </div>
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Storage</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-zinc-400">1.1 TB</span>
               </div>
               <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[45%] rounded-full" />
               </div>
           </div>

           <div className="flex flex-col gap-2">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-blue-500/10 rounded-lg">
                        <Cloud size={14} className="text-blue-500" />
                      </div>
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Network</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-zinc-400">850 Mbps</span>
               </div>
               <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[90%] rounded-full" />
               </div>
           </div>
      </BentoCard>
  </div>
);

const AppLibraryPage = ({ 
    openModal, 
    navigateToPage, 
    toggleTheme,
    scrollToSection,
    currentProject
}: { 
    openModal: any, 
    navigateToPage: (page: number) => void, 
    toggleTheme: () => void,
    scrollToSection: (id: string) => void,
    currentProject: any
}) => {

    const apps = [
        {
            category: "Suggestions",
            items: [
                { name: 'Profile', icon: <User />, color: 'bg-gradient-to-br from-orange-400 to-orange-600', action: () => openModal('about') },
                { name: 'Projects', icon: <Code2 />, color: 'bg-gradient-to-br from-zinc-800 to-black dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-black', action: () => openModal('project', currentProject) },
                { name: 'Music', icon: <Music />, color: 'bg-gradient-to-br from-green-400 to-green-600', action: () => openModal('playlist') },
                { name: 'Stack', icon: <Layers />, color: 'bg-gradient-to-br from-violet-500 to-violet-700', action: () => openModal('skills') },
            ]
        },
        {
            category: "Utilities",
            items: [
                { name: 'Workspace', icon: <Calculator />, color: 'bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 text-zinc-900 dark:text-white', action: () => navigateToPage(0) },
                { name: 'Mail', icon: <Mail />, color: 'bg-gradient-to-br from-rose-400 to-rose-600', action: () => { navigateToPage(1); setTimeout(() => scrollToSection('contact'), 500); } },
                { name: 'Settings', icon: <Settings />, color: 'bg-gradient-to-br from-zinc-400 to-zinc-500', action: toggleTheme },
            ]
        },
        {
            category: "Social",
            items: [
                { name: 'GitHub', icon: <Github />, color: 'bg-[#181717]', action: () => window.open('https://github.com', '_blank') },
                { name: 'LinkedIn', icon: <Linkedin />, color: 'bg-[#0077b5]', action: () => window.open('https://linkedin.com', '_blank') },
                { name: 'Twitter', icon: <Twitter />, color: 'bg-[#1DA1F2]', action: () => window.open('https://twitter.com', '_blank') },
            ]
        }
    ];

    return (
        <div className="px-6 pt-14 pb-32 w-full h-full content-start flex flex-col">
            
            <div className="w-full mb-8">
                <div className="relative group max-w-full mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="App Library" 
                        className="block w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-md border-none focus:ring-0 text-zinc-900 dark:text-white placeholder-zinc-500 text-sm font-normal shadow-sm transition-all"
                        readOnly
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {apps.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide ml-4">{section.category}</h3>
                            <div className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/20 dark:border-white/5 shadow-sm">
                                <div className="grid grid-cols-4 gap-4">
                                    {section.items.map((app, i) => (
                                        <button 
                                            key={i} 
                                            onClick={app.action}
                                            className="flex flex-col items-center gap-1.5 group focus:outline-none"
                                        >
                                            <div className={`
                                                w-[3.75rem] h-[3.75rem] rounded-[14px] shadow-sm 
                                                flex items-center justify-center text-white
                                                group-hover:scale-105 group-active:scale-95 transition-all duration-300
                                                ${app.color} relative overflow-hidden
                                                ring-1 ring-black/5 dark:ring-white/10
                                            `}>
                                                <div className="relative z-10">{React.cloneElement(app.icon as any, { size: 24 })}</div>
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                            </div>
                                            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate w-full text-center tracking-tight">
                                                {app.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 rounded-[2rem] bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm">
                            <Smartphone size={24} className="text-zinc-500 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 dark:text-white text-sm">RyanOS</h4>
                            <p className="text-xs text-zinc-500">v18.0 (Bento)</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-mono text-zinc-400">Up to date</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const HomePage = ({ 
    heroIndex, 
    setHeroIndex, 
    openModal, 
    copyEmail, 
    emailCopied 
}: any) => {
    const currentProject = PROJECTS[heroIndex];
    const textColor = currentProject.textColor || 'text-white';
    const tagBg = currentProject.textColor ? 'bg-zinc-900/10 text-zinc-900 border-zinc-900/10' : 'bg-black/40 text-zinc-300 border-white/10';
    const buttonBg = currentProject.textColor ? 'bg-zinc-900 text-white' : 'bg-white text-black';
    const arrowBg = currentProject.textColor ? 'bg-black/5 hover:bg-black/10' : 'bg-white/10 hover:bg-white/30';
    const indicatorActive = currentProject.textColor ? 'bg-zinc-900' : 'bg-white';
    const indicatorInactive = currentProject.textColor ? 'bg-zinc-300' : 'bg-zinc-600';
    const descriptionColor = currentProject.textColor ? 'text-zinc-600' : 'text-zinc-200';
    const gradient = currentProject.overlayGradient || 'from-black via-black/40 to-transparent';
    
    const textShadowClass = currentProject.textColor ? '' : 'drop-shadow-md';

    const nextProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHeroIndex((prev: number) => (prev + 1) % PROJECTS.length);
      };
      const prevProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHeroIndex((prev: number) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      };

    return (
        <div id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-8 pt-12 md:pt-14 pb-32 flex-1 content-start">
            <BentoCard 
              id="about"
              colSpan="md:col-span-6" 
              layoutId="card-about"
              className="relative overflow-hidden bg-[#ff4500] text-white group cursor-pointer border-none !p-8"
              onClick={() => openModal('about')}
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Identity</span>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-white rounded-full" />
                             <span className="font-bold text-sm tracking-wide">Ryan Lyn</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#ff4500] transition-colors">
                        <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <div>
                      <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.85] mb-6">
                         Creative<br/>Dev.
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-5">
                          <div>
                              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">Location</p>
                              <p className="text-sm font-medium">Miami, FL</p>
                          </div>
                          <div>
                              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">Focus</p>
                              <p className="text-sm font-medium">UI/UX & React</p>
                          </div>
                      </div>
                  </div>
                </div>
            </BentoCard>

            <BentoCard 
              id="work"
              colSpan="md:col-span-4" 
              rowSpan="md:row-span-2" 
              noPadding={true}
              layoutId={`card-${currentProject.id}`}
              className="relative group min-h-[420px] cursor-pointer"
              onClick={() => openModal('project', currentProject)}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                    key={currentProject.image}
                    src={currentProject.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    alt={currentProject.title} 
                    className="absolute inset-0 w-full h-full object-cover scale-102 z-0"
                  />
              </AnimatePresence>

              <div className={`absolute inset-0 bg-gradient-to-t ${gradient} z-10`} />
              
              <div className={`relative z-20 flex flex-col justify-between h-full p-8 ${textColor}`}>
                <div className="">
                  <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentProject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className={`inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest rounded-md ${currentProject.textColor ? 'bg-zinc-900/10' : 'bg-white/20 backdrop-blur-md'}`}>
                            Featured Project
                        </span>
                        <h2 className={`text-4xl font-bold leading-none tracking-tight mb-2 ${textShadowClass}`}>
                        {currentProject.title}
                        </h2>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentProject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <p className={`text-sm leading-relaxed mb-6 line-clamp-3 font-medium ${descriptionColor} ${textShadowClass}`}>
                            {currentProject.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentProject.tags.slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className={`text-[10px] font-mono px-2 py-1 rounded-sm border ${tagBg}`}>
                                {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between items-end">
                    <button className={`${buttonBg} px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg`}>
                        View Project
                    </button>

                    <div className="flex gap-2">
                        <button onClick={prevProject} className={`p-2 rounded-full backdrop-blur-md transition-colors ${arrowBg}`}>
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={nextProject} className={`p-2 rounded-full backdrop-blur-md transition-colors ${arrowBg}`}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-8 justify-center">
                      {PROJECTS.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-colors ${i === heroIndex ? indicatorActive : indicatorInactive}`}
                          />
                      ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard 
              colSpan="md:col-span-2" 
              rowSpan="md:row-span-2" 
              noPadding={true} 
              layoutId="card-skills"
              className="bg-violet-600 relative overflow-hidden group min-h-[420px] cursor-pointer"
              onClick={() => openModal('skills')}
            >
              <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" 
                  alt="Tech Background"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
              
              <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-between items-start">
                     <Layers className="text-white/80" size={24} />
                     <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-full">
                         <Plus size={14} />
                     </div>
                  </div>

                  <div>
                     <h3 className="text-3xl font-bold mb-2">Tech<br/>Stack</h3>
                     <p className="text-white/70 text-xs leading-relaxed mb-4">
                        React, Node, Docker, & Modern UI systems.
                     </p>
                     
                     <div className="grid grid-cols-3 gap-2">
                        {[1,2,3,4,5,6].map(i => (
                           <div key={i} className="aspect-square bg-white/10 rounded-md backdrop-blur-sm border border-white/10 flex items-center justify-center">
                              <Code2 size={16} className="text-white/60" />
                           </div>
                        ))}
                     </div>
                  </div>
              </div>
            </BentoCard>

            <BentoCard colSpan="md:col-span-2" noPadding={true} className="bg-[#0c0c0e] border border-zinc-800 flex flex-col items-center justify-center p-4 min-h-[200px]">
                <div className="flex flex-row items-center justify-center w-full h-full gap-5">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2a3025" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a3e635" strokeWidth="8" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" />
                          
                          <circle cx="50" cy="50" r="24" fill="transparent" stroke="#162e36" strokeWidth="8" />
                          <circle cx="50" cy="50" r="24" fill="transparent" stroke="#22d3ee" strokeWidth="8" strokeDasharray="150" strokeDashoffset="40" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3 min-w-0">
                      <div>
                         <div className="text-[#22d3ee] font-bold text-sm uppercase tracking-wider mb-0.5">CPU</div>
                         <div className="text-white font-light text-2xl whitespace-nowrap">57 <span className="text-lg text-[#22d3ee]">°C</span></div>
                      </div>
                      <div>
                         <div className="text-[#a3e635] font-bold text-sm uppercase tracking-wider mb-0.5">GPU</div>
                         <div className="text-white font-light text-2xl whitespace-nowrap">86 <span className="text-lg text-[#a3e635]">°C</span></div>
                      </div>
                    </div>
                </div>
            </BentoCard>

            <BentoCard 
              colSpan="md:col-span-2" 
              className="bg-[#6e5494] text-white relative group cursor-pointer border border-[#5d467e] min-h-[200px]"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <div className="absolute top-4 right-4 p-1.5 bg-white/10 rounded-full border border-white/10 group-hover:bg-white group-hover:text-[#6e5494] transition-colors">
                  <ArrowUpRight size={14} />
              </div>
              <div className="flex flex-col justify-end h-full">
                  <Github size={28} className="mb-4 text-white/80 group-hover:text-white transition-colors" />
                  <div className="font-bold text-lg">GitHub</div>
                  <div className="text-white/60 text-[10px] group-hover:text-white transition-colors">Check out my code</div>
              </div>
            </BentoCard>

             <BentoCard 
              colSpan="md:col-span-2" 
              className="bg-[#0077b5] text-white relative group cursor-pointer border border-[#005e93] min-h-[200px]"
              onClick={() => window.open('https://linkedin.com', '_blank')}
            >
              <div className="absolute top-4 right-4 p-1.5 bg-white/10 rounded-full border border-white/10 group-hover:bg-white group-hover:text-[#0077b5] transition-colors">
                  <ArrowUpRight size={14} />
              </div>
              <div className="flex flex-col justify-end h-full">
                  <Linkedin size={28} className="mb-4 text-white/80 group-hover:text-white transition-colors" />
                  <div className="font-bold text-lg">LinkedIn</div>
                  <div className="text-white/60 text-[10px] group-hover:text-white transition-colors">Let's connect</div>
              </div>
            </BentoCard>


            <VideoCard onClick={() => openModal('playlist')} />

            <BentoCard 
              colSpan="md:col-span-5" 
              id="contact" 
              className="bg-rose-600 text-white min-h-[320px] group cursor-pointer border-none !p-8 relative overflow-hidden"
              onClick={copyEmail}
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Status</span>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                             <span className="font-bold text-sm tracking-wide">Available</span>
                        </div>
                    </div>
                    <div 
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-rose-600 transition-colors"
                        onClick={(e) => { e.stopPropagation(); copyEmail(e); }}
                    >
                        {emailCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    </div>
                  </div>

                  <div>
                      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[0.9] mb-6">
                         Let's work<br/>together.
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-5">
                          <div>
                              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">Timezone</p>
                              <p className="text-sm font-medium">Miami (EST)</p>
                          </div>
                          <div>
                              <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">Email</p>
                              <p className="text-sm font-medium truncate" title="contact@ryanlyn.dev">contact@ryanlyn.dev</p>
                          </div>
                      </div>
                  </div>
                </div>
            </BentoCard>

            <BentoCard colSpan="md:col-span-12" className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between min-h-[100px] px-8 py-3 gap-6">
              <div className="flex items-center gap-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Available for work</h4>
                    <p className="text-zinc-500 text-xs tracking-wide">EST Timezone</p>
                  </div>
              </div>
              
              <div className="hidden md:flex flex-1 justify-center overflow-hidden mask-linear-fade">
                  <div className="flex gap-8 text-zinc-400 font-mono text-xs uppercase tracking-widest whitespace-nowrap">
                      <span>• Frontend Development</span>
                      <span>• UI/UX Design</span>
                      <span>• Design Systems</span>
                      <span>• React </span>
                      <span>• Figma</span>
                      <span>• Motion Design</span>
                  </div>
              </div>
              
              <div className="text-right">
                  <div className="text-[10px] text-zinc-400 font-bold mb-1 uppercase tracking-widest">Portfolio</div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-white font-mono">2025©</div>
              </div>
            </BentoCard>

        </div>
    );
};


export default function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const [[page, direction], setPage] = useState([1, 0]); 
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openModal = (type: 'project' | 'about' | 'skills' | 'playlist', data: any = null) => {
    setModalState({ isOpen: true, type, data });
    
    if (type === 'project' && data) {
        const idx = PROJECTS.findIndex(p => p.id === data.id);
        if (idx !== -1) setHeroIndex(idx);
    }
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("contact@ryanlyn.dev");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage <= 2) {
      setPage([newPage, newDirection]);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleNavClick = (id: string) => {
    if (id === 'about') {
        openModal('about');
        return;
    }
    
    if (id === 'projects') {
        openModal('project', PROJECTS[heroIndex]);
        return;
    }
    
    if (id === 'apps') {
        setPage([2, 1]);
        return;
    }

    if (page !== 1) {
      setPage([1, 1 > page ? 1 : -1]); 
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleScrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="w-full h-screen bg-[#fdfbf7] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-500 overflow-hidden flex flex-col relative">
        
        <StatusBar />
        
        <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        type={modalState.type}
        data={modalState.data}
        onNavigate={openModal}
        />
        
        <div className="flex-1 w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1); 
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1); 
                    }
                }}
                className="w-full h-full overflow-y-auto custom-scrollbar"
            >
                <div className="w-full h-full max-w-[1920px] mx-auto relative">
                    {page === 0 && <ToolsPage openModal={openModal} />}
                    {page === 1 && (
                        <HomePage 
                            heroIndex={heroIndex} 
                            setHeroIndex={setHeroIndex} 
                            openModal={openModal} 
                            copyEmail={copyEmail} 
                            emailCopied={emailCopied} 
                        />
                    )}
                    {page === 2 && (
                        <AppLibraryPage 
                            openModal={openModal} 
                            navigateToPage={(p) => setPage([p, p > page ? 1 : -1])}
                            toggleTheme={toggleTheme}
                            scrollToSection={handleScrollToSection}
                            currentProject={PROJECTS[heroIndex]}
                        />
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
            {[0, 1, 2].map((idx) => (
                <button
                key={idx} 
                onClick={() => {
                    if (idx === page) return;
                    setPage([idx, idx > page ? 1 : -1]);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm pointer-events-auto hover:scale-125 focus:outline-none ${page === idx ? 'bg-zinc-900 dark:bg-white w-4' : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'}`}
                aria-label={`Go to page ${idx + 1}`}
                />
            ))}
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none">
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} onNavigate={handleNavClick} />
        </div>
      </div>
    </div>
  );
}