const { useState, useEffect, useRef } = React;

/* ── VARIABLE PROXIMITY COMPONENT ───────────────────────────────────────── */
function VariableProximity({ label, className, fromFontVariationSettings, toFontVariationSettings, containerRef, radius = 250, falloff = 'linear' }) {
  const charRefs = useRef([]);
  const mouse    = useRef({ x: -9999, y: -9999 });
  const raf      = useRef(null);

  const parseFVS = (s) =>
    [...s.matchAll(/'([^']+)'\s*([\d.]+)/g)].map(m => ({ axis: m[1], val: +m[2] }));

  const fromAxes = useRef(parseFVS(fromFontVariationSettings));
  const toAxes   = useRef(parseFVS(toFontVariationSettings));

  const updateChars = () => {
    const cnt = containerRef.current;
    if (!cnt) return;
    const cR = cnt.getBoundingClientRect();
    charRefs.current.forEach(el => {
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left - cR.left + r.width  / 2;
      const cy = r.top  - cR.top  + r.height / 2;
      const d  = Math.hypot(mouse.current.x - cx, mouse.current.y - cy);
      let t = Math.max(0, 1 - d / radius);
      if (falloff === 'exponential') t = t * t;
      el.style.fontVariationSettings = fromAxes.current.map((f, i) => {
        const toV = (toAxes.current[i] || f).val;
        return `'${f.axis}' ${(f.val + (toV - f.val) * t).toFixed(1)}`;
      }).join(', ');
    });
  };

  useEffect(() => {
    const cnt = containerRef.current;
    if (!cnt) return;
    const onMove = (e) => {
      const r = cnt.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(updateChars);
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(updateChars);
    };
    cnt.addEventListener('mousemove', onMove);
    cnt.addEventListener('mouseleave', onLeave);
    return () => {
      cnt.removeEventListener('mousemove', onMove);
      cnt.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <span className={className}>
      {label.split('').map((ch, i) => (
        <span key={i} ref={el => { charRefs.current[i] = el; }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

/* ── SHARED DATA ─────────────────────────────────────────────────────────── */
const ABOUT = [
  { label: "GTM", body: "Outbound sales, account management, and marketing experience across a pre-seed startup, Amazon, and Idealo. Enjoy building my own GTM infrastructure and playbook." },
  { label: "AI", body: "AWS certified AI Practitioner & Machine Learning Engineer (Associate). I use the right tools to automate the 20% of work that drives 80% of the results." },
  { label: "Multilingual", body: "Business fluent in German (C1) and English (C1), near-native in Mandarin Chinese, and native in Cantonese." },
  { label: "Orange", body: "Orange is my color :) I light up around people with different stories. I enjoy walking, cooking, art, hanging out with friends, and meeting new people when I'm free." },
];

const ROLES = [
  {
    title: "FOUNDER'S ASSOCIATE (INTERN)",
    company: "SCENARIUM AI",
    date: "12/25 – 03/26 · Berlin",
    tagline: "Owned outbound sales, product launch, product & operations for a pre-seed-stage construction tech startup.",
    details: [
      "Ran a LinkedIn outbound sales campaign; managed demo calls with C-level executives from German electrical engineering firms and converted priority 1 pipeline leads.",
      "Produced product launch comms: LinkedIn posts, product videos, website and UI updates.",
      "Synthesized customer and pilot feedback into structured feature requests, directly shaping product roadmap.",
      "Conducted weekly product testing across new features and resolved QA tickets; independently debugged a key usability blocker (symbol rescaling/coloring) within the first month without engineering support.",
      "Owned finance and ops end-to-end, managing investor reporting, accounting, employee management and payroll.",
    ],
  },
  {
    title: "ACCOUNT REPRESENTATIVE (INTERN)",
    company: "AMAZON",
    date: "03/25 – 09/25 · Berlin",
    tagline: "Supported German B2B clients with US expansion. Initiated and organized AI workshops and an AI agent project.",
    details: [
      "Managed portfolio of B2B German customers entering US markets.",
      "Identified root causes of listing failures; led cross-functional correction across US and India teams.",
      "Executed multi-channel marketing across five EU markets including localized websites and SEO blog posts.",
      "Initiated and prototyped AI agent automating routine information retrieval and ticket management.",
      "Designed and facilitated AI Builder Workshop for account managers.",
    ],
  },
  {
    title: "INTERNATIONAL BUSINESS DEVELOPMENT & ANALYSIS (WORKING STUDENT)",
    company: "IDEALO",
    date: "09/24 – 02/25 · Berlin",
    tagline: "Managed business performance metrics, financial reporting, and business development initiatives across five European markets.",
    details: [
      "Generated and qualified high-potential leads through targeted research.",
      "Analyzed website performance using Sistrix and SimilarWeb.",
      "Developed Tableau and Excel dashboards tracking financial KPIs; reported monthly to five country managers.",
    ],
  },
  {
    title: "OPERATIONS & EVENT SUPPORT (WORKING STUDENT)",
    company: "REVENT CAPITAL",
    date: "03/23 – 08/24 · Berlin",
    tagline: "Oversee operations and event management in an impact VC fund.",
    details: [
      "Spearheaded strategic initiatives under VP of Operations: bookkeeping, carbon accounting, EU sustainability regulation research.",
      "Coordinated Board Meetings and AGMs for LPs and founders with planning, budgeting and vendor management.",
      "Assisted in fundraising lead generation with the investment team.",
    ],
  },
];

const PROJECTS = [
  {
    tag: "GTM",
    title: "AUTOMATED LEADS GENERATION & ENRICHMENT",
    summary: "Saved 94 hours of manual research by automating lead generation for 98 German bakery chains using Clay, Apollo, and n8n.",
    blocks: [
      { bg: "task", ink: true, title: "Task",
        paras: ["Generate qualified leads (Head of Ops, HRs, CEOs) from the top 100 bakery chains in Germany."] },
      { bg: "ink", ink: false, title: "Challenge",
        paras: ["The outbound sales teams spend ~15–30 minutes per lead manually finding and verifying phone, email, and LinkedIn for background research."] },
      { bg: "orange", ink: false, title: "What I've built",
        paras: [
          "I identified the top 100 bakeries by size through Google search. I then used this list as a basis to find leads using Clay, Apollo, and Claude, identifying 104 leads across 35 bakeries with job titles, LinkedIn profiles, email addresses, and phone numbers.",
          "However, a challenge I encountered was that some leads were not available through these platforms. Therefore, I built an n8n web pipeline that automates the search for the remaining bakeries, which found an additional 85 leads.",
        ] },
      { bg: "results", ink: true, title: "Results & Learnings",
        paras: [
          "I returned a total of 189 leads across 89 bakeries. The n8n automation I built can be reused in other pipelines by simply changing the keywords.",
          "For enrichment, next time, I would use tools like BetterContact for DACH phone number data.",
        ] },
    ],
  },
  {
    tag: "Hackathon",
    title: "HACK NATION 2026: AI SCIENTIST (Fulcrum Science)",
    summary: "Global AI hackathon across 13 cities, building alongside students from Stanford and MIT. Built an all-in-one platform for lab research, hypothesis and protocol design, and lab procurement in 24 hours.",
    blocks: [
      { bg: "ink", ink: false, title: "Challenge",
        paras: ["The manual operational workload in scientific research and lab environments consumes a significant amount of scientists' time, preventing them from focusing on experiments that create real impact. This includes researching papers, designing experimental protocols, estimating costs, sourcing materials and requesting quotes from different suppliers."] },
      { bg: "task", ink: true, title: "Task",
        paras: ["Created an all-in-one platform to save scientists from operational workload."] },
      { bg: "orange", ink: false, title: "What we've built",
        paras: [
          "Agent Protocol is an AI-powered platform that helps scientists prepare the entire experimental workflow by automating protocol design and lab procurement. Researchers describe their experiment in natural language; the platform searches relevant research papers and past protocols to generate a customized protocol with step-by-step instructions, materials, quantities, timelines, and budget projections.",
          "A built-in feedback loop lets researchers adjust pricing, materials, or suppliers. Agent Protocol also recommends suitable products with side-by-side comparisons, can request quotes via email, and deploy voice agents to negotiate with sales reps.",
        ] },
      { bg: "results", ink: true, title: "Role: Product Research & Development",
        paras: ["Since none of our group members had a scientific background, I researched the topic and the specific challenges scientists face during lab procurement — reading scientific protocol platforms, exploring supplier platforms, and interviewing friends working in labs."] },
    ],
  },
  {
    tag: "Hackathon",
    title: "Q HACK 2026: ONE-CLICK WEEKLY BASKET (PICNIC)",
    summary: "Q Summit hackathon: Built a one-click checkout user experience for online grocery shopping in 24 hours.",
    blocks: [
      { bg: "ink", ink: false, title: "Challenge",
        paras: ['"Why are families still building grocery lists manually in 2026?" Building a weekly basket is still a 20-minute chore for online grocery shopping.'] },
      { bg: "task", ink: true, title: "Task",
        paras: ["Reduce the time and cognitive load of weekly online grocery shopping."] },
      { bg: "orange", ink: false, title: "What was built",
        list: [
          "Personalized weekly planner: suggests menus and ingredients based on purchase history, dislikes, allergies.",
          "AI shopping assistant: conversational, voice-enabled ordering for complex diets and new recipes.",
          "Recurring auto-basket: recurring items added automatically when stock runs low.",
        ] },
      { bg: "results", ink: true, title: "Role",
        paras: ["Frontend development, product development, sales deck and messaging."] },
    ],
  },
  {
    tag: "Event & Community",
    title: "2HEARTS COMMUNITY: COMMUNICATION TEAM MEMBER",
    summary: "Managing social media channels for 2hearts, a community of investors, founders, and operators with over 4,000 members with migrant backgrounds across Germany.",
  },
  {
    tag: "Event & Community",
    title: "DEEP TECH MOMENTUM 2025: TEAM LEAD OF THE STAGE TEAM",
    summary: "Managed the three-day workshop room rundown for Deep Tech Momentum as a volunteer, one of Europe's biggest deep tech events.",
  },
];

const PILLARS = [
  { title: "Constant Learning", body: "I enjoy exploring the unknown across industries, tools, and ways of thinking. I value a cycle of testing, failing, reflection, and iterating continuously." },
  { title: "Proactiveness", body: "I learn best by taking ownership. I thrive in open environments where I can initiate projects and build my own structure around them." },
  { title: "Open Communication", body: "I believe feedback and empathy help bridge differences, drive improvement and create better solutions." },
];

const TAG_STYLES = {
  "Hackathon":        { background: "var(--tab-projects)", color: "var(--ink)" },
  "GTM":              { background: "var(--ink)",          color: "var(--cream)" },
  "Event & Community":{ background: "var(--orange-bold)",  color: "var(--cream)" },
};

const BG_MAP = {
  ink:     "var(--ink)",
  orange:  "var(--orange-bold)",
  task:    "var(--task-bg)",
  results: "var(--results-bg)",
};

const TABS = [
  { id: "home",     label: "Home",            bg: "var(--tab-home)"     },
  { id: "work",     label: "Work Experience", bg: "var(--tab-work)"     },
  { id: "projects", label: "Projects",        bg: "var(--tab-projects)" },
  { id: "how",      label: "How I Work",      bg: "var(--tab-how)"      },
];

/* ── SHARED COMPONENTS ───────────────────────────────────────────────────── */
function SiteHeader({ page, setPage }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="logo" onClick={() => setPage("home")}>HOI</button>
        <nav className="nav-links">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-link${page === t.id ? " nav-link--active" : ""}`}
              onClick={() => setPage(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Eyes() {
  return (
    <div className="eyes">
      <div className="eye"><div className="pupil"></div></div>
      <div className="eye"><div className="pupil"></div></div>
    </div>
  );
}

/* ── HOME PAGE ───────────────────────────────────────────────────────────── */
function HomePage() {
  const hoiRef = useRef(null);
  return (
    <div>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-inner">
          <div>
            <p className="hero-greeting">Hi, I'm</p>
            <div ref={hoiRef} style={{ position: 'relative', display: 'inline-block' }}>
              <VariableProximity
                label="HOI"
                className="hero-name"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={hoiRef}
                radius={250}
                falloff="linear"
              />
            </div>
            <p className="hero-and">and I build.</p>
          </div>
          <ul className="hero-list">
            <li>GTM</li>
            <li>Germany-based</li>
            <li>AI &amp; Automations</li>
          </ul>
        </div>
      </section>

      {/* CTA bar */}
      <section className="cta-bar">
        <div className="cta-bar-inner">
          <a className="cta-link" href="https://www.linkedin.com/in/hoi-tung-ma-955818210/" target="_blank" rel="noreferrer">
            <span>LinkedIn</span><span className="cta-arrow">↗</span>
          </a>
          <a className="cta-link" href="https://github.com/hosannama" target="_blank" rel="noreferrer">
            <span>GitHub</span><span className="cta-arrow">↗</span>
          </a>
          <a className="cta-link" href="https://docs.google.com/document/d/1bAMxBam6dH7mII0Xq4mAp3Lgn7wKgHcEB0-dWH6hTdo/edit?usp=sharing" target="_blank" rel="noreferrer">
            <span>CV available on request</span><span className="cta-arrow">↗</span>
          </a>
        </div>
      </section>

      {/* Tech stack */}
      <section className="tech-stack">
        <h2 className="tech-label">TECH STACK</h2>
        <div className="tech-items">
          <span>n8n</span>
          <span className="tech-star">✻</span>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>Claude</span>
          <span>clay</span>
          <span className="tech-star">✦</span>
          <span>Apollo</span>
        </div>
      </section>

      {/* About Me */}
      <section className="about-section">
        <div className="about-inner">
          <div className="about-head">
            <h2 className="about-title">ABOUT<br />ME</h2>
            <Eyes />
          </div>
          <div className="about-rows">
            {ABOUT.map(a => (
              <div key={a.label} className="about-row">
                <span className="about-row-label">{a.label}</span>
                <p className="about-row-body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="connect-section">
        <h2 className="connect-heading">CONNECT</h2>
        <p className="connect-sub">and send me a Hi</p>
        <a className="connect-btn" href="https://www.linkedin.com/in/hoi-tung-ma-955818210/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </section>
    </div>
  );
}

function QuoteCard({ bg, ink, border, body, author, role }) {
  return (
    <article className="quote-card" style={{
      background: bg,
      color: ink ? "var(--ink)" : "var(--cream)",
      border: border ? "1px solid rgba(26,20,16,0.1)" : "none",
    }}>
      <span className="quote-mark">,,</span>
      <p className="quote-body">{body}</p>
      <div className="quote-attr" style={{ borderColor: ink ? "rgba(26,20,16,0.15)" : "rgba(245,237,224,0.2)" }}>
        {author && <div className="quote-author">{author}</div>}
        <div className="quote-role">{role}</div>
      </div>
    </article>
  );
}

/* ── WORK PAGE ───────────────────────────────────────────────────────────── */
function WorkPage() {
  return (
    <div>
      <div className="page-head-wrap">
        <h1 className="page-title">WORK<br />EXPERIENCE</h1>
      </div>
      <section className="work-section">
        <div className="work-list">
          {ROLES.map((r, i) => <RoleCard key={i} role={r} />)}
        </div>
      </section>
    </div>
  );
}

function RoleCard({ role }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="role-card">
      <button className="role-head" onClick={() => setOpen(!open)}>
        <div className="role-head-left">
          <h3 className="role-title">{role.title}</h3>
          <div className="role-meta">
            <span>{role.company}</span>
            <span>{role.date}</span>
          </div>
        </div>
        <span className="role-toggle">{open ? "−" : "+"}</span>
      </button>
      <p className="role-tagline">{role.tagline}</p>
      {open && (
        <div className="role-details">
          <ul className="role-bullets">
            {role.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
    </article>
  );
}

/* ── PROJECTS PAGE ───────────────────────────────────────────────────────── */
function ProjectsPage() {
  const [activeTag, setActiveTag] = useState(null);
  const [openIdx,   setOpenIdx]   = useState(null);
  const visible = activeTag ? PROJECTS.filter(p => p.tag === activeTag) : PROJECTS;

  return (
    <div>
      <div className="projects-head">
        <h1 className="projects-title-orange">PROJECTS</h1>
        <p className="projects-subtitle">THINGS I'VE BUILT ON THE SIDE</p>
        <div className="project-filters">
          {["Hackathon", "GTM", "Event & Community"].map(f => (
            <button
              key={f}
              className={`filter-chip${activeTag === f ? " filter-chip--active" : ""}`}
              style={TAG_STYLES[f]}
              onClick={() => setActiveTag(activeTag === f ? null : f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-list-wrap">
        <div className="projects-list">
          {visible.map(p => {
            const idx  = PROJECTS.indexOf(p);
            const open = openIdx === idx;
            return (
              <ProjectCard key={p.title} project={p} open={open}
                onToggle={() => setOpenIdx(open ? null : idx)} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, open, onToggle }) {
  return (
    <article className="proj-card-v2">
      <div className="proj-card-header">
        <div className="proj-card-top">
          <span className="proj-tag" style={TAG_STYLES[project.tag]}>{project.tag}</span>
          {project.blocks && (
            <button className="proj-toggle" onClick={onToggle} aria-label={open ? "Close" : "Open"}>
              {open ? "✕" : "+"}
            </button>
          )}
        </div>
        <h3 className="proj-card-title">{project.title}</h3>
        <p className="proj-card-summary">{project.summary}</p>
      </div>

      {open && project.blocks && (
        <div className="proj-detail">
          {project.blocks.map((b, i) => (
            <div key={i} className="detail-block" style={{
              background: BG_MAP[b.bg],
              color: b.ink ? "var(--ink)" : "var(--cream)",
            }}>
              <h4 className="detail-block-title">{b.title}</h4>
              {b.list
                ? <ol className="detail-ol">{b.list.map((l, j) => <li key={j}>{l}</li>)}</ol>
                : b.paras.map((p, j) => <p key={j} className="detail-para">{p}</p>)
              }
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

/* ── HOW I WORK PAGE ─────────────────────────────────────────────────────── */
function HowIWorkPage() {
  return (
    <div>
      <section className="how-section">
        <div className="how-inner">
          <div className="how-head">
            <h1 className="how-title">HOW I WORK</h1>
            <Eyes />
          </div>
          <div className="how-pillars">
            {PILLARS.map(p => (
              <div key={p.title} className="pillar-card">
                <h2 className="pillar-title">{p.title}</h2>
                <p className="pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── APP ─────────────────────────────────────────────────────────────────── */
function App() {
  const [page, setPage] = useState(() => {
    const h = window.location.hash.slice(1);
    return ["home", "work", "projects", "how"].includes(h) ? h : "home";
  });

  const navigate = (p) => {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (["home", "work", "projects", "how"].includes(h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const pages = { home: HomePage, work: WorkPage, projects: ProjectsPage, how: HowIWorkPage };
  const PageComponent = pages[page] || HomePage;

  return (
    <div>
      <SiteHeader page={page} setPage={navigate} />
      <PageComponent />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
