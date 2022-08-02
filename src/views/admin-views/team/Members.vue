<template>
  <GlobalDataTable :data="memberPinia.data" :reloadTable="memberPinia.getData">
    <template #header>
      MEMBERS
    </template>
    <template #column>
      <Column field="user_name" header="User Name" :sortable="true"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="first_name" header="First Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="phone" header="Phone"></Column>
    </template>
  </GlobalDataTable>

</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useMemberStore } from '@/stores/members/member'

const memberPinia = useMemberStore()

// officePinia.getOffice()



</script>
