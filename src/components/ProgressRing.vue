<template>
  <div class="ring">
    <svg viewBox="0 0 100 100">
      <circle class="track" cx="50" cy="50" r="45" />
      <circle
        class="progress"
        cx="50"
        cy="50"
        r="45"
        :style="{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
        }"
      />
    </svg>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  progress: number
}>()

const circumference = 2 * Math.PI * 45

const dashOffset = computed(() => circumference * (1 - props.progress))
</script>

<style scoped lang="scss">
.ring {
  position: relative;
  width: 20rem;
  height: 20rem;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: 4;
  }

  .track {
    stroke: #eef1ff26;
  }

  .progress {
    stroke: #e7d398;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
