import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1024px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top, 0)",
        "safe-bottom": "env(safe-area-inset-bottom, 0)",
      },
      colors: {
        rhc: {
          primary: "#f6520a",
          "primary-dark": "#192640",
          accent: "#ffb606",
          secondary: "#442e66",
          muted: "#64748b",
          "dark-ui": "#32373c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
