<template>
  <!-- {{ storePinia.data }} -->

  <!-- store {{ storeId }} -->
  <GlobalDataTable
    :data="storePinia.data"
    :reloadTable="storePinia.reloadTable"
    :key="storePinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="store"
    :isHideCreate="props.storeId"
    :isHideOption="props.storeId"
  >
    <template #column>
      <Column field="company.name" header="Company Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by name - `"
          />
        </template>
      </Column>
      <Column field="name" header="Name" :sortable="true">
        <template #body="{ data }">
          <router-link
            v-if="!storeId"
            :to="`/system-guide/${data?.company?.id}/${data?.id}`"
          >
            {{ data?.name }}
          </router-link>
          <span v-else>{{ data?.name }}</span>
        </template>

        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by name - `"
          />
        </template>
      </Column>
      <Column field="japanese_name" header="Japanese Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by name - `"
          />
        </template>
      </Column>
      <Column field="storeID" header="store ID" :sortable="true"></Column>
      <Column field="phone" header="Phone" :sortable="true"></Column>

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

  <StoreForm ref="refForm" :isHideOption="props.storeId" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useStoreStore } from "@/stores/customers/store";

import StoreForm from "@/components/layout-ui/form/customers/StoreForm.vue";
import { showElipsis } from "@/plugins/GlobalSetting";

const props = defineProps(["storeId"]);
const storePinia = useStoreStore();
// storePinia.getData();
storePinia.getData(props.storeId);

const refForm = ref(null);
const defaultInput = ref(null);

const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
