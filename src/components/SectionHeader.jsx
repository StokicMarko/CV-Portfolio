export default function SectionHeader({ title, subline, className = "" }) {
  return (
    <header className={`section-header ${className}`}>
      <h2 className="section-title">{title}</h2>
      {subline && <p className="section-subline">{subline}</p>}
    </header>
  );
}
