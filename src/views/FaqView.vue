<script setup>
import { ref } from "vue";
import faqData from "@/assets/data/faqData.json";

const items = ref(faqData);

const openItem = ref(null);

const toggle = (itemId) => {
  openItem.value = openItem.value === itemId ? null : itemId;
};

const isOpen = (itemId) => openItem.value === itemId;
</script>

<template>
  <v-container>
    <h1 class="mb-5">Frequently Asked Questions</h1>
    <v-card class="mt-3 teal darken-4" v-for="item in items" :key="item.id">
      <v-card-title
        @click="toggle(item.id)"
        class="d-flex justify-between align-center teal darken-3"
      >
        <span class="white--text">{{ item.title }}</span>
        <v-icon class="white--text">{{
          isOpen(item.id) ? "mdi-minus" : "mdi-plus"
        }}</v-icon>
      </v-card-title>
      <v-card-text v-if="isOpen(item.id)" class="teal lighten-5 pa-4">
        <span class="font-weight-bold text-h6 d-none d-sm-inline">{{
          item.content
        }}</span>
        <span class="font-weight-bold text-body-1 d-sm-none">{{
          item.content
        }}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>
