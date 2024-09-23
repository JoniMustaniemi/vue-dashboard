<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  description: String,
  alignment: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  image: String,
});
</script>

<template>
  <v-container class="ma-0">
    <v-container
      fluid
      :class="props.alignment === 'right' ? 'text-right' : 'text-left'"
      style="min-height: 90vh; position: relative"
      class="d-flex flex-column justify-center"
    >
      <v-img
        :src="image"
        height="100%"
        width="100%"
        style="position: absolute; top: 0; left: 0; z-index: 1"
        class="rounded-xl"
      />

      <v-container
        style="background: rgba(0, 0, 0, 0.5); z-index: 2; position: relative"
        class="rounded-xl"
      >
        <v-container
          class="white--text display-2"
          style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7)"
        >
          {{ props.title }}
        </v-container>
        <v-container class="white--text display-1">
          {{ props.description }}
        </v-container>
      </v-container>
    </v-container>
  </v-container>
</template>
