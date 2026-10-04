import useLenis from "./hooks/useLenis";
import Loader from "./components/Loader";
import ContourBackground from "./components/ContourBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

export default function App() {
  useLenis();

  return (
    <>
      <Loader />
      <div className="app-shell">
        <ContourBackground />
        <Nav />
        <Hero />
        <Projects />
        <About />
        <Resume />
        <Footer />
      </div>
    </>
  );
}
