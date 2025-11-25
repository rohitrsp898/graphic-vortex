import React, { useEffect } from 'react';
import { X, Calendar, Tag, MessageSquare, PenTool } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onContact: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContact }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Close Button (Fixed outside on mobile, inside on desktop layout) */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors md:hidden"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Container - Split View */}
      <div className="relative bg-[#0f0f0f] w-full max-w-7xl h-full md:h-[90vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-fade-in border border-white/10">
        
        {/* Left Side: Image Container */}
        <div className="lg:w-[60%] h-[40vh] lg:h-full relative bg-black flex items-center justify-center p-4 lg:p-8">
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-contain max-h-full drop-shadow-2xl"
            />
        </div>

        {/* Right Side: Details Container */}
        <div className="lg:w-[40%] h-full flex flex-col bg-[#1a1a1a] overflow-hidden border-l border-white/5 relative">
            
            {/* Desktop Close Button */}
            <div className="hidden lg:flex justify-end p-6 absolute top-0 right-0 z-10">
                <button 
                    onClick={onClose}
                    className="p-2 bg-black/20 rounded-full text-white/70 hover:bg-white hover:text-black transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-3 block">
                    {project.category}
                </span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                    {project.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                    {project.year && (
                        <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                            <Calendar className="w-4 h-4" />
                            <span>{project.year}</span>
                        </div>
                    )}
                    {project.client && (
                         <div className="text-gray-400 px-3 py-1.5">
                            Client: <span className="text-white font-medium">{project.client}</span>
                        </div>
                    )}
                </div>

                <div className="prose prose-invert max-w-none mb-10">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {project.description}
                    </p>
                </div>
                
                <div className="space-y-8">
                    {/* Tools */}
                    {project.tools && project.tools.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide font-bold mb-3">
                            <PenTool className="w-4 h-4" />
                            Tools Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <span key={tool} className="px-4 py-2 bg-black/30 rounded-full text-sm text-gray-200 border border-white/5">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                    )}

                    {/* Tags */}
                    <div>
                        <h4 className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide font-bold mb-3">
                             <Tag className="w-4 h-4" />
                             Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-sm text-primary/80 hover:text-primary transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Action */}
            <div className="p-6 lg:p-8 border-t border-white/10 bg-[#1a1a1a]">
                <button 
                    onClick={onContact}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-bold text-lg rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                >
                    Contact Me About Project <MessageSquare className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;