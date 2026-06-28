<script setup lang="ts">
import { ref, computed } from "vue"
import {
  Mail,
  MessageCircle,
  Phone,
  Slack,
  Send,
  Paperclip,
  Star,
  Archive,
  CornerUpLeft,
  Sparkles,
  Search,
} from "lucide-vue-next"
import Badge from "@/components/ui/Badge.vue"
import Avatar from "@/components/ui/Avatar.vue"
import Button from "@/components/ui/Button.vue"
import Input from "@/components/ui/Input.vue"

type Channel = "email" | "chat" | "sms" | "slack"
interface Message {
  from: "them" | "me"
  body: string
  time: string
}
interface Conversation {
  id: string
  name: string
  company: string
  channel: Channel
  preview: string
  time: string
  unread: number
  tag: string
  online: boolean
  messages: Message[]
}

const channelMeta: Record<
  Channel,
  { icon: any; label: string; class: string }
> = {
  email: { icon: Mail, label: "Email", class: "bg-primary text-primary-foreground" },
  chat: { icon: MessageCircle, label: "Live chat", class: "bg-accent text-accent-foreground" },
  sms: { icon: Phone, label: "SMS", class: "bg-success text-success-foreground" },
  slack: { icon: Slack, label: "Slack", class: "bg-warning text-warning-foreground" },
}

const conversations = ref<Conversation[]>([
  {
    id: "c1",
    name: "Dana Whitfield",
    company: "Atlas Logistics",
    channel: "email",
    preview: "Can you confirm the revised SLA covers the APAC warehouses too?",
    time: "2m",
    unread: 2,
    tag: "Billing",
    online: true,
    messages: [
      { from: "them", body: "Hi — we received the updated contract draft, thanks for the quick turnaround.", time: "9:41 AM" },
      { from: "them", body: "Can you confirm the revised SLA covers the APAC warehouses too?", time: "9:42 AM" },
    ],
  },
  {
    id: "c2",
    name: "Marcus Lee",
    company: "Vertex Logistics",
    channel: "chat",
    preview: "The dashboard export is timing out on large date ranges.",
    time: "18m",
    unread: 1,
    tag: "Support",
    online: true,
    messages: [
      { from: "them", body: "Hey, the dashboard export is timing out on large date ranges.", time: "9:25 AM" },
      { from: "me", body: "Thanks for flagging — how many months are you exporting at once?", time: "9:28 AM" },
      { from: "them", body: "Usually a full year of invoices.", time: "9:29 AM" },
    ],
  },
  {
    id: "c3",
    name: "Priya Nair",
    company: "Meridian Bank",
    channel: "sms",
    preview: "Approved. Please proceed with the ledger migration window.",
    time: "1h",
    unread: 0,
    tag: "Approvals",
    online: false,
    messages: [
      { from: "me", body: "We're ready to schedule the migration for this weekend. Approve?", time: "Yesterday" },
      { from: "them", body: "Approved. Please proceed with the ledger migration window.", time: "8:15 AM" },
    ],
  },
  {
    id: "c4",
    name: "Northbeam Labs",
    company: "#payroll-project",
    channel: "slack",
    preview: "Omar: The approval gate config looks good on staging.",
    time: "3h",
    unread: 0,
    tag: "Project",
    online: true,
    messages: [
      { from: "them", body: "The approval gate config looks good on staging.", time: "6:50 AM" },
      { from: "me", body: "Great — I'll promote it to production after the payroll run.", time: "7:02 AM" },
    ],
  },
  {
    id: "c5",
    name: "Sofia Delgado",
    company: "Pine & Co.",
    channel: "email",
    preview: "Attaching the reconciled invoices for Q2 — let me know if anything's off.",
    time: "5h",
    unread: 0,
    tag: "Finance",
    online: false,
    messages: [
      { from: "them", body: "Attaching the reconciled invoices for Q2 — let me know if anything's off.", time: "5:30 AM" },
    ],
  },
])

const channelFilters = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "email", label: "Email", icon: Mail },
  { key: "chat", label: "Chat", icon: MessageCircle },
  { key: "sms", label: "SMS", icon: Phone },
  { key: "slack", label: "Slack", icon: Slack },
] as const

const activeChannel = ref<(typeof channelFilters)[number]["key"]>("all")
const activeId = ref("c1")
const draft = ref("")

const filtered = computed(() =>
  conversations.value.filter((c) => activeChannel.value === "all" || c.channel === activeChannel.value),
)
const active = computed(() => conversations.value.find((c) => c.id === activeId.value) ?? conversations.value[0])

function select(id: string) {
  activeId.value = id
  const c = conversations.value.find((x) => x.id === id)
  if (c) c.unread = 0
}
function send() {
  if (!draft.value.trim()) return
  active.value.messages.push({ from: "me", body: draft.value.trim(), time: "Now" })
  draft.value = ""
}
const totalUnread = computed(() => conversations.value.reduce((s, c) => s + c.unread, 0))
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight text-foreground">Inbox</h1>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ totalUnread }} unread across {{ conversations.length }} conversations.
        </p>
      </div>
      <Button variant="accent" size="sm"><Sparkles />Compose</Button>
    </div>

    <div class="grid h-[calc(100vh-13rem)] grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[340px_1fr]">
      <!-- Conversation list -->
      <div class="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
        <div class="border-b border-border p-3">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations" class="pl-10" />
          </div>
          <div class="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              v-for="f in channelFilters"
              :key="f.key"
              @click="activeChannel = f.key"
              class="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
              :class="activeChannel === f.key
                ? 'bg-foreground text-background'
                : 'bg-secondary text-muted-foreground hover:text-foreground'"
            >
              <component :is="f.icon" class="h-3.5 w-3.5" />{{ f.label }}
            </button>
          </div>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto">
          <button
            v-for="c in filtered"
            :key="c.id"
            @click="select(c.id)"
            class="flex w-full gap-3 border-b border-border p-3.5 text-left transition-colors"
            :class="activeId === c.id ? 'bg-secondary' : 'hover:bg-secondary/50'"
          >
            <div class="relative shrink-0">
              <Avatar :name="c.name" size="default" />
              <span
                class="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-card"
                :class="channelMeta[c.channel].class"
              >
                <component :is="channelMeta[c.channel].icon" class="h-2.5 w-2.5" />
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2">
                <span class="truncate text-sm font-semibold text-foreground">{{ c.name }}</span>
                <span class="shrink-0 text-xs text-muted-foreground">{{ c.time }}</span>
              </div>
              <p class="truncate text-xs text-muted-foreground">{{ c.company }}</p>
              <p class="mt-1 line-clamp-1 text-xs text-muted-foreground">{{ c.preview }}</p>
            </div>
            <span
              v-if="c.unread"
              class="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground"
            >
              {{ c.unread }}
            </span>
          </button>
        </div>
      </div>

      <!-- Thread -->
      <div class="flex min-h-0 flex-col">
        <!-- Thread header -->
        <div class="flex items-center justify-between gap-3 border-b border-border p-4">
          <div class="flex min-w-0 items-center gap-3">
            <Avatar :name="active.name" size="default" />
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h2 class="truncate font-semibold text-foreground">{{ active.name }}</h2>
                <span v-if="active.online" class="flex items-center gap-1 text-xs text-success">
                  <span class="h-1.5 w-1.5 rounded-full bg-success" />online
                </span>
              </div>
              <p class="truncate text-xs text-muted-foreground">{{ active.company }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <Badge :class="channelMeta[active.channel].class" size="sm">
              <component :is="channelMeta[active.channel].icon" class="h-3 w-3" />
              {{ channelMeta[active.channel].label }}
            </Badge>
            <Button variant="ghost" size="icon" aria-label="Star"><Star /></Button>
            <Button variant="ghost" size="icon" aria-label="Archive"><Archive /></Button>
          </div>
        </div>

        <!-- Messages -->
        <div class="min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/30 p-5">
          <div
            v-for="(m, i) in active.messages"
            :key="i"
            class="flex"
            :class="m.from === 'me' ? 'justify-end' : 'justify-start'"
          >
            <div class="max-w-[78%]">
              <div
                class="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                :class="m.from === 'me'
                  ? 'rounded-br-sm bg-foreground text-background'
                  : 'rounded-bl-sm border border-border bg-card text-foreground'"
              >
                {{ m.body }}
              </div>
              <p class="mt-1 px-1 text-[11px] text-muted-foreground" :class="m.from === 'me' ? 'text-right' : ''">
                {{ m.time }}
              </p>
            </div>
          </div>
        </div>

        <!-- Composer -->
        <div class="border-t border-border p-3">
          <div class="flex items-end gap-2 rounded-2xl border border-border bg-card p-2">
            <Button variant="ghost" size="icon" aria-label="Attach"><Paperclip /></Button>
            <input
              v-model="draft"
              type="text"
              placeholder="Write a reply..."
              class="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              @keydown.enter="send"
            />
            <Button variant="outline" size="sm" class="hidden sm:inline-flex"><CornerUpLeft />Reply all</Button>
            <Button variant="accent" size="icon" aria-label="Send" @click="send"><Send /></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
