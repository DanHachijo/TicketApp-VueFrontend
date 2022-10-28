<template>
  <GlobalDataTable
    :data="memberPinia.data"
    :reloadTable="memberPinia.reloadTable"
    tableName="member"
    :isHideOption="true"
    :isHideCreate="true"
  >
    <template #column>
      <Column field="user_name" header="User Name" :sortable="true"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="first_name" header="First Name" :sortable="true"></Column>
      <Column field="last_name" header="Last Name" :sortable="true"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="title" header="Title" :sortable="true"></Column>
      <Column field="phone" header="Phone"></Column>
    </template>
  </GlobalDataTable>
</template>

<script setup>
import { ref } from "vue";
import GlobalDataTable from "@/components/layout-ui/table/GlobalDataTable.vue";
import { useMemberStore } from "@/stores/members/member";

const memberPinia = useMemberStore();
memberPinia.getData();
</script>
