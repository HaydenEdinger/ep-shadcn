<script setup lang="ts">
defineProps<{
  id?: string
  index: string
  title: string
  description?: string
}>()
</script>

<template>
  <section :id="id" class="scroll-mt-24 border-t border-border py-16 first:border-t-0 md:py-20">
    <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div class="max-w-2xl">
        <div class="mb-3 flex items-center gap-3">
          <span class="font-mono text-xs text-muted-foreground">{{ index }}</span>
          <span class="h-px w-8 bg-border" />
          <span class="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Component
          </span>
        </div>
        <h2 class="font-display text-3xl font-semibold text-balance md:text-4xl">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <slot name="aside" />
    </div>
    <slot />
  </section>
</template>
