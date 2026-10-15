const PIP_COUNT = 5;

function Pips({ value }) {
  return (
    <span
      className="stack-pips"
      role="img"
      aria-label={`${value} out of ${PIP_COUNT}`}
    >
      {Array.from({ length: PIP_COUNT }, (_, i) => (
        <span
          key={i}
          className={`stack-pip${i < value ? " is-on" : ""}`}
        />
      ))}
    </span>
  );
}

export default function ProjectStats({ project }) {
  const stats = [
    { label: "Stack", value: project.tech, wide: true },
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Duration", value: project.duration ?? project.period },
    {
      label: "Difficulty",
      value: project.difficulty && <Pips value={project.difficulty} />,
    },
  ].filter((stat) => stat.value);

  if (stats.length === 0) return null;

  return (
    <dl className="stack-stats">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`stack-stat${stat.wide ? " is-wide" : ""}`}
        >
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
