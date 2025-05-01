export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        dark: 'var(--color-dark)',
        gray: 'var(--color-gray)',
        'light-gray': 'var(--color-light-gray)',
        'lighter-gray': 'var(--color-lighter-gray)',
        'lightest-gray': 'var(--color-lightest-gray)',
        white: 'var(--color-white)',
      },
    },
  },
  plugins: [],
} 