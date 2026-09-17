import BoidsBackground from "./BoidsBackground";
import { site } from "../data/site";
import "./hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <BoidsBackground />
      <div className="hero-content">
        <img className="hero-image" src="/profile.JPG" alt="Picture of Marko Stokic" />
        <h1>{site.name}</h1>
        <p className="hero-tagline">{site.tagline}</p>
        <div className="hero-actions">
          <a href="#resume" className="pill-button">
            Resume
          </a>
          <a href="#projects" className="pill-button ghost">
            Projects
          </a>
          <a href="#about" className="pill-button ghost">
            About me
          </a>
        </div>
      </div>
    </section>
  );
}
