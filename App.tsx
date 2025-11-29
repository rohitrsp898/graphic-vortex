import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Admin } from './components/Admin';
import { BRAND_DETAILS } from './constants';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => {
        // More robust check: looks for 'admin' anywhere in the hash
        // This handles #admin, #/admin, #admin/, etc.
        const hash = window.location.hash;
        setIsAdmin(hash.includes('admin'));
    };

    // Check on mount
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);

    // Listen for history navigation (back/forward)
    window.addEventListener('popstate', checkHash);

    // --- Dynamic Rounded Favicon Logic ---
    const setRoundedFavicon = (url: string) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Necessary for Canvas manipulation of external images

      // Append timestamp to bypass cache and ensure we get CORS headers
      const cacheBuster = url.includes('?') ? '&' : '?';
      img.src = `${url}${cacheBuster}t=${new Date().getTime()}`;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 64; // Standard efficient size for favicons
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 1. Define the circle path
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
          ctx.closePath();
          // 2. Clip everything drawn afterwards to this circle
          ctx.clip();
          // 3. Draw the image (resized to fit)
          ctx.drawImage(img, 0, 0, size, size);

          // 4. Convert to Data URL and update the specific favicon link
          const dataUrl = canvas.toDataURL();
          const faviconLink = document.getElementById('favicon') as HTMLLinkElement;
          if (faviconLink) {
            faviconLink.href = dataUrl;
          }
        }
      };
      img.onerror = () => {
        console.warn("Could not process rounded favicon due to image load error or CORS policy.");
      };
    };

    // Attempt to make the favicon round using the logo URL
    setRoundedFavicon(BRAND_DETAILS.logoUrl);

    return () => {
        window.removeEventListener('hashchange', checkHash);
        window.removeEventListener('popstate', checkHash);
    };
  }, []);

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

  if (isAdmin) {
      return <Admin />;
  }

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