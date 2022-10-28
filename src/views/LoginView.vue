<template>
  <div
    class="flex flex-row flex-wrap align-items-center justify-content-center min-h-screen"
  >
    <div class="h-11rem flex align-items-center justify-content-center">
      <Card @keyup.enter="submitLogin">
        <template #title>
          <span
            class="flex justify-content-center flex-wrap card-container"
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
          <div class="mt-5">
            <div>
              User: max@django.com
            </div>
            <div>
              PW: 64Rjyb''u!SHc5x
            </div>
          </div>
          <div class="mt-2">
            <div>
              User: Mochi@mochimochi.com
            </div>
            <div>
              PW: E)VELXdjJKZa=lG
            </div>
          </div>
        </template>
      </Card>
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
</script>
