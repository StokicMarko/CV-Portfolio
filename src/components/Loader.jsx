import { useEffect, useState } from "react";
import "./loader.css";

/**
 * A one-time intro: an SVG path draws itself, three nodes fade in at its
 * corners, then the whole mark scales out and the veil lifts. Shown once
 * per browser session (sessionStorage flag) and skipped entirely for
 * prefers-reduced-motion users.
 */
export default function Loader() {
  const [phase, setPhase] = useState("idle"); // idle | running | leaving | done

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("seen-loader") === "1";

    if (reduced || seen) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("running");
    sessionStorage.setItem("seen-loader", "1");

    const leaveTimer = window.setTimeout(() => {
      setPhase("leaving");
    }, 1450);

    return () => window.clearTimeout(leaveTimer);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 460);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done" || phase === "idle") return null;

  return (
    <div
      className={`loader ${phase === "running" ? "is-running" : ""} ${
        phase === "leaving" ? "is-leaving" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        width="84"
        height="84"
        viewBox="0 0 32 32"
        fill="none"
        className="loader-mark"
      >
        <path
          className="loader-route"
          d="M16 8.5 L8.5 21 L23.5 21"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className="loader-nodes" fill="currentColor">
          <circle cx="16" cy="8.5" r="2.1" />
          <circle cx="8.5" cy="21" r="2.1" />
          <circle cx="23.5" cy="21" r="2.1" />
        </g>
      </svg>
    </div>
  );
}
