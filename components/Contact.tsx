import React from 'react';
import { SOCIAL_LINKS, PERSONAL_DETAILS } from '../constants';
import { Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Instagram': return <Instagram className="w-6 h-6" />;
      case 'Linkedin': return <Linkedin className="w-6 h-6" />;
      case 'Twitter': return <Twitter className="w-6 h-6" />;
      default: return <Mail className="w-6 h-6" />;
    }
  };

  return (
    <footer id="contact" className="bg-black text-white py-20 border-t border-neutral-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Let's Create Something Amazing</h2>
        <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto">
          Ready to elevate your brand visual identity? Feel free to reach out for collaborations or just a friendly hello.
        </p>

        <a 
          href={`mailto:${PERSONAL_DETAILS.email}`}
          className="inline-block px-10 py-4 bg-primary rounded-full text-white font-bold text-lg hover:bg-violet-600 transition-colors mb-16 shadow-[0_0_20px_rgba(109,40,217,0.4)]"
        >
          Start a Project
        </a>

        <div className="flex justify-center gap-8 mb-12">
          {SOCIAL_LINKS.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-900 hover:bg-white hover:text-black transition-all duration-300"
              aria-label={link.platform}
            >
              {getIcon(link.iconName)}
            </a>
          ))}
          <a 
             href={`mailto:${PERSONAL_DETAILS.email}`}
             className="p-3 rounded-full bg-neutral-900 hover:bg-white hover:text-black transition-all duration-300"
             aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <div className="text-neutral-600 text-sm flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_DETAILS.name} - Graphic Vortex. All rights reserved.</p>
          <a href="#admin" className="opacity-10 hover:opacity-100 transition-opacity text-xs">Admin Access</a>
        </div>
      </div>
    </footer>
  );
};