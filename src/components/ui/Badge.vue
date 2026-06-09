<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        dark: "bg-foreground text-background",
        outline: "border border-border text-foreground",
        success: "bg-success/15 text-success",
        destructive: "bg-destructive/15 text-destructive",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
</script>

<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"
import type { BadgeVariants } from "./Badge.vue"

const props = defineProps<{
  variant?: BadgeVariants["variant"]
  size?: BadgeVariants["size"]
  dot?: boolean
  class?: string
}>()

const classes = computed(() =>
  cn(badgeVariants({ variant: props.variant, size: props.size }), props.class),
)
</script>

<template>
  <span :class="classes">
    <span
      v-if="dot"
      class="size-1.5 rounded-full bg-current animate-pulse-dot"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
