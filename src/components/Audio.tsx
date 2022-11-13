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
    <row center w="full" h="screen" overflow="hidden" bg="gray-900">
      <column p="4" gap="4" items="center" w="1/2" bg="gray-200" rounded="lg">
        <button
          btn="gray"
          min-w="12"
          disabled={audio.state == AudioState.ERROR}
          onClick={() => setPlaying(!playing())}
        >
          <div
            h="12"
            w="12"
            class={playing() ? "i-carbon-pause-outline" : "i-carbon-play-outline"}
          />
        </button>
        <row center gap="4" class="w-full shadow-lg bg-white rounded-full p-2">
          <input
            onInput={({ currentTarget: { value } }) => controls.seek(parseInt(value, 10))}
            type="range"
            min="0"
            step="0.01"
            max={audio.duration}
            value={audio.currentTime}
            bg="gray-200 hover:gray-300"
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
            btn="gray"
            min-w="16"
            disabled={audio.state == AudioState.ERROR}
            onClick={() => skip(-15)}
          >
            {"-15s"}
          </button>
          <button
            btn="gray"
            disabled={audio.state == AudioState.ERROR}
            onClick={() => toggleSpeed()}
          >
            {speeds[speed()] + "x"}
          </button>
          <button
            btn="gray"
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
