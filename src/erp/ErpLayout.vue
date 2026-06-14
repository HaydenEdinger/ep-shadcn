<script setup lang="ts">
import { ref, computed } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"
import {
  LayoutDashboard,
  Table2,
  KanbanSquare,
  ListChecks,
  Inbox,
  Activity,
  Search,
  Bell,
  Settings,
  Plus,
  Menu,
  X,
  ArrowLeft,
  Sun,
  Moon,
} from "lucide-vue-next"
import { useTheme } from "@/composables/useTheme"
import Button from "@/components/ui/Button.vue"
import Avatar from "@/components/ui/Avatar.vue"

const { isDark, toggleTheme } = useTheme()
const route = useRoute()
const mobileOpen = ref(false)

const nav = [
  { section: "Workspace", items: [
    { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
    { label: "Records", to: "/app/data", icon: Table2, badge: "1.2k" },
    { label: "Pipeline", to: "/app/board", icon: KanbanSquare },
    { label: "Tasks", to: "/app/list", icon: ListChecks, badge: "8" },
  ]},
  { section: "Communication", items: [
    { label: "Inbox", to: "/app/inbox", icon: Inbox, badge: "5" },
    { label: "Activity", to: "/app/activity", icon: Activity },
  ]},
]

const allItems = computed(() => nav.flatMap((g) => g.items))
const current = computed(
  () => allItems.value.find((i) => i.to === route.path)?.label ?? "Dashboard",
)
</script>

<template>
  <div class="min-h-dvh bg-background lg:flex">
    <!-- Mobile overlay -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
      @click="mobileOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-6 bg-foreground p-5 text-background transition-transform duration-300 lg:static lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <span class="flex size-10 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground">
            L
          </span>
          <span class="font-display text-lg font-semibold">Ledgerix</span>
        </RouterLink>
        <button
          class="rounded-full p-2 text-background/60 hover:bg-background/10 lg:hidden"
          aria-label="Close menu"
          @click="mobileOpen = false"
        >
          <X class="size-5" />
        </button>
      </div>

      <!-- Workspace switcher -->
      <button class="flex items-center gap-3 rounded-2xl bg-background/10 p-3 text-left transition-colors hover:bg-background/15">
        <span class="flex size-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground">
          NV
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-medium">Northwind Ventures</span>
          <span class="block truncate text-xs text-background/50">Enterprise plan</span>
        </span>
      </button>

      <nav class="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div v-for="group in nav" :key="group.section" class="flex flex-col gap-1">
          <p class="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-background/40">
            {{ group.section }}
          </p>
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            :class="route.path === item.to
              ? 'bg-accent text-accent-foreground'
              : 'text-background/70 hover:bg-background/10 hover:text-background'"
            @click="mobileOpen = false"
          >
            <component :is="item.icon" class="size-[18px]" />
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              :class="route.path === item.to ? 'bg-accent-foreground/15 text-accent-foreground' : 'bg-background/10 text-background/70'"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </div>
      </nav>

      <!-- Upgrade card -->
      <div class="rounded-2xl bg-background/10 p-4">
        <p class="font-display text-sm font-semibold">Close the quarter faster</p>
        <p class="mt-1 text-xs text-background/60">Automate reconciliations with AI insights.</p>
        <Button variant="accent" size="sm" class="mt-3 w-full">Enable insights</Button>
      </div>

      <div class="flex items-center gap-3 border-t border-background/10 pt-4">
        <Avatar fallback="MH" class="bg-background/10 text-background" />
        <div class="min-w-0 flex-1 text-sm">
          <p class="truncate font-medium">Marcus Hale</p>
          <p class="truncate text-xs text-background/50">marcus@northwind.io</p>
        </div>
        <button class="rounded-full p-2 text-background/60 hover:bg-background/10" aria-label="Settings">
          <Settings class="size-[18px]" />
        </button>
      </div>
    </aside>

    <!-- Main column -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Topbar -->
      <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
        <button
          class="rounded-full p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          aria-label="Open menu"
          @click="mobileOpen = true"
        >
          <Menu class="size-5" />
        </button>

        <RouterLink to="/" class="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground sm:flex">
          <ArrowLeft class="size-4" />
          Design system
        </RouterLink>

        <div class="hidden h-6 w-px bg-border sm:block" />

        <h1 class="font-display text-lg font-semibold">{{ current }}</h1>

        <div class="ml-auto flex items-center gap-2">
          <div class="relative hidden md:block">
            <Search class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search records, people…"
              class="h-10 w-56 rounded-full border border-input bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 lg:w-72"
            />
          </div>

          <Button variant="ghost" size="icon" aria-label="Toggle theme" @click="toggleTheme">
            <Sun v-if="isDark" />
            <Moon v-else />
          </Button>

          <button class="relative rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary" aria-label="Notifications">
            <Bell class="size-5" />
            <span class="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-background" />
          </button>

          <Button variant="accent" size="sm" class="hidden sm:inline-flex">
            <Plus />
            New
          </Button>
        </div>
      </header>

      <main class="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
