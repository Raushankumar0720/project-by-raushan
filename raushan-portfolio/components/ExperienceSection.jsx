'use client';

import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import experiences from '../utils/data/experience';

const ExperienceSection = () => {
    return (
        <section id="experience" className="bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        Work <span className="text-accent-red">Experience</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        A journey through my professional career and the projects I've worked on
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-accent-red/30"></div>

                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <div
                                key={experience.id}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                data-aos-delay={index * 100}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-red rounded-full border-4 border-primary z-10"></div>

                                {/* Content */}
                                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="bg-bg-card p-6 rounded-xl border border-accent-red/10 hover:border-accent-red/30 transition-all duration-300">
                                        {/* Header */}
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-text-primary">
                                                    {experience.position}
                                                </h3>
                                                <p className="text-accent-red font-medium">
                                                    {experience.company}
                                                </p>
                                            </div>
                                            {experience.current && (
                                                <span className="px-3 py-1 bg-accent-red/20 text-accent-red text-xs rounded-full">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-4 text-text-secondary text-sm mb-4">
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt size={12} />
                                                {experience.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaBriefcase size={12} />
                                                {experience.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt size={12} />
                                                {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-text-secondary text-sm mb-4">
                                            {experience.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="space-y-2 mb-4">
                                            {experience.highlights.slice(0, 2).map((highlight, i) => (
                                                <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                                    <span className="text-accent-red mt-1">▹</span>
                                                    {highlight}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {experience.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="skill-badge text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
