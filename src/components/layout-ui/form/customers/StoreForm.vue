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
            {{ formConfig.formHeader }} Store
          </h2>
          <ReadOnlyBadge
            v-if="formConfig.isReadyOnly"
            class="ml-4 flex justify-content-center"
          />
        </span>
      </template>

      <div class="flex flex-column">
        <h5 class="flex">※Company Name</h5>

        <Dropdown
          v-model="formState.company"
          :options="storePinia.companyList"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a Company"
          :class="inputClass"
          :disabled="formConfig.isReadyOnly"
        >
          <template #option="slotProps">
            {{ slotProps.option.name }} ({{ slotProps.option.state }})
          </template>
        </Dropdown>
        <p class="invalid-form text-xs" v-show="!formValidation.company.check">
          {{ formValidation.company.error }}
        </p>

        <h5 class="flex">※Store Name</h5>
        <InputText
          type="text"
          v-model="formState.name"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />
        <p class="invalid-form text-xs" v-show="!formValidation.name.check">
          {{ formValidation.name.error }}
        </p>

        <h5 class="flex">Japanese Name</h5>
        <InputText
          type="text"
          v-model="formState.japanese_name"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">store ID</h5>
        <InputText
          type="text"
          v-model="formState.storeID"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Street</h5>
        <InputText
          type="text"
          v-model="formState.street"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Suite</h5>
        <InputText
          type="text"
          v-model="formState.suite"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">City</h5>
        <InputText
          type="text"
          v-model="formState.city"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">State</h5>
        <InputText
          type="text"
          v-model="formState.state"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Zip</h5>
        <InputText
          type="text"
          v-model="formState.zipcode"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Store Phone</h5>
        <InputText
          type="text"
          v-model="formState.phone"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Note</h5>
        <Textarea
          rows="5"
          cols="30"
          v-model="formState.memo"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Contract</h5>
        <div class="field-radiobutton" :readonly="formConfig.isReadyOnly">
          <RadioButton
            :value="true"
            v-model="formState.is_customer"
            :disabled="formConfig.isReadyOnly"
          />
          <label for="city1">Cusomter</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_customer"
            :disabled="formConfig.isReadyOnly"
          />
          <label for="city2">Not Customer</label>
        </div>

        <h5 class="flex">Status</h5>
        <div class="field-radiobutton">
          <RadioButton
            :value="true"
            v-model="formState.is_active"
            :disabled="formConfig.isReadyOnly"
          />
          <label for="city1">In Operation</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_active"
            :disabled="formConfig.isReadyOnly"
          />
          <label for="city2">Closed Permanently</label>
        </div>

        <span v-if="!formState.is_customer && formState.is_active">
          <h5 class="flex">Prospect</h5>
          <div class="field-radiobutton">
            <RadioButton
              id="1"
              :value="true"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label for="1">Prospect</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              id="2"
              :value="false"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label for="2">No Prospect</label>
          </div>
        </span>
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
          @click="
            closeModal();
            okClick(formMode, storePinia);
          "
          :class="formConfig.okBtnClass"
          :disabled="!formValidation.isValid"
        />
      </template>
      <button @click="test">test</button>
    </Dialog>
  </span>
</template>

<script setup>
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed, watch } from "vue";
import { useStoreStore } from "@/stores/customers/store";
import { useCompanyStore } from "@/stores/customers/company";

import {
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const storePinia = useStoreStore();
const companyPinia = useCompanyStore();
storePinia.getCompanyList();

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
      okClick.value = () => storePinia.createData(formState);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        storePinia.updateData(formState, defaultInput.value.id);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () => storePinia.deleteData(defaultInput.value.id);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  company: null,
  name: "",
  japanese_name: "",
  storeID: "",
  phone: "",
  street: "",
  suite: "",
  city: "",
  state: "",
  zipcode: "",
  memo: "",
  is_customer: true,
  is_active: true,
  is_prospect: false,
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    company: defaultInput?.value?.company.id || null,
    name: defaultInput?.value?.name || "",
    japanese_name: defaultInput?.value?.japanese_name || "",
    storeID: defaultInput?.value?.storeID || "",
    phone: defaultInput?.value?.phone || "",
    street: defaultInput?.value?.street || "",
    suite: defaultInput?.value?.suite || "",
    city: defaultInput?.value?.city || "",
    state: defaultInput?.value?.state || "",
    zipcode: defaultInput?.value?.zipcode || "",
    memo: defaultInput?.value?.memo || "",
    is_customer: defaultInput?.value?.is_customer || true,
    is_active: defaultInput?.value?.is_active || true,
    is_prospect: defaultInput?.value?.is_prospect || false,
  });


const formValidation = computed(() => {
  return reactive({
    company: {
      check: formState.company,
      error: "Please select a company",
    },
    name: {
      check: formState.name,
      error: "Please enter a store name",
    },
    get isValid() {
      return Boolean(this.company.check && this.name.check);
    },
  });
});

const checkForm = () => {
  Object.values(formValidation.value);
};

// watch(formValidation, async () => {
//   Object.values(formValidation).every((val) => val);
//   isFormValid();
//   console.log(isFormValid.value);
// });

const inputClass = "flex align-items-center justify-content-center mb-2";

defineExpose({
  openModal,
});
</script>
