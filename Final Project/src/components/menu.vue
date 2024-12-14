<!--<template>
    <h1>SUPER MENUUUU</h1>
    <div>
        <div>
            <p>la photo de la catégorie </p>
            <h2>Dishes Categorie</h2>
        </div>
    </div>
    <div>
        <h2>Nom en grand du Dish type</h2>
        <div>
            <p>mettre l'image</p>
            <p>mettre en un peu grand le nom du plat</p> si on clique sur la div, autre que le bouton, affiche le plat en grand et son nom 
            <p>mettre un bouton + pour pouvoir ajouter le plat au panier </p>
        </div>
        faire une div comme ça à chaque plat 


    </div>
    et mettre sur le côté un bouton récapitulatif de la commande, on peut ensuite gérer la commande, ajouter un plat, retirer, valider la commande
</template>
-->

<template>
    <div>
      <h1>Nos plats</h1>
      <div v-if="loading">Chargement...</div>
      <div v-else>
        <div v-for="plat in plats" :key="plat.id" class="plat">
          <img :src="plat.photo" alt="Image du plat" />
          <h2>{{ plat.nom }}</h2>
          <p>{{ plat.description }}</p>
          <span>Catégorie : {{ plat.categorie }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        plats: [],
        loading: true,
      };
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3000/plats');
        this.plats = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des plats :', error);
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  
  <style>
  .plat {
    margin-bottom: 20px;
  }
  img {
    width: 200px;
    height: auto;
  }
  </style>
  