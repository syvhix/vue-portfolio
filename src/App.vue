<template>
  <!-- Ajouter une classe 'dark' si le mode sombre est activé -->
  <div :class="isDarkMode ? 'dark' : ''">
    <div class="relative">
      <!-- Lien vers la page d'accueil -->
      <router-link to="/Home">
        <!-- Logo -->
        <img src="./assets/imgs/images.jpeg" alt="Logo" class="h-12 w-12 rounded-full absolute top-5 left-5 cursor-pointer" />
      </router-link>
      <!-- Contenu principal avec possibilité de mode sombre -->
      <div class="bg-blue-100 min-h-screen sm:p-10 p-5 flex flex-col justify-center dark:bg-[#0F172A] duration-500 transition-all ease-in-out">
        <!-- Bouton pour basculer entre les modes sombre et clair -->
        <button @click="toggleDarkMode" class="animate-pulse">
          <!-- Composant ModeToggler -->
          <ModeToggler :class="isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
        </button>
        <!-- En-tête de la carte -->
        <CardHeader />
        <!-- Affichage dynamique des vues -->
        <RouterView />
        <!-- Pied de page de la carte -->
        <CardFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
// Importation des composants et des fonctionnalités Vue
import ModeToggler from './components/ModeToggler.vue';
import CardHeader from './components/CardHeader.vue';
import CardFooter from './components/CardFooter.vue';
import { ref, onMounted } from 'vue';

// Utilisation d'une référence réactive pour le mode sombre
const isDarkMode = ref(false);

// Fonction exécutée après le montage du composant
onMounted(() => {
  // Vérification du thème enregistré dans le stockage local ou selon les préférences du système
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true;
  } else {
    isDarkMode.value = false;
  }
})

// Fonction pour basculer entre les modes sombre et clair
const toggleDarkMode = () => {
  if (isDarkMode.value) {
    localStorage.theme = 'light';
    isDarkMode.value = false;
  } else {
    localStorage.theme = 'dark';
    isDarkMode.value = true;
  }
}
</script>
