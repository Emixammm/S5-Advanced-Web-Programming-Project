<template>
    <div class="order">
      <h1>Your Orders</h1>
      <div v-if="orders.length > 0">
        <h2>Order Summary</h2>
        <div v-for="(order, index) in orders" :key="index" class="order-item">
          <h3>Order #{{ index + 1 }} ({{ order.date }})</h3>
          <ul>
            <li v-for="(dish, i) in order.dishes" :key="i">
              {{ dish.dishName }} - \${{ dish.dishPrice }}
            </li>
          </ul>
          <h4>Total: \${{ order.totalPrice }}</h4>
        </div>
        <h3>Grand Total: \${{ grandTotal }}</h3>
      </div>
      <div v-else>
        <p>You have no orders yet. Go back to the menu to place an order.</p>
        <router-link to="/" class="back-to-menu">Go back to Menu</router-link>
      </div>
  
        <!-- Button to go back to the menu page for new orders -->
      <button @click="goBackToMenu" class="go-back-button">
        Go back to ordering
      </button><br><br>
      <!-- Button to clear orders and navigate to the Paying page -->
      <button v-if="!isUser" @click="clearOrdersAndGoToPaying" class="paying-button" :disabled="orders.length === 0">
        Proceed to Payment
      </button>
      <button v-if="isAdmin" @click="clearOrders">Clear Orders</button>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [], // Array to store all the orders
        isUser: localStorage.getItem("role")=== "user",
        isAdmin: localStorage.getItem("role")=== "admin",
      };
    },
    computed: {
      // Compute the grand total of all orders
      grandTotal() {
        return this.orders.reduce((total, order) => total + order.totalPrice, 0);
      },
    },
    mounted() {
      // Retrieve the orders from localStorage
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    },
    methods: {
      clearOrdersAndGoToPaying() {
        // Clear the orders from localStorage
        localStorage.removeItem("orders");
  
        // Navigate to the Paying page
        this.$router.push({ name: "Paying" });
      },
      goBackToMenu() {
        // Navigate back to the Menu page
        this.$router.push({ name: "Menu" });
      },
      clearOrders(){
        localStorage.removeItem("orders");
        this.orders = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .order {
    margin: 20px;
  }
  
  .order-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .paying-button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    font-size: 18px;
    border: none;
    cursor: pointer;
  }
  
  .paying-button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
  
  .go-back-button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    font-size: 18px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .go-back-button:hover {
    background-color: darkblue;
  }
  
  .back-to-menu {
    text-decoration: none;
    color: blue;
    font-size: 16px;
  }
  </style>
  