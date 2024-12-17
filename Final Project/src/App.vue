<template>
  <header>
    <div>
      <h1>ALL MIGHTS</h1>
      <h3>The cavalry is delivering food !</h3>
    </div>
    <!--- nav change if we are log as admin or not --->
    <nav v-if="!isLoggin">
      <router-link to="/" class="navButton">Home</router-link>
      <router-link to="/logIn" class="navButton">Log In</router-link>
    </nav>
    <nav v-else>
      <router-link to="/" class="navButton" @click="logOut">Log out</router-link>
    </nav>
  </header>
  <body>
    <router-view></router-view>
  </body> 
 <footer>
        <p>&copy; 2024 All Mights reserved. </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      //Define if we are login in or not
      isLoggin: localStorage.getItem("loggedIn") === "true",
    };
  },
  methods: {
    logOut() {
      //Change the role to the default role, the customer and isLoggin
      localStorage.setItem("role", "customer");
      this.isLoggin = false;
    },
  },
});
</script>

<style>
  body {
  margin: 130px 0 80px 0;
  font-family: 'Impact', 'Arial', sans-serif;
  background: #fffcd8;
  justify-content: center;
  align-items: center;
  text-align: center;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to right, #0033a0, #ffd700);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 5px solid #ffd700;
    z-index: 1000;
  }

  h1 {
    color: #FFD700; /* Couleur or (inspirée des éléments lumineux de son costume) */
    text-shadow: 2px 2px #FF4500; /* Ombre rouge pour un effet punchy */
    font-family: 'Impact', sans-serif; /* Une police héroïque */
    text-align: center;
    margin : 0;
    font-size: 2.5rem;
    text-transform: uppercase;

  }

  h2 {
    font-size: 2rem;
    color: #0033a0;
    margin-bottom: 1rem;
    text-shadow: 4px 4px 0px #ffd700;
  }

  h3 {
    font-style: italic; /* Texte en italique */
    color: #FFFFFF; /* Blanc pur pour contraste */
    text-align: center; /* Centrer sous le titre */
    margin : 0;
    font-family: 'Tahoma', sans-serif;
  
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 15px; /* Espace entre les boutons */
    margin-top: 10px;
    margin-right: 5%;
  }

  .navButton {
    font-family: 'Trebuchet MS', sans-serif;
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    text-decoration: none;
    background: linear-gradient(90deg, #0000FF, #FF0000); /* Dégradé bleu à rouge */
    border: 3px solid #FFD700; /* Bordure dorée */
    border-radius: 8px; /* Coins arrondis */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Ombre pour un effet 3D */
    transition: transform 0.2s, box-shadow 0.2s; /* Animation fluide */
  }

  .navButton:hover {
    transform: scale(1.1); /* Agrandissement */
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5); /* Ombre accentuée */
    cursor: pointer;
  }

  .navButton:active {
    transform: scale(1); /* Retour à la taille normale */
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3); /* Réduction de l'ombre */
  }

  footer {
    text-align: center;
    margin-top: 2rem;
    color: #ffffff;
    font-size: 0.9rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to left, #0033a0, #ffd700);
    z-index: 1000;
    }
</style>