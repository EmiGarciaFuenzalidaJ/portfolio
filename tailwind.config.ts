import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        heading: ['"Instrument Serif"', 'serif'],
        display: ['"Instrument Serif"', 'serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      /**
       * Type scale for the landing page.
       *
       * Every heading used to carry its own hand-tuned `clamp()` inline — twelve
       * of them, no two alike — which is why card titles across sections were
       * always close but never equal. These are the named steps; nothing on the
       * landing page should set a font size any other way.
       *
       * Tailwind's own steps (text-xs … text-3xl) are untouched and still cover
       * body copy and small UI text.
       */
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        lead: ['clamp(1rem, 1.8vw, 1.3rem)', { lineHeight: '1.55' }],
        h4: ['clamp(1.15rem, 2vw, 1.6rem)', { lineHeight: '1.25' }],
        metric: ['clamp(1.7rem, 3.2vw, 2.4rem)', { lineHeight: '1' }],
        h3: ['clamp(1.6rem, 3.2vw, 2.5rem)', { lineHeight: '1.1' }],
        h2: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.02' }],
        h1: ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.95' }],
        display: ['clamp(3rem, 12vw, 10rem)', { lineHeight: '0.9' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(27 40% 50% / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(27 40% 50% / 0.4)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "typing": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "magnetic-hover": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(var(--x), var(--y))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-left": "slide-left 0.6s ease-out forwards",
        "slide-right": "slide-right 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "typing": "typing 3s steps(40) forwards",
        "blink": "blink 1s step-end infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 25% 8%) 100%)',
        'card-gradient': 'linear-gradient(145deg, hsl(220 20% 8%) 0%, hsl(220 20% 5%) 100%)',
        'glow-gradient': 'radial-gradient(ellipse at center, hsl(27 40% 50% / 0.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
