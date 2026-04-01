import "./styles/Services.css";

const services = [
  {
    number: "01",
    title: "Shopify Plus Mastery",
    description:
      "Specialized in OS 2.0 migrations, checkout extensibility with Remix, and high-scale catalog automation. From 5000+ SEO redirect migrations to custom Liquid logic for B2B tiered pricing.",
    tags: ["Shopify Plus", "OS 2.0", "Liquid", "Remix", "GraphQL"],
  },
  {
    number: "02",
    title: "Senior Frontend Engineering",
    description:
      "Architecting React and Next.js applications with sub-second performance and modular UI components. Core Web Vitals optimization, TypeScript-first architecture, and reusable design systems.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS", "Performance"],
  },
  {
    number: "03",
    title: "Full-Stack Connectivity",
    description:
      "Bridging complex backends with Node.js and GraphQL to modern frontends for seamless data flow. API automation scripts that cut operational workloads by 70% across enterprise catalogs.",
    tags: ["Node.js", "Express", "GraphQL", "REST API", "PostgreSQL"],
  },
];

const Services = () => {
  return (
    <div className="services-section section-container" id="services">
      <div className="services-header">
        <p className="services-label">Specialized Platforms</p>
        <h2 className="services-heading">
          From high-conversion storefronts to lightning-fast custom web
          applications — end-to-end development across all major ecosystems.
        </h2>
      </div>
      <div className="services-list">
        {services.map((s, i) => (
          <div className="services-item" key={i}>
            <span className="services-num">{s.number}</span>
            <div className="services-body">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="services-tags">
                {s.tags.map((t, j) => (
                  <span key={j} className="services-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
