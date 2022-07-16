<template>
  <Dialog
    :header="Header"
    v-model:visible="displayModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <slot name="contents"></slot>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="closeModal"
        class="p-button-text"
      />
      <Button v-if="okBtn" :label="okBtn" icon="pi pi-check" @click="closeModal();okClick();" :class="btnClass" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue';
import { useOfficeStore } from "@/stores/members/office";

const officePinia = useOfficeStore();

const props = defineProps([
  "Header",
  "okBtn",
  "btnClass"
])

const displayModal = ref(false);
const openModal = () => {
  displayModal.value = true;
};
const closeModal = () => {
  displayModal.value = false;
};

const emit = defineEmits("okClick")
const okClick = () => {
  emit('okClick')
}

defineExpose({
  openModal,
})
</script>
