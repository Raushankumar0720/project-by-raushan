'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaCode } from 'react-icons/fa';
import personalData from '../utils/data/personal-data';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaGithub, href: personalData.socialLinks.github, name: 'GitHub' },
        { icon: FaLinkedin, href: personalData.socialLinks.linkedin, name: 'LinkedIn' },
        { icon: FaTwitter, href: personalData.socialLinks.twitter, name: 'Twitter' },
        { icon: FaInstagram, href: personalData.socialLinks.instagram, name: 'Instagram' },
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-secondary/50 border-t border-accent-red/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="font-fira text-accent-red"><RK /></span>
                            <span className="text-text-primary ml-2">{personalData.name}</span>
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                            Full Stack Developer passionate about building innovative digital solutions and great user experiences.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-bg-card rounded-lg flex items-center justify-center text-text-secondary hover:bg-accent-red hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-text-secondary hover:text-accent-red transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-text-primary mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li>{personalData.email}</li>
                            <li>{personalData.phone}</li>
                            <li>{personalData.location}</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-accent-red/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-text-secondary text-sm">
                            © {currentYear} {personalData.name}. All rights reserved.
                        </p>
                        <p className="text-text-secondary text-sm flex items-center gap-2">
                            Built with <FaHeart className="text-accent-red" size={12} /> and <FaCode className="text-accent-red" size={14} />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
