<template>
  <GlobalDataTable
    :data="companyPinia.data"
    :reloadTable="companyPinia.reloadTable"
    :key="companyPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="company"
  >
    <template #column>
      <Column field="name" header="Name" :sortable="true">
        <template #filter="{ filterModel }">
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
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">In Contract</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">No Contract</label>
          </div>
        </template>
      </Column>

      <Column
        field="is_prospect"
        header="Prospect"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge v-if="data.is_prospect" value="Target" severity="warning" />
          <Badge v-else value="Not Prospect" severity="success" />
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">Prospect</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">Not Prospect</label>
          </div>
        </template>
      </Column>
      <Column
        field="is_active"
        header="Status"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge
            v-if="data.is_active"
            value="In Operation"
            severity="success"
          />
          <Badge v-else value="Closed Permanently" severity="danger" />
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">In Operation</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">Closed Permanently</label>
          </div>
        </template>
      </Column>
      <Column field="date" header="Added Date" :sortable="true"></Column>
    </template>
  </GlobalDataTable>

  <CompanyForm ref="refForm" />
</template>

<script setup>
import { ref, inject } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useCompanyStore } from "@/stores/customers/company";
import CompanyForm from "@/components/layout-ui/form/customers/CompanyForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";

const props = defineProps(['companyId'])
const companyPinia = useCompanyStore();
companyPinia.getData(props.companyId);

const refForm = ref(null);
const defaultInput = ref(null);




const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
