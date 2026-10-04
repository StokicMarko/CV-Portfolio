import { site } from "../data/site";
import "./hero.css";

// Delay (in seconds) before each piece is wiped in, once the loader is done
const delay = (d) => ({ "--d": `${d}s` });

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-name">
            <span className="wipe" style={delay(0.1)}>
              <span className="wipe-in hero-first">{first}</span>
            </span>{" "}
            <span className="wipe" style={delay(0.35)}>
              <span className="wipe-in hero-last">{rest.join(" ")}</span>
            </span>
          </h1>

          <p className="hero-tagline wipe" style={delay(0.7)}>
            <span className="wipe-in">{site.tagline}</span>
          </p>

          <p className="hero-meta wipe" style={delay(0.9)}>
            <span className="wipe-in">{site.location} · VIA University College</span>
          </p>
        </div>

        <div className="hero-photo">
          <div className="hero-frame wipe" style={delay(0.3)}>
            <img
              className="hero-image wipe-in"
              src="./profile.JPG"
              alt="Picture of Marko Stokic"
            />
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
              style={delay(1.7)}
            />
            <path
              d="M176 372 L204 326 L224 362 L258 296 L276 334"
              pathLength="1"
              style={delay(2.1)}
            />
          </svg>
        </div>
      </div>

      <a href="#projects" className="hero-scroll" style={delay(2.2)}>
        <span className="hero-scroll-mask">
          <span className="hero-scroll-text" style={delay(1.6)}>
            Scroll
          </span>
        </span>
        <span className="hero-scroll-mask">
          <span className="hero-scroll-text" style={delay(1.75)}>
            to explore
          </span>
        </span>
      </a>
    </section>
  );
}
