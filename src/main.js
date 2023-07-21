import { createApp } from 'vue'
import App from './App.vue'

//importo il router
import { router } from './router';

// importo bootstrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

createApp(App).use(router).mount('#app')
