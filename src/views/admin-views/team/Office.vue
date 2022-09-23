<template>
  <GlobalDataTable
    :data="officePinia.data"
    :key="officePinia.data"
    :reloadTable="officePinia.reloadTable"
    tableName="office"
    :isHideOption="true"
    :isHideCreate="true"
  >
    <template #column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="street" header="Street"></Column>
      <Column field="suite" header="Suite"></Column>
      <Column field="city" header="City"></Column>
      <Column field="state" header="State"></Column>
      <Column field="zip" header="Zip"></Column>
      <Column field="phone" header="Phone"></Column>
    </template>
  </GlobalDataTable>

  <!-- <OfficeForm ref="refForm" /> -->
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useOfficeStore } from "@/stores/members/office";
// import OfficeForm from "@/components/layout-ui/form/member/OfficeForm.vue";

const officePinia = useOfficeStore();
officePinia.getData();

// const refForm = ref(null);
// const defaultInput = ref(null);

// const createForm = (data) => refForm.value.openModal(data, "create");
// const viewForm = (data) => refForm.value.openModal(data, "view");
// const editForm = (data) => refForm.value.openModal(data, "edit");
// const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
