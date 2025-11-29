import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Wrench, Tag as TagIcon, Loader2 } from 'lucide-react';
import { getAllProjects } from '../services/projectService';
import { Project } from '../types';

const INITIAL_LIMIT = 10;

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch Data
  useEffect(() => {
    const loadProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    loadProjects();
  }, []);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(item => item.category)))];

  // Filter Data
  const filteredData = selectedCategory === 'All'
    ? projects
    : projects.filter(item => item.category === selectedCategory);

  // Determine displayed projects
  const displayedProjects = showAll ? filteredData : filteredData.slice(0, INITIAL_LIMIT);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  return (
    <section id="work" className="bg-neutral-950 relative min-h-screen py-20">

      {/* Header & Filter Bar */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Selected Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Curated collection of digital experiences. Click on any project to see details.</p>
        </motion.div>

        {loading ? (
             <div className="flex justify-center py-20">
                 <Loader2 className="w-8 h-8 text-primary animate-spin" />
             </div>
        ) : (
            <>
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                        selectedCategory === cat
                        ? 'bg-white text-black border-white font-medium'
                        : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
                </div>

                {/* Grid View */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                    {displayedProjects.map((project) => (
                        <GridProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                    </AnimatePresence>
                </motion.div>

                {/* Explore More Button */}
                {!showAll && filteredData.length > INITIAL_LIMIT && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-16"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm shadow-lg"
                        >
                            Explore More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-neutral-500">
                        No projects found in this category.
                    </div>
                )}
            </>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const GridProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer shadow-lg"
    >
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse z-0" />
      )}

      <img
        src={project.imageUrl}
        alt={project.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
          imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
        <p className="text-primary text-xs uppercase tracking-wider mb-2 font-semibold">{project.category}</p>
        <h3 className="text-2xl font-bold text-white font-serif mb-2">{project.title}</h3>
        <div className="flex items-center gap-2 text-white/80 text-sm mt-2">
          <span>View Details</span> <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="relative bg-neutral-900 border border-neutral-800 w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-black relative flex items-center justify-center overflow-hidden">
                     {!imageLoaded && (
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                     )}
                     <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-contain transition-opacity duration-500 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto bg-neutral-900 border-l border-neutral-800">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            {project.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{project.title}</h2>
                        <p className="text-neutral-400 leading-relaxed text-lg">
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {project.year && (
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <Calendar className="w-5 h-5 text-neutral-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Year</h4>
                                    <p className="text-neutral-400">{project.year}</p>
                                </div>
                            </div>
                        )}

                        {project.tools && (
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <Wrench className="w-5 h-5 text-neutral-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Tools</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.tools.map(tool => (
                                            <span key={tool} className="text-sm text-neutral-400 bg-neutral-800 px-2 py-1 rounded">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {project.tags && (
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <TagIcon className="w-5 h-5 text-neutral-300" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Tags</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-sm text-neutral-500">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}