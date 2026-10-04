import { useEffect, useRef, useState } from "react";
import {
  LayoutTemplate,
  Castle,
  MessagesSquare,
  ChartColumn,
  Sparkles,
  Swords,
  Code,
} from "lucide-react";
import { projects } from "../data/site";
import { getLenis } from "../hooks/useLenis";
import "./projects.css";

const ICONS = {
  LayoutTemplate,
  Castle,
  MessagesSquare,
  ChartColumn,
  Sparkles,
  Swords,
};

const pad = (n) => String(n).padStart(2, "0");
const iconFor = (project) => ICONS[project.icon] ?? Code;

/**
 * Pinned card stack: the track is several viewports tall, the stage sticks to
 * the top while it scrolls, and each card slides onto the stack once the
 * scroll position passes its share of the track (scrolling back removes it).
 *
 * Clicking a buried card scrolls back to where it is the top card; clicking
 * the top card opens its GitHub page.
 */
export default function Projects() {
  const stackRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced) return;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const travel = track.offsetHeight - window.innerHeight;
      const scrolled = -track.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, scrolled / travel));
      stackRef.current?.style.setProperty("--p", progress.toFixed(4));
      setActive(Math.min(projects.length - 1, Math.floor(progress * projects.length)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  const scrollToCard = (index) => {
    const track = trackRef.current;
    const travel = track.offsetHeight - window.innerHeight;
    // Aim for the middle of the card's segment so it lands cleanly on top
    const top =
      track.getBoundingClientRect().top +
      window.scrollY +
      ((index + 0.5) / projects.length) * travel;

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const handleCard = (index, url) => {
    if (reduced || index === active) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      scrollToCard(index);
    }
  };

  return (
    <section
      id="projects"
      className="projects-stack"
      ref={stackRef}
      style={{ "--n": projects.length }}
    >
      <div className="projects-track" ref={trackRef}>
        <div className="projects-stage">
          <div className="projects-inner">
            <div className="stack-visual" aria-hidden="true">
              <div className="stack-glow" />
              {projects.map((project, i) => {
                const Icon = iconFor(project);
                return (
                  <Icon
                    key={project.title}
                    className={`stack-bigicon${i === active ? " is-active" : ""}`}
                    strokeWidth={0.6}
                  />
                );
              })}
            </div>

            <header className="projects-head">
              <p className="projects-eyebrow">Featured Projects</p>
              <h2 className="projects-title">
                Things I've
                <span>built</span>
              </h2>
            </header>

            <div className="stack-cards">
              {projects.map((project, i) => {
                const Icon = iconFor(project);
                const isTop = i === active;
                const isBuried = i < active;

                return (
                  <article
                    key={project.title}
                    className={`stack-card${i <= active ? " is-in" : ""}${
                      isTop ? " is-top" : ""
                    }${isBuried ? " is-buried" : ""}`}
                    style={{ "--i": i }}
                    onClick={() => handleCard(i, project.url)}
                    onKeyDown={(e) => {
                      if (isBuried && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        scrollToCard(i);
                      }
                    }}
                    role={isBuried ? "button" : undefined}
                    tabIndex={isBuried ? 0 : undefined}
                    aria-label={isBuried ? `Show ${project.title}` : undefined}
                  >
                    <span className="stack-num">{pad(i + 1)}</span>
                    <div className="stack-body">
                      <h3 className="stack-title">
                        <Icon size={24} strokeWidth={1.75} />
                        {project.title}
                      </h3>
                      <p className="stack-tech">{project.tech}</p>
                      <p className="stack-desc">{project.description}</p>
                      <a
                        className="stack-link"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isTop || reduced ? 0 : -1}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on GitHub →
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <ol className="stack-index" aria-label="Project index">
              {projects.map((project, i) => (
                <li key={project.title}>
                  <button
                    type="button"
                    onClick={() => scrollToCard(i)}
                    aria-current={i === active}
                  >
                    <span>{pad(i + 1)}</span> {project.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
