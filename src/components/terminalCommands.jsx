import { projects, site } from "../data/site";
import { assetUrl } from "../utils/assetUrl";
import { ExternalLink, Row } from "./TerminalParts";

const HELP_ROWS = [
  ["help", "list the commands"],
  ["whoami", "who is behind this site"],
  ["ls projects", "list the projects"],
  ["open <project>", "open a project by name or number"],
  ["cat cv", "download the CV"],
  ["contact", "ways to reach me"],
  ["clear", "clear the screen"],
];

const COMMAND_NAMES = [
  "help",
  "whoami",
  "ls",
  "open",
  "cat",
  "contact",
  "clear",
  "sudo",
];

const shortName = (project) =>
  project.title.toLowerCase().replace(/\s*\(.*\)$/, "");

const ARGUMENT_OPTIONS = {
  ls: () => ["projects"],
  cat: () => ["cv"],
  open: () => projects.map(shortName),
};

const pad = (n) => String(n).padStart(2, "0");
const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const commonPrefix = (words) =>
  words.reduce((prefix, word) => {
    let length = 0;
    while (length < prefix.length && prefix[length] === word[length]) length++;
    return prefix.slice(0, length);
  });

export function completeInput(input) {
  const text = input.trimStart();
  const argumentStart = text.match(/^\S+\s+/);
  const base = argumentStart ? argumentStart[0] : "";
  const partial = text.slice(base.length);
  const candidates = argumentStart
    ? (ARGUMENT_OPTIONS[base.trim().toLowerCase()]?.() ?? [])
    : COMMAND_NAMES;
  const matches = candidates.filter((candidate) =>
    candidate.startsWith(partial.toLowerCase()),
  );

  if (matches.length === 0) return { value: input, options: [] };
  if (matches.length === 1) {
    return { value: `${base}${matches[0]} `, options: matches };
  }

  const prefix = commonPrefix(matches);
  const completed = prefix.length > partial.length ? prefix : partial;
  return { value: `${base}${completed}`, options: matches };
}

const error = (...lines) => ({ lines, tone: "error" });

function whoami() {
  const lines = [site.name, site.tagline, site.location];
  if (site.availability) lines.push(site.availability);
  return { lines };
}

function listProjects() {
  return {
    lines: [
      ...projects.map((project, i) => (
        <Row key={project.title} label={pad(i + 1)}>
          {project.title}
        </Row>
      )),
      "open <name or number> to visit one",
    ],
  };
}

function findProject(query) {
  const needle = normalize(query);
  if (!needle) return null;
  if (/^\d+$/.test(needle)) return projects[Number(needle) - 1] ?? null;
  const matches = projects.filter((p) => normalize(p.title).includes(needle));
  return matches.length === 1 ? matches[0] : matches;
}

function openProject(query) {
  if (!query) return error("usage: open <project>   (try: ls projects)");

  const found = findProject(query);
  if (!found || (Array.isArray(found) && found.length === 0)) {
    return error(`no project matches "${query}". Try: ls projects`);
  }
  if (Array.isArray(found)) {
    return error(
      `"${query}" matches ${found.map((p) => p.title).join(", ")}. Be more specific.`,
    );
  }

  const link = found.url || found.demo;
  if (!link) return { lines: [`${found.title} has no public link yet.`] };

  window.open(link, "_blank", "noopener,noreferrer");
  return {
    lines: [
      `opening ${found.title}...`,
      <ExternalLink key="link" href={link}>
        {link}
      </ExternalLink>,
    ],
  };
}

function downloadCv() {
  if (!site.cvUrl) return error("the CV is not available yet.");

  const anchor = document.createElement("a");
  anchor.href = assetUrl(site.cvUrl);
  anchor.download = site.cvUrl;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  return { lines: [`downloading ${site.cvUrl}...`] };
}

function contact() {
  const lines = [];
  if (site.email) {
    lines.push(
      <Row key="email" label="email">
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </Row>,
    );
  }
  if (site.linkedin) {
    lines.push(
      <Row key="linkedin" label="linkedin">
        <ExternalLink href={site.linkedin}>{site.linkedin}</ExternalLink>
      </Row>,
    );
  }
  if (site.github) {
    lines.push(
      <Row key="github" label="github">
        <ExternalLink href={site.github}>{site.github}</ExternalLink>
      </Row>,
    );
  }
  return { lines };
}

function hireMarko() {
  const links = [];
  if (site.email) {
    links.push(
      <a key="email" href={`mailto:${site.email}`}>
        email
      </a>,
    );
  }
  if (site.linkedin) {
    links.push(
      <ExternalLink key="linkedin" href={site.linkedin}>
        linkedin
      </ExternalLink>,
    );
  }
  if (site.github) {
    links.push(
      <ExternalLink key="github" href={site.github}>
        github
      </ExternalLink>,
    );
  }
  if (site.cvUrl) {
    links.push(
      <a key="cv" href={assetUrl(site.cvUrl)} download>
        download cv
      </a>,
    );
  }

  return {
    lines: [
      "[sudo] password for recruiter: ********",
      "Permission granted. Excellent hiring decision.",
      "Next step, pick one:",
      <span key="links" className="terminal-links">
        {links}
      </span>,
    ],
  };
}

function sudo(rest) {
  if (!rest) return error("usage: sudo <command>");
  if (normalize(rest) === "hire marko") return hireMarko();
  return error(
    "recruiter is not in the sudoers file. This incident will be reported.",
  );
}

export function runCommand(input) {
  const [name = "", ...args] = input.trim().split(/\s+/);
  const command = name.toLowerCase();
  const rest = args.join(" ");

  switch (command) {
    case "help":
      return {
        lines: HELP_ROWS.map(([usage, description]) => (
          <Row key={usage} label={usage}>
            {description}
          </Row>
        )),
      };
    case "whoami":
      return whoami();
    case "ls":
      return normalize(rest) === "projects"
        ? listProjects()
        : error("usage: ls projects");
    case "open":
      return openProject(rest);
    case "cat":
      return normalize(rest) === "cv" ? downloadCv() : error("usage: cat cv");
    case "contact":
      return contact();
    case "clear":
      return { clear: true };
    case "sudo":
      return sudo(rest);
    default:
      return error(`command not found: ${command}. Type 'help' for the list.`);
  }
}
