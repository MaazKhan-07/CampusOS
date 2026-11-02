/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: ({ opacityValue }) =>
          opacityValue !== undefined
            ? `rgb(var(--bg-rgb) / ${opacityValue})`
            : 'var(--bg)',
        primary: {
          DEFAULT: ({ opacityValue }) =>
            opacityValue !== undefined
              ? `rgb(var(--primary-rgb) / ${opacityValue})`
              : 'var(--primary)',
          dark: '#01241C',
          light: '#0A4538',
        },
        accent: {
          DEFAULT: ({ opacityValue }) =>
            opacityValue !== undefined
              ? `rgb(var(--accent-rgb) / ${opacityValue})`
              : 'var(--accent)',
          hover: '#BA7A56',
          soft: 'var(--accent-soft)',
        },
        surface: {
          DEFAULT: ({ opacityValue }) =>
            opacityValue !== undefined
              ? `rgb(var(--surface-rgb) / ${opacityValue})`
              : 'var(--surface)',
          dark: 'var(--surface-dark)',
          muted: '#EAE3D9',
        },
        border: 'var(--border)',
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
        },
        onPrimary: ({ opacityValue }) =>
          opacityValue !== undefined
            ? `rgb(var(--on-primary-rgb) / ${opacityValue})`
            : 'var(--on-primary)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(1, 51, 40, 0.06), 0 1px 4px -1px rgba(1, 51, 40, 0.04)',
        'soft': '0 10px 30px -10px rgba(1, 51, 40, 0.08), 0 4px 12px -4px rgba(1, 51, 40, 0.04)',
        'soft-lg': '0 20px 40px -15px rgba(1, 51, 40, 0.12), 0 8px 16px -6px rgba(1, 51, 40, 0.06)',
        'copper': '0 8px 24px -6px rgba(204, 139, 101, 0.35)',
      },
    },
  },
  plugins: [],
}

