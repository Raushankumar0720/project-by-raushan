/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#020b28',
                'secondary': '#16213e',
                'accent-red': '#e94560',
                'accent-blue': '#0f3460',
                'text-primary': '#eaeaea',
                'text-secondary': '#a0a0a0',
                'bg-dark': '#0a0f1c',
                'bg-card': '#1a1f3a',
            },
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
                'fira': ['Fira Code', 'monospace'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #e94560, 0 0 10px #e94560' },
                    '100%': { boxShadow: '0 0 10px #e94560, 0 0 20px #e94560' },
                },
            },
        },
    },
    plugins: [],
}
