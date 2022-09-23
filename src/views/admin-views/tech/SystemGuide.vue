<template>
  <div class="mb-2">
    <Button
      label="Restaurant name"
      class="p-button-secondary bg-white p-button-text mr-1 my-1"
    />
    <Button
      @click="activeTab = 1"
      class="p-button bg-white text-primary mx-1 my-1"
      label="Store Info"
    />
    <Button
      @click="activeTab = 2"
      class="p-button bg-white text-primary mx-1 my-1"
      label="Contact"
    />
    <Button
      @click="activeTab = 3"
      class="p-button bg-white text-primary mx-1 my-1"
      label="Ticket"
    />
    <Button
      @click="activeTab = 4"
      class="p-button bg-white text-primary mx-1 my-1"
      label="Dvice"
    />
    <Button
      @click="activeTab = 5"
      class="p-button bg-white text-primary mx-1 my-1"
      label="TeamViewer"
    />
    <Button
      @click="activeTab = 5"
      class="p-button bg-white text-primary mx-1 my-1"
      label="Files"
    />
  </div>

  <div v-if="activeTab == 1">
    <Company :companyId="companyId" />
    <div class="mt-3">
      <Store :storeId="storeId"  />
    </div>
  </div>

  <div v-if="activeTab == 2">
    <Contact :storeId="storeId" :companyId="companyId"/>
  </div>

  <div v-if="activeTab == 3">
    <Ticket :storeId="storeId" />
  </div>

  <div v-if="activeTab == 4">
    <Device />
  </div>

  <div v-if="activeTab == 5">
    <TeamViewer />
  </div>
</template>

<script setup>
import Company from "../customers/Company.vue";
import Store from "../customers/Store.vue";
import Contact from "../customers/Contact.vue";
import Ticket from "./Ticket.vue";
import Device from "./Device.vue";
import TeamViewer from "./TeamViewer.vue";

import { provide, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const storeId = route.params.storeId;
const companyId = route.params.companyId;


const props = defineProps(["storeData"])
// const storeId = ref(route.params.storeId);
// const companyId = ref(route.params.companyId);

// watch(route, () => {
//   companyId.value = undefined;
//   storeId.value = undefined;
//   console.log("release IDs")
// });

const activeTab = ref(1);
// provide(/* key */ "storeId", /* value */ storeId);
// provide(/* key */ "companyId", /* value */ companyId);
provide(/* key */ "isSingleView", /* value */ "true");
</script>
