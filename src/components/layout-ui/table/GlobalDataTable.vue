<template>
  <span>
    <Card>
      <template #content>
        <div class="card border-round">
          <DataTable
            :value="data"
            dataKey="data.id"
            :loading="loading"
            responsiveLayout="scroll"
            stripedRows
            columnResizeMode="expand"
            showGridlines
            :resizableColumns="true"
            :rowHover="true"
            :rows="25"
            :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[25, 50, 100]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            v-model:filters="filters"
            filterDisplay="menu"
          >
            <!-- Table Title and Buttons -->
            <template #header>
              <span class="flex justify-content-between flex-wrap">
                <span class="text-primary text-2xl flex align-items-center">
                  {{ props.tableName.toUpperCase() }}
                </span>
                <span class="flex align-items-center">
                  <Button
                    class="p-button-sm mx-2"
                    @click="emitCreate"
                    icon="pi pi-plus"
                  ></Button>

                  <Button
                    icon="pi pi-external-link"
                    class="mx-2 p-button-sm p-button-info"
                    @click="exportCSV($event)"
                  />
                  <Button
                    icon="pi pi-replay"
                    class="mx-2 p-button-sm p-button-secondary"
                    @click="reloadTable"
                  />

                  <span class="mx-2 p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Search..."
                    />
                  </span>
                  <!-- TESTING -->
                </span>
              </span>
              <!-- END Table Title and Buttons -->
            </template>
            <!-- Table Culumn and Edit Buttons -->
            <template #loading>
              <ProgressSpinner
                style="width: 50px; height: 50px"
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </template>

            <Column
              :exportable="false"
              style="min-width: 100px; min-height: 100px"
              class="z-1"
            >
              <template #body="slotProps" class="flex">
                <ToggleButton
                  class="p-button-sm m-2 flex"
                  @click="
                    resetToggle([slotProps.data.id]);
                    toggleOption[slotProps.data.id];
                  "
                  v-model="isToggle[slotProps.data.id]"
                  onIcon="pi pi-eye-slash"
                  offIcon="pi pi-exclamation-circle"
                />

                <div
                  v-if="isToggle[slotProps.data.id]"
                  class="flex flex-column absolute z-5 fadeinleft animation-duration-100 surface-50 border-round shadow-4 ml-2 p-1"
                >
                  <div>
                    <h4
                      class="flex align-items-center justify-content-center my-2"
                    >
                      Options
                    </h4>
                  </div>

                  <Button
                    label="View"
                    class="p-button-sm m-2 px-4 p-button-success flex align-items-center justify-content-center"
                    @click="emitView(slotProps.data, slotProps.data.id)"
                    icon="pi pi-eye"
                  />

                  <Button
                    label="Edit"
                    class="p-button-sm m-2 px-4 p-button-warning flex align-items-center justify-content-center"
                    @click="emitEdit(slotProps.data, slotProps.data.id)"
                    icon="pi pi-pencil"
                  />

                  <Button
                    label="Delete"
                    class="p-button-sm m-2 px-4 p-button-danger flex align-items-center justify-content-center"
                    @click="emitDelete(slotProps.data, slotProps.data.id)"
                    icon="pi pi-trash"
                  />
                </div>
              </template>
            </Column>

            <slot name="column"></slot>
          </DataTable>
        </div>
      </template>
    </Card>
  </span>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const props = defineProps(["data", "reloadTable", "tableName"]);

const loading = computed(() => {
  return props.data ? false : true;
});


const exportCSV = () => {
  props.data.exportCSV();
};

const isToggle = reactive({});

const resetToggle = (id) => {
  Object.keys(isToggle).forEach((key) => {
    if (key != id) {
      isToggle[key] = false;
    }
  });
};

const toggleOption = (id) => {
  isToggle[id] = !isToggle[id];
};

const emit = defineEmits(["emitCreate", "emitView", "emitEdit", "emitDelete"]);

const emitCreate = () => emit("emitCreate");
const emitView = (data, id) => {
  toggleOption(id);
  emit("emitView", data);
};
const emitEdit = (data, id) => {
  toggleOption(id);
  emit("emitEdit", data);
};
const emitDelete = (data, id) => {
  toggleOption(id);
  emit("emitDelete", data);
};

// const clearFilter = () => {
//   initFilters();
// };

// const initFilters = () => {
//   filters.value = {
//     global: { value: "null", matchMode: FilterMatchMode.CONTAINS },
//     name: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     is_customer: { value: null, matchMode: FilterMatchMode.EQUALS },
//   };
// };

const filters = ref(null);

const companyFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  is_customer: { value: "true", matchMode: FilterMatchMode.EQUALS },
  is_prospect: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_active: { value: "true", matchMode: FilterMatchMode.EQUALS },
};

const storeFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "company.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  is_customer: { value: "true", matchMode: FilterMatchMode.EQUALS },
  is_prospect: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_active: { value: "true", matchMode: FilterMatchMode.EQUALS },
};

const contactFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "company.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "store.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  contact: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
};

const ticketFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  ticket_date: {value: null, matchMode: FilterMatchMode.BETWEEN},
};

props.tableName.toLowerCase() == "company"
  ? (filters.value = companyFilters)
  : props.tableName.toLowerCase() == "store"
  ? (filters.value = storeFilters)
  : props.tableName.toLowerCase() == "contact"
  ? (filters.value = contactFilters)
  : props.tableName.toLowerCase() == "ticket"
  ? (filters.value = ticketFilters)
  : console.log("Please Add the table filter in GlobalDataTable.vue");
</script>

<style>
.p-speeddial-button {
  background-color: black;
}
</style>
