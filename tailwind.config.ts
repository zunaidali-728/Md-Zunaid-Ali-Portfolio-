import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        gold: {
          DEFAULT: "var(--color-gold)",
          dim: "var(--color-gold-dim)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-muted)",
          hint: "var(--color-hint)",
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
