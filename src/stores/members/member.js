import { defineStore } from "pinia";
import { ref } from "vue";
import { getMember } from "@/plugins/EventService";

export const useMemberStore = defineStore("member", () => {
  const data = ref(null);

  const getData = () => {
    getMember()
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log("data:" + error);
      });
  };

  return {
    data,
    getData,
  };
});
