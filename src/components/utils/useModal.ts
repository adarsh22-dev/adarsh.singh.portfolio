/**
 * useModal — handles body/smoother scroll lock correctly on both
 * desktop (ScrollSmoother) and mobile (native scroll).
 */
import { useState, useCallback, useEffect } from "react";

export function useModal<T>() {
  const [active, setActive] = useState<T | null>(null);

  const open = useCallback((item: T) => {
    setActive(item);
    // Lock scroll - works for both smoother and native
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Pause ScrollSmoother
      try {
        // @ts-ignore
        const { smoother } = require("../Navbar");
        if (smoother && smoother.paused) smoother.paused(true);
      } catch {}
      const wrapper = document.getElementById("smooth-wrapper");
      if (wrapper) wrapper.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, -parseInt(scrollY || "0"));
    } else {
      const wrapper = document.getElementById("smooth-wrapper");
      if (wrapper) wrapper.style.overflow = "";
      // Resume ScrollSmoother
      try {
        // @ts-ignore
        const { smoother } = require("../Navbar");
        if (smoother && smoother.paused) smoother.paused(false);
      } catch {}
    }
    setActive(null);
  }, []);

  // Escape key closes modal
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, close]);

  return { active, open, close };
}
