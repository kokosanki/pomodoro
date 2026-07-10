<template>
  <div class="timer">
    <ModeSelector :current-mode="currentMode" @select="selectMode" />
    <div class="time">{{ formattedTime }}</div>
    <TimerControls
      :is-running="isRunning"
      :is-restart-disabled="isRestartDisabled"
      @start="start"
      @stop="stop"
      @restart="restart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { MODE_DURATIONS, type Mode } from '@/constants/modes'
import ModeSelector from './ModeSelector.vue'
import TimerControls from './TimerControls.vue'

const currentMode = ref<Mode>('pomodoro')
const totalSeconds = ref(MODE_DURATIONS[currentMode.value])
const intervalId = ref<number | undefined>(undefined)

const isRunning = computed(() => intervalId.value !== undefined)

const isRestartDisabled = computed(() => totalSeconds.value === MODE_DURATIONS[currentMode.value])

const formattedTime = computed(() => {
  const minutes = Math.floor(totalSeconds.value / 60)
  const seconds = totalSeconds.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const start = () => {
  if (isRunning.value) return
  intervalId.value = window.setInterval(() => {
    if (totalSeconds.value <= 0) {
      stop()
      return
    }
    totalSeconds.value--
  }, 1000)
}

const stop = () => {
  if (intervalId.value !== undefined) {
    clearInterval(intervalId.value)
    intervalId.value = undefined
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
</script>

<style scoped lang="scss">
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .time {
    font-size: 4rem;
    font-family: monospace;
  }
}
</style>
