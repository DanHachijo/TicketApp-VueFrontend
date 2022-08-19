<template>
  <GlobalDataTable
    :data="tvPinia.data"
    :reloadTable="tvPinia.reloadTable"
    :key="tvPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="teamviewer"
  >
    <template #column>
      <Column field="store.name" header="Store Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by store - `"
          />
        </template>
      </Column>

      <Column field="label_name" header="Label Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by label - `"
          />
        </template>
      </Column>

      <Column field="model_name" header="Model Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by model - `"
          /> </template
      ></Column>

      <Column field="ip_addr" header="IP" :sortable="true" />
      <Column field="tv_id" header="TV ID" />
      <Column field="tv_pw" header="TV Password" />

      <Column field="location" header="Installed Location" :sortable="true" />

      <Column field="note" header="Note" :sortable="true">
        <template #body="{ data }">
          <span>{{ showElipsis(data.note) }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by note - `"
          />
        </template>
      </Column>

      <Column field="created_by.user_name" header="Created By" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by user - `"
          />
        </template>
      </Column>

      <Column field="updated_by.user_name" header="Updated By" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by user - `"
          />
        </template>
      </Column>

      <Column
        field="updated_date"
        header="Updated Date"
        :sortable="true"
      ></Column>
    </template>
  </GlobalDataTable>

  <TeamViewerForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useTvStore } from "@/stores/tech/teamviewer";

import TeamViewerForm from "@/components/layout-ui/form/tech/TeamViewerForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";
import moment from "moment";

const tvPinia = useTvStore();
// tvPinia.reloadTable();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
