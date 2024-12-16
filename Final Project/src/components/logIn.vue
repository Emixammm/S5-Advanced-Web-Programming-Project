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
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "", 
    };
  },
  methods: {
    // Inside Login.vue
    handleLogin() {
        const validUsername = "admin";
        const validPassword = "admin123"; // Admin credentials
        const validUser = "user"; // Regular user credentials
        const validUserPassword = "user123";

        if (
            (this.username === validUsername && this.password === validPassword) ||
            (this.username === validUser && this.password === validUserPassword)
        ) {
            if (this.username === validUsername) {
            // Admin login
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("role", "admin"); // Mark the user as an admin
            console.log("You are an " + localStorage.getItem("role"));

            } else {
            // Regular user login
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("role", "user"); // Regular user
            console.log("You are an " + localStorage.getItem("role"));
            }

            this.$router.push({ name: "Menu" });
        } else {
            this.errorMessage = "Invalid username or password. Please try again.";
        }
    }
  },
};
</script>