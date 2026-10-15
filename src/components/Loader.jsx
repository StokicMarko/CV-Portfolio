import { useEffect, useLayoutEffect, useState } from "react";
import { site } from "../data/site";
import "./loader.css";

const SEEN_KEY = "seen-loader";
const FONT_WAIT_MS = 400;
const LETTER_STAGGER_MS = 18;
const SLASH_DELAY_MS = 650;
const SLASH_DRAW_MS = 170;
const SLIDE_MS = 550;
const LEAVE_AT = SLASH_DELAY_MS + SLASH_DRAW_MS + 20;
const LEAVE_MS = SLIDE_MS + 30;
const HERO_AT = 120;

const timings = {
  "--letter-stagger": `${LETTER_STAGGER_MS}ms`,
  "--slash-delay": `${SLASH_DELAY_MS}ms`,
  "--slash-draw": `${SLASH_DRAW_MS}ms`,
  "--slide": `${SLIDE_MS}ms`,
};

let letterCount = 0;
const lines = site.name
  .toUpperCase()
  .split(" ")
  .map((word) => [...word].map((ch) => ({ ch, i: letterCount++ })));

function shouldSkip() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    return;
  }
}

export default function Loader() {
  const [skipped] = useState(shouldSkip);
  const [phase, setPhase] = useState(skipped ? "done" : "waiting");
  const active = phase !== "done";

  useLayoutEffect(() => {
    if (skipped) document.documentElement.classList.add("no-intro");
  }, [skipped]);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (phase !== "waiting") return;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setPhase((p) => (p === "waiting" ? "running" : p));
    };
    const timeout = window.setTimeout(start, FONT_WAIT_MS);
    document.fonts?.load("1em Anton").then(start, start);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;
    rememberIntroSeen();

    const skip = () => setPhase("leaving");
    const events = ["pointerdown", "keydown", "wheel", "touchstart"];
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    const leaveTimer = window.setTimeout(skip, LEAVE_AT);

    return () => {
      events.forEach((e) => window.removeEventListener(e, skip));
      window.clearTimeout(leaveTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const doneTimer = window.setTimeout(() => setPhase("done"), LEAVE_MS);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  useEffect(() => {
    const root = document.documentElement;
    if (phase === "done") {
      root.classList.add("is-loaded");
      return;
    }
    if (phase !== "leaving") return;
    const heroTimer = window.setTimeout(
      () => root.classList.add("is-loaded"),
      HERO_AT,
    );
    return () => window.clearTimeout(heroTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`loader ${
        phase === "running" || phase === "leaving" ? "is-running" : ""
      } ${phase === "leaving" ? "is-leaving" : ""}`}
      style={timings}
      aria-hidden="true"
    >
      {lines.map((letters, line) => (
        <div
          key={line}
          className={`loader-panel ${line === 0 ? "is-top" : "is-bottom"}`}
        >
          <span className={`loader-line ${line > 0 ? "is-outline" : ""}`}>
            {letters.map(({ ch, i }) => (
              <span key={i} className="loader-letter" style={{ "--i": i }}>
                {ch}
              </span>
            ))}
          </span>
        </div>
      ))}

      <div className="loader-slash">
        <div className="loader-slash-blade" />
      </div>

      <div className="loader-flash" />
    </div>
  );
}
