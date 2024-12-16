<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <button type="submit" class="login-button">Login</button>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });

        const { role } = response.data;

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", role);

        if (role === "admin") {
          console.log("You are logged in as an admin");
        } else if (role === "user") {
          console.log("You are logged in as a user");
        }

        this.$router.push({ name: "Menu" });
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      }
    },
  },
};
</script>
