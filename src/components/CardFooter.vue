<template>
    <div>
      <hr class="border-1 my-8 border-gray-400 sm:w-4/12 mx-auto">
      <div class="text-center">
        <a href="#" target="_blank"
          class="m-1 p-1 text-gray-600 text-2xl hover:text-blue-600 dark:text-gray-400"><font-awesome-icon
            icon="fa-brands fa-linkedin" /></a>
        <a href="#" target="_blank"
          class="m-1 p-1 text-gray-600 text-2xl hover:text-blue-600 dark:text-gray-400"><font-awesome-icon
            icon="fa-brands fa-facebook" /></a>
        <a href="https://www.instagram.com/syvhix._/" target="_blank"
          class="m-1 p-1 text-gray-600 text-2xl hover:text-blue-600 dark:text-gray-400"><font-awesome-icon
            icon="fa-brands fa-instagram" /></a>
        <a href="https://github.com/syvhix" target="_blank"
          class="m-1 p-1 text-gray-600 text-2xl hover:text-blue-600 dark:text-gray-400"> <font-awesome-icon
            icon="fa-brands fa-github" /></a>
      </div>
      <!-- Affichage de la date de dernière mise à jour -->
      <div class="text-center mt-8 text-gray-500 text-sm">
        Dernière mise à jour : {{ lastUpdated }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const lastUpdated = ref('');
  
  onMounted(() => {
    // Fonction pour obtenir la date actuelle au format "jour mois année"
    const getCurrentDate = () => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('fr-FR', options);
    };
  
    // Assigner la date actuelle à la variable lastUpdated
    lastUpdated.value = getCurrentDate();
  });
  </script>