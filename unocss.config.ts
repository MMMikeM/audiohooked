import { defineConfig } from "unocss"
import presetUno from "unocss/preset-uno"
import { colors } from "unocss/preset-mini"
import presetAttributify from "@unocss/preset-attributify"
import presetIcons from "@unocss/preset-icons"
import transformerDirectives from "@unocss/transformer-directives"

export default defineConfig({
  theme: {
    colors: {
      primary: colors.cyan,
      secondary: colors.pink,
      tertiary: colors.orange,
    },
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
          50: "hsl(210,   99%,    98.0%)",
          100: "hsl(210,  55%,    97.0%)",
          200: "hsl(210,  45%,    96.0%)",
          300: "hsl(210,  35%,    94.0)",
          400: "hsl(210,  27%,    92.0%)",
          500: "hsl(210,  26%,    90.0%)",
          600: "hsl(210,  23%,    88.0%)",
          700: "hsl(210,  20%,    86.0%)",
          800: "hsl(210,  18%,    84.0%)",
          900: "hsl(210,  17%,    81.5%)",
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
    [/^btn-(\w*)(?:(?<!white|black|light|dark)-(\d)00)?$/, ([, c, n]) => `${handleColors(c, n)}`],
  ],
})

const handleColors = (c: string, shade: string) => {
  if (c === "white") {
    return `bg-light-200 hover:bg-white text-dark-900 shadow
    dark:bg-dark-900 dark:hover:bg-black dark:text-light-600`
  }
  if (c === "light") {
    return `bg-light-600 hover:bg-light-300 text-dark-600 shadow
    dark:bg-dark-700 dark:hover:bg-dark-800 dark:text-light-600`
  }
  if (c === "dark") {
    return `bg-dark-500 hover:bg-dark-900 text-light-50
    dark:bg-light-900 dark:hover:bg-light-500 dark:text-dark-500`
  }
  if (c === "black") {
    return `bg-dark-800 hover:bg-black text-light-900 hover:text-white shadow
    dark:bg-light-500 dark:hover:bg-white dark:text-dark-500`
  }

  const n = shade ? parseInt(shade, 10) : 5
  let h = n === 9 ? n - 1 : n + 1

  if (n < 5) {
    return `bg-${c}-${n}00 hover:bg-${c}-${h}00 text-${c}-900 shadow
    dark:bg-${c}-${n}00 dark:hover:bg-${c}-${h}00 dark:text-${c}-900`
  }

  return `bg-${c}-${n}00 hover:bg-${c}-${h}00 text-${c}-50
  dark:bg-${c}-${n}00 dark:hover:bg-${c}-${h}00 dark:text-${c}-100`
}
