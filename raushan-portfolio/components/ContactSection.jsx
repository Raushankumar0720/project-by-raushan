'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import personalData from '../utils/data/personal-data';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error('Failed to send message. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: personalData.email,
            href: `mailto:${personalData.email}`
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: personalData.phone,
            href: `tel:${personalData.phone}`
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: personalData.location,
            href: '#'
        }
    ];

    return (
        <section id="contact" className="bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="section-title" data-aos="fade-up">
                        Get In <span className="text-accent-red">Touch</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div data-aos="fade-right">
                        <h3 className="text-2xl font-bold text-text-primary mb-6">
                            Let's <span className="text-accent-red">Connect</span>
                        </h3>

                        <p className="text-text-secondary mb-8">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to contact me using any of the methods below.
                        </p>

                        {/* Contact Methods */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="flex items-center gap-4 p-4 bg-bg-card rounded-lg border border-accent-red/10 hover:border-accent-red/30 transition-all duration-300"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center">
                                        <info.icon className="w-5 h-5 text-accent-red" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-secondary">{info.label}</p>
                                        <p className="text-text-primary font-medium">{info.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="text-text-secondary mb-4">Follow me on:</p>
                            <div className="flex gap-4">
                                {Object.entries(personalData.socialLinks).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-bg-card rounded-lg flex items-center justify-center text-text-secondary hover:bg-accent-red hover:text-white transition-all duration-300 border border-accent-red/10"
                                    >
                                        <span className="capitalize text-sm">{platform[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div
                        className="bg-bg-card p-8 rounded-xl border border-accent-red/10"
                        data-aos="fade-left"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm text-text-secondary mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                    required
                                    className="w-full resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </section>
    );
};

export default ContactSection;
