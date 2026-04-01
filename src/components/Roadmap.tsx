import "./styles/Roadmap.css";

const roadmap = [
  {
    period: "2025–2026",
    title: "Advanced Data Analysis",
    description:
      "Integrating Python (Pandas/NumPy) and SQL into the development workflow to extract actionable business insights from commerce data.",
    progress: 45,
  },
  {
    period: "2026+",
    title: "AI Ecosystem Integration",
    description:
      "Architecting generative AI solutions for automated customer experiences and intelligent storefront optimization using LLM agents.",
    progress: 30,
  },
  {
    period: "Continuous",
    title: "Architectural Leadership",
    description:
      "Advancing toward Lead Engineering roles focusing on global-scale system design and engineering culture mentorship.",
    progress: 60,
  },
];

const Roadmap = () => {
  return (
    <div className="roadmap-section section-container">
      <p className="roadmap-label">Future Strategy</p>
      <h2 className="roadmap-heading">
        The Learning <span>Horizon.</span>
      </h2>
      <p className="roadmap-sub">
        Beyond current mastery, I am strategically expanding my technical breadth
        to merge development with high-level data intelligence.
      </p>
      <div className="roadmap-list">
        {roadmap.map((r, i) => (
          <div className="roadmap-item" key={i}>
            <div className="roadmap-meta">
              <span className="roadmap-period">{r.period}</span>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </div>
            <div className="roadmap-bar-wrap">
              <div className="roadmap-bar-label">
                <span>Self-Study Progress</span>
                <span>{r.progress}%</span>
              </div>
              <div className="roadmap-bar">
                <div
                  className="roadmap-fill"
                  style={{ width: `${r.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="roadmap-note">
        I believe the best engineers are lifelong students. My goal is to use
        Data Analysis to build more efficient, profitable, and user-centric web applications.
      </p>
    </div>
  );
};

export default Roadmap;
