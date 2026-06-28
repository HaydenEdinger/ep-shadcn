<script setup lang="ts">
import { Check, Minus } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = defineProps<{
  modelValue?: boolean
  indeterminate?: boolean
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
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : modelValue"
    :disabled="disabled"
    :class="cn(
      'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      (modelValue || indeterminate)
        ? 'border-accent bg-accent text-accent-foreground'
        : 'border-input bg-card hover:border-foreground/40',
      props.class,
    )"
    @click="toggle"
  >
    <Minus v-if="indeterminate" class="size-3.5" />
    <Check v-else-if="modelValue" class="size-3.5" />
  </button>
</template>
