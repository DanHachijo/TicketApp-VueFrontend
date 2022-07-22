<template>
  <span>
    <Card>
      <template #content>
        <div class="card border-round">
          <DataTable
            :value="data"
            dataKey="data.id"
            responsiveLayout="scroll"
            stripedRows
            columnResizeMode="expand"
            showGridlines
            :resizableColumns="true"
            :rowHover="true"
            :loading="officePinia.loading"
            :rows="10"
            :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            v-model:filters="filters"
            filterDisplay="menu"
          >
            <!-- <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template> -->
            <template #loading> Loading the data. Please wait. </template>
            <!-- Table Title and Buttons -->
            <template #header>
              <span class="flex justify-content-between flex-wrap">
                <span class="text-primary text-2xl flex align-items-center">
                  <slot name="header"></slot>
                </span>
                <span class="flex align-items-center">
                  <!-- <OfficeForm ref="refEditForm" mode="create" class="mx-2" /> -->

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

            <Column :exportable="false" :style="{ width: '60px' }">
              <template #body="slotProps">
                <span class="flex justify-content-start flex-wrap">
                  <ToggleButton
                    class="flex align-items-center justify-content-center p-button-sm m-2"
                    @click="toggleOption[slotProps.data.id]"
                    v-model="isToggle[slotProps.data.id]"
                    onIcon="pi pi-eye-slash"
                    offIcon="pi pi-exclamation-circle"
                  />

                  <span
                    v-if="isToggle[slotProps.data.id]"
                    class="flex align-items-center justify-content-center fadeinleft animation-duration-100"
                  >
                    <Button
                      class="p-button-sm m-2 p-button-success"
                      @click="emitView(slotProps.data)"
                      icon="pi pi-eye"
                    ></Button>

                    <Button
                      class="p-button-sm m-2 p-button-warning"
                      @click="emitEdit(slotProps.data)"
                      icon="pi pi-pencil"
                    ></Button>

                    <Button
                      class="p-button-sm m-2 p-button-danger"
                      @click="emitDelete(slotProps.data)"
                      icon="pi pi-trash"
                    ></Button>
                  </span>
                </span>
              </template>
            </Column>

            <!-- <Column field="name" header="Name" :sortable="true">
              <template #filter="{ filterModel }">
                {{ filterModel }}
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                />
              </template>
            </Column> -->
            <slot name="column"></slot>
          </DataTable>
        </div>
      </template>
    </Card>
  </span>
</template>

<script setup>
import { ref, reactive } from "vue";
import OfficeForm from "@/components/layout-ui/form/member/OfficeForm.vue";
import { useOfficeStore } from "@/stores/members/office";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const officePinia = useOfficeStore();

const props = defineProps(["data", "reloadTable", "CreateNewBtn"]);

const exportCSV = () => {
  props.data.value.exportCSV();
};

const isToggle = reactive({});
const toggleOption = (id) => {
  isToggle[id] = !isToggle[id];
};

const emit = defineEmits(["emitCreate", "emitView", "emitEdit", "emitDelete"]);

const emitCreate = () => emit("emitCreate");
const emitView = (data) => emit("emitView", data);
const emitEdit = (data) => emit("emitEdit", data);
const emitDelete = (data) => emit("emitDelete", data);

const clearFilter = () => {
  initFilters();
};

const initFilters = () => {
  filters.value = {
    global: { value: "null", matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    is_customer: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
};

// const filters = ref({
//   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//   // 'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
//   name: {
//     operator: FilterOperator.AND,
//     constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
//   },
//   is_customer: { value: null, matchMode: FilterMatchMode.EQUALS },
// });

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  is_customer: { value: null, matchMode: FilterMatchMode.EQUALS },
});

// const filters = ref({
//   'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
//   'name': {constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//   },
// });
</script>
