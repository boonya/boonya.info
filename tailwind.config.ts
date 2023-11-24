import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Pangolin', 'sans-serif'],
      mono: ['Ubuntu Mono', 'monospace'],
    },
  },
};

export default config;
