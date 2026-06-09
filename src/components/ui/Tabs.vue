<script setup lang="ts">
import { cn } from "@/lib/utils"

defineProps<{
  modelValue: string
  tabs: { label: string; value: string }[]
  class?: string
}>()

const emit = defineEmits<{ "update:modelValue": [value: string] }>()
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1 rounded-full bg-muted p-1', $props.class)">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :class="cn(
        'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        modelValue === tab.value
          ? 'bg-foreground text-background shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
      )"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
