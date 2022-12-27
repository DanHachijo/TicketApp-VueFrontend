<template>
  <div class="flex justify-content-center min-w-full">
    <div
      id="app-container"
      class="flex flex-row flex-wrap align-items-center justify-content-center min-h-screen"
    >
      <div class="h-11rem flex align-items-center justify-content-center">
        <Card @keyup.enter="submitLogin" class="shadow">
          <template #title>
            <span
              class="title-font flex justify-content-center flex-wrap card-container"
            >
              Ticket App Demo
            </span>
          </template>

          <template #content>
            <span class="flex justify-content-center flex-wrap card-container">
              Please Login
            </span>
            <h5>User Name</h5>
            <InputText type="text" v-model="formState.username" />

            <h5>Password</h5>
            <Password v-model="formState.password" :feedback="false" />

            <span class="flex flex-wrap mt-4">
              <Button
                label="Login as Max"
                class="m-2 p-button-success"
                @click="pasteLogin('max')"
              />
              <Button
                label="Login as Mochi"
                class="m-2 p-button-success"
                @click="pasteLogin('mochi')"
              />
            </span>
            <span class="flex justify-content-end flex-wrap mt-3">
              <Button
                label="Sign In"
                icon="pi pi-user"
                class="m-2"
                :disabled="
                  formState.username === '' || formState.password === ''
                "
                @click="submitLogin"
              />
            </span>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/members/user";

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

const pasteLogin = (name) => {
  switch (name) {
    case "max":
      formState.username = "max@django.com";
      formState.password = "64Rjyb''u!SHc5x";
      break;
    case "mochi":
      formState.username = "Mochi@mochimochi.com";
      formState.password = "E)VELXdjJKZa=lG";
      break;
  }
};
</script>

<style>
.app-container {
  max-width: 1200px;
}
</style>
