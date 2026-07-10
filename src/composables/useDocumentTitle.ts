import { watchEffect, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

export const useDocumentTitle = (title: MaybeRefOrGetter<string>) => {
  const originalTitle = document.title

  watchEffect(() => {
    document.title = toValue(title)
  })

  onUnmounted(() => {
    document.title = originalTitle
  })
}
