<template>
  <Card>
    <template #content>
      <div class="card border-round">
        <DataTable
          :value="data"
          responsiveLayout="scroll"
          stripedRows
          :resizableColumns="true"
          columnResizeMode="expand"
        >
          <!-- Table Title and Buttons -->
          <template #header>
            <span class="flex justify-content-between flex-wrap">
              <span class="text-primary text-2xl flex align-items-center">
                <slot name="header"></slot>
              </span>
              <span class="flex align-items-center">
                <Button
                  icon="pi pi-plus"
                  label="Create New"
                  class="mx-4 p-button-sm p-button-success"
                  @click="CreateData"
                />

                <Button
                  icon="pi pi-external-link"
                  label="Export to CSV"
                  class="p-button-sm p-button-info"
                  @click="exportCSV($event)"
                />
              </span>
            </span>
            <!-- END Table Title and Buttons -->
          </template>
          <!-- Table Culumn and Edit Buttons -->

          <slot name="column"></slot>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                type="button"
                @click="toggle"
                aria-haspopup="true"
                aria-controls="overlay_tmenu"
                class="p-button-sm"
                icon="pi pi-exclamation-circle"
                :slotProps="slotProps.data"
              />

              <TieredMenu
                id="overlay_tmenu"
                ref="menu"
                :model="items"
                :popup="true"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);

const exportCSV = () => {
  props.data.value.exportCSV();
};

const menu = ref();
const items = ref([
  {
    label: "View",
    icon: "pi pi-eye",
  },
  {
    label: "Edit",
    icon: "pi pi-pencil",
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
