import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectView from "../views/ProjectView.vue";
import PageNotFound from "../views/PageNotFound.vue";
import ContactView from "../views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/project",
    name: "Project",
    component: ProjectView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
  {
    // Route pour la page 404
    path: "/:catchAll(.*)", // Utilisation de la propriété catchAll pour capturer toutes les routes non définies
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  // Utilisation de createWebHistory pour activer le mode history
  history: createWebHistory(),
  routes,
});

export default router;
