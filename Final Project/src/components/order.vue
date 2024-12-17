<template>
    <div>
      <h2>Your Orders</h2>
      <div v-if="orders.length > 0">
        <div v-for="(order, index) in orders" :key="index" class="order-item">
          <p class="subtitleStyle">Order #{{ index + 1 }} ({{ order.date }})</p>
          <ul>
            <li v-for="(dish, i) in order.dishes" :key="i">
              {{ dish.dishName }} - {{ dish.dishPrice }}¥
            </li>
          </ul>
          <p class="subtitleStyle">Total: {{ order.totalPrice }}¥</p>
        </div>
        <p class="subtitleStyle">Grand Total: {{ grandTotal }}¥</p>
      </div>
      <div v-else>
        <p>You have no orders yet. Go back to the menu to place an order.</p>
      </div>
  
        <!--Button to go back to the menu page for new orders -->
      <p class="button-link">
        <button @click="goBackToMenu">Go back to ordering</button>
      </p>
      <!--Button to clear orders and navigate to the Paying page -->
      <p class="button-link">
        <button v-if="!isUser" @click="clearOrdersAndGoToPaying" :disabled="orders.length === 0">Proceed to Payment</button>
      </p>
      <!--Button to clear orders without paying as an admin-->
    <p class="button-link">
      <button v-if="isAdmin" @click="clearOrders">Clear Orders</button>
    </p>   
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        orders: [], //Array to store all the orders
        isUser: localStorage.getItem("role")=== "user",
        isAdmin: localStorage.getItem("role")=== "admin",
      };
    },
    computed: {
      //Compute the grand total of all orders
      grandTotal() {
        return this.orders.reduce((total, order) => total + order.totalPrice, 0);
      },
    },
    mounted() {
      //Retrieve the orders from localStorage
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    },
    methods: {
      clearOrdersAndGoToPaying() {
        //Clear the orders from localStorage
        localStorage.removeItem("orders");
  
        //Navigate to the Paying page
        this.$router.push({ name: "Paying" });
      },
      goBackToMenu() {
        //Navigate back to the Menu page
        this.$router.push({ name: "Menu" });
      },
      clearOrders(){
        localStorage.removeItem("orders");
        this.orders = [];
      },
    },
  };
</script>