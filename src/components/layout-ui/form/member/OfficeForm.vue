<template>
  <span>
    <Button
      class="p-button-sm"
      :class="btnClass"
      @click.prevent="openModal()"
      :icon="btnIcon"
      :label="btnName"
    ></Button>
    <ModalForm
      :Header="formHeader"
      ref="refModalForm"
      :okBtn="okBtn"
      :btnClass="btnClass"
      @okClick="okClick"
    >
      <template #contents>
        <ReadOnlyBadge v-if="isReadyOnly" />

        <div class="flex flex-column">
          <h5 class="flex">Office Name</h5>
          <InputText
            type="text"
            v-model="formState.name"
            :class="inputClass"
            :readonly="isReadyOnly"
          />

          <h5 class="flex">Street</h5>
          <InputText
            type="text"
            v-model="formState.street"
            :class="inputClass"
            :readonly="isReadyOnly"
          />

          <h5 class="flex">Suite</h5>
          <InputText
            type="text"
            v-model="formState.suite"
            :class="inputClass"
            :readonly="isReadyOnly"
          />

          <h5 class="flex">City</h5>
          <InputText
            type="text"
            v-model="formState.city"
            :class="inputClass"
            :readonly="isReadyOnly"
          />

          <h5 class="flex">Zip</h5>
          <InputText
            type="text"
            v-model="formState.zip"
            :class="inputClass"
            :readonly="isReadyOnly"
          />

          <h5 class="flex">Phone</h5>
          <InputText
            type="text"
            v-model="formState.phone"
            :class="inputClass"
            :readonly="isReadyOnly"
          />
        </div>
      </template>
    </ModalForm>
  </span>
</template>

<script setup>
import ModalForm from "@/components/layout-ui/form/ModalForm.vue";
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, onMounted, inject } from "vue";
import { useOfficeStore } from "@/stores/members/office";

const officePinia = useOfficeStore();
const props = defineProps(["defalutInput", "mode"]);

const btnIcon = ref("");
const btnName = ref("");
const btnClass = ref("");
const isReadyOnly = ref(false);
const formHeader = ref("");
const okBtn = ref("");

const showSuccess = inject("showSuccess");
const showError = inject("showError");

const okClick = () => {
  officePinia.updateData(formState, props.defalutInput.id);
};

onMounted(() => {
  switch (props.mode) {
    case "view":
      btnClass.value = "";
      btnIcon.value = "pi pi-eye";
      btnName.value = "";
      isReadyOnly.value = true;
      formHeader.value = "View Office";
      okBtn.value = false;
      break;
    case "create":
      btnClass.value = "";
      btnIcon.value = "pi pi-plus";
      btnName.value = "";
      isReadyOnly.value = false;
      formHeader.value = "Create a New Office";
      okBtn.value = "Create";
      // okClick = updateData
      break;
    case "edit":
      btnClass.value = "p-button-warning";
      btnIcon.value = "pi pi-pencil";
      btnName.value = "";
      isReadyOnly.value = false;
      formHeader.value = "Edit the Office Data";
      okBtn.value = "Save";
      break;
    case "erase":
      btnClass.value = "p-button-danger";
      btnIcon.value = "pi pi-trash";
      btnName.value = "";
      isReadyOnly.value = true;
      formHeader.value = "Are you sure you want to delete this?";
      okBtn.value = "Delete";
      break;
    default:
      console.log("Form is not getting the 'mode' prop");
  }
});

const input = props.defalutInput;
const formState = reactive({
  name: input ? input.name : "",
  street: input ? input.street : "",
  suite: input ? input.suite : "",
  city: input ? input.city : "",
  state: input ? input.state : "",
  zip: input ? input.zip : "",
  phone: input ? input.phone : "",
});

const refModalForm = ref(null);
const openModal = () => {
  refModalForm.value.openModal();
};

const inputClass = "flex align-items-center justify-content-center mb-2";
</script>
