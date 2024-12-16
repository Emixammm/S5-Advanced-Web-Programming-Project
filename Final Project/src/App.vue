<template>
  <header>
    <h1>Restaurant name</h1>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/logIn">Log In</router-link>
    </nav>
    <router-view></router-view>
  </header>
</template>

<script>
import { provide, ref } from 'vue';

export default {
  setup() {
    const tasks = ref([
      { id: 1, title: 'Learn Vue 3', content: 'Learn the fundamentals of Vue.js 3 !' },
      { id: 2, title: 'Build a Project', content: 'Build a project from A to Z !' },
    ]);
    provide('tasks', tasks);
    return { tasks };
  },
};
</script>
