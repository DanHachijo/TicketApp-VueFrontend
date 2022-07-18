import { defineStore } from "pinia";
import { ref, toRaw, inject } from "vue";
import EventService from "@/plugins/EventService";

export const useOfficeStore = defineStore("office", () => {
  const data = ref(null);

  const createdOffice = ref(0)
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
    EventService.updateOffice(id, toRaw(formState))
      .then((response) => {
        console.log("Office Updated" + response.data);
        getData();
        createdOffice.value++
        console.log(createdOffice.value)
      })
      .catch((error) => {
        console.log(error);
        getData();
      });
  };

  return {
    data,
    getData,
    updateData,
  };
});
