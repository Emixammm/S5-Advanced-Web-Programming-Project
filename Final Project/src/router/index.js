import { createRouter, createWebHistory } from 'vue-router';


import App from '../App.vue';
import Qr from '../components/QrCode.vue';
import prerequisites from '../components/prerequisites.vue';
import menu from '../components/menu.vue';
/*
import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';
import TodoDetail from '../components/TodoDetail.vue';
*/
const router = createRouter({
    history : createWebHistory(),
    routes: [
        {path : '/', name: 'Home', component : prerequisites},
        {path : '/Menu', name: 'Menu', component : menu},
        /*{path : '/ToDo', name : 'TodoForm', component : TodoForm},
        {path : '/Detail/:id', name : 'TodoDetail', component : TodoDetail, props: true}*/
    ]
})

export default router
