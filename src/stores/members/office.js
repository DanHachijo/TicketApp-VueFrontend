import { defineStore } from "pinia";
import { ref, toRaw, inject } from "vue";
import EventService from "@/plugins/EventService";
const showSuccess = inject("showSuccess");


export const useOfficeStore = defineStore("office", () => {
  const data = ref(null);
  const getData = () => {
    EventService.getOffice()
      .then((response) => {
        data.value = response.data;
        
      })
      .catch((error) => {
        console.log("data:" + error);
      });
  };
  getData();

  const updateData = (formState, id) => {
    EventService.updateOffice(id, toRaw(formState),successMsg, showError)
      .then((response) => {
        console.log("Office Updated" + response.data);
        getData();
        successMsg()
      })
      .catch((error) => {
        console.log(error);
        getData();
        showError()
      });
  };

  return {
    data,
    getData,
    updateData,
  };
});
