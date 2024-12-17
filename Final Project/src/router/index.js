import { createRouter, createWebHistory } from 'vue-router';


import prerequisites from '../components/prerequisites.vue';
import menu from '../components/menu.vue';
import order from "../components/order.vue";
import paying from "@/components/paying.vue";
import logIn from "../components/logIn.vue";
import statistics from '@/components/statistics.vue';

const router = createRouter({
    history : createWebHistory(),
    routes: [
        {path : '/', name: 'Home', component : prerequisites},
        {path : '/Menu', name: 'Menu', component : menu},
        {path : '/Order', name: 'Order', component : order},
        {path : '/Paying', name: 'Paying', component : paying},
        {path : '/LogIn', name: 'LogIn', component : logIn},
        {path : '/Statistics', name: 'Statistics', component : statistics}
    ]
})

export default router
