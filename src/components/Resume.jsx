import { Mail, Phone, MapPin } from "lucide-react";
import {
  site,
  skills,
  education,
  experience,
  certifications,
  languages,
  volunteer,
} from "../data/site";
import "./resume.css";

function Entry({ title, place, period, description }) {
  return (
    <div className="entry">
      <strong>{title}</strong>
      {place && <span className="entry-place">{place}</span>}
      {period && <em className="entry-period">{period}</em>}
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="section">
      <p className="section-eyebrow">Resume</p>
      <h2 className="section-heading">Experience & background</h2>

      <div className="resume-card personal-info">
        <h3 className="name-title">{site.name}</h3>
        <p className="subtitle">
          Software Technology Engineering Student | VIA University College,
          Denmark
        </p>
        <div className="contact-info">
          <p>
            <Mail size={16} /> <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <Phone size={16} /> {site.phone}
          </p>
          <p>
            <MapPin size={16} /> {site.location}
          </p>
        </div>
      </div>

      <div className="resume-card">
        <h3>Technical Skills</h3>
        {Object.entries(skills).map(([category, items]) => (
          <p key={category}>
            <strong>{category}:</strong> {items.join(", ")}
          </p>
        ))}
      </div>

      <div className="resume-card">
        <h3>Education</h3>
        {education.map((item) => (
          <Entry key={item.title} {...item} />
        ))}
      </div>

      <div className="resume-card">
        <h3>Work Experience</h3>
        {experience.map((item) => (
          <Entry key={item.title} {...item} />
        ))}
      </div>

      <div className="resume-card">
        <h3>Projects & Certifications</h3>
        {certifications.map((item) => (
          <p key={item.title}>
            <strong>{item.title}</strong>: {item.description}
          </p>
        ))}
      </div>

      <div className="resume-card">
        <h3>Languages</h3>
        {languages.map((item) => (
          <p key={item.name}>
            <strong>{item.name}</strong>: {item.level}
          </p>
        ))}
      </div>

      <div className="resume-card">
        <h3>Volunteer Work</h3>
        {volunteer.map((item) => (
          <Entry key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
