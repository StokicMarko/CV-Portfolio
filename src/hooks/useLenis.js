import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance = null;

export const getLenis = () => instance;

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    instance = lenis;

    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);
}
