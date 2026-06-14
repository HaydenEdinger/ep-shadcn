<script setup lang="ts">
import { ref, computed } from "vue"
import {
  Search,
  SlidersHorizontal,
  Columns3,
  ArrowUpDown,
  ChevronDown,
  Plus,
  Download,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next"
import Card from "@/components/ui/Card.vue"
import Badge from "@/components/ui/Badge.vue"
import Button from "@/components/ui/Button.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Checkbox from "@/components/ui/Checkbox.vue"

type Status = "Paid" | "Pending" | "Overdue" | "Draft"
interface Invoice {
  id: string
  account: string
  owner: string
  amount: number
  status: Status
  method: string
  due: string
}

const statusTone: Record<Status, "success" | "default" | "destructive" | "outline"> = {
  Paid: "success",
  Pending: "default",
  Overdue: "destructive",
  Draft: "outline",
}

const rows = ref<Invoice[]>([
  { id: "INV-2041", account: "Vertex Logistics", owner: "JR", amount: 24500, status: "Paid", method: "ACH transfer", due: "Jun 02, 2026" },
  { id: "INV-2042", account: "Halcyon Foods", owner: "AL", amount: 18200, status: "Overdue", method: "Wire", due: "May 28, 2026" },
  { id: "INV-2043", account: "Pine & Co.", owner: "SD", amount: 15750, status: "Pending", method: "Credit card", due: "Jun 14, 2026" },
  { id: "INV-2044", account: "Northbeam Labs", owner: "MH", amount: 12300, status: "Draft", method: "ACH transfer", due: "Jun 21, 2026" },
  { id: "INV-2045", account: "Atlas Retail Group", owner: "JR", amount: 31200, status: "Paid", method: "Wire", due: "Jun 05, 2026" },
  { id: "INV-2046", account: "Quill Software", owner: "AL", amount: 8900, status: "Pending", method: "Credit card", due: "Jun 18, 2026" },
  { id: "INV-2047", account: "Meridian Health", owner: "SD", amount: 27600, status: "Paid", method: "ACH transfer", due: "Jun 01, 2026" },
  { id: "INV-2048", account: "Cobalt Energy", owner: "MH", amount: 19450, status: "Overdue", method: "Wire", due: "May 30, 2026" },
])

const filters = ["All", "Paid", "Pending", "Overdue", "Draft"]
const activeFilter = ref("All")

const filteredRows = computed(() =>
  activeFilter.value === "All"
    ? rows.value
    : rows.value.filter((r) => r.status === activeFilter.value),
)

const selected = ref<Set<string>>(new Set())
const allSelected = computed(
  () => filteredRows.value.length > 0 && filteredRows.value.every((r) => selected.value.has(r.id)),
)
const someSelected = computed(
  () => filteredRows.value.some((r) => selected.value.has(r.id)) && !allSelected.value,
)

function toggleRow(id: string) {
  const next = new Set(selected.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selected.value = next
}
function toggleAll() {
  if (allSelected.value) {
    selected.value = new Set()
  } else {
    selected.value = new Set(filteredRows.value.map((r) => r.id))
  }
}

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col gap-5">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="font-display text-2xl font-semibold">Invoices</h2>
        <p class="text-sm text-muted-foreground">{{ filteredRows.length }} records · updated 4 min ago</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm"><Download />Export</Button>
        <Button variant="accent" size="sm"><Plus />New invoice</Button>
      </div>
    </div>

    <!-- Filter chips -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="f in filters"
        :key="f"
        class="rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
        :class="activeFilter === f
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-card text-muted-foreground hover:text-foreground'"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <Card padding="none" class="overflow-hidden">
      <!-- Toolbar -->
      <div class="flex flex-wrap items-center gap-3 border-b border-border p-3">
        <div class="relative min-w-0 flex-1">
          <Search class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Filter invoices…"
            class="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <Button variant="outline" size="sm"><SlidersHorizontal />Filter</Button>
        <Button variant="outline" size="sm"><Columns3 />Columns<ChevronDown class="size-4" /></Button>
      </div>

      <!-- Bulk action bar -->
      <div
        v-if="selected.size"
        class="flex items-center justify-between gap-3 border-b border-border bg-accent/10 px-4 py-2.5"
      >
        <span class="text-sm font-medium">{{ selected.size }} selected</span>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm"><Download />Export</Button>
          <Button variant="ghost" size="sm" class="text-destructive hover:bg-destructive/10"><Trash2 />Delete</Button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th class="w-12 px-4 py-3">
                <Checkbox :model-value="allSelected" :indeterminate="someSelected" @update:model-value="toggleAll" />
              </th>
              <th class="px-3 py-3 font-medium">
                <button class="inline-flex items-center gap-1 hover:text-foreground">Invoice<ArrowUpDown class="size-3" /></button>
              </th>
              <th class="px-3 py-3 font-medium">Account</th>
              <th class="px-3 py-3 font-medium">
                <button class="inline-flex items-center gap-1 hover:text-foreground">Amount<ArrowUpDown class="size-3" /></button>
              </th>
              <th class="px-3 py-3 font-medium">Status</th>
              <th class="hidden px-3 py-3 font-medium lg:table-cell">Method</th>
              <th class="hidden px-3 py-3 font-medium md:table-cell">Due date</th>
              <th class="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in filteredRows"
              :key="row.id"
              class="border-b border-border transition-colors last:border-0 hover:bg-muted/60"
              :class="selected.has(row.id) && 'bg-accent/5'"
            >
              <td class="px-4 py-3">
                <Checkbox :model-value="selected.has(row.id)" @update:model-value="toggleRow(row.id)" />
              </td>
              <td class="px-3 py-3 font-mono text-xs font-medium">{{ row.id }}</td>
              <td class="px-3 py-3">
                <div class="flex items-center gap-2.5">
                  <Avatar :fallback="row.owner" size="sm" ring="border" />
                  <span class="font-medium">{{ row.account }}</span>
                </div>
              </td>
              <td class="px-3 py-3 font-mono">{{ money(row.amount) }}</td>
              <td class="px-3 py-3">
                <Badge :variant="statusTone[row.status]" size="sm" :dot="row.status === 'Overdue'">{{ row.status }}</Badge>
              </td>
              <td class="hidden px-3 py-3 text-muted-foreground lg:table-cell">{{ row.method }}</td>
              <td class="hidden px-3 py-3 text-muted-foreground md:table-cell">{{ row.due }}</td>
              <td class="px-4 py-3">
                <button class="rounded-full p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Row actions">
                  <MoreHorizontal class="size-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground">
        <span>Showing 1–{{ filteredRows.length }} of 1,284</span>
        <div class="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled><ChevronLeft class="size-4" />Prev</Button>
          <Button variant="ghost" size="sm" class="bg-foreground text-background">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
          <Button variant="outline" size="sm">Next<ChevronRight class="size-4" /></Button>
        </div>
      </div>
    </Card>
  </div>
</template>
