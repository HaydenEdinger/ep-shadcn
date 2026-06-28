<script setup lang="ts">
import { ref } from "vue"
import { Plus, MoreHorizontal, MessageSquare, Paperclip, CalendarDays } from "lucide-vue-next"
import Badge from "@/components/ui/Badge.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Button from "@/components/ui/Button.vue"

type Priority = "low" | "medium" | "high"
interface Task {
  id: string
  title: string
  tag: string
  priority: Priority
  value: string
  comments: number
  files: number
  due: string
  assignees: { name: string; src?: string }[]
}
interface Column {
  id: string
  title: string
  accent: string
  tasks: Task[]
}

const columns = ref<Column[]>([
  {
    id: "backlog",
    title: "Backlog",
    accent: "bg-muted-foreground",
    tasks: [
      {
        id: "t1",
        title: "Renew enterprise license for Northwind Traders",
        tag: "Sales",
        priority: "medium",
        value: "$48,000",
        comments: 3,
        files: 2,
        due: "Aug 12",
        assignees: [{ name: "Mara Lin" }, { name: "Theo Park" }],
      },
      {
        id: "t2",
        title: "Audit Q2 vendor invoices for discrepancies",
        tag: "Finance",
        priority: "low",
        value: "$12,400",
        comments: 1,
        files: 5,
        due: "Aug 19",
        assignees: [{ name: "Jude Cole" }],
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    accent: "bg-primary",
    tasks: [
      {
        id: "t3",
        title: "Onboard Atlas Logistics to the procurement module",
        tag: "Onboarding",
        priority: "high",
        value: "$96,500",
        comments: 8,
        files: 4,
        due: "Aug 09",
        assignees: [{ name: "Ivy Sun" }, { name: "Rob Vale" }, { name: "Nia Ford" }],
      },
      {
        id: "t4",
        title: "Reconcile multi-currency ledger for EU region",
        tag: "Finance",
        priority: "high",
        value: "$210,000",
        comments: 5,
        files: 9,
        due: "Aug 07",
        assignees: [{ name: "Sam Otto" }],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    accent: "bg-warning",
    tasks: [
      {
        id: "t5",
        title: "Approve revised SLA terms for Meridian Bank",
        tag: "Legal",
        priority: "medium",
        value: "$135,000",
        comments: 2,
        files: 3,
        due: "Aug 05",
        assignees: [{ name: "Lena Ray" }, { name: "Cole Diaz" }],
      },
    ],
  },
  {
    id: "done",
    title: "Closed",
    accent: "bg-success",
    tasks: [
      {
        id: "t6",
        title: "Deploy automated payroll run for September",
        tag: "Operations",
        priority: "low",
        value: "$78,200",
        comments: 0,
        files: 6,
        due: "Done",
        assignees: [{ name: "Tess Roe" }],
      },
      {
        id: "t7",
        title: "Migrate warehouse inventory to new SKU schema",
        tag: "Inventory",
        priority: "medium",
        value: "$54,000",
        comments: 4,
        files: 1,
        due: "Done",
        assignees: [{ name: "Omar Bey" }, { name: "Kim Vu" }],
      },
    ],
  },
])

const priorityVariant: Record<Priority, "destructive" | "warning" | "secondary"> = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
}

const draggingId = ref<string | null>(null)
const fromCol = ref<string | null>(null)
const overCol = ref<string | null>(null)

function onDragStart(taskId: string, colId: string) {
  draggingId.value = taskId
  fromCol.value = colId
}
function onDrop(targetColId: string) {
  if (!draggingId.value || !fromCol.value) return
  const source = columns.value.find((c) => c.id === fromCol.value)
  const target = columns.value.find((c) => c.id === targetColId)
  if (!source || !target) return
  const idx = source.tasks.findIndex((t) => t.id === draggingId.value)
  if (idx === -1) return
  const [task] = source.tasks.splice(idx, 1)
  target.tasks.unshift(task)
  draggingId.value = null
  fromCol.value = null
  overCol.value = null
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-foreground">Deal pipeline</h1>
        <p class="mt-1 text-sm text-muted-foreground">Drag cards across stages to update their status.</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">Filter</Button>
        <Button variant="accent" size="sm"><Plus />New deal</Button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="col in columns"
        :key="col.id"
        class="flex flex-col rounded-3xl border border-border bg-muted/40 p-3 transition-colors"
        :class="overCol === col.id ? 'border-primary bg-primary/5' : ''"
        @dragover.prevent="overCol = col.id"
        @dragleave="overCol = overCol === col.id ? null : overCol"
        @drop="onDrop(col.id)"
      >
        <div class="flex items-center justify-between px-2 py-1.5">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full" :class="col.accent" />
            <h2 class="text-sm font-semibold text-foreground">{{ col.title }}</h2>
            <span class="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {{ col.tasks.length }}
            </span>
          </div>
          <button class="rounded-lg p-1 text-muted-foreground hover:bg-background" aria-label="Column options">
            <MoreHorizontal class="h-4 w-4" />
          </button>
        </div>

        <div class="flex flex-col gap-3 p-1">
          <article
            v-for="task in col.tasks"
            :key="task.id"
            draggable="true"
            @dragstart="onDragStart(task.id, col.id)"
            @dragend="draggingId = null"
            class="group cursor-grab rounded-2xl border border-border bg-background p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md active:cursor-grabbing"
            :class="draggingId === task.id ? 'rotate-1 opacity-50' : ''"
          >
            <div class="flex items-center justify-between">
              <Badge variant="outline" size="sm">{{ task.tag }}</Badge>
              <Badge :variant="priorityVariant[task.priority]" size="sm" class="capitalize">{{ task.priority }}</Badge>
            </div>
            <h3 class="mt-3 text-sm font-medium leading-snug text-foreground text-pretty">{{ task.title }}</h3>
            <p class="mt-3 font-display text-lg font-semibold text-foreground">{{ task.value }}</p>

            <div class="mt-4 flex items-center justify-between border-t border-border pt-3">
              <div class="flex -space-x-2">
                <Avatar
                  v-for="a in task.assignees"
                  :key="a.name"
                  :name="a.name"
                  size="sm"
                  class="ring-2 ring-background"
                />
              </div>
              <div class="flex items-center gap-3 text-xs text-muted-foreground">
                <span class="flex items-center gap-1"><CalendarDays class="h-3.5 w-3.5" />{{ task.due }}</span>
                <span class="flex items-center gap-1"><MessageSquare class="h-3.5 w-3.5" />{{ task.comments }}</span>
                <span class="flex items-center gap-1"><Paperclip class="h-3.5 w-3.5" />{{ task.files }}</span>
              </div>
            </div>
          </article>

          <button
            class="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Plus class="h-4 w-4" />Add card
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
