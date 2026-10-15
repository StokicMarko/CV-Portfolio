import { site } from "../data/site";
import "./currently.css";

const FIELDS = [
  ["building", "Building"],
  ["learning", "Learning"],
  ["playing", "Playing"],
];

export default function Currently() {
  const items = FIELDS.map(([key, label]) => ({
    label,
    value: site.currently?.[key],
  })).filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <section className="currently" aria-labelledby="currently-title">
      <div className="currently-strip">
        <h2 id="currently-title" className="currently-title">
          Currently
        </h2>
        <dl className="currently-list">
          {items.map((item) => (
            <div key={item.label} className="currently-item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
