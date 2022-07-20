<template>
  <DataTable
    :data="companyPinia.data"
    :reloadTable="companyPinia.reloadTable"
    :key="companyPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
  >
    <template #header> COMPANY </template>
    <template #column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="companyID" header="CompanyID"></Column>
      <Column field="street" header="Street"></Column>
      <Column field="suite" header="Suite"></Column>
      <Column field="city" header="City"></Column>
      <Column field="state" header="State"></Column>
      <Column field="zipcode" header="Zipcode"></Column>
      <Column field="memo" header="Memo"></Column>
      <Column field="Date" header="date"></Column>
      <Column field="is_customer" header="Contract"></Column>
      <Column field="is_prospect" header="Prospect"></Column>
      <Column field="is_active" header="Status"></Column>
      <Column field="date" header="Last Updated"></Column>
    </template>
  </DataTable>


  <CompanyForm ref="refForm"/>

</template>

<script setup>
import { ref } from "vue";
import DataTable from "@/components/layout-ui/table/DataTable.vue";
import { useCompanyStore } from "@/stores/customers/company";
import CompanyForm from "@/components/layout-ui/form/customers/CompanyForm.vue";

const companyPinia = useCompanyStore();
companyPinia.getData();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, 'create')
const viewForm = (data) => refForm.value.openModal(data, 'view')
const editForm = (data) => refForm.value.openModal(data, 'edit')
const deleteForm = (data) => refForm.value.openModal(data, 'erase')
</script>
