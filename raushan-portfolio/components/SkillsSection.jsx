'use client';

import Marquee from 'react-fast-marquee';
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3, FaGitAlt, FaDocker, FaPython, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql, SiExpress, SiRedux, SiTailwindcss, SiAmazon } from 'react-icons/si';
import skills from '../utils/data/skills';

const getIcon = (iconName) => {
    const icons = {
        FaReact,
        FaNodeJs,
        FaJs,
        FaHtml5,
        FaCss3,
        FaGitAlt,
        FaDocker,
        FaPython,
        FaFigma,
        SiNextdotjs,
        SiTypescript,
        SiMongodb,
        SiPostgresql,
        SiExpress,
        SiRedux,
        SiTailwindcss,
        SiAmazon,
    };
    return icons[iconName] || FaCode;
};

const SkillCard = ({ skill, index }) => {
    const Icon = getIcon(skill.icon);

    return (
        <div
            className="flex items-center gap-3 bg-bg-card px-4 py-3 rounded-lg border border-accent-red/10 hover:border-accent-red/30 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            <Icon className="w-6 h-6 text-accent-red" />
            <span className="font-medium text-text-primary">{skill.name}</span>
            <div className="ml-auto">
                <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-accent-red to-accent-blue rounded-full"
                        style={{ width: `${skill.level}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const MarqueeSkill = ({ name }) => {
    const iconMap = {
        'React': FaReact,
        'Next.js': SiNextdotjs,
        'JavaScript': FaJs,
        'TypeScript': SiTypescript,
        'Node.js': FaNodeJs,
        'Express': SiExpress,
        'MongoDB': SiMongodb,
        'PostgreSQL': SiPostgresql,
        'Python': FaPython,
        'HTML': FaHtml5,
        'CSS': FaCss3,
        'Tailwind': SiTailwindcss,
        'Redux': SiRedux,
        'Git': FaGitAlt,
        'Docker': FaDocker,
        'AWS': SiAmazon,
        'Figma': FaFigma,
    };

    const Icon = iconMap[name] || FaJs;

    return (
        <div className="flex items-center gap-2 mx-6 py-2">
            <Icon className="w-5 h-5 text-accent-red" />
            <span className="text-text-primary font-medium whitespace-nowrap">{name}</span>
        </div>
    );
};

const SkillsSection = () => {
    return (
        <section id="skills" className="bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        My <span className="text-accent-red">Skills</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        A comprehensive toolkit built over years of professional development
                    </p>
                </div>

                {/* Marquee */}
                <div className="mb-16 -mx-4">
                    <Marquee
                        speed={50}
                        gradient={true}
                        gradientColor="#020b28"
                        className="py-4"
                    >
                        {skills.marqueeSkills.map((skill, index) => (
                            <MarqueeSkill key={index} name={skill} />
                        ))}
                    </Marquee>
                </div>

                {/* Skill Categories */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Frontend */}
                    <div
                        className="bg-secondary/50 rounded-xl p-6 border border-accent-red/10"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                            <FaReact className="text-accent-red" />
                            Frontend
                        </h3>
                        <div className="space-y-3">
                            {skills.frontend.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div
                        className="bg-secondary/50 rounded-xl p-6 border border-accent-red/10"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                            <FaNodeJs className="text-accent-red" />
                            Backend
                        </h3>
                        <div className="space-y-3">
                            {skills.backend.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div
                        className="bg-secondary/50 rounded-xl p-6 border border-accent-red/10"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                            <FaGitAlt className="text-accent-red" />
                            Tools & Others
                        </h3>
                        <div className="space-y-3">
                            {skills.tools.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
