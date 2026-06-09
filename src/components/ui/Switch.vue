<script setup lang="ts">
import { cn } from "@/lib/utils"

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  class?: string
}>()

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>()

function toggle() {
  if (!props.disabled) emit("update:modelValue", !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="cn(
      'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      modelValue ? 'bg-accent' : 'bg-input',
      props.class,
    )"
    @click="toggle"
  >
    <span
      :class="cn(
        'inline-block size-5 transform rounded-full bg-background shadow-sm transition-transform duration-200',
        modelValue ? 'translate-x-[22px]' : 'translate-x-0.5',
      )"
    />
  </button>
</template>
