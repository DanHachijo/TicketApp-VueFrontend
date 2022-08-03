import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getCompany,
  updateCompany,
  createCompany,
  deleteCompany,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useCompanyStore = defineStore("company", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);
  const companyList = ref([]);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Company data was successfully ${msg}.`,
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
    getCompany()
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

  const updateData = (formState, id, closeModal) => {
    updateCompany(id, toRaw(formState))
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        closeModal()
        toastSuccess("updated");
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error);
      });
  };

  const createData = (formState, closeModal) => {
    createCompany(toRaw(formState))
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        closeModal()
        toastSuccess("created");
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error);
      });
  };

  const deleteData = (id, closeModal) => {
    deleteCompany(id)
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        closeModal()
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
    companyList,
  };
});
