import { AudioState, createAudio } from "@solid-primitives/audio"
import { createSignal } from "solid-js"

export default function Counter() {
  const [playing, setPlaying] = createSignal(false)
  const [volume, setVolume] = createSignal(1)
  const [speed, setSpeed] = createSignal(0)
  const [audio, controls] = createAudio("sample1.mp3", playing, volume)

  const speeds = [1, 1.2, 1.4, 1.6, 1.8, 2]

  const toggleSpeed = () => {
    if (speeds.length === speed() + 1) {
      setSpeed(0)
    } else {
      setSpeed(speed() + 1)
    }
    audio.player.playbackRate = speeds[speed()]
  }

  const skip = (seconds: number) => {
    audio.player.currentTime += seconds
  }

  return (
    <row center w="full" h="screen" overflow="hidden">
      <column p="4" gap="4" items="center" bg="light-400 dark:dark-200" rounded="lg">
        <row gap="4" rounded="lg">
          <button btn="primary-100">primary-100</button>
          <button btn="primary-200">primary-200</button>
          <button btn="primary-300">primary-300</button>
          <button btn="primary-400">primary-400</button>
          <button btn="primary-500">primary-500</button>
          <button btn="primary-600">primary-600</button>
          <button btn="primary-700">primary-700</button>
          <button btn="primary-800">primary-800</button>
          <button btn="primary-900">primary-900</button>
        </row>
        <row gap="4" rounded="lg">
          <button btn="white">white</button>
          <button btn="light">light</button>
          <button btn="dark">dark</button>
          <button btn="black">black</button>
          <button btn="primary">primary</button>
          <button btn="red">error</button>
          <button disabled>disabled</button>
        </row>
        <button
          btn="light"
          min-w="10"
          p="0"
          rounded="full"
          disabled={audio.state == AudioState.ERROR}
          onClick={() => setPlaying(!playing())}
        >
          <div
            h="10"
            w="10"
            color="dark-50 dark:light-900 hover:white"
            class={playing() ? "i-carbon-pause-outline" : "i-carbon-play-outline"}
          />
        </button>
        <row center gap="4" class="w-full shadow-lg bg-dark-500 rounded-full p-2">
          <input
            onInput={({ currentTarget: { value } }) => controls.seek(parseInt(value, 10))}
            type="range"
            min="0"
            step="0.01"
            max={audio.duration}
            value={audio.currentTime}
            bg="dark-200 hover:dark-300"
            class="form-range cursor-pointer transition w-full rounded-full appearance-none"
            focus="outline-none ring-0"
          />
          <row class="px-2">
            <input
              onInput={(e) => setVolume(parseInt(e.currentTarget.value, 10))}
              type="range"
              min="0"
              step="0.1"
              max={1}
              value={volume()}
              class="cursor-pointer w-16"
            />
          </row>
        </row>
        <row gap="4">
          <button
            btn="white"
            min-w="16"
            disabled={audio.state == AudioState.ERROR}
            onClick={() => skip(-15)}
          >
            {"-15s"}
          </button>
          <button
            btn="primary"
            disabled={audio.state == AudioState.ERROR}
            onClick={() => toggleSpeed()}
          >
            {speeds[speed()] + "x"}
          </button>
          <button
            btn="primary"
            min-w="16"
            disabled={audio.state == AudioState.ERROR}
            onClick={() => skip(15)}
          >
            {"+15s"}
          </button>
        </row>
      </column>
    </row>
  )
}
