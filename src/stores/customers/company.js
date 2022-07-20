import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import EventService from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useCompanyStore = defineStore("company", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);

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
    EventService.getCompany()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log("data:" + error);
        toastError(error)
      });
      loading.value = true
  };

  const reloadTable = () => {
    getData();
    toastSuccess('loaded')
  };

  const updateData = (formState, id) => {
    EventService.updateCompany(id, toRaw(formState))
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        toastSuccess('updated')
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error)
      });
  };

  const createData = (formState) => {
    EventService.createCompany(toRaw(formState))
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        toastSuccess('created')
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error)
      });
  };

  const deleteData = (id) => {
    EventService.deleteCompany(id)
      .then((response) => {
        console.log("Company Updated" + response.data);
        getData();
        toastSuccess('deleted')
      })
      .catch((error) => {
        console.log(error);
        getData();
        toastError(error)
      });
  };
  return {
    data,
    getData,
    createData,
    updateData,
    deleteData,
    reloadTable,
    loading,
  };
});
