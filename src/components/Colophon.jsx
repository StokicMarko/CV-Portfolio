import { ArrowUpRight } from "lucide-react";
import { credits } from "../data/site";
import "./colophon.css";

const pad = (n) => String(n).padStart(2, "0");

function Row({ item, index }) {
  const content = (
    <>
      {index !== undefined && <span className="colophon-num">{pad(index + 1)}</span>}
      <span className="colophon-text">
        <span className="colophon-name">{item.name}</span>
        {item.note && <span className="colophon-note">{item.note}</span>}
      </span>
      {item.url && <ArrowUpRight className="colophon-arrow" size={18} strokeWidth={1.75} />}
    </>
  );

  return item.url ? (
    <a className="colophon-row is-link" href={item.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <div className="colophon-row">{content}</div>
  );
}

export default function Colophon() {
  return (
    <section id="colophon" className="section">
      <p className="section-eyebrow">Colophon</p>
      <h2 className="section-heading">How this site was made</h2>

      <div className="colophon-grid">
        <div>
          <h3 className="colophon-title">Built with</h3>
          <ul className="colophon-list">
            {credits.builtWith.map((item) => (
              <li key={item.name}>
                <Row item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="colophon-title">Inspired by</h3>
          <ol className="colophon-list">
            {credits.inspiredBy.map((item, i) => (
              <li key={item.name}>
                <Row item={item} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
