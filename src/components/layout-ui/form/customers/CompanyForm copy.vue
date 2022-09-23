<template>
  <span>
    <Dialog
      v-model:visible="displayModal"
      :breakpoints="formBreakPoints"
      :style="formWidth"
      :modal="true"
    >
      <template #header>
        <div class="flex">
          <h2 class="">{{ formConfig.formHeader }} Company</h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </div>
      </template>

      <!-- <input v-model="state.firstName" />
      <div
        class="input-errors"
        v-for="error of v$.firstName.$errors"
        :key="error.$uid"
      >
        <div class="error-msg">{{ error.$message }}</div>
      </div> -->

      <div class="flex flex-column">
        <label :class="{ error: v$.name.$errors.length }">※Company Name</label>
        <InputText
          type="text"
          v-model="formState.name"
          :readonly="formConfig.isReadyOnly"
        />
        <div class="error-msg">Enter Company Name</div>

        <!-- <p class="invalid-form text-xs" v-show="!formValidation.name.check">
          {{ formValidation.name.error }}
        </p> -->

        <label :class="formLabelClass">companyID</label>
        <InputText
          type="text"
          v-model="formState.companyID"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Street</label>
        <InputText
          type="text"
          v-model="formState.street"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Suite</label>
        <InputText
          type="text"
          v-model="formState.suite"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">City</label>
        <InputText
          type="text"
          v-model="formState.city"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">State</label>
        <InputText
          type="text"
          v-model="formState.state"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Zip</label>
        <InputText
          type="text"
          v-model="formState.zipcode"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Note</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="formState.memo"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass" class="mb-4">Contract</label>
        <div class="field-radiobutton" :readonly="formConfig.isReadyOnly">
          <RadioButton
            :value="true"
            v-model="formState.is_customer"
            :disabled="formConfig.isReadyOnly"
          />
          <label>Cusomter</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_customer"
            :disabled="formConfig.isReadyOnly"
          />
          <label>Not Customer</label>
        </div>

        <label :class="formLabelClass">Status</label>
        <div class="field-radiobutton">
          <RadioButton
            :value="true"
            v-model="formState.is_active"
            :disabled="formConfig.isReadyOnly"
          />
          <label>In Operation</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_active"
            :disabled="formConfig.isReadyOnly"
          />
          <label>Closed Permanently</label>
        </div>

        <label
          :class="formLabelClass"
          v-if="!formState.is_customer && formState.is_active"
          >Prospect</label
        >
        <div v-if="!formState.is_customer && formState.is_active">
          <div class="field-radiobutton">
            <RadioButton
              :value="true"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label>Prospect</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              :value="false"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label>No Prospect</label>
          </div>
        </div>
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
          @click="okClick(formMode, companyPinia)"
          :class="formConfig.okBtnClass"
          :disabled="false"
        />
      </template>
    </Dialog>
  </span>
</template>

<script setup>
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import { useCompanyStore } from "@/stores/customers/company";
import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const companyPinia = useCompanyStore();
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
      okClick.value = () => companyPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        companyPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        companyPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  name: "",
  companyID: "",
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
    name: defaultInput?.value?.name || "",
    companyID: defaultInput?.value?.companyID || "",
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

// const formValidation = computed(() => {
//   return reactive({
//     name: {
//       check: formState.name,
//       error: "Please enter a company name",
//     },
//     get isValid() {
//       return Boolean(this.name.check);
//     },
//   });
// });

// const checkForm = () => {
//   Object.values(formValidation.value);
// };


// const handleSubmit = (isFormValid) => {
//   submitted.value = true;

//   if (!isFormValid) {
//     return;
//   }

//   toggleDialog();
// };

// const toggleDialog = () => {
//   showMessage.value = !showMessage.value;

//   if (!showMessage.value) {
//     resetForm();
//   }
// };

const rules = {
  name: { required }, // Matches state.firstName
};

// const v$ = useVuelidate(rules, formState);

defineExpose({
  openModal,
});
</script>
