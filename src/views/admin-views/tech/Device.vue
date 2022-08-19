<template>
  <GlobalDataTable
    :data="devicePinia.data"
    :reloadTable="devicePinia.reloadTable"
    :key="devicePinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="device"
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

      <Column field="label_name" header="Label Name" />
      <Column field="model_name" header="Model Name" />
      <Column field="location" header="Installed Location" />
      <Column field="serial_no" header="S/N" />

      <Column field="is_ip" header="IP" :sortable="true" dataType="boolean">
        <template #body="{ data }">
          {{ data.ip_addr }}
          <!-- <Badge v-if="data.is_ip" value="data.ip_addr" severity="success" /> -->
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">Network Devices</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">Other Devices</label>
          </div>
        </template>
      </Column>

      <Column field="is_login" header="UI" :sortable="true" dataType="boolean">
        <template #body="{ data }">
          {{ data.login_info }}
          <!-- <Badge v-if="data.is_login" value="data.is_login" severity="success" /> -->
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">Login Ingo</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">No Login Info</label>
          </div>
        </template>
      </Column>

      <Column field="login_info" header="Login" />

      <Column
        field="is_teamviewer"
        header="TeamViewer"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge v-if="data.is_teamviewer" value="Yes" severity="success" />
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">TeamViewer</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">No TeamViewer</label>
          </div>
        </template>
      </Column>

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

  <DeviceForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useDeviceStore } from "@/stores/tech/device";

import DeviceForm from "@/components/layout-ui/form/tech/DeviceForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";
import moment from "moment";

const devicePinia = useDeviceStore();
// devicePinia.reloadTable();

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
