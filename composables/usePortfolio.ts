import { ref } from 'vue'

/**
 * Shared singleton state for the Portfolio modal.
 * Used by both the global nav-bar launcher and any in-page triggers.
 */
const isOpen = ref(false)
const closing = ref(false)

export function usePortfolio() {
  function close() {
    if (closing.value) return
    closing.value = true
    // Wait for sheet-out animation (0.45s) + buffer before removing from DOM
    setTimeout(() => {
      isOpen.value = false
      closing.value = false
    }, 550)
  }

  return {
    isOpen,
    closing,
    open: () => { isOpen.value = true; closing.value = false },
    close,
    toggle: () => { isOpen.value ? close() : (isOpen.value = true) },
  }
}
