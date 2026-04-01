import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { registerSmoother } from "./utils/scrollLock";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;

    if (!isMobile) {
      // Kill any existing smoother before creating a new one
      try {
        const existing = ScrollSmoother.get();
        if (existing) existing.kill();
      } catch { /* no existing smoother */ }

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      // Register with scrollLock utility so modals can pause/resume it
      registerSmoother(smoother);

      // Always start at top — critical after Back navigation from project page
      smoother.scrollTop(0);
      smoother.paused(true);

      // Refresh all ScrollTriggers after smoother is ready, then handle deep-link
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
          const navTo = sessionStorage.getItem("portfolio_nav_to");
          if (navTo) {
            sessionStorage.removeItem("portfolio_nav_to");
            const target = document.getElementById(navTo);
            if (target) smoother.scrollTo(target, true, "top top");
          }
        });
      });
    } else {
      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");
      if (wrapper) { wrapper.style.overflow = "visible"; wrapper.style.height = "auto"; wrapper.style.position = "relative"; }
      if (content) { content.style.overflow = "visible"; content.style.height = "auto"; }
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
      // On mobile return, scroll to top
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }));
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (!section) return;
          try {
            const target = document.querySelector(section) as unknown as HTMLElement | null;
            if (target) {
              smoother.scrollTo(target, true, "top top");
            }
          } catch {
            const target = document.querySelector(section as string) as unknown as HTMLElement | null;
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Mobile: native smooth scroll
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (!section) return;
          const target = document.querySelector(section);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        ScrollSmoother.refresh(true);
      }
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Adarsh
        </a>
        <a
          href="mailto:adarshsingh55555ac@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          adarshsingh55555ac@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          data-cursor="disable"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile fullscreen menu overlay */}
      <div className={`nav-mobile-menu${menuOpen ? " active" : ""}`}>
        <ul>
          <li>
            <a data-href="#about" href="#about" onClick={closeMenu}>
              ABOUT
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={closeMenu}>
              WORK
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={closeMenu}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
