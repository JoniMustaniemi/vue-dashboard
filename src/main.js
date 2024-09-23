import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import HighchartsVue from "highcharts-vue";
import { createPinia } from "pinia";

Vue.config.productionTip = false;

const pinia = createPinia();

Vue.use(HighchartsVue);
Vue.use(pinia);

new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
