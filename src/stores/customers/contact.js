import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getStoreListEvent,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";


export const useContactStore = defineStore("contact", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);
  const storeList = ref([]);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Contact data was successfully ${msg}.`,
      life: 3000,
    });
  };

  const toastError = (error) => {
    toast.add({
      severity: "warn",
      summary: `Error Code: ${error.response.status}`,
      detail: error,
      life: 3000,
    });
  };

  const getData = () => {
    getContact()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log("data:" + error);
        toastError(error);
      });
    getStoreList();
  };

  const reloadTable = () => {
    getData();
    toastSuccess("loaded");
  };

  const updateData = (formState, id, closeModal) => {
    updateContact(id, toRaw(formState))
      .then((response) => {
        console.log("Contact Updated" + response.data);
        getData();
        closeModal();
        toastSuccess("updated");
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error);
      });
  };

  const createData = (formState, closeModal) => {
    createContact(toRaw(formState))
      .then((response) => {
        console.log("Contact Updated" + response.data);
        getData();
        closeModal();
        toastSuccess("created");
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error);
      });
  };

  const deleteData = (id, closeModal) => {
    deleteContact(id)
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        closeModal();
        toastSuccess("deleted");
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error);
      });
  };

  const getStoreList = () => {
    getStoreListEvent()
      .then((response) => {
        storeList.value = response.data;
      })
      .catch((error) => {
        console.log("storeList:" + error);
      });
    loading.value = true;
  };

  return {
    data,
    loading,
    getData,
    createData,
    updateData,
    deleteData,
    reloadTable,
    toastSuccess,
    toastError,
    storeList,
  };
});
