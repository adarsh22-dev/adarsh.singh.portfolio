import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Certifications.css";
import "./styles/Modal.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lockScroll, unlockScroll } from "./utils/scrollLock";
import { MdClose, MdArrowOutward, MdSchool } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface Cert {
  title: string;
  issuer: string;
  date: string;
  color: string;
  description: string;
  skills: string[];
  link?: string;
  credential?: string;
  type: string;
  image?: string;
}

const certifications: Cert[] = [
  {
    title: "IBM Full Stack Software Developer",
    issuer: "IBM / Coursera",
    date: "Jun 17, 2024",
    color: "#0062ff",
    description: "Comprehensive professional certificate covering full-stack development with Node.js, React, Python, Django, Containers, and Cloud Native deployment. 12 courses spanning the complete software development lifecycle.",
    skills: ["Node.js", "React", "Python", "Django", "Docker", "Kubernetes", "REST APIs", "CI/CD"],
    link: "#",
    credential: "IBM Professional",
    type: "ibm",
    image: "/images/cert-ibm3.jpg",
  },
  {
    title: "Google Project Management Professional",
    issuer: "Google / Coursera",
    date: "Apr 17, 2024",
    color: "#34a853",
    description: "Google-issued professional certificate covering agile project management, stakeholder communication, risk management, and delivery frameworks. 6-course specialization covering the full project lifecycle.",
    skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Mgmt", "Project Planning", "OKRs"],
    link: "#",
    credential: "Google Professional",
    type: "google",
    image: "/images/cert-google1.jpg",
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google / Coursera",
    date: "May 9, 2024",
    color: "#fbbc05",
    description: "Google-issued UX design certificate covering user research, wireframing, prototyping in Figma, usability testing, and accessibility. 7-course program culminating in three full UX case studies.",
    skills: ["Figma", "UX Research", "Prototyping", "Wireframing", "Accessibility", "User Testing", "Design Systems"],
    link: "#",
    credential: "Google Professional",
    type: "google",
    image: "/images/cert-google2.jpg",
  },
  {
    title: "React — The Complete Guide 2024",
    issuer: "Udemy · Maximilian Schwarzmuller",
    date: "Mar 27, 2024",
    color: "#61dafb",
    description: "Advanced React training covering Hooks, Context API, Redux, Next.js, React Router, Testing with Jest, and building production-grade SPAs. 60+ hours of content and real-world project builds.",
    skills: ["React", "Redux", "Hooks", "Next.js", "React Router", "Testing", "Context API"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
    image: "/images/cert-udemy1.jpg",
  },
  {
    title: "Complete Generative AI Pro",
    issuer: "Udemy",
    date: "Feb 4, 2025",
    color: "#a855f7",
    description: "End-to-end generative AI training covering LLM architectures, prompt engineering, fine-tuning, LangChain, vector databases, and building AI-powered production apps with OpenAI, Gemini, and Anthropic APIs.",
    skills: ["LLMs", "Prompt Engineering", "LangChain", "Vector DBs", "Fine-Tuning", "AI APIs", "RAG"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
    image: "/images/cert-udemy2.jpg",
  },
  {
    title: "Developing Front-End Apps with React",
    issuer: "IBM",
    date: "Jun 11, 2024",
    color: "#0062ff",
    description: "IBM course on building modern React applications covering component architecture, state management, hooks, API integration, and deploying to IBM Cloud. Part of the IBM Full Stack Developer Certificate.",
    skills: ["React", "State Management", "Hooks", "API Integration", "IBM Cloud", "Component Design"],
    link: "#",
    credential: "IBM Certificate",
    type: "ibm",
    image: "/images/cert-ibm1.jpg",
  },
  {
    title: "Developing Back-End Apps with Node.js",
    issuer: "IBM",
    date: "Jun 12, 2024",
    color: "#68a063",
    description: "IBM backend certificate covering Node.js, Express, REST API design, JWT authentication, database integration, serverless functions and microservices architecture on IBM Cloud.",
    skills: ["Node.js", "Express", "REST API", "JWT", "MongoDB", "IBM Cloud", "Serverless"],
    link: "#",
    credential: "IBM Certificate",
    type: "ibm",
    image: "/images/cert-ibm2.jpg",
  },
  {
    title: "Shopify Theme Development (OS 2.0) + TailwindCSS",
    issuer: "Udemy",
    date: "2023",
    color: "#96bf48",
    description: "Complete Shopify OS 2.0 theme development covering Liquid templating, Section and Block architecture, Metafields, Tailwind CSS integration, and performance optimization. Builds a production-grade custom theme.",
    skills: ["Liquid", "Shopify OS 2.0", "Sections", "Metafields", "TailwindCSS", "Performance", "JSON Templates"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
  },
  {
    title: "Create eCommerce Store with Shopify",
    issuer: "Coursera",
    date: "2023",
    color: "#96bf48",
    description: "Coursera-certified course on building and managing a Shopify eCommerce store covering store setup, product management, payment gateways, marketing, and analytics.",
    skills: ["Shopify", "eCommerce", "Product Management", "Analytics", "Marketing", "Payment Gateways"],
    link: "#",
    credential: "Coursera Certificate",
    type: "other",
  },
  {
    title: "Simplified Magento 2: Beginner to Expert",
    issuer: "Udemy",
    date: "2023",
    color: "#f26322",
    description: "Comprehensive Magento 2 training covering setup, theme customization, module development, store configuration, and admin operations for enterprise eCommerce including custom module and API integration.",
    skills: ["Magento 2", "PHP", "eCommerce", "Module Dev", "Theme Customization", "Magento API"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
  },
  {
    title: "JPMorgan Chase Software Engineering Simulation",
    issuer: "JPMorgan Chase / Forage",
    date: "2024",
    color: "#003087",
    description: "Industry simulation covering real-world software engineering tasks including data visualization, financial data processing, and working with internal tools. Simulates the engineering experience at JPMorgan.",
    skills: ["Python", "React", "Data Visualization", "Financial Systems", "Git", "Perspective"],
    link: "#",
    credential: "Forage Certificate",
    type: "other",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "2024",
    color: "#ff9900",
    description: "Foundational AWS certification covering core cloud concepts, key AWS services, security, architecture, pricing, and support. Covers compute, storage, database, networking, and cloud-native deployment.",
    skills: ["AWS EC2", "S3", "Lambda", "CloudFront", "RDS", "IAM", "Cloud Architecture"],
    link: "#",
    credential: "AWS Certification",
    type: "aws",
  },
  {
    title: "TypeScript: The Complete Developer's Guide",
    issuer: "Udemy · Stephen Grider",
    date: "2024",
    color: "#3178c6",
    description: "In-depth TypeScript covering type systems, generics, decorators, advanced class patterns, and integrating TypeScript with React and Express. Enterprise-grade patterns for large-scale production applications.",
    skills: ["TypeScript", "Generics", "Decorators", "Type Guards", "Advanced Types", "React + TS", "Express + TS"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
  },
  {
    title: "GraphQL with React: Complete Developer's Guide",
    issuer: "Udemy · Stephen Grider",
    date: "2024",
    color: "#e535ab",
    description: "Complete GraphQL course covering schema design, resolvers, mutations, subscriptions, Apollo Client, and integrating GraphQL APIs with React including caching strategies and production server setup.",
    skills: ["GraphQL", "Apollo Client", "Resolvers", "Mutations", "Subscriptions", "Schema Design", "React"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
  },
  {
    title: "Docker and Kubernetes: The Complete Guide",
    issuer: "Udemy · Stephen Grider",
    date: "2024",
    color: "#2496ed",
    description: "Comprehensive containerization covering Docker fundamentals, multi-container apps with Docker Compose, Kubernetes cluster management, CI/CD pipelines with GitHub Actions, and deploying to AWS EKS.",
    skills: ["Docker", "Kubernetes", "Docker Compose", "CI/CD", "AWS EKS", "Helm", "Container Orchestration"],
    link: "#",
    credential: "Udemy Certificate",
    type: "udemy",
  },
  {
    title: "BCA — Computer Science",
    issuer: "Bharati Vidyapeeth University",
    date: "2017 – 2021",
    color: "#e11d48",
    description: "Bachelor of Computer Applications covering data structures, algorithms, database management, software engineering, networking, and programming fundamentals. Four-year comprehensive foundation in CS theory and application development.",
    skills: ["Data Structures", "Algorithms", "DBMS", "Networking", "OOP", "Software Engineering", "C++", "Java"],
    link: "#",
    credential: "BCA Degree",
    type: "degree",
  },
];

// ─────────────────────────────────────────────────────────────
//  Modal
// ─────────────────────────────────────────────────────────────
interface CertModalProps { cert: Cert; onClose: () => void; }
const CertModal = ({ cert, onClose }: CertModalProps) => createPortal(
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-box cert-modal-box" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} data-cursor="disable">
        <MdClose />
      </button>
      <div className="modal-content" style={{ flexDirection: "column" }}>
        <div className="cert-modal-top" style={{ borderBottom: `3px solid ${cert.color}` }}>
          <div className="cert-modal-badge"
            style={{ background: `${cert.color}18`, borderColor: `${cert.color}50` }}>
            <MdSchool style={{ color: cert.color, fontSize: 28 }} />
          </div>
          <div>
            <p className="cert-modal-cred" style={{ color: cert.color }}>{cert.credential}</p>
            <h2 className="cert-modal-title">{cert.title}</h2>
            <p className="cert-modal-issuer">{cert.issuer} · {cert.date}</p>
          </div>
        </div>
        {cert.image && (
          <div className="cert-modal-img-wrap">
            <img src={cert.image} alt={cert.title} className="cert-modal-img" />
          </div>
        )}
        <div className="modal-body">
          <p className="modal-desc">{cert.description}</p>
          <h4 className="cert-skills-label">Skills Covered</h4>
          <div className="modal-tags">
            {cert.skills.map((s, i) => (
              <span key={i} className="modal-tag"
                style={{ borderColor: `${cert.color}50`, color: cert.color }}>{s}</span>
            ))}
          </div>
          {cert.link && cert.link !== "#" && (
            <div className="modal-actions">
              <a href={cert.link} target="_blank" rel="noreferrer"
                className="modal-btn modal-btn-primary"
                style={{ background: cert.color, color: "#fff" }}
                data-cursor="disable">
                View Certificate <MdArrowOutward />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>,
  document.body
);


// ─────────────────────────────────────────────────────────────
//  Certifications component — same triple-delay GSAP as Work
// ─────────────────────────────────────────────────────────────

// Sort: certs with real images first
const sortedCertifications = [...certifications].sort((a, b) => {
  const aHasImg = !!(a.image);
  const bHasImg = !!(b.image);
  if (aHasImg && !bHasImg) return -1;
  if (!aHasImg && bHasImg) return 1;
  return 0;
});

const Certifications = () => {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef    = useRef<HTMLDivElement>(null);
  const stRef      = useRef<ScrollTrigger | null>(null);
  const animRef    = useRef<gsap.core.Tween | null>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 1024);

  const open = (c: Cert) => {
    setActiveCert(c);
    lockScroll();
  };
  const close = () => {
    setActiveCert(null);
    unlockScroll();
  };

  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  // Mobile: staggered fade-up animations matching desktop card reveal rhythm
  useEffect(() => {
    if (!isMobile) return;
    const raf = requestAnimationFrame(() => {
      if (mobileHeaderRef.current) {
        gsap.fromTo(mobileHeaderRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: mobileHeaderRef.current, start: "top 90%", toggleActions: "play none none none" } }
        );
      }
      if (mobileGridRef.current) {
        const cards = Array.from(mobileGridRef.current.querySelectorAll<HTMLElement>(".cert-mobile-card"));
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
    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll()
        .filter(st => (st.vars.trigger as HTMLElement | undefined)?.closest?.(".cert-section-mobile") != null)
        .forEach(st => st.kill());
    };
  }, [isMobile]);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    let timerId: ReturnType<typeof setTimeout>;
    let raf1: number, raf2: number;

    const build = () => {
      const section = sectionRef.current;
      const flex    = flexRef.current;
      if (!section || !flex) return;

      const boxes = Array.from(flex.querySelectorAll<HTMLElement>(".cert-box"));
      if (!boxes.length) return;

      const totalW = boxes.reduce((s, b) => s + b.getBoundingClientRect().width, 0);
      const vpW    = section.getBoundingClientRect().width;
      const dist   = Math.max(totalW - vpW, 0);
      if (dist < 10) return;

      stRef.current?.kill();
      animRef.current?.kill();

      animRef.current = gsap.to(flex, {
        x: -dist,
        ease: "none",
        duration: 1,
        paused: true,
      });

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${dist}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: animRef.current,
        id: "cert-pin",
      });
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timerId = setTimeout(build, 350);
      });
    });

    const onResize = () => {
      clearTimeout(timerId);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          timerId = setTimeout(build, 100);
        });
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", onResize);
      stRef.current?.kill();
      animRef.current?.kill();
    };
  }, []);

  // ── Mobile ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <div className="cert-section-mobile" id="certifications">
          <div className="cert-mobile-header section-container" ref={mobileHeaderRef}>
            <h2>Certifications <span>&amp; Education</span></h2>
            <p className="cert-mobile-intro">
              {certifications.length} credentials — industry certifications and formal education.
            </p>
          </div>
          <div className="cert-mobile-grid section-container" ref={mobileGridRef}>
            {sortedCertifications.map((cert, i) => (
              <div key={i} className="cert-mobile-card"
                style={{ borderTop: `2px solid ${cert.color}` }}
                onClick={() => open(cert)}>
                {cert.image && (
                  <div className="cert-mobile-img-wrap">
                    <img src={cert.image} alt={cert.title} className="cert-mobile-img" />
                  </div>
                )}
                <div className="cert-mobile-top">
                  <span className="cert-mobile-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cert-mobile-type" style={{ color: cert.color }}>{cert.type}</span>
                </div>
                <h3 className="cert-mobile-title">{cert.title}</h3>
                <p className="cert-mobile-issuer">{cert.issuer}</p>
                <p className="cert-mobile-date">{cert.date}</p>
                <div className="cert-mobile-skills">
                  {cert.skills.slice(0, 3).map((s, si) => (
                    <span key={si} className="cert-mobile-skill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {activeCert && <CertModal cert={activeCert} onClose={close} />}
      </>
    );
  }

  // ── Desktop ─────────────────────────────────────────────────
  return (
    <>
      <div className="cert-section" id="certifications" ref={sectionRef}>
        <div className="cert-container section-container">
          <h2>Certifications <span>&amp; Education</span></h2>
          <div className="cert-flex" ref={flexRef}>
            {sortedCertifications.map((cert, index) => (
              <div className="cert-box" key={index}
                onClick={() => open(cert)}
                style={{ cursor: "pointer" }}>

                {/* Color bar */}
                <div className="cert-box-bar" style={{ background: cert.color }} />

                <div className="cert-info">
                  <div className="cert-title">
                    <h3>{String(index + 1).padStart(2, "00")}</h3>
                    <div>
                      <h4>{cert.title}</h4>
                      <p style={{ color: cert.color }}>{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="cert-meta">
                    <span className="cert-issued-label">Issued</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>

                  <div className="cert-skills">
                    {cert.skills.slice(0, 4).map((s, si) => (
                      <span key={si} className="cert-skill-tag"
                        style={{ borderColor: `${cert.color}45` }}>{s}</span>
                    ))}
                  </div>
                  <span className="cert-click-hint">Click to view →</span>
                </div>

                {/* Certificate image or badge */}
                <div className="cert-badge-wrap">
                  {cert.image ? (
                    <div className="cert-img-frame" style={{ borderColor: `${cert.color}40` }}>
                      <img src={cert.image} alt={cert.title} className="cert-thumb-img" />
                    </div>
                  ) : (
                    <div className="cert-badge"
                      style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}35` }}>
                      <MdSchool style={{ color: cert.color, fontSize: 34 }} />
                      <span style={{ color: cert.color }}>{cert.credential}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeCert && <CertModal cert={activeCert} onClose={close} />}
    </>
  );
};

export default Certifications;
