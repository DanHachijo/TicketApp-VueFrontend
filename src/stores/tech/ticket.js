import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketCategories,
} from "@/plugins/EventService";
import { useToast } from "primevue/usetoast";


export const useTicketStore = defineStore("ticket", () => {
  const toast = useToast();
  const data = ref(null);
  const loading = ref(true);
  const ticketCateogries = ref([]);
  const id = ref()

  const toastSuccess = (msg) => {
    toast.add({
      severity: "success",
      summary: "Data Updated",
      detail: `Ticket data was successfully ${msg}.`,
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

  const getData = (storeId) => {
    id.value = storeId
    getTickets(storeId)
      .then((response) => {
        data.value = response.data;
        // storeId
        //   ? (data.value = new Array(response.data))
        //   : (data.value = response.data);
      })
      .catch((error) => {
        toastError(error);
      });
      getTicketCategory();
  };

  const reloadTable = () => {
    getData(id.value);
    toastSuccess("loaded");
  };

  const updateData = (formState, id, closeModal) => {
    updateTicket(id, toRaw(formState))
      .then((response) => {
        console.log("Ticket Updated" + response.data);
        getData(id.value);
        closeModal();
        toastSuccess("updated");
      })
      .catch((error) => {
        console.log(error);
        getData(id.value);
        toastError(error);
      });
  };

  const createData = (formState, closeModal) => {
    createTicket(toRaw(formState))
      .then((response) => {
        console.log("Contact Updated" + response.data);
        getData(id.value);
        closeModal();
        toastSuccess("created");
      })
      .catch((error) => {
        console.log(error);
        // getData(id.value);
        toastError(error);
      });
  };

  const deleteData = (id, closeModal) => {
    deleteTicket(id)
      .then((response) => {
        console.log("Ticket Deleted" + response.data);
        getData(id.value);
        closeModal();
        toastSuccess("deleted");
      })
      .catch((error) => {
        console.log(error);
        // getData(id.value);
        toastError(error);
      });
  };

  const getTicketCategory = () => {
    getTicketCategories()
      .then((response) => {
        ticketCateogries.value = response.data;
      })
      .catch((error) => {
        console.log("TicketCategory:" + error);
      });
    loading.value = true;
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
    ticketCateogries,
  };
});
