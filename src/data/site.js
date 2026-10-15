export const site = {
  name: "Marko Stokic",
  tagline:
    "Full-stack developer (.NET · Angular · React), studying Software Engineering at VIA, with a growing focus on security.",
  availability: "Open to student jobs (~10h/week) · Horsens / Aarhus",
  email: "m.markostokic@gmail.com",
  phone: "(+45) 52 79 06 55",
  location: "Horsens, Denmark",
  summary:
    "Software Technology Engineering student at VIA University College and full stack developer, building apps with C#/.NET, Angular and React. Working as a student frontend developer and programming tutor while picking up cybersecurity along the way.",
  github: "https://github.com/StokicMarko",
  linkedin: "https://www.linkedin.com/in/stokic-marko/",
  cvUrl: "Marko_Stokic_CV.pdf",
  currently: {
    building: "",
    learning: "",
    playing: "",
  },
};

export const sections = {
  about: { title: "About", subline: "a bit about me" },
  experience: { title: "Experience", subline: "where I've worked" },
  education: { title: "Education", subline: "where I've studied" },
  skills: { title: "Technical Skills" },
  certifications: { title: "Certifications & Achievements" },
  languages: { title: "Languages" },
  volunteer: { title: "Volunteer Work" },
};

export const closing = {
  title: "Let's build something",
  subline: "Open to student jobs and 2027 internships.",
};

export const about = [
  "Hi! I am Marko Stokic, a Software Technology Engineering student at VIA University College in Horsens, Denmark. I have always enjoyed exploring how technology works and finding creative ways to solve problems, which naturally led me toward software development and, more recently, an interest in cybersecurity. I want to keep improving my skills and learn how to make systems safer and more reliable. Alongside my studies I work as a student frontend developer and as a programming tutor, helping first-year students with programming fundamentals.",
  "Outside of my studies, I like keeping active: I go to the gym about four times a week, which helps me stay focused and balanced. I also spend some of my time volunteering as a barista at VIA's campus café, where I am preparing to take on a management role, as Vice-President of ESG (Engineer Social Games), and with Pangaea Youth, organizing social events to bring people together and create good vibes.",
  "In my free time, I am a big fan of board games. I love strategy, teamwork, and a bit of friendly competition. Overall, I try to keep learning new things, meeting new people, and enjoying the process along the way.",
];

export const projects = [
  {
    title: "DESMI Seaweed (SEP3)",
    icon: "Waves",
    period: "Sep 2026 - Dec 2026",
    team: "Team of 4",
    tech: "Java, gRPC, C# .NET, Blazor",
    description:
      "A real-client semester project: a distributed system behind an independent website for DESMI Seaweed, with an admin dashboard, draft-to-live approvals, EN/ES/FR content and a country-level installation map.",
    url: "",
  },
  {
    title: "Forum-ish",
    icon: "MessagesSquare",
    tech: "C#, .NET, Blazor, EF Core, SQLite",
    description:
      "A full-stack forum built step by step: from in-memory repositories to a REST API, a Blazor front-end, authentication and Entity Framework Core. Work in progress.",
    url: "https://github.com/StokicMarko/Forum-ish",
  },
  {
    title: "LLM Note Normalizer",
    icon: "Sparkles",
    tech: "Python, Claude API",
    description:
      "Turns messy artwork notes like \"3 pcs - scala 1/20\" into clean, validated JSON using an LLM, with a test set and a needs-review flag for doubtful answers.",
    url: "https://github.com/StokicMarko/llm-note-normalizer",
  },
  {
    title: "Kingdom Simulator",
    icon: "Castle",
    tech: "Java, Concurrency, Design Patterns",
    description:
      "A multithreaded kingdom simulation with miners, transporters and a guarded treasure room, built on Singleton, Multiton, Proxy, Adapter, Producer-Consumer and Readers-Writers patterns.",
    url: "https://github.com/StokicMarko/kingdom-simulator",
  },
  {
    title: "Ruu",
    icon: "ChartColumn",
    tech: "Electron, Node.js, Express, Sequelize, Riot API",
    description:
      "A desktop client for League of Legends statistics: summoner profiles, match details and server-wide dashboards, backed by a small Express service that talks to the Riot Games API.",
    url: "https://github.com/StokicMarko/ruu-lol-statistic-app",
  },
  {
    title: "Portfolio",
    icon: "LayoutTemplate",
    tech: "React, Vite, Lenis, WebGL",
    description:
      "This site: a single-page portfolio with a WebGL contour-line shader background, a pinned stack of project cards driven by smooth scroll, and a one-time intro loader.",
    url: "https://github.com/StokicMarko/CV-Portfolio",
  },
  {
    title: "Chess Game (2018 throwback)",
    icon: "Swords",
    tech: "Java, Swing",
    description:
      "A two-player local chess game with a GUI, written in high school in 2018 and preserved as it was.",
    url: "https://github.com/StokicMarko/chess-2018",
  },
];

export const skills = {
  Languages: [
    "TypeScript",
    "JavaScript",
    "C#",
    "Java",
    "HTML",
    "CSS",
    "SQL",
    "Python",
  ],
  "Frameworks & Libraries": [
    "React",
    "Angular",
    ".NET",
    "ASP.NET",
    "Blazor",
    "EF Core",
    "Node.js/Express",
    "Electron",
    "gRPC",
  ],
  "Tools & Databases": [
    "Git",
    "Jasmine",
    "JUnit",
    "Jira",
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "CI/CD basics",
  ],
  Security: [
    "Google Cybersecurity Professional Certificate",
    "TryHackMe / Hack The Box practice",
    "OWASP Top 10 awareness",
  ],
};

export const education = [
  {
    title: "Software Technology Engineering (Bachelor)",
    place: "VIA University College, Horsens, Denmark",
    period: "Sep 2025 - Present",
    description:
      "Currently studying software architecture, web development, databases, and computer systems.",
  },
  {
    title: "Full Stack Developer (.NET/Angular) Course",
    place: "IRES and Gruppo EURIS, Udine, Italy",
    period: "Oct 2024 - Jan 2025",
    description:
      "600-hour programme covering Angular, TypeScript, .NET, ASP.NET, and SQL. Included a 200-hour internship.",
  },
  {
    title: "Computer Engineering",
    place: "Università degli Studi di Trieste, Italy",
    period: "2021 - 2023",
    description:
      "Completed approximately two-thirds of the curriculum before transferring to VIA University College.",
  },
  {
    title: "Diploma in Computer Technology",
    place: "Istituto Tecnico Statale Alessandro Volta, Trieste, Italy",
    period: null,
    description: null,
  },
];

export const experience = [
  {
    title: "Student Frontend Developer",
    place: "Folkæt, Remote",
    period: "Sep 2026 - Present",
    description:
      "Implementing the new front page, the first thing clients and other visitors see when they land on the site, based on a designer's new design. Part of a small team, alongside my studies.",
  },
  {
    title: "Programming Tutor",
    place: "VIA University College, Horsens, Denmark",
    period: "Sep 2026 - Present",
    description:
      "Introducing first-year students to university life and supporting them with programming fundamentals during a weekly workshop.",
  },
  {
    title: "Software Engineer Associate",
    place: "Gruppo Euris Spa, Trieste, Italy",
    period: "Mar 2025 - Aug 2025",
    description:
      "Developed and maintained web application pages in Angular with reusable components, and wrote and maintained unit and end-to-end test coverage for them. Built APIs and business logic in C# (.NET) with SQL databases. Used Git and Jira in an agile team, including regular code reviews.",
  },
  {
    title: "ICT Technician",
    place: "Insiel, Trieste, Italy",
    period: "Apr 2019 - Jun 2019",
    description: "Troubleshooting and maintenance of enterprise systems. Configured new equipment. Small Java projects.",
  },
  {
    title: "Rowing Coach",
    place: "Circolo Marina Mercantile, Trieste, Italy",
    period: "2019 - 2021",
    description: "Trained young athletes in competitive rowing and ran introductory courses for children and adults.",
  },
];

export const certifications = [
  {
    title: "University Hackathon (VIA, Mar 2026)",
    description: "Built a team project in React under time pressure.",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    description: "8-course certificate completed on Coursera, 2024.",
  },
  {
    title: "TryHackMe: Cybersecurity 101 path",
    description: "In progress.",
  },
];

export const languages = [
  { name: "Italian", level: "Native" },
  { name: "English", level: "C1 (Fluent)" },
  { name: "Serbo-Croatian", level: "C1 (Fluent)" },
  { name: "Danish", level: "A2 · actively learning" },
];

export const volunteer = [
  {
    title: "Vice-President of ESG (Engineer Social Games)",
    place: "Horsens, Denmark",
    period: "Aug 2026 - Present",
    instagram: "esghorsens",
    description:
      "Responsible for organizing and managing social events designed to facilitate social interaction and enjoyment for participants.",
  },
  {
    title: "Café Team Member & Incoming Café Manager",
    place: "VIA University College, Horsens, Denmark",
    period: "Sep 2025 - Present",
    instagram: "campus.cafe",
    description:
      "Volunteering as a barista since arriving at VIA, and taking on the café manager role next semester, including onboarding new team members, event organisation, and stock management.",
  },
  {
    title: "Event Organiser",
    place: "Pangaea Youth, Horsens, Denmark",
    period: "Sep 2025 - Feb 2026",
    instagram: "pangaeayouth",
    description:
      "Coordinated community dinners and social events for young people.",
  },
];

export const credits = {
  builtWith: [
    { name: "React", url: "https://react.dev", note: "UI" },
    { name: "Vite", url: "https://vite.dev", note: "Build tool" },
    { name: "Lenis", url: "https://lenis.dev", note: "Smooth scrolling" },
    { name: "Lucide", url: "https://lucide.dev", note: "Icons" },
    { name: "WebGL", note: "Custom shader for the contour-line background" },
    { name: "GitHub Pages", url: "https://pages.github.com", note: "Hosting" },
  ],
  inspiredBy: [
    {
      name: "lenis.dev",
      url: "https://lenis.dev",
      note: "The pinned stack of project cards and the scroll cue",
    },
    {
      name: "landonorris.com",
      url: "https://landonorris.com",
      note: "Contour-line background and the curtain-wipe intro",
    },
    {
      name: "v4.elejeune.me",
      url: "https://v4.elejeune.me",
      note: "The loading intro",
    },
    {
      name: "portfilo-livid.vercel.app",
      url: "https://portfilo-livid.vercel.app",
      note: "The single scrolling page structure",
    },
  ],
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
];
