<template>
  <div>
    <Button
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
      class="wobble-hor-bottom"
    ><i class="pi pi-bars"></i></Button>

    <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true">
    </TieredMenu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { items } from "@/components/layout-ui/toggleMenuList.js";
const menu = ref();

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
