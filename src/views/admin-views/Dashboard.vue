<template>
  <div class="flex flex-column">
    <h2 class="">Welcome to the Ticket Management App demo.</h2>

    <div class="my-4">
      <h3>How to use this app</h3>
      <div>
        <p>1. Use the toggle menu to navigate to "Tech" -> "Tickets"</p>
        <p>2. Create, Read, Update, Delete any tickets.</p>
        <p>3. Try using the filter, search and sort function in the data table!</p>
        <p>4. You can also export the filtered data to SCV file. </p>
        <p>5. Database will restore the default value every one hour.</p>
      </div>
    </div>

    <div class="my-4">
      <h3>Frontend Repository (What you are seeing now)</h3>
      <a
        href="https://github.com/TraitOtaku/TicketApp-VueFrontend"
        target="_blank"
        >https://github.com/TraitOtaku/TicketApp-VueFrontend</a
      >
    </div>

    <div class="my-4">
      <h3>Backend Repository (Python Django REST Framework API)</h3>
      <a
        href="https://github.com/TraitOtaku/Django-TicketAppAPI"
        target="_blank"
        >https://github.com/TraitOtaku/Django-TicketAppAPI</a
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  background-color: rgb(140, 207, 236);
}
</style>
