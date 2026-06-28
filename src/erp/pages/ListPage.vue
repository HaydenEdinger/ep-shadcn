<script setup lang="ts">
import { ref, computed } from "vue"
import {
  Plus,
  Search,
  Star,
  ChevronRight,
  CircleDot,
  Clock,
  Building2,
} from "lucide-vue-next"
import Card from "@/components/ui/Card.vue"
import Badge from "@/components/ui/Badge.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Button from "@/components/ui/Button.vue"
import Input from "@/components/ui/Input.vue"
import Progress from "@/components/ui/Progress.vue"

type Stage = "Planning" | "Active" | "Blocked" | "Complete"
interface Project {
  id: string
  name: string
  client: string
  description: string
  stage: Stage
  budget: string
  progress: number
  due: string
  team: string[]
  starred: boolean
}

const projects = ref<Project[]>([
  {
    id: "PRJ-104",
    name: "ERP rollout — Atlas Logistics",
    client: "Atlas Logistics",
    description: "Procurement, inventory and finance module implementation across 4 warehouses.",
    stage: "Active",
    budget: "$96,500",
    progress: 62,
    due: "Sep 30",
    team: ["Ivy Sun", "Rob Vale", "Nia Ford"],
    starred: true,
  },
  {
    id: "PRJ-098",
    name: "Multi-currency ledger migration",
    client: "Meridian Bank",
    description: "Consolidate EU and APAC ledgers into a single reporting currency engine.",
    stage: "Blocked",
    budget: "$210,000",
    progress: 38,
    due: "Oct 14",
    team: ["Sam Otto", "Lena Ray"],
    starred: true,
  },
  {
    id: "PRJ-112",
    name: "Automated payroll pipeline",
    client: "Northbeam Labs",
    description: "Schedule-driven payroll runs with approval gates and audit logging.",
    stage: "Planning",
    budget: "$54,000",
    progress: 12,
    due: "Nov 02",
    team: ["Tess Roe", "Omar Bey"],
    starred: false,
  },
  {
    id: "PRJ-087",
    name: "Vendor invoice OCR integration",
    client: "Pine & Co.",
    description: "Extract line items from scanned invoices and reconcile against purchase orders.",
    stage: "Complete",
    budget: "$32,400",
    progress: 100,
    due: "Jun 18",
    team: ["Jude Cole"],
    starred: false,
  },
  {
    id: "PRJ-120",
    name: "Sales forecasting dashboard",
    client: "Vertex Logistics",
    description: "Pipeline-weighted revenue projections with scenario modelling.",
    stage: "Active",
    budget: "$48,000",
    progress: 74,
    due: "Sep 08",
    team: ["Mara Lin", "Theo Park", "Kim Vu"],
    starred: false,
  },
])

const stageMeta: Record<Stage, { variant: "warning" | "success" | "destructive" | "secondary"; bar: string }> = {
  Planning: { variant: "secondary", bar: "bg-muted-foreground" },
  Active: { variant: "success", bar: "bg-primary" },
  Blocked: { variant: "destructive", bar: "bg-destructive" },
  Complete: { variant: "success", bar: "bg-success" },
}

const filters = ["All", "Active", "Planning", "Blocked", "Complete"] as const
const activeFilter = ref<(typeof filters)[number]>("All")
const query = ref("")

const filtered = computed(() =>
  projects.value.filter((p) => {
    const matchesStage = activeFilter.value === "All" || p.stage === activeFilter.value
    const q = query.value.toLowerCase()
    const matchesQuery =
      !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    return matchesStage && matchesQuery
  }),
)

function toggleStar(p: Project) {
  p.starred = !p.starred
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
        <p class="mt-1 text-sm text-muted-foreground">{{ filtered.length }} active engagements across your accounts.</p>
      </div>
      <Button variant="accent" size="sm"><Plus />New project</Button>
    </div>

    <!-- Controls -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative w-full sm:max-w-xs">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input v-model="query" placeholder="Search projects" class="pl-10" />
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="f in filters"
          :key="f"
          @click="activeFilter = f"
          class="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
          :class="activeFilter === f
            ? 'bg-foreground text-background'
            : 'bg-secondary text-muted-foreground hover:text-foreground'"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- List -->
    <div class="flex flex-col gap-3">
      <Card
        v-for="p in filtered"
        :key="p.id"
        class="group p-0 transition-all hover:border-primary/40 hover:shadow-md"
      >
        <div class="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
          <!-- Star + identity -->
          <div class="flex min-w-0 flex-1 items-start gap-3">
            <button
              @click="toggleStar(p)"
              class="mt-0.5 shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:text-warning"
              :aria-label="p.starred ? 'Unstar project' : 'Star project'"
            >
              <Star class="h-5 w-5" :class="p.starred ? 'fill-warning text-warning' : ''" />
            </button>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs text-muted-foreground">{{ p.id }}</span>
                <Badge :variant="stageMeta[p.stage].variant" size="sm">
                  <CircleDot class="h-3 w-3" />{{ p.stage }}
                </Badge>
              </div>
              <h3 class="mt-1 truncate font-display text-base font-semibold text-foreground">{{ p.name }}</h3>
              <p class="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{{ p.description }}</p>
              <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span class="flex items-center gap-1.5"><Building2 class="h-3.5 w-3.5" />{{ p.client }}</span>
                <span class="flex items-center gap-1.5"><Clock class="h-3.5 w-3.5" />Due {{ p.due }}</span>
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div class="w-full shrink-0 lg:w-44">
            <div class="mb-1.5 flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Progress</span>
              <span class="font-semibold text-foreground">{{ p.progress }}%</span>
            </div>
            <Progress :value="p.progress" variant="foreground" />
          </div>

          <!-- Budget -->
          <div class="shrink-0 lg:w-28 lg:text-right">
            <p class="font-display text-lg font-semibold text-foreground">{{ p.budget }}</p>
            <p class="text-xs text-muted-foreground">Budget</p>
          </div>

          <!-- Team + action -->
          <div class="flex shrink-0 items-center justify-between gap-4 lg:justify-end">
            <div class="flex -space-x-2">
              <Avatar
                v-for="member in p.team"
                :key="member"
                :name="member"
                size="sm"
                class="ring-2 ring-card"
              />
            </div>
            <ChevronRight class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
        </div>
      </Card>

      <div v-if="filtered.length === 0" class="rounded-3xl border border-dashed border-border py-16 text-center">
        <p class="text-sm text-muted-foreground">No projects match your filters.</p>
      </div>
    </div>
  </div>
</template>
