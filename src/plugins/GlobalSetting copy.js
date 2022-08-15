// ModalForm
import moment from "moment";
import { computed } from "vue";

import { useToast } from "primevue/usetoast";


const createForm = {
  formHeader: "Create",
  okBtnClass: "p-button-primary",
  okBtn: "Submit",
  isReadyOnly: false,
};

const viewForm = {
  formHeader: "View",
  okBtnClass: null,
  okBtn: null,
  isReadyOnly: true,
};

const editForm = {
  formHeader: "Edit",
  okBtnClass: "p-button-warning",
  okBtn: "Save",
  isReadyOnly: false,
};

const eraseForm = {
  formHeader: "Delete",
  okBtnClass: "p-button-danger",
  okBtn: "Delete",
  isReadyOnly: true,
};

const formLabelClass = "mt-4 p-1 mb-2 ";

const formBreakPoints = { "960px": "75vw", "640px": "90vw" };
const formWidth = { width: "50vw" };

// Table
const showElipsis = (str) => {
  return String(str).length >= 10 ? String(str).substring(0, 9) + "..." : str;
};


const dateConvert = computed((date)=>{
  return moment(date)
})

const selectStore = computed((defaultInput) => {
  return ref(defaultInput? "Company or Head Office" : "Store");
});

// Toast


export {
  showElipsis,
  createForm,
  viewForm,
  editForm,
  eraseForm,
  formBreakPoints,
  formWidth,
  // formatDate,
  formLabelClass,
  selectStore
};
