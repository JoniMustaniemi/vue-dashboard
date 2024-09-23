<script setup>
import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
