import React, { useState, useEffect } from 'react';
import { Menu, X, Palette } from 'lucide-react';
import { BRAND_LOGO, BRAND_DETAILS, getDriveDirectLink } from '../constants';

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Work', id: 'portfolio' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  // Convert the drive link if present
  const logoSrc = getDriveDirectLink(BRAND_LOGO.src);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          {BRAND_LOGO.showImage && logoSrc ? (
            <img 
              src={logoSrc} 
              alt={BRAND_LOGO.alt} 
              className="h-10 w-10 object-cover rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <Palette className="w-5 h-5 text-background" />
            </div>
          )}
          <span className="text-xl font-display font-bold text-white tracking-wide group-hover:text-primary transition-colors">
            {BRAND_DETAILS.name}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium tracking-wider uppercase"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-white/10 py-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-4 px-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-gray-300 hover:text-primary py-2 text-lg font-medium border-b border-white/5 last:border-0"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
