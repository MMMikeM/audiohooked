import type { AttributifyAttributes } from "@unocss/preset-attributify"

declare module "solid-js" {
  namespace JSX {
    interface CustomHTMLAttributes {
      center?: boolean
    }
    interface CustomButtomAttrbutes {
      btn?: string
    }
    interface HTMLAttributes<T> extends AttributifyAttributes, CustomHTMLAttributes {}
    interface ButtonHTMLAttributes<T> extends CustomButtomAttrbutes {}
    interface IntrinsicElements {
      row: HTMLAttributes<HTMLDivElement>
      column: HTMLAttributes<HTMLDivElement>
    }
  }
}
