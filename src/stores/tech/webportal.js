import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getWebPortal,
  createWebPortal,
  updateWebPortal,
  deleteWebPortal,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useWebPortalStore = defineStore("webportal", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Web Portal data was successfully ${msg}.`,
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
    getWebPortal()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        toastError(error);
      });
  };
  getData();

  const reloadTable = () => {
    getData();
    toastSuccess("loaded");
  };

  const updateData = (formState, id, closeModal) => {
    updateWebPortal(id, toRaw(formState))
      .then((response) => {
        console.log("Web Portal Updated" + response.data);
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
    createWebPortal(toRaw(formState))
      .then((response) => {
        console.log("Web Portal Updated" + response.data);
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
    deleteWebPortal(id)
      .then((response) => {
        console.log("Web Portal Deleted" + response.data);
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
  };
});
