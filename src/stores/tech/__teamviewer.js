import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getTv,
  createDevice,
  updateDevice,
  deleteDevice,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";


export const useTvStore = defineStore("teamviewer", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Ticket data was successfully ${msg}.`,
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
    getTv()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        toastError(error);
      });
  };
  getData()

  const reloadTable = () => {
    getData();
    toastSuccess("loaded");
  };

  const updateData = (formState, id, closeModal) => {
    updateDevice(id, toRaw(formState))
      .then((response) => {
        console.log("Device Updated" + response.data);
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
    createDevice(toRaw(formState))
      .then((response) => {
        console.log("Contact Updated" + response.data);
        getData();
        closeModal();
        toastSuccess("created");
      })
      .catch((error) => {
        console.log(error);
        // getData();
        toastError(error);
      });
  };

  const deleteData = (id, closeModal) => {
    deleteDevice(id)
      .then((response) => {
        console.log("Ticket Deleted" + response.data);
        getData();
        closeModal();
        toastSuccess("deleted");
      })
      .catch((error) => {
        console.log(error);
        // getData();
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
