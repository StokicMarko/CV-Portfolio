export function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Row({ label, children }) {
  return (
    <span>
      <span className="terminal-label">{label}</span>
      {children}
    </span>
  );
}
