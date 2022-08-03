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
            {{ formConfig.formHeader }} Contact
          </h2>
          <ReadOnlyBadge
            v-if="formConfig.isReadyOnly"
            class="ml-3 flex justify-content-center"
          />
        </span>
      </template>
      <div class="flex flex-column">
        <h5>Select a contact type</h5>
        <SelectButton
          v-model="contactType.value"
          :options="contactOptions"
          @change="resetContactType"
          :disabled="formConfig.isReadyOnly"
        />

        <span v-if="contactType.value == 'Company or Head Office'">
          <h5 class="flex">Company Name</h5>

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

        <span v-if="contactType.value == 'Store'">
          <h5 class="flex">Store Name</h5>

          <Dropdown
            v-model="formState.store"
            :options="contactPinia.storeList"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a Store"
            :class="inputClass"
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

        <h5 class="flex">Contact Name</h5>
        <InputText
          type="text"
          v-model="formState.contact"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />
        <p class="invalid-form text-xs" v-show="!formValidation.contact.check">
          {{ formValidation.contact.error }}
        </p>

        <h5 class="flex">Title</h5>
        <InputText
          type="text"
          v-model="formState.title"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Phone</h5>
        <InputText
          type="text"
          v-model="formState.phone"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">Email</h5>
        <InputText
          type="text"
          v-model="formState.email"
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
            // closeModal();
            okClick(formMode, storePinia);
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStoreStore } from "@/stores/customers/store";
import { useContactStore } from "@/stores/customers/contact";
import {
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const storePinia = useStoreStore();
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
      okClick.value = () => contactPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  company: null,
  store: null,
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
    store: defaultInput?.value?.store?.id || null,
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

const contactOptions = ref(["Company or Head Office", "Store"]);

const inputClass = "flex align-items-center justify-content-center mb-2";

defineExpose({
  openModal,
});
</script>
