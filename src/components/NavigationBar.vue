<template>
  <v-app-bar
    class="d-flex justify-center"
    app
    color="#00695C"
    dark
    :elevation="10"
  >
    <v-spacer></v-spacer>

    <v-btn
      text
      to="/"
      class="mx-2 white--text text-decoration-underline border-right"
    >
      Home
    </v-btn>

    <span class="mx-2 white--text">|</span>

    <v-btn
      text
      to="/dashboards"
      class="mx-2 white--text text-decoration-underline border-right"
    >
      Dashboards
    </v-btn>

    <span class="mx-2 white--text">|</span>

    <v-btn text to="/FAQ" class="mx-2 white--text text-decoration-underline">
      FAQ
    </v-btn>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
