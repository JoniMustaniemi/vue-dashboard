<script setup>
import HomeViewItem from "@/components/HomeViewItem.vue";
import homeItemData from "@/assets/data/homeItemData.json";
import images from "@/assets/index.js";
</script>

<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row class="ma-0 pa-0">
      <v-col
        v-for="item in homeItemData"
        :key="item.id"
        cols="12"
        class="pa-0 ma-0"
      >
        <HomeViewItem
          :title="item.title"
          :description="item.text"
          :alignment="item.alignment"
          :image="images[item.image]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
