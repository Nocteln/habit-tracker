import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#EFFDF5",
          100: "#D9FBE8",
          200: "#B3F5D1",
          300: "#75EDAE",
          400: "#00DC82",
          500: "#00C16A",
          600: "#00A155",
          700: "#007F45",
          800: "#016538",
          900: "#0A5331",
          950: "#052e16",
        },
        "gold-drop": {
          "50": "#fffbec",
          "100": "#fff5d3",
          "200": "#ffe8a5",
          "300": "#ffd56d",
          "400": "#ffb732",
          "500": "#ff9f0a",
          "600": "#fb8500",
          "700": "#cc6302",
          "800": "#a14c0b",
          "900": "#82400c",
          "950": "#461e04",
        },
        elephant: {
          50: "#effaff",
          100: "#ddf5ff",
          200: "#b4edff",
          300: "#72e0ff",
          400: "#27d2ff",
          500: "#00bdfc",
          600: "#0098d9",
          700: "#0079af",
          800: "#006690",
          900: "#035477",
          950: "#023047",
        },
        "pacific-blue": {
          "50": "#eefbfd",
          "100": "#d5f3f8",
          "200": "#b0e7f1",
          "300": "#7ad5e6",
          "400": "#3cb9d4",
          "500": "#219ebc",
          "600": "#1e7e9c",
          "700": "#1f657f",
          "800": "#215569",
          "900": "#204659",
          "950": "#102e3c",
        },
      },
    },
  },
};
