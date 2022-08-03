<template>
  <GlobalDataTable
    :data="ticketPinia.data"
    :reloadTable="ticketPinia.reloadTable"
    :key="ticketPinia.data"
    @emitCreate="createForm"
    @emitView="viewForm"
    @emitEdit="editForm"
    @emitDelete="deleteForm"
    tableName="ticket"
  >
    <template #column>
      <Column
        field="ticket_date"
        header="Date"
        :sortable="true"
        :showFilterMatchModes="false"
      >
        <template #filter="{ filterModel }">
        <!-- {{formatDate(filterModel.value)}} -->
                {{filterModel.value}}

          <Calendar v-model="filterModel.value" selectionMode="range" :showButtonBar="true" />
        </template>
      </Column>
      <Column field="complete_by" header="Complete By" :sortable="true">
        <template #body="slotProps" class="flex">
          <span v-if="slotProps.data.is_open">
            <Badge
              :value="`Complete by ${slotProps.data.complete_by}`"
              severity="danger"
            />
          </span>
          <span v-else>
            <Badge value="Completed" severity="success" />
          </span>
        </template>
      </Column>

      <Column field="company.name" header="Company Name" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by company- `"
          />
        </template>
      </Column>

      <Column field="store.name" header="Store Name" :sortable="true">
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

      <Column header="Contact" :sortable="true">
        <template #body="slotProps">
          <span v-if="slotProps.data.is_contact">
            {{ slotProps.data.contact.contact }}
          </span>
          <span v-else>
            {{ slotProps.data.contact_name }}
          </span>
        </template>
      </Column>

      <Column field="category.name" header="Ticket Category" :sortable="true">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by category - `"
          />
        </template>
      </Column>

      <Column field="inquiry" header="Inquiry" :sortable="true">
        <template #body="{ data }">
          {{ data.inquiry }}
          <span>{{ showElipsis(data.inquiry) }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by inquiry - `"
          />
        </template>
      </Column>

      <Column field="respond" header="Respond" :sortable="true">
        <template #body="{ data }">
          <span>{{ showElipsis(data.respond) }}</span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="`Search by respond - `"
          />
        </template>
      </Column>

      <Column
        field="is_email"
        header="Contact by"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge v-if="data.is_email" value="Email" severity="success" />
          <Badge v-else value="Phone" severity="info" />
        </template>

        <template #filter="{ filterModel }">
          <div class="field-radiobutton">
            <RadioButton id="1" value="true" v-model="filterModel.value" />
            <label for="1">Email</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton id="2" value="false" v-model="filterModel.value" />
            <label for="2">Phone</label>
          </div>
        </template>
      </Column>

      <Column
        field="is_programupdate"
        header="Program Update"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge
            v-if="data.is_programupdate"
            value="Program Update"
            severity="success"
          />
        </template>
      </Column>

      <Column
        field="is_sales"
        header="Sales Inquery"
        :sortable="true"
        dataType="boolean"
      >
        <template #body="{ data }">
          <Badge v-if="data.is_sales" value="Sales" severity="warning" />
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
    </template>
  </GlobalDataTable>

  <TicketForm ref="refForm" />
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useTicketStore } from "@/stores/tech/ticket";

import TicketForm from "@/components/layout-ui/form/tech/TicketForm.vue";
import { showElipsis, formatDate } from "@/plugins/GlobalSetting";

const ticketPinia = useTicketStore();
ticketPinia.getData();

const refForm = ref(null);
const defaultInput = ref(null);
console.log(formatDate(new Date("2022-08-01T15:00:00.000Z")))
const createForm = (data) => refForm.value.openModal(data, "create");
const viewForm = (data) => refForm.value.openModal(data, "view");
const editForm = (data) => refForm.value.openModal(data, "edit");
const deleteForm = (data) => refForm.value.openModal(data, "erase");
</script>
