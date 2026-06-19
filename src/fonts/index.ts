import localFont from "next/font/local";

export const montserrat = localFont({
  src: [
    {
      path: "./montserrat/Montserrat-VariableFont.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./montserrat/Montserrat-Italic-VariableFont.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
