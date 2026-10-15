import { about, sections } from "../data/site";
import SectionHeader from "./SectionHeader";
import "./about.css";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeader {...sections.about} />
      <div className="about-text">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
