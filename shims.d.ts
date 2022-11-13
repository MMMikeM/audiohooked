import type { AttributifyAttributes } from "@unocss/preset-attributify"

type BtnGrays = ["white" | "light" | "dark" | "black"]
type BtnColors = ["primary", "secondary", "tertiary", "red"]
type ColorRange = [100, 200, 300, 400, 500, 600, 700, 800, 900]
export type Btns =
  | `${BtnColors[number]}-${ColorRange[number]}`
  | BtnGrays[number]
  | BtnColors[number]

declare module "solid-js" {
  namespace JSX {
    interface CustomHTMLAttributes {
      center?: boolean
    }
    interface CustomButtomAttrbutes {
      btn?: Btns
    }
    interface HTMLAttributes<T> extends AttributifyAttributes, CustomHTMLAttributes {}
    interface ButtonHTMLAttributes<T> extends CustomButtomAttrbutes {}
    interface IntrinsicElements {
      row: HTMLAttributes<HTMLDivElement>
      column: HTMLAttributes<HTMLDivElement>
    }
  }
}
