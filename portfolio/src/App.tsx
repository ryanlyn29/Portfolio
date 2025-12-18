import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavBar } from './components/NavBar';
import { BentoCard } from './components/BentoCard';
import { VideoCard } from './components/VIdeoCard';
import { PROJECTS } from './constants';
import { 
  ArrowUpRight, Plus, ChevronLeft, ChevronRight,
  Github, Code2, Linkedin, User, Layers, Mail, Copy, CheckCircle,
  Calendar as CalendarIcon, Cloud, Calculator, CheckSquare, Music, Twitter,
  Search, Grid, Settings, Smartphone, Wifi, BatteryFull, X,
  ShieldCheck, Heart, Terminal, MousePointer2, Cpu, Database, Layout, Globe,
  Move, TextCursor
} from 'lucide-react';
import { Modal } from './components/Modal';
import { motion, AnimatePresence } from 'framer-motion';

type ModalState = {
  isOpen: boolean;
  type: 'project' | 'about' | 'skills' | 'playlist' | null;
  data: any;
  layoutId?: string;
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

const ToolsPage = () => {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const today = now.getDate();
  const monthName = now.toLocaleString('en-US', { month: 'long' });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);


    const compute = (exp: string) => {
    try {
        const sanitized = exp.replace(/×/g, '*').replace(/÷/g, '/');
        const result = Function(`"use strict"; return (${sanitized})`)();
        return Number.isFinite(result) ? result.toString() : 'Error';
    } catch {
        return 'Error';
    }
    };


    const handlePress = (value: any) => {
        if (value === 'C') {
            setDisplay('0');
            setExpression('');
            setWaitingForOperand(false);
            return;
        }

        if (value === '±') {
            setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
            return;
        }

        if (value === '%') {
            setDisplay(prev => (parseFloat(prev) / 100).toString());
            return;
        }

        if (['+', '-', '×', '÷'].includes(value)) {
            setExpression(prev =>
            prev
                ? `${prev} ${value}`
                : `${display} ${value}`
            );
            setWaitingForOperand(true);
            return;
        }

        if (value === '=') {
            if (!expression) return;
            const result = compute(`${expression} ${display}`);
            setDisplay(result);
            setExpression('');
            setWaitingForOperand(false);
            return;
        }

        if (value === '.') {
            if (display.includes('.')) return;
            setDisplay(prev => prev + '.');
            return;
        }

        setDisplay(prev =>
            waitingForOperand || prev === '0'
            ? value.toString()
            : prev + value.toString()
        );
        setWaitingForOperand(false);
    };

    const [tasks, setTasks] = useState([
    { id: 1, txt: 'Review PRs', done: true },
    { id: 2, txt: 'Update Portfolio', done: false },
    { id: 3, txt: 'Client Meeting', done: false }
    ]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [draftText, setDraftText] = useState('');

    const pendingCount = tasks.filter(t => !t.done).length;

    const toggleTask = (id: number) => {
    setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
    };

    const addTask = () => {
    const id = Date.now();
    setTasks(prev => [...prev, { id, txt: 'New Task', done: false }]);
    setEditingId(id);
    setDraftText('New Task');
    };

    const removeTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    };

    const startEdit = (task: any) => {
    setEditingId(task.id);
    setDraftText(task.txt);
    };

    const saveEdit = () => {
    if (editingId === null) return;
    setTasks(prev =>
        prev.map(t =>
        t.id === editingId ? { ...t, txt: draftText.trim() || t.txt } : t
        )
    );
    setEditingId(null);
    };

    const cancelEdit = () => {
    setEditingId(null);
    setDraftText('');
};


  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-8 pt-12 md:pt-16 pb-32 content-start w-full max-w-[1920px] mx-auto">
      <BentoCard colSpan="md:col-span-8" className="bg-zinc-200/60 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 min-h-[140px] !p-6">
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

      <BentoCard colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bg-zinc-200/60 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 p-5 !p-5">
        <div className="flex justify-between items-center mb-4 px-4 pt-4">
          <span className="font-bold text-lg text-zinc-900 dark:text-white">{monthName}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 font-medium">{year}</span>
            <div className="p-1.5  bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <CalendarIcon size={14} className="text-zinc-500 dark:text-zinc-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <div
                key={day}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-xs font-medium transition-all mx-auto
                  ${
                    day === today
                      ? 'bg-[#318CE7]  text-white font-bold cursor-pointer'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 cursor-pointer'
                  }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="w-1 h-8 bg-[#318CE7] rounded-full" />
            <div className="flex-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Next Up</p>
              <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">Project Launch Meeting</p>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">10:00</span>
          </div>
        </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" noPadding className="flex flex-col border-none">
        <div className="bg-[#facc15] p-6 pb-3">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-black/5 rounded-lg">
                <CheckSquare size={18} className="text-zinc-900" />
                </div>
                <h3 className="font-bold text-lg text-zinc-900">Tasks</h3>
            </div>
            <span className="px-2 py-1 bg-white/30 rounded-md text-xs font-bold text-zinc-900 backdrop-blur-md">
                {pendingCount} Pending
            </span>
            </div>
        </div>

        <div className="flex-1 bg-zinc-200/60 dark:bg-[#1c1c1e] p-6 pt-4">
            <div className="space-y-3">
            {tasks.map(task => (
                <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                        task.done
                        ? 'bg-zinc-900 border-zinc-900 dark:bg-white dark:border-white'
                        : 'border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-900 dark:group-hover:border-white'
                    }`}
                >
                    {task.done && (
                    <Plus size={12} className="text-white dark:text-black rotate-45 stroke-[4]" />
                    )}
                </div>

                {editingId === task.id ? (
                    <input
                    value={draftText}
                    autoFocus
                    onChange={e => setDraftText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                    }}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 bg-transparent text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none border-b border-zinc-300 dark:border-zinc-600"
                    />
                ) : (
                    <span
                    onClick={e => {
                        e.stopPropagation();
                        startEdit(task);
                    }}
                    className={`flex-1 text-sm font-medium
                        ${task.done ? 'line-through opacity-50' : 'opacity-90'}
                        text-zinc-700 dark:text-zinc-200`}
                    >
                    {task.txt}
                    </span>
                )}

                <button
                    onClick={e => {
                    e.stopPropagation();
                    removeTask(task.id);
                    }}
                    className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-500"
                >
                    <X size={14} />
                </button>
                </div>
            ))}
            </div>

            <button
            onClick={addTask}
            className="mt-4 w-full py-2 cursor-pointer rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-all"
            >
            Add Task
            </button>
        </div>
        </BentoCard>

      <BentoCard colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bg-zinc-200/60 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white !p-6">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-end items-end mb-6 space-y-1">
            <span className="text-zinc-400 text-xs font-mono">{expression}</span>
            <span className="text-4xl font-semibold tracking-tight">{display}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {['C', '±', '%', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map((btn, i) => (
              <button
                key={i}
                onClick={() => handlePress(btn)}
                className={`
                  h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all active:scale-95 cursor-pointer
                  ${btn === '='
                    ? 'col-span-2 bg-[#F57D28] hover:bg-[#e06d1a] text-white'
                    : typeof btn === 'number' || btn === '.'
                      ? 'bg-white dark:bg-[#2c2c2e] hover:bg-[#F7F7F7] dark:hover:bg-[#3a3a3c] text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-300 hover:bg-zinc-400/45 dark:bg-[#3a3a3c] dark:hover:bg-[#4a4a4c] text-zinc-900 dark:text-orange-400 font-bold'}
                `}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard colSpan="md:col-span-4" className="bg-zinc-200/60 dark:bg-[#1c1c1e] border-zinc-200 dark:border-zinc-800 flex flex-col justify-between gap-8 !p-6">
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
};


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

    const [query, setQuery] = useState('');

    const apps: { 
      category: string; 
      items: { 
        name: string; 
        icon: React.ReactElement; 
        color: string; 
        action: () => void; 
        layoutId?: string; 
      }[] 
    }[] = [
        {
            category: "Suggestions",
            items: [
                { name: 'Profile', icon: <User />, color: 'bg-gradient-to-br from-orange-400 to-orange-600', action: () => openModal('about', null, 'app-icon-about'), layoutId: 'app-icon-about' },
                { name: 'Projects', icon: <Code2 />, color: 'bg-gradient-to-br from-zinc-800 to-black dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-black', action: () => openModal('project', currentProject, 'app-icon-projects'), layoutId: 'app-icon-projects' },
                { name: 'Music', icon: <Music />, color: 'bg-gradient-to-br from-green-400 to-green-600', action: () => openModal('playlist', null, 'app-icon-playlist'), layoutId: 'app-icon-playlist' },
                { name: 'Stack', icon: <Layers />, color: 'bg-gradient-to-br from-violet-500 to-violet-700', action: () => openModal('skills', null, 'app-icon-skills'), layoutId: 'app-icon-skills' },
            ]
        },
        {
            category: "Utilities",
            items: [
                { name: 'Workspace', icon: <Calculator />, color: 'bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 text-zinc-900 dark:text-white', action: () => navigateToPage(0) },
                { name: 'Mail', icon: <Mail />, color: 'bg-gradient-to-br from-rose-400 to-rose-600', action: () => { navigateToPage(1); setTimeout(() => scrollToSection('contact'), 500); } },
                { name: 'Settings', icon: <Settings />, color: 'bg-gradient-to-br from-zinc-400 to-zinc-500', action: toggleTheme },
            ]
        },
        {
            category: "Social",
            items: [
                { name: 'GitHub', icon: <Github />, color: 'bg-[#181717]', action: () => window.open('https://github.com/ryanlyn29', '_blank') },
                { name: 'LinkedIn', icon: <Linkedin />, color: 'bg-[#0077b5]', action: () => window.open('https://linkedin.com/in/ryanlyncee', '_blank') },
                { name: 'Twitter', icon: <Twitter />, color: 'bg-[#1DA1F2]', action: () => window.open('https://twitter.com', '_blank') },
            ]
        }
    ];

    const filteredApps = apps
        .map(section => ({
            ...section,
            items: section.items.filter(app =>
                app.name.toLowerCase().includes(query.toLowerCase())
            )
        }))
        .filter(section => section.items.length > 0);

    return (
        <div className="px-6 pt-16 pb-32 w-full h-full content-start flex flex-col">
            
            <div className="w-full mb-8">
                <div className="relative group max-w-full mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="App Library" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full pl-9 pr-4 py-2.5 rounded-2xl bg-zinc-200/60 dark:bg-[#1C1C1E] backdrop-blur-md border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0 text-zinc-900 dark:text-white placeholder-zinc-500 text-sm font-normal transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {filteredApps.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide ml-4">
                                {section.category}
                            </h3>
                            <div className="bg-zinc-200/60 dark:bg-[#1C1C1E] backdrop-blur-xl rounded-[2rem] p-5">
                                <div className="grid grid-cols-4 gap-4">
                                    {section.items.map((app, i) => (
                                        <motion.button 
                                            key={i} 
                                            layoutId={app.layoutId}
                                            onClick={app.action}
                                            className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
                                        >
                                            <div className={`
                                                w-[3.75rem] h-[3.75rem] rounded-[14px] shadow-sm 
                                                flex items-center justify-center text-white
                                                group-hover:scale-105 group-active:scale-95 transition-all duration-300
                                                ${app.color} relative overflow-hidden
                                                ring-1 ring-black/5 dark:ring-white/10
                                            `}>
                                                <div className="relative z-10">
                                                    {React.cloneElement(app.icon as any, { size: 24 })}
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                            </div>
                                            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate w-full text-center tracking-tight">
                                                {app.name}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 rounded-[2rem] bg-zinc-200/60 dark:bg-[#1C1C1E]  flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center">
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

const WhiteFlowVisual = () => {
return (
  <div className="absolute inset-0 bg-[#FBFBF2] dark:bg-[#eeeee6] flex items-center justify-center overflow-hidden">

    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

   <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="relative"
  >
    <motion.div
      className="absolute inset-0 rounded-[1.75rem] bg-indigo-400/10 blur-xl"
      animate={{ opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className="relative p-5 mb-4 rounded-[1.5rem] bg-[#100C08] backdrop-blur-xl border border-black/5">
      <Layers
        size={44}
        strokeWidth={1.4}
        className="text-[#ffffff]"
      />
    </div>
  </motion.div>
</div>

    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <motion.path
        d="M 100 100 Q 200 50, 300 150 T 450 100"
        fill="transparent"
        stroke="#e2d5ff"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path
        d="M 50 300 C 100 400, 200 250, 300 350"
        fill="transparent"
        stroke="#ffc9c9"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      />
    </svg>

    <div className="relative z-10 w-full h-full">

      <motion.div
        className="absolute"
        style={{ top: '30%', left: '20%' }}
        animate={{ x: [0, 100, 200, 150, 0], y: [0, -50, 0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <MousePointer2 className="w-6 h-6 rotate-2 drop-shadow-md text-[#5C1F1F] fill-[#ffc9c9]" />
          <div className="absolute top-6 left-3 px-2 py-0.5 bg-[#ffc9c9] text-[#5C1F1F] text-[10px] font-bold rounded-full">
            Alex
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: '20%', right: '30%' }}
        animate={{ x: [0, 50, 100, 0], opacity: [1, 0.8, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex flex-col items-center">
          <TextCursor size={15} className="text-[#2E2172]" />
          <div className="mt-1 px-2 py-0.5 bg-[#e2d5ff] text-[#2E2172] text-[10px] font-bold rounded-full">
            Maya
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: '30%', right: '20%' }}
        animate={{ x: [0, -60, -20, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="relative">
          <MousePointer2 className="w-6 h-6 -rotate-12 drop-shadow-md text-[#444] fill-[#ccdeff]" />
          <div className="absolute top-6 left-3 px-2 py-0.5 bg-[#dce8ff] text-[#444] text-[10px] font-bold rounded-full">
            Leo
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: '20%', left: '15%' }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <Move className="w-6 h-6 text-[#a6feb0]" />
          <div className="mt-1 px-2 py-0.5 bg-[#cbffd1] text-[#214B2A] text-[10px] font-bold rounded-md">
            Sofia
          </div>
        </div>
      </motion.div>

    </div>
  </div>
);

};

const ClinixVisual = () => {
    const [blobs] = useState([
        { id: 1, color: "from-blue-600 to-blue-500/80" },
        { id: 2, color: "from-red-700 to-red-600/90" },
        { id: 3, color: "from-green-600 to-green-500/80" },
        { id: 4, color: "from-purple-600 to-purple-500/80" },
        { id: 5, color: "from-pink-600 to-pink-500/80" },
    ]);
    
    const isMounted = useRef(true);

    const generateRandomStyle = () => {
        const baseWidth = 100 + Math.random() * 150; 
        const baseHeight = 100 + Math.random() * 120;
        return {
            x: Math.random() * 100 - 20, 
            y: Math.random() * 100 - 20, 
            width: baseWidth,
            height: baseHeight,
        };
    };

    const [blobStyles, setBlobStyles] = useState<any[]>([]);

    useEffect(() => {
        isMounted.current = true;
        setBlobStyles(blobs.map(() => generateRandomStyle()));

        const interval = setInterval(() => {
            if (isMounted.current) {
                setBlobStyles(blobs.map(() => generateRandomStyle()));
            }
        }, 4000);

        return () => {
            isMounted.current = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="absolute inset-0 bg-[#EDEAE0] dark:bg-[#1B1B1B] overflow-hidden">
            {blobs.map((blob, i) => (
                <motion.div 
                    key={blob.id}
                    className={`absolute rounded-full blur-[60px] bg-gradient-to-br ${blob.color} mix-blend-multiply dark:mix-blend-screen opacity-80`}
                    animate={{
                        left: `${blobStyles[i]?.x}%`,
                        top: `${blobStyles[i]?.y}%`,
                        width: blobStyles[i]?.width,
                        height: blobStyles[i]?.height,
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />
            ))}
            
          
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative"
            >
            
                <motion.div
                className="absolute inset-0 rounded-full bg-rose-400/15 blur-2xl"
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

            
                <div className="relative p-5 mb-4 rounded-[1.6rem] bg-white/80 dark:bg-[#100C08]/80 backdrop-blur-xl border border-black/5 shadow-lg">
                <Heart
                    size={42}
                    strokeWidth={1.6}
                    className="text-rose-500 fill-rose-500"
                />
                </div>
            </motion.div>
            </div>

        </div>
    );
};

const ProjectVisual = ({ project }: { project: any }) => {
    switch(project.id) {
        case '1': 
            return (
                <div className="absolute inset-0 bg-[#dbc7a6] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    
                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                         <h1 className="text-[10rem] font-black text-[#F97316]/15 absolute -top-10 -right-10 leading-none tracking-tighter">
                            INIT
                        </h1>
                        
                        
                        <span className="text-[8rem] font-black text-[#F97316]/15 absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 leading-none tracking-tighter z-0">
                            BUILD
                        </span>
                    </div>

                   
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="relative"
                    >
                        
                        <motion.div
                        className="absolute inset-0 rounded-[1.75rem] bg-orange-500/15 blur-2xl"
                        animate={{ opacity: [0.25, 0.45, 0.25] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                        />

                    
                        <div className="relative p-5 mb-4 rounded-[1.6rem] bg-[#100C08] backdrop-blur-xl border border-white/10 shadow-lg">
                        <Terminal
                            size={44}
                            strokeWidth={1.6}
                            className="text-white"
                        />
                        </div>
                    </motion.div>
                    </div>
                </div>
            );
        case '2':
            return <WhiteFlowVisual />;
        case '3':
            return (
                <div className="absolute inset-0 bg-[#1f3f96]  dark:bg-[#0d1e4e] overflow-hidden flex items-center justify-center">

                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="absolute inset-0 pointer-events-none select-none">
                    <span className="absolute top-8 -right-30 text-[7rem] font-black tracking-tighter text-blue-500/10">
                    AGENT
                    </span>
                    <span className="absolute bottom-10 right-14 text-[6rem] font-black tracking-tighter text-blue-500/10">
                    GUARD
                    </span>
                </div>

                <div className="relative z-10">
                    <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl"
                    animate={{ opacity: [0.2, 0.45, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="relative"
                    >
                    
                        <motion.div
                        className="absolute inset-0 rounded-[1.75rem] bg-blue-500/18 blur-2xl"
                        animate={{ opacity: [0.25, 0.5, 0.25] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        
                        <div className="relative p-5 mb-4 rounded-[1.6rem] bg-[#0B1225]/90 backdrop-blur-xl border border-white/10 shadow-xl">
                        <ShieldCheck
                            size={44}
                            strokeWidth={1.6}
                            className="text-blue-400"
                        />
                        </div>
                    </motion.div>
                    </div>

                </div>

                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-[10px] font-mono text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    SECURE
                </div>

                </div>

            );
        
        case '4': 
            return <ClinixVisual />;    
        default:
            return <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800" />;
    }
}


const HomePage = ({ 
    heroIndex, 
    setHeroIndex, 
    openModal, 
    copyEmail, 
    emailCopied 
}: any) => {
    const currentProject = PROJECTS[heroIndex];
    

    const nextProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHeroIndex((prev: number) => (prev + 1) % PROJECTS.length);
      };
      const prevProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHeroIndex((prev: number) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      };

    return (
        <div id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-8 pt-12 md:pt-16 pb-32 flex-1 content-start">
            <BentoCard 
              id="about"
              colSpan="md:col-span-6" 
              layoutId="hero-card-about"
              className="relative overflow-hidden bg-[#ed8033] text-white group cursor-pointer border-none !p-8 transform-gpu"
              onClick={() => openModal('about', null, 'hero-card-about')}
            >
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Identity</span>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-white rounded-full" />
                             <span className="font-bold text-sm tracking-wide">Ryan Lyncee</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#ff4500] transition-colors">
                        <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <div>
                      <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.85] mb-6">
                         Software<br/>Dev.
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
              key={currentProject.id}
              id="work"
              colSpan="md:col-span-4" 
              rowSpan="md:row-span-2" 
              noPadding={true}
              layoutId={`hero-card-${currentProject.id}`}
              className="relative group min-h-[460px] cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              onClick={() => openModal('project', currentProject, `hero-card-${currentProject.id}`)}
            >
              <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                     <ProjectVisual project={currentProject} />
                  </motion.div>
              </AnimatePresence>
              
              <div className="relative z-20 flex flex-col justify-between h-full p-6">
                 <div className="flex justify-between items-start">
                     <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentProject.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="px-3 py-1.5 rounded-full bg-white/20 dark:bg-[#242124] backdrop-blur-xl   text-xs font-semibold text-zinc-900 dark:text-white shadow-sm ring-1 ring-black/5"
                        >
                            Featured Project
                        </motion.div>
                     </AnimatePresence>
                 </div>

                 <motion.div 
                    layoutId={`info-panel-${currentProject.id}`}
                    className="p-6 rounded-[1.8rem] bg-white dark:bg-[#1B1B1B] backdrop-blur-xl"
                 >
                     <span className="absolute right-6 top-6 text-zinc-300 text-xs">
                        {currentProject.id} / 4
                    </span>
                    <AnimatePresence mode="wait">
                         <motion.div
                             key={currentProject.id}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             transition={{ duration: 0.2 }}
                         >
                            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                                {currentProject.title}
                            </h2>
                            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                                {currentProject.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <button className="px-5 py-2.5 cursor-pointer bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-transform">
                                    View Details
                                </button>
                                
                                <div className="flex gap-2">
                                    <button 
                                        onClick={prevProject} 
                                        className="p-2.5 rounded-full cursor-pointer bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button 
                                        onClick={nextProject} 
                                        className="p-2.5 rounded-full cursor-pointer bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                         </motion.div>
                    </AnimatePresence>
                 </motion.div>
              </div>
            </BentoCard>

            <BentoCard 
              colSpan="md:col-span-2" 
              rowSpan="md:row-span-2" 
              noPadding={true} 
              layoutId="hero-card-skills"
              className="bg-zinc-200/60 dark:bg-[#1B1B1B] border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group min-h-[420px] cursor-pointer"
              onClick={() => openModal('skills', null, 'hero-card-skills')}
            >
              
              <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-24 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-20 h-full flex flex-col p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                        <Layers className="text-zinc-700 dark:text-zinc-300" size={20} />
                     </div>
                     <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                         Active
                     </div>
                  </div>

                  <div className="flex-1">
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Tech Stack</h3>
                     <p className="text-zinc-500 text-xs mb-6">Core technologies & tools</p>
                     
                     <div className="space-y-3">
                         {[
                             { name: 'React', icon: <Code2 size={14} />, color: 'bg-blue-500' },
                             { name: 'Node.js', icon: <Database size={14} />, color: 'bg-green-500' },
                             { name: 'Docker', icon: <Layout size={14} />, color: 'bg-sky-500' },
                             { name: 'TypeScript', icon: <Cpu size={14} />, color: 'bg-blue-600' }
                         ].map((tech, i) => (
                             <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group/item">
                                 <div className="flex items-center gap-3">
                                     <div className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                                     <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{tech.name}</span>
                                 </div>
                                 <div className="opacity-0 group-hover/item:opacity-100 text-zinc-400 transition-opacity">
                                     {tech.icon}
                                 </div>
                             </div>
                         ))}
                     </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-black flex items-center justify-center text-[8px] font-bold text-zinc-500">
                                  <Globe size={10} />
                              </div>
                          ))}
                      </div>
                      <span className="text-[10px] font-medium text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex items-center gap-1">
                          View All <ChevronRight size={10} />
                      </span>
                  </div>
              </div>
            </BentoCard>

            <BentoCard colSpan="md:col-span-2" noPadding={true} className="bg-[#1B1B1B] border border-zinc-800 flex flex-col items-center justify-center p-4 min-h-[200px]">
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
              onClick={() => window.open('https://github.com/ryanlyn29', '_blank')}
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
              onClick={() => window.open('https://linkedin.com/in/ryanlyncee', '_blank')}
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


            <VideoCard onClick={() => openModal('playlist', null, 'hero-card-playlist')} />

            <BentoCard 
              colSpan="md:col-span-5" 
              id="contact" 
              className="bg-[#e95c73] text-white min-h-[320px] group cursor-pointer border-none !p-8 relative overflow-hidden"
              onClick={copyEmail}
            >
                
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
                              <p className="text-sm font-medium truncate" title="ryanlyncee29@gmail.com">ryanlyncee29@gmail.com</p>
                          </div>
                      </div>
                  </div>
                </div>
            </BentoCard>

            <BentoCard colSpan="md:col-span-12" className="bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between min-h-[100px] px-8 py-3 gap-6">
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
                  <div className="text-xl font-bold text-zinc-900 dark:text-white font-mono">2025</div>
              </div>
            </BentoCard>

        </div>
    );
};


export default function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null,
    layoutId: undefined
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const [[page, direction], setPage] = useState([1, 0]); 
  const [isSwiping, setIsSwiping] = useState(false);
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openModal = (type: 'project' | 'about' | 'skills' | 'playlist', data: any = null, layoutId?: string) => {
    setModalState({ isOpen: true, type, data, layoutId });
    
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
    navigator.clipboard.writeText("ryanlyncee29@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const onWheel = useCallback((e: React.WheelEvent) => {
      if (isSwiping) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const threshold = 20;

      if (isHorizontal && Math.abs(e.deltaX) > threshold) {
          if (e.deltaX > 0) {
              if (page < 2) {
                  setPage([page + 1, 1]);
                  setIsSwiping(true);
                  setTimeout(() => setIsSwiping(false), 500);
              }
          } else {
              if (page > 0) {
                  setPage([page - 1, -1]);
                  setIsSwiping(true);
                  setTimeout(() => setIsSwiping(false), 500);
              }
          }
      }
  }, [page, isSwiping]);

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
    if (id === 'workspace') {
        setPage([0, -1]);
        return;
    }

    if (id === 'about') {
        openModal('about', null, 'hero-card-about');
        return;
    }
    
    if (id === 'projects') {
        const proj = PROJECTS[heroIndex];
        openModal('project', proj, `hero-card-${proj.id}`);
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
    
   <div 
     className={`${isDarkMode ? 'dark' : ''} w-full h-screen bg-[#F5F5F5] dark:bg-[#05050564] backdrop-blur-2xl backdrop-brightness-50 overflow-hidden`}
     onWheel={onWheel} 
   >
    <div className="w-full h-full md:px-5 bg-[#F5F5F5] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-500 overflow-hidden flex flex-col relative">     
        <StatusBar />
        
        <AnimatePresence>
            {modalState.isOpen && (
                     <Modal 
                        key={modalState.data?.id || modalState.type}
                        isOpen={modalState.isOpen} 
                        onClose={closeModal} 
                        type={modalState.type}
                        data={modalState.data}
                        onNavigate={openModal}
                        layoutId={modalState.layoutId}
                        isFullScreen={true}
                    />
            )}
        </AnimatePresence>
        
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
                className="w-full h-full overflow-y-auto custom-scrollbar"
            >
                <div className="w-full h-full max-w-[1920px] mx-auto relative">
                    {page === 0 && <ToolsPage />}
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

        <div className="absolute bottom-25 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-50 pointer-events-none">
            <div className="flex gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-2 border-zinc-300 dark:border-zinc-800 p-2 rounded-full shadow-2xl shadow-black/20 pointer-events-auto">
                {[0, 1, 2].map((idx) => (
                    <button
                    key={idx} 
                    onClick={() => {
                        if (idx === page) return;
                        setPage([idx, idx > page ? 1 : -1]);
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer duration-300 hover:scale-125 focus:outline-none ${page === idx ? 'bg-zinc-500 dark:bg-white w-4' : 'bg-zinc-300 dark:bg-zinc-400 hover:bg-zinc-400 dark:hover:bg-zinc-600'}`}
                    aria-label={`Go to page ${idx + 1}`}
                    />
                ))}
            </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full flex justify-center z-50 pointer-events-none">
            <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} onNavigate={handleNavClick} />
        </div>
      </div>
    </div>
    
  );
}