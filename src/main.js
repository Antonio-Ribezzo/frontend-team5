import { createApp } from 'vue'
import App from './App.vue'

//importo il router
import { router } from './router';

// importo bootstrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

//importo braintree
import Vue from 'vue'
import VueBraintree from 'vue-braintree'
import App from './App.vue'

Vue.use(VueBraintree)

new Vue({
    render: (h) => h(App),
}).$mount('#app')

createApp(App).use(router).mount('#app')