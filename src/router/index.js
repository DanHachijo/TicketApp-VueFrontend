import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/admin-views/Dashboard.vue'
// Customers
import Company from '@/views/admin-views/customers/Company.vue'
import Store from '@/views/admin-views/customers/Store.vue'
import Contact from '@/views/admin-views/customers/Contact.vue'
// Sales
import Estimates from '@/views/admin-views/sales/Estimates.vue'
import Products from '@/views/admin-views/sales/Products.vue'
import ProjectLogs from '@/views/admin-views/sales/ProjectLogs.vue'
import Vendors from '@/views/admin-views/sales/Vendors.vue'
// Members
import Office from '@/views/admin-views/team/Office.vue'
import Members from '@/views/admin-views/team/Members.vue'
// Tech
import Foodit from '@/views/admin-views/tech/Foodit.vue'
import Manual from '@/views/admin-views/tech/Manual.vue'
import SupportLogs from '@/views/admin-views/tech/SupportLogs.vue'
import SystemGuide from '@/views/admin-views/tech/SystemGuide.vue'
import TeamViewer from '@/views/admin-views/tech/TeamViewer.vue'
// Login
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
// Customers
  {
    path: '/company',
    name: 'Company',
    component: Company
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
// Sales
  {
    path: '/estimates',
    name: 'Estimates',
    component: Estimates
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/project-logs',
    name: 'ProjectLogs',
    component: ProjectLogs
  },
  {
    path: '/vendors',
    name: 'Vendors',
    component: Vendors
  },
// Team
  {
    path: '/office',
    name: 'Office',
    component: Office
  },
  {
    path: '/members',
    name: 'Members',
    component: Members
  },
// Tech
  {
    path: '/foodit',
    name: 'Foodit',
    component: Foodit
  },
  {
    path: '/manual',
    name: 'Manual',
    component: Manual
  },
  {
    path: '/support-logs',
    name: 'SupportLogs',
    component: SupportLogs
  },
  {
    path: '/system-guide',
    name: 'SystemGuide',
    component: SystemGuide
  },
  {
    path: '/teamviewer',
    name: 'TeamViewer',
    component: TeamViewer
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// const router = createRouter({
//   history: process.env.IS_ELECTRON
//     ? createWebHashHistory()
//     : createWebHistory(),
//   routes,
// });
export default router