<template>
    <router-link to="/statistics" class="button-link">
    <button v-if="isAdmin">Go to statistics</button>
  </router-link>
  <div>
    <!--- menu table --->
    <h2>Menu</h2>
    <table>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Image</th>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Allergens</th>
          <th>Price</th>
          <th>Available</th>
          <!--- only if we are connected as Admin --->
          <th v-if="isAdmin">Action</th>
        </tr>
      </thead>
      <!--- show each dish --->
      <tbody>
        <tr v-for="dish in dishes" :key="dish.dishID">
          <td>
            <!-- choose the quantity for dish -->
            <input 
              type="number" 
              :min="1" 
              v-model.number="dish.selectedQuantity" 
              @change="toggleDishSelection(dish)" 
            />
          </td>
          <td>
            <img :src="dish.imagePath" :alt="dish.dishName" class="dish-image" />
          </td>
          <td>{{ dish.dishName }}</td>
          <td>{{ dish.ingredientList }}</td>
          <td>{{ dish.allergenesList || 'None' }}</td>
          <td>{{ dish.dishPrice }}¥</td>
          <td>{{ dish.dishAvailable ? 'Yes' : 'No' }}</td>
          <td v-if="isAdmin">
            <!-- only for admin -->
             <p class="button-link"><button @click="deleteDish(dish.dishID)">Delete</button></p>
            
          </td>
        </tr>
      </tbody>
    </table>

    <!-- show current order -->
    <div>
      <h2>Order Line</h2>
      <ul>
        <!-- print each dish of the order -->
        <li v-for="dish in selectedDishes" :key="dish.dishID">
          {{ dish.dishName }} - Quantity: {{ dish.quantity }} - {{ dish.dishPrice * dish.quantity }}¥
        </li>
      </ul>
      <p id="totalPrice">Total Price: {{ totalPrice }}¥</p>
      <!-- if there isn't dish selected, we can't place the order -->
      <p class="button-link">
        <button @click="placeOrder" :disabled="selectedDishes.length === 0">Place Order</button>
      </p>
      <router-link to="/order" class="button-link"><button>Go to Orders</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dishes: [], //Array to store fetched dishes
      selectedDishes: [], //Array to store selected dishes with quantities
      isAdmin: localStorage.getItem("role") === "admin",
    };
  },
  computed: {
    totalPrice() {
      return this.selectedDishes.reduce((total, dish) => total + (dish.dishPrice * dish.quantity), 0);
    },
  },
  methods: {
    //Upload the dishes list from the API/Database to use and print it
    async fetchDishes() {
      try {
        const response = await fetch("http://localhost:3000/dishes");
        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }
        const data = await response.json();
        //Add selectedQuantity for each dish to have the quantity of them
        this.dishes = data.map(dish => ({
          ...dish,
          selectedQuantity: 0, //Initialization
        }));
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    },

    toggleDishSelection(dish) {
      //Remove dish from the list if quantity = 0
      if (dish.selectedQuantity === 0) {
        const index = this.selectedDishes.findIndex(d => d.dishID === dish.dishID);
        if (index !== -1) { //If there is the dish into the list
          this.selectedDishes.splice(index, 1);
        }
      } else {
        //Add dish with its quantity
        const existingDish = this.selectedDishes.find(d => d.dishID === dish.dishID);
        if (existingDish) {
          existingDish.quantity = dish.selectedQuantity; //Update quantity
        } else {
          this.selectedDishes.push({
            ...dish,
            quantity: dish.selectedQuantity, //Add dish quantity
          });
        }
      }
    },
    placeOrder() {
      //Retrieve the existing orders from localStorage
      let orders = JSON.parse(localStorage.getItem("orders")) || [];

      //Add the current selected dishes to the orders list
      const newOrder = {
        dishes: [...this.selectedDishes],
        totalPrice: this.totalPrice,
        date: new Date().toLocaleString(),
      };

      orders.push(newOrder);

      //Save the updated orders list back to localStorage
      localStorage.setItem("orders", JSON.stringify(orders));

      //Update total number of orders and total price of orders
      const totalOrders = orders.length;
      const totalOrderPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

      //Save these stats as local variables in localStorage
      localStorage.setItem("totalOrders", totalOrders);
      localStorage.setItem("totalOrderPrice", totalOrderPrice);

      //Clear the selected dishes
      this.selectedDishes = [];

      //Navigate to the Order page after placing the order
      this.$router.push({ name: "Order" });
    },

    async deleteDish(dishID) {
      try {
        const response = await fetch(`http://localhost:3000/dishes/${dishID}`, {
          method: "DELETE",
        });
        if (response.ok) {
          //Remove the dish from the local list and update the UI
          this.dishes = this.dishes.filter(dish => dish.dishID !== dishID);
          alert("Dish deleted successfully!");
        } else {
          alert("Failed to delete the dish.");
        }
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    },
  },
  mounted() {
    this.fetchDishes();
  },
};
</script>

<style>
.dish-table {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse; /* Fusionne les bordures */
  border: 3px solid #dc2626; /* Bordure extérieure rouge */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Effet d'ombre global */
}

table thead {
  background-color: #1e3a8a;
  color: #facc15;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  font-size: 1.5em;
}

table thead th {
  padding: 10px 15px;
  text-align: center;
}

tbody tr {
  background-color: #ffffff;
  color: #000;
}

tbody tr:nth-child(even) {
  background-color: #e0f2fe;
}

td, th {
  padding: 10px;
  text-align: center;
  border: 2px solid #facc15;
}

tbody tr:hover {
  background-color: #fef9c3;
  transform: scale(1.01);
  transition: all 0.2s ease-in-out;
}

ul {
  list-style-type: none;
  margin: 0 20% 0 20%;
  padding: 0;
  background-color: #f1c40f;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

li {
  background-color: #e74c3c;
  color: white; 
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  text-transform: uppercase;
}

li:nth-child(even) {
  background-color: #2980b9;
}

.dish-image {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
</style>