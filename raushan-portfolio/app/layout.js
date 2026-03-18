import './globals.css'
import { Metadata } from 'next'

export const metadata = {
    title: 'Raushan Kumar | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies. Building innovative digital solutions.',
    keywords: ['Raushan Kumar', 'Full Stack Developer', 'React', 'Node.js', 'JavaScript', 'Web Developer', 'Portfolio'],
    author: 'Raushan Kumar',
    openGraph: {
        title: 'Raushan Kumar | Full Stack Developer',
        description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
        type: 'website',
        locale: 'en_US',
        url: 'https://raushan-portfolio.netlify.app',
        siteName: 'Raushan Kumar Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Raushan Kumar | Full Stack Developer',
        description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-poppins bg-primary text-text-primary">
                <div className="animated-bg"></div>
                {children}
            </body>
        </html>
    )
}
