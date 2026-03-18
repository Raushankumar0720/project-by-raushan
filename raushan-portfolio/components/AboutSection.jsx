'use client';

import { FaUser, FaCode, FaHeart, FaAward } from 'react-icons/fa';
import personalData from '../utils/data/personal-data';

const AboutSection = () => {
    const stats = [
        { icon: FaCode, label: 'Years Experience', value: '4+' },
        { icon: FaUser, label: 'Projects Completed', value: '30+' },
        { icon: FaHeart, label: 'Happy Clients', value: '20+' },
        { icon: FaAward, label: 'Awards Won', value: '5+' },
    ];

    return (
        <section id="about" className="bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        About <span className="text-accent-red">Me</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Passionate about building scalable web applications and creating seamless user experiences
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Image/Illustration */}
                    <div className="relative" data-aos="fade-right">
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Decorative background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-red/20 to-accent-blue/20 rounded-2xl transform rotate-3"></div>

                            {/* Main content */}
                            <div className="relative bg-bg-card rounded-2xl p-8 border border-accent-red/20">
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-red to-accent-blue flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">RK</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                                        {personalData.name}
                                    </h3>
                                    <p className="text-accent-red font-fira mb-4">
                                        {personalData.title}
                                    </p>
                                    <p className="text-text-secondary text-sm">
                                        {personalData.location}
                                    </p>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-red rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent-blue rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="space-y-6" data-aos="fade-left">
                        <h3 className="text-2xl font-bold text-text-primary">
                            Building Digital Experiences That Matter
                        </h3>

                        <p className="text-text-secondary leading-relaxed">
                            I'm a Full Stack Developer with a passion for creating innovative digital solutions.
                            With {stats[0].value} years of experience in the industry, I've had the privilege of working
                            on diverse projects that have helped businesses transform their digital presence.
                        </p>

                        <p className="text-text-secondary leading-relaxed">
                            My expertise spans across the entire web development stack, from designing intuitive
                            user interfaces to building robust backend systems. I believe in writing clean,
                            maintainable code and staying updated with the latest technologies and best practices.
                        </p>

                        {/* Key highlights */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {[
                                'Problem Solver',
                                'Team Player',
                                'Detail Oriented',
                                'Self Motivated'
                            ].map((trait, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                                    <span className="text-text-primary">{trait}</span>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-4 bg-bg-card rounded-lg border border-accent-red/10"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <stat.icon className="w-6 h-6 mx-auto text-accent-red mb-2" />
                                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                                    <div className="text-xs text-text-secondary">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
