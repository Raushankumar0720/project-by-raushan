'use client';

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar } from 'react-icons/fa';
import projects from '../utils/data/projects-data';

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="project-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Code-style Card Header */}
            <div className="bg-secondary px-4 py-3 border-b border-accent-red/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-accent-red font-fira text-sm">
                            <FaCode className="inline mr-2" />
                            project_{project.id}
                        </span>
                    </div>
                    {project.featured && (
                        <span className="flex items-center gap-1 text-yellow-500 text-xs">
                            <FaStar /> Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Card Content - Code Object Style */}
            <div className="p-4 font-fira text-sm">
                <pre className={`${isHovered ? 'text-text-primary' : 'text-text-secondary'} transition-colors duration-300`}>
                    {`{
  title: "${project.title}",
  description: "${project.description.substring(0, 50)}...",
  technologies: [
    ${project.technologies.map(t => `"${t}"`).join(',\n    ')}
  ],
  github: "${project.github.substring(0, 30)}...",
  live: "${project.live.substring(0, 30)}..."
}`}
                </pre>
            </div>

            {/* Tech Stack Tags */}
            <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs text-accent-red bg-accent-red/10 px-2 py-1 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs text-text-secondary px-2 py-1">
                            +{project.technologies.length - 4} more
                        </span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 px-4 pb-4">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-accent-red transition-colors duration-300 text-sm"
                >
                    <FaGithub />
                    <span>Code</span>
                </a>
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-accent-red transition-colors duration-300 text-sm"
                >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                </a>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        Featured <span className="text-accent-red">Projects</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        A selection of projects that showcase my technical skills and problem-solving abilities
                    </p>
                </div>

                {/* Featured Projects */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2" data-aos="fade-up">
                        <span className="text-accent-red">//</span> Featured Work
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* Other Projects */}
                <div>
                    <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2" data-aos="fade-up">
                        <span className="text-accent-red">//</span> Other Projects
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                {/* View More Button */}
                <div className="text-center mt-12" data-aos="fade-up">
                    <a
                        href="https://github.com/raushan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-flex items-center gap-2"
                    >
                        <FaGithub />
                        View More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
