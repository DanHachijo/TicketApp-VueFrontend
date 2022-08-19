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
          <h2 class="">{{ formConfig.formHeader }} TeamViewer</h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>
      {{ formState }}
      <!-- start FORM -->
      <div class="flex flex-column">
        <label :class="formLabelClass" class="flex">Store Name</label>
        <Dropdown
          v-model="formState.store"
          :options="storePinia.storeList"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a Store"
          :disabled="formConfig.isReadyOnly"
          class="flex"
        >
          <template #option="slotProps">
            {{ slotProps.option.name }}
            <Badge
              v-if="slotProps.option?.state"
              :value="slotProps.option?.state"
              severity="info"
              class="m-2"
            ></Badge>
            |
            <Badge
              v-if="slotProps.option?.company?.name"
              :value="slotProps.option?.company?.name"
              severity="info"
              class="ml-2"
            ></Badge>
          </template>
        </Dropdown>

        <label :class="formLabelClass">Lable Name</label>
        <InputText
          type="text"
          v-model="formState.label_name"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Model Name</label>
        <InputText
          type="text"
          v-model="formState.model_name"
          :readonly="formConfig.isReadyOnly"
        />
        <label :class="formLabelClass">Installed Location</label>
        <InputText
          type="text"
          v-model="formState.location"
          :readonly="formConfig.isReadyOnly"
        />
        <label :class="formLabelClass">Serial Number</label>
        <InputText
          type="text"
          v-model="formState.serial_no"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">IP Address</label>
        <InputText
          type="text"
          v-model="formState.ip_addr"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Login information</label>
        <InputText
          type="text"
          v-model="formState.login_info"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">TeamViewer ID</label>
        <InputText
          type="text"
          v-model="formState.tv_id"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">TeamViewer Password</label>
        <InputText
          type="text"
          v-model="formState.tv_pw"
          :readonly="formConfig.isReadyOnly"
        />

        <label class="flex" :class="formLabelClass">Note</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="formState.note"
          :readonly="formConfig.isReadyOnly"
        />

        <!-- !is_contact -->
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
          @click="okClick(formMode, tvPinia)"
          :class="formConfig.okBtnClass"
        />
      </template>
    </Dialog>
  </span>
</template>

<script setup>
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import moment from "moment";
import { useStoreStore } from "@/stores/customers/store";
import { useTvStore } from "@/stores/tech/teamviewer";

import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const storePinia = useStoreStore();
const tvPinia = useTvStore();

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
      okClick.value = () => tvPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        tvPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        tvPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  store: null,
  label_name: "",
  model_name: "",
  location: "",
  serial_no: "",
  is_ip: true,
  ip_addr: "",
  is_login: true,
  login_info: "",
  is_teamviewer: true,
  tv_id: "",
  tv_pw: "",
  note: "",
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    ticket_date: defaultInput?.value?.ticket_date || null,
    store: defaultInput?.value?.store.id || null,
    label_name: defaultInput?.value?.label_name || "",
    model_name: defaultInput?.value?.model_name || "",
    location: defaultInput?.value?.location || "",
    serial_no: defaultInput?.value?.serial_no || "",
    is_ip: defaultInput?.value?.is_ip || true,
    ip_addr: defaultInput?.value?.ip_addr || "",
    is_login: defaultInput?.value?.is_login || true,
    login_info: defaultInput?.value?.login_info || "",
    is_teamviewer: defaultInput?.value?.is_teamviewer || true,
    tv_id: defaultInput?.value?.tv_id || "",
    tv_pw: defaultInput?.value?.tv_pw || "",
    note: defaultInput?.value?.note || "",
  });

const formValidation = computed(() => {
  true;
});

defineExpose({
  openModal,
});
</script>
