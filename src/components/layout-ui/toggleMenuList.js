import { ref } from "vue";

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-chart-line",
    to: '/',
  },
  {
    label: "Cusotmers",
    icon: "pi pi-fw pi-building",
    items: [
      {
        label: "Company",
        to: '/company',
      },
      {
        label: "Store",
        to: '/store',
      },
      {
        label: "Contact",
        to: '/contact',
      },
      {
        separator: true,
      },
      {
        label: "Guide",
      },
    ],
  }, 
  {
    label: "Tech",
    icon: "pi pi-fw pi-database",
    items: [
      {
        label: "Support Logs",
        to: '/support-logs',
      },
      {
        label: "System Guide",
        to: '/system-guide',
      },
      {
        label: "TeamViewer",
        to: '/teamviewer',
      },
      {
        label: "FOODIT",
        to: '/foodit',
      },
      {
        label: "Manual",
        to: '/manual',
      },
      {
        separator: true,
      },
      {
        label: "Guide",
      },
    ],
  }, 
  {
    label: "Sales",
    icon: "pi pi-fw pi-briefcase",
    items: [
      {
        label: "Project Logs",
        to: '/project-logs',
      },
      {
        label: "Vendors",
        to: '/vendors',
      },
      {
        label: "Products",
        to: '/products',
      },
      {
        label: "Estimates",
        to: '/estimates',
      },
      {
        separator: true,
      },
      {
        label: "Guide",
      },
    ],
  }, 
  {
    label: "Team",
    icon: "pi pi-fw pi-users",
    items: [
      {
        label: "Office",
        to: '/office',
      },
      {
        label: "Members",
        to: '/members',
      },
    ],
  }, 
  {
    separator: true,
  },
  {
    label: "Log Out",
    icon: "pi pi-fw pi-power-off",
  },
]);

export {items}; 