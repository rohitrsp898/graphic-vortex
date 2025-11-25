import React from 'react';
import { ABOUT_CONTENT, SKILLS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-surface border-y border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              The Creative Mind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Behind The Pixel</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
               <p>{ABOUT_CONTENT}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Technical Proficiency</h3>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image/Stats */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://drive.google.com/thumbnail?id=1JTRDm92m8ftXB_OY6dt5W_q9kRfA8pIa&sz=w1920" 
                alt="Workspace" 
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-4xl font-bold text-white">3+</p>
                        <p className="text-gray-400 text-sm">Years Exp.</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">20+</p>
                        <p className="text-gray-400 text-sm">Projects</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">100%</p>
                        <p className="text-gray-400 text-sm">Satisfaction</p>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-10 right-10 w-full h-full border-2 border-primary/20 rounded-2xl -z-0 translate-x-4 translate-y-4"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;