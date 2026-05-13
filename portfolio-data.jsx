// Data for portfolio sections

const ABOUT_CARDS = [
  {
    id: 'gtm',
    eyebrow: 'Go-to-Market',
    title: 'GTM end-to-end',
    icon: '◐',
    body: "Building and running outbound campaigns, account management, and multi-channel marketing. I build the GTM system and then run it — from lead research automation to demo calls and pipeline management, I cover the full journey.",
    variant: 'c1',
  },
  {
    id: 'ai',
    eyebrow: 'AI & Automation',
    title: 'Pick the right 20%',
    icon: '✦',
    body: "AWS Certified AI Practitioner & ML Engineer (Associate). I use Claude, N8N, Clay, and Apollo to automate the 20% of work that drives 80% of results. My edge is knowing which problem to automate, not just how.",
    variant: 'c2',
  },
  {
    id: 'builder',
    eyebrow: 'Builder Mindset',
    title: 'Test, fail, retest',
    icon: '↻',
    body: "Testing, failing, and retesting is how I move fastest. I've run experiments that failed and learned best through rebuilding them.",
    variant: 'c3',
  },
  {
    id: 'people',
    eyebrow: 'People & Communication',
    title: 'Orange is my colour.',
    icon: '◍',
    body: "Ask me what colour describes me — I'll say orange. I light up around people with different stories and perspectives. Communications team at 2hearts, a German community of 4,000+ people with migration backgrounds. The best ideas come from outside your industry.",
    variant: 'c4',
  },
  {
    id: 'lang',
    eyebrow: 'Languages',
    title: 'Fluent in two worlds',
    icon: 'A',
    body: "German (C1) & English (C1). Comfortable running outbound, demo calls, and team comms in either language — useful for cross-border B2B work and German-speaking startup environments.",
    variant: 'c5',
  },
];

const EXPERIENCE = [
  {
    role: "Founder's Associate Intern",
    company: "Scenarium AI",
    location: "Berlin",
    dates: "12/2025 – 03/2026",
    tagline: "Owned GTM, product, and operations end-to-end.",
    bullets: [
      "Ran LinkedIn outbound sales campaign; managed demo calls and converted Priority 1 pipeline leads",
      "Produced product launch comms: LinkedIn posts, product videos, website and UI updates",
      "Synthesized customer and pilot feedback into structured feature requests, directly shaping product roadmap",
      "Owned finance and ops: investor reporting, accounting, payroll",
    ],
  },
  {
    role: "Account Representative Intern",
    company: "Amazon",
    location: "Berlin",
    dates: "03/2025 – 09/2025",
    tagline: "Supported German B2B clients entering US markets.",
    bullets: [
      "Managed portfolio of B2B German customers entering US markets",
      "Identified root causes of listing failures; led cross-functional correction across US and India teams",
      "Executed multi-channel marketing across five EU markets including localized websites and SEO blog posts",
      "Initiated and prototyped AI agent automating routine information retrieval and ticket management",
      "Designed and facilitated an AI Builder Workshop for account managers",
    ],
  },
  {
    role: "International BD & Analytics",
    company: "Idealo",
    location: "Berlin",
    dates: "09/2024 – 02/2025",
    tagline: "Business Development across 5 EU markets.",
    bullets: [
      "Generated and qualified high-potential leads through targeted research",
      "Analyzed website performance using Sistrix and SimilarWeb",
      "Developed Tableau and Excel dashboards tracking financial KPIs; reported monthly to five country managers",
    ],
  },
  {
    role: "Operations & Event Support",
    company: "Revent Capital",
    location: "Berlin",
    dates: "03/2023 – 08/2024",
    tagline: "Supported an impact-focused VC across operations, fundraising, and LP events.",
    bullets: [
      "Spearheaded strategic initiatives under VP of Operations: bookkeeping, carbon accounting, EU sustainability regulation research",
      "Coordinated Board Meetings and AGMs for LPs and founders with end-to-end planning, budgeting, vendor management",
      "Managed fundraising lead generation alongside the investment team",
    ],
  },
];

const PROJECTS = [
  {
    id: 'gtm-leads',
    span: 'featured',
    imgLabel: 'pipeline dashboard',
    tags: ['Clay', 'N8N', 'Apollo', 'GTM'],
    title: 'Automated Lead Generation',
    oneLiner: '189 qualified leads from 98 bakery chains.',
    metrics: [
      { value: '189', label: 'Leads' },
      { value: '98', label: 'Chains' },
      { value: '94h', label: 'Saved' },
    ],
    sections: [
      { h: 'Background', body: "Outbound sales teams spend ~30 minutes per lead manually finding phone, email, and LinkedIn for background research." },
      { h: 'Task', body: "Generate qualified leads (Head of Ops, HR, CEO) from the top 100 bakery chains in Germany." },
      { h: 'How it was built', list: [
        "Google search → 100 bakeries identified",
        "Clay + Apollo + Claude → 104 leads from 35 bakeries with job title, email, phone, LinkedIn",
        "N8N web pipeline → 85 more leads from the remaining 63 bakeries",
      ] },
      { h: 'Results', body: "189 leads · 98 chains · 94 hours saved." },
    ],
    pull: "The key factor for scaling sales 10×.",
  },
  {
    id: 'labprocure',
    span: 'span-6',
    imgLabel: 'lab agent ui',
    tags: ['Product', 'AI Agent', 'Hackathon'],
    title: 'LabProcure',
    oneLiner: 'Built a lab procurement agent in 24h.',
    sections: [
      { h: 'Background', body: "Scientists spend days on research papers, protocol design, and manual supplier quote requests — time that could be spent on experiments." },
      { h: 'Research', body: "No scientific background. Read protocol-hosting platforms, explored supplier directories, interviewed lab workers. Key insight: lab procurement means searching across multiple platforms manually and requesting quotes one by one." },
      { h: 'What was built', body: "LabProcure, an AI platform automating hypothesis research, protocol design, and lab procurement. The core agent auto-sends RFQ requests to suppliers, saving days per experiment." },
      { h: 'Role', body: "Led product research and definition." },
      { h: 'Result', body: "Working prototype in 24 hours. Global AI Hackathon across 13 cities including students from Stanford & MIT — Hack-Nation × Fulcrum Science." },
    ],
  },
  {
    id: 'picnic',
    span: 'span-6',
    imgLabel: 'grocery basket flow',
    tags: ['Product', 'Frontend', 'UX', 'Hackathon'],
    title: 'One-Click Weekly Basket',
    oneLiner: "Why are families still building grocery lists manually in 2026?",
    sections: [
      { h: 'Background', body: "Online grocery is convenient, but building a weekly basket is still a 20-minute chore." },
      { h: 'Task', body: "Q Hack 2026, Picnic Challenge. Reduce time and cognitive load of a weekly shop." },
      { h: 'What was built', list: [
        "Personalized weekly planner: suggests menus and ingredients based on purchase history, dislikes, allergies",
        "AI shopping assistant: conversational, voice-enabled ordering for complex diets and new recipes",
        "Recurring auto-basket: items added automatically when stock runs low",
      ] },
      { h: 'Role', body: "Frontend development, product development, sales deck and messaging." },
    ],
  },
  {
    id: 'dtm',
    span: 'span-8',
    imgLabel: 'event run-of-show',
    tags: ['Operations', 'Events', 'Leadership'],
    title: 'Stage Team Lead — Deep Tech Momentum 2025',
    oneLiner: "Ran 10+ sessions, 3 volunteers, zero delays.",
    sections: [
      { h: 'Background', body: "Deep Tech Momentum is one of Berlin's flagship deep tech events. As volunteer Stage Team Lead I managed one key workshop room end-to-end." },
      { h: 'Before the event', body: "Master spreadsheet covering technical checklist, things to bring, speaker photos, and a run-of-show doc with volunteer reminders. Made independent calls on volunteer scheduling, break timing, and coverage windows. Organized on-the-spot speaker photos for immediate social posts and sent them to speakers directly." },
      { h: 'How it ran', body: "10+ sessions running smoothly." },
    ],
  },
  {
    id: '2hearts',
    span: 'span-4',
    imgLabel: 'community',
    tags: ['Community', 'Comms'],
    title: '2hearts Community',
    oneLiner: "Comms for a 4,000+ German-wide community.",
    sections: [
      { h: 'About', body: "2hearts is a German-wide community of 4,000+ people with migration backgrounds in tech and entrepreneurship." },
      { h: 'My role', body: "Communications team — managing social media and video editing. Helping surface stories from a network that consistently produces ideas you don't see anywhere else." },
    ],
  },
];

window.PORTFOLIO_DATA = { ABOUT_CARDS, EXPERIENCE, PROJECTS };
