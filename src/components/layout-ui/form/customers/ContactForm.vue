<template>
{{formState}}
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
            {{ formConfig.formHeader }} Contact
          </h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>
      <div class="flex flex-column">
        <label :class="formLabelClass">Select a contact type</label>
        <SelectButton
          v-model="contactType.value"
          :options="contactOptions"
          @change="resetContactType"
          :disabled="formConfig.isReadyOnly"
        />

        <span
          v-if="contactType.value == 'Company or Head Office'"
          class="flex flex-column"
        >
          <label :class="formLabelClass">Company Name</label>

          <Dropdown
            v-model="formState.company"
            :options="companyPinia.data"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a Company"
            :disabled="formConfig.isReadyOnly"
          >
            <template #option="slotProps">
              {{ slotProps.option.name }}
              <Badge
                v-if="slotProps.option?.state"
                :value="slotProps.option?.state"
                severity="info"
                class="m-2"
              ></Badge>
            </template>
          </Dropdown>
        </span>

        <span v-if="contactType.value == 'Store'" class="flex flex-column">
          <label :class="formLabelClass">Store Name</label>

          <Dropdown
            v-model="formState.store"
            :options="storePinia.data"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a Store"
            :disabled="formConfig.isReadyOnly"
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
        </span>

        <label :class="formLabelClass">Contact Name</label>

        <InputText
          type="text"
          v-model="formState.contact"
          :readonly="formConfig.isReadyOnly"
        />
        <p class="invalid-form text-xs" v-show="!formValidation.contact.check">
          {{ formValidation.contact.error }}
        </p>

        <label :class="formLabelClass">Title</label>

        <InputText
          type="text"
          v-model="formState.title"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Phone</label>

        <InputText
          type="text"
          v-model="formState.phone"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Email</label>

        <InputText
          type="text"
          v-model="formState.email"
          :readonly="formConfig.isReadyOnly"
        />

        <label :class="formLabelClass">Note</label>

        <Textarea
          rows="5"
          cols="30"
          v-model="formState.memo"
          :readonly="formConfig.isReadyOnly"
        />
        <p class="invalid-form text-xs" v-show="!formValidation.memo.check">
          {{ formValidation.memo.error }}
        </p>
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
            okClick(formMode, storePinia)
          "
          :class="formConfig.okBtnClass"
          :disabled="!formValidation.isValid"
        />
      </template>
    </Dialog>
  </span>
</template>

<script setup>
import ReadOnlyBadge from "@/components/layout-ui/badge/ReadOnlyBadge.vue";
import { ref, reactive, computed } from "vue";
import { useCompanyStore } from "@/stores/customers/company";
import { useStoreStore } from "@/stores/customers/store";
import { useContactStore } from "@/stores/customers/contact";
import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const props = defineProps(["storeId"]);

const companyPinia = useCompanyStore();
companyPinia.getData();

const storePinia = useStoreStore();
storePinia.getData();

const contactPinia = useContactStore();

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
      okClick.value = () => contactPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        contactPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        contactPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};



const initialFormState = {
  company: null,
  store: parseInt(props?.storeId, 10),
  contact: "",
  title: "",
  phone: "",
  email: "",
  memo: "",
};





const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    company: defaultInput?.value?.company?.id || null,
    store: defaultInput?.value?.store?.id || "",
    contact: defaultInput?.value?.contact || "",
    title: defaultInput?.value?.title || "",
    phone: defaultInput?.value?.phone || "",
    email: defaultInput?.value?.email || "",
    memo: defaultInput?.value?.memo || "",
  });

const resetContactType = () => {
  formState.company = "";
  formState.store = "";
};

const contactType = computed(() => {
  return ref(defaultInput?.value?.company ? "Company or Head Office" : "Store");
});

const contactOptions = ref(["Company or Head Office", "Store"]);

const formValidation = computed(() => {
  return reactive({
    contact: {
      check: formState.contact.length <= 30,
      error: "Name has to be under 30 letters",
    },
    memo: {
      check: formState.memo.length <= 300,
      error: "Note has to be under 300 letters",
    },
    get isValid() {
      return Boolean(this.contact.check && this.memo.check);
    },
  });
});

defineExpose({
  openModal,
});
</script>
