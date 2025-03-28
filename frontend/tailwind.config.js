/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'secondary': 'var(--color-secondary)',
        'success': 'var(--color-success)',
        'danger': 'var(--color-danger)',
        'warning': 'var(--color-warning)',
        'info': 'var(--color-info)',
        'light': 'var(--color-light)',
        'dark': 'var(--color-dark)',
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
      },
      fontSize: {
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
      },
      borderRadius: {
        'DEFAULT': 'var(--border-radius)',
        'sm': 'var(--border-radius-sm)',
        'lg': 'var(--border-radius-lg)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'lg': 'var(--shadow-lg)',
      },
      fontFamily: {
        'sans': ['var(--font-family-base)'],
      },
    },
  },
  plugins: [],
} 