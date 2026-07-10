<template>
  <div class="timer">
    <ModeSelector :current-mode="currentMode" @select="selectMode" />
    <ProgressRing :progress="progress">
      <div class="time">{{ formattedTime }}</div>
    </ProgressRing>
    <TimerControls
      :is-running="isRunning"
      :is-restart-disabled="isRestartDisabled"
      @toggle="toggle"
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
import ProgressRing from './ProgressRing.vue'

const DEFAULT_TITLE = document.title

const {
  currentMode,
  isRunning,
  isRestartDisabled,
  formattedTime,
  progress,
  toggle,
  restart,
  selectMode,
} = useCountdownTimer()

const currentModeLabel = computed(
  () => modes.find((mode) => mode.key === currentMode.value)?.label,
)

useDocumentTitle(() =>
  isRunning.value ? `${formattedTime.value}: ${currentModeLabel.value}` : currentModeLabel.value || DEFAULT_TITLE,
)
</script>

<style scoped lang="scss">
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
  color: #eef1ff;

  .time {
    font-size: 4rem;
    font-family: monospace;
  }
}
</style>
