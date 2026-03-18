import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSection: 'home',
    isMenuOpen: false,
    projects: [
        {
            id: 1,
            title: 'Food Recipe App',
            description: 'A web application for discovering and saving delicious recipes with search functionality.',
            tags: ['HTML', 'CSS', 'JavaScript', 'API'],
            status: 'completed',
            image: '🍳'
        },
        {
            id: 2,
            title: 'Country Explorer',
            description: 'An interactive application to explore countries, their details, and search by name.',
            tags: ['React', 'CSS', 'REST API'],
            status: 'completed',
            image: '🌍'
        },
        {
            id: 3,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            status: 'in_progress',
            image: '🛒'
        },
        {
            id: 4,
            title: 'Chat Application',
            description: 'Real-time chat application with websockets and group messaging.',
            tags: ['React', 'Socket.io', 'Express'],
            status: 'in_progress',
            image: '💬'
        },
        {
            id: 5,
            title: 'AI Content Generator',
            description: 'AI-powered content generation tool using OpenAI API.',
            tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
            status: 'planned',
            image: '🤖'
        },
        {
            id: 6,
            title: 'Blockchain Voting System',
            description: 'Decentralized voting application using Ethereum smart contracts.',
            tags: ['Solidity', 'React', 'Web3.js'],
            status: 'planned',
            image: '🗳️'
        }
    ],
    certificates: [
        {
            id: 1,
            title: 'Full Stack Web Development',
            issuer: 'Udemy',
            date: '2024',
            description: 'Complete full-stack development bootcamp covering React, Node.js, MongoDB.',
            image: '📜'
        },
        {
            id: 2,
            title: 'JavaScript Algorithms & Data Structures',
            issuer: 'freeCodeCamp',
            date: '2024',
            description: 'Mastered algorithms, data structures, and problem-solving techniques.',
            image: '📜'
        },
        {
            id: 3,
            title: 'React Advanced Patterns',
            issuer: 'Frontend Masters',
            date: '2024',
            description: 'Advanced React patterns including hooks, context, and performance optimization.',
            image: '📜'
        },
        {
            id: 4,
            title: 'Python for Data Science',
            issuer: 'Coursera',
            date: '2023',
            description: 'Data analysis, visualization, and machine learning fundamentals with Python.',
            image: '📜'
        },
        {
            id: 5,
            title: 'Cloud Computing Fundamentals',
            issuer: 'AWS',
            date: '2023',
            description: 'AWS cloud practitioner certification covering core AWS services.',
            image: '📜'
        },
        {
            id: 6,
            title: 'UI/UX Design Professional',
            issuer: 'Figma',
            date: '2024',
            description: 'Professional UI/UX design certification from Figma Academy.',
            image: '📜'
        }
    ],
    skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'MongoDB', level: 82 },
        { name: 'SQL', level: 78 },
        { name: 'Git', level: 88 },
        { name: 'Tailwind CSS', level: 92 }
    ]
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        }
    }
});

export const { setActiveSection, toggleMenu, closeMenu } = portfolioSlice.actions;
export default portfolioSlice.reducer;
