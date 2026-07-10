import { ref, computed, onUnmounted } from 'vue'
import { MODE_DURATIONS, type Mode } from '@/constants/modes'
import { formatSeconds } from '@/services/timeFormat'
import { playFinishSound } from '@/services/audio'

export const useCountdownTimer = (initialMode: Mode = 'pomodoro') => {
  const currentMode = ref<Mode>(initialMode)
  const totalSeconds = ref(MODE_DURATIONS[currentMode.value])
  const intervalId = ref<number | undefined>(undefined)

  const isRunning = computed(() => intervalId.value !== undefined)

  const isRestartDisabled = computed(() => totalSeconds.value === MODE_DURATIONS[currentMode.value])

  const formattedTime = computed(() => formatSeconds(totalSeconds.value))

  const start = () => {
    if (isRunning.value) return
    intervalId.value = window.setInterval(() => {
      totalSeconds.value--
      if (totalSeconds.value <= 0) {
        stop()
        playFinishSound()
      }
    }, 1000)
  }

  const stop = () => {
    if (intervalId.value !== undefined) {
      clearInterval(intervalId.value)
      intervalId.value = undefined
    }
  }

  const toggle = () => {
    if (isRunning.value) {
      stop()
    } else {
      start()
    }
  }

  const restart = () => {
    stop()
    totalSeconds.value = MODE_DURATIONS[currentMode.value]
  }

  const selectMode = (mode: Mode) => {
    stop()
    currentMode.value = mode
    totalSeconds.value = MODE_DURATIONS[mode]
  }

  onUnmounted(stop)

  return {
    currentMode,
    totalSeconds,
    isRunning,
    isRestartDisabled,
    formattedTime,
    toggle,
    restart,
    selectMode,
  }
}
