import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp'; // Import the plugin as a module

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js 13+ (App Router)
    "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp], // Use the imported plugin here
};

export default config;
