import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import "./styles/Modal.css";
import "./styles/ProjectModal.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward, MdClose, MdCalendarToday, MdPerson, MdCode } from "react-icons/md";
import { projects, Project } from "../data/projects";
import { lockScroll, unlockScroll } from "./utils/scrollLock";

gsap.registerPlugin(ScrollTrigger);

// Sort: projects with real images first
const sortedProjects = [...projects].sort((a, b) => {
  const aHasImg = a.image && !a.image.includes("placeholder");
  const bHasImg = b.image && !b.image.includes("placeholder");
  if (aHasImg && !bHasImg) return -1;
  if (!aHasImg && bHasImg) return 1;
  return 0;
});

type TabKey = "overview" | "challenge" | "solution" | "result";
const TAB_LABELS: Record<TabKey, string> = {
  overview:  "Overview",
  challenge: "Challenge",
  solution:  "Solution",
  result:    "Result",
};

const CAT_COLORS: Record<string, string> = {
  "AI":          "#c2a4ff",
  "SaaS":        "#a78bfa",
  "Shopify":     "#96bf48",
  "E-commerce":  "#c2a4ff",
  "HealthTech":  "#34d399",
  "Enterprise":  "#a78bfa",
  "Wellness":    "#6ee7b7",
  "Beauty":      "#f9a8d4",
  "Hospitality": "#fcd34d",
  "Creative":    "#c2a4ff",
  "Automotive":  "#93c5fd",
  "Travel":      "#67e8f9",
  "WordPress":   "#64b5f6",
  "Plugin":      "#a78bfa",
};
const getAccent = (cat: string) => {
  for (const k of Object.keys(CAT_COLORS))
    if (cat.toLowerCase().includes(k.toLowerCase())) return CAT_COLORS[k];
  return "#c2a4ff";
};

/* ─── Project Modal ─────────────────────────────────────── */
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [tab, setTab] = useState<TabKey>("overview");
  const [activeImg, setActiveImg] = useState(0);
  const accent = getAccent(project.category);

  const gallery: string[] = (() => {
    if (project.images && project.images.length > 0) return project.images;
    if (project.image && !project.image.includes("placeholder")) return [project.image];
    return [];
  })();

  const toBullets = (text: string) =>
    text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 15);

  const tabContent: Record<TabKey, string[]> = {
    overview:  toBullets(project.longDescription),
    challenge: toBullets(project.challenges),
    solution:  toBullets(project.solution || project.longDescription),
    result:    toBullets(project.outcome),
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="pm-box" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="modal-close pm-close" onClick={onClose} data-cursor="disable">
          <MdClose />
        </button>

        {/* Hero glow */}
        <div className="pm-hero-glow"
          style={{ background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${accent}22 0%, transparent 70%)` }} />

        {/* Header */}
        <div className="pm-header">
          <p className="pm-cat" style={{ color: accent }}>{project.category}</p>
          <h2 className="pm-title">{project.title}</h2>
          <p className="pm-subtitle">{project.subtitle}</p>
          <div className="pm-meta">
            <span className="pm-chip"><MdCalendarToday style={{ color: accent }} />{project.year}</span>
            <span className="pm-chip"><MdPerson style={{ color: accent }} />{project.role}</span>
            {project.client !== "Personal" &&
              <span className="pm-chip"><MdCode style={{ color: accent }} />{project.client}</span>}
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="pm-gallery">
            <div className="pm-cover" style={{ borderColor: `${accent}25` }}>
              <img src={gallery[activeImg]} alt={project.title} />
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="pm-live-btn" style={{ background: accent, color: "#0b080c" }}
                  data-cursor="disable">
                  Visit Live <MdArrowOutward />
                </a>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="pm-thumbs">
                {gallery.map((src, i) => (
                  <button key={i}
                    className={`pm-thumb${i === activeImg ? " pm-thumb-on" : ""}`}
                    style={i === activeImg ? { borderColor: accent } : {}}
                    onClick={() => setActiveImg(i)}>
                    <img src={src} alt={`Screenshot ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="pm-stats">
          {project.stats.map((s, i) => (
            <div key={i} className="pm-stat" style={{ borderColor: `${accent}25` }}>
              <span className="pm-stat-val" style={{ color: accent }}>{s.value}</span>
              <span className="pm-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Body: tabs + sidebar */}
        <div className="pm-body">
          {/* Tabs */}
          <div className="pm-main">
            <div className="pm-tabs">
              {(["overview", "challenge", "solution", "result"] as TabKey[]).map(t => (
                <button key={t}
                  className={`pm-tab${tab === t ? " pm-tab-on" : ""}`}
                  style={tab === t ? { background: accent, color: "#0b080c", borderColor: accent }
                                   : { borderColor: `${accent}30` }}
                  onClick={() => setTab(t)} data-cursor="disable">
                  {TAB_LABELS[t]}
                </button>
              ))}
            </div>
            <div className="pm-tab-content">
              {(tabContent[tab].length > 0 ? tabContent[tab] : ["No details available."])
                .map((point, i) => (
                  <div key={i} className="pm-point">
                    <span className="pm-bullet" style={{ background: accent }} />
                    <p>{point}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="pm-sidebar">
            <div className="pm-info-card">
              <h4>Project Info</h4>
              <div className="pm-info-row"><span>Category</span><span style={{ color: accent }}>{project.category}</span></div>
              <div className="pm-info-row"><span>Client</span><span>{project.client}</span></div>
              <div className="pm-info-row"><span>Year</span><span>{project.year}</span></div>
              <div className="pm-info-row"><span>Duration</span><span>{project.estimation}</span></div>
            </div>
            <div className="pm-info-card">
              <h4>Tech Stack</h4>
              <div className="pm-tags">
                {project.tags.map((t, i) => (
                  <span key={i} className="pm-tag" style={{ borderColor: `${accent}40`, color: accent }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="pm-actions">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="pm-btn pm-btn-primary" style={{ background: accent, color: "#0b080c" }}
                  data-cursor="disable">
                  Visit Website <MdArrowOutward />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="pm-btn pm-btn-secondary" data-cursor="disable">
                  GitHub <MdArrowOutward />
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─── Work Component ────────────────────────────────────── */
const Work = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef    = useRef<HTMLDivElement>(null);
  const stRef      = useRef<ScrollTrigger | null>(null);
  const animRef    = useRef<gsap.core.Tween | null>(null);
  const mobileRef  = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 1024);

  const open = useCallback((p: Project) => { setActiveProject(p); lockScroll(); }, []);
  const close = useCallback(() => { setActiveProject(null); unlockScroll(); }, []);

  // Escape key
  useEffect(() => {
    if (!activeProject) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeProject, close]);

  // Mobile animations
  useEffect(() => {
    if (!isMobile) return;
    const raf = requestAnimationFrame(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 90%", toggleActions: "play none none none" } }
        );
      }
      if (mobileRef.current) {
        const cards = Array.from(mobileRef.current.querySelectorAll<HTMLElement>(".work-mobile-card"));
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out",
              delay: (i % 2) * 0.08,
              scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" } }
          );
        });
      }
    });
    return () => { cancelAnimationFrame(raf); };
  }, [isMobile]);

  // Desktop horizontal scroll
  useEffect(() => {
    if (isMobile) return;
    let timerId: ReturnType<typeof setTimeout>;
    let raf1: number, raf2: number;
    const build = () => {
      const section = sectionRef.current;
      const flex    = flexRef.current;
      if (!section || !flex) return;
      const boxes = Array.from(flex.querySelectorAll<HTMLElement>(".work-box"));
      if (!boxes.length) return;
      const totalW = boxes.reduce((s, b) => s + b.getBoundingClientRect().width, 0);
      const vpW    = section.getBoundingClientRect().width;
      const dist   = Math.max(totalW - vpW, 0);
      if (dist < 10) return;
      stRef.current?.kill();
      animRef.current?.kill();
      animRef.current = gsap.to(flex, { x: -dist, ease: "none", duration: 1, paused: true });
      stRef.current = ScrollTrigger.create({
        trigger: section, start: "top top", end: () => `+=${dist}`,
        pin: true, pinSpacing: true, scrub: 1.2, anticipatePin: 1,
        invalidateOnRefresh: true, animation: animRef.current, id: "work-pin",
        onRefresh: () => {
          const nw = boxes.reduce((s, b) => s + b.getBoundingClientRect().width, 0);
          const nd = Math.max(nw - section.getBoundingClientRect().width, 0);
          if (animRef.current) { animRef.current.vars.x = -nd; animRef.current.invalidate(); }
        },
      });
    };
    raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => { timerId = setTimeout(build, 350); }); });
    const onResize = () => {
      clearTimeout(timerId); cancelAnimationFrame(raf1); cancelAnimationFrame(raf2);
      raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => { timerId = setTimeout(build, 100); }); });
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timerId); cancelAnimationFrame(raf1); cancelAnimationFrame(raf2);
      window.removeEventListener("resize", onResize);
      stRef.current?.kill(); animRef.current?.kill();
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <div className="work-section-mobile" id="work">
          <div className="work-mobile-header section-container" ref={headerRef}>
            <h2>My <span>Work</span></h2>
            <p className="work-mobile-intro">
              {sortedProjects.length} projects — AI platforms, enterprise migrations &amp; Shopify storefronts.
            </p>
          </div>
          <div className="work-mobile-grid section-container" ref={mobileRef}>
            {sortedProjects.map((project, i) => {
              const hasImg = project.image && !project.image.includes("placeholder");
              const accent = getAccent(project.category);
              return (
                <div className="work-mobile-card" key={project.id} onClick={() => open(project)}>
                  {hasImg && (
                    <div className="work-mobile-img">
                      <img src={project.image} alt={project.title} />
                    </div>
                  )}
                  <div className="work-mobile-card-top">
                    <span className="work-mobile-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="work-mobile-cat" style={{ color: accent }}>{project.category}</span>
                  </div>
                  <h3 className="work-mobile-title">{project.title}</h3>
                  <p className="work-mobile-subtitle">{project.subtitle}</p>
                  <div className="work-mobile-tags">
                    {project.tags.slice(0, 3).map((t, ti) => (
                      <span key={ti} className="work-mobile-tag">{t}</span>
                    ))}
                  </div>
                  <span className="work-mobile-live" style={{ color: accent }}>View details →</span>
                </div>
              );
            })}
          </div>
        </div>
        {activeProject && <ProjectModal project={activeProject} onClose={close} />}
      </>
    );
  }

  return (
    <>
      <div className="work-section" id="work" ref={sectionRef}>
        <div className="work-container section-container">
          <h2>My <span>Work</span></h2>
          <div className="work-flex" ref={flexRef}>
            {sortedProjects.map((project, index) => {
              const hasImg = project.image && !project.image.includes("placeholder");
              const accent = getAccent(project.category);
              return (
                <div className="work-box" key={project.id}
                  onClick={() => open(project)} style={{ cursor: "pointer" }}>
                  <div className="work-info">
                    <div className="work-title">
                      <h3>{String(index + 1).padStart(2, "0")}</h3>
                      <div><h4>{project.title}</h4><p>{project.category}</p></div>
                    </div>
                    <h4>Tools and features</h4>
                    <p>{project.tools}</p>
                    <span className="work-click-hint" style={{ color: accent }}>View details →</span>
                  </div>
                  <div className="work-image">
                    <div className="work-image-in">
                      {project.link && (
                        <a className="work-link" href={project.link} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()} data-cursor="disable">
                          <MdArrowOutward />
                        </a>
                      )}
                      <img src={hasImg ? project.image : "/images/placeholder.webp"} alt={project.title} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {activeProject && <ProjectModal project={activeProject} onClose={close} />}
    </>
  );
};

export default Work;
