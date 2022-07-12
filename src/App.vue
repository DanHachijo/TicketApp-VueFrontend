<template>




<div class="card bg-blue-700">
  <p class="yellow-700">Hi</p>
    <div class="flex flex-row flex-wrap card-container blue-container">
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-blue-500 font-bold text-white border-round m-2">1</div>
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-blue-500 font-bold text-white border-round m-2">2</div>
        <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-blue-500 font-bold text-white border-round m-2">3</div>
    </div>
</div>

        <h5>Rounded Buttons</h5>
        <Button label="Primary" class="p-button-rounded" />
        <Button label="Secondary" class="p-button-rounded p-button-secondary" />
        <Button label="Success" class="p-button-rounded p-button-success" />
        <Button label="Info" class="p-button-rounded p-button-info" />
        <Button label="Warning" class="p-button-rounded p-button-warning" />
        <Button label="Help" class="p-button-rounded p-button-help" />
        <Button label="Danger" class="p-button-rounded p-button-danger" />


    <div>
        <h5>Basic</h5>
        <ToggleButton v-model="checked1" onIcon="pi pi-check" offIcon="pi pi-times" />

        <h5>Customized</h5>
        <ToggleButton v-model="checked2" onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times" style="width: 10em" />
    </div>



</template>


<script setup>
import ToggleButton from 'primevue/togglebutton';

</script>



