<template>
  <div class="modes">
    <button
      v-for="mode in modes"
      :key="mode.key"
      :class="{ active: currentMode === mode.key }"
      @click="emit('select', mode.key)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { modes, type Mode } from '@/constants/modes'

defineProps<{
  currentMode: Mode
}>()

const emit = defineEmits<{
  select: [mode: Mode]
}>()
</script>

<style scoped lang="scss">
.modes {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>
