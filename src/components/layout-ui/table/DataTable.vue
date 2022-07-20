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
            :resizableColumns="true"
            :filters="filters"
            :rowHover="true"
            :loading="officePinia.loading"
            :rows="10"
            :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            
          >


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
import { FilterMatchMode } from "primevue/api";

const officePinia = useOfficeStore();

const props = defineProps(["data", "reloadTable", "CreateNewBtn"]);

const exportCSV = () => {
  props.data.value.exportCSV();
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const isToggle = reactive({});
const toggleOption = (id) => {
  isToggle[id] = !isToggle[id];
};

const emit = defineEmits(["emitCreate", "emitView", "emitEdit", "emitDelete"]);

const emitCreate = () => emit("emitCreate");
const emitView = (data) => emit("emitView", data);
const emitEdit = (data) => emit("emitEdit", data);
const emitDelete = (data) => emit("emitDelete", data);
</script>


<style lang="scss" scoped>
img {
    vertical-align: middle;
}
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>