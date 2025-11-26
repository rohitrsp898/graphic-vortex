import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, SKILLS, PERSONAL_DETAILS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="about" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-800/20 skew-x-12 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 className="text-primary font-bold tracking-widest uppercase mb-2">About Me</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Visual Storyteller & <br/> Digital Creator
            </h2>
            <div className="text-neutral-300 text-lg leading-relaxed space-y-4 mb-8">
              {ABOUT_CONTENT.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="mt-8">
               <h4 className="text-white font-semibold mb-4 border-b border-neutral-700 pb-2 inline-block">Technical Arsenal</h4>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {SKILLS.map((skill, idx) => (
                   <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 text-neutral-400 text-sm"
                   >
                     <CheckCircle2 className="w-4 h-4 text-primary" />
                     <span>{skill}</span>
                   </motion.div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Visual/Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { number: "3+", label: "Yrs Exp." },
                    { number: "20+", label: "Projects" },
                    { number: "100%", label: "Satisfaction" },
                ].map((stat, index) => (
                    <div key={index} className="bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl text-center backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                        <h3 className="text-2xl lg:text-3xl font-bold text-primary font-serif">{stat.number}</h3>
                        <p className="text-xs text-neutral-400 uppercase tracking-wider mt-1 font-semibold">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-neutral-700 bg-neutral-800">
               {/* Skeleton Loader */}
               {!imageLoaded && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
               )}
               
               {/* Abstract representation of the designer since no personal photo provided in constants other than logo */}
               <img 
                 src="https://lh3.googleusercontent.com/d/1JTRDm92m8ftXB_OY6dt5W_q9kRfA8pIa"
                 alt="Workspace"
                 draggable="false"
                 onContextMenu={(e) => e.preventDefault()}
                 onLoad={() => setImageLoaded(true)}
                 className={`w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ${
                   imageLoaded ? 'opacity-100' : 'opacity-0'
                 }`}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
               
               {/* Overlay Info */}
               <div className="absolute bottom-6 left-6 border-l-4 border-primary pl-4">
                 <p className="text-2xl font-bold font-serif">{PERSONAL_DETAILS.name}</p>
                 <p className="text-neutral-400">{PERSONAL_DETAILS.role}</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
