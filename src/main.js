import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-green/theme.css'

import Button from 'primevue/button';


const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.mount("#app");

app.component('Button', Button );

