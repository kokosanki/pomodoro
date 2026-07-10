<template>
  <div class="timer">
    <div class="time">{{ formattedTime }}</div>
    <div class="controls">
      <button :disabled="isRunning" @click="start">Start</button>
      <button :disabled="!isRunning" @click="stop">Stop</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const START_SECONDS = 25 * 60

const totalSeconds = ref(START_SECONDS)
const intervalId = ref<number | undefined>(undefined)

const isRunning = computed(() => intervalId.value !== undefined)

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

  .controls {
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
}
</style>
