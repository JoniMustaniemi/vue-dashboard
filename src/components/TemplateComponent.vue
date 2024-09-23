<script>
import { ref } from "@vue/composition-api";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "DashboardView",
  components: {
    HelloWorld,
  },
  setup() {
    const message = ref("Welcome to the Home Page");

    return {
      message,
    };
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <HelloWorld />
  </div>
</template>

<style scoped>
.home {
  color: black;
}
</style>
