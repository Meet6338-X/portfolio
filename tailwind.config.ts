import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        volt:  '#CCFF00',
        dark:  '#0f0f0f',
        dark2: '#1a1a1a',
      },
      fontFamily: {
        display: ['Ranchers', 'cursive'],
        mono:    ['Space Mono', 'monospace'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
