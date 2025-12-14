import type { Project, Skill } from './types';

export const PROJECTS: Project[] = [
    {
    id: '1',
    title: 'INIT Build',
    category: 'Agile Development',
    description: 'Collaborative development initiative focusing on component modularity and API design.',
    longDescription: 'As a Build Team Member at INIT and ShellHacks participant, I collaborated in an agile workflow to design and deploy interactive web applications. This role focused heavily on component modularity, responsive state management, and engaging in technical workshops covering backend architecture. Additionally, as a member of Code Crunch and ColorStack, I actively engage in algorithm optimization and technical interview preparation.',
    role: 'Team Member',
    year: '2025',
    liveUrl: '#',
    image: '/images/INITBuild.png',
    gallery: [
        '/videos/WhiteFlowDemo.mp4',
        '/images/WhiteFlowLogin.png',
        '/images/WhiteFlowRoom.png'
    ],
    themeColor: '#d97706',
    tags: ['Agile', 'Teamwork', 'Algorithms'],
  
    overlayGradient: 'from-black via-black/80 to-transparent'
  },
  {
    id: '2',
    title: 'WhiteFlow',
    category: 'Real-Time Collaboration',
    description: 'High-performance collaborative canvas engine using Socket.io and custom state management.',
    longDescription: 'WhiteFlow is a custom SPA framework designed for sub-millisecond collaboration. We architected a "Zoomable Infinite Canvas" utilizing a Command Pattern undo/redo system and a custom requestAnimationFrame physics loop. The system features a real-time collaboration engine built on Socket.io namespaces to broadcast updates for drawing and object movement across distributed clients, all synchronized via Redis caching.',
    role: 'Lead Architect',
    year: '2025',
    liveUrl: '#',
    image: '/images/WhiteFlowHome.png',
    gallery: [
        '/videos/WhiteFlowDemo.mp4',
        '/images/WhiteFlowLogin.png',
        '/images/WhiteFlowRoom.png'
    ],
    themeColor: '#4f46e5', 
    tags: ['Socket.io', 'Redis', 'Node.js', 'HTML5 Canvas', 'JavaScript'],
    textColor: 'text-zinc-900',
    overlayGradient: 'from-[#fdfbf7] via-[#fdfbf7]/95 to-transparent'
  },
  {
    id: '3',
    title: 'AgentGuard',
    category: 'AI Security',
    description: 'LLM vulnerability scanning dashboard for red-teaming and automated remediation.',
    longDescription: 'AgentGuard facilitates the security auditing of LLM agents. The platform features an asynchronous vulnerability scanning workflow using a polling architecture to track long-running Gemini audits. We engineered an "Auto-Remediation" UI that triggers GenAI models to generate hardened system prompts, visualizing score trends and security posture improvements via Recharts.',
    role: 'Frontend Developer',
    year: '2025',
    liveUrl: '#',
    image: '/images/AgentGuardHome.png',
    gallery: [
        '/videos/AgentGuardDemo.mp4',
        '/images/AgentGuardDashboard.png',
        '/images/AgentGuardProjectOverview.png'
    ],
    themeColor: '#0ea5e9',
    tags: ['React', 'PostgreSQL', 'Gemini', 'Redis', 'Tailwind CSS', 'Gemini API', 'JWT'],
    overlayGradient: 'from-black via-black/80 to-transparent'
  },
  {
    id: '4',
    title: 'Clinix',
    category: 'Health Tech',
    description: 'Modular AI healthcare assistant containerized with Docker and FastAPI.',
    longDescription: 'Clinix bridges the gap between patient data and AI guidance. We developed a modular React frontend for secure appointment scheduling and insurance estimates, backed by a FastAPI service handling data validation. The entire application was containerized using Docker to ensure consistent execution environments across development and production deployments.',
    role: 'Frontend Developer',
    year: '2025',
    liveUrl: '#',
    image: '/images/ClinixHome.png',
    gallery: [
        '/videos/ClinixDemo.mp4',
        '/images/ClinicMobileMenu.png',
        '/images/ClinixChat.png'
    ],
    themeColor: '#7F3535',
    tags: ['FastAPI', 'Docker', 'React', 'Cloud', ' Gemini API'],
    textColor: 'text-zinc-900',
    overlayGradient: 'from-white via-white/95 to-transparent'
  },

];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Tech' },
  { name: 'Node.js', level: 90, category: 'Tech' },
  { name: 'Docker', level: 85, category: 'Tech' },
  { name: 'Java', level: 80, category: 'Tech' },
  { name: 'HTML', level: 80, category: 'Tech' },
  { name: 'CSS', level: 80, category: 'Tech' },
  { name: 'Tailwind CSS', level: 80, category: 'Tech' },
  { name: 'PostgreSQL', level: 85, category: 'Tech' },
  { name: 'Figma', level: 75, category: 'Soft' },
];

export const VIDEO_ITEMS = [
  {
    id: 'v1',
    title: "WhiteFlow Demo",
    channel: "Ryan Lyncee",
    subs: "Lead Architect",
    video: "/videos/WhiteFlowDemo.mp4",
    poster: "/images/WhiteFlowHome.png",
    duration: "2:30",
    plays: "Featured",
    textColor: 'text-zinc-900',
    overlayGradient: 'from-[#fdfbf7] via-[#fdfbf7]/90 to-transparent'
  },
  {
    id: 'v2',
    title: "AgentGuard Demo",
    channel: "Ryan Lyncee",
    subs: "Frontend Developer",
    video: "/videos/AgentGuardDemo.mp4",
    poster: "/images/AgentGuardHome.png",
    duration: "1:45",
    plays: "Featured"
  },
  {
    id: 'v3',
    title: "Clinix Walkthrough",
    channel: "Ryan Lyncee",
    subs: "Frontend Developer",
    video: "/videos/ClinixDemo.mp4",
    poster: "/images/ClinixHome.png",
    duration: "1:15",
    plays: "Featured"
  }
];