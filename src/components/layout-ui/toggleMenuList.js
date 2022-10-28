import { ref } from "vue";

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-chart-line",
    to: "/dashboard",
  },
  
  {
    label: "Tech",
    icon: "pi pi-fw pi-database",
    items: [
      {
        label: "Tickets",
        to: "/ticket",
      },
    ],
  },
  {
    label: "Cusotmers",
    icon: "pi pi-fw pi-building",
    items: [
      {
        label: "Company",
        to: "/company",
      },
      {
        label: "Store",
        to: "/store",
      },
      // {
      //   label: "Contact",
      //   to: "/contact",
      // },
    ],
  },

  {
    label: "Team",
    icon: "pi pi-fw pi-users",
    items: [
      {
        label: "Office",
        to: "/office",
      },
      {
        label: "Members",
        to: "/members",
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: "Log Out",
    icon: "pi pi-fw pi-power-off",
    to: "/login",
    // command:userPinia.logOut()
  },
]);

export { items };
