import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>WordPress Developer</h4>
                <h5>Biogetica · Mumbai, India</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Built and maintained frontend interfaces for content-driven and
              ecommerce websites. Improved UI performance, responsiveness, and
              accessibility. Resolved UI and integration issues with minimal
              downtime across health and wellness product catalogs.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Web Developer</h4>
                <h5>Semtitans Digital · Navi Mumbai</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Built responsive, high-performance frontend interfaces using React
              and modern CSS. Developed reusable UI components, integrated REST
              and GraphQL APIs, and led complex OpenCart-to-Shopify Plus
              migrations with 5000+ SEO redirects. Improved Core Web Vitals
              across 10+ production storefronts over 3 years.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Ergode IT Services · India</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed and maintained scalable frontend features for large
              product catalogs. Automated frontend and operational workflows
              using API scripts, reducing manual workload by 70%. Collaborated
              across teams to support launches, promotions, and production
              stability.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>CISAI · Kerala, India</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Shipping production frontend and web features end-to-end — from
              requirements to deployment. Building UI integrations with a focus
              on reliability and performance. Collaborating in agile delivery
              cycles and improving frontend performance through profiling and
              optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
