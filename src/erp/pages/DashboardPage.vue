<script setup lang="ts">
import { ref } from "vue"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  ArrowUpRight,
  Download,
  Sparkles,
  MoreHorizontal,
} from "lucide-vue-next"
import Card from "@/components/ui/Card.vue"
import Badge from "@/components/ui/Badge.vue"
import Button from "@/components/ui/Button.vue"
import Progress from "@/components/ui/Progress.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Sparkline from "@/components/ui/Sparkline.vue"
import Tabs from "@/components/ui/Tabs.vue"

const range = ref("month")
const rangeTabs = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
]

const stats = [
  { label: "Net revenue", value: "$1.65M", delta: "+12.4%", up: true, icon: Wallet, data: [4, 7, 5, 9, 8, 12, 10, 15] },
  { label: "Open invoices", value: "$284k", delta: "+4.1%", up: true, icon: CreditCard, data: [6, 5, 7, 6, 8, 9, 8, 10] },
  { label: "Active accounts", value: "1,284", delta: "+38", up: true, icon: Users, data: [8, 9, 9, 10, 11, 11, 12, 14] },
  { label: "Churn rate", value: "1.8%", delta: "-0.3%", up: false, icon: TrendingDown, data: [10, 9, 11, 8, 9, 7, 8, 6] },
]

const revenueBars = [
  { m: "Jan", a: 52, b: 38 },
  { m: "Feb", a: 61, b: 42 },
  { m: "Mar", a: 48, b: 35 },
  { m: "Apr", a: 73, b: 51 },
  { m: "May", a: 66, b: 47 },
  { m: "Jun", a: 88, b: 60 },
  { m: "Jul", a: 79, b: 55 },
  { m: "Aug", a: 94, b: 68 },
]

const pipeline = [
  { stage: "Qualified", value: 42, amount: "$640k", variant: "accent" as const },
  { stage: "Proposal", value: 28, amount: "$410k", variant: "foreground" as const },
  { stage: "Negotiation", value: 18, amount: "$295k", variant: "success" as const },
  { stage: "Closing", value: 12, amount: "$180k", variant: "accent" as const },
]

const accounts = [
  { name: "Vertex Logistics", owner: "JR", mrr: "$24,500", status: "Healthy", tone: "success" as const },
  { name: "Halcyon Foods", owner: "AL", mrr: "$18,200", status: "At risk", tone: "destructive" as const },
  { name: "Pine & Co.", owner: "SD", mrr: "$15,750", status: "Healthy", tone: "success" as const },
  { name: "Northbeam Labs", owner: "MH", mrr: "$12,300", status: "Onboarding", tone: "default" as const },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col gap-5">
    <!-- Page header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm text-muted-foreground">Welcome back, Marcus</p>
        <h2 class="font-display text-2xl font-semibold">Financial overview</h2>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Tabs v-model="range" :tabs="rangeTabs" />
        <Button variant="outline" size="sm"><Download />Export</Button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card v-for="s in stats" :key="s.label" padding="lg" class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
            <component :is="s.icon" class="size-[18px]" />
          </span>
          <Badge :variant="s.up ? 'success' : 'destructive'" size="sm">
            <component :is="s.up ? TrendingUp : TrendingDown" class="size-3" />
            {{ s.delta }}
          </Badge>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">{{ s.label }}</p>
          <p class="mt-1 font-display text-2xl font-semibold">{{ s.value }}</p>
        </div>
        <div :class="['h-9', s.up ? 'text-success' : 'text-destructive']">
          <Sparkline :data="s.data" fill />
        </div>
      </Card>
    </div>

    <!-- Charts row -->
    <div class="grid gap-4 lg:grid-cols-3">
      <!-- Revenue bar chart -->
      <Card variant="dark" padding="lg" class="lg:col-span-2">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-sm text-background/60">Revenue vs. forecast</p>
            <p class="mt-1 font-display text-3xl font-semibold">$1,651,045</p>
          </div>
          <div class="flex items-center gap-4 text-xs text-background/70">
            <span class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-accent" />Actual</span>
            <span class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-background/30" />Forecast</span>
          </div>
        </div>
        <div class="mt-8 flex h-52 items-end justify-between gap-2 sm:gap-4">
          <div v-for="bar in revenueBars" :key="bar.m" class="flex flex-1 flex-col items-center gap-2">
            <div class="flex h-44 w-full items-end justify-center gap-1">
              <div
                class="w-1/2 rounded-t-md bg-accent transition-all"
                :style="{ height: bar.a + '%' }"
                :title="`Actual ${bar.a}`"
              />
              <div
                class="w-1/2 rounded-t-md bg-background/25 transition-all"
                :style="{ height: bar.b + '%' }"
                :title="`Forecast ${bar.b}`"
              />
            </div>
            <span class="text-xs text-background/50">{{ bar.m }}</span>
          </div>
        </div>
      </Card>

      <!-- Pipeline breakdown -->
      <Card padding="lg" class="flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <p class="font-medium">Pipeline by stage</p>
          <button class="rounded-full p-1.5 text-muted-foreground hover:bg-secondary" aria-label="More">
            <MoreHorizontal class="size-4" />
          </button>
        </div>
        <div class="flex flex-col gap-5">
          <div v-for="p in pipeline" :key="p.stage" class="flex flex-col gap-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">{{ p.stage }}</span>
              <span class="font-mono font-medium">{{ p.amount }}</span>
            </div>
            <Progress :value="p.value" :variant="p.variant" />
          </div>
        </div>
        <Button variant="outline" size="sm" class="mt-auto w-full">
          View full pipeline
          <ArrowUpRight />
        </Button>
      </Card>
    </div>

    <!-- Bottom row -->
    <div class="grid gap-4 lg:grid-cols-3">
      <!-- Top accounts -->
      <Card padding="none" class="overflow-hidden lg:col-span-2">
        <div class="flex items-center justify-between p-6 pb-4">
          <p class="font-medium">Top accounts</p>
          <Badge variant="outline" size="sm">{{ accounts.length }} of 1,284</Badge>
        </div>
        <div class="divide-y divide-border">
          <div
            v-for="a in accounts"
            :key="a.name"
            class="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-muted/60"
          >
            <Avatar :fallback="a.owner" size="sm" ring="border" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ a.name }}</p>
              <p class="text-xs text-muted-foreground">Owner · {{ a.owner }}</p>
            </div>
            <span class="font-mono text-sm">{{ a.mrr }}</span>
            <Badge :variant="a.tone" size="sm" class="w-24 justify-center">{{ a.status }}</Badge>
          </div>
        </div>
      </Card>

      <!-- AI insight -->
      <Card variant="accent" padding="lg" class="flex flex-col justify-between gap-6">
        <div>
          <span class="flex size-11 items-center justify-center rounded-full bg-accent-foreground/10 text-accent-foreground">
            <Sparkles class="size-5" />
          </span>
          <p class="mt-4 font-display text-xl font-semibold leading-snug text-balance">
            Q3 revenue is tracking 8% above forecast.
          </p>
          <p class="mt-2 text-sm text-accent-foreground/80">
            Vertex Logistics and Pine &amp; Co. drove most of the upside. Consider raising the quarterly target.
          </p>
        </div>
        <Button variant="default" size="sm" class="w-full">
          <Sparkles />
          Ask Ledgerix AI
        </Button>
      </Card>
    </div>
  </div>
</template>
