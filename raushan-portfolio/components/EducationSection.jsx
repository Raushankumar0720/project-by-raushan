'use client';

import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaBook } from 'react-icons/fa';
import educations from '../utils/data/educations';

const EducationCard = ({ education, index }) => {
    return (
        <div
            className="bg-bg-card rounded-xl p-6 border border-accent-red/10 hover:border-accent-red/30 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center">
                        <FaGraduationCap className="w-6 h-6 text-accent-red" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">
                            {education.institution}
                        </h3>
                        <p className="text-accent-red text-sm">{education.degree}</p>
                    </div>
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-text-secondary text-sm mb-4">
                <span className="flex items-center gap-1">
                    <FaMapMarkerAlt size={12} />
                    {education.location}
                </span>
                <span className="flex items-center gap-1">
                    <FaCalendarAlt size={12} />
                    {education.startDate} - {education.endDate}
                </span>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm mb-4">
                {education.description}
            </p>

            {/* Achievements */}
            {education.achievements.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <FaAward className="text-accent-red" size={14} />
                        Achievements
                    </h4>
                    <ul className="space-y-1">
                        {education.achievements.map((achievement, i) => (
                            <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                                <span className="text-accent-red mt-1">▹</span>
                                {achievement}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Relevant Courses */}
            {education.relevantCourses.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <FaBook className="text-accent-red" size={14} />
                        Relevant Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {education.relevantCourses.map((course, i) => (
                            <span
                                key={i}
                                className="text-xs text-text-secondary bg-secondary px-2 py-1 rounded"
                            >
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const EducationSection = () => {
    return (
        <section id="education" className="bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        Edu<span className="text-accent-red">cation</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Academic background and continuous learning journey
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {educations.map((education, index) => (
                        <EducationCard key={education.id} education={education} index={index} />
                    ))}
                </div>

                {/* Learning Philosophy */}
                <div
                    className="mt-12 text-center"
                    data-aos="fade-up"
                >
                    <div className="inline-block bg-bg-card px-6 py-4 rounded-xl border border-accent-red/10">
                        <p className="text-text-secondary text-sm">
                            <span className="text-accent-red font-fira">const</span>{' '}
                            <span className="text-text-primary">learningPhilosophy</span>{' '}
                            <span className="text-accent-red">=</span>{' '}
                            <span className="text-string">"Never stop learning, as technology evolves every day"</span>
                            <span className="text-accent-red">;</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
