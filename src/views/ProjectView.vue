<template>
  <p class="text-center mb-3 dark:text-blue-300">
    Projects from
    <font-awesome-icon :icon="['fab', 'github']" />
  </p>
  <div class="max-h-[50vh] overflow-auto sm:w-4/12 mx-auto">
    <!-- Affichage du chargeur si en cours de chargement -->
    <Loader v-if="loading" />
    <!-- Affichage de l'erreur en cas de problème -->
    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

    <!-- Boucle pour afficher les projets récupérés depuis l'API GitHub -->
    <div v-for="(project, index) in projects" :key="project.id">
      <div class="bg-blue-600 mb-4 p-2 rounded-lg shadow-md">
        <h2 class="font-bold text-xl">{{ index + 1 }} {{ project.name }}</h2>
        <!-- Bouton pour ouvrir le modal -->
        <button
          @click="openModal(index)"
          class="bg-lime-700 px-2 py-1 rounded-md mb-2"
        >
          View Image
        </button>
        <!-- Modal pour afficher l'image -->
        <div
          :class="{ hidden: !modalOpen || modalIndex !== index }"
          class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div class="bg-white p-4 max-w-md mx-auto rounded-lg shadow-md">
            <img
              :src="getProjectImage(index)"
              alt="Project Image"
              class="w-full"
            />
            <!-- Bouton pour fermer le modal -->
            <button
              @click="closeModal"
              class="block mx-auto bg-red-600 px-2 py-1 rounded-md mt-2"
            >
              Close
            </button>
          </div>
        </div>
        <!-- Bouton pour rediriger vers GitHub -->
        <button
          @click="redirectToGithub(project.githubUrl)"
          class="bg-gray-200 px-2 py-1 rounded-md"
        >
          GitHub
        </button>
      </div>
    </div>

    <!-- Boucle pour afficher les projets statiques avec document à télécharger -->
    <div v-for="(project, index) in downloadableProjects" :key="project.id">
      <div class="bg-blue-600 mb-4 p-2 rounded-lg shadow-md">
        <h2 class="font-bold text-xl">3 {{ project.name }}</h2>
        <!-- Bouton pour télécharger le document -->
        <button
          @click="downloadDocument(project.downloadUrl, 'Cahier des charges')"
          class="bg-gray-200 px-2 py-1 rounded-md"
        >
          Download Document
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Déclaration des variables réactives
const loading = ref(false);
const error = ref(null);
const projects = ref([]);
const downloadableProjects = ref([
  {
    id: 1,
    name: "Cahier des charges",
    downloadUrl:
      "https://docs.google.com/document/d/16jVJBwjlAF1ouQDrp_cdHG5OWpHATkhPL0teMZ5B3co/edit?usp=sharing",
  },
]);

// Images pour les projets GitHub
const projectImages = [
  "../src/assets/imgs/9D8A9EAC-D693-4269-AA15-DC19E4184099.jpeg",
  "../src/assets/imgs/B8F01A69-7122-4EC8-9A0C-2A33E1A89407.jpeg",
];

// Variables pour le modal
const modalOpen = ref(false);
const modalIndex = ref(0);

// Fonction pour rediriger vers GitHub
const redirectToGithub = (url) => {
  window.open(url, "_blank");
};

// Fonction pour télécharger un document
const downloadDocument = (url, fileName) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // Attente de la fin du téléchargement avant de supprimer le lien
  link.addEventListener("load", () => {
    document.body.removeChild(link);
  });
};

// Fonction pour ouvrir le modal
const openModal = (index) => {
  modalOpen.value = true;
  modalIndex.value = index;
};

// Fonction pour fermer le modal
const closeModal = () => {
  modalOpen.value = false;
};

// Fonction pour obtenir l'image du projet en fonction de l'index
const getProjectImage = (index) => {
  return projectImages[index % projectImages.length];
};

// Fonction exécutée une fois le composant monté
onMounted(async () => {
  try {
    loading.value = true;
    // URL des projets à récupérer depuis GitHub
    const projectURLs = [
      "https://api.github.com/repos/syvhix/dynamiser-un-espace-de-commentaires",
      "https://api.github.com/repos/syvhix/CV-HTML-CSS",
    ];

    // Fonction pour récupérer les données de chaque projet en parallèle
    const fetchProjects = projectURLs.map(async (url) => {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          githubUrl: data.html_url,
        };
      } else {
        throw new Error(`Failed to fetch data from ${url}`);
      }
    });

    // Attente de la récupération de toutes les données des projets
    projects.value = await Promise.all(fetchProjects);
    loading.value = false;
  } catch (ex) {
    // Gestion des erreurs
    error.value = ex.message;
    loading.value = false;
  }
});
</script>
