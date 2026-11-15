import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F4",
        terracotta: {
          DEFAULT: "#B9775B",
          dark: "#9A5F45",
          light: "#D2A088",
        },
        sage: {
          DEFAULT: "#879889",
          dark: "#6E7E70",
          light: "#A7B3A8",
        },
        ink: "#34312E",
        card: "#F0ECE5",
        champagne: "#C6A477",
        muted: "#827D75",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Source Han Sans SC",
          "Noto Sans CJK SC",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Songti SC",
          "SimSun",
          "Noto Serif CJK SC",
          "Georgia",
          "serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(52,49,46,0.06), 0 8px 24px rgba(52,49,46,0.06)",
        card: "0 1px 2px rgba(52,49,46,0.05), 0 4px 16px rgba(52,49,46,0.05)",
      },
      maxWidth: {
        prose: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
