import { createRouter, createWebHistory } from 'vue-router';
import NotFound from './pages/NotFound.vue';
import singleRestaurant from './pages/singleRestaurant.vue';

const router = createRouter({
history: createWebHistory(),
routes: [
    {
        path: '/restaurant/:slug',
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