<template>
  <span>
    <Dialog
      v-model:visible="displayModal"
      :breakpoints="formBreakPoints"
      :style="formWidth"
      :modal="true"
    >
      <template #header>
        <span class="flex align-items-start flex-wrap">
          <h2 class="flex justify-content-center">
            {{ formConfig.formHeader }} Office
          </h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>

      <div class="flex flex-column">
        <label :class="formLabelClass">Office Name</label>
        <InputText
          type="text"
          v-model="formState.name"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Street</label>
        <InputText
          type="text"
          v-model="formState.street"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Suite</label>
        <InputText
          type="text"
          v-model="formState.suite"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">City</label>
        <InputText
          type="text"
          v-model="formState.city"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">State</label>
        <InputText
          type="text"
          v-model="formState.state"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Zip</label>
        <InputText
          type="text"
          v-model="formState.zip"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Phone</label>
        <InputText
          type="text"
          v-model="formState.phone"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button
          v-if="formConfig.okBtn"
          :label="formConfig.okBtn"
          icon="pi pi-check"
          @click="okClick(formMode, storePinia)"
          :class="formConfig.okBtnClass"
        />
      </template>
    </Dialog>
  </span>
</template>

<script setup>
// import ModalForm from "@/components/layout-ui/form/ModalForm.vue";
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import { useOfficeStore } from "@/stores/members/office";
import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const officePinia = useOfficeStore();

const formMode = ref("");
const defaultInput = ref(null);

const displayModal = ref(false);

const openModal = (data, mode) => {
  resetForm();
  defaultInput.value = data;
  formMode.value = mode;
  formMode.value !== "create" ? setForm() : "";
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

const okClick = ref(null);
const changeFormMode = () => {
  switch (formMode.value) {
    case "create":
      formConfig.value = createForm;
      okClick.value = () => officePinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        officePinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        officePinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("okClick has no function");
  }
};

// const formConfig = computed(() => {
//   return reactive({
//     formHeader:
//       formMode.value == "view"
//         ? "View office detials"
//         : formMode.value == "create"
//         ? "Create office"
//         : formMode.value == "edit"
//         ? "Edit office"
//         : formMode.value == "erase"
//         ? "Delete office"
//         : "",
//     okBtnClass:
//       formMode.value == "view"
//         ? ""formHeader
//         : formMode.value == "create"
//         ? "p-button-primary"
//         : formMode.value == "edit"
//         ? "p-button-warning"
//         : formMode.value == "erase"
//         ? "p-button-danger"
//         : "",
//     okBtn:
//       formMode.value == "view"
//         ? ""
//         : formMode.value == "create"
//         ? "Submit"
//         : formMode.value == "edit"
//         ? "Save"
//         : formMode.value == "erase"
//         ? "Delete"
//         : "",
//     isReadyOnly:
//       formMode.value == "view"
//         ? true
//         : formMode.value == "create"
//         ? false
//         : formMode.value == "edit"
//         ? false
//         : formMode.value == "erase"
//         ? true
//         : true,
//   });
// });

// const formState = computed(() => {
//   return reactive({
//     name: defaultInput.value ? defaultInput.value.name : "",
//     street: defaultInput.value ? defaultInput.value.street : "",
//     suite: defaultInput.value ? defaultInput.value.suite : "",
//     city: defaultInput.value ? defaultInput.value.city : "",
//     state: defaultInput.value ? defaultInput.value.state : "",
//     zip: defaultInput.value ? defaultInput.value.zip : "",
//     phone: defaultInput.value ? defaultInput.value.phone : "",
//   });
// });
const initialFormState = {
  ticket_date: null,
  name: "",
  street: "",
  suite: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    name: defaultInput.value ? defaultInput.value.name : "",
    street: defaultInput.value ? defaultInput.value.street : "",
    suite: defaultInput.value ? defaultInput.value.suite : "",
    city: defaultInput.value ? defaultInput.value.city : "",
    state: defaultInput.value ? defaultInput.value.state : "",
    zip: defaultInput.value ? defaultInput.value.zip : "",
    phone: defaultInput.value ? defaultInput.value.phone : "",
  });

defineExpose({
  openModal,
});
</script>
