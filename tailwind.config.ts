import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        small: "0 4px 4px rgba(0, 0, 0, 0.06)",
      },
      colors: {
        grey: "#E4E4E4",
        green: "#0BB489",
        "dark-grey": "#5A5A5A",
        "dark-blue": "#050B20",
        "dark-green": "#328965",
        "light-green": "#58E1A5",
      },
    },
  },
  plugins: [],
};
export default config;
