<template>
    <div>
      <h1>Number of table:</h1>
      <input
        type="text"
        v-model="tableNumber"
        @input="validateTableNumber"
        placeholder="1~18"
      />
      <p v-if="tableNumberError" style="color: red;">{{ tableNumberError }}</p>
  
      <h1>Number of attendees:</h1>
      <input
        type="text"
        v-model="attendeesNumber"
        @input="validateAttendeesNumber"
        placeholder="1~10"
      />
      <p v-if="attendeesNumberError" style="color: red;">{{ attendeesNumberError }}</p>
  
      <button @click="handleSubmit">
        <router-link to="/Menu">Menu</router-link>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableNumber: "",
        attendeesNumber: "",
        tableNumberError: "",
        attendeesNumberError: "",
      };
    },
    methods: {
      validateTableNumber() {
        const num = parseInt(this.tableNumber, 10);
        if (isNaN(num) || num < 1 || num > 18) {
          this.tableNumberError = "Please enter a number between 1 and 18.";
        } else {
          this.tableNumberError = "";
        }
      },
      validateAttendeesNumber() {
        const num = parseInt(this.attendeesNumber, 10);
        if (isNaN(num) || num < 1 || num > 10) {
          this.attendeesNumberError = "Please enter a number between 1 and 10.";
        } else {
          this.attendeesNumberError = "";
        }
      },
      handleSubmit() {
        let isValid = true;
  
        // Re-check both validations to ensure correctness on submit
        const tableNum = parseInt(this.tableNumber, 10);
        const attendeesNum = parseInt(this.attendeesNumber, 10);
  
        if (isNaN(tableNum) || tableNum < 1 || tableNum > 18) {
          console.error("Invalid table number: must be between 1 and 18.");
          this.tableNumberError = "Please enter a number between 1 and 18.";
          isValid = false;
        }
  
        if (isNaN(attendeesNum) || attendeesNum < 1 || attendeesNum > 10) {
          console.error("Invalid number of attendees: must be between 1 and 10.");
          this.attendeesNumberError = "Please enter a number between 1 and 10.";
          isValid = false;
        }
  
        if (!isValid) {
          console.warn("Form submission blocked due to invalid input.");
        } else {
          console.log("Form submitted successfully!");
          // Redirect logic or API call can go here
        }
      },
    },
  };
  </script>
  
  <style scoped>
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  button {
    margin-top: 10px;
  }
  </style>
  