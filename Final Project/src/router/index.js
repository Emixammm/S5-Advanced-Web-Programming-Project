import { createRouter, createWebHistory } from 'vue-router';


import App from '../App.vue';
import Qr from '../components/QrCode.vue';
import prerequisites from '../components/prerequisites.vue';
import menu from '../components/menu.vue';
import order from "../components/order.vue";
import paying from "@/components/paying.vue";
import logIn from "../components/logIn.vue";

const router = createRouter({
    history : createWebHistory(),
    routes: [
        {path : '/', name: 'Home', component : prerequisites},
        {path : '/Menu', name: 'Menu', component : menu},
        {path : '/Order', name: 'Order', component : order},
        {path : '/Paying', name: 'Paying', component : paying},
        {path : '/LogIn', name: 'LogIn', component : logIn}
    ]
})

export default router
