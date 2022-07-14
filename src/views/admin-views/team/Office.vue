<template>
  <DataTable :data="products">
    <template #header>
      OFFICE
    </template>
    <template #column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="street" header="Street"></Column>
      <Column field="suite" header="Suite"></Column>
      <Column field="city" header="City"></Column>
      <Column field="state" header="State"></Column>
      <Column field="zip" header="Zip"></Column>
      <Column field="phone" header="Phone"></Column>
    </template>
  </DataTable>
</template>

<script setup>
import { ref } from "vue";
import DataTable from "@/components/layout-ui/table/DataTable.vue";

const products = ref([
  {
    id: "1000",
    name: "Tokyo Office",
    street: "123 Main St",
    suite: "123",
    city: "Tokyo",
    state: "Tokyo",
    zip: "12312",
    phone: "12312",
    is_active: true,
  },
  {
    id: "1001",
    name: "NY Office",
    street: "123 Main St",
    suite: "123",
    city: "New York",
    state: "New York",
    zip: "12312",
    phone: "12312",
    is_active: true,
  },
]);
</script>
