<template>
    <div class="restaurant-statistics">
      <h1>Restaurant Statistics</h1>
  
      <!-- Managers Section -->
      <section>
        <h2>Managers</h2>
        <form @submit.prevent="addManager">
          <label for="managerName">Name:</label>
          <input type="text" v-model="newManager.name" required />
          <label for="managerPassword">Password:</label>
          <input type="password" v-model="newManager.password" required />
          <button type="submit">Add Manager</button>
        </form>
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="manager in managers" :key="manager.managerId">
              <td>{{ manager.managerId }}</td>
              <td>{{ manager.ManagerName }}</td>
              <td>
                <button @click="deleteManager(manager.managerId)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
  
      <!-- Waiters Section -->
      <section>
        <h2>Waiters</h2>
        <form @submit.prevent="addWaiter">
          <label for="waiterName">Name:</label>
          <input type="text" v-model="newWaiter.name" required />
          <label for="waiterPassword">Password:</label>
          <input type="password" v-model="newWaiter.password" required />
          <button type="submit">Add Waiter</button>
        </form>
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="waiter in waiters" :key="waiter.waiterId">
              <td>{{ waiter.waiterId }}</td>
              <td>{{ waiter.waiterName }}</td>
              <td>
                <button @click="deleteWaiter(waiter.waiterId)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        managers: [],
        waiters: [],
        newManager: {
          name: "",
          password: "",
        },
        newWaiter: {
          name: "",
          password: "",
        },
      };
    },
    methods: {
      async fetchManagers() {
        try {
          const response = await fetch("http://localhost:3000/managers");
          this.managers = await response.json();
        } catch (error) {
          console.error("Error fetching managers:", error);
        }
      },
      async fetchWaiters() {
        try {
          const response = await fetch("http://localhost:3000/waiters");
          this.waiters = await response.json();
        } catch (error) {
          console.error("Error fetching waiters:", error);
        }
      },
      async addManager() {
        try {
          const response = await fetch("http://localhost:3000/managers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.newManager),
          });
          if (response.ok) {
            this.newManager.name = "";
            this.newManager.password = "";
            this.fetchManagers();
          } else {
            console.error("Error adding manager");
          }
        } catch (error) {
          console.error("Error adding manager:", error);
        }
      },
      async addWaiter() {
        try {
          const response = await fetch("http://localhost:3000/waiters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.newWaiter),
          });
          if (response.ok) {
            this.newWaiter.name = "";
            this.newWaiter.password = "";
            this.fetchWaiters();
          } else {
            console.error("Error adding waiter");
          }
        } catch (error) {
          console.error("Error adding waiter:", error);
        }
      },
      async deleteManager(managerId) {
        try {
          const response = await fetch(`http://localhost:3000/managers/${managerId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            this.fetchManagers();
          } else {
            console.error("Error deleting manager");
          }
        } catch (error) {
          console.error("Error deleting manager:", error);
        }
      },
      async deleteWaiter(waiterId) {
        try {
          const response = await fetch(`http://localhost:3000/waiters/${waiterId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            this.fetchWaiters();
          } else {
            console.error("Error deleting waiter");
          }
        } catch (error) {
          console.error("Error deleting waiter:", error);
        }
      },
    },
    mounted() {
      this.fetchManagers();
      this.fetchWaiters();
    },
  };
  </script>
  
  <style scoped>
  .restaurant-statistics {
    padding: 1rem;
  }
  
  section {
    margin-bottom: 2rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  form {
    margin-bottom: 1rem;
  }
  </style>
  