<script setup lang="ts">
import { ref } from "vue"
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Search,
  Sparkles,
  Wallet,
  CreditCard,
  PieChart,
  Check,
  LayoutDashboard,
} from "lucide-vue-next"
import { RouterLink } from "vue-router"
import { useTheme } from "@/composables/useTheme"

import SiteHeader from "@/components/showcase/SiteHeader.vue"
import ShowcaseSection from "@/components/showcase/ShowcaseSection.vue"
import ExampleRow from "@/components/showcase/ExampleRow.vue"

import Button from "@/components/ui/Button.vue"
import Card from "@/components/ui/Card.vue"
import Badge from "@/components/ui/Badge.vue"
import Input from "@/components/ui/Input.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Switch from "@/components/ui/Switch.vue"
import Progress from "@/components/ui/Progress.vue"
import Tabs from "@/components/ui/Tabs.vue"
import Sparkline from "@/components/ui/Sparkline.vue"

const { isDark, toggleTheme } = useTheme()

// interactive demo state
const switchOn = ref(true)
const range = ref("month")
const rangeTabs = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
  { label: "Year", value: "year" },
]
const email = ref("")

const palette = [
  { name: "Background", token: "--background", className: "bg-background", text: "text-foreground", ring: true },
  { name: "Foreground", token: "--foreground", className: "bg-foreground", text: "text-background" },
  { name: "Accent / Lime", token: "--accent", className: "bg-accent", text: "text-accent-foreground" },
  { name: "Muted", token: "--muted", className: "bg-muted", text: "text-foreground" },
  { name: "Success", token: "--success", className: "bg-success", text: "text-success-foreground" },
  { name: "Destructive", token: "--destructive", className: "bg-destructive", text: "text-destructive-foreground" },
]

const typeScale = [
  { name: "Display / Hero", cls: "font-display text-5xl font-semibold", sample: "Smart finance", meta: "Space Grotesk · 48px" },
  { name: "Heading", cls: "font-display text-3xl font-semibold", sample: "Empowering growth", meta: "Space Grotesk · 30px" },
  { name: "Title", cls: "font-sans text-xl font-semibold", sample: "Strategic foundation", meta: "Inter · 20px" },
  { name: "Body", cls: "font-sans text-base leading-relaxed", sample: "Starting with strategy ensures every design decision aligns with business goals.", meta: "Inter · 16px" },
  { name: "Mono / Data", cls: "font-mono text-sm", sample: "$1,651,045.138", meta: "JetBrains Mono · 14px" },
]

const stats = [
  { label: "Net revenue", value: "$1.65M", delta: "+12.4%", up: true, data: [4, 6, 5, 8, 7, 10, 9, 13], icon: Wallet },
  { label: "Sales forecast", value: "$141.7k", delta: "+8.1%", up: true, data: [8, 7, 9, 8, 11, 10, 12, 14], icon: TrendingUp },
  { label: "Monthly expenses", value: "$17.2k", delta: "-3.2%", up: false, data: [10, 9, 11, 8, 9, 7, 8, 6], icon: CreditCard },
  { label: "Budget forecast", value: "$92.1k", delta: "+5.7%", up: true, data: [5, 6, 6, 7, 7, 9, 10, 11], icon: PieChart },
]

const team = [
  { name: "Jack R.", role: "CX Designer", fallback: "JR" },
  { name: "Alina L.", role: "QA Lead", fallback: "AL" },
  { name: "Stan D.", role: "CIO", fallback: "SD" },
]
</script>

<template>
  <div id="top" class="min-h-dvh bg-background">
    <SiteHeader :is-dark="isDark" @toggle-theme="toggleTheme" />

    <!-- Hero -->
    <section class="px-4 pb-8 pt-10 md:pt-16">
      <div class="mx-auto max-w-6xl">
        <Badge variant="outline" size="lg" dot class="mb-6 animate-fade-in">
          Ledgerix Design System · v1.0
        </Badge>
        <div class="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 class="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance md:text-7xl">
              A finance SaaS<br />
              design system,<br />
              <span class="text-muted-foreground">built in Vue.</span>
            </h1>
            <p class="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Rounded geometric type, pill-shaped controls, and a signature lime
              accent — a shadcn-style component library inspired by the Ledgerix CRM.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <RouterLink to="/app/dashboard">
                <Button size="lg" variant="accent">
                  <LayoutDashboard />
                  Open ERP demo
                </Button>
              </RouterLink>
              <Button size="lg" variant="outline" as="a" href="#colors">
                View foundations
                <ArrowUpRight />
              </Button>
            </div>
          </div>

          <!-- hero preview card -->
          <Card variant="dark" padding="lg" class="animate-fade-in">
            <div class="flex items-center justify-between">
              <span class="text-xs uppercase tracking-[0.14em] text-background/60">Net revenue</span>
              <Badge variant="accent" size="sm">+12.4%</Badge>
            </div>
            <p class="mt-4 font-display text-4xl font-semibold">$1,651,045</p>
            <div class="mt-6 h-16 text-accent">
              <Sparkline :data="[4, 7, 5, 9, 8, 12, 10, 15, 13, 18]" fill />
            </div>
            <div class="mt-6 flex items-center gap-3 border-t border-background/10 pt-5">
              <Avatar fallback="ML" ring="accent" class="bg-background/10 text-background" />
              <div class="text-sm">
                <p class="font-medium">Marcus Hale</p>
                <p class="text-background/60">Co-founder, Ledgerix</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-4 pb-24">
      <!-- Colors -->
      <ShowcaseSection
        id="colors"
        index="01"
        title="Color tokens"
        description="An off-white canvas, near-black ink, and a single vivid lime accent. Every color is an HSL CSS variable that flips automatically in dark mode."
      >
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div
            v-for="c in palette"
            :key="c.token"
            class="overflow-hidden rounded-2xl border border-border"
          >
            <div
              :class="['flex h-24 items-end p-3', c.className, c.text, c.ring ? 'border-b border-border' : '']"
            >
              <span class="text-xs font-medium">{{ c.name }}</span>
            </div>
            <div class="bg-card p-3">
              <code class="font-mono text-[11px] text-muted-foreground">{{ c.token }}</code>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <!-- Typography -->
      <ShowcaseSection
        index="02"
        title="Typography"
        description="Space Grotesk gives headings their rounded, geometric character. Inter handles body copy, and JetBrains Mono renders financial data."
      >
        <Card padding="lg" class="divide-y divide-border">
          <div
            v-for="(t, i) in typeScale"
            :key="t.name"
            :class="['flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between', i === 0 ? 'pt-0' : '']"
          >
            <p :class="[t.cls, 'text-pretty']">{{ t.sample }}</p>
            <div class="flex shrink-0 items-center gap-3 md:text-right">
              <span class="text-sm font-medium">{{ t.name }}</span>
              <span class="font-mono text-xs text-muted-foreground">{{ t.meta }}</span>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      <!-- Buttons -->
      <ShowcaseSection
        id="buttons"
        index="03"
        title="Buttons"
        description="Pill-shaped by default with a subtle press animation. Seven variants and four sizes cover primary actions, accents, and quiet controls."
      >
        <div class="grid gap-8 md:grid-cols-2">
          <Card padding="lg" class="flex flex-col gap-6">
            <ExampleRow label="Variants">
              <Button>Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </ExampleRow>
            <ExampleRow label="With icons">
              <Button variant="accent"><Sparkles />Generate insight</Button>
              <Button variant="outline">Export<ArrowUpRight /></Button>
              <Button variant="default" size="icon" aria-label="Search"><Search /></Button>
            </ExampleRow>
          </Card>
          <Card padding="lg" class="flex flex-col gap-6">
            <ExampleRow label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </ExampleRow>
            <ExampleRow label="Shape & state">
              <Button shape="rounded">Rounded</Button>
              <Button shape="pill">Pill</Button>
              <Button disabled>Disabled</Button>
            </ExampleRow>
          </Card>
        </div>
      </ShowcaseSection>

      <!-- Badges + status -->
      <ShowcaseSection
        index="04"
        title="Badges & status"
        description="Compact, fully-rounded labels for metrics, statuses, and metadata, with an optional pulsing live dot."
      >
        <Card padding="lg">
          <ExampleRow>
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="dark">Dark</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success" dot>Live</Badge>
            <Badge variant="destructive">Overdue</Badge>
            <Badge variant="accent" size="lg">+12.4%</Badge>
          </ExampleRow>
        </Card>
      </ShowcaseSection>

      <!-- Forms -->
      <ShowcaseSection
        index="05"
        title="Forms & controls"
        description="Inputs, toggles, and segmented tabs share the same rounded language and lime focus ring."
      >
        <div class="grid gap-8 lg:grid-cols-2">
          <Card padding="lg" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="demo-email">Work email</label>
              <Input id="demo-email" v-model="email" type="email" placeholder="you@company.com" />
            </div>
            <div class="flex items-center justify-between rounded-xl bg-muted p-4">
              <div>
                <p class="text-sm font-medium">AI trend alerts</p>
                <p class="text-sm text-muted-foreground">Highlight financial shifts automatically</p>
              </div>
              <Switch v-model="switchOn" />
            </div>
            <Button variant="accent" class="w-full">
              <Check />
              Save preferences
            </Button>
          </Card>
          <Card padding="lg" class="flex flex-col justify-between gap-6">
            <div class="flex flex-col gap-3">
              <span class="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Segmented tabs
              </span>
              <Tabs v-model="range" :tabs="rangeTabs" />
              <p class="text-sm text-muted-foreground">
                Viewing data for: <span class="font-medium text-foreground">{{ range }}</span>
              </p>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Budget used</span>
                  <span class="font-mono">68%</span>
                </div>
                <Progress :value="68" />
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Forecast accuracy</span>
                  <span class="font-mono">92%</span>
                </div>
                <Progress :value="92" variant="success" />
              </div>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <!-- Cards / avatars -->
      <ShowcaseSection
        index="06"
        title="Cards & avatars"
        description="Generously rounded surfaces in four tones — light, muted, dark, and accent — plus ringed avatars for people."
      >
        <div class="grid gap-4 md:grid-cols-3">
          <Card variant="muted" padding="lg">
            <span class="text-xs uppercase tracking-[0.14em] text-muted-foreground">Clear reporting</span>
            <p class="mt-4 text-pretty leading-relaxed">
              Dashboards that prioritize clarity and quick comparisons for finance teams.
            </p>
          </Card>
          <Card variant="dark" padding="lg">
            <div class="flex items-center justify-between">
              <span class="text-xs uppercase tracking-[0.14em] text-background/60">Visual insights</span>
              <span class="size-2 rounded-full bg-accent animate-pulse-dot" />
            </div>
            <p class="mt-4 text-pretty leading-relaxed text-background/90">
              AI prompts surface trends automatically, so nothing important slips by.
            </p>
          </Card>
          <Card variant="accent" padding="lg">
            <span class="text-xs uppercase tracking-[0.14em] text-accent-foreground/70">Strategic plan</span>
            <p class="mt-4 text-pretty font-display text-xl font-semibold leading-snug">
              Empowering growth through smart strategy.
            </p>
          </Card>
        </div>
        <Card padding="lg" class="mt-4">
          <div class="flex flex-wrap items-center gap-8">
            <div
              v-for="m in team"
              :key="m.name"
              class="flex items-center gap-3"
            >
              <Avatar :fallback="m.fallback" ring="border" size="lg" />
              <div class="text-sm">
                <p class="font-medium">{{ m.name }}</p>
                <p class="text-muted-foreground">{{ m.role }}</p>
              </div>
            </div>
            <div class="flex -space-x-3">
              <Avatar v-for="m in team" :key="m.name + '-stack'" :fallback="m.fallback" ring="border" class="ring-2 ring-card" />
              <span class="flex size-10 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background ring-2 ring-card">+9</span>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      <!-- Dashboard pattern -->
      <ShowcaseSection
        id="dashboard"
        index="07"
        title="Dashboard pattern"
        description="Composing the primitives into a real finance dashboard — stat cards with live sparklines, exactly the Ledgerix product feel."
      >
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card v-for="s in stats" :key="s.label" padding="lg" class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <span class="flex size-9 items-center justify-center rounded-full bg-muted text-foreground">
                <component :is="s.icon" class="size-4" />
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
            <div :class="['h-10', s.up ? 'text-success' : 'text-destructive']">
              <Sparkline :data="s.data" fill />
            </div>
          </Card>
        </div>

        <Card variant="dark" padding="lg" class="mt-4">
          <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-4">
              <span class="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Sparkles class="size-5" />
              </span>
              <div>
                <p class="font-display text-lg font-semibold">Ask anything about your finances</p>
                <p class="text-sm text-background/60">The new feedback form boosted requests and sales.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 rounded-full bg-background/10 p-1.5">
              <input
                class="w-48 bg-transparent px-3 text-sm text-background placeholder:text-background/40 focus:outline-none md:w-64"
                placeholder="What is my gross margin?"
              />
              <Button variant="accent" size="sm">
                Ask
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border px-4 py-10">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div class="flex items-center gap-3">
          <span class="flex size-8 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">L</span>
          <span class="text-sm text-muted-foreground">Ledgerix Design System — built with Vue 3 + Tailwind CSS</span>
        </div>
        <p class="text-sm text-muted-foreground">Inspired by the Ledgerix CRM case study</p>
      </div>
    </footer>
  </div>
</template>
