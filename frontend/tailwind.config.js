/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'todo-bg': '#FFDBE9',
        'todo-card': '#FC8DB7',
        'todo-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}

