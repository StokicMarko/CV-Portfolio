import { useEffect, useState } from "react";
import { nav, site } from "../data/site";
import "./nav.css";

export default function Nav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav">
      <div className="nav-bar">
        <a href="#home" className="nav-title">
          {site.name}
        </a>
        <div className="nav-links">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href.slice(1) ? "nav-current" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
