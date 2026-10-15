import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { assetUrl } from "../utils/assetUrl";
import "./cta.css";

const TOAST_MS = 2400;
const DEFAULT_ORDER = ["cv", "linkedin", "github", "email"];

const links = {
  cv: site.cvUrl && {
    label: "Download CV",
    href: assetUrl(site.cvUrl),
    download: true,
  },
  linkedin: site.linkedin && {
    label: "LinkedIn",
    href: site.linkedin,
    external: true,
  },
  github: site.github && {
    label: "GitHub",
    href: site.github,
    external: true,
  },
};

export default function ActionRow({
  className = "",
  style,
  order = DEFAULT_ORDER,
  primary = "cv",
}) {
  const [copied, setCopied] = useState(false);
  const toastTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const openMailClient = () => {
    window.location.href = `mailto:${site.email}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      openMailClient();
      return;
    }
    setCopied(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setCopied(false), TOAST_MS);
  };

  const renderAction = (key) => {
    const buttonClass = `pill-button${key === primary ? "" : " ghost"}`;

    if (key === "email") {
      return (
        site.email && (
          <button
            key={key}
            type="button"
            className={buttonClass}
            onClick={copyEmail}
          >
            Copy email
          </button>
        )
      );
    }

    const link = links[key];
    if (!link) return null;

    return (
      <a
        key={key}
        className={buttonClass}
        href={link.href}
        download={link.download}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <div className={`cta-row ${className}`} style={style}>
        {order.map(renderAction)}
      </div>
      <p className="cta-toast" role="status">
        {copied ? "Copied, talk soon" : ""}
      </p>
    </>
  );
}
