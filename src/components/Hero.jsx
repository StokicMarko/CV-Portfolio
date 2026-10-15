import { useEffect, useState } from "react";
import { site } from "../data/site";
import { assetUrl } from "../utils/assetUrl";
import ActionRow from "./ActionRow";
import "./hero.css";

const delay = (d) => ({ "--d": `${d}s` });

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const markScrolled = () => setHasScrolled(true);
    window.addEventListener("scroll", markScrolled, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener("scroll", markScrolled);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-name">
            <span className="mask" style={delay(0)}>
              <span className="mask-in hero-first">{first}</span>
            </span>{" "}
            <span className="mask" style={delay(0.06)}>
              <span className="mask-in hero-last">{rest.join(" ")}</span>
            </span>
          </h1>

          <p className="hero-tagline mask" style={delay(0.14)}>
            <span className="mask-in">{site.tagline}</span>
          </p>

          <p className="hero-meta mask" style={delay(0.2)}>
            <span className="mask-in">
              {site.location} · VIA University College
            </span>
          </p>

          {site.availability && (
            <p className="hero-availability rise" style={delay(0.26)}>
              <span className="availability-dot" aria-hidden="true" />
              {site.availability}
            </p>
          )}

          <ActionRow className="rise" style={delay(0.32)} />
        </div>

        <div className="hero-photo">
          <div className="hero-frame rise" style={delay(0.04)}>
            <picture>
              <source srcSet={assetUrl("profile-800.webp")} type="image/webp" />
              <img
                className="hero-image"
                src={assetUrl("profile-800.jpg")}
                width="800"
                height="800"
                alt={site.name}
                fetchPriority="high"
              />
            </picture>
          </div>

          <svg
            className="hero-scribble"
            viewBox="0 0 320 400"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M78 14 C52 120 36 250 22 384"
              pathLength="1"
              style={delay(0.3)}
            />
            <path
              d="M258 318 C250 384 150 410 64 384 L84 404 L64 384 L91 379"
              pathLength="1"
              style={delay(0.4)}
            />
          </svg>
        </div>
      </div>

      <a
        href="#projects"
        className={`hero-scroll${hasScrolled ? " is-scrolled" : ""}`}
        style={delay(0.6)}
      >
        <span className="hero-scroll-mask">
          <span className="hero-scroll-text" style={delay(0.3)}>
            Scroll
          </span>
        </span>
        <span className="hero-scroll-mask">
          <span className="hero-scroll-text" style={delay(0.38)}>
            to explore
          </span>
        </span>
      </a>
    </section>
  );
}
