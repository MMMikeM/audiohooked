import solid from "solid-start/vite"
import { defineConfig } from "vite"
import presetUno from "unocss/preset-uno"
import UnoCSS from "unocss/vite"
import presetAttributify from "@unocss/preset-attributify"
import presetIcons from "@unocss/preset-icons"
import transformerDirectives from "@unocss/transformer-directives"

export default defineConfig({
  plugins: [
    solid(),
    UnoCSS({
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
    }),
  ],
})
