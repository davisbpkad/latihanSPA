import { ref, watch } from 'vue'

/**
 * Composable for localStorage operations
 * @param {string} key - localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {Object} - Reactive value and utility functions
 */
export function useLocalStorage(key, defaultValue = null) {
  // Initialize value from localStorage or use default
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

  // Watch for changes and save to localStorage
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })

  // Utility functions
  const clear = () => {
    value.value = defaultValue
    localStorage.removeItem(key)
  }

  const update = (newValue) => {
    value.value = newValue
  }

  return {
    value,
    clear,
    update
  }
} 