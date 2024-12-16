<template>
  <div class="menu">
    <h1>Menu</h1>

    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Image</th>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Allergens</th>
          <th>Price</th>
          <th>Available</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dish in dishes" :key="dish.dishID">
          <td>
            <input 
              type="checkbox" 
              :value="dish" 
              @change="toggleDishSelection(dish)"
            />
          </td>
          <td>
            <img :src="dish.imagePath" :alt="dish.dishName" class="dish-image" />
          </td>
          <td>{{ dish.dishName }}</td>
          <td>{{ dish.ingredientList }}</td>
          <td>{{ dish.allergenesList || 'None' }}</td>
          <td>\${{ dish.dishPrice }}</td>
          <td>{{ dish.dishAvailable ? 'Yes' : 'No' }}</td>
          <td><button v-if="isAdmin" @click="deleteDish(dish.dishID)">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Order Line -->
    <div class="order-line">
      <h2>Order Line</h2>
      <ul>
        <li v-for="dish in selectedDishes" :key="dish.dishID">
          {{ dish.dishName }} - \${{ dish.dishPrice }}
        </li>
      </ul>
      <h3>Total Price: \${{ totalPrice }}</h3>
      <!-- Order Button -->
      <button @click="placeOrder" :disabled="selectedDishes.length === 0">Place Order</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dishes: [], // Array to store fetched dishes
      selectedDishes: [], // Array to store selected dishes
      isAdmin: localStorage.getItem("role")=== "admin",
    };
  },
  computed: {
    totalPrice() {
      return this.selectedDishes.reduce((total, dish) => total + dish.dishPrice, 0);
    },
  },
  methods: {
    async fetchDishes() {
      try {
        const response = await fetch("http://localhost:3000/dishes");
        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }
        const data = await response.json();
        this.dishes = data;
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    },
    toggleDishSelection(dish) {
      const index = this.selectedDishes.findIndex(selected => selected.dishID === dish.dishID);
      if (index !== -1) {
        this.selectedDishes.splice(index, 1);
      } else {
        this.selectedDishes.push(dish);
      }
    },
    placeOrder() {
      // Retrieve the existing orders from localStorage
      let orders = JSON.parse(localStorage.getItem("orders")) || [];

      // Add the current selected dishes to the orders list
      orders.push({
        dishes: [...this.selectedDishes],
        totalPrice: this.totalPrice,
        date: new Date().toLocaleString(),
      });

      // Save the updated orders list back to localStorage
      localStorage.setItem("orders", JSON.stringify(orders));

      // Clear the selected dishes
      this.selectedDishes = [];

      // Optionally navigate to the Order page after placing the order
      this.$router.push({ name: "Order" });
    },
    async deleteDish(dishID) {
      try {
        const response = await fetch(`http://localhost:3000/dishes/${dishID}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the dish from the local list and update the UI
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


<style scoped>
.dish-table {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

.dish-image {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
</style>