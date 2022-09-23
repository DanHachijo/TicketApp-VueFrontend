import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/members/user";

import Dashboard from "@/views/admin-views/Dashboard.vue";
import LayoutView from "@/components/layout-ui/LayoutView.vue";
// Customers
import Company from "@/views/admin-views/customers/Company.vue";
import Store from "@/views/admin-views/customers/Store.vue";
import Contact from "@/views/admin-views/customers/Contact.vue";
// Sales
import Estimates from "@/views/admin-views/sales/Estimates.vue";
import Products from "@/views/admin-views/sales/Products.vue";
import ProjectLogs from "@/views/admin-views/sales/ProjectLogs.vue";
import Vendors from "@/views/admin-views/sales/Vendors.vue";
// Members
import Office from "@/views/admin-views/team/Office.vue";
import Members from "@/views/admin-views/team/Members.vue";
// Tech
import WebPortal from "@/views/admin-views/tech/WebPortal.vue";
import UserLoginList from "@/views/admin-views/tech/UserLoginList.vue";
import Manual from "@/views/admin-views/tech/Manual.vue";
import Ticket from "@/views/admin-views/tech/Ticket.vue";
import TeamViewer from "@/views/admin-views/tech/TeamViewer.vue";
import Device from "@/views/admin-views/tech/Device.vue";
// SystemGuide
import SystemGuide from "@/views/admin-views/tech/SystemGuide.vue";
// Login
import LoginView from "@/views/LoginView.vue";

// const userPinia = useUserStore()

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
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
        meta: { requiresAuth: true },
      },
      // Sales
      {
        path: "/estimates",
        name: "Estimates",
        component: Estimates,
        meta: { requiresAuth: true },
      },
      {
        path: "/products",
        name: "Products",
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: "/project-logs",
        name: "ProjectLogs",
        component: ProjectLogs,
        meta: { requiresAuth: true },
      },
      {
        path: "/vendors",
        name: "Vendors",
        component: Vendors,
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
        path: "/web-portal",
        name: "WebPortal",
        component: WebPortal,
        meta: { requiresAuth: true },
      },
      {
        path: "/user-login-list",
        name: "UserLoginList",
        component: UserLoginList,
        meta: { requiresAuth: true },
      },
      {
        path: "/manual",
        name: "Manual",
        component: Manual,
        meta: { requiresAuth: true },
      },
      {
        path: "/ticket",
        name: "Ticket",
        component: Ticket,
        meta: { requiresAuth: true },
      },
      // {
      //   path: "/system-guide",
      //   name: "SystemGuide",
      //   component: SystemGuide,
      //   meta: { requiresAuth: true },
      // },
      {
        path: "/teamviewer",
        name: "TeamViewer",
        component: TeamViewer,
        meta: { requiresAuth: true },
      },
      {
        path: "/device",
        name: "Device",
        component: Device,
        meta: { requiresAuth: true },
      },
      // SystemGuide
      {
        path: "system-guide/:companyId/:storeId",
        name: "system-guide",
        component: SystemGuide,
        meta: { requiresAuth: true },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const router = createRouter({
//   history: process.env.IS_ELECTRON
//     ? createWebHashHistory()
//     : createWebHistory(),
//   routes,
// });

// router.beforeEach((to) => {
//   if (to.meta.requiresAuth && userPinia.token.value === null) {
//     return { name: "login" };
//   }
// });

router.beforeEach((to) => {
  if (to.meta.requiresAuth && localStorage.getItem("token") === "") {
    return { name: "login" };
  }
});

// const router = createRouter({
//   history: process.env.IS_ELECTRON
//     ? createWebHashHistory()
//     : createWebHistory(),
//   routes,
// });
export default router;
