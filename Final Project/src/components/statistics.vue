<template>
    <router-link to="/menu"><button>To Menu</button></router-link>
    <div class="restaurant-statistics">
      <h1>Management Statistics</h1>
  
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
  
      <!-- Dishes Section -->
      <section>
        <h2>Dishes</h2>
        <form @submit.prevent="addDish">
          <label for="dishName">Dish Name:</label>
          <input type="text" v-model="newDish.name" required />
          <label for="dishPrice">Price:</label>
          <input type="number" v-model="newDish.price" required />
          <label for="dishIngredients">Ingredients:</label>
          <input type="text" v-model="newDish.ingredients" required />
          <label for="dishAllergens">Allergens:</label>
          <input type="text" v-model="newDish.allergens" />
          <button type="submit">Add Dish</button>
        </form>
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Ingredients</th>
              <th>Allergens</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dish in dishes" :key="dish.dishID">
              <td>{{ dish.dishID }}</td>
              <td>{{ dish.dishName }}</td>
              <td>\${{ dish.dishPrice }}</td>
              <td>{{ dish.ingredientList }}</td>
              <td>{{ dish.allergenesList || 'None' }}</td>
              <td>
                <button @click="deleteDish(dish.dishID)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  
    <div class="statistics">
      <h1>Order Statistics</h1>
  
      <!-- Display total number of orders and total price -->
      <div class="order-stats">
        <p>Total Number of Orders: {{ totalOrders }}</p>
        <p>Total Price of Orders: \${{ totalOrderPrice }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [],
        managers: [],
        waiters: [],
        dishes: [],
        newManager: {
          name: "",
          password: "",
        },
        newWaiter: {
          name: "",
          password: "",
        },
        newDish: {
          name: "",
          price: "",
          ingredients: "",
          allergens: "",
        },
        totalOrders: 0,
        totalOrderPrice: 0,
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
      async fetchDishes() {
        try {
          const response = await fetch("http://localhost:3000/dishes");
          this.dishes = await response.json();
        } catch (error) {
          console.error("Error fetching dishes:", error);
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
      async addDish() {
      try {
        const response = await fetch("http://localhost:3000/dishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dishName: this.newDish.name,
            dishPrice: this.newDish.price,
            ingredientList: this.newDish.ingredients,
            allergenesList: this.newDish.allergens || null, // If no allergens, set to null
            dishAvailable: true, // Default to true
            imagePath: "", // Default image path or empty string
          }),
        });
        if (response.ok) {
          // Reset the form fields after success
          this.newDish.name = "";
          this.newDish.price = "";
          this.newDish.ingredients = "";
          this.newDish.allergens = "";
          this.fetchDishes(); // Refresh the dishes list
        } else {
          console.error("Error adding dish");
        }
      } catch (error) {
        console.error("Error adding dish:", error);
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
      async deleteDish(dishID) {
        try {
          const response = await fetch(`http://localhost:3000/dishes/${dishID}`, {
            method: "DELETE",
          });
          if (response.ok) {
            this.fetchDishes();
          } else {
            console.error("Error deleting dish");
          }
        } catch (error) {
          console.error("Error deleting dish:", error);
        }
      },
      fetchOrders() {
        // Retrieve the orders from localStorage (or empty array if no orders)
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        this.orders = orders; // Store the orders in the component data
      },
    },
    mounted() {
      this.fetchManagers();
      this.fetchWaiters();
      this.fetchDishes();
      this.fetchOrders();
  
      // Fetch total number of orders and total order price from localStorage
      const totalOrders = localStorage.getItem("totalOrders");
      const totalOrderPrice = localStorage.getItem("totalOrderPrice");
  
      // If values exist, update local variables
      if (totalOrders && totalOrderPrice) {
        this.totalOrders = parseInt(totalOrders);
        this.totalOrderPrice = parseFloat(totalOrderPrice);
      }
    },
  };
  </script>
  
  <style scoped>
    /* Add your styling for dishes section here */
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
  
    th, td {
      padding: 0.5rem;
      border: 1px solid #ddd;
      text-align: left;
    }
  
    form {
      margin-bottom: 1rem;
    }
  
    .statistics {
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
  
    .order-stats {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  </style>
  