<template>
  <div class="container mx-auto">
    <!-- Formulaire -->
    <form
      @submit.prevent="submitForm"
      class="max-w-lg mx-auto mt-8 p-4 bg-gray-100 shadow-md rounded-lg"
    >
      <h2 class="text-xl font-bold mb-4">Contactez-moi</h2>
      <!-- Champ Nom -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2">Nom</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Votre nom"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <!-- Champ Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2"
          >E-mail</label
        >
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="exemple@domaine.com"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <!-- Champ Message -->
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-bold mb-2"
          >Message</label
        >
        <textarea
          id="message"
          v-model="formData.message"
          placeholder="Votre message"
          rows="4"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        ></textarea>
      </div>
      <!-- Bouton Envoyer -->
      <button
        type="submit"
        class="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Données du formulaire
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    // Méthode pour soumettre le formulaire
    submitForm() {
      // Extraction des données du formulaire
      const { name, email, message } = this.formData;
      const mailtoLink = `mailto:nicolasbalthaze@email.com?subject=Message%20de%20${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(
        message
      )}%0A%0AAdresse%20e-mail%3A%20${encodeURIComponent(email)}`;
      // Redirection vers le lien mailto
      window.location.href = mailtoLink;
    },
  },
};
</script>
