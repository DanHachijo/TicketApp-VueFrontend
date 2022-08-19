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
          <h2 class="">{{ formConfig.formHeader }} User Login Info</h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>
      <!-- {{ formState }} -->
      <!-- start FORM -->
      <div class="flex flex-column">
        <!-- is_open -->

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

        <label :class="formLabelClass" class="flex">Web Portal</label>
        <Dropdown
          v-model="formState.site_type"
          :options="webPinia.data"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a site"
          :disabled="formConfig.isReadyOnly"
        >
          <!-- <template #option="slotProps">
            {{ slotProps.option.name }}
          </template> -->
        </Dropdown>

        <label :class="formLabelClass">Account Type</label>
        <Dropdown
          v-model="formState.user_type"
          :options="accountOptions"
          optionLabel="name"
          optionValue="name"
          placeholder="Select an account type"
          :disabled="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Language</label>
        <Dropdown
          v-model="formState.language"
          :options="languageOptions"
          optionLabel="name"
          optionValue="name"
          placeholder="Select a language"
          :disabled="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Contact Code</label>
        <InputText
          type="text"
          v-model="formState.contract_code"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Login ID</label>
        <InputText
          type="text"
          v-model="formState.login_id"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Login PW</label>
        <InputText
          type="text"
          v-model="formState.login_pw"
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
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import { useCompanyStore } from "@/stores/customers/company";
import moment from "moment";
import { useStoreStore } from "@/stores/customers/store";
import { useWebPortalStore } from "@/stores/tech/webportal";
import { useUserLoginStore } from "@/stores/tech/userloginlist";

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
storePinia.getStoreList();

const webPinia = useWebPortalStore();
const userPinia = useUserLoginStore();

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

// Form Option (Dropdown)
const accountOptions = ref([{ name: "Internal" }, { name: "Customers" }]);
const languageOptions = ref([{ name: "English" }, { name: "Japanese" }]);

const changeFormMode = () => {
  switch (formMode.value) {
    case "create":
      formConfig.value = createForm;
      okClick.value = () => userPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        userPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        userPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  store: null,
  user_type: "",
  language: "",
  contract_code: "",
  login_id: "",
  login_pw: "",
  site_type: "",
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    store: defaultInput?.value?.store.id || null,
    user_type: defaultInput?.value?.user_type || null,
    language: defaultInput?.value?.language || "",
    contract_code: defaultInput?.value?.contract_code || "",
    login_id: defaultInput?.value?.login_id || "",
    login_pw: defaultInput?.value?.login_pw || null,
    site_type: defaultInput?.value?.site_type?.id || null,
  });

const formValidation = computed(() => {
  true;
});


defineExpose({
  openModal,
});
</script>
