<script setup>
import { ref, computed, watch } from "vue";
import moment from "moment";
import FilterBar from "@/components/FilterBar.vue";
import ChartElement from "@/components/ChartElement.vue";
import CombinedChartModal from "@/components/CombinedChartModal.vue";
import chartData from "@/assets/data/chartData.json";
import { useFilterStore } from "@/stores/useFilterStore";

const charts = ref(chartData.charts);
const filterStore = useFilterStore();
const selectedCombinedCharts = ref([]);
const showModal = ref(false);

const filteredCharts = computed(() => {
  let result = charts.value;

  if (filterStore.selectedDates.length > 0) {
    result = result.filter((chart) => {
      const chartDateFormatted = moment(chart.date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      return filterStore.selectedDates.includes(chartDateFormatted);
    });
  }

  if (
    filterStore.selectedSensoryType &&
    filterStore.selectedSensoryType !== "All"
  ) {
    result = result.filter(
      (chart) => chart.sensoryType === filterStore.selectedSensoryType
    );
  }

  if (filterStore.numberOfDisplayedCharts !== "All") {
    result = result.slice(0, filterStore.numberOfDisplayedCharts);
  }

  return result;
});

watch(
  () => [
    filterStore.selectedDates,
    filterStore.selectedSensoryType,
    filterStore.numberOfDisplayedCharts,
  ],
  () => {
    console.log("Filtered Charts:", filteredCharts.value);
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
  console.log("Selected Combined Charts:", selectedCombinedCharts.value);
};

const openModal = () => {
  showModal.value = true;
  console.log(showModal.value);
};

const closeModal = () => {
  showModal.value = false;
};

const isDisabled = computed(() => selectedCombinedCharts.value.length === 0);
</script>

<template>
  <v-container>
    <FilterBar />
    <v-container>
      <v-btn
        @click="openModal"
        class="mt-4 black--text"
        color="teal lighten-4"
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
