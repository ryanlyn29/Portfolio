import type { LucideIcon } from 'lucide-react';
import {
  CircuitBoard, ShieldCheck, Stethoscope, Users, Layers, Clock, Palette,
  Search, MessageSquareQuote, Frown, Target, Lightbulb,
  Globe, Boxes, MessagesSquare,
} from 'lucide-react';

export type MediaKind = 'image' | 'video';

export interface MediaAsset {
  /** Path under /public, e.g. "/work/whiteflow/cover.png". */
  src: string;
  /** Optional poster for videos (shown before first playable frame). */
  poster?: string;
  kind: MediaKind;
  alt: string;
  /** Optional object-fit override. Defaults to 'cover'. */
  fit?: 'cover' | 'contain';
  /** Optional focal-point tweak, e.g. "center", "top", "50% 30%". */
  position?: string;
}

export interface CaseStudySketch {
  caption: string;
  media?: MediaAsset;
}

export interface CaseStudyReview {
  author: string;
  stars: number;
  body: string;
  date: string;
}

export interface CaseStudyInterviewInsight {
  quote: string;
  role: string;
}

export interface CaseStudyPainPoint {
  icon: LucideIcon;
  title: string;
  body: string;
  frame: string;
}

export interface CaseStudyPersona {
  name: string;
  role: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  accent: string;
}

export interface CaseStudySWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CaseStudyGoal {
  index: number;
  title: string;
  body: string;
}

export interface CaseStudyBeforeAfter {
  label: string;
  title: string;
  body: string;
  frame: string;
  media?: MediaAsset;
}

export interface CaseStudyKeyFeature {
  title: string;
  body: string;
  icon: LucideIcon;
  frame: string;
  media?: MediaAsset;
}

export interface CaseStudyTakeaway {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  /** Primary accent for case study page chrome — eyebrows, rings, highlights. */
  themeAccent: string;
  cover: {
    /** Three frame colors stacked in the hero — matches the featured card frame style. */
    frames: [string, string, string];
    /** Big lucide icon centered in the cover (used when no media or as fallback). */
    icon: LucideIcon;
    /** Small stat badges in the cover corners. */
    badges: string[];
    /** Primary hero media (image or video). Falls back to icon placeholder if missing. */
    media?: MediaAsset;
  };

  /** Mid-section gallery, rendered between research and solution sections. */
  gallery?: MediaAsset[];

  about: {
    heading: string;
    body: string;
  };
  role: string;
  timeline: string;
  skills: string[];
  links: Array<{ label: string; href: string }>;

  problem: {
    eyebrow: string;
    title: string;
    body: string;
  };

  reviews: {
    eyebrow: string;
    title: string;
    intro: string;
    items: CaseStudyReview[];
  };

  interviews: {
    eyebrow: string;
    title: string;
    intro: string;
    insights: CaseStudyInterviewInsight[];
    surveyStats: Array<{ value: string; label: string }>;
  };

  painPoints: {
    eyebrow: string;
    title: string;
    items: CaseStudyPainPoint[];
  };

  personas: {
    eyebrow: string;
    title: string;
    items: CaseStudyPersona[];
  };

  competitive: {
    eyebrow: string;
    title: string;
    intro: string;
    swot: CaseStudySWOT;
  };

  goals: {
    eyebrow: string;
    title: string;
    items: CaseStudyGoal[];
  };

  wireframes: {
    eyebrow: string;
    title: string;
    body: string;
    sketches: CaseStudySketch[];
  };

  beforeAfter: {
    eyebrow: string;
    title: string;
    before: CaseStudyBeforeAfter;
    after: CaseStudyBeforeAfter;
  };

  keyFeatures: {
    eyebrow: string;
    title: string;
    items: CaseStudyKeyFeature[];
  };

  conclusion: {
    eyebrow: string;
    title: string;
    body: string;
    takeaways: CaseStudyTakeaway[];
    nextSteps: string[];
  };
}

const WHITEFLOW: CaseStudy = {
  slug: 'whiteflow',
  name: 'Whiteflow',
  tagline: 'Designing Trust into a Realtime Canvas',
  themeAccent: '#1f7a52',
  cover: {
    frames: ['#EBBAC7', '#B5CDEF', '#C4D7D1'],
    icon: CircuitBoard,
    badges: ['Realtime', 'Multiplayer', 'Canvas'],
    media: { src: '/images/WhiteFlowHome.png', kind: 'image', alt: 'Whiteflow home screen', fit: 'cover', position: 'top' },
  },
  gallery: [
    { src: '/videos/WhiteFlowDemo.mp4', kind: 'video', alt: 'Whiteflow live multiplayer demo', poster: '/images/WhiteFlowRoom.png' },
    { src: '/images/WhiteFlowRoom.png', kind: 'image', alt: 'Whiteflow shared canvas room' },
    { src: '/images/INITBuild.png', kind: 'image', alt: 'init build team — origin of the Whiteflow project' },
  ],
  about: {
    heading: 'About the Project',
    body:
      "Whiteflow is a multiplayer canvas I led as part of a four-person team at init build. We started with a simple idea — a shared whiteboard — and kept bumping into the same question: what makes a realtime tool feel trustworthy? When cursors lag, when undo disagrees across clients, when the connection hiccups, users blame the product. I owned architecture and the hard questions behind the UX that keeps trust intact.",
  },
  role: 'Lead engineer · Product lead',
  timeline: 'Sep – Dec 2025',
  skills: [
    'Socket.io realtime',
    'Redis pubsub',
    'Command-pattern undo/redo',
    'Canvas rendering',
    'State reconciliation',
    'Product scoping',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ryanlyn29/WhiteFlow' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'the problem that kept surfacing in every playtest…',
    body:
      "Our first build looked great until two people were on the canvas at once. Cursors felt laggy, undo was unpredictable, and one user's delete could erase another's work. The issue wasn't speed — it was state. When two clients disagreed on the truth, the product felt broken even if the network was fine. We needed a model where everyone saw the same world, fast, even when things went wrong.",
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the finished build.',
    items: [
      { author: 'Trust under concurrency', stars: 4, body: 'Per-actor undo and visible state made multiplayer feel predictable. Rapid simultaneous edits still need hardening.', date: 'Post-build' },
      { author: 'Perceived speed',          stars: 5, body: 'Optimistic local rendering keeps edits feeling instant even while reconciliation happens behind the scenes.', date: 'Post-build' },
      { author: 'Session continuity',       stars: 4, body: 'Redis-backed rooms survive reloads and reconnects; longer-term version history is still a next step.', date: 'Post-build' },
      { author: 'Honest failure states',    stars: 4, body: 'The live/reconnecting/offline pill removed silent failures. Offline queues could surface more detail.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The product behaviors I designed around — the assumptions and open questions that guided the rebuild.',
    insights: [
      { quote: "Undo should only roll back your own actions, never a teammate's.",        role: 'design assumption' },
      { quote: "A reload should drop you back into the room exactly where you left off.",  role: 'design assumption' },
      { quote: "If you can see someone's cursor, your edits should reach them too.",       role: 'design principle' },
      { quote: "The confusing part isn't lag — it's not knowing whether an edit saved.",   role: 'open question' },
    ],
    surveyStats: [
      { value: '4', label: 'realtime states the UI had to show honestly' },
      { value: '2', label: 'undo models compared before committing to per-actor' },
      { value: '1', label: 'source of truth: the server, always' },
    ],
  },
  painPoints: {
    eyebrow: 'Pain Points',
    title: "what wasn't working",
    items: [
      {
        icon: Frown,
        title: 'Undo disagreed across clients',
        body: "The first implementation was a shared stack. If you drew and I undid, my undo would delete your shape. Mental models broke instantly.",
        frame: '#EBBAC7',
      },
      {
        icon: Clock,
        title: 'No sense of session continuity',
        body: "Reloading the page reset the canvas for the user but not the room. Rejoining felt like arriving in a foreign version of your own doc.",
        frame: '#C4D7D1',
      },
      {
        icon: Search,
        title: 'No feedback for offline state',
        body: "When the socket dropped, the UI still felt alive. Strokes 'landed' locally but never reached anyone — the worst kind of silent failure.",
        frame: '#B5CDEF',
      },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'Maya · 21',
        role: 'Design student, weekly collab sessions',
        bio: 'Uses whiteboards for 2-hour critiques with classmates. Needs her version of the canvas to come back exactly as she left it after a class break.',
        goals: ['Reliable sessions across reloads', 'Clear ownership of her own marks', 'Fast paste from Figma'],
        frustrations: ["Another user's undo wiping her work", 'Not knowing if her last stroke actually synced'],
        accent: '#EBBAC7',
      },
      {
        name: 'Dev · 24',
        role: 'Early-stage startup, remote standups',
        bio: 'Sketches system diagrams on a shared canvas during standups. Needs the doc to behave predictably even on flaky airport wifi.',
        goals: ['Offline-safe edits that reconcile on reconnect', 'Persistent rooms', 'Fast cursor fidelity'],
        frustrations: ['Seeing a teammate\'s cursor but not their changes', 'Silent failures when the socket drops'],
        accent: '#B5CDEF',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What reliable realtime tools get right',
    intro:
      'I picked three collaboration tools with realtime primitives (Figma, Excalidraw, tldraw) and mapped the patterns they share: per-actor undo stacks, optimistic state with server reconciliation, and a visible network badge. Then I ran a SWOT on our build.',
    swot: {
      strengths: [
        'Optimistic UI that feels instant',
        'Clean command pattern foundation',
        'Small, focused team owning the full stack',
      ],
      weaknesses: [
        'Shared undo stack broke trust',
        'No offline buffer',
        'No visible connection state',
      ],
      opportunities: [
        'Per-actor undo is a well-documented pattern',
        'Redis already in the stack — easy session persistence',
        'Network indicator is cheap, high trust payoff',
      ],
      threats: [
        'Well-funded incumbents (Figma, tldraw)',
        'User expectations set by Google Docs-tier reliability',
      ],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might we redesign the canvas to feel trustworthy?',
    items: [
      {
        index: 1,
        title: 'Per-actor undo — your actions, your stack',
        body: "Re-architected undo around a per-user command stack. cmd+Z only rolls back what you did, even when five people are drawing at once.",
      },
      {
        index: 2,
        title: 'Optimistic UI with a reconciliation layer',
        body: "Local state wins for immediate feedback. The server holds truth; on reconnect, we diff and replay. Users feel the speed, the system keeps its integrity.",
      },
      {
        index: 3,
        title: 'Honest network state, always visible',
        body: "A small 'live/reconnecting/offline' badge in the corner. When the socket drops, strokes queue locally and the UI admits it — no silent failures.",
      },
    ],
  },
  wireframes: {
    eyebrow: 'Wireframes',
    title: 'Low-fi sketches before a single pixel',
    body:
      "Before touching real code I mapped every realtime state the canvas could be in — connected, reconnecting, offline, merging — and drew the smallest UI for each. It kept the rebuild honest: if a state had no sketch, it had no design.",
    sketches: [
      {
        caption: 'Connected state — status dot · cursors · instant feedback',
        media: { src: '/images/WhiteFlowWireframeConnected.png', kind: 'image', alt: 'Whiteflow wireframe — connected state with live badge and synced edits', fit: 'contain' },
      },
      {
        caption: 'Reconnecting — amber badge · queued strokes visible · opacity hint',
        media: { src: '/images/WhiteFlowWireframeReconnecting.png', kind: 'image', alt: 'Whiteflow wireframe — reconnecting with queued local edits', fit: 'contain' },
      },
      {
        caption: 'Offline — dismissible banner · local save indicator · retry affordance',
        media: { src: '/images/WhiteFlowWireframeOffline.png', kind: 'image', alt: 'Whiteflow wireframe — offline mode with local save and retry', fit: 'contain' },
      },
      {
        caption: 'Merge conflict — two stacked cursors · ownership color tag · no modal',
        media: { src: '/images/WhiteFlowWireframeMerge.png', kind: 'image', alt: 'Whiteflow wireframe — merge conflict with overlapping cursors', fit: 'contain' },
      },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'Before and after — same canvas, completely different trust',
    before: {
      label: 'Before',
      title: 'Shared undo, silent network, opaque sessions',
      body: 'Fast on paper. Chaotic in practice — especially once more than one person joined the room.',
      frame: '#F5EDE3',
      media: { src: '/images/WhiteFlowBefore.png', kind: 'image', alt: 'Whiteflow before — shared undo, unknown session state, and opaque saves' },
    },
    after: {
      label: 'After',
      title: 'Per-actor undo, visible network, persistent rooms',
      body: 'Same speed, dramatically different feel — no more second-guessing whether an edit actually saved.',
      frame: '#B5CDEF',
      media: { src: '/images/WhiteFlowAfter.png', kind: 'image', alt: 'Whiteflow canvas after — live connection, per-user undo, and saved rooms' },
    },
  },
  keyFeatures: {
    eyebrow: 'Key improvements at a glance',
    title: 'What I built',
    items: [
      {
        icon: Layers,
        title: 'Per-actor undo/redo',
        body: "Each user's actions live on their own command stack. cmd+Z is finally predictable in multiplayer.",
        frame: '#EBBAC7',
      },
      {
        icon: Target,
        title: 'Redis-backed room state',
        body: "Rooms persist across reloads and reconnects. Rejoining feels like walking back into the same conversation.",
        frame: '#C4D7D1',
      },
      {
        icon: Lightbulb,
        title: 'Live connection indicator',
        body: "A tiny status pill that always tells the truth: live, reconnecting, or offline with a local queue.",
        frame: '#B5CDEF',
      },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      "Whiteflow taught me that in realtime products, perceived trust beats raw performance. A canvas can be fast and still feel broken if users can't predict what happens next. The biggest wins came from smaller-than-expected UX choices — per-actor undo, a status pill, a queued-stroke indicator.",
    takeaways: [
      {
        title: 'Pressure-test assumptions before rewriting architecture',
        body: 'Writing the undo and state assumptions down first pointed straight at the real problem — the rewrite came second.',
      },
      {
        title: "Don't hide state. Name it.",
        body: 'The moment we showed "reconnecting" instead of pretending everything was fine, user trust jumped.',
      },
      {
        title: 'Small UI moves beat big infra moves',
        body: "A 12-pixel status pill changed the product's feel more than any latency optimization.",
      },
    ],
    nextSteps: [
      'Add cursor names + color ownership for clearer multiplayer identity',
      'Build version history for rooms (Google Docs-style snapshots)',
      'Offline-first mode with background sync when reconnected',
      'Open-source the reconciliation layer as a standalone package',
    ],
  },
};

const AGENTGUARD: CaseStudy = {
  slug: 'agentguard',
  name: 'AgentGuard',
  tagline: 'A 24-hour bet that prompt safety needed a dashboard, not a checklist',
  themeAccent: '#3D6FEF',
  cover: {
    frames: ['#C4D7D1', '#EBBAC7', '#B5CDEF'],
    icon: ShieldCheck,
    badges: ['Hackathon', 'Gemini', 'Frontend'],
    media: { src: '/images/AgentGuardHome.png', kind: 'image', alt: 'AgentGuard home dashboard', fit: 'cover', position: 'top' },
  },
  gallery: [
    { src: '/videos/AgentGuardDemo.mp4', kind: 'video', alt: 'AgentGuard scan demo', poster: '/images/AgentGuardDashboard.png' },
    { src: '/images/AgentGuardDashboard.png', kind: 'image', alt: 'AgentGuard verdict-first scan dashboard' },
    { src: '/images/AgentGuardProjectOverview.png', kind: 'image', alt: 'AgentGuard project overview with score trend' },
  ],
  about: {
    heading: 'About the Project',
    body:
      "AgentGuard was our entry to Sharkbyte Hackathon 2025 — a one-weekend build to scan LLM prompts for common failure patterns (prompt injection, PII leaks, jailbreaks) and auto-suggest hardened replacements. I led the frontend and the product framing: turning a list of raw security findings into something a non-security person would actually act on.",
  },
  role: 'Product + frontend',
  timeline: 'Sharkbyte 2025 (24 hrs)',
  skills: [
    'React + TypeScript',
    'Gemini API',
    'PostgreSQL + RLS',
    'Recharts',
    'Product scoping under time pressure',
    'Design review with non-designers',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/4shivv/Sharkbyte_2025' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'prompt security tools treat you like a security engineer',
    body:
      "Most existing prompt-safety libraries return JSON: a severity score, a category, a matched rule. That's useful if you're a security engineer — but the people writing prompts inside startups are product folks, PMs, and designers. They want to know 'is this safe?' and 'how do I fix it?' — not what a CVE is.",
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the hackathon build.',
    items: [
      { author: 'Verdict-first UX', stars: 4, body: 'Leading with a one-line verdict and score made the tool approachable; the detail is there when you want it.', date: 'Post-build' },
      { author: 'Auto-remediation', stars: 4, body: 'Gemini-powered rewrites with a diff are the standout feature; they need guardrails before anyone trusts them blindly.', date: 'Post-build' },
      { author: 'Score trend',      stars: 3, body: 'The trend chart makes iteration feel rewarding, though it only matters once you scan the same prompt repeatedly.', date: 'Post-build' },
      { author: 'Detection depth',  stars: 3, body: 'Solid coverage of common injection patterns for a 24-hour build; deeper, evolving attacks are future work.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The product behaviors I designed around — what someone would want to see right after pasting a prompt.',
    insights: [
      { quote: "Show a one-line verdict first, then what to change.",                     role: 'design assumption' },
      { quote: "Don't make anyone read a severity table — just rewrite it for them.",      role: 'design assumption' },
      { quote: "Highlight the exact problem phrase instead of describing it.",             role: 'design principle' },
      { quote: "Let people see the score move after an edit — feedback drives the habit.",  role: 'open question' },
    ],
    surveyStats: [
      { value: '3', label: 'core screens: scan, rewrite, history' },
      { value: '1', label: 'verdict shown before any detail' },
      { value: '<10s', label: 'target time from paste to a usable result' },
    ],
  },
  painPoints: {
    eyebrow: 'Pain points',
    title: "why prompt safety tools don't get used",
    items: [
      {
        icon: Frown,
        title: 'Output speaks CVE, users speak English',
        body: "JSON severity maps and rule IDs don't translate to 'what do I do now.' The knowledge tax is too high for casual users.",
        frame: '#EBBAC7',
      },
      {
        icon: Target,
        title: 'No inline remediation',
        body: "Almost every tool stops at detection. Fixing the prompt is left as an exercise — exactly when cognitive load is already highest.",
        frame: '#C4D7D1',
      },
      {
        icon: Search,
        title: 'No sense of progress',
        body: "You fix one thing, rescan, and get a new score with no context. There's no feedback loop — which kills the habit of actually improving prompts.",
        frame: '#B5CDEF',
      },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'Priya · 28',
        role: 'PM at a consumer AI app',
        bio: "Writes prompts for a chat feature. Not a security engineer; doesn't want to become one. Needs a fast verdict she can trust.",
        goals: ['One-line verdict on every prompt', 'Suggested rewrites she can copy', 'Track score improvements over time'],
        frustrations: ['Tools that require a security glossary', "Fixing prompts without knowing whether it helped"],
        accent: '#C4D7D1',
      },
      {
        name: 'Jonas · 31',
        role: 'Designer embedded on an AI team',
        bio: 'Prototypes LLM flows in Figma and ships them behind feature flags. Needs safety feedback as part of his draft cycle, not as a separate process.',
        goals: ['Inline highlights on the prompt', 'Plain-English explanations', 'Shareable report for team review'],
        frustrations: ['Being blocked by security reviews after handoff', 'Output formats designed for engineers only'],
        accent: '#EBBAC7',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What strong prompt-safety tools get right',
    intro:
      'We surveyed three open-source prompt scanners and two closed-source platforms. Everyone scans well; almost no one closes the loop with a rewrite, and nobody tracks score trends over time.',
    swot: {
      strengths: [
        'Strong detection baseline (Gemini + static rules)',
        'Auto-rewrite with diff view',
        'Score-trend dashboard users actually enjoy',
      ],
      weaknesses: [
        'Only English prompts supported at launch',
        'No SSO yet',
        'Recharts is heavy for the traffic we expect',
      ],
      opportunities: [
        'Prompt safety is underserved outside security teams',
        'Auto-rewrite is a differentiator most tools lack',
        'Education angle — a weekly safety report',
      ],
      threats: [
        'Platform providers (OpenAI, Anthropic) building this natively',
        'Fast pace of prompt-injection technique evolution',
      ],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might we make prompt safety feel like a design tool?',
    items: [
      { index: 1, title: 'Lead with the verdict', body: 'Every scan returns a one-line verdict and a clear score — before any details.' },
      { index: 2, title: 'Close the loop with an auto-rewrite', body: "We don't just flag; we propose a rewritten prompt with a diff so users can see what changed." },
      { index: 3, title: 'Show progress, not a static score', body: 'A trend chart tracks scores across iterations so fixing a prompt feels like leveling up.' },
    ],
  },
  wireframes: {
    eyebrow: 'Wireframes',
    title: 'Sketches before the dashboard',
    body:
      "With 24 hours on the clock, sketching mattered more than usual. I mapped three screens (scan, rewrite, history) and pressure-tested each with a teammate before we committed to layout.",
    sketches: [
      { caption: 'Scan view — big verdict · inline highlights · one CTA' },
      { caption: 'Rewrite view — diff panel · accept/decline/tweak · rationale' },
      { caption: 'History view — score trend line · list of previous scans · quick reopen' },
      { caption: 'Empty state — sample prompt · 10-second setup · no login friction' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'Scanner output vs. a dashboard for humans',
    before: {
      label: 'Before (existing tools)',
      title: 'JSON severity tables and rule IDs',
      body: "Technically correct, practically unreadable. Writers bounced off the complexity before acting on anything.",
      frame: '#F5EDE3',
    },
    after: {
      label: 'After (AgentGuard)',
      title: 'Verdict → auto-rewrite → score trend',
      body: "A one-line verdict at the top, a rewritten prompt with a diff underneath, and a score chart you actually want to improve.",
      frame: '#C4D7D1',
    },
  },
  keyFeatures: {
    eyebrow: 'Key improvements at a glance',
    title: 'What I built in 24 hours',
    items: [
      { icon: Layers,    title: 'Verdict-first scan UI',      body: 'Score + one-line verdict above the fold. Details are collapsible.',                       frame: '#EBBAC7' },
      { icon: Target,    title: 'Gemini-powered rewrites',    body: 'Every scan returns a hardened version of the prompt with an inline diff.',                frame: '#C4D7D1' },
      { icon: Lightbulb, title: 'Score trend chart',          body: "A chart of your prompt's score across edits — the fastest feedback we could build.",     frame: '#B5CDEF' },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      "Winning a hackathon is never the point; building something a non-technical user could actually use is. AgentGuard reminded me that the fastest way to make an expert tool feel friendly is to lead with the summary and hide the detail — not remove it.",
    takeaways: [
      { title: 'Define the assumptions before writing the README', body: 'Writing down what a prompt-writer would want up front shaped the entire layout.' },
      { title: 'Auto-remediate, don\'t just detect',                body: 'A one-click rewrite is what would make the tool worth returning to after the first scan.' },
      { title: 'Charts beat tables for habit formation',            body: 'People only fix prompts again if they can see their score move.' },
    ],
    nextSteps: [
      'Support non-English prompts (start with Spanish, Portuguese)',
      'Add team workspaces so PMs and engineers review the same prompts',
      'Publish a weekly safety digest per workspace',
      'Benchmark against newer injection techniques every sprint',
    ],
  },
};

const CLINIX: CaseStudy = {
  slug: 'clinix',
  name: 'Clinix',
  tagline: 'Replacing a multi-step clinic form with a single honest conversation',
  themeAccent: '#D64545',
  cover: {
    frames: ['#B5CDEF', '#EBBAC7', '#C4D7D1'],
    icon: Stethoscope,
    badges: ['Team of 4', 'FastAPI', 'Docker'],
    media: { src: '/images/ClinixHome.png', kind: 'image', alt: 'Clinix patient home', fit: 'cover', position: 'top' },
  },
  gallery: [
    { src: '/videos/ClinixDemo.mp4', kind: 'video', alt: 'Clinix intake conversation demo', poster: '/images/ClinixChat.png' },
    { src: '/images/ClinixChat.png', kind: 'image', alt: 'Clinix chat with structured sidebar' },
    { src: '/images/ClinixCheckinChat.png', kind: 'image', alt: 'Clinix check-in conversational flow' },
  ],
  about: {
    heading: 'About the Project',
    body:
      "Clinix is a healthcare intake assistant my team and I built across one semester. Most clinics hand patients a five-page intake form before they can even ask a question — Clinix turns that into a conversation. I owned the frontend and helped scope the chat UX: what stays in the bubble, what stays in the sidebar, and when the system should nudge for insurance or next steps.",
  },
  role: 'Frontend + product scoping',
  timeline: 'Jan – May 2025',
  skills: [
    'React + TypeScript',
    'FastAPI',
    'Docker',
    'Gemini API',
    'Healthcare UX patterns',
    'HIPAA-adjacent copy review',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/HitMonrillo/Clinix' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'intake forms treat patients like forms, not people',
    body:
      "Clinic intake today is a gauntlet: paper forms, redundant questions, insurance jargon patients can't parse. Patients with real questions wait 30+ minutes before anyone actually talks to them. We asked: what if the front door of a clinic was a conversation that captured the same data the back office needs?",
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the finished build.',
    items: [
      { author: 'Conversational intake', stars: 4, body: 'Free-text chat replaces the multi-page form well; messy medical phrasing still trips up edge cases.', date: 'Post-build' },
      { author: 'Structured capture',    stars: 4, body: 'The sidebar keeps clinician-facing data visible while the chat stays human. Mapping to real EMR schemas is future work.', date: 'Post-build' },
      { author: 'Insurance clarity',     stars: 3, body: 'Plain-English ranges beat a single mystery number, but real payer data would make them far more accurate.', date: 'Post-build' },
      { author: 'Safety & guardrails',   stars: 3, body: 'The flow routes uncertain cases to a human; red-flag escalation is still on the roadmap.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The product behaviors the team designed around — what patients and clinicians each need from intake.',
    insights: [
      { quote: "Patients want to describe symptoms in their own words, not pick from a dropdown.", role: 'design assumption' },
      { quote: "Insurance means more than a copay number — be honest about ranges.",               role: 'design assumption' },
      { quote: "Offer a scheduling option before the conversation even ends.",                     role: 'design principle' },
      { quote: "Clinicians need structured data; whatever UX gets there faster is fine.",          role: 'open question' },
    ],
    surveyStats: [
      { value: '2', label: 'audiences the design had to serve at once: patient and clinician' },
      { value: '1', label: 'shared conversation capturing structured data underneath' },
      { value: '3', label: 'core states: describe, estimate, schedule' },
    ],
  },
  painPoints: {
    eyebrow: 'Pain points',
    title: 'where intake breaks down',
    items: [
      {
        icon: Frown,
        title: 'Redundant questions',
        body: 'Patients fill out the same information on every visit. Trust drops each time the system seems to forget them.',
        frame: '#EBBAC7',
      },
      {
        icon: Clock,
        title: 'Opaque insurance',
        body: "Most estimates are a single number with no context. Patients don't know if $75 is the copay, the max, or a wild guess.",
        frame: '#C4D7D1',
      },
      {
        icon: Search,
        title: 'No next step',
        body: "The intake ends with 'someone will be with you shortly.' No booking, no summary, no clarity on what happens next.",
        frame: '#B5CDEF',
      },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'Elena · 34',
        role: 'Working parent, sporadic care',
        bio: 'Books visits between meetings. Needs to ask one question, hear one honest answer, and schedule without leaving the thread.',
        goals: ['Free-text symptoms', 'Realistic insurance range', 'Same-flow scheduling'],
        frustrations: ['Repeating her history', 'Vague cost estimates'],
        accent: '#B5CDEF',
      },
      {
        name: 'Marcus · 58',
        role: 'Managing chronic condition',
        bio: 'Has used the clinic for years. Wants the system to remember him, prefer plain language, and get him to scheduling quickly.',
        goals: ['Continuity across visits', 'Plain-English insurance explanation', 'Quick rebooking'],
        frustrations: ['Every visit feels like the first', 'Jargon in cost estimates'],
        accent: '#EBBAC7',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What good patient-intake tools get right',
    intro:
      "We looked at three intake platforms (two EMR-integrated, one direct-to-patient) and a handful of mental-health chat tools. The chat tools had the warmest UX; the EMRs had the best data capture. The opportunity was in the seam.",
    swot: {
      strengths: [
        'Structured data piped straight into the clinician view',
        'Plain-English insurance ranges',
        'Real scheduling inside the chat',
      ],
      weaknesses: [
        'English-only at launch',
        'No EMR integration yet (export-only)',
        'AI hallucinations possible without careful guardrails',
      ],
      opportunities: [
        'Community clinics with lean IT teams',
        'Telehealth platforms needing a human front door',
        'Spanish-speaking patient populations underserved',
      ],
      threats: [
        'Large EMR vendors adding chat features natively',
        'Regulatory overhead (HIPAA, state-specific)',
      ],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might we make intake feel like a conversation?',
    items: [
      { index: 1, title: 'Conversation on the left, structure on the right', body: 'Chat feels human; a structured sidebar always shows the clinician-facing data captured so far.' },
      { index: 2, title: 'Honest insurance ranges',                          body: 'Instead of one number, show a range with context: likely copay, possible max, what influences it.' },
      { index: 3, title: 'Schedule inside the thread',                       body: "When the conversation resolves, the next action — booking — happens inline. No second product to open." },
    ],
  },
  wireframes: {
    eyebrow: 'Wireframes',
    title: 'Sketching the seam between chat and form',
    body:
      "The hardest moment was deciding what the sidebar shows. Too little and clinicians don't trust it; too much and the patient feels watched. I sketched four variants before landing on a minimal 'confirmed so far' pattern.",
    sketches: [
      { caption: 'Welcome state — single input · calm tone · one example prompt' },
      { caption: 'Active chat — left column · sidebar with confirmed fields' },
      { caption: 'Cost state — range card · explanation · not a single number' },
      { caption: 'Schedule state — inline calendar · confirmation · summary export' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'A form on paper vs. a conversation that captures the same data',
    before: {
      label: 'Before',
      title: 'Five-page intake forms',
      body: 'Patients fill out static fields in a waiting room, then wait again while someone reviews them.',
      frame: '#F5EDE3',
      media: { src: '/images/ClinixCheckIn.png', kind: 'image', alt: 'Original Clinix check-in flow' },
    },
    after: {
      label: 'After',
      title: 'Chat-first intake with a structured sidebar',
      body: 'Same data reaches the clinician — captured mid-conversation, without the form fatigue.',
      frame: '#B5CDEF',
      media: { src: '/images/ClinixCheckinChat.png', kind: 'image', alt: 'Clinix chat-first intake' },
    },
  },
  keyFeatures: {
    eyebrow: 'Key improvements at a glance',
    title: 'What we built',
    items: [
      { icon: MessageSquareQuote, title: 'Chat-first intake',       body: 'Free-text symptoms, friendly tone, structured data silently captured on the side.', frame: '#EBBAC7' },
      { icon: Users,              title: 'Insurance ranges',        body: 'Realistic cost ranges with plain-English context, not a single mystery number.',     frame: '#C4D7D1' },
      { icon: Palette,            title: 'Inline scheduling',       body: 'Book a visit without leaving the thread. The conversation resolves into an action.', frame: '#B5CDEF' },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      "Healthcare UX is unforgiving: trust is fragile, stakes are real, and small copy choices carry weight. Clinix taught me to design not only the happy path but the pauses — the moments the system says 'I don't know, let me route you to someone who does.'",
    takeaways: [
      { title: 'Structure and warmth aren\'t opposites',         body: 'A sidebar of confirmed fields made the chat feel more trustworthy, not less.' },
      { title: 'Honesty scales better than optimism',            body: 'Ranges with plain-English context read as more honest than a single precise-but-vague number.' },
      { title: 'Always show the next step',                      body: 'An intake that ends in silence is broken. Ending in scheduling is what makes it a product.' },
    ],
    nextSteps: [
      'Spanish-language intake flow (informed by community clinic feedback)',
      'EMR export that maps cleanly to Epic and Athena schemas',
      'Escalation mode for red-flag symptoms (sudden chest pain, stroke signals)',
      'Clinician dashboard with end-of-day summaries',
    ],
  },
};

const EDGESCOPE: CaseStudy = {
  slug: 'edgescope',
  name: 'EdgeScope',
  tagline: 'Real-time edge traffic intelligence — simulated, visualized, and explained by AI',
  themeAccent: '#0071E3',
  cover: {
    frames: ['#C4D7D1', '#B5CDEF', '#EBBAC7'],
    icon: Globe,
    badges: ['Edge', 'Workers AI', 'Solo build'],
  },
  about: {
    heading: 'About the Project',
    body:
      "EdgeScope is a solo project I built on Cloudflare's platform to explore edge computing for observability. It simulates realistic traffic across 24 global edge nodes, detects anomalies with statistical analysis, and uses Workers AI (Llama 3) to explain likely root causes — all running at the edge. It is a demo and learning build, not a deployed product, so there are no real users behind it; everything here is simulated traffic.",
  },
  role: 'Solo · full-stack',
  timeline: '2025',
  skills: [
    'Cloudflare Workers',
    'Workers AI (Llama 3)',
    'Cloudflare KV',
    'Next.js + TypeScript',
    'Hono API framework',
    'Canvas visualization',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ryanlyn29/cf_ai_edgescope' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'distributed systems are hard to see in real time',
    body:
      "Edge networks fail in ways that are hard to picture: a latency spike in one region, an error burst in another, a dependency quietly degrading. I wanted something that made edge traffic legible at a glance — and that could explain an anomaly, not just flag it. Since I did not have production traffic, I built a simulator that generates realistic patterns so the visualization and AI analysis have something honest to work with.",
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the build.',
    items: [
      { author: 'Legibility',         stars: 4, body: 'The live map makes traffic and anomalies easy to read at a glance. Dense regions can still crowd the canvas.', date: 'Post-build' },
      { author: 'AI usefulness',      stars: 4, body: 'Llama 3 root-cause summaries are genuinely helpful as plausible explanations — they are suggestions, not ground truth.', date: 'Post-build' },
      { author: 'Simulation realism', stars: 3, body: 'Geographic latency and anomaly injection feel believable, but it is still a simulation, not real production data.', date: 'Post-build' },
      { author: 'Edge-native design', stars: 5, body: 'Workers, Workers AI, and KV fit the problem cleanly — analysis runs close to where the data would live.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The product behaviors I designed around — the assumptions and open questions that guided the build.',
    insights: [
      { quote: 'An operator wants the explanation first, then the raw metrics underneath.',  role: 'design assumption' },
      { quote: 'A map beats a table for spotting where something is going wrong.',           role: 'design assumption' },
      { quote: 'AI analysis is only trusted if it shows its reasoning, not just a verdict.', role: 'open question' },
      { quote: 'Running analysis at the edge should feel fast enough to be interactive.',    role: 'design principle' },
    ],
    surveyStats: [
      { value: '24', label: 'global edge nodes modeled in the simulation' },
      { value: '500ms', label: 'cadence of simulated traffic generation' },
      { value: '30d', label: 'KV retention for replayable sessions' },
    ],
  },
  painPoints: {
    eyebrow: 'Challenges',
    title: 'what made this tricky',
    items: [
      { icon: Search, title: 'No real traffic to learn from', body: 'Without production data, I had to build a simulator believable enough that anomalies and AI analysis would mean something.', frame: '#C4D7D1' },
      { icon: Clock,  title: 'Keeping the canvas readable',    body: 'Live flows across 24 nodes can turn into noise. Color-coding and clear status states keep the map legible under load.', frame: '#B5CDEF' },
      { icon: Frown,  title: 'Helpful AI, not authoritative',  body: 'LLM root-cause analysis can sound certain. The UI frames it as a suggestion with reasoning, never a guarantee.', frame: '#EBBAC7' },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'On-call SRE',
        role: 'Hypothetical · reliability',
        bio: 'Watches edge health during incidents. Wants the likely cause fast, with metrics to confirm it.',
        goals: ['Spot the failing region instantly', 'Get a plausible root cause', 'Replay what happened'],
        frustrations: ['Dashboards that only show raw numbers', 'Alerts with no explanation'],
        accent: '#C4D7D1',
      },
      {
        name: 'Platform learner',
        role: 'Hypothetical · student',
        bio: 'Curious how edge computing and Workers AI fit together. Wants to poke at a system and see cause and effect.',
        goals: ['Understand edge concepts visually', 'Trigger and inspect anomalies', 'See the AI reasoning'],
        frustrations: ['Abstract docs with no demo', 'Black-box AI output'],
        accent: '#B5CDEF',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What strong observability tools get right',
    intro:
      'Real observability platforms (Datadog, Grafana, Cloudflare analytics) are the reference point. EdgeScope is not competing with them — it is a focused demo of running detection and AI explanation at the edge. Here is an honest SWOT.',
    swot: {
      strengths: ['Edge-native: analysis runs in Workers', 'Visual-first, explanation-first UX', 'Self-contained simulator needs no live data'],
      weaknesses: ['Simulated, not real, traffic', 'Single-region demo scale', 'AI analysis is best-effort'],
      opportunities: ['Plug into real Cloudflare analytics later', 'Add more anomaly types', 'Replay-driven incident training'],
      threats: ['Mature incumbents own real observability', 'LLM cost and rate limits at higher volume'],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might an edge dashboard explain itself?',
    items: [
      { index: 1, title: 'Show the network, not a table', body: 'A canvas world map renders live flows so anomalies are spatial and obvious.' },
      { index: 2, title: 'Explain anomalies at the edge', body: 'Workers AI summarizes likely root cause, impact, and next actions right next to the data.' },
      { index: 3, title: 'Make sessions replayable',       body: 'KV stores sessions so any run can be reopened and studied after the fact.' },
    ],
  },
  wireframes: {
    eyebrow: 'Structure',
    title: 'Mapping the dashboard before building',
    body:
      'I sketched the core surfaces — the live map, the metrics strip, the anomaly cards, and the AI chat — and how they all share one simulation session.',
    sketches: [
      { caption: 'Network map — live nodes · color-coded flows · anomaly markers' },
      { caption: 'Metrics strip — requests · latency · success rate · errors' },
      { caption: 'Anomaly card — severity · affected nodes · Analyze with AI' },
      { caption: 'Chat — ask about a session · grounded in current traffic' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'Raw metrics vs. an explained map',
    before: {
      label: 'Typical',
      title: 'Numbers without a story',
      body: 'Most dashboards show what changed, not why. You read charts and infer the cause yourself.',
      frame: '#F5EDE3',
    },
    after: {
      label: 'EdgeScope',
      title: 'A live map that explains itself',
      body: 'Anomalies appear in place on the map, and AI offers a plausible root cause with its reasoning.',
      frame: '#C4D7D1',
    },
  },
  keyFeatures: {
    eyebrow: 'Key features at a glance',
    title: 'What I built',
    items: [
      { icon: Layers,    title: 'Live network map',       body: 'Canvas visualization of 24 edge nodes with color-coded, real-time traffic flows.', frame: '#EBBAC7' },
      { icon: Lightbulb, title: 'AI root-cause analysis', body: 'Workers AI (Llama 3) turns an anomaly into a readable summary, impact, and recommended actions.', frame: '#C4D7D1' },
      { icon: Target,    title: 'Replayable sessions',    body: 'Cloudflare KV stores runs for 30 days so any session can be reopened and analyzed.', frame: '#B5CDEF' },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      "EdgeScope was my way of learning Cloudflare's edge stack by building something end to end. The biggest lesson: AI analysis earns trust only when it shows its reasoning and stays clearly labeled as a suggestion.",
    takeaways: [
      { title: 'Simulate honestly when you lack data', body: 'A believable simulator let me design the real UX without pretending to have production traffic.' },
      { title: 'Explanation beats raw metrics',        body: 'Pairing the map with AI reasoning made the system feel understandable, not just monitored.' },
      { title: 'Edge-native has real ergonomics',      body: 'Running analysis in Workers kept the loop fast and the architecture simple.' },
    ],
    nextSteps: [
      'Wire in real Cloudflare analytics as an optional data source',
      'Expand the anomaly taxonomy beyond latency and error bursts',
      'Add guardrails and caching around the AI calls',
    ],
  },
};

const NAVORA: CaseStudy = {
  slug: 'navora',
  name: 'Navora',
  tagline: 'Headless physics simulation with a USD-first, viewer-agnostic pipeline',
  themeAccent: '#248A3D',
  cover: {
    frames: ['#EBBAC7', '#C4D7D1', '#B5CDEF'],
    icon: Boxes,
    badges: ['USD-first', 'Headless', 'Solo build'],
  },
  about: {
    heading: 'About the Project',
    body:
      'Navora is a solo systems project: a headless physics simulator that writes time-sampled USD files you can open in Blender, Omniverse, or any USD-capable tool. The idea is a clean separation — simulation is authoritative and runs without a GPU, while rendering is left entirely to external viewers. It is an engineering exploration, not a product, so there are no users here — just a pipeline I wanted to get right.',
  },
  role: 'Solo · systems & tooling',
  timeline: '2025',
  skills: [
    'Python simulation',
    'OpenUSD authoring',
    'C++ internals',
    'Time-sampled transforms',
    'Blender / Omniverse interop',
    'Headless architecture',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ryanlyn29/Navora' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'simulation and rendering are usually tangled together',
    body:
      'Most simulation setups bolt rendering directly onto the physics, which ties you to specific hardware (CUDA/RTX) and specific tools. I wanted the opposite: a simulation that runs anywhere, headless, and emits a portable, deterministic USD file. Then any viewer — Blender, Omniverse, Houdini — can open it. Decoupling the two is the whole point.',
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the pipeline.',
    items: [
      { author: 'Viewer-agnostic output', stars: 5, body: 'USD files open cleanly in Blender with hierarchy and animation intact. The core promise holds.', date: 'Post-build' },
      { author: 'Hardware independence',   stars: 5, body: 'No GPU or CUDA needed to simulate — it runs on plain Python, which was the point.', date: 'Post-build' },
      { author: 'Physics depth',          stars: 3, body: 'Gravity, collisions, and time-stepping work; the physics is intentionally minimal, not a full engine.', date: 'Post-build' },
      { author: 'Developer ergonomics',   stars: 4, body: 'The entity and writer API is small and readable; docs and examples could go further.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The principles and constraints I designed around from the start.',
    insights: [
      { quote: 'The USD file should be the single source of truth, not any one viewer.', role: 'design principle' },
      { quote: 'Simulation must run headless so it works on any hardware.',              role: 'design principle' },
      { quote: 'Time-sampled transforms are what make timeline scrubbing just work.',    role: 'design assumption' },
      { quote: 'Standard USD schemas keep it Omniverse-compatible without extra glue.',  role: 'open question' },
    ],
    surveyStats: [
      { value: 'USD', label: 'authoritative output format for every run' },
      { value: 'Z-up', label: 'coordinate system, standard for USD and Blender' },
      { value: '0', label: 'GPU dependencies required to simulate' },
    ],
  },
  painPoints: {
    eyebrow: 'Challenges',
    title: 'what made this tricky',
    items: [
      { icon: Search, title: 'Coordinate-system mismatches', body: 'Getting Z-up USD to import into Blender without manual rotation took careful stage setup and a pre-rotation.', frame: '#EBBAC7' },
      { icon: Clock,  title: 'Time-sampling correctly',      body: 'Keyframing every transform so timelines scrub smoothly meant being disciplined about how state is written per frame.', frame: '#C4D7D1' },
      { icon: Frown,  title: 'Resisting scope creep',        body: 'It was tempting to add a viewer. Keeping rendering out kept the architecture honest and portable.', frame: '#B5CDEF' },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'Technical artist',
        role: 'Hypothetical · pipeline',
        bio: 'Wants simulation output that drops into Blender or Omniverse without fighting coordinate systems.',
        goals: ['Import USD with no manual fixes', 'Scrub a clean timeline', 'Stay tool-agnostic'],
        frustrations: ['Renderer lock-in', 'Broken hierarchies on import'],
        accent: '#EBBAC7',
      },
      {
        name: 'Simulation tinkerer',
        role: 'Hypothetical · developer',
        bio: 'Wants a small, readable API to script simulations and inspect the output.',
        goals: ['Spawn entities in a few lines', 'Run headless anywhere', 'Get deterministic output'],
        frustrations: ['Heavy engine setup', 'GPU requirements'],
        accent: '#C4D7D1',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What mature simulation pipelines get right',
    intro:
      'Isaac Sim, Omniverse, and game engines are the heavyweight reference points. Navora deliberately does less: a headless simulator with a clean USD hand-off, explicitly not a renderer. Here is an honest SWOT.',
    swot: {
      strengths: ['Hardware-independent, headless sim', 'Portable, deterministic USD output', 'Works with any USD viewer'],
      weaknesses: ['Minimal physics, not a full engine', 'No built-in rendering', 'Small example set'],
      opportunities: ['Richer physics: constraints and joints', 'More example scenes', 'Omniverse Connector polish'],
      threats: ['Mature ecosystems (Omniverse, engines)', 'USD spec churn over time'],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might simulation stay viewer-agnostic?',
    items: [
      { index: 1, title: 'Make USD authoritative',  body: 'All scene state is written to USD so no single viewer owns the truth.' },
      { index: 2, title: 'Keep simulation headless', body: 'Physics runs without rendering or a GPU, so it works on any machine.' },
      { index: 3, title: 'Time-sample everything',   body: 'Transforms are keyframed so any USD tool can scrub the animation.' },
    ],
  },
  wireframes: {
    eyebrow: 'Structure',
    title: 'The pipeline, sketched before code',
    body:
      'Navora is a pipeline more than a UI, so the sketch was the data flow: simulate, author USD, hand off to a viewer, with a thin debug UI for control.',
    sketches: [
      { caption: 'Sim core — entities · physics step · per-frame state' },
      { caption: 'USD writer — stage setup · time-sampled transforms · save' },
      { caption: 'Viewer hand-off — import into Blender / Omniverse' },
      { caption: 'Debug UI — start/stop · spawn entities · export' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'Coupled engine vs. a decoupled pipeline',
    before: {
      label: 'Typical',
      title: 'Rendering bolted onto simulation',
      body: 'Output is tied to one renderer and one hardware stack; portability suffers.',
      frame: '#F5EDE3',
    },
    after: {
      label: 'Navora',
      title: 'Headless sim, USD hand-off',
      body: 'Simulation writes portable USD; you open it in whatever viewer you prefer.',
      frame: '#B5CDEF',
    },
  },
  keyFeatures: {
    eyebrow: 'Key features at a glance',
    title: 'What I built',
    items: [
      { icon: Layers,    title: 'Headless physics engine', body: 'Gravity, collisions, and time-stepping with no rendering or GPU dependency.', frame: '#EBBAC7' },
      { icon: Target,    title: 'Time-sampled USD writer', body: 'Authors standard USD with keyframed transforms for clean timeline scrubbing.', frame: '#C4D7D1' },
      { icon: Lightbulb, title: 'Viewer-agnostic output',  body: 'Opens in Blender, Omniverse, or any USD-capable tool with hierarchy intact.', frame: '#B5CDEF' },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      'Navora was an exercise in drawing a hard boundary and respecting it. Keeping simulation and rendering separate made the whole thing more portable and easier to reason about.',
    takeaways: [
      { title: 'Decoupling pays off',           body: 'A clean USD hand-off removed hardware and tool lock-in entirely.' },
      { title: 'Standards beat custom formats', body: 'Leaning on USD schemas made the output work everywhere for free.' },
      { title: 'Saying no keeps systems clean', body: 'Refusing to add a renderer kept the architecture focused and honest.' },
    ],
    nextSteps: [
      'Add richer physics: constraints and joints',
      'Publish more example scenes and documentation',
      'Validate against Omniverse end to end',
    ],
  },
};

const WEAVE: CaseStudy = {
  slug: 'weave',
  name: 'Weave',
  tagline: 'A messaging platform that remembers, organizes, and surfaces what matters',
  themeAccent: '#8944AB',
  cover: {
    frames: ['#B5CDEF', '#EBBAC7', '#C4D7D1'],
    icon: MessagesSquare,
    badges: ['Full-stack', 'Spring Boot', 'Solo build'],
  },
  about: {
    heading: 'About the Project',
    body:
      'Weave is a solo full-stack project: a messaging platform for high-trust groups where conversations are automatically remembered, organized, and made searchable. I built the Next.js frontend and a Java 21 / Spring Boot backend behind it, wired up with Firebase auth and real-time thread updates. It is a production-grade architecture I built to learn, not a launched app — so there are no real users behind it yet.',
  },
  role: 'Solo · full-stack',
  timeline: '2025',
  skills: [
    'Next.js + TypeScript',
    'Java 21 / Spring Boot',
    'PostgreSQL + Flyway',
    'Firebase + NextAuth',
    'Server-Sent Events',
    'REST API design',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ryanlyn29/Weave' },
  ],
  problem: {
    eyebrow: 'Problem',
    title: 'group chats forget everything that matters',
    body:
      'In group messaging, the important stuff — decisions, links, context — scrolls away and is gone. I wanted a messaging app where memory is a first-class feature: conversations get organized and stay searchable, so a high-trust group can actually find what was said. It was also a chance to build a real, layered architecture end to end.',
  },
  reviews: {
    eyebrow: 'Post-build evaluation',
    title: 'What worked, what still needs hardening',
    intro:
      'A look at what landed and what I would still harden in the build.',
    items: [
      { author: 'Architecture clarity',  stars: 5, body: 'Clean separation: Next.js proxies a Spring Boot API, with auth verified server-side. The layering is something I am proud of.', date: 'Post-build' },
      { author: 'Real-time feel',        stars: 4, body: 'SSE keeps threads updating live; it is simpler than websockets and fits the read-heavy flow well.', date: 'Post-build' },
      { author: 'Memory features',       stars: 3, body: 'Entity extraction and a searchable library are in place; the living-memory idea has lots of room to grow.', date: 'Post-build' },
      { author: 'Auth and provisioning', stars: 4, body: 'Firebase tokens verified by the backend with auto-provisioning works smoothly across the stack.', date: 'Post-build' },
    ],
  },
  interviews: {
    eyebrow: 'Design assumptions',
    title: 'Product behaviors I designed around',
    intro:
      'The product behaviors I designed around — the assumptions and questions that guided the architecture.',
    insights: [
      { quote: 'A group trusts memory features only if search actually finds the right thing.', role: 'design assumption' },
      { quote: 'Real-time updates should feel live without the weight of full websockets.',     role: 'open question' },
      { quote: 'The frontend should never talk to the database directly — always via the API.', role: 'design principle' },
      { quote: 'Auth should auto-provision a user so onboarding stays invisible.',              role: 'design assumption' },
    ],
    surveyStats: [
      { value: '2', label: 'tiers: Next.js frontend and Spring Boot API' },
      { value: 'SSE', label: 'transport chosen for live thread updates' },
      { value: 'Flyway', label: 'migrations that run automatically on startup' },
    ],
  },
  painPoints: {
    eyebrow: 'Challenges',
    title: 'what made this tricky',
    items: [
      { icon: Search, title: 'Bridging two runtimes',     body: 'Wiring a TypeScript frontend to a Java backend cleanly meant a disciplined proxy and token-passing layer.', frame: '#B5CDEF' },
      { icon: Clock,  title: 'Real-time without overkill', body: 'Choosing SSE over websockets kept live updates simple for a mostly read-heavy messaging flow.', frame: '#EBBAC7' },
      { icon: Frown,  title: 'Auth across the stack',      body: 'Verifying Firebase tokens server-side and auto-provisioning users took care to get right end to end.', frame: '#C4D7D1' },
    ],
  },
  personas: {
    eyebrow: 'Design personas',
    title: 'Hypothetical users I kept in mind',
    items: [
      {
        name: 'Close-knit group',
        role: 'Hypothetical · members',
        bio: 'A small high-trust group that shares decisions and links and hates losing them to the scroll.',
        goals: ['Find past decisions fast', 'Trust that nothing important is lost', 'Stay in one place'],
        frustrations: ['Endless scrollback', 'Search that misses context'],
        accent: '#B5CDEF',
      },
      {
        name: 'Group organizer',
        role: 'Hypothetical · admin',
        bio: 'Keeps the group on track and wants conversations to stay organized and retrievable over time.',
        goals: ['Organized threads', 'A searchable library', 'Low-friction onboarding'],
        frustrations: ['Manual note-taking', 'Re-explaining old context'],
        accent: '#EBBAC7',
      },
    ],
  },
  competitive: {
    eyebrow: 'Reference patterns',
    title: 'What good messaging tools get right',
    intro:
      'Slack, Discord, and iMessage are the reference points. The angle for Weave is memory as a feature, not search bolted on afterward. It is a learning build, so this SWOT is honest about where it stands.',
    swot: {
      strengths: ['Memory and search as first-class features', 'Clean layered architecture', 'Real-time via lightweight SSE'],
      weaknesses: ['No real users yet', 'Single-server setup', 'Memory features are early'],
      opportunities: ['Smarter entity extraction', 'Cross-thread knowledge graph', 'Voice and richer media'],
      threats: ['Incumbent network effects', 'Privacy expectations for stored history'],
    },
  },
  goals: {
    eyebrow: 'Design goals in action',
    title: 'How might a group chat remember itself?',
    items: [
      { index: 1, title: 'Make memory first-class', body: 'Conversations are organized and stored so the important parts stay findable.' },
      { index: 2, title: 'Keep the frontend thin', body: 'Next.js proxies a Spring Boot API; all data and auth logic live behind the API.' },
      { index: 3, title: 'Feel live, stay simple',  body: 'Server-Sent Events push thread updates without the complexity of full websockets.' },
    ],
  },
  wireframes: {
    eyebrow: 'Structure',
    title: 'The surfaces, mapped before building',
    body:
      'I mapped the core flows — inbox, thread, library, and search — and how each one calls through to the backend API.',
    sketches: [
      { caption: 'Inbox — threads · activity · notifications' },
      { caption: 'Thread — messages · live SSE updates · entities' },
      { caption: 'Library — saved knowledge · entities pulled from chats' },
      { caption: 'Search — one query across threads and library' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The final product',
    title: 'Disposable chat vs. living memory',
    before: {
      label: 'Typical',
      title: 'Messages scroll away',
      body: 'Context and decisions are buried the moment the conversation moves on.',
      frame: '#F5EDE3',
    },
    after: {
      label: 'Weave',
      title: 'Conversations that stick',
      body: 'Threads are organized, entities are extracted, and search makes the past retrievable.',
      frame: '#B5CDEF',
    },
  },
  keyFeatures: {
    eyebrow: 'Key features at a glance',
    title: 'What I built',
    items: [
      { icon: MessageSquareQuote, title: 'Memory-first threads', body: 'Conversations are organized and stored so the important parts stay searchable.', frame: '#EBBAC7' },
      { icon: Target,             title: 'Layered full-stack',   body: 'A Next.js frontend proxying a Java 21 / Spring Boot API over PostgreSQL.', frame: '#C4D7D1' },
      { icon: Lightbulb,          title: 'Live updates via SSE', body: 'Threads update in real time using Server-Sent Events, with Firebase-backed auth.', frame: '#B5CDEF' },
    ],
  },
  conclusion: {
    eyebrow: 'Conclusion',
    title: 'Takeaways & next steps',
    body:
      'Weave was my deepest full-stack build — two runtimes, real auth, and real-time updates wired together. The lesson that stuck: a clean boundary between frontend and API makes everything else easier to change.',
    takeaways: [
      { title: 'Boundaries make systems flexible',       body: 'Keeping the frontend off the database meant the backend could evolve freely.' },
      { title: 'Pick the simplest transport that works', body: 'SSE delivered the live feel without websocket overhead.' },
      { title: 'Memory is a product, not a search box',  body: 'Designing for retrieval up front changes how the whole app is structured.' },
    ],
    nextSteps: [
      'Deepen entity extraction and the knowledge library',
      'Add tests and CI around the auth and proxy layer',
      'Explore multi-instance scaling for the API',
    ],
  },
};

export const CASE_STUDIES: CaseStudy[] = [WHITEFLOW, AGENTGUARD, CLINIX, EDGESCOPE, NAVORA, WEAVE];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const idx = CASE_STUDIES.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? CASE_STUDIES[idx - 1] : CASE_STUDIES[CASE_STUDIES.length - 1];
  const next = idx < CASE_STUDIES.length - 1 ? CASE_STUDIES[idx + 1] : CASE_STUDIES[0];
  return { prev, next };
}

export type { LucideIcon };
