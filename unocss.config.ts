import { defineConfig } from "unocss"
import presetUno from "unocss/preset-uno"
import presetAttributify from "@unocss/preset-attributify"
import presetIcons from "@unocss/preset-icons"
import transformerDirectives from "@unocss/transformer-directives"

export default defineConfig({
  theme: {
    extend: {
      colors: {
        dark: {
          50: "hsl(210,   5.0%,   39.0%)",
          100: "hsl(210,  6.5%,   33.5%)",
          200: "hsl(210,  7.0%,   29.6%)",
          300: "hsl(210,  8.5%,   27.6%)",
          400: "hsl(210,  9.0%,   23.3%)",
          500: "hsl(210,  10.0%,   22.2%)",
          600: "hsl(210,  12.5%,   21.4%)",
          700: "hsl(210,  15.0%,   20.6%)",
          800: "hsl(210,  17.5%,   19.4%)",
          900: "hsl(210,  22.5%,   15.9%)",
        },
        light: {
          50: "hsl(210,   99%,    99.0%)",
          100: "hsl(210,  55%,    97.5%)",
          200: "hsl(210,  45%,    96.2%)",
          300: "hsl(210,  35%,    94.5%)",
          400: "hsl(210,  27%,    92.0%)",
          500: "hsl(210,  26%,    90.7%)",
          600: "hsl(210,  23%,    88.4%)",
          700: "hsl(210,  20%,    86.2%)",
          800: "hsl(210,  18%,    84.0%)",
          900: "hsl(210,  17%,    81.9%)",
        },
      },
    },
  },
  //@ts-ignore
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  shortcuts: [
    {
      center: "items-center justify-center",
    },
    [
      /^btn-(.*)$/,
      ([, c]) =>
        `text-${c}-50 hover:bg-${c}-800 transition cursor-pointer bg-${c}-700 min-w-24 h-12 rounded-full flex justify-center items-center  text-white`,
    ],
  ],
})
