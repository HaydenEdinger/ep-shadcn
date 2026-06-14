import { ref, watch } from "vue"

const isDark = ref(false)

watch(
  isDark,
  (v) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", v)
    }
  },
  { immediate: true },
)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  return { isDark, toggleTheme }
}
