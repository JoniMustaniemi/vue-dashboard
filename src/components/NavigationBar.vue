<template>
  <v-app-bar
    class="d-flex justify-center"
    app
    color="#00695C"
    dark
    :elevation="10"
  >
    <v-spacer></v-spacer>

    <v-container fluid class="d-flex align-center">
      <v-btn text to="/" class="mx-1 white--text text-decoration-underline">
        Home
      </v-btn>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn
        text
        to="/dashboards"
        class="mx-1 white--text text-decoration-underline"
      >
        Dashboards
      </v-btn>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn text to="/FAQ" class="mx-1 white--text text-decoration-underline">
        FAQ
      </v-btn>
    </v-container>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
