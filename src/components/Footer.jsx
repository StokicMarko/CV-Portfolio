import { ExternalLink, Mail } from "lucide-react";
import { site } from "../data/site";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>Let's get in touch</p>
        <div className="footer-links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={18} /> GitHub
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={18} /> Email
          </a>
        </div>
        <p className="footer-copy">
          {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
