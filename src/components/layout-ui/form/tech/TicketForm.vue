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
          <h2 class="">{{ formConfig.formHeader }} Ticket</h2>
          <ReadOnlyBadge v-if="formConfig.isReadyOnly" />
        </span>
      </template>
      <!-- {{ formState }} -->
      <!-- start FORM -->
      <div class="flex flex-column">
        <label :class="formLabelClass">※Ticket Date</label>
        <Calendar
          v-model="formState.ticket_date"
          :showTime="true"
          :showSeconds="false"
          :showButtonBar="true"
          dateFormat="mm/dd/yy"
          :showIcon="true"
          selectionMode="single"
          :disabled="formConfig.isReadyOnly"
          @hide="updateDateTime(formState.ticket_date)"
        />

        <!-- is_open -->
        <label :class="formLabelClass" class="flex">Ticket Status</label>

        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_open"
            :disabled="formConfig.isReadyOnly"
            id="closed"
          />
          <label for="closed">Closed</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton
            :value="true"
            v-model="formState.is_open"
            :disabled="formConfig.isReadyOnly"
            id="open"
          />
          <label for="open">Open</label>
        </div>




          <label :class="formLabelClass" class="flex">Store Name</label>
          <Dropdown
            v-model="formState.store"
            :options="storePinia.data"
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


        <label :class="formLabelClass" class="flex">Ticket Category</label>
        <Dropdown
          v-model="formState.category"
          :options="ticketPinia.ticketCateogries"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a categry"
          class="flex"
          :disabled="formConfig.isReadyOnly"
        >

        </Dropdown>

        <label class="flex" :class="formLabelClass">Inquiry</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="formState.inquiry"
          :readonly="formConfig.isReadyOnly"
        />

        <label class="flex" :class="formLabelClass">Response</label>
        <Textarea
          rows="5"
          cols="30"
          v-model="formState.respond"
          :readonly="formConfig.isReadyOnly"
        />

        <span v-if="formState.is_open" class="flex flex-column">
          <label :class="formLabelClass">Complete by</label>
          <Calendar
            v-model="formState.complete_by"
            :showTime="false"
            :showSeconds="false"
            :showButtonBar="true"
            dateFormat="mm/dd/yy"
            :showIcon="true"
            selectionMode="single"
            :disabled="formConfig.isReadyOnly"
            @hide="updateDate(formState.complete_by)"
          />

          <label class="flex" :class="formLabelClass">Open Detials</label>
          <Textarea
            rows="5"
            cols="30"
            v-model="formState.open_details"
            :readonly="formConfig.isReadyOnly"
          />
        </span>

        <label :class="formLabelClass" class="flex"
          >Is this ticket escalated?</label
        >

        <div class="field-radiobutton">
          <RadioButton
            :value="false"
            v-model="formState.is_escalated"
            :disabled="formConfig.isReadyOnly"
            id="isEscalated"
          />
          <label for="isEscalated">No, I didn't escalate the case</label>
        </div>

        <div class="field-radiobutton">
          <RadioButton
            :value="true"
            v-model="formState.is_escalated"
            :disabled="formConfig.isReadyOnly"
            id="Escalated"
          />
          <label for="Escalated"
            >Yes, I collaborated with other team member</label
          >
        </div>

        <span v-if="formState.is_escalated" class="flex flex-column">
          <label :class="formLabelClass" class="flex">Escalated to</label>
          <Dropdown
            v-model="formState.escalated_to"
            :options="memberPinia.data"
            optionLabel="user_name"
            optionValue="id"
            placeholder="Select a member"
            :disabled="formConfig.isReadyOnly"
          >
            <template #option="slotProps">
              {{ slotProps.option.user_name }}
              <Badge
                v-if="slotProps.option.office?.name"
                :value="slotProps.option.office?.name"
                severity="info"
                class="m-2"
              ></Badge>
            </template>
          </Dropdown>

          <label for="escalatedRes" :class="formLabelClass"
            >Update from escalated case</label
          >
          <Textarea
            id="escalatedRes"
            rows="5"
            cols="30"
            v-model="formState.escalated_res"
            :readonly="formConfig.isReadyOnly"
          />
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
import { useMemberStore } from "@/stores/members/member";
import { useTicketStore } from "@/stores/tech/ticket";

import {
  formLabelClass,
  formBreakPoints,
  formWidth,
  createForm,
  viewForm,
  editForm,
  eraseForm,
} from "@/plugins/GlobalSetting";

const companyPinia = useCompanyStore();
companyPinia.getData();

const storePinia = useStoreStore();
storePinia.getData();


const memberPinia = useMemberStore();
memberPinia.getData();

const ticketPinia = useTicketStore();

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
      okClick.value = () => ticketPinia.createData(formState, closeModal);
      break;
    case "view":
      formConfig.value = viewForm;
      break;
    case "edit":
      formConfig.value = editForm;
      okClick.value = () =>
        ticketPinia.updateData(formState, defaultInput.value.id, closeModal);
      break;
    case "erase":
      formConfig.value = eraseForm;
      okClick.value = () =>
        ticketPinia.deleteData(defaultInput.value.id, closeModal);
      break;
    default:
      console.log("changeFormMode is not getting the formMode.value");
  }
};

const initialFormState = {
  ticket_date: null,
  complete_by: null,
  category: "",
  escalated_to: "",
  contact: "",
  store: "",
  is_open: false,
  open_details: "",
  inquiry: "",
  respond: "",
  is_escalated: false,
  escalated_res: "",
  contact_name: "",
  phone: "",
};

const formState = reactive({ ...initialFormState });
const resetForm = () => Object.assign(formState, initialFormState);
const setForm = () =>
  Object.assign(formState, {
    ticket_date: defaultInput?.value?.ticket_date || null,
    complete_by: defaultInput?.value?.complete_by || null,
    category: defaultInput?.value?.category?.id || "",
    escalated_to: defaultInput?.value?.escalated_to?.id || "",
    contact: defaultInput?.value?.contact?.id || "",
    store: defaultInput?.value?.store?.id || null,
    is_open: defaultInput?.value?.is_open || false,
    open_details: defaultInput?.value?.open_details || "",
    inquiry: defaultInput?.value?.inquiry || "",
    respond: defaultInput?.value?.respond || "",
    is_escalated: defaultInput?.value?.is_escalated || false,
    escalated_res: defaultInput?.value?.escalated_res || "",
    contact_name: defaultInput?.value?.contact_name || "",
    phone: defaultInput?.value?.phone || "",
  });

const formValidation = computed(() => {
  true;
});

const resetContactType = () => {
  formState.company = "";
  formState.store = "";
};

const contactType = computed(() => {
  return ref(defaultInput?.value?.company ? "Company or Head Office" : "Store");
});

const contactOptions = ref(["Company or Head Office", "Store"]);

const checkContact = () => {
  //  let con = contactPinia.data.filter((entry)=> entry.id === formState.contact)
  let selectedContact = formState.contact;
  let contactObj = contactPinia.data;
  let seleted = contactObj.filter((contact) => {
    selectedContact.includes(selectedContact);
  });
  console.log(selected);
  // Object.values(contactObj).forEach(el => el.includes(el.id == formState.contact));
};

const updateDateTime = (dateTime) => {
  dateTime
    ? (formState.ticket_date = moment(dateTime).format("MM/DD/YYYY HH:mm"))
    : (formState.ticket_date = null);
};

const updateDate = (dateTime) => {
  dateTime
    ? (formState.complete_by = moment(dateTime).format("MM/DD/YYYY"))
    : (formState.complete_by = null);
};

defineExpose({
  openModal,
});

</script>
