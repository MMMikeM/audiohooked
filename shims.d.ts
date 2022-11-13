import type { AttributifyAttributes } from "@unocss/preset-attributify"

declare module "solid-js" {
  namespace JSX {
    interface CustomHTMLAttributes {
      center?: boolean
      btn?: string
    }
    interface HTMLAttributes<T>
      extends AttributifyAttributes,
        CustomHTMLAttributes {}
    interface IntrinsicElements {
      row: HTMLAttributes<HTMLDivElement>
      column: HTMLAttributes<HTMLDivElement>
    }
  }
}
