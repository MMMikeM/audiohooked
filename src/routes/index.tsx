import { createSignal } from "solid-js"

export default function Home() {
  const [disabled, setDisabled] = createSignal(false)

  return (
    <main min-h="screen">
      <column container p="t-12 x-4" m="x-auto">
        <h1 text="dark-900 2xl" font="semibold">
          Welcome back
        </h1>
        <row gap="12">
          <button btn="secondary" disabled={disabled()}>
            Hi
          </button>
          <button btn="tertiary">Hi</button>
          <button btn="primary-500" onClick={() => setDisabled(!disabled())}>
            {disabled() ? "Enable" : "Disable"}
          </button>
        </row>
      </column>
    </main>
  )
}
