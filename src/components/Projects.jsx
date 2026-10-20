import { useEffect, useId, useRef, useState } from "react";
import {
  LayoutTemplate,
  Castle,
  MessagesSquare,
  ChartColumn,
  Sparkles,
  Swords,
  Waves,
  Code,
} from "lucide-react";
import { projects } from "../data/site";
import { getLenis } from "../hooks/useLenis";
import { assetUrl } from "../utils/assetUrl";
import ProjectStats from "./ProjectStats";
import "./projects.css";

const ICONS = {
  LayoutTemplate,
  Castle,
  MessagesSquare,
  ChartColumn,
  Sparkles,
  Swords,
  Waves,
};

const pad = (n) => String(n).padStart(2, "0");
const iconFor = (project) => ICONS[project.icon] ?? Code;
const linkOf = (project) => project.url || project.demo;

export default function Projects() {
  const idPrefix = useId();
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
    const top =
      track.getBoundingClientRect().top +
      window.scrollY +
      ((index + 0.5) / projects.length) * travel;

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const openProject = (project) => {
    const link = linkOf(project);
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCard = (index, project) => {
    if (reduced) return openProject(project);
    if (index !== active) return scrollToCard(index);
    return openProject(project);
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
                const showId = `${idPrefix}-show-${i}`;
                const titleId = `${idPrefix}-title-${i}`;
                const descriptionId = `${idPrefix}-description-${i}`;

                return (
                  <article
                    key={project.title}
                    className={`stack-card${i <= active ? " is-in" : ""}${
                      isTop ? " is-top" : ""
                    }${isBuried ? " is-buried" : ""}`}
                    style={{ "--i": i }}
                    onClick={() => handleCard(i, project)}
                    onKeyDown={(e) => {
                      if (isBuried && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        scrollToCard(i);
                      }
                    }}
                    role={isBuried ? "button" : undefined}
                    tabIndex={isBuried ? 0 : undefined}
                    aria-labelledby={isBuried ? `${showId} ${titleId}` : undefined}
                    aria-describedby={isBuried ? descriptionId : undefined}
                  >
                    {isBuried && (
                      <span id={showId} className="visually-hidden">
                        Show
                      </span>
                    )}
                    <span className="stack-num">{pad(i + 1)}</span>
                    {project.image && (
                      <img
                        className="stack-shot"
                        src={assetUrl(project.image)}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                      />
                    )}
                    <div className="stack-body">
                      <h3 id={titleId} className="stack-title">
                        <Icon size={24} strokeWidth={1.75} />
                        {project.title}
                      </h3>
                      <ProjectStats project={project} />
                      {project.highlight && (
                        <p className="stack-highlight">{project.highlight}</p>
                      )}
                      <p id={descriptionId} className="stack-desc">
                        {project.description}
                      </p>
                      {(project.url || project.demo) && (
                        <div className="stack-links">
                          {project.demo && (
                            <a
                              className="stack-link"
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isTop || reduced ? 0 : -1}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live demo →
                            </a>
                          )}
                          {project.url && (
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
                          )}
                        </div>
                      )}
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
