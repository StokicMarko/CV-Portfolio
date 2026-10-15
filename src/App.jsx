import useLenis from "./hooks/useLenis";
import Loader from "./components/Loader";
import ContourBackground from "./components/ContourBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Currently from "./components/Currently";
import Resume from "./components/Resume";
import Footer from "./components/Footer";
import TerminalLauncher from "./components/TerminalLauncher";

const focusContent = () => {
  document.getElementById("content")?.focus({ preventScroll: true });
};

export default function App() {
  useLenis();

  return (
    <>
      <a className="skip-link" href="#content" onClick={focusContent}>
        Skip to content
      </a>
      <Loader />
      <div className="app-shell">
        <ContourBackground />
        <Nav />
        <main id="content" tabIndex={-1}>
          <Hero />
          <Projects />
          <About />
          <Currently />
          <Resume />
        </main>
        <Footer />
      </div>
      <TerminalLauncher />
    </>
  );
}
