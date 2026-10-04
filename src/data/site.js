// Central place for all portfolio content. Edit this file to update the
// site; components just read from it.

export const site = {
  name: "Marko Stokic",
  tagline: "Student, Developer & Boardgames enthusiast",
  email: "m.markostokic@gmail.com",
  phone: "(+45) 52 79 06 55",
  location: "Horsens, Denmark",
  summary:
    "Software Technology Engineering student at VIA University College and full stack developer, building apps with C#/.NET, Angular and React. Working as a student frontend developer and programming tutor while picking up cybersecurity along the way.",
  github: "https://github.com/StokicMarko",
};

export const projects = [
  {
    title: "Chess Game",
    icon: "Swords",
    tech: "Java",
    description:
      "A classic chess game playable for 2 players with a GUI interface.",
    url: "https://github.com/StokicMarko/chess-2018",
  },
  {
    title: "Path Finder",
    icon: "Waypoints",
    tech: "Java",
    description: "A visual pathfinding simulator with a GUI interface.",
    url: "https://github.com/StokicMarko/PathFinding",
  },
  {
    title: "Hangman",
    icon: "Dices",
    tech: "Java",
    description:
      "A console-based hangman game where players guess random words with limited attempts.",
    url: "https://github.com/StokicMarko/Impiccato-Hangman",
  },
  {
    title: "Ruu",
    icon: "BarChart3",
    tech: "Electron, Node.js, MongoDB, Riot Games API",
    description:
      "A desktop app for League of Legends statistics, built with Electron. Uses a Node.js server and MongoDB to process and store data from the Riot Games API.",
    url: "https://github.com/StokicMarko/ruu-lol-statistic-app",
  },
  {
    title: "Torrent Client",
    icon: "Network",
    tech: "C#",
    description:
      "A lightweight torrent client built in C#, capable of downloading files through a console interface.",
    url: null,
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
  Frameworks: ["React", "Angular", ".NET", "ASP.NET"],
  "Tools & Databases": [
    "Git",
    "Unit and end-to-end testing",
    "Jira",
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "CI/CD basics",
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
      "Taking on frontend development tasks as part of a small team, contributing to UI features on an as-needed basis alongside my studies.",
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
    title: "Personal portfolio website",
    description:
      "Rebuilt in React (work in progress), available at stokicmarko.github.io/CV-Portfolio.",
  },
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
  { name: "Danish", level: "Beginner (Module 3)" },
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

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
];
