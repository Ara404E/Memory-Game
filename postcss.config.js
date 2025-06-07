import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: [
    tailwind({ config: './tailwind.config.js' }),
    autoprefixer,
  ],
};