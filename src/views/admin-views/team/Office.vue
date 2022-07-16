<template>
  <DataTable
    :data="officePinia.data"
    :key="officePinia.data"
    :reloadTable="officePinia.getData"
    :CreateNewBtn="openModal"
  >
    <template #header> OFFICE </template>
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
import { useOfficeStore } from "@/stores/members/office";
import OfficeForm from "@/components/layout-ui/form/member/OfficeForm.vue";

const officePinia = useOfficeStore();


</script>
