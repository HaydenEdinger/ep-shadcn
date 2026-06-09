<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  data: number[]
  height?: number
  stroke?: string
  fill?: boolean
}>()

const width = 100
const h = computed(() => props.height ?? 32)

const points = computed(() => {
  const data = props.data
  if (!data.length) return ""
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  return data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = h.value - ((d - min) / range) * (h.value - 4) - 2
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")
})

const areaPath = computed(() => {
  if (!points.value) return ""
  return `M0,${h.value} L${points.value.replace(/ /g, " L")} L${width},${h.value} Z`
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${h}`"
    preserveAspectRatio="none"
    class="h-full w-full overflow-visible"
    aria-hidden="true"
  >
    <polyline
      :points="points"
      fill="none"
      :stroke="stroke ?? 'currentColor'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
    <path
      v-if="fill"
      :d="areaPath"
      :fill="stroke ?? 'currentColor'"
      fill-opacity="0.12"
    />
  </svg>
</template>
