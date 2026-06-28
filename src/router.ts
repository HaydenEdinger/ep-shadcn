import { createRouter, createWebHistory } from "vue-router"

import DesignSystem from "@/pages/DesignSystem.vue"
import ErpLayout from "@/erp/ErpLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: "/", name: "design-system", component: DesignSystem },
    {
      path: "/app",
      component: ErpLayout,
      children: [
        { path: "", redirect: "/app/dashboard" },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/erp/pages/DashboardPage.vue"),
        },
        {
          path: "data",
          name: "data-grid",
          component: () => import("@/erp/pages/DataGridPage.vue"),
        },
        {
          path: "board",
          name: "board",
          component: () => import("@/erp/pages/KanbanPage.vue"),
        },
        {
          path: "list",
          name: "list",
          component: () => import("@/erp/pages/ListPage.vue"),
        },
        {
          path: "inbox",
          name: "inbox",
          component: () => import("@/erp/pages/InboxPage.vue"),
        },
        {
          path: "activity",
          name: "activity",
          component: () => import("@/erp/pages/ActivityPage.vue"),
        },
      ],
    },
  ],
})

export default router
