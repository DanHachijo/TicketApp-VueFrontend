import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/members/user";

import Dashboard from "@/views/admin-views/Dashboard.vue";
import LayoutView from "@/components/layout-ui/LayoutView.vue";
// Customers
import Company from "@/views/admin-views/customers/Company.vue";
import Store from "@/views/admin-views/customers/Store.vue";

// Members
import Office from "@/views/admin-views/team/Office.vue";
import Members from "@/views/admin-views/team/Members.vue";
// Tech
import Ticket from "@/views/admin-views/tech/Ticket.vue";
// Login
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    component: LayoutView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },

      {
        path: "/company",
        name: "Company",
        component: Company,
        meta: { requiresAuth: true },
      },
      {
        path: "/store",
        name: "Store",
        component: Store,
        meta: { requiresAuth: true },
      },

      
      // Team
      {
        path: "/office",
        name: "Office",
        component: Office,
        meta: { requiresAuth: true },
      },
      {
        path: "/members",
        name: "Members",
        component: Members,
        meta: { requiresAuth: true },
      },
      // Tech
      {
        path: "/ticket",
        name: "Ticket",
        component: Ticket,
        meta: { requiresAuth: true },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && localStorage.getItem("token") === "") {
    return { name: "login" };
  }
});

export default router;
