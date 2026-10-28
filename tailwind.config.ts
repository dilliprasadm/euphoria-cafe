import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Euphoria Brand Colors
        brand: {
          burgundy: "#47051D",
          wine: "#641C32",
          cream: "#FFF5E9",
          pink: "#E9A0AD",
          caramel: "#C88752",
          chocolate: "#30201F",
        },
        // Stitch Waffleverse Theme Palette
        surface: "#17130c",
        "surface-dim": "#17130c",
        "surface-bright": "#3e3830",
        "surface-container-lowest": "#110e07",
        "surface-container-low": "#1f1b14",
        "surface-container": "#231f18",
        "surface-container-high": "#2e2922",
        "surface-container-highest": "#39342c",
        "on-surface": "#ebe1d5",
        "on-surface-variant": "#d9c1c4",
        "inverse-surface": "#ebe1d5",
        "inverse-on-surface": "#353028",
        outline: "#a18b8f",
        "outline-variant": "#534245",
        "surface-tint": "#ffb1c1",
        primary: {
          DEFAULT: "#ffb1c1",
          foreground: "#5c152c",
        },
        "on-primary": "#5c152c",
        "primary-container": "#641c32",
        "on-primary-container": "#e48399",
        "inverse-primary": "#964359",
        "primary-fixed": "#ffd9df",
        "primary-fixed-dim": "#ffb1c1",
        secondary: {
          DEFAULT: "#ffb77e",
          foreground: "#4e2600",
        },
        "on-secondary": "#4e2600",
        "secondary-container": "#6e3d0d",
        "on-secondary-container": "#f0a971",
        "secondary-fixed": "#ffdcc3",
        "secondary-fixed-dim": "#ffb77e",
        tertiary: {
          DEFAULT: "#feb2bf",
          foreground: "#51202c",
        },
        "on-tertiary": "#51202c",
        "tertiary-container": "#592632",
        "on-tertiary-container": "#d28c99",
        "tertiary-fixed": "#ffd9de",
        "tertiary-fixed-dim": "#feb2bf",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        headline: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        serif: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
        margin: "3rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.75rem",
        "space-xl": "3rem",
      },
      letterSpacing: {
        widest: "0.15em",
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
