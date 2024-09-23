<script setup>
import { ref, computed } from "vue";
import { useFilterStore } from "@/stores/useFilterStore";
import chartData from "@/assets/data/chartData.json";

const filterStore = useFilterStore();

const selectedSensoryType = ref("All");

const sensoryTypes = computed(() => {
  const types = new Set();
  chartData.charts.forEach((chart) => {
    types.add(chart.sensoryType);
  });
  return ["All", ...Array.from(types)];
});

const applyFilter = () => {
  filterStore.setSelectedSensoryType(selectedSensoryType.value);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedSensoryType"
          :items="sensoryTypes"
          label="Sensory Type"
          @change="applyFilter"
          item-text="text"
          item-value="value"
          class="text-capitalize"
          item-color="teal"
        >
          <template v-slot:selection="{ item }">
            <span class="text-capitalize">{{ item }}</span>
          </template>
          <template v-slot:item="{ item }">
            <span class="text-capitalize">{{ item }}</span>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>
