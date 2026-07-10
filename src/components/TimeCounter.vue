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
import { computed } from 'vue'
import { modes } from '@/constants/modes'
import { useCountdownTimer } from '@/composables/useCountdownTimer'
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import ModeSelector from './ModeSelector.vue'
import TimerControls from './TimerControls.vue'

const DEFAULT_TITLE = document.title

const { currentMode, isRunning, isRestartDisabled, formattedTime, start, stop, restart, selectMode } =
  useCountdownTimer()

const currentModeLabel = computed(
  () => modes.find((mode) => mode.key === currentMode.value)?.label,
)

useDocumentTitle(() =>
  isRunning.value ? `${currentModeLabel.value}: ${formattedTime.value}` : DEFAULT_TITLE,
)
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
