import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import VueBraintree from 'vue-braintree'

createApp(App)
    .use(router)
    .use(VueBraintree)
    .mount('#app')