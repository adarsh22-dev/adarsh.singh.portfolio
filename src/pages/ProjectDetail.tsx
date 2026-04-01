import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../data/projects";
import "./ProjectDetail.css";
import {
  MdArrowBack, MdArrowOutward, MdCalendarToday,
  MdPerson, MdCode, MdLayers,
} from "react-icons/md";

/* ── Accent colours ── */
const CAT_COLORS: Record<string, string> = {
  "AI": "#c2a4ff", "SaaS": "#a78bfa", "Shopify": "#c2a4ff",
  "E-commerce": "#c2a4ff", "HealthTech": "#c2a4ff", "Enterprise": "#a78bfa",
  "Wellness": "#c2a4ff", "Beauty": "#c2a4ff", "Hospitality": "#c2a4ff",
  "Creative": "#c2a4ff", "Automotive": "#a78bfa", "Travel": "#c2a4ff",
  "DevTools": "#a78bfa", "FinTech": "#c2a4ff", "Logistics": "#c2a4ff",
  "WordPress": "#c2a4ff", "Plugin": "#a78bfa", "eCommerce": "#c2a4ff",
};
const getAccent = (cat: string) => {
  for (const k of Object.keys(CAT_COLORS))
    if (cat.toLowerCase().includes(k.toLowerCase())) return CAT_COLORS[k];
  return "#c2a4ff";
};

type TabKey = "challenge" | "solution" | "result";

const ProjectDetail = () => {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const project    = id ? getProjectById(id) : undefined;
  const [tab, setTab]           = useState<TabKey>("challenge");
  const [activeImg, setActiveImg] = useState(0);
  const rootRef    = useRef<HTMLDivElement>(null);

  /* ── On mount: scroll to top & free native scroll ── */
  useEffect(() => {
    // Add class that forces native scroll on this page
    document.body.classList.add("pd-page");

    // 1. Kill ScrollSmoother
    import("gsap/ScrollSmoother").then(({ ScrollSmoother }) => {
      try {
        const sm = ScrollSmoother.get();
        if (sm) { sm.scrollTop(0); sm.kill(); }
      } catch { /* smoother not active */ }
    }).catch(() => {});

    // 2. Kill all ScrollTrigger instances from portfolio
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollTrigger.clearScrollMemory();
    }).catch(() => {});

    // 3. Scroll to top with multiple rAF passes to beat GSAP timing
    const resetScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      if (rootRef.current) rootRef.current.scrollTop = 0;
    };
    requestAnimationFrame(() => {
      resetScroll();
      requestAnimationFrame(() => {
        resetScroll();
        requestAnimationFrame(resetScroll);
      });
    });

    return () => {
      // Remove pd-page class so portfolio body overflow is restored
      document.body.classList.remove("pd-page");
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  /* ── Back navigation: go to "/" and signal scroll should be 0 ── */
  const handleBack = () => {
    sessionStorage.setItem("portfolio_return_scroll", "0");
    navigate("/");
  };

  if (!project) {
    return (
      <div className="pd-not-found">
        <button className="pd-back-btn" onClick={handleBack}>
          <MdArrowBack /> Back to Portfolio
        </button>
        <h2>Project not found</h2>
      </div>
    );
  }

  const accent = getAccent(project.category);

  const gallery: string[] = (() => {
    if (project.images && project.images.length > 0) return project.images;
    if (project.image && !project.image.includes("placeholder")) return [project.image];
    return [];
  })();
  const hasGallery = gallery.length > 0;

  const toBullets = (text: string) =>
    text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 18);

  const tabData: Record<TabKey, string[]> = {
    challenge: toBullets(project.challenges),
    solution:  toBullets(project.solution || project.longDescription),
    result:    toBullets(project.outcome),
  };
  const TAB_LABELS: Record<TabKey, string> = {
    challenge: "Project Challenge",
    solution:  "Project Solution",
    result:    "Project Result",
  };

  return (
    <div className="pd-root" ref={rootRef}>

      {/* ── Sticky nav ── */}
      <nav className="pd-nav">
        <button className="pd-back-btn" onClick={handleBack} data-cursor="disable">
          <MdArrowBack /> Back
        </button>
        <span className="pd-nav-logo">Adarsh<span style={{ color: accent }}>.</span></span>
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer"
            className="pd-nav-live"
            style={{ borderColor: `${accent}60`, color: accent }}
            data-cursor="disable">
            Live <MdArrowOutward style={{ fontSize: 13 }} />
          </a>
        )}
      </nav>

      {/* ── Hero ── */}
      <header className="pd-hero">
        <div className="pd-hero-glow"
          style={{ background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="pd-hero-inner">
          <div className="pd-breadcrumb">
            <span onClick={handleBack} className="pd-breadcrumb-link">Portfolio</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span>{project.title}</span>
          </div>
          <p className="pd-cat-label" style={{ color: accent }}>{project.category}</p>
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-subtitle">{project.subtitle}</p>
          <div className="pd-hero-meta">
            <div className="pd-meta-chip"><MdCalendarToday style={{ color: accent }} /><span>{project.year}</span></div>
            <div className="pd-meta-chip"><MdPerson style={{ color: accent }} /><span>{project.role}</span></div>
            {project.client && project.client !== "Personal" && (
              <div className="pd-meta-chip"><MdLayers style={{ color: accent }} /><span>{project.client}</span></div>
            )}
          </div>
          <div className="pd-stats">
            {project.stats.map((s, i) => (
              <div key={i} className="pd-stat" style={{ borderColor: `${accent}30` }}>
                <span className="pd-stat-val" style={{ color: accent }}>{s.value}</span>
                <span className="pd-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Layout ── */}
      <div className="pd-layout">

        {/* ── Sidebar ── */}
        <aside className="pd-sidebar">
          <div className="pd-info-card">
            <h4 className="pd-card-title">Project Info</h4>
            <div className="pd-info-row"><span className="pd-info-key">Category</span><span className="pd-info-val" style={{ color: accent }}>{project.category}</span></div>
            <div className="pd-info-row"><span className="pd-info-key">Client</span><span className="pd-info-val">{project.client}</span></div>
            <div className="pd-info-row"><span className="pd-info-key">Year</span><span className="pd-info-val">{project.year}</span></div>
            <div className="pd-info-row"><span className="pd-info-key">Duration</span><span className="pd-info-val">{project.estimation}</span></div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer"
                className="pd-sidebar-live" style={{ background: accent, color: "#0b080c" }} data-cursor="disable">
                Visit Website <MdArrowOutward />
              </a>
            )}
          </div>
          <div className="pd-info-card">
            <h4 className="pd-card-title">Tech Stack</h4>
            <div className="pd-tag-wrap">
              {project.tags.map((t, i) => (
                <span key={i} className="pd-tag" style={{ borderColor: `${accent}40`, color: accent }}>{t}</span>
              ))}
            </div>
            <p className="pd-tools-text">{project.tools}</p>
          </div>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="pd-github-btn" data-cursor="disable">
              <MdCode /> View on GitHub
            </a>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="pd-main">
          {hasGallery && (
            <div className="pd-gallery">
              <div className="pd-cover-frame" style={{ borderColor: `${accent}20` }}>
                <img src={gallery[activeImg]} alt={`${project.title} — screenshot ${activeImg + 1}`} className="pd-cover-img" />
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer"
                    className="pd-cover-live" style={{ background: accent, color: "#0b080c" }} data-cursor="disable">
                    Visit Live Site <MdArrowOutward />
                  </a>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="pd-thumbs">
                  {gallery.map((src, i) => (
                    <button key={i}
                      className={`pd-thumb${i === activeImg ? " pd-thumb-active" : ""}`}
                      style={i === activeImg ? { borderColor: accent } : {}}
                      onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`}>
                      <img src={src} alt={`Thumbnail ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <section className="pd-section">
            <h2 className="pd-section-h">Project <span style={{ color: accent }}>overview</span></h2>
            <p className="pd-section-p">{project.longDescription}</p>
          </section>

          <div className="pd-rule" style={{ background: `linear-gradient(to right, ${accent}50, transparent)` }} />

          <section className="pd-section">
            <h2 className="pd-section-h">Project <span style={{ color: accent }}>challenge, solution &amp; result</span></h2>
            <p className="pd-section-p">{project.description}</p>
            <div className="pd-tabs">
              {(["challenge", "solution", "result"] as TabKey[]).map(t => (
                <button key={t}
                  className={`pd-tab${tab === t ? " pd-tab-on" : ""}`}
                  style={tab === t ? { background: accent, color: "#0b080c", borderColor: accent } : { borderColor: `${accent}30` }}
                  onClick={() => setTab(t)} data-cursor="disable">
                  {TAB_LABELS[t]}
                </button>
              ))}
            </div>
            <div className="pd-tab-content">
              {(tabData[tab].length > 0 ? tabData[tab] : [tab === "challenge" ? project.challenges : project.outcome])
                .map((point, i) => (
                  <div key={i} className="pd-point">
                    <span className="pd-point-bullet" style={{ background: accent }} />
                    <p>{point}</p>
                  </div>
                ))}
            </div>
          </section>

          <div className="pd-rule" style={{ background: `linear-gradient(to right, ${accent}50, transparent)` }} />

          <section className="pd-section">
            <h2 className="pd-section-h">Tools <span style={{ color: accent }}>&amp; Technology</span></h2>
            <p className="pd-section-p">{project.tools}</p>
          </section>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="pd-footer">
        <div className="pd-footer-inner">
          <div className="pd-footer-brand">
            <span className="pd-footer-logo">Adarsh<span style={{ color: accent }}>.</span></span>
            <p>Crafting intuitive, user-centric solutions that bring ideas to life.</p>
          </div>
          <div className="pd-footer-links">
            <button onClick={handleBack} className="pd-footer-link" data-cursor="disable">Home</button>
            <button onClick={handleBack} className="pd-footer-link" data-cursor="disable">Portfolio</button>
            <button onClick={() => { handleBack(); sessionStorage.setItem("portfolio_nav_to", "contact"); }} className="pd-footer-link" data-cursor="disable">Contact</button>
          </div>
        </div>
        <p className="pd-footer-copy">© {new Date().getFullYear()} Adarsh Singh · All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ProjectDetail;
