<template>
    <router-link to="/menu" class="button-link"><button>To Menu</button></router-link>
    <div class="restaurant-statistics">
      <br>
      <h2>Management Statistics</h2>
  
      <!-- Managers Section -->
      <section>
        <p class="subtitleStyle">Managers</p>
        <!-- Add a manager -->
        <div class="infosCustomer" style="margin-top:0;">
          <form @submit.prevent="addManager">
            <label for="managerName">Name:</label>
            <input type="text" v-model="newManager.name" required />
            <label for="managerPassword">Password:</label>
            <input type="password" v-model="newManager.password" required />
            <p class="button-link">
              <button type="submit">Add Manager</button>
            </p>
            
          </form>
        </div>
        <!-- Show Managers -->
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
                <p class="button-link">
                  <button @click="deleteManager(manager.managerId)">Delete</button>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <br>
      <!-- Waiters Section -->
      <section>
        <!-- Add Waiter -->
        <p class="subtitleStyle">Waiters</p>
        <div class="infosCustomer" style="margin-top:0;">
          <form @submit.prevent="addWaiter">
            <label for="waiterName">Name:</label>
            <input type="text" v-model="newWaiter.name" required />
            <label for="waiterPassword">Password:</label>
            <input type="password" v-model="newWaiter.password" required />
            <p class="button-link">
              <button type="submit">Add Waiter</button>
            </p>
          </form>
        </div>
        <!-- Show Waiters -->
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
                <p class="button-link">
                  <button @click="deleteWaiter(waiter.waiterId)">Delete</button>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <br>
      <!-- Dishes Section -->
      <section>
        <p class="subtitleStyle">Dishes</p>
        <!-- Add Dish -->
        <div class="infosCustomer" style="margin-top:0;">
          <form @submit.prevent="addDish">
            <label for="dishName">Dish Name:</label>
            <input type="text" v-model="newDish.name" required />
            <label for="dishPrice">Price:</label>
            <input type="number" v-model="newDish.price" required />
            <label for="dishIngredients">Ingredients:</label>
            <input type="text" v-model="newDish.ingredients" required />
            <label for="dishAllergens">Allergens:</label>
            <input type="text" v-model="newDish.allergens" />
            <p class="button-link">
              <button type="submit">Add Dish</button>
            </p>
            
          </form>
        </div>
  
        <!-- Show Dishes -->
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
                <p class="button-link">
                  <button @click="deleteDish(dish.dishID)">Delete</button>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  
    <div>
      <h2>Order Statistics</h2>
  
      <!-- Display total number of orders and total price -->
      <div>
        <p class="subtitleStyle">Total Number of Orders: {{ totalOrders }}</p>
        <p class="subtitleStyle">Total Price of Orders: {{ totalOrderPrice }}¥</p>
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
      //Upload the manager list from the API/Database to use and print it
      async fetchManagers() {
        try {
          const response = await fetch("http://localhost:3000/managers");
          this.managers = await response.json();
        } catch (error) {
          console.error("Error fetching managers:", error);
        }
      },
      //Upload the waiter list from the API/Database to use and print it
      async fetchWaiters() {
        try {
          const response = await fetch("http://localhost:3000/waiters");
          this.waiters = await response.json();
        } catch (error) {
          console.error("Error fetching waiters:", error);
        }
      },
      //Upload the dishes list from the API/Database to use and print it
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
            allergenesList: this.newDish.allergens || null, //If no allergens, set to null
            dishAvailable: true, //Default to true
            imagePath: "", //Default image path or empty string
          }),
        });
        if (response.ok) {
          //Reset the form fields after success
          this.newDish.name = "";
          this.newDish.price = "";
          this.newDish.ingredients = "";
          this.newDish.allergens = "";
          this.fetchDishes();// Refresh the dishes list
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
        //Retrieve the orders from localStorage (or empty array if no orders)
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        this.orders = orders; //Store the orders in the component data
      },
    },
    mounted() {
      this.fetchManagers();
      this.fetchWaiters();
      this.fetchDishes();
      this.fetchOrders();
  
      //Fetch total number of orders and total order price from localStorage
      const totalOrders = localStorage.getItem("totalOrders");
      const totalOrderPrice = localStorage.getItem("totalOrderPrice");
  
      //If values exist, update local variables
      if (totalOrders && totalOrderPrice) {
        this.totalOrders = parseInt(totalOrders);
        this.totalOrderPrice = parseFloat(totalOrderPrice);
      }
    },
  };
</script>