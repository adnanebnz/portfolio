import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
export default function Home() {
  return (
    <main>
      <Banner />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
