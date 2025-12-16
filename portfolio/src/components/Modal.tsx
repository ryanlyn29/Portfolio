import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Calendar, MapPin, GraduationCap, 
  Play, Pause, Heart, BarChart2, 
  ExternalLink, User, Download, Github, Linkedin, Mail 
} from 'lucide-react';
import type { Project } from '../types';
import { SKILLS, VIDEO_ITEMS, PROJECTS } from '../constants';

type ModalType = 'project' | 'about' | 'skills' | 'playlist';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType | null;
  data: any; 
  onNavigate?: (type: ModalType, data: any, layoutId?: string) => void;
  layoutId?: string;
  isFullScreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ onClose, type, data, onNavigate, layoutId }) => {
  const finalLayoutId = layoutId || (type === 'project' && data ? `hero-card-${data.id}` : `hero-card-${type}`);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-200/60 dark:bg-black/60 backdrop-blur-xl"
      />
      <motion.div
        layoutId={finalLayoutId}
        className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#fbfbfd] dark:bg-[#1c1c1e] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform-gpu ring-1 ring-black/5 dark:ring-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2.5 cursor-pointer hover:bg-[#E6E6E6] dark:hover:bg-zinc-800 rounded-full bg-[#F5F5F5] dark:bg-zinc-800/80 backdrop-blur-md text-zinc-800 dark:text-zinc-200 transition-all"
        >
          <X size={20} />
        </button>

        <div
          className={`flex-1 ${
            type === 'project' || type === 'about' || type === 'skills'
              ? 'custom-scrollbar-show'
              : 'custom-scrollbar'
          }`}
        >           {type === 'about' && <AboutContent />}
           {type === 'skills' && <SkillsContent />}
           {type === 'playlist' && <PlaylistContent />}
           {type === 'project' && <ProjectContent project={data} onNavigate={onNavigate} />}
        </div>
      </motion.div>
    </div>
  );
};

const ProjectContent = ({ project, onNavigate }: { project: Project, onNavigate?: (type: ModalType, data: any, layoutId?: string) => void }) => {
  if (!project) return null;

  return (
    <div className="w-full bg-[#fbfbfd] dark:bg-[#1c1c1e] font-sans">
       <div className="w-full h-[40vh] md:h-[55vh] min-h-[300px] bg-zinc-100 dark:bg-zinc-900 relative group overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover scale-101 transition-transform duration-1000 group-hover:scale-105" 
          />
       </div>
       
       <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start border-b border-zinc-200 dark:border-zinc-800 pb-10 mb-10">
              <div className="space-y-4">
                  <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300">
                        {project.category}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        <Calendar size={12} /> {project.year}
                      </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium text-lg">
                     <User size={20} />
                     <span>{project.role}</span>
                  </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                 {project.liveUrl && (
                   <a href={project.liveUrl} target="_blank" className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 ">
                      Visit Site <ExternalLink size={16} />
                   </a>
                 )}
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-16">
                 <section>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">About</h3>
                    <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
                       {project.longDescription}
                    </div>
                 </section>
                 
                 <section>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Gallery</h3>
                    <div className="space-y-8">
                       {project.gallery?.map((media, i) => {
                          const isVideo = media.endsWith('.mp4');
                          return (
                            <div key={i} className="rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                {isVideo ? (
                                    <video src={media} controls className="w-full h-auto" />
                                ) : (
                                    <img src={media} alt="Project screenshot" className="w-full h-auto" />
                                )}
                            </div>
                          );
                       })}
                    </div>
                 </section>
              </div>

              <div className="lg:col-span-4 space-y-10">
                 <div className="p-6 rounded-3xl bg-[#F5F5F5] dark:bg-zinc-800/80  border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-700  text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            {tag}
                          </span>
                       ))}
                    </div>
                 </div>

                 {onNavigate && (
                   <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 px-1">More Projects</h4>
                      <div className="space-y-3">
                         {PROJECTS.filter(p => p.id !== project.id).map(p => (
                            <div 
                                key={p.id} 
                                onClick={() => onNavigate('project', p, `hero-card-${p.id}`)} 
                                className="group flex items-center gap-4 p-3 rounded-2xl bg-[#F5F5F5] dark:bg-zinc-800 hover:bg-[#E5E4E2] dark:hover:bg-zinc-800 transition-all cursor-pointer  hover:shadow-md"
                            >
                               <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-zinc-200 dark:bg-zinc-900" alt={p.title} />
                               <div>
                                  <h5 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-blue-500 transition-colors">{p.title}</h5>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">{p.category}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                 )}
              </div>
          </div>
       </div>
    </div>
  );
};

const AboutContent = () => (
  <div className="w-full bg-[#fbfbfd] dark:bg-[#1c1c1e] min-h-full">
    <div className="relative h-[40vh] w-full overflow-hidden shrink-0">
       <img 
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
        alt="Workspace" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      
       <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
            Ryan Lyncee
          </h2>
          <p className="text-xl text-white/90 font-medium drop-shadow-sm">
            Frontend Engineer & Designer
          </p>
       </div>
    </div>

    <div className="max-w-5xl mx-auto p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12">
       <div className="md:col-span-8 space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Biography</h3>
            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed space-y-6">
                <p>
                    I’m a Computer Engineering student at Florida International University, graduating in 2028, with a 3.96 GPA. I’ve been on the Dean’s List during my time at FIU.
                </p>
                <p>
                    I mostly work with JavaScript, TypeScript, and Java, and I spend a lot of time building websites with React and Node.js. I like working on projects that involve things like Socket.io and Redis, and I use Docker and Figma as part of my workflow.
                </p>
            </div>
          </section>
          
          <section>
             <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Experience</h3>
             <div className="space-y-8 border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 pl-8 relative">
                {[
                  { 
                    role: 'Independent Contributor (AI Research)', 
                    company: 'Handshake AI Fellowship', 
                    year: '2025 – Present', 
                    desc: 'Evaluated AI system outputs across varied input types, identifying inconsistencies. Performed comparative reviews of model configurations to refine review criteria.' 
                  },
                  { 
                    role: 'Frontend Developer', 
                    company: 'INIT (Build Program)', 
                    year: '2025', 
                    desc: 'Led frontend architecture for WhiteFlow. Architected a custom SPA framework using the History API and optimized Canvas rendering for real-time collaboration.' 
                  }
                ].map((job, i) => (
                   <div key={i} className="relative">
                      <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800" />
                      <h4 className="font-bold text-lg text-zinc-900 dark:text-white">{job.role}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-2">{job.company} • {job.year}</p>
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{job.desc}</p>
                   </div>
                ))}
             </div>
          </section>
       </div>

       <div className="md:col-span-4 space-y-8">
           <div className="p-8 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6">Contact & Info</h4>
              <ul className="space-y-5">
                 <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-200 font-medium">
                    <MapPin size={20} className="text-zinc-400 shrink-0 mt-0.5" />
                    <span>Miami, FL (EST)</span>
                 </li>
                 <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-200 font-medium">
                    <GraduationCap size={20} className="text-zinc-400 shrink-0 mt-0.5" />
                    <span>Florida International University</span>
                 </li>
                 <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-200 font-medium">
                    <Mail size={20} className="text-zinc-400 shrink-0 mt-0.5" />
                    <a href="mailto:ryanlyncee29@gmail.com" className="hover:text-blue-500 transition-colors">ryanlyncee29@gmail.com</a>
                 </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700/50 flex gap-4">
                  <a href="https://github.com/ryanlyn29" className="p-3 rounded-full bg-white dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-transform text-zinc-900 dark:text-white">
                      <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/ryanlyncee" className="p-3 rounded-full bg-[#0077b5] hover:bg-[#0c6392] transition-transform text-white">
                      <Linkedin size={20} />
                  </a>
              </div>
              
              <button className="w-full mt-6 py-3.5 cursor-pointer bg-zinc-900 dark:bg-white hover:opacity-90 text-white dark:text-black rounded-full font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                 <Download size={16} />
                 Download Resume
              </button>
           </div>
       </div>
    </div>
  </div>
);

const SkillsContent = () => {
  return (
   <div className="w-full bg-[#fbfbfd] dark:bg-[#1c1c1e] min-h-full flex flex-col custom-scrollbar-show">
    <div className="relative h-[40vh] w-full bg-[#050505] shrink-0 overflow-hidden flex flex-col justify-end p-8 md:p-12 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
          bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-zinc-300 text-xs font-medium mb-6 border border-white/10 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="tracking-wide">System Status: Optimal</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Technical Stack
           </h2>
           <p className="text-zinc-400 mt-4 text-lg max-w-xl leading-relaxed">
               A curated collection of tools and technologies I use to build digital products.
           </p>
        </div>
    </div>

    <div className="flex-1 p-8 md:p-12 bg-[#fbfbfd] dark:bg-[#1c1c1e]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {['Tech', 'Design', 'Soft'].map((category) => (
                <div key={category} className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-1 rounded-full ${category === 'Tech' ? 'bg-blue-500' : category === 'Design' ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                        <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                            {category}
                        </h3>
                    </div>
                    <div className="space-y-5">
                        {SKILLS.filter(s => s.category === category).map((skill, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-zinc-900 dark:text-white text-lg">{skill.name}</span>
                                    <span className="text-xs font-mono font-medium text-zinc-400">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={`h-full rounded-full ${category === 'Tech' ? 'bg-blue-500' : category === 'Design' ? 'bg-purple-500' : 'bg-emerald-500'}`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
   </div>
  );
};

const PlaylistContent = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const currentVideo = VIDEO_ITEMS[currentVideoIndex];

  const playVideo = (index: number) => {
    if (index === currentVideoIndex) {
        togglePlay();
    } else {
        setCurrentVideoIndex(index);
        setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.load();
        if (isPlaying) videoRef.current.play();
    }
  }, [currentVideoIndex]);

  return (
    <div className="flex flex-col lg:flex-row h-full font-sans bg-black text-white">
        <div className="w-full lg:w-7/12 bg-[#121212] flex flex-col justify-center items-center p-8 relative border-b lg:border-b-0 lg:border-r border-[#282828]">
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
                 <div className="relative w-full aspect-video bg-[#282828] rounded-xl overflow-hidden shadow-2xl">
                     <video
                        ref={videoRef}
                        src={currentVideo.video}
                        poster={currentVideo.poster}
                        className="w-full h-full object-cover"
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                     />
                     <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        onClick={togglePlay}
                     >
                         <div className="w-16 h-16 rounded-full bg-green-500 text-black flex items-center justify-center hover:scale-105 transition-transform">
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                         </div>
                     </div>
                 </div>

                 <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">{currentVideo.title}</h2>
                        <p className="text-[#b3b3b3] font-medium text-lg">{currentVideo.channel}</p>
                    </div>
                    <button className="p-3 rounded-full hover:bg-[#282828] text-[#b3b3b3] hover:text-white transition-colors">
                        <Heart size={24} />
                    </button>
                 </div>
            </div>
        </div>

        <div className="w-full lg:w-5/12 flex flex-col bg-[#121212]">
             <div className="p-6 pt-8">
                <h3 className="text-xl font-bold text-white mb-4">Up Next</h3>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4">
                 <div className="flex flex-col gap-1">
                     {VIDEO_ITEMS.map((item, index) => (
                         <div 
                            key={item.id}
                            onClick={() => playVideo(index)}
                            className={`group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                                currentVideoIndex === index 
                                    ? 'bg-[#282828]' 
                                    : 'hover:bg-[#2a2a2a]'
                            }`}
                         >
                             <div className="w-6 flex justify-center text-[#b3b3b3] text-sm font-variant-numeric tabular-nums">
                                 {currentVideoIndex === index && isPlaying ? (
                                     <BarChart2 size={14} className="text-green-500 animate-pulse" />
                                 ) : (
                                     <span className="group-hover:hidden">{index + 1}</span>
                                 )}
                                 <Play size={12} className="hidden group-hover:block text-white" fill="currentColor" />
                             </div>

                             <div className="w-10 h-10 rounded bg-[#282828] overflow-hidden shrink-0">
                                 <img src={item.poster} className="w-full h-full object-cover" />
                             </div>
                             
                             <div className="flex-1 min-w-0 flex flex-col justify-center">
                                 <h4 className={`text-sm font-medium truncate ${currentVideoIndex === index ? 'text-green-500' : 'text-white'}`}>
                                     {item.title}
                                 </h4>
                                 <p className="text-xs text-[#b3b3b3] truncate">{item.channel}</p>
                             </div>

                             <span className="text-xs text-[#b3b3b3] font-variant-numeric tabular-nums pr-2">
                                {item.duration}
                             </span>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    </div>
  );
};