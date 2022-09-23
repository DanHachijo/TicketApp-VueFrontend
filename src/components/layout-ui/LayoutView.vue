<template>
  <div
    class="flex min-h-50 surface-ground border-round p-1 flex justify-content-between m-2"
  >
    <span class="flex align-items-center m-2">
      <ToggleMenu></ToggleMenu>
    </span>
    <h2 class="flex align-items-center justify-content-center">CRUD APP</h2>
    <h2 class="flex align-items-center justify-content-center mx-3">
      <span>Hi, {{ userPinia.loggedinUser || "User" }}</span>
    </h2>
  </div>

  <div class="m-2">
    <!-- <Card>
      <template #content><router-view></router-view></template>
    </Card> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import ToggleMenu from "@/components/layout-ui/ToggleMenu.vue";
import { ref } from "vue";

import { useUserStore } from "@/stores/members/user";

const userPinia = useUserStore();
</script>
