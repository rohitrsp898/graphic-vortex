import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  scrollToPortfolio: () => void;
  scrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToPortfolio, scrollToContact }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs tracking-widest uppercase mb-6 animate-slide-up">
          <Sparkles className="w-3 h-3" />
          <span>Available for freelance</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {HERO_CONTENT.name}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {HERO_CONTENT.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={scrollToPortfolio}
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            View Work
          </button>
          <button 
            onClick={scrollToContact}
            className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  );
};

export default Hero;