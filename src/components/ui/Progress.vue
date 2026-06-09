<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  value?: number
  max?: number
  variant?: "accent" | "foreground" | "success"
  class?: string
}>()

const pct = computed(() => {
  const max = props.max ?? 100
  return Math.min(100, Math.max(0, ((props.value ?? 0) / max) * 100))
})

const barColor = {
  accent: "bg-accent",
  foreground: "bg-foreground",
  success: "bg-success",
}
</script>

<template>
  <div
    :class="cn('h-2 w-full overflow-hidden rounded-full bg-muted', props.class)"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemax="max ?? 100"
  >
    <div
      :class="cn('h-full rounded-full transition-all duration-500', barColor[variant ?? 'accent'])"
      :style="{ width: pct + '%' }"
    />
  </div>
</template>
