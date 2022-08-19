true
<template>
  <span>
    <Dialog
      v-model:visible="displayModal"
      :breakpoints="formBreakPoints"
      :style="formWidth"
      :modal="true"
    >
      <!-- {{ formState }} -->
      <template #header>
        <span class="flex">
          <h2 class="">{{ formConfig.formHeader }} Web Portal</h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>
      {{ formState }}
      <!-- start FORM -->
      <div class="flex flex-column">


        <label :class="formLabelClass">Site Name</label>
        <InputText
          type="text"
          v-model="formState.name"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">URL</label>
        <InputText
          type="text"
          v-model="formState.url"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Note</label>
        <InputText
          type="text"
          v-model="formState.memo"
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
          @click="okClick(formMode, webPinia)"
          :class="formConfig.okBtnClass"
        />
      </template>
    </Dialog>
  </span>
</template>

<script setup>
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import { useWebPortalStore } from "@/stores/tech/webportal";

import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const webPinia = useWebPortalStore();

const formMode = ref("");
const defaultInput = ref(null);
const displayModal = ref(false);

const openModal = (data, mode) => {
  resetForm();
  defaultInput.value = data;
  formMode.value = mode;
  changeFormMode();
  formMode.value !== "create" ? setForm() : "";
  displayModal.value = true;
};

const closeModal = () => {
  displayModal.value = false;
};

const okClick = ref(null);

const formConfig = ref({});

const changeFormMode = () => {
  switch (formMode.value) {
    case "create":
      formConfig.value = createForm;
      okClick.value = () => webPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        webPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        webPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  name: "",
  url: "",
  memo: "",
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    name: defaultInput?.value?.name || "",
    url: defaultInput?.value?.url || "",
    memo: defaultInput?.value?.memo || "",
  });

const formValidation = computed(() => {
  true;
});

defineExpose({
  openModal,
});
</script>
