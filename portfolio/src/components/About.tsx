import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cpu, Code, Zap, User, Activity } from 'lucide-react';

export const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const fadeInSlideUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number = 0) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
        delay 
      }
    })
  };

  const fadeInSlideRight: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] 
      }
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-6 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <motion.div 
            className="lg:col-span-5 relative"
            style={{ y: yParallax, willChange: "transform" }}
          >
             <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInSlideRight}
                className="relative h-full min-h-[500px] rounded-2xl overflow-hidden border border-zinc-900/10 dark:border-white/10 bg-zinc-200/50 dark:bg-zinc-900/50 backdrop-blur-md flex flex-col p-6 group"
             >
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
                />
                
                <div className="flex justify-between items-start z-10 w-full">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20 text-teal-600 dark:text-teal-400">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Identity_Core</p>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">OPERATOR</p>
                        </div>
                    </div>
                    <Activity className="text-teal-500 animate-pulse" size={20} />
                </div>

                <div className="relative flex-1 flex items-center justify-center py-8 z-10">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 rounded-full border border-dashed border-zinc-400/30 dark:border-white/20 absolute"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="w-36 h-36 rounded-full border border-zinc-400/30 dark:border-white/20 absolute"
                    />
                    <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                        <Cpu size={40} className="text-teal-600 dark:text-teal-400" />
                    </div>
                </div>

                <div className="mt-auto z-10 w-full">
                    <div className="bg-zinc-900/5 dark:bg-black/40 rounded-lg p-4 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 border border-zinc-900/5 dark:border-white/5 space-y-1">
                        <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                            <span className="text-teal-500">SYS.LOG</span>
                            <span>STATUS: ONLINE</span>
                        </div>
                        <p>{'> Initializing profile...'}</p>
                        <p>{'> Loading assets: '}<span className="text-teal-500">COMPLETE</span></p>
                        <p>{'> Connecting to server...'}</p>
                        <p>{'> '}<span className="animate-pulse">_</span></p>
                    </div>
                </div>

                <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/20 transition-colors duration-500 rounded-2xl pointer-events-none" />
             </motion.div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            
            <motion.div 
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInSlideUp}
                className="border-l-2 border-zinc-900/20 dark:border-white/20 pl-6"
            >
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
                    <Code size={14} />
                    <span>// BIOGRAPHY_LOG</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white leading-tight uppercase">
                    About Me<br/>
                </h2>
            </motion.div>

            <motion.div 
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInSlideUp}
                className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 p-6 md:p-8 rounded-xl font-mono text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
                <p className="mb-4">
                    <span className="text-teal-600 dark:text-teal-400 mr-2">root@ryan:~$</span>
                        I am a Computer Engineering student at FIU with a 3.96 GPA. I enjoy building websites and turning ideas into working projects. I learn best by trying things out, making mistakes, and improving the code until it feels right.
                </p>
                <p>
                    <span className="text-teal-600 dark:text-teal-400 mr-2">root@ryan:~$</span>
                    I have collaborated in projects like <strong className="text-zinc-900 dark:text-white">WhiteFlow</strong>, a real time drawing and collaboration tool; <strong className="text-zinc-900 dark:text-white">AgentGuard</strong>, a dashboard that tests the safety of AI systems; and <strong className="text-zinc-900 dark:text-white">Clinix</strong>, a small healthcare assistant using React and FastAPI.
                </p>
                <p className="mt-4">
                    <span className="text-teal-600 dark:text-teal-400 mr-2">root@ryan:~$</span>
                    I am involved in INIT, ShellHacks, Code Crunch, and ColorStack. I work with other students, practice algorithms, and learn new skills that help me improve as a builder.      
                </p>
                <div className="mt-4 flex gap-2">
                    <span className="animate-pulse text-teal-500">_</span>
                </div>
            </motion.div>

            <motion.div 
                custom={0.4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInSlideUp}
            >
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-white/10 pb-2">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">System_Capabilities</h3>
                    <Cpu size={14} className="text-zinc-400" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SKILLS.map((skill, i) => (
                        <motion.div 
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                            viewport={{ once: true }}
                            className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-3 rounded-lg hover:border-teal-500/50 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Zap size={12} className="text-zinc-400 group-hover:text-teal-400 transition-colors" />
                                <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-600">{skill.level}%</span>
                            </div>
                            <p className="font-bold text-xs uppercase tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {skill.name}
                            </p>
                            <div className="absolute bottom-0 left-0 h-0.5 bg-teal-500 transition-all duration-500 w-0 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};