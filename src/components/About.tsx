import "./styles/About.css";

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "70%", label: "Workflow Automation" },
  { value: "100", label: "Lighthouse Score" },
  { value: "18+", label: "Projects Shipped" },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          <span className="about-name">Adarsh Singh</span> — Senior Frontend Engineer
          specializing in <strong>React, Next.js, TypeScript</strong> and <strong>Shopify Plus OS 2.0</strong>.
          6+ years building enterprise storefronts, full-stack SaaS products, and AI-powered applications
          that deliver measurable results.
        </p>
        <ul className="about-bullets">
          <li>Automated inventory workflows cutting manual effort by <strong>70%</strong></li>
          <li>Led <strong>10+ Shopify Plus migrations</strong> with 5000+ lossless SEO redirects</li>
          <li>Achieved <strong>100/100 Lighthouse scores</strong> on multiple production launches</li>
          <li>Currently shipping features at <strong>CISAI, Kerala</strong> — open to senior roles</li>
        </ul>
        <div className="about-stats">
          {stats.map((s, i) => (
            <div className="about-stat" key={i}>
              <span className="about-stat-val">{s.value}</span>
              <span className="about-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
