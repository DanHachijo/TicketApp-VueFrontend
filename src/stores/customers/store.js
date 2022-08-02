import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getStore,
  updateStore,
  createStore,
  deleteStore,
  getCompanyListEvent,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useStoreStore = defineStore("store", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);
  const companyList = ref([]);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Store data was successfully ${msg}.`,
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
    getStore()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log("data:" + error);
        toastError(error);
      });
    loading.value = true;
  };

  const reloadTable = () => {
    getData();
    toastSuccess("loaded");
  };

  const updateData = (formState, id) => {
    updateStore(id, toRaw(formState))
      .then((response) => {
        console.log("Store Updated" + response.data);
        getData();
        toastSuccess("updated");
      })
      .catch((error) => {
        getData();
        toastError(error);
      });
  };

  const createData = (formState) => {
    createStore(toRaw(formState))
      .then((response) => {
        console.log("Store Created" + response.data);
        getData();
        toastSuccess("created");
      })
      .catch((error) => {
        getData();
        toastError(error);
      });
  };

  const deleteData = (id) => {
    deleteStore(id)
      .then((response) => {
        console.log("Company Deleted" + response.data);
        getData();
        toastSuccess("deleted");
      })
      .catch((error) => {
        getData();
        toastError(error);
      });
  };

  const getCompanyList = () => {
    getCompanyListEvent()
      .then((response) => {
        companyList.value = response.data;
      })
      .catch((error) => {
        console.log("companyList:" + error);
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
    getCompanyList,
    companyList,
  };
});
