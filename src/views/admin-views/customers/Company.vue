<template>
  <DataTable
    v-if="DataTable"
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
      <Column field="name" header="Name" :sortable="true">
        <template #filter="{ filterModel }">
        {{filterModel}}
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by name - `"
          />
        </template>

      </Column>
      <Column field="companyID" header="CompanyID" :sortable="true"></Column>
      <Column field="street" header="Street"></Column>
      <Column field="suite" header="Suite"></Column>
      <Column field="city" header="City" :sortable="true"></Column>
      <Column field="state" header="State" :sortable="true"></Column>
      <Column field="zipcode" header="Zipcode" :sortable="true"></Column>
      <Column field="memo" header="Memo">
        <template #body="{ data }">
          <span>{{ showElipsis(data.memo) }}</span>
        </template>
      </Column>
      <Column
        field="is_customer"
        header="Contract"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge
            v-if="data.is_customer"
            value="In Contract"
            severity="success"
          />
          <Badge v-else value="No Contract" severity="warning" />
        </template>

        <template #filter="{ filterModel }">
          <TriStateCheckbox v-model="filterModel.value" />
        </template>
      </Column>
      <Column field="is_prospect" header="Prospect" :sortable="true">
        <template #body="{ data }">
          <Badge v-if="data.is_prospect" value="Target" severity="warning" />
          <Badge v-else value="Not Prospect" severity="success" />
        </template>
      </Column>
      <Column field="is_active" header="Status" :sortable="true">
        <template #body="{ data }">
          <Badge
            v-if="data.is_active"
            value="In Operation"
            severity="success"
          />
          <Badge v-else value="Closed" severity="danger" />
        </template>
      </Column>
      <Column field="date" header="Last Updated" :sortable="true"> </Column>
    </template>
  </DataTable>

  <CompanyForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import DataTable from "@/components/layout-ui/table/DataTable.vue";
import { useCompanyStore } from "@/stores/customers/company";
import CompanyForm from "@/components/layout-ui/form/customers/CompanyForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";
// import { FilterMatchMode, FilterOperator } from "primevue/api";

const companyPinia = useCompanyStore();
companyPinia.getData();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");

const hi = (demo) => {
  console.log(demo)
}
</script>
