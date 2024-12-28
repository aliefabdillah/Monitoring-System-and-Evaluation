import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        outfit: "var(--font-outfit-sans)",
        poppins: "var(--font-poppins)",
        geistSans: "var(--font-geist-sans)",
        geistMono: "var(--font-geist-mono)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#006cff",

          secondary: "#a6c100",

          accent: "#00ca0e",

          neutral: "#130505",

          "base-100": "#f3feff",

          info: "#0094ef",

          success: "#009a59",

          warning: "#ff8900",

          error: "#ff576c",
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
