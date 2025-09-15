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
        'primary': ['Montserrat', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Clean Tech Colors - Verde Nexus
        'neon-green': "hsl(var(--neon-green))",
        'neon-green-light': "hsl(var(--neon-green-light))",
        'neon-green-dark': "hsl(var(--neon-green-dark))",
        'accent-cyan': "hsl(var(--accent-cyan))",
        'accent-purple': "hsl(var(--accent-purple))",
        'accent-blue': "hsl(var(--accent-blue))",
        'dark-bg': "hsl(var(--dark-bg))",
        'darker-bg': "hsl(var(--darker-bg))",
        'card-bg': "hsl(var(--card-bg))",
        'surface': "hsl(var(--surface))",
        'text-primary': "hsl(var(--text-primary))",
        'text-secondary': "hsl(var(--text-secondary))",
        'text-muted': "hsl(var(--text-muted))",
        
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
        // Clean Tech Animations
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px hsl(var(--neon-green) / 0.2)" },
          "50%": { boxShadow: "0 0 25px hsl(var(--neon-green) / 0.4)" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--neon-green) / 0.6)",
            textShadow: "0 0 10px hsl(var(--neon-green) / 0.8)"
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(var(--neon-green) / 0.8)",
            textShadow: "0 0 15px hsl(var(--neon-green) / 1)"
          },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "typing": {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "soft-pulse": "soft-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "typing": "typing 3s steps(20) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
