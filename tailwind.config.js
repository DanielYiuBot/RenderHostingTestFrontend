/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp-green': '#25D366',
        'whatsapp-light': '#DCF8C6',
        'whatsapp-dark': '#128C7E',
        'whatsapp-bg': '#E5DDD5',
        'whatsapp-header': '#075E54',
        'whatsapp-message': '#E5DDD5',
      },
      boxShadow: {
        'message': '0 1px 0.5px rgba(0,0,0,0.13)',
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
      },
    },
  },
  plugins: [],
} 