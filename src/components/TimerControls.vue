<template>
  <div class="controls">
    <button :disabled="isRunning" @click="emit('start')">Start</button>
    <button :disabled="!isRunning" @click="emit('stop')">Stop</button>
    <button :disabled="isRestartDisabled" @click="emit('restart')">Restart</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isRunning: boolean
  isRestartDisabled: boolean
}>()

const emit = defineEmits<{
  start: []
  stop: []
  restart: []
}>()
</script>

<style scoped lang="scss">
@use '../styles/button' as *;

.controls {
  display: flex;
  gap: 0.5rem;

  button {
    @include ghost-button;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
