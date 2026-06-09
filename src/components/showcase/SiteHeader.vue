<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next"
import Button from "@/components/ui/Button.vue"

defineProps<{ isDark: boolean }>()
const emit = defineEmits<{ toggleTheme: [] }>()

const links = [
  { label: "Foundations", href: "#colors" },
  { label: "Components", href: "#buttons" },
  { label: "Patterns", href: "#dashboard" },
]
</script>

<template>
  <header class="sticky top-0 z-50 px-4 py-4">
    <div
      class="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-4 py-2.5 backdrop-blur-md"
    >
      <a href="#top" class="flex items-center gap-3">
        <span
          class="flex size-10 items-center justify-center rounded-full bg-foreground font-display text-lg font-bold text-background"
        >
          L
        </span>
        <span class="hidden font-display text-base font-semibold sm:block">Ledgerix</span>
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" shape="pill" aria-label="Toggle theme" @click="emit('toggleTheme')">
          <span class="text-base">{{ isDark ? "☀" : "☾" }}</span>
        </Button>
        <Button variant="default" size="sm" class="hidden sm:inline-flex">
          Request access
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  </header>
</template>
