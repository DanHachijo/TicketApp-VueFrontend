import { defineStore } from "pinia";
import { computed, toRaw } from "vue";
import {submitLoginEvent} from "@/plugins/EventService";
import router from "@/router";
import { useToast } from "primevue/usetoast";
// import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const toast = useToast();
  // const token = ref(window.localStorage.getItem("token"));
  // const userId = ref(window.localStorage.getItem("user_id"));
  // const userName = ref(window.localStorage.getItem("user_name"));



  const toastError = (error) => {
    toast.add({
      severity: "warn",
      summary: `Login Error`,
      detail: error,
      life: 3000,
    });
  };

  const toastSuccess = (user) => {
    toast.add({
      severity: "success",
      summary: "Login Successful",
      detail: `Welcome, ${user}.`,
      life: 3000,
    });
  };

  const toastLogout = () => {
    toast.add({
      severity: "success",
      summary: "Logout Successful",
      detail: `You are logged out.`,
      life: 3000,
    });
  };

  const submitLogin = (formState) => {
    submitLoginEvent(toRaw(formState))
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('user_name', response.data.user_name)
        // token.value = window.localStorage.getItem("token");
        // userId.value = window.localStorage.getItem("user_id");
        // userName.value = window.localStorage.getItem("user_name");

        router.push({ name: "Dashboard" });
        toastSuccess(localStorage.getItem("user_name"));
      })
      .catch((error) => {
        toastError(error);
      });
  };

  const userReset = () => {
    // window.localStorage.getItem("user_name") !== null || undefined ? toastLogout() : ""
    // token.value ? toastLogout() : ""
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('user_id', '')
    window.localStorage.setItem('user_name', '')

  };

  const logOut = () => {
    userReset()
    router.push({ name: "login" });
  };

  const loggedinUser = computed(()=>{
    return window.localStorage.getItem("user_name")
  })

  return {
    // token,
    // userId,
    // userName,
    submitLogin,
    logOut,
    userReset,
    loggedinUser,
    // apiClientPinia,
    // apiFileClient
  };
});
