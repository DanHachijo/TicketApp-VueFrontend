import { defineStore } from "pinia";
import { ref, toRaw, inject } from "vue";
import {
  getStore,
  updateStore,
  createStore,
  deleteStore,
  // getStoreListEvent,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";


export const useStoreStore = defineStore("store", () => {
  const toast = useToast();
  const data = ref(null);
  // const singleData = ref(null);
  const loading = ref(true);
  const id = ref()


  // const storeList = ref([]);

  // const companyList = ref([]);

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



  const getData = (storeId) => {
    id.value = storeId
    getStore(storeId)
      .then((response) => {
        storeId
          ? (data.value = new Array(response.data))
          : (data.value = response.data);
      })
      .catch((error) => {
        console.log("data:" + error);
        toastError(error);
      });
    loading.value = true;
  };


  const reloadTable = () => {
    getData(id.value);
    toastSuccess("loaded");
  };

  const updateData = (formState, id, closeModal) => {
    updateStore(id, toRaw(formState))
      .then((response) => {
        console.log("Store Updated" + response.data);
        getData();
        closeModal();
        toastSuccess("updated");
      })
      .catch((error) => {
        getData();
        toastError(error);
      });
  };

  const createData = (formState, closeModal) => {
    createStore(toRaw(formState))
      .then((response) => {
        console.log("Store Created" + response.data);
        getData();
        closeModal();
        toastSuccess("created");
      })
      .catch((error) => {
        getData();
        toastError(error);
      });
  };

  const deleteData = (id, closeModal) => {
    deleteStore(id)
      .then((response) => {
        console.log("Company Deleted" + response.data);
        getData(id.value);
        closeModal();
        toastSuccess("deleted");
      })
      .catch((error) => {
        getData(id.value);
        toastError(error);
      });
  };

  // const getStoreList = () => {
  //   getStoreListEvent()
  //     .then((response) => {
  //       storeList.value = response.data;
  //     })
  //     .catch((error) => {
  //       console.log("storeList:" + error);
  //     });
  //   loading.value = true;
  // };

  // getStoreList();
  // getCompanyList()

  return {
    data,
    loading,
    getData,
    createData,
    updateData,
    deleteData,
    reloadTable,
    // getSingleData,
    // singleData,
    // getStoreList,
    // storeList,
    // getCompanyList,
    // companyList,
  };
});
