import { defineStore } from 'pinia'
import { ref } from 'vue';
import EventService from "@/plugins/EventService";

export const useMemberStore = defineStore('member', ()=> {

  const data = ref(null)

  const getData = () => {
    EventService.getMember()
      .then((response) => {
        data.value = response.data;

      })
      .catch((error) => {
        console.log("data:" + error);
      });
  }
  getData()

  return {
    data,
    getData
  }
})
