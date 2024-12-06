<template>
    <div class="qr-code-generator">
      <h1>Générateur de QR Code</h1>
      <input
        v-model="text"
        placeholder="Entrez du texte"
        @input="generateQRCode"
      />
      <canvas ref="qrcodeCanvas"></canvas>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import QRCode from "qrcode";
  
  export default {
    data() {
      return {
        text: "Texte par défaut", // Texte initial
        errorMessage: "", // Message d'erreur
      };
    },
    methods: {
      async generateQRCode() {
        const canvas = this.$refs.qrcodeCanvas;
  
        if (!canvas) {
          this.errorMessage = "Erreur : Le canvas QR Code n'est pas trouvé.";
          return;
        }
  
        try {
          this.errorMessage = ""; // Reset message d'erreur
          await QRCode.toCanvas(canvas, this.text, {
            width: 200, // Taille du QR code
            margin: 1, // Marges autour du QR code
          });
        } catch (error) {
          console.error("Erreur lors de la génération du QR Code :", error);
          this.errorMessage =
            "Erreur : Impossible de générer le QR Code. Vérifiez le texte.";
        }
      },
    },
    mounted() {
      // Générer un QR code au montage du composant
      this.generateQRCode();
    },
  };
  </script>
  
  <style>
  .qr-code-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>