import { useState, useEffect, useRef } from "react";
import "./styles/Testimonials.css";

const testimonials = [
  {
    quote: "Adarsh's migration from OpenCart to Shopify Plus was flawless. We saw a 35% conversion increase immediately after launch. His attention to SKU mapping and SEO redirects saved our organic traffic.",
    name: "Director of E-commerce",
    company: "ToyTooth",
    avatar: "DT",
    color: "#7f40ff",
    role: "E-commerce Director",
    project: "Shopify Plus Migration",
  },
  {
    quote: "Building a performance-first D2C brand in 14 days seemed impossible until we worked with Adarsh. The sub-second load times on mobile have been a game changer for our social ad conversions.",
    name: "Founder",
    company: "Pur Shilajit",
    avatar: "PS",
    color: "#00c9a7",
    role: "Founder & CEO",
    project: "D2C Shopify Store",
  },
  {
    quote: "A master of the Shopify OS 2.0 ecosystem. Adarsh consistently delivers pixel-perfect themes with clean Liquid logic that makes client handoff a breeze. Highly recommended for complex migrations.",
    name: "Senior Project Lead",
    company: "Semtitans Digital",
    avatar: "SD",
    color: "#ff6b6b",
    role: "Senior Project Lead",
    project: "Multiple Projects",
  },
  {
    quote: "Adarsh rebuilt our booking flow from scratch and it's faster than ever. International guests on mobile now complete bookings without friction. +50% improvement in booking completion rate.",
    name: "Operations Manager",
    company: "Simba Sea Trips",
    avatar: "SS",
    color: "#22d3ee",
    role: "Operations Manager",
    project: "WordPress Booking Engine",
  },
  {
    quote: "Migrating 8000+ industrial lighting SKUs with complex attributes is no small task. Adarsh handled every edge case with precision and delivered a search experience our customers love.",
    name: "Head of Digital",
    company: "LightsDaddy",
    avatar: "LD",
    color: "#fbbf24",
    role: "Head of Digital",
    project: "Shopify Plus Migration",
  },
  {
    quote: "The RTO on our fragrance orders dropped by 40% after Adarsh rebuilt our checkout flow. His mobile-first approach and attention to the customer journey was exactly what we needed.",
    name: "Brand Manager",
    company: "SG Perfume",
    avatar: "SG",
    color: "#f472b6",
    role: "Brand Manager",
    project: "Shopify OS 2.0 Upgrade",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const go = (i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const prev = () => go((active - 1 + testimonials.length) % testimonials.length);
  const next = () => go((active + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <div className="testi-outer" id="testimonials">
      <div className="testi-inner section-container">

        {/* Header */}
        <div className="testi-header">
          <p className="testi-label">Social Proof</p>
          <h2 className="testi-heading">Client <span>Feedback</span></h2>
          <p className="testi-sub">Results-driven testimonials from enterprise migrations and architectural leads.</p>
        </div>

        {/* Slider */}
        <div className="testi-slider">

          {/* Main card */}
          <div className="testi-main-card" key={active} style={{ "--tc": t.color } as React.CSSProperties}>
            <div className="testi-main-top">
              <div className="testi-main-avatar" style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div className="testi-main-meta">
                <h4 className="testi-main-name">{t.name}</h4>
                <span className="testi-main-company" style={{ color: t.color }}>{t.company}</span>
                <span className="testi-main-project">{t.project}</span>
              </div>
              <div className="testi-quote-mark" style={{ color: t.color }}>"</div>
            </div>
            <blockquote className="testi-main-quote">"{t.quote}"</blockquote>
          </div>

          {/* Controls */}
          <div className="testi-controls">
            <button className="testi-arrow" onClick={prev} data-cursor="disable" aria-label="Previous">
              ←
            </button>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot${i === active ? " active" : ""}`}
                  onClick={() => go(i)}
                  data-cursor="disable"
                  style={{ background: i === active ? t.color : undefined }}
                />
              ))}
            </div>
            <button className="testi-arrow" onClick={next} data-cursor="disable" aria-label="Next">
              →
            </button>
          </div>

          {/* Progress bar */}
          <div className="testi-progress-bar">
            <div
              className={`testi-progress-fill${paused ? " paused" : ""}`}
              key={`${active}-${paused}`}
              style={{ background: t.color }}
            />
          </div>
        </div>

        {/* Bottom mini cards */}
        <div className="testi-thumbs">
          {testimonials.map((th, i) => (
            <button
              key={i}
              className={`testi-thumb${i === active ? " active" : ""}`}
              onClick={() => go(i)}
              data-cursor="disable"
              style={{ borderColor: i === active ? th.color : undefined }}
            >
              <div className="testi-thumb-av" style={{ background: th.color }}>{th.avatar}</div>
              <div className="testi-thumb-info">
                <span className="testi-thumb-company">{th.company}</span>
                <span className="testi-thumb-project">{th.project}</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
