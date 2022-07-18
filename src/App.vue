<template>
  <LayoutView></LayoutView>

  <!-- POP UP MESSAGE -->
  <Toast position="bottom-left" />
  <Button label="Bottom Left" class="p-button-warning" @click="showSuccess" />
</template>

<script setup>
import LayoutView from "@/components/layout-ui/LayoutView.vue";
import { watch, onMounted } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useOfficeStore } from "@/stores/members/office";

const toast = useToast();

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showError = () => {
  toast.add({
    severity: "warn",
    summary: "Error Occurred",
    detail: "Something went wrong",
    life: 3000,
  });
};

// provide('showSuccess',showSuccess)
// provide('showError',showError)
onMounted(() => {
  const officePinia = useOfficeStore();
  const officeData = officePinia.createdOffice;
  console.log(officeData);
  watch(officeData, (newData, oldData) => {
    if (newData != oldData) {
      console.log(officeData.value);
      showSuccess();
    }
  });
});
</script>

<style>
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
