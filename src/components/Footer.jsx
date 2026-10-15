import { closing, site } from "../data/site";
import ActionRow from "./ActionRow";
import Colophon from "./Colophon";
import SectionHeader from "./SectionHeader";
import "./footer.css";

const FOOTER_ORDER = ["email", "linkedin", "github", "cv"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <SectionHeader {...closing} />
        <ActionRow order={FOOTER_ORDER} primary="email" />
        <p className="footer-copy">
          {site.name} · {site.location}
        </p>
        <Colophon />
      </div>
    </footer>
  );
}
