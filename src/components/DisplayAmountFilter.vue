<script setup>
import { ref } from "vue";
import { useFilterStore } from "@/stores/useFilterStore";

const filterStore = useFilterStore();

const dropdownOptions = ["All", 1, 2, 3, 4];

const selectedOption = ref(4);

const applyFilter = () => {
  filterStore.setNumberOfDisplayedCharts(selectedOption.value);
  console.log("Selected number of charts:", selectedOption.value);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedOption"
          :items="dropdownOptions"
          label="Number of charts"
          @change="applyFilter"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
