<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority"

export const cardVariants = cva("rounded-2xl transition-colors", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border border-border",
      muted: "bg-muted text-foreground",
      dark: "bg-foreground text-background",
      accent: "bg-accent text-accent-foreground",
      ghost: "bg-transparent",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
})

export type CardVariants = VariantProps<typeof cardVariants>
</script>

<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"
import type { CardVariants } from "./Card.vue"

const props = defineProps<{
  variant?: CardVariants["variant"]
  padding?: CardVariants["padding"]
  class?: string
}>()

const classes = computed(() =>
  cn(cardVariants({ variant: props.variant, padding: props.padding }), props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
