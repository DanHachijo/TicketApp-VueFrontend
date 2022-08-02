import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { getOffice, updateOffice } from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";

export const useOfficeStore = defineStore("office", () => {
  const toast = useToast();
  const data = ref(null);

  const getData = () => {
    getOffice()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log("data:" + error);
        toast.add({
          severity: "warn",
          summary: "Network Error",
          detail: "Database connection error ",
          life: 3000,
        });
      });
  };

  const reloadTable = () => {
    getData();
    toast.add({
      severity: "success",
      summary: "Data Loaded",
      detail: "Office data was successfully loaded",
      life: 3000,
    });
  };

  const updateData = (formState, id) => {
    updateOffice(id, toRaw(formState))
      .then((response) => {
        console.log("Office Updated" + response.data);
        getData();
        toast.add({
          severity: "info",
          summary: "Data Created",
          detail: "Office data was successfully updated",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        getData();
        toast.add({
          severity: "error",
          summary: "Error Occurred",
          detail: "Office data was not updated",
          life: 3000,
        });
      });
  };

  return {
    data,
    getData,
    updateData,
    reloadTable,
  };
});
