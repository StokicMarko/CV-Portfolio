import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance = null;

/** The running Lenis instance, or null (reduced motion / not mounted yet). */
export const getLenis = () => instance;

/**
 * Smooth scrolling for the whole page. Lenis keeps the native scrollbar and
 * scroll position, so sticky/scroll-linked code can keep reading
 * window.scrollY. Skipped for prefers-reduced-motion users.
 */
export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // autoRaf defaults to false: without it Lenis blocks the native wheel
    // scroll but never animates, so the wheel and touchpad do nothing.
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    instance = lenis;    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);
}
