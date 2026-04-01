/**
 * scrollLock.ts
 * Works with both ScrollSmoother (desktop) and native scroll (mobile).
 * Uses a module-level smoother reference set by Navbar.
 */

let _smoother: any = null;

/** Called by Navbar after ScrollSmoother is created */
export function registerSmoother(s: any) {
  _smoother = s;
}

export function lockScroll() {
  if (window.innerWidth <= 1024) {
    // Mobile: position:fixed trick — preserves scroll position
    const scrollY = window.scrollY;
    document.body.dataset.lockScrollY = String(scrollY);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  } else {
    // Desktop: pause ScrollSmoother
    if (_smoother) {
      try { _smoother.paused(true); } catch { /* ignore */ }
    }
  }
}

export function unlockScroll() {
  if (window.innerWidth <= 1024) {
    const scrollY = parseInt(document.body.dataset.lockScrollY ?? "0", 10);
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    delete document.body.dataset.lockScrollY;
    window.scrollTo(0, scrollY);
  } else {
    // Desktop: resume ScrollSmoother
    if (_smoother) {
      try { _smoother.paused(false); } catch { /* ignore */ }
    }
  }
}
