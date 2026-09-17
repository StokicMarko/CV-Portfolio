// Central place for all portfolio content. Edit this file to update the
// site; components just read from it.

export const site = {
  name: "Marko Stokic",
  tagline: "Student, Developer & Boardgames enthusiast",
  email: "m.markostokic@gmail.com",
  phone: "(+45) 52 79 06 55",
  location: "Horsens, Denmark",
  summary:
    "Software Technology Engineering student at VIA University College, building full-stack apps with C#/.NET, Angular and React while picking up cybersecurity along the way.",
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
  Languages: ["C#", "TypeScript", "JavaScript", "Java", "HTML", "CSS", "SQL"],
  "Frameworks & Tools": [".NET", "ASP.NET", "Angular", "React", "Node.js"],
  "Databases & Other": [
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "Git",
    "Jira",
    "CI/CD basics",
  ],
};

export const education = [
  {
    title: "Software Technology Engineering",
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
      "600-hour program focused on Angular, .NET, SQL, OOP, SOLID principles, and full web app development.",
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
    title: "Software Engineer Associate",
    place: "Gruppo Euris Spa, Trieste, Italy",
    period: "Mar 2025 - Aug 2025",
    description:
      "Developed Angular web apps and C#/.NET APIs; optimized MySQL queries and contributed to UI/UX improvements.",
  },
  {
    title: "ICT Technician",
    place: "Insiel, Trieste, Italy",
    period: "Apr 2019 - Jun 2019",
    description: "Troubleshooting and maintenance of enterprise computer systems.",
  },
  {
    title: "Rowing Coach",
    place: "Circolo Marina Mercantile, Trieste, Italy",
    period: "2019 - 2021",
    description: "Trained young athletes and new members, fostering teamwork and discipline.",
  },
];

export const certifications = [
  {
    title: "University Hackathon (VIA 2026)",
    description:
      "Built a team project using React, experimenting with a new frontend framework under time pressure.",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    description: "8-course certificate completed on Coursera, 2024.",
  },
];

export const languages = [
  { name: "Italian, Serbian", level: "Native" },
  { name: "English", level: "C1 (Fluent)" },
  { name: "Danish", level: "A1-A2 (Beginner)" },
];

export const volunteer = [
  {
    title: "Cafeteria Volunteer",
    place: "VIA University College, Horsens, Denmark",
    description: "Serving drinks and maintaining a welcoming atmosphere for students.",
  },
  {
    title: "Event Coordinator",
    place: "Pangaea Youth, Horsens, Denmark",
    description:
      "Promoting and organizing youth social events such as cooking sessions, workshops, and movie nights.",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
];
