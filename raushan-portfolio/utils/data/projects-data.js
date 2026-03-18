export const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with cart functionality, payment integration, and admin dashboard.',
        longDescription: `Built a comprehensive e-commerce solution featuring:
    • User authentication and authorization
    • Product catalog with search and filters
    • Shopping cart and checkout process
    • Payment gateway integration (Stripe)
    • Admin dashboard for inventory management
    • Order tracking system`,
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        github: 'https://github.com/raushan/ecommerce-platform',
        live: 'https://ecommerce-demo.netlify.app',
        image: '/projects/ecommerce.png',
        featured: true,
    },
    {
        id: 2,
        title: 'Social Media App',
        description: 'A social media application with real-time messaging, post creation, and user interactions.',
        longDescription: `Developed a full-stack social media platform with:
    • User profiles and authentication
    • Post creation with image uploads
    • Like, comment, and share features
    • Real-time chat functionality
    • Follow/unfollow system
    • News feed algorithm`,
        technologies: ['Next.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind'],
        github: 'https://github.com/raushan/social-media-app',
        live: 'https://social-demo.netlify.app',
        image: '/projects/social.png',
        featured: true,
    },
    {
        id: 3,
        title: 'Task Management App',
        description: 'A productivity application for task management with drag-and-drop functionality.',
        longDescription: `Created a collaborative task management tool featuring:
    • Kanban board with drag-and-drop
    • Team collaboration features
    • Due dates and reminders
    • File attachments
    • Progress tracking
    • Real-time updates`,
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        github: 'https://github.com/raushan/task-manager',
        live: 'https://task-manager-demo.netlify.app',
        image: '/projects/taskmanager.png',
        featured: true,
    },
    {
        id: 4,
        title: 'Weather Dashboard',
        description: 'A weather application with forecasts, maps, and historical data visualization.',
        longDescription: `Built an interactive weather application with:
    • Current weather conditions
    • 7-day forecast
    • Weather maps integration
    • Search by city or location
    • Saved locations
    • Weather alerts`,
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind'],
        github: 'https://github.com/raushan/weather-app',
        live: 'https://weather-demo.netlify.app',
        image: '/projects/weather.png',
        featured: false,
    },
    {
        id: 5,
        title: 'Portfolio Website',
        description: 'A modern portfolio website with animations and contact form.',
        longDescription: `Designed and developed a personal portfolio featuring:
    • Responsive design
    • Smooth animations
    • Contact form with email integration
    • Project showcase
    • Skills visualization
    • Blog section`,
        technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
        github: 'https://github.com/raushan/portfolio',
        live: 'https://raushan-portfolio.netlify.app',
        image: '/projects/portfolio.png',
        featured: false,
    },
    {
        id: 6,
        title: 'Chat Application',
        description: 'A real-time chat application with rooms and file sharing.',
        longDescription: `Built a feature-rich chat application with:
    • Real-time messaging
    • Chat rooms
    • File and image sharing
    • User presence indicators
    • Message history
    • Emoji support`,
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        github: 'https://github.com/raushan/chat-app',
        live: 'https://chat-demo.netlify.app',
        image: '/projects/chat.png',
        featured: false,
    },
];

export default projects;
