// ModalForm

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

const formBreakPoints = { '960px': '75vw', '640px': '90vw' }
const formWidth = { width: '50vw' }
// Table
const showElipsis = (str) => {
  if (str.length >= 10) {
    return str.substring(0, 9) + "..." 
  } else {
    return str
  }
}

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/');
}


export { 
  showElipsis, 
  createForm, 
  viewForm, 
  editForm, 
  eraseForm,
  formBreakPoints,
  formWidth,
  formatDate,
};
