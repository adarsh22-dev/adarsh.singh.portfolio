import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Roadmap from "./Roadmap";
import Services from "./Services";
import SocialIcons from "./SocialIcons";
import Testimonials from "./Testimonials";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      setTimeout(() => ScrollTrigger.refresh(true), 300);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // After mount (including return from project page), do a delayed refresh
    // so all ScrollTrigger instances are correctly measured
    const tid = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    return () => {
      clearTimeout(tid);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Services />
            <Career />

            {/*
              ── WORK (pinned horizontal scroll, z-index:2)
              All sections rendered AFTER this in the DOM stack above it
              via position:relative + z-index + background-color.
            */}
            <Work />

            {/*
              ── POST-WORK COVER LAYER (z-index:10)
              This wrapper must cover the pinned .work-section below it
              as the user scrolls past. Every child also needs bg-color.
            */}
            <div className="post-pin-cover">
              {isDesktopView && (
                <div className="techstack-cover">
                  <Suspense fallback={<div style={{ height: "100vh", backgroundColor: "var(--backgroundColor)" }} />}>
                    <TechStack />
                  </Suspense>
                </div>
              )}

              <div className="roadmap-cover">
                <Roadmap />
              </div>

              {/*
                ── CERTIFICATIONS (pinned horizontal scroll, z-index:2 inside cover)
                After Certifications pin, Testimonials + Contact cover it.
              */}
              <Certifications />

              <div className="post-cert-cover">
                <Testimonials />
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
