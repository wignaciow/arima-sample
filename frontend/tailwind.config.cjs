/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        app: {
          primary: 'var(--app-primary)',
          'primary-dark': 'var(--app-primary-dark)',
          bg: 'var(--app-bg)',
          surface: 'var(--app-surface)',
          text: 'var(--app-text)',
          muted: 'var(--app-text-muted)',
          border: 'var(--app-border)',
        },
      },
      borderRadius: {
        app: 'var(--app-radius-md)',
      },
      boxShadow: {
        app: 'var(--app-shadow-sm)',
      },
    },
  },
  plugins: [],
};