import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        terminal: {
          canvas: "var(--ds-color-canvas)",
          panel: "var(--ds-color-panel)",
          raised: "var(--ds-color-panel-raised)",
          strong: "var(--ds-color-panel-strong)"
        },
        paper: {
          DEFAULT: "var(--ds-color-text)",
          muted: "var(--ds-color-text-muted)",
          dim: "var(--ds-color-text-dim)"
        },
        signal: {
          stable: "var(--ds-color-stable)",
          info: "var(--ds-color-info)",
          watch: "var(--ds-color-watch)",
          danger: "var(--ds-color-danger)",
          record: "var(--ds-color-record)"
        },
        fault: {
          cyan: "var(--ds-color-fault-cyan)",
          magenta: "var(--ds-color-fault-magenta)"
        }
      },
      spacing: {
        "ds-1": "var(--ds-space-1)",
        "ds-2": "var(--ds-space-2)",
        "ds-3": "var(--ds-space-3)",
        "ds-4": "var(--ds-space-4)",
        "ds-6": "var(--ds-space-6)",
        "ds-8": "var(--ds-space-8)",
        "ds-12": "var(--ds-space-12)"
      },
      borderRadius: {
        lg: "var(--ds-radius-md)",
        md: "var(--ds-radius-sm)",
        sm: "var(--ds-radius-sm)",
        none: "var(--ds-radius-none)"
      },
      boxShadow: { panel: "var(--ds-shadow-panel)", dialog: "var(--ds-shadow-dialog)" },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-interface)"],
        mono: ["var(--font-data)"]
      },
      fontSize: {
        "ds-xs": "var(--ds-text-xs)",
        "ds-sm": "var(--ds-text-sm)",
        "ds-md": "var(--ds-text-md)",
        "ds-lg": "var(--ds-text-lg)",
        "ds-xl": "var(--ds-text-xl)",
        "ds-2xl": "var(--ds-text-2xl)",
        "ds-display": "var(--ds-text-display)"
      },
      transitionDuration: {
        fast: "var(--ds-duration-fast)",
        normal: "var(--ds-duration-normal)",
        slow: "var(--ds-duration-slow)"
      },
      zIndex: {
        sticky: "var(--ds-z-sticky)",
        overlay: "var(--ds-z-overlay)",
        modal: "var(--ds-z-modal)",
        critical: "var(--ds-z-critical)"
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scan: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(100vh)" } }
      },
      animation: { rise: "rise .7s ease-out both", scan: "scan 8s linear infinite" }
    }
  },
  plugins: []
} satisfies Config;
