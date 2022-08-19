<template>
  <GlobalDataTable
    :data="userLoginListPinia.data"
    :reloadTable="userLoginListPinia.reloadTable"
    :key="userLoginListPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="User Info"
  >
    <template #column>
      <Column field="store.name" header="Store" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by store- `"
          />
        </template>
      </Column>
      <Column field="site_type.name" header="URL" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by site- `"
          /> </template
      ></Column>
      <Column field="user_type" header="Type" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by company- `"
          />
        </template>
      </Column>
      <Column field="language" header="Language" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by language- `"
          /> </template
      ></Column>
      <Column
        field="contract_code"
        header="Contract Code"
        :sortable="true"
      ></Column>
      <Column field="login_id" header="Login ID" :sortable="true"></Column>
      <Column field="login_pw" header="Login PW" :sortable="true"></Column>
      <Column field="updated_by.user_name" header="URL" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by user- `"
          /> </template
      ></Column>
    </template>
  </GlobalDataTable>

  <UserLoginListForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useUserLoginStore } from "@/stores/tech/userloginlist";

import UserLoginListForm from "@/components/layout-ui/form/tech/UserLoginListForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";
import moment from "moment";

const userLoginListPinia = useUserLoginStore();
// userLoginListPinia.reloadTable();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
