import { Swords, Waypoints, Dices, BarChart3, Network, Code2 } from "lucide-react";
import { projects } from "../data/site";
import "./projects.css";

const ICONS = { Swords, Waypoints, Dices, BarChart3, Network };


export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="section-eyebrow">Featured Projects</p>
      <h2 className="section-heading">A few things I've built</h2>
      <p className="section-intro">
        Mostly university coursework and side projects: Java games and
        simulators, a desktop stats app, and a bit of low-level networking.
      </p>

      <div className="project-grid">
        {projects.map((project) => {
          const Icon = ICONS[project.icon] ?? Code2;
          const CardTag = project.url ? "a" : "div";
          const cardProps = project.url
            ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <CardTag key={project.title} className="project-card" {...cardProps}>
              <div className="project-icon">
                <Icon size={36} strokeWidth={1.5} />
              </div>
              <h3>{project.title}</h3>
              <p className="project-tech">{project.tech}</p>
              <p className="project-description">{project.description}</p>
              {project.url && <span className="project-link">View on GitHub →</span>}
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}
