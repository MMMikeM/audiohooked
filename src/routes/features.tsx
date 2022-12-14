import { useI18n } from "@solid-primitives/i18n"
import { For } from "solid-js"
import Data from "~/dict"
import "./index.css"

export default function Home() {
  const [t, { locale }] = useI18n()

  return (
    <main min-h="screen">
      <column container p="t-12 x-4" m="x-auto" bg="light-300" min-h="screen">
        <h1 text="dark-500 2xl" font="semibold">
          {t("title")}
        </h1>
        <row gap="2" p="2">
          <column class="w-1/2" text="xl dark-900" gap="1">
            <h2>{t("features")}</h2>
            <ul list="zero-decimal" text="lg dark-900" pl="8" gap="2" flex="~ col">
              <For each={Data.en.points}>{(p, i) => <Point point={p} index={i()} />}</For>
            </ul>
          </column>
        </row>
        <button onClick={() => locale(locale() === "en" ? "test" : "en")}>Test translation!</button>
      </column>
    </main>
  )
}

const Point = (props: { point: string[]; index: number }) => {
  const [t] = useI18n()

  if (props.point.length === 1) {
    return (
      <li>
        <h3>{t(`points.${props.index}.0`)}</h3>
      </li>
    )
  }

  return (
    <li>
      <h3>{t(`points.${props.index}.0`)}</h3>
      {props.point.slice(1).map((_, i) => (
        <h4 text="dark-900 [1rem]">{t(`points.${props.index}.${i + 1}`)}</h4>
      ))}
    </li>
  )
}
