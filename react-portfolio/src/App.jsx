import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './zustand/useStore';
import { setActiveSection, toggleMenu, closeMenu } from './store/portfolioSlice';

// Icons
import {
    FaGithub, FaLinkedin, FaTwitter, FaCode, FaLaptopCode,
    FaHome, FaUser, FaTools, FaProjectDiagram, FaCertificate, FaEnvelope,
    FaBars, FaTimes, FaExternalLinkAlt, FaHeart
} from 'react-icons/fa';

// Components
const Navbar = () => {
    const dispatch = useDispatch();
    const { activeSection, isMenuOpen } = useSelector((state) => state.portfolio);
    const { scrollY } = useStore();

    const navItems = [
        { id: 'home', label: 'Home', icon: FaHome },
        { id: 'about', label: 'About', icon: FaUser },
        { id: 'skills', label: 'Skills', icon: FaTools },
        { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
        { id: 'certificates', label: 'Certificates', icon: FaCertificate },
        { id: 'contact', label: 'Contact', icon: FaEnvelope }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'glass py-3' : 'py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold gradient-text font-[Playfair Display]"
                >
                    RK.
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.id}
                            href={`#${item.id}`}
                            whileHover={{ y: -2 }}
                            onClick={() => dispatch(setActiveSection(item.id))}
                            className={`text-sm font-medium transition-colors ${activeSection === item.id
                                ? 'text-cyan-400'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => dispatch(toggleMenu())}
                    className="md:hidden text-white text-xl"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            className="fixed top-0 right-0 h-screen w-64 glass-dark flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            <button
                                onClick={() => dispatch(closeMenu())}
                                className="absolute top-6 right-6 text-2xl"
                            >
                                <FaTimes />
                            </button>
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => dispatch(closeMenu())}
                                    className="text-xl font-medium text-gray-300 hover:text-white"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

const Hero = () => {
    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/Raushankumar0720', label: 'GitHub' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/raushan-singh-9070b4373/', label: 'LinkedIn' },
        { icon: FaCode, url: 'https://leetcode.com/u/raushankumar150720/', label: 'LeetCode' },
        { icon: FaLaptopCode, url: 'https://www.sololearn.com/en/profile/34907165', label: 'SoloLearn' },
        { icon: FaTwitter, url: 'https://x.com/RaushanKum68222', label: 'Twitter' }
    ];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-grid">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-cyan-400 text-lg mb-4"
                    >
                        Hello, I'm
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        <span className="gradient-text font-[Playfair Display]">Raushan Kumar</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-400 mb-8"
                    >
                        Full Stack Developer & Problem Solver
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 mb-8 max-w-lg"
                    >
                        Building digital experiences with clean code and creative solutions.
                        Passionate about turning ideas into reality through technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex gap-4 mb-8"
                    >
                        <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                            Get In Touch
                        </a>
                        <a href="#projects" className="px-8 py-3 glass rounded-full font-medium hover:bg-white/10 transition-all">
                            View Work
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex gap-4"
                    >
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <link.icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
                    >
                        {/* Decorative rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-pulse-slow" />
                        <div className="absolute inset-4 rounded-full border-2 border-purple-500/30" />
                        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 glass" />

                        {/* Profile Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass gradient-border">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                                    alt="Raushan Kumar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating badges */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        className="absolute top-10 right-0 glass px-4 py-2 rounded-full text-sm"
                    >
                        <span className="text-cyan-400">🚀</span> 2+ Years Exp
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                        className="absolute bottom-10 left-0 glass px-4 py-2 rounded-full text-sm"
                    >
                        <span className="text-purple-400">💻</span> 20+ Projects
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1 h-2 bg-cyan-400 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text font-[Playfair Display]">About Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <div className="w-full h-80 glass rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                                    alt="About"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="absolute -bottom-6 -right-6 glass-dark px-6 py-4 rounded-2xl"
                            >
                                <p className="text-3xl font-bold gradient-text">2+</p>
                                <p className="text-gray-400 text-sm">Years Experience</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-4">I'm Raushan Kumar</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            A passionate Full Stack Developer with expertise in building modern,
                            responsive, and user-friendly web applications. I love solving complex
                            problems and turning ideas into reality through code.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            With a strong foundation in both front-end and back-end technologies,
                            I strive to create seamless digital experiences that make a difference.
                            My journey in tech is driven by continuous learning and innovation.
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { number: '20+', label: 'Projects' },
                                { number: '10+', label: 'Clients' },
                                { number: '5+', label: 'Awards' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="glass p-4 rounded-2xl text-center"
                                >
                                    <p className="text-2xl font-bold gradient-text">{stat.number}</p>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Skills = () => {
    const skills = useSelector((state) => state.portfolio.skills);

    return (
        <section id="skills" className="min-h-screen py-20 bg-darker">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text font-[Playfair Display]">Skills</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Technologies and tools I work with to bring ideas to life
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <div className="flex justify-between mb-3">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-cyan-400">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-xl font-medium mb-8">Tech Stack</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Git', 'TypeScript'].map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                                className="px-4 py-2 glass rounded-full text-sm cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Projects = () => {
    const { projects } = useSelector((state) => state.portfolio);
    const { activeTab, setActiveTab } = useStore();

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => p.status === activeTab);

    const tabs = [
        { id: 'all', label: 'All Projects' },
        { id: 'completed', label: 'Completed' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'planned', label: 'Planned' }
    ];

    const statusColors = {
        completed: 'bg-green-500/20 text-green-400',
        in_progress: 'bg-yellow-500/20 text-yellow-400',
        planned: 'bg-gray-500/20 text-gray-400'
    };

    return (
        <section id="projects" className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text font-[Playfair Display]">Projects</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                : 'glass text-gray-300 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                className="glass rounded-2xl overflow-hidden group"
                            >
                                <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-6xl">
                                    {project.image}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                                            {project.status === 'in_progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                            <FaGithub /> Code
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                            <FaExternalLinkAlt /> Live
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

const Certificates = () => {
    const { certificates } = useSelector((state) => state.portfolio);

    return (
        <section id="certificates" className="min-h-screen py-20 bg-darker">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text font-[Playfair Display]">Certificates</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-4">Professional certifications and achievements</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass rounded-2xl p-6 group cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">{cert.image}</div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-cyan-400 text-sm">{cert.issuer}</p>
                                    <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-4">{cert.description}</p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                className="h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mt-4 origin-left rounded-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/Raushankumar0720', label: 'GitHub', color: 'hover:text-white' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/raushan-singh-9070b4373/', label: 'LinkedIn', color: 'hover:text-blue-400' },
        { icon: FaCode, url: 'https://leetcode.com/u/raushankumar150720/', label: 'LeetCode', color: 'hover:text-yellow-400' },
        { icon: FaLaptopCode, url: 'https://www.sololearn.com/en/profile/34907165', label: 'SoloLearn', color: 'hover:text-orange-400' },
        { icon: FaTwitter, url: 'https://x.com/RaushanKum68222', label: 'Twitter', color: 'hover:text-cyan-400' }
    ];

    return (
        <section id="contact" className="min-h-screen py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark to-darker" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text font-[Playfair Display]">Get In Touch</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contact Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="w-full h-[500px] glass rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop"
                                    alt="Contact"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Overlay card */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="absolute -bottom-6 -left-6 glass-dark p-6 rounded-2xl"
                            >
                                <p className="text-3xl font-bold gradient-text">Let's Talk</p>
                                <p className="text-gray-400 text-sm mt-1">I'm always open to discussing new projects</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                            <form className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        rows="4"
                                        placeholder="Your Message"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-white placeholder-gray-500 resize-none"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                                >
                                    Send Message
                                </motion.button>
                            </form>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-gray-700">
                                <p className="text-gray-400 text-center mb-6">Or connect with me on</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 ${link.color} transition-all`}
                                        >
                                            <link.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-8 glass-dark">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-400">
                    © 2024 Raushan Kumar. All Rights Reserved.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    Designed & Built with <FaHeart className="inline text-red-500 mx-1" /> by Raushan Kumar
                </p>
            </div>
        </footer>
    );
};

const App = () => {
    const setScrollY = useStore((state) => state.setScrollY);
    const setLoading = useStore((state) => state.setLoading);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        // Simulate loading
        setTimeout(() => setLoading(false), 1500);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [setScrollY, setLoading]);

    return (
        <div className="bg-dark min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
        </div>
    );
};

export default App;
