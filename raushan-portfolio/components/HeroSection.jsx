'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Typed from 'typed.js';
import Link from 'next/link';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import personalData from '../utils/data/personal-data';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const HeroSection = () => {
    const typedRef = useRef(null);
    const codeLines = [
        { type: 'keyword', text: 'const ' },
        { type: 'property', text: 'developer ' },
        { type: 'keyword', text: '= ' },
        { type: 'keyword', text: '{' },
        { type: 'property', text: '\n  name: ' },
        { type: 'string', text: '"Raushan Kumar"' },
        { type: 'keyword', text: ',' },
        { type: 'property', text: '\n  role: ' },
        { type: 'string', text: '"Full Stack Developer"' },
        { type: 'keyword', text: ',' },
        { type: 'property', text: '\n  skills: ' },
        { type: 'string', text: '["React", "Node.js", "MongoDB"]' },
        { type: 'keyword', text: ',' },
        { type: 'property', text: '\n  passion: ' },
        { type: 'string', text: '"Building great experiences"' },
        { type: 'keyword', text: ',' },
        { type: 'property', text: '\n  availableForWork: ' },
        { type: 'string', text: 'true' },
        { type: 'keyword', text: '\n};' },
    ];

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: personalData.typedStrings,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6" data-aos="fade-right">
                        <div className="inline-block">
                            <span className="text-accent-red font-fira text-sm">
                // Hello, World! I'm
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            <span className="text-text-primary">{personalData.name}</span>
                        </h1>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            <span ref={typedRef} className="text-accent-red"></span>
                        </h2>

                        <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
                            {personalData.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="#projects" className="btn-primary">
                                View My Work
                            </Link>
                            <Link href="#contact" className="btn-outline">
                                Contact Me
                            </Link>
                            <a href={personalData.resumeUrl} className="btn-outline flex items-center gap-2" download>
                                <FaDownload /> Resume
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-6">
                            <span className="text-text-secondary text-sm">Connect with me:</span>
                            <div className="flex gap-3">
                                {Object.entries(personalData.socialLinks).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-text-secondary hover:bg-accent-red hover:text-white transition-all duration-300"
                                    >
                                        <span className="capitalize text-sm">{platform[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Code Block with Lottie */}
                    <div className="relative" data-aos="fade-left">
                        {/* Code Block */}
                        <div className="code-block font-fira text-sm sm:text-base">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-text-secondary text-xs ml-2">developer.js</span>
                            </div>

                            <pre className="overflow-x-auto">
                                <code>
                                    {codeLines.map((line, index) => (
                                        <span key={index} className={`code-${line.type}`}>
                                            {line.text}
                                        </span>
                                    ))}
                                </code>
                            </pre>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-red/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-blue/20 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <Link href="#about" className="text-accent-red">
                        <FaArrowDown size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
