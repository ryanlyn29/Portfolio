import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Instagram, Twitter, Linkedin, Send, Github } from 'lucide-react';
import { BentoCard } from './ui/BentoCard';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 2000);
  };

  return (
    <div id="contact" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
      <BentoCard 
        colSpan="lg:col-span-1" 
        hideDefaultBackground
        className="p-8 justify-between 
        bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur-md border border-orange-200 dark:border-orange-900/50
        hover:bg-orange-100/80 dark:hover:bg-orange-900/40 transition-colors rounded-2xl"
      >
         <div>
           <div className="w-10 h-10 bg-orange-950 dark:bg-white text-orange-200 dark:text-orange-950 flex items-center justify-center mb-6 rounded-xl">
             <Mail size={20} />
           </div>
           <h2 className="text-2xl font-bold mb-2 text-orange-950 dark:text-white uppercase tracking-tight">Transmission.</h2>
           <p className="text-orange-900/70 dark:text-orange-200/70 font-mono text-sm">Open channel for new directives.</p>
         </div>
         
         <div className="space-y-4 mt-12">
           {['/ryanlyn29', '/in/ryanlyncee'].map((handle, i) => (
             <a key={i} href="#" className="flex items-center gap-4 text-orange-900/80 dark:text-orange-100/80 hover:text-orange-950 dark:hover:text-white transition-colors group">
                <div className="w-8 h-8 flex items-center justify-center bg-orange-950/10 dark:bg-orange-100/10 group-hover:bg-orange-950/20 dark:group-hover:bg-orange-100/20 rounded-lg">
                   { i === 0 ? <Github size={16}/> : <Linkedin size={16}/>}
                </div>
                <span className="font-mono text-xs tracking-wider">{handle}</span>
             </a>
           ))}
         </div>
      </BentoCard>

      <BentoCard 
        colSpan="lg:col-span-2" 
        hideDefaultBackground
        className="p-8 md:p-12 relative 
        bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-md border border-slate-300 dark:border-slate-700/50 rounded-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 font-mono text-sm"
                placeholder="AGENT NAME"
                required
              />
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 font-mono text-sm"
                placeholder="CONTACT FREQUENCY (EMAIL)"
                required
              />
          </div>
          
          <div className="relative group grow">
              <textarea 
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full h-full min-h-[200px] bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-6 text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none font-mono text-sm"
                  placeholder="ENTER BRIEFING..."
                  required
              />
          </div>

          <button 
            type="submit" 
            disabled={isSending} 
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2 font-mono text-sm shadow-lg shadow-slate-900/10"
          >
              {isSending ? 'TRANSMITTING...' : sent ? 'TRANSMISSION COMPLETE' : 'SEND TRANSMISSION'}
              {!isSending && !sent && <Send size={16} />}
          </button>
        </form>

        <AnimatePresence>
          {sent && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-100 dark:bg-slate-900 z-20 flex flex-col items-center justify-center text-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl"
             >
               <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center mb-6"
               >
                  <ArrowRight className="text-white dark:text-slate-900 w-6 h-6 -rotate-45" />
               </motion.div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Acknowledged.</h3>
               <p className="text-slate-500 dark:text-slate-300 mt-2 font-mono text-xs">Stand by for response.</p>
             </motion.div>
          )}
        </AnimatePresence>
      </BentoCard>
    </div>
  );
};