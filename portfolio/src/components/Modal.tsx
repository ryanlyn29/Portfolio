import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, ChevronRight, MapPin, Briefcase, GraduationCap, Download, Play, Pause, Heart, MoreHorizontal, Music2, BarChart2 } from 'lucide-react';
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

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, data, onNavigate, layoutId }) => {
  useEffect(() => {
    
  }, [isOpen]);

  const renderContent = () => {
    switch (type) {
      case 'about':
        return <AboutContent />;
      case 'skills':
        return <SkillsContent />;
      case 'playlist':
        return <PlaylistContent />;
      case 'project':
      default:
        return <ProjectContent project={data} onNavigate={onNavigate} />;
    }
  };

  const finalLayoutId = layoutId || (type === 'project' && data ? `hero-card-${data.id}` : `hero-card-${type}`);

  return (
    <AnimatePresence>
      {isOpen && type && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-100/90 dark:bg-black/90 pointer-events-auto backdrop-blur-sm"
          />
          <motion.div
            layoutId={finalLayoutId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 90, damping: 15, mass: 1 }}
            style={{ willChange: 'transform, opacity' }}
            className="relative w-full max-w-6xl max-h-[85vh] overflow-hidden bg-[#fdfbf7] dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl z-10 flex flex-col pointer-events-auto transform-gpu"
          >
            <button 
              onClick={onClose}
              className="absolute cursor-pointer top-6 right-8 z-50 p-2.5 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-zinc-900 dark:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all hover:scale-110  group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="w-full h-full overflow-y-auto custom-scrollbar ">
               {renderContent()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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

  const [liked, setLiked] = useState(false);
  
  
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.load();
        if (isPlaying) videoRef.current.play();
    }
  }, [currentVideoIndex]);
  

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[650px]">
        
        <div className="w-full lg:w-8/12 bg-black relative flex flex-col group/player">
            <div className="flex-1 relative bg-zinc-900 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 scale-110"
              style={{ backgroundImage: `url(${currentVideo.poster})` }}
            />                 
                 <video
                    ref={videoRef}
                    src={currentVideo.video}
                    poster={currentVideo.poster}
                    className="absolute inset-0 scale-101 w-full h-full object-contain z-10"
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                 />
                 
                 
                 <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 opacity-0 group-hover/player:opacity-100 transition-all duration-300 translate-y-4 group-hover/player:translate-y-0">
                     <div className="flex items-center gap-6">
                        <button onClick={togglePlay} className="w-14 h-14 rounded-full cursor-pointer bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-white/20">
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-xl mb-1">{currentVideo.title}</h3>
                            <div className="flex items-center gap-2 text-zinc-300 text-sm">
                                <span className="font-medium">{currentVideo.channel}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-500" />
                                <span>{currentVideo.plays} views</span>
                            </div>
                        </div>
                        <div className="flex gap-3 text-white/70">
                        <Heart
                          onClick={(e) => {
                            e.stopPropagation();
                            setLiked((prev) => !prev);
                          }}
                          className={`
                            cursor-pointer transition-colors
                            ${liked ? "text-green-500 fill-green-500" : "text-zinc-400"}
                            hover:text-green-500 transition-colors
                          `}/>                            
                          <MoreHorizontal className="hover:text-white cursor-pointer transition-colors" />
                        </div>
                     </div>
                 </div>
            </div>
        </div>

        
        <div className="w-full lg:w-4/12 bg-zinc-50 dark:bg-[#0c0c0e] border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
             <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <Music2 className="text-green-500" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Featured Playlist</h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase">Curated by Ryan</p>
                    </div>
                </div>
                
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-widest px-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/50">
                    <span>Title</span>
                    <span>Time</span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pt-0 space-y-1">
                 {VIDEO_ITEMS.map((item, index) => (
                     <div 
                        key={item.id}
                        onClick={() => playVideo(index)}
                        className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            currentVideoIndex === index 
                                ? 'bg-white dark:bg-zinc-800 shadow-sm scale-[1.02]' 
                                : 'hover:bg-zinc-200/50 dark:hover:bg-zinc-900'
                        }`}
                     >
                         <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0  transition-shadow">
                             <img src={item.poster} className={`w-full h-full object-cover transition-opacity ${currentVideoIndex === index ? 'opacity-40' : ''}`} alt={item.title} />
                             
                             
                             <div className="absolute inset-0 flex items-center justify-center">
                                 {currentVideoIndex === index ? (
                                     isPlaying ? (
                                        <div className="flex items-end gap-[2px] h-4 pb-1">
                                            <span className="w-[3px] bg-green-500 animate-[bounce_1s_infinite] h-2" />
                                            <span className="w-[3px] bg-green-500 animate-[bounce_1.2s_infinite] h-4" />
                                            <span className="w-[3px] bg-green-500 animate-[bounce_0.8s_infinite] h-3" />
                                        </div>
                                     ) : <Pause size={16} className="text-green-500 fill-current" />
                                 ) : (
                                      <Play size={16}
                                        className={`${
                                          index % 2 === 0 ? 'text-green-500' : 'text-white'
                                        } fill-current opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100`}
                                      />                                 
        )}
                             </div>
                         </div>
                         
                         <div className="flex-1 min-w-0">
                             <h4 className={`text-sm font-bold truncate mb-0.5 ${currentVideoIndex === index ? 'text-green-600 dark:text-green-400' : 'text-zinc-900 dark:text-zinc-200'}`}>
                                 {item.title}
                             </h4>
                             <p className="text-xs text-zinc-500 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{item.channel}</p>
                         </div>
                         
                         <div className="text-xs text-zinc-400 font-mono font-medium">
                             {item.duration}
                         </div>
                     </div>
                 ))}
             </div>
             
             
             <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <BarChart2 size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">Monthly Listeners</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-zinc-900 dark:text-white">2,845,912</span>
                </div>
             </div>
        </div>
    </div>
  );
};

const ProjectContent = ({ project, onNavigate }: { project: Project, onNavigate?: (type: ModalType, data: any, layoutId?: string) => void }) => {
  const isOdd = (project.gallery?.length || 0) % 2 !== 0;

  if (!project) return null; 

  const otherProjects = PROJECTS.filter(p => p.id !== project.id);

  return (
    <>
      
      <div className="relative h-64 md:h-96 w-full shrink-0 group overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-20 dark:opacity-40"
            style={{ backgroundColor: project.themeColor }}  
          />
          <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] dark:from-[#09090b] via-[#fdfbf7]/80 dark:via-[#09090b]/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <span 
              className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-zinc-900 dark:text-white border border-black/5 dark:border-white/10"
            >
              {project.category}
            </span>
            <h2 
              className="text-4xl md:text-7xl font-sans font-bold text-zinc-900 dark:text-white tracking-tight leading-none"
            >
              {project.title}
            </h2>
          </div>
      </div>

     
      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                Project Overview
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              {project.longDescription}
              </p>
          </div>
          
          <div className="pt-4">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              Project Gallery <ChevronRight size={16} className="text-zinc-400" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery?.map((media, i) => {
                const isVideo = media.endsWith('.mp4') || media.endsWith('.webm');
                return (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm group ${
                    isOdd && i === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                    <div className="relative overflow-hidden w-full h-full bg-zinc-100 dark:bg-zinc-800">
                        {isVideo ? (
                           <video 
                              src={media} 
                              className="w-full h-full object-cover aspect-video" 
                              controls 
                              playsInline 
                           />
                        ) : (
                           <>
                             <img src={media} alt={`Gallery ${i}`} className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                           </>
                        )}
                    </div>
                </div>
              )})}
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          <div className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white mb-6">
              <Calendar size={18} className="text-zinc-400" />
              <span className="font-mono text-sm font-bold">{project.year}</span>
            </div>
            
            <div className="mb-8">
                <h5 className="text-xs font-mono text-zinc-500 uppercase mb-3 font-bold tracking-wider">Tech Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 rounded-lg font-medium border border-zinc-200 dark:border-zinc-700">
                      {tag}
                  </span>
                  ))}
                </div>
            </div>

            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-full text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all  active:scale-95 group"
            >
              <ExternalLink size={18} className="" />
              View Project
            </a>
          </div>
          
          <div className="p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
              <h5 className="text-xs font-mono text-zinc-500 uppercase mb-2 font-bold tracking-wider">Role</h5>
              <p className="text-zinc-900 dark:text-white font-medium text-lg">{project.role}</p>
          </div>

          
          {onNavigate && (
            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
               <h5 className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-wider">Other Projects</h5>
               {otherProjects.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => onNavigate('project', p, `hero-card-${p.id}`)} 
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-[1.02] transition-all group"
                  >
                      <img src={p.image} className="w-12 h-12 rounded-xl object-cover" alt={p.title} />
                      <div className="min-w-0">
                         <h6 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors truncate">{p.title}</h6>
                         <span className="text-xs text-zinc-500 truncate block">{p.category}</span>
                      </div>
                  </div>
               ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

const AboutContent = () => (
  <>
<div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0 ">
       <img 
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
        alt="Workspace" 
        className="w-full h-full object-cover scale-105 transition-transform duration-700 will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] dark:from-[#09090b] to-transparent pointer-events-none" />
       
       <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
            Ryan <span className="text-zinc-500">Lyncee</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-medium">
            Computer Engineering Student & Frontend Developer
          </p>
       </div>
    </div>

    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12">
       <div className="md:col-span-7 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Biography</h3>
            
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-4">
                    I’m a Computer Engineering student at Florida International University, graduating in 2028, with a 3.96 GPA. I’ve been on the Dean’s List during my time at FIU.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    I mostly work with JavaScript, TypeScript, and Java, and I spend a lot of time building websites with React and Node.js. I like working on projects that involve things like Socket.io and Redis, and I use Docker and Figma as part of my workflow.
                </p>
            </div>
          
          <div>
             <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Experience</h3>
             <div className="space-y-6">
                {[
                  { 
                    role: 'Independent Contributor (AI Research)', 
                    company: 'Handshake AI Fellowship', 
                    year: 'Nov 2025 – Present', 
                    desc: 'Evaluated AI system outputs across varied input types, identifying inconsistencies and deviations from expected behavior. Performed comparative reviews of multiple model configurations, documenting findings to support the refinement of review criteria under strict confidentiality.' 
                  },
                  { 
                    role: 'Frontend Developer', 
                    company: 'INIT (Build Program)', 
                    year: 'Sep 2025 – Dec 2025', 
                    desc: 'Led frontend architecture for WhiteFlow in a 12-person agile team, architecting a custom SPA framework using the History API. Collaborated with backend engineers to standardize Socket.io events and resolved critical HTML5 Canvas rendering bottlenecks to improve collaboration performance.' 
                  }
                ].map((job, i) => (
                   <div key={i} className="pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 transition-colors">
                      <div className="flex justify-between items-baseline mb-1">
                         <h4 className="font-bold text-zinc-900 dark:text-white">{job.role}</h4>
                         <span className="text-xs font-mono text-zinc-500">{job.year}</span>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">{job.company}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{job.desc}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>

       <div className="md:col-span-5 space-y-6">
           <div className="p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6">Connect</h4>
              <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-zinc-900 dark:text-white">
                    <MapPin size={18} className="text-zinc-400" />
                    <span>Miami, FL</span>
                 </li>
                 <li className="flex items-center gap-3 text-zinc-900 dark:text-white">
                    <GraduationCap size={18} className="text-zinc-400" />
                    <span>Florida International University</span>
                 </li>
                 <li className="flex items-center gap-3 text-zinc-900 dark:text-white">
                    <Briefcase size={18} className="text-zinc-400" />
                    <span>Open to Opportunities</span>
                 </li>
              </ul>
              
              <button className="w-full mt-8 py-3 cursor-pointer bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 group">
                 <Download size={16} className="" />
                 Download Resume
              </button>
           </div>
       </div>
    </div>
  </>
);

const SkillsContent = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech': return 'bg-blue-500';
      case 'Design': return 'bg-purple-500';
      case 'Soft': return 'bg-emerald-500';
      default: return 'bg-zinc-500';
    }
  };
  
  const getCategoryBorder = (category: string) => {
    switch (category) {
      case 'Tech': return 'bg-blue-500';
      case 'Design': return 'bg-purple-500';
      case 'Soft': return 'bg-emerald-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
   <>
    <div className="relative h-64 w-full bg-zinc-900 dark:bg-zinc-950 flex flex-col justify-end p-8 md:p-12 shrink-0 overflow-hidden relative">
       
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-mono mb-4 border border-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Status: Optimal</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight relative">
              Technical <span className='text-zinc-500'>Stack</span>
           </h2>
        </div>
    </div>

    <div className="p-8 md:p-12 bg-[#fdfbf7] dark:bg-[#09090b]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {['Tech', 'Design', 'Soft'].map((category) => (
                <div key={category} className="space-y-6">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3">
                        <span className={`w-8 h-[2px] rounded-full ${getCategoryBorder(category)}`}></span>
                        {category}
                    </h3>
                    <div className="space-y-4">
                        {SKILLS.filter(s => s.category === category).map((skill, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-zinc-900 dark:text-zinc-100 text-lg transition-transform will-change-transform">{skill.name}</span>
                                    <span className="text-xs font-mono text-zinc-400">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${getCategoryColor(category)} opacity-90 group-hover:opacity-100 transition-opacity`} 
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800  relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Currently Exploring</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
                        I am constantly expanding my toolkit. Right now, I'm deep diving into WebGL shaders and low-level Rust programming to understand the metal.
                    </p>
                </div>
                <div className="flex gap-2">
                   {['Rust', 'WebGL', 'WASM'].map(tag => (
                       <span key={tag} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold font-mono rounded-lg text-xs border border-zinc-200 dark:border-zinc-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                           {tag}
                       </span>
                   ))}
                </div>
            </div>
        </div>
    </div>
   </>
  );
};