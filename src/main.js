import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
// import 'primevue/resources/themes/nova-vue/theme.css'
// import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Button from 'primevue/button';


const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.component('Button', Button );
app.mount("#app");


