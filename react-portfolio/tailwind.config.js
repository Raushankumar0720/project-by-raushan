/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0ea5e9',
                secondary: '#8b5cf6',
                dark: '#0f172a',
                darker: '#020617',
                glass: 'rgba(255, 255, 255, 0.1)',
                'glass-dark': 'rgba(15, 23, 42, 0.6)'
            },
            backdropBlur: {
                xs: '2px'
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            }
        },
    },
    plugins: [],
}
