import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { PORTFOLIO_DATA } from '../constants';
import ProjectModal from './ProjectModal';
import { Maximize2 } from 'lucide-react';

interface PortfolioProps {
  scrollToContact: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ scrollToContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamically extract unique categories from the data
  const categories = useMemo(() => {
    const uniqueCategories = new Set(PORTFOLIO_DATA.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Selected Works</h2>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm uppercase tracking-wider rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with specialized spans for orientations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row-dense">
        {filteredProjects.map((project) => {
          // Determine grid span based on orientation
          const spanClass = project.orientation === 'landscape' 
            ? 'md:col-span-2' 
            : 'md:col-span-1';

          // Determine aspect ratio based on orientation
          const aspectClass = project.orientation === 'landscape' 
            ? 'aspect-video' 
            : project.orientation === 'square' 
              ? 'aspect-square' 
              : 'aspect-[3/4]';

          return (
            <div 
              key={project.id} 
              className={`group relative cursor-pointer ${spanClass}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={`relative overflow-hidden rounded-lg bg-[#1a1a1a] w-full ${aspectClass}`}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent text-xs uppercase tracking-wider mb-2 font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-xl text-white font-serif font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.title}
                  </h3>
                  
                  {/* Maximize Icon */}
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all delay-100">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No projects found in this category.
        </div>
      )}

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onContact={() => {
            setSelectedProject(null);
            scrollToContact();
          }}
        />
      )}
    </section>
  );
};

export default Portfolio;