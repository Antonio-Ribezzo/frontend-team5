import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import NotFound from './pages/NotFound.vue';
import singleRestaurant from './pages/singleRestaurant.vue';


const router = createRouter({
history: createWebHistory(),
routes: [
    {
        path: '/',
        name: 'AppHome',
        component: AppHome
    },
    {
        path: '/restaurant/:slug/:id',
        name: 'restaurant',
        component: singleRestaurant
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: NotFound
    },
]
});
export { router };