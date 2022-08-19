<template>
  <GlobalDataTable
    :data="webPinia.data"
    :reloadTable="webPinia.reloadTable"
    :key="webPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="web portal"
  >
    <template #column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="url" header="URL" :sortable="true"></Column>
      <Column field="memo" header="Note" :sortable="true"></Column>
    </template>
  </GlobalDataTable>

  <WebPortalForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useWebPortalStore } from "@/stores/tech/webportal";

import WebPortalForm from "@/components/layout-ui/form/tech/WebPortalForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";
import moment from "moment";

const webPinia = useWebPortalStore();
// webPinia.reloadTable();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
