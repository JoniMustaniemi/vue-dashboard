import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import faqView from "../views/FaqView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboards",
    name: "dashboards",
    component: DashboardView,
  },
  {
    path: "/FAQ",
    name: "faq",
    component: faqView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
