import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalDataStore = defineStore("globalData", () => {

  const updatedData = ref(0);
  const errorData = ref(0)


  return {
    updatedData,
    errorData,
  };
});
