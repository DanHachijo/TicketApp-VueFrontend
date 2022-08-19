import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getUserLogin,
  createuserLogin,
  updateuserLogin,
  deleteuserLogin,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";


export const useUserLoginStore = defineStore("userloginlist", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `User data was successfully ${msg}.`,
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
    getUserLogin()
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
    updateuserLogin(id, toRaw(formState))
      .then((response) => {
        console.log("user Updated" + response.data);
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
    createuserLogin(toRaw(formState))
      .then((response) => {
        console.log("User Updated" + response.data);
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
    deleteuserLogin(id)
      .then((response) => {
        console.log("User Deleted" + response.data);
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
