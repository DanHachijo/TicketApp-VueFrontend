import { defineStore } from "pinia";
import { ref } from "vue";
import { getMember } from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useMemberStore = defineStore("member", () => {
  const toast = useToast();
  const loading = ref(true);
  const data = ref(null);

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Member data was successfully ${msg}.`,
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
    getMember()
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

  return {
    data,
    getData,
    loading,
    reloadTable
  };
});
