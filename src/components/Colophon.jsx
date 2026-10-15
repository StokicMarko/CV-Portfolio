import { credits } from "../data/site";
import "./colophon.css";

function Credit({ item }) {
  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {item.name}
    </a>
  ) : (
    item.name
  );
}

export default function Colophon() {
  return (
    <div className="colophon">
      <div className="colophon-built">
        <span className="colophon-label">Built with</span>
        <ul className="colophon-tools">
          {credits.builtWith.map((item) => (
            <li key={item.name}>
              <Credit item={item} />
            </li>
          ))}
        </ul>
      </div>

      <details className="colophon-inspired">
        <summary>Inspired by</summary>
        <ul className="colophon-sources">
          {credits.inspiredBy.map((item) => (
            <li key={item.name}>
              <Credit item={item} />
              {item.note && <span className="colophon-note">{item.note}</span>}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
