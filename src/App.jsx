import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Loader />
      <div className="app-shell">
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
