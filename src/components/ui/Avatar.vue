<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  src?: string
  alt?: string
  fallback?: string
  name?: string
  size?: "sm" | "default" | "lg" | "xl"
  ring?: "none" | "accent" | "border"
  class?: string
}>()

const initials = computed(() => {
  if (props.fallback) return props.fallback
  if (!props.name) return ""
  return props.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
})

const sizeClasses = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
}

const ringClasses = {
  none: "",
  accent: "ring-2 ring-accent ring-offset-2 ring-offset-background",
  border: "ring-1 ring-border",
}

const classes = computed(() =>
  cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
    sizeClasses[props.size ?? "default"],
    ringClasses[props.ring ?? "none"],
    props.class,
  ),
)
</script>

<template>
  <span :class="classes">
    <img
      v-if="src"
      :src="src"
      :alt="alt ?? ''"
      class="size-full object-cover"
    />
    <span v-else>{{ initials }}</span>
  </span>
</template>
