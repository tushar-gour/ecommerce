/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8586fa",
        "primary-hover": "#7374e8",
        "card-bg": "#f0eff7",
        "page-bg": "#f8f6fc",
        "feature-card": "#f2f0f6",
        "navbar-bg": "#f3f2f6",
        border: "#e6e4ea",
        icon: "#989abc",
        "shadow-start": "#dadceb",
        "shadow-end": "#ebebf4",
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 20px 0 rgba(218, 220, 235, 0.5)",
        card: "0 4px 30px 0 rgba(218, 220, 235, 0.4)",
        elevated: "0 8px 40px 0 rgba(218, 220, 235, 0.6)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
