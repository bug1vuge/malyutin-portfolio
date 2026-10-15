import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Contacts } from './components/Contacts';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Minimap } from './components/Minimap';
import { Preloader } from './components/Preloader';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { StatusBar } from './components/StatusBar';
import { initParallax, initPointerGlow, initReveal } from './lib/motion';

export function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stops = [initReveal(), initParallax(), initPointerGlow()];
    return () => stops.forEach((s) => s());
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Preloader onDone={() => setReady(true)} />
      <Header />
      <main id="main" className="main">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contacts />
      </main>
      <Minimap />
      <StatusBar />
    </>
  );
}
