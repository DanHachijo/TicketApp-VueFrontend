<template>
  <Card>
    <template #content>
      <h5>User Name</h5>
      <InputText type="text" v-model="formState.username"/>

      <h5>Password</h5>
      <Password toggleMask v-model="formState.password"></Password>
      <Button
        label="Sign In"
        icon="pi pi-user"
        class="w-full"
        :disabled="formState.username === '' || formState.password === ''"
      ></Button>
    </template>
  </Card>
  user
  {{ formState }}
</template>

<script setup>
import { reactive } from "vue";
const formState = reactive({
  username: "",
  password: "",
});
</script>
