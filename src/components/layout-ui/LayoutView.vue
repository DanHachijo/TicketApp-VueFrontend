<template>
  <div class="flex justify-content-center min-w-full">
    <div id="app-container" class="m-4 flex-grow-1">
      <div
        class="flex min-h-50 surface-ground border-round p-1 flex justify-content-between m-2"
      >
        <span class="flex align-items-center m-2">
          <ToggleMenu></ToggleMenu>
        </span>
        <h2 class="title-font flex align-items-center justify-content-center">
          Ticket App Demo
        </h2>
        <h2 class="flex align-items-center justify-content-center mx-3">
          <span class="title-font"
            >Hi, {{ userPinia.loggedinUser || "User" }}</span
          >
        </h2>
      </div>

      <div class="m-2">
        <Card>
          <template #content><router-view></router-view></template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggleMenu from "@/components/layout-ui/ToggleMenu.vue";
import { ref } from "vue";

import { useUserStore } from "@/stores/members/user";

const userPinia = useUserStore();
</script>

<style>
#app-container {
  max-width: 1200px;
}

</style>
