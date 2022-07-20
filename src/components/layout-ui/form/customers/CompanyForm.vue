<template>
  <span>
    <Dialog
      :header="formConfig.formHeader"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <ReadOnlyBadge v-if="formConfig.isReadyOnly" />

      <div class="flex flex-column">
        <h5 class="flex">Company Name</h5>
        <InputText
          type="text"
          v-model="formState.name"
          :class="inputClass"
          :readonly="formConfig.isReadyOnly"
        />

        <h5 class="flex">companyID</h5>
        <InputText
          type="text"
          v-model="formState.companyID"
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
              :value="true"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label for="city1">Prospect</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              :value="false"
              v-model="formState.is_prospect"
              :disabled="formConfig.isReadyOnly"
            />
            <label for="city2">No Prospect</label>
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
            okClick();
          "
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
import { useCompanyStore } from "@/stores/customers/company";

const companyPinia = useCompanyStore();

const formMode = ref("");
const defaultInput = ref(null);

const displayModal = ref(false);

const openModal = (data, mode) => {
  defaultInput.value = data;
  formMode.value = mode;
  displayModal.value = true;
  console.log(mode);
};
const closeModal = () => {
  displayModal.value = false;
};

const okClick = () => {
  switch (formMode.value) {
    case "create":
      return companyPinia.createData(formState.value);
    case "edit":
      return companyPinia.updateData(formState.value, defaultInput.value.id);
    case "erase":
      return companyPinia.deleteData(defaultInput.value.id);
    default:
      console.log("okClick has no function");
  }
};

const testsubmit = () =>
  companyPinia.updateData(formState, defaultInput.value.id);

const formConfig = computed(() => {
  return reactive({
    formHeader:
      formMode.value == "view"
        ? "View company detials"
        : formMode.value == "create"
        ? "Create company"
        : formMode.value == "edit"
        ? "Edit company"
        : formMode.value == "erase"
        ? "Delete company"
        : "",
    okBtnClass:
      formMode.value == "view"
        ? ""
        : formMode.value == "create"
        ? "p-button-primary"
        : formMode.value == "edit"
        ? "p-button-warning"
        : formMode.value == "erase"
        ? "p-button-danger"
        : "",
    okBtn:
      formMode.value == "view"
        ? ""
        : formMode.value == "create"
        ? "Submit"
        : formMode.value == "edit"
        ? "Save"
        : formMode.value == "erase"
        ? "Delete"
        : "",
    isReadyOnly:
      formMode.value == "view"
        ? true
        : formMode.value == "create"
        ? false
        : formMode.value == "edit"
        ? false
        : formMode.value == "erase"
        ? true
        : true,
  });
});

const formState = computed(() => {
  return reactive({
    name: defaultInput.value ? defaultInput.value.name : "",
    companyID: defaultInput.value ? defaultInput.value.companyID : "",
    street: defaultInput.value ? defaultInput.value.street : "",
    suite: defaultInput.value ? defaultInput.value.suite : "",
    city: defaultInput.value ? defaultInput.value.city : "",
    state: defaultInput.value ? defaultInput.value.state : "",
    zipcode: defaultInput.value ? defaultInput.value.zipcode : "",
    memo: defaultInput.value ? defaultInput.value.memo : "",
    is_customer: defaultInput.value ? defaultInput.value.is_customer : true,
    is_active: defaultInput.value ? defaultInput.value.is_active : true,
    is_prospect: defaultInput.value ? defaultInput.value.is_prospect : false,
  });
});

const refModalForm = ref(null);

const inputClass = "flex align-items-center justify-content-center mb-2";

defineExpose({
  openModal,
});
</script>
