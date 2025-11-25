import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      <Navbar scrollToSection={scrollToSection} />
      
      <main>
        <Hero 
          scrollToPortfolio={() => scrollToSection('portfolio')} 
          scrollToContact={() => scrollToSection('contact')}
        />
        <Portfolio 
          scrollToContact={() => scrollToSection('contact')}
        />
        <About />
        <Contact />
      </main>

      <ChatBot />
    </div>
  );
};

export default App;