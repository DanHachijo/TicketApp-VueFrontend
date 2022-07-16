<template>
  <Card>
    <template #content>
      <div class="card border-round">
        <DataTable
          :value="data"
          responsiveLayout="scroll"
          stripedRows
          columnResizeMode="expand"
          :resizableColumns="true"
          :lazy="true"
        >
          <!-- Table Title and Buttons -->
          <template #header>
            <span class="flex justify-content-between flex-wrap">
              <span class="text-primary text-2xl flex align-items-center">
                <slot name="header"></slot>
              </span>
              <span class="flex align-items-center">
                <OfficeForm ref="refEditForm" mode="create" class="mx-2" />

                <Button
                  icon="pi pi-external-link"
                  label="Export to CSV"
                  class="p-button-sm p-button-info"
                  @click="exportCSV($event)"
                />
                <Button
                  icon="pi pi-replay"
                  label="Reload"
                  class="mx-4 p-button-sm p-button-secondary"
                  @click="reloadTable"
                />
              </span>
            </span>
            <!-- END Table Title and Buttons -->
          </template>
          <!-- Table Culumn and Edit Buttons -->

          <slot name="column"></slot>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <!-- Action Icon -->

              <span v-if="!isOptions">
                <OfficeForm
                  mode="view"
                  ref="refViewForm"
                  :defalutInput="slotProps.data"
                  class="m-2"
                />

                <OfficeForm
                  mode="edit"
                  ref="refEditForm"
                  :defalutInput="slotProps.data"
                  class="m-2"
                />

                <OfficeForm
                  mode="erase"
                  ref="refDeleteForm"
                  :defalutInput="slotProps.data"
                  class="m-2"
                />
              </span>
              <ToggleButton
                class="p-button-sm ml-2"
                v-model="isOptions"
                onLabel="Action"
                offLabel=""
                onIcon="pi pi-exclamation-circle"
                offIcon="pi pi-eye-slash"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { watch, ref, defineAsyncComponent } from "vue";
import OfficeForm from "@/components/layout-ui/form/member/OfficeForm.vue";
import { useOfficeStore } from "@/stores/members/office";

// const OfficeForm = defineAsyncComponent(() => import("@/components/layout-ui/form/member/OfficeForm.vue"));


const officePinia = useOfficeStore();

const props = defineProps(["data", "reloadTable", "CreateNewBtn"]);

const exportCSV = () => {
  props.data.value.exportCSV();
};

const isOptions = ref(true);
</script>
