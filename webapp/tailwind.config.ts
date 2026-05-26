import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        gold: "var(--gold)",
        "gold-lt": "var(--gold-lt)",
        "gold-pale": "var(--gold-pale)",
        ivory: "var(--ivory)",
        cream: "var(--cream)",
        charcoal: "var(--charcoal)",
        dark: "var(--dark)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
};

export default config;
