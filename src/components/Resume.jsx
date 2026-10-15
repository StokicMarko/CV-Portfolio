import {
  sections,
  skills,
  education,
  experience,
  certifications,
  languages,
  volunteer,
} from "../data/site";
import SectionHeader from "./SectionHeader";
import "./resume.css";

function TimelineEntry({ title, place, period, instagram, description }) {
  const [start, end] = period ? period.split(" - ") : [];

  return (
    <li className="timeline-entry">
      <p className="timeline-period">
        {start && <span className="timeline-start">{start}</span>}
        {end && (
          <>
            <span className="visually-hidden"> to </span>
            <span className="timeline-end">{end}</span>
          </>
        )}
      </p>
      <div className="timeline-body">
        <h3 className="timeline-title">{title}</h3>
        {place && <p className="timeline-place">{place}</p>}
        {description && <p className="timeline-description">{description}</p>}
        {instagram && (
          <a
            className="entry-link"
            href={`https://www.instagram.com/${instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @{instagram}
          </a>
        )}
      </div>
    </li>
  );
}

function Timeline({ entries }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <TimelineEntry key={entry.title} {...entry} />
      ))}
    </ol>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="section">
      <div className="resume-timelines">
        <div>
          <SectionHeader
            className="section-header--sub"
            {...sections.experience}
          />
          <Timeline entries={experience} />
        </div>
        <div>
          <SectionHeader
            className="section-header--sub"
            {...sections.education}
          />
          <Timeline entries={education} />
        </div>
      </div>

      <div className="resume-block">
        <h3 className="resume-subtitle">{sections.skills.title}</h3>
        <div className="chip-groups">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="chip-group">
              <h4 className="chip-group-label">{category}</h4>
              <ul className="chips">
                {items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="resume-secondary">
        <div className="resume-block">
          <h3 className="resume-subtitle">{sections.certifications.title}</h3>
          <ul className="achievements">
            {certifications.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="resume-block">
          <h3 className="resume-subtitle">{sections.languages.title}</h3>
          <ul className="chips">
            {languages.map((item) => (
              <li key={item.name} className="chip">
                <strong>{item.name}</strong>
                {item.level}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="resume-volunteer">
        <summary>
          <span className="resume-subtitle">{sections.volunteer.title}</span>
        </summary>
        <Timeline entries={volunteer} />
      </details>
    </section>
  );
}
