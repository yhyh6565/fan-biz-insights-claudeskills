import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 *
 * Editorial Magazine Design System
 * - Typography: Playfair Display (headings) + Manrope (body)
 * - Color System: Warm neutrals with vibrant category themes
 * - Animations: Smooth transitions and elegant effects
 */

export default {
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
      /* ========== Typography ========== */
      fontFamily: {
        // Default body font - Pretendard Variable for optimal Korean readability
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        // Display font for headings - same as body for consistency
        display: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },

      /* ========== Color System ========== */
      colors: {
        // Base semantic colors (defined in index.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary color palette
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

        // Component-specific colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Category theme colors - K-POP (Pink gradient)
        kpop: {
          50: "hsl(var(--kpop-50))",
          100: "hsl(var(--kpop-100))",
          200: "hsl(var(--kpop-200))",
          300: "hsl(var(--kpop-300))",
          500: "hsl(var(--kpop-500))",
          600: "hsl(var(--kpop-600))",
          700: "hsl(var(--kpop-700))",
          900: "hsl(var(--kpop-900))",
        },

        // Category theme colors - MCU (Electric blue)
        mcu: {
          50: "hsl(var(--mcu-50))",
          100: "hsl(var(--mcu-100))",
          200: "hsl(var(--mcu-200))",
          300: "hsl(var(--mcu-300))",
          500: "hsl(var(--mcu-500))",
          600: "hsl(var(--mcu-600))",
          700: "hsl(var(--mcu-700))",
          900: "hsl(var(--mcu-900))",
        },
      },

      /* ========== Border Radius ========== */
      borderRadius: {
        lg: "var(--radius)",          // 0.75rem
        md: "calc(var(--radius) - 2px)", // ~0.625rem
        sm: "calc(var(--radius) - 4px)", // ~0.5rem
      },

      /* ========== Animations ========== */
      keyframes: {
        // Accordion animations (shadcn/ui)
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
