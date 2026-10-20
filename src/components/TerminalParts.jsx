export function Prompt() {
  return (
    <span className="terminal-prompt-text" aria-hidden="true">
      <span className="terminal-user">marko@portfolio</span>
      <span className="terminal-colon">:</span>
      <span className="terminal-path">~</span>
      <span className="terminal-dollar">$</span>{" "}
    </span>
  );
}

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
