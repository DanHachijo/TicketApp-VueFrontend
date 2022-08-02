<template>
  <div
    class="flex flex-row flex-wrap align-items-center justify-content-center min-h-screen"
  >
    <div class="h-11rem flex align-items-center justify-content-center">
      <Card @keyup.enter="submitLogin">
        <template #title>
          <span
            class="flex justify-content-center flex-wrap card-container yellow-container"
          >
            Login to the App
          </span>
        </template>

        <template #content>
          <h5>User Name</h5>
          <InputText type="text" v-model="formState.username" />

          <h5>Password</h5>
          <Password v-model="formState.password" :feedback="false" />

          <div class="flex justify-content-end flex-wrap mt-4">
            <Button
              label="Sign In"
              icon="pi pi-user"
              class=""
              :disabled="formState.username === '' || formState.password === ''"
              @click="submitLogin"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
  <!-- <div class="">
    <div class="card">
      <div
        class="flex flex-row flex-wrap align-items-center justify-content-center min-h-screen"
      >
        <div
          class="h-6rem border-round bg-yellow-500 text-gray-900 font-bold p-3 m-3 flex align-items-center justify-content-center"
        >
          h-6rem
        </div>
        <div
          class="h-11rem border-round bg-yellow-500 text-gray-900 font-bold p-3 m-3 flex align-items-center justify-content-center"
        >
          h-11rem
        </div>
        <div
          class="h-20rem border-round bg-yellow-500 text-gray-900 font-bold p-3 m-3 flex align-items-center justify-content-center"
        >
          h-20rem
        </div>
        <div
          class="h-24rem border-round bg-yellow-500 text-gray-900 font-bold p-3 m-3 flex align-items-center justify-content-center"
        >
          h-24rem
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import { useUserStore } from "@/stores/members/user";
// import EventService from "@/plugins/EventService.js";
// import router from "@/router";

const formState = reactive({
  username: "",
  password: "",
});

const userPinia = useUserStore();
userPinia.userReset();

const submitLogin = () => {
  if (formState.username !== "" && formState.password !== "") {
    userPinia.submitLogin(formState);
  }
};
</script>
