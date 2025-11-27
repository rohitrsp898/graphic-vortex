import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { GeminiAssistant } from './components/GeminiAssistant';

function App() {
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-neutral-950 text-white">
      {/* Navigation - Fixed Glass Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
        <a 
          href="#" 
          onClick={scrollToTop}
          className="font-poppins font-bold text-xl text-white hover:text-primary transition-colors"
        >
          Graphic Vortex
        </a>
        <div className="flex gap-8 text-sm font-medium text-neutral-300">
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </a>
          <a 
            href="#work" 
            onClick={(e) => scrollToSection(e, 'work')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Work
          </a>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </nav>

      <Hero />
      <Portfolio />
      <About />
      <Contact />
      
      {/* AI Assistant */}
      <GeminiAssistant />
    </main>
  );
}

export default App;