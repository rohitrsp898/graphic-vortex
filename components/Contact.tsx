import React, { useState } from 'react';
import { SOCIAL_LINKS, PERSONAL_DETAILS, BRAND_DETAILS } from '../constants';
import * as Icons from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    
    // Construct email subject and body
    const subject = `Portfolio Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Open default mail client using the centralized email address
    window.location.href = `mailto:${PERSONAL_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="bg-background pt-24 pb-12 px-4 border-t border-white/5 scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Let's Create Something Together</h2>
        <p className="text-gray-400 mb-12 text-lg">
          Have a project in mind? Looking for a quote? <br/>
          Or just want to say hi? Drop me a line.
        </p>

        <form className="max-w-md mx-auto space-y-4 text-left mb-16" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" 
              placeholder="Your name" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" 
              placeholder="hello@example.com" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
            <textarea 
              name="message"
              id="message"
              rows={4} 
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" 
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
            Send Message
          </button>
        </form>

        <div className="flex justify-center gap-8 mb-12">
          {SOCIAL_LINKS.map((link) => {
            // Dynamically render icon
            const IconComponent = (Icons as any)[link.iconName] || Icons.Link;
            return (
              <a 
                key={link.platform} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary transition-colors hover:-translate-y-1 transform duration-300"
              >
                <IconComponent className="w-6 h-6" />
                <span className="sr-only">{link.platform}</span>
              </a>
            );
          })}
        </div>

        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} {BRAND_DETAILS.name}. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Contact;
