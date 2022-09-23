<template>
  <!-- <span > -->
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
          :paginator="!isSingleView"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          v-model:filters="filters"
          filterDisplay="menu"
          ref="dt"
        >
          <!-- Table Title and Buttons -->
          <template #header>
            <span class="flex justify-content-between flex-wrap">
              <span class="text-primary text-2xl flex align-items-center">
                {{ props.tableName.toUpperCase() }}
              </span>
              <span class="flex align-items-center">
                <Button
                  v-if="!isHideCreate"
                  class="p-button-sm mx-2"
                  @click="emitCreate"
                  icon="pi pi-plus"
                  v-tooltip.top="'Create a new data'"
                ></Button>

                <Button
                  icon="pi pi-external-link"
                  class="mx-2 p-button-sm p-button-info"
                  @click="exportCSV($event)"
                  v-tooltip.top="'Download displayed table to CSV file'"
                />
                <Button
                  icon="pi pi-replay"
                  class="mx-2 p-button-sm p-button-secondary"
                  @click="reloadTable"
                  v-tooltip.top="'Reload a data'"
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
            v-if="!props.isHideOption"
            :exportable="false"
            style="min-width: 100px; min-height: 100px"
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
                v-tooltip.right="'Options'"
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
  <!-- </span> -->
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { FilterMatchMode, FilterOperator, FilterService } from "primevue/api";
import { inject } from "vue";

const isSingleView = inject("isSingleView");

const props = defineProps([
  "data",
  "reloadTable",
  "tableName",
  "isHideOption",
  "isHideCreate",
]);
const loading = computed(() => {
  return props.data ? false : true;
});

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
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

// moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
FilterService.register("isDateBetween", (a, b) => {
  console.log(b?.[0]);
  console.log(b?.[1]);
  // console.log(a);
  // console.log(moment(b).format("MM/DD/YYYY"));
  // a == b;
});

const ticketFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  is_open: { value: null, matchMode: FilterMatchMode.EQUALS },
  // ticket_date: { value: null, matchMode: "isDateBetween" },
  // ticket_date: {
  //   operator: FilterOperator.AND,
  //   constraints: [
  //     { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
  //     { value: null, matchMode: FilterMatchMode.DATE_AFTER },
  //   ],
  // },
  "company.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "store.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "category.name": { value: null, matchMode: FilterMatchMode.EQUALS },
  inquiry: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  respond: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  is_email: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_programupdate: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_sales: { value: null, matchMode: FilterMatchMode.EQUALS },
  "created_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
};

const deviceFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "store.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  label_name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  model_name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  location: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  serial_no: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  note: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "created_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "updated_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  is_ip: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_login: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_teamviewer: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const tvFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "store.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  label_name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  model_name: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  location: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  note: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "created_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "updated_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  is_ip: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_login: { value: null, matchMode: FilterMatchMode.EQUALS },
  is_teamviewer: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const userlistFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "store.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "site_type.name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  user_type: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  language: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  "updated_by.user_name": {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
};

const defaultFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const filters = ref(null);
const updateFIlters = (() => {
  switch (props.tableName) {
    // Customers
    case "company":
      filters.value = companyFilters;
      break;
    case "store":
      isSingleView
        ? (filters.value = defaultFilters)
        : (filters.value = storeFilters);
        // Not working
      break;
    case "contact":
      filters.value = contactFilters;
      break;
    // Tickets
    case "ticket":
      filters.value = ticketFilters;
      break;
    case "device":
      filters.value = deviceFilters;
      break;
    case "teamviewer":
      filters.value = tvFilters;
      break;
    case "User Info":
      filters.value = userlistFilters;
      break;
    // Members
    // case "office":
    //   filters.value = officeFilters;
    default:
      filters.value = defaultFilters;
      console.log("appying the global filter only");
  }
})();
</script>

<style>
.p-speeddial-button {
  background-color: black;
}
</style>
