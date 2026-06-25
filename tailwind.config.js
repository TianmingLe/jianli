/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: {
          950: "#060607",
          900: "#0A0A0B",
          850: "#0D0E10",
          800: "#111214",
          700: "#1A1B1E",
          600: "#26282C",
          500: "#3A3D42",
        },
        mist: {
          50: "#F5F5F7",
          100: "#E5E7EB",
          300: "#A1A1AA",
          500: "#71717A",
          700: "#52525B",
        },
        volt: {
          400: "#7DD3FC",
          500: "#38BDF8",
          600: "#0EA5E9",
        },
        amber: {
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
        },
      },
      fontFamily: {
        display: ['"Syne"', '"Noto Sans SC"', "sans-serif"],
        sans: ['"Manrope"', '"Noto Sans SC"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        widest: "0.3em",
      },
      maxWidth: {
        shell: "1700px",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slow-pan": "slowPan 30s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowPan: {
          "0%": { transform: "scale(1.05) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
