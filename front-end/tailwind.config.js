/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iota: {
          primary: 'var(--iota-bg-primary)',
          secondary: 'var(--iota-bg-secondary)',
          button: 'var(--iota-bg-button)',
          buttonHover: 'var(--iota-bg-button-hover)',
          border: 'var(--iota-border)',
          separator: 'var(--iota-separator)',
          blue: 'var(--iota-blue-accent)',
          blueDeep: 'var(--iota-blue-deep)',
        },
        text: {
          primary: 'var(--iota-text-primary)',
          muted: 'var(--iota-text-muted)',
          danger: 'var(--iota-text-danger)',
          onButton: 'var(--iota-text-on-button)',
        },
        move: {
          gold: 'var(--move-gold)'
        },
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
