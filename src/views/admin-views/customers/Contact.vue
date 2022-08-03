<template>
  <GlobalDataTable
    :data="contactPinia.data"
    :reloadTable="contactPinia.reloadTable"
    :key="contactPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="contact"
  >
    <template #column>
      <Column field="company.name" header="Company" :sortable="true">
        <template #body="{ data }">
          <div v-if="data.store?.name">{{ data.store?.company?.name }}</div>
          <div v-else-if="data.company?.name">{{ data.company?.name }}</div>
          <div v-else>---</div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by company - `"
          />
        </template>
      </Column>

      <Column field="store.name" header="Store" :sortable="true">
        <template #body="{ data }"
          ><div v-if="!data.store?.name">---</div>
          <div v-else>{{ data.store?.name }}</div></template
        >
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by store - `"
          />
        </template>
      </Column>
      <Column field="contact" header="Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by name - `"
          />
        </template>
      </Column>
      <Column field="title" header="Title" :sortable="true"></Column>
      <Column field="phone" header="Phone" :sortable="true"></Column>

      <Column field="email" header="Email"></Column>
      <Column field="suite" header="Suite"></Column>
      <Column field="memo" header="Memo">
        <template #body="{ data }">
          <span>{{ showElipsis(data.memo) }}</span>
        </template>
      </Column>
    </template>
  </GlobalDataTable>

  <ContactForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useContactStore } from "@/stores/customers/contact";

import ContactForm from "@/components/layout-ui/form/customers/ContactForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";

const contactPinia = useContactStore();
contactPinia.getData();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
