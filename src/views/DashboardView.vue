<script setup>
import { ref, onBeforeUnmount, computed, watch } from "vue";
import FilterBar from "@/components/FilterBar.vue";
import ChartElement from "@/components/ChartElement.vue";
import CombinedChartModal from "@/components/CombinedChartModal.vue";
import chartData from "@/assets/data/chartData.json";
import { useFilterStore } from "@/stores/useFilterStore";
import { getFilteredCharts } from "@/utils/utils";

const charts = ref(chartData.charts);
const filterStore = useFilterStore();
const selectedCombinedCharts = ref([]);
const showModal = ref(false);

onBeforeUnmount(() => {
  filterStore.reset();
});

const filteredCharts = computed(() =>
  getFilteredCharts(charts.value, filterStore)
);

watch(
  () => [
    filterStore.selectedDates,
    filterStore.selectedSensoryType,
    filterStore.numberOfDisplayedCharts,
  ],
  () => {
    filteredCharts.value = getFilteredCharts(charts.value, filterStore);
  }
);

const updateSelectedCharts = (chartData) => {
  if (chartData.selected) {
    selectedCombinedCharts.value.push(chartData);
  } else {
    selectedCombinedCharts.value = selectedCombinedCharts.value.filter(
      (chart) => chart.title !== chartData.title
    );
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const isDisabled = computed(() => selectedCombinedCharts.value.length === 0);
</script>

<template>
  <v-container class="px-0">
    <FilterBar />
    <v-container class="px-0">
      <v-btn
        @click="openModal"
        class="mt-4 white--text"
        color="blue grey darken-3"
        :disabled="isDisabled"
        elevated="5"
      >
        Show Combined Chart
      </v-btn>

      <v-row class="mt-10">
        <template v-if="filteredCharts.length > 0">
          <ChartElement
            v-for="chart in filteredCharts"
            :key="chart.id"
            :title="chart.title"
            :date="chart.date"
            :chartType="chart.sensoryType"
            v-model="selectedCombinedCharts"
            @update:selected-charts="updateSelectedCharts"
          />
        </template>
        <template v-else>
          <v-container>No data found</v-container>
        </template>
      </v-row>

      <CombinedChartModal
        :charts="selectedCombinedCharts"
        :isVisible="showModal"
        @close="closeModal"
      />
    </v-container>
  </v-container>
</template>
