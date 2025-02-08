import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        custom: {
          gold: {
            100: "#fbe9d5",
            200: "#f5d0a3",
            300: "#efb770",
            400: "#ea9e3e",
            500: "#d79127",
            600: "#b3751f",
            700: "#8f5a17",
            800: "#6a3f10",
            900: "#462708",
          },
          ivory: {
            100: "#fef8f1",
            200: "#fdeedc",
            300: "#fce3c7",
            400: "#fad9b2",
            500: "#f0d5ac",
            600: "#d4b69a",
            700: "#b79888",
            800: "#9b7a76",
            900: "#7e5c64",
          },
          brown: {
            100: "#e8d7c2",
            200: "#d1af85",
            300: "#ba8758",
            400: "#a35f2b",
            500: "#704b14",
            600: "#5c3b10",
            700: "#482b0c",
            800: "#341b08",
            900: "#200b04",
          },
          teal: {
            100: "#d4f5f3",
            200: "#a9ebe7",
            300: "#7fe1db",
            400: "#54d7cf",
            500: "#58a5a2",
            600: "#468583",
            700: "#346563",
            800: "#224443",
            900: "#102222",
          },
          terracotta: {
            100: "#f7e7e3",
            200: "#efcfc7",
            300: "#e7b7ab",
            400: "#df9f8f",
            500: "#ccb2aa",
            600: "#b19894",
            700: "#967e7e",
            800: "#7b6468",
            900: "#604a52",
          },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
