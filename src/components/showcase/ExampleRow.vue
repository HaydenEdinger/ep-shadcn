<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <span
      v-if="label"
      class="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      {{ label }}
    </span>
    <div class="flex flex-wrap items-center gap-4">
      <slot />
    </div>
  </div>
</template>
