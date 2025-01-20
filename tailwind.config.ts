import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background-light)",
        foreground: "var(--foreground-light)",
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // For general text
        heading: ['Poppins', 'Arial', 'sans-serif'], // For headings
        mono: ['Courier New', 'monospace'], // Optional for code blocks
      },
      spacing: {
        18: "4.5rem", // Example of custom spacing
        72: "18rem", // Example of larger spacing
        96: "24rem", // Example for full-page components
      },
      maxWidth: {
        "7xl": "80rem", // Set container width
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
