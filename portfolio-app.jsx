const { useState, useEffect, useRef } = React;
const { ABOUT_CARDS, EXPERIENCE, PROJECTS, TESTIMONIALS } = window.PORTFOLIO_DATA;

function Nav({ onCV }) {
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="#top" className="nav-logo" style={{ color: "rgb(240, 69, 30)" }}>Hoi <b>Tung.</b> Ma</a>
        <div className="nav-links">
          <a href="#about">About Me</a>
          <a href="#experience">Work Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button onClick={onCV} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>View CV</button>
        </div>
        <a href="#contact" className="nav-cta">
          Get in touch <span className="arr">↗</span>
        </a>
      </nav>
    </div>);

}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span>BERLIN · DE</span>
          <span className="dot"></span>
          <span>GTM OPERATOR</span>
          <span className="dot"></span>
          <span>EST. 2023</span>
        </div>
        <h1 className="hero-title">
          <div className="row1"><span className="hi">Hi, I'm</span></div>
          <div className="row2">
            <span>HOI</span><span className="ampersand">&</span><span className="hoj">she builds.</span>
          </div>
        </h1>
        <div className="hero-portrait" aria-hidden="true"></div>

        <div className="hero-bottom">
          <div className="hero-card">
            <span className="label" style={{ fontFamily: "\"Work Sans\"" }}>
</span>
            <p style={{ fontFamily: "\"Work Sans\"" }}>Germany-based GTM operator who builds.</p>
            <div className="sub">Fluent in German (C1) & English (C1)</div>
          </div>
          <div className="hero-ctas">
            <a className="hero-cta" href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn <span className="arr">↗</span>
            </a>
            <a className="hero-cta alt" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </header>);
}

function About() {
  return (
    <section id="about">
      <div className="sec-head">
        <div>
          <span className="eyebrow">● About Me</span>
          <h2>A generalist who <em>ships</em>.</h2>
        </div>
        <div className="desc">Five threads that run through every role I take — from pre-seed startups to Amazon to community building.</div>
      </div>
      <div className="about-grid">
        {ABOUT_CARDS.map((c) =>
        <article key={c.id} className={`about-card ${c.variant}`}>
            <div className="icon">{c.icon}</div>
            <span className="small-eyebrow">{c.eyebrow}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        )}
      </div>
    </section>);

}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience">
      <div className="exp-wrap">
        <aside className="exp-side">
          <span className="eyebrow">● Work Experience</span>
          <h3>Across a startup, <em>Amazon</em>, Idealo, and an impact VC.</h3>
          <p>Click any role to expand. Every move was about getting closer to GTM and the build-run loop.</p>
          <div className="companies">
            <span>Scenarium</span><span>Amazon</span><span>Idealo</span><span>Revent</span>
          </div>
        </aside>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) =>
          <div key={i} className={`exp-item ${open === i ? 'open' : ''}`}>
              <button className="exp-head" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="exp-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="exp-title">{e.role} <span className="co">— {e.company}</span></span>
                <span className="exp-meta">{e.location} · {e.dates}</span>
                <span className="exp-toggle">+</span>
              </button>
              <div className="exp-body">
                <div className="exp-body-inner">
                  <div className="exp-tagline">{e.tagline}</div>
                  <ul className="exp-bullets">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Projects({ onOpen }) {
  return (
    <section id="projects">
      <div className="sec-head">
        <div>
          <span className="eyebrow">● Extra Projects</span>
          <h2>Things I've <em>built</em> on the side.</h2>
        </div>
        <div className="desc">Click any case to open the full breakdown — context, build, role, and outcome.</div>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) =>
        <article
          key={p.id}
          className={`proj-card ${p.span === 'featured' ? 'proj-featured' : p.span}`}
          onClick={() => onOpen(p)}>
          
            <div className="proj-img" data-label={p.imgLabel}></div>
            <div className="proj-content">
              <div className="proj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <h3>{p.title}</h3>
              <p className="one-liner">{p.oneLiner}</p>
              {p.metrics &&
            <div className="proj-metrics">
                  {p.metrics.map((m, i) =>
              <div key={i} className="m"><b>{m.value}</b><span>{m.label}</span></div>
              )}
                </div>
            }
              <span className="open-pill">Open case ↗</span>
            </div>
          </article>
        )}
      </div>
    </section>);

}

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`modal-overlay ${project ? 'open' : ''}`} onClick={onClose}>
      {project &&
      <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-banner">
            <div className="modal-banner-label">{project.imgLabel}</div>
          </div>
          <div className="modal-body">
            <div className="proj-tags" style={{ marginBottom: 16 }}>
              {project.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
            <h2>{project.title}</h2>
            <p className="one-liner">{project.oneLiner}</p>

            {project.metrics &&
          <div className="modal-metrics">
                {project.metrics.map((m, i) =>
            <div key={i} className="m"><b>{m.value}</b><span>{m.label}</span></div>
            )}
              </div>
          }

            {project.sections.map((s, i) =>
          <div key={i} className="modal-section">
                <h4>{s.h}</h4>
                {s.body && <p>{s.body}</p>}
                {s.list && <ul>{s.list.map((l, j) => <li key={j}>{l}</li>)}</ul>}
              </div>
          )}

            <div className="modal-images">
              <div className="modal-img">image placeholder</div>
              <div className="modal-img">image placeholder</div>
            </div>

            {project.pull && <div className="modal-pull">"{project.pull}"</div>}
          </div>
        </div>
      }
    </div>);

}

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="sec-head">
        <div>
          <span className="eyebrow">● What others say</span>
          <h2>Words from <em>teams</em> I've worked with.</h2>
        </div>
      </div>
      <div className="test-grid">
        {TESTIMONIALS.map((t, i) =>
        <article key={i} className={`test-card ${t.variant}`}>
            <div className="quote-mark">"</div>
            <blockquote>{t.quote}</blockquote>
            <div className="test-attr">
              <b>{t.name}</b>
              <span>{t.role}</span>
            </div>
          </article>
        )}
      </div>
    </section>);

}

function Contact() {
  return (
    <section id="contact" style={{ padding: '40px 0 24px' }}>
      <div className="contact">
        <span className="eyebrow">● What's next</span>
        <h2>Let's <em>chat!</em></h2>
        <p>Open to GTM and Startup Ops conversations.</p>
        <div className="contact-ctas">
          <a className="contact-cta" href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn <span className="arr">↗</span>
          </a>
          <a className="contact-cta alt" href="mailto:hoitungma73@gmail.com">
            Email <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>);

}

function CVModal({ open, onClose }) {
  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      {open &&
      <div className="modal cv-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-body">
            <span className="eyebrow">● View CV</span>
            <h2 style={{ marginTop: 12 }}>CV available <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', color: 'var(--orange)' }}>on request</em>.</h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, marginTop: 8 }}>
              Reach out via LinkedIn or email and I'll send the latest version directly.
            </p>
            <a className="cv-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <b>LinkedIn</b><span>linkedin.com ↗</span>
            </a>
            <a className="cv-link" href="mailto:hoitungma73@gmail.com">
              <b>Email</b><span>hoitungma73@gmail.com ↗</span>
            </a>
          </div>
        </div>
      }
    </div>);

}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeProject || cvOpen ? 'hidden' : '';
  }, [activeProject, cvOpen]);

  return (
    <>
      <Nav onCV={() => setCvOpen(true)} />
      <Hero />
      <About />
      <Experience />
      <Projects onOpen={setActiveProject} />
      <Testimonials />
      <Contact />
      <footer>
        <span className="left">Hoi T. Ma</span>
        <span>© 2026 Hoi Tung Ma</span>
      </footer>
      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);