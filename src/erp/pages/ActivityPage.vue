<script setup lang="ts">
import { ref, computed } from "vue"
import {
  DollarSign,
  FileText,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  GitCommitHorizontal,
  RefreshCw,
  Filter,
} from "lucide-vue-next"
import Card from "@/components/ui/Card.vue"
import Badge from "@/components/ui/Badge.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Button from "@/components/ui/Button.vue"

type ActivityType = "payment" | "invoice" | "account" | "approval" | "alert" | "system"
interface Activity {
  id: string
  type: ActivityType
  actor: string
  action: string
  target: string
  meta?: string
  time: string
  day: "Today" | "Yesterday" | "Earlier this week"
}

const typeMeta: Record<
  ActivityType,
  { icon: any; ring: string; label: string }
> = {
  payment: { icon: DollarSign, ring: "bg-success/15 text-success", label: "Payment" },
  invoice: { icon: FileText, ring: "bg-primary/10 text-foreground", label: "Invoice" },
  account: { icon: UserPlus, ring: "bg-accent/20 text-foreground", label: "Account" },
  approval: { icon: CheckCircle2, ring: "bg-success/15 text-success", label: "Approval" },
  alert: { icon: AlertTriangle, ring: "bg-destructive/15 text-destructive", label: "Alert" },
  system: { icon: GitCommitHorizontal, ring: "bg-muted text-muted-foreground", label: "System" },
}

const activities = ref<Activity[]>([
  { id: "a1", type: "payment", actor: "Vertex Logistics", action: "paid invoice", target: "INV-2041", meta: "$24,500", time: "9:42 AM", day: "Today" },
  { id: "a2", type: "approval", actor: "Priya Nair", action: "approved", target: "Ledger migration window", time: "8:15 AM", day: "Today" },
  { id: "a3", type: "account", actor: "Mara Lin", action: "created account", target: "Atlas Retail Group", meta: "Enterprise", time: "7:58 AM", day: "Today" },
  { id: "a4", type: "alert", actor: "System", action: "flagged overdue invoice", target: "INV-2042", meta: "Halcyon Foods", time: "7:30 AM", day: "Today" },
  { id: "a5", type: "invoice", actor: "Sofia Delgado", action: "issued invoice", target: "INV-2051", meta: "$15,750", time: "6:12 PM", day: "Yesterday" },
  { id: "a6", type: "payment", actor: "Pine & Co.", action: "scheduled payment for", target: "INV-2043", meta: "$15,750", time: "4:48 PM", day: "Yesterday" },
  { id: "a7", type: "system", actor: "Automation", action: "ran payroll batch", target: "September run", meta: "142 employees", time: "2:00 PM", day: "Yesterday" },
  { id: "a8", type: "approval", actor: "Cole Diaz", action: "approved SLA terms for", target: "Meridian Bank", time: "11:20 AM", day: "Earlier this week" },
  { id: "a9", type: "account", actor: "Theo Park", action: "upgraded plan for", target: "Northbeam Labs", meta: "Growth → Scale", time: "Mon 3:05 PM", day: "Earlier this week" },
  { id: "a10", type: "invoice", actor: "Jude Cole", action: "voided invoice", target: "INV-2030", meta: "Duplicate", time: "Mon 10:11 AM", day: "Earlier this week" },
])

const filters = [
  { key: "all", label: "All activity" },
  { key: "payment", label: "Payments" },
  { key: "invoice", label: "Invoices" },
  { key: "approval", label: "Approvals" },
  { key: "alert", label: "Alerts" },
] as const
const activeFilter = ref<(typeof filters)[number]["key"]>("all")

const days = ["Today", "Yesterday", "Earlier this week"] as const
const grouped = computed(() =>
  days
    .map((day) => ({
      day,
      items: activities.value.filter(
        (a) => a.day === day && (activeFilter.value === "all" || a.type === activeFilter.value),
      ),
    }))
    .filter((g) => g.items.length > 0),
)

const summary = computed(() => [
  { label: "Payments received", value: "$40,250", type: "payment" as const },
  { label: "Invoices issued", value: "6", type: "invoice" as const },
  { label: "New accounts", value: "3", type: "account" as const },
  { label: "Open alerts", value: "1", type: "alert" as const },
])
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-foreground">Activity</h1>
        <p class="mt-1 text-sm text-muted-foreground">A live record of everything happening across your workspace.</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm"><RefreshCw />Refresh</Button>
        <Button variant="outline" size="sm"><Filter />Export</Button>
      </div>
    </div>

    <!-- Summary tiles -->
    <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card v-for="s in summary" :key="s.label" class="flex items-center gap-3 p-4">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" :class="typeMeta[s.type].ring">
          <component :is="typeMeta[s.type].icon" class="h-5 w-5" />
        </span>
        <div class="min-w-0">
          <p class="font-display text-xl font-semibold text-foreground">{{ s.value }}</p>
          <p class="truncate text-xs text-muted-foreground">{{ s.label }}</p>
        </div>
      </Card>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
      <!-- Feed -->
      <div class="order-2 flex flex-col gap-6 lg:order-1">
        <div v-for="group in grouped" :key="group.day">
          <div class="mb-3 flex items-center gap-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{{ group.day }}</h2>
            <div class="h-px flex-1 bg-border" />
          </div>

          <Card class="p-0">
            <ol class="relative">
              <li
                v-for="(a, idx) in group.items"
                :key="a.id"
                class="relative flex gap-4 px-5 py-4"
                :class="idx !== group.items.length - 1 ? 'border-b border-border' : ''"
              >
                <!-- timeline line -->
                <span
                  v-if="idx !== group.items.length - 1"
                  class="absolute left-[2.4rem] top-12 h-[calc(100%-1.5rem)] w-px bg-border"
                  aria-hidden="true"
                />
                <span
                  class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-card"
                  :class="typeMeta[a.type].ring"
                >
                  <component :is="typeMeta[a.type].icon" class="h-4 w-4" />
                </span>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-baseline gap-x-1.5 text-sm">
                    <span class="font-semibold text-foreground">{{ a.actor }}</span>
                    <span class="text-muted-foreground">{{ a.action }}</span>
                    <span class="font-medium text-foreground">{{ a.target }}</span>
                  </div>
                  <div class="mt-1.5 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" size="sm">{{ typeMeta[a.type].label }}</Badge>
                    <Badge v-if="a.meta" variant="secondary" size="sm">{{ a.meta }}</Badge>
                    <span class="text-xs text-muted-foreground">{{ a.time }}</span>
                  </div>
                </div>

                <Avatar :name="a.actor" size="sm" ring="border" class="hidden shrink-0 sm:flex" />
              </li>
            </ol>
          </Card>
        </div>

        <div v-if="grouped.length === 0" class="rounded-3xl border border-dashed border-border py-16 text-center">
          <p class="text-sm text-muted-foreground">No activity matches this filter.</p>
        </div>
      </div>

      <!-- Filter rail -->
      <aside class="order-1 lg:order-2">
        <div class="lg:sticky lg:top-6">
          <p class="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filter</p>
          <div class="flex flex-row flex-wrap gap-1.5 lg:flex-col">
            <button
              v-for="f in filters"
              :key="f.key"
              @click="activeFilter = f.key"
              class="rounded-xl px-3.5 py-2 text-left text-sm font-medium transition-colors"
              :class="activeFilter === f.key
                ? 'bg-foreground text-background'
                : 'bg-secondary text-muted-foreground hover:text-foreground'"
            >
              {{ f.label }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
