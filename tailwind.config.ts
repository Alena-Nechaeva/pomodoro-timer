import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transp: 'transparent',
      white: '#ffffff',
      black: '#333333',
      green: '#A8B64F',
      darkGreen: '#7C853E',
      redDC: '#DC3E22',
      redB7: '#A12C17',
      redEA: '#EA8979',
      redEE: '#EE735D',
      greyC4: '#C4C4C4',
      greyF4: '#F4F4F4',
      grey99: '#999999',
      greyE4: '#E4E4E4',
      modalBg: 'rgba(51, 51, 51, 0.8)',
      darkBg: '#0d1f0b',
      focusDark: '#665542',
      pauseDark: '#4a2f5d',
      stopsDark: '#464666',
    },
    extend: {
      boxShadow: {
        shadowItem: 'rgba(196, 196, 196, 0.5) 0px 5px 15px',
      },
    },
    keyframes: {
      fade: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      fade: 'fade 0.3s ease-in-out forwards',
    },
  },
  plugins: [],
});
export default config;
