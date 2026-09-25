/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg:           "#0a0a0f",
          surface:      "#111118",
          card:         "#16161f",
          border:       "#1e1e2a",
          gold:         "#d4a017",
          "gold-light": "#f0c040",
          "gold-dark":  "#9b7510",
          amber:        "#ffb347",
          muted:        "#6b6b80",
          subtle:       "#9090a8",
          text:         "#c8c8d8",
          heading:      "#f0f0f8",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "gold-glow":   "0 0 20px rgba(212, 160, 23, 0.35)",
        "gold-strong": "0 0 40px rgba(212, 160, 23, 0.6)",
        "glass":       "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass-lg":    "0 16px 64px rgba(0, 0, 0, 0.6)",
        "inner-gold":  "inset 0 1px 0 rgba(212, 160, 23, 0.2)",
      },
      animation: {
        "shimmer":       "shimmer 2.5s linear infinite",
        "float":         "float 6s ease-in-out infinite",
        "pulse-gold":    "pulse-gold 3s ease-in-out infinite",
        "fade-up":       "fade-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,160,23,0.35)" },
          "50%":      { boxShadow: "0 0 40px rgba(212,160,23,0.65)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}
