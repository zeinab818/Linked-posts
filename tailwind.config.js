import { heroui } from "@heroui/theme";

export default {
  darkMode: "class", // مهم جدًا
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [heroui()],
};
