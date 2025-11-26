import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_DETAILS, BRAND_DETAILS } from '../constants';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] pointer-events-none z-0" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center">
        
        {/* Logo/Avatar */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
           {/* Glow behind logo */}
           <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
           <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-neutral-900 border-2 border-neutral-800 p-1 relative overflow-hidden flex items-center justify-center shadow-2xl">
              {!logoLoaded && <div className="absolute inset-0 bg-neutral-800 animate-pulse" />}
              <img 
                src={BRAND_DETAILS.logoUrl} 
                alt={BRAND_DETAILS.logoAlt}
                className={`w-full h-full object-cover rounded-full transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                referrerPolicy="no-referrer"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onLoad={() => setLogoLoaded(true)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=GV&background=171717&color=fff&size=200&font-size=0.4';
                  setLogoLoaded(true);
                }}
              />
           </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold font-serif tracking-tight mb-4"
        >
          {BRAND_DETAILS.name}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-8 font-light"
        >
          {PERSONAL_DETAILS.tagline}
        </motion.p>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.6, duration: 0.8 }}
        >
           <a 
            href="#work"
            onClick={scrollToWork}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 cursor-pointer z-30 relative"
           >
             View Works
           </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 pointer-events-none"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
