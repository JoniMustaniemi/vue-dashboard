<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  defineProps,
  defineEmits,
} from "vue";
import { getChartConfig } from "@/charts/chartOptions";
import RandomDataGenerators from "@/charts/dataGeneration.js";
import chartData from "@/assets/data/chartData.json";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  chartType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selected-charts"]);

const chartOptions = ref({});
const isBarChart = ref(false);
const data = ref({});
const selectedColor = ref("rgba(0, 80, 60, 1)");
const fillColor = ref("rgba(255, 255, 255, 0)");
const colorDialog = ref(false);
const fillColorDialog = ref(false);
const isSelected = ref(false);

onMounted(() => {
  initChart();
  watchProps();
});

onBeforeUnmount(() => {
  resetSelection();
});

/**
 * Initializes the chart based on the provided props.
 * Fetches chart data for the specified title and generates random data.
 *
 * @return {void}
 */
const initChart = () => {
  const chartConfig = chartData.charts.find(
    (chart) => chart.title === props.title
  );

  if (chartConfig) {
    data.value = generateRandomData(props.chartType);
    chartConfig.sensoryData[props.chartType] = data.value[props.chartType];
    updateChartConfig();
  }
};

/**
 * Resets the selection state of the chart.
 * Emits an update event with the current state.
 *
 * @return {void}
 */
const resetSelection = () => {
  isSelected.value = false;
  emit("update:selected-charts", {
    title: props.title,
    date: props.date,
    chartType: props.chartType,
    selected: false,
    data: data.value,
  });
};

/**
 * Sets up watchers on the props and reactive variables to update the chart configuration
 * whenever any of these change.
 *
 * @return {void}
 */
const watchProps = () => {
  watch(
    () => [
      props.title,
      props.date,
      isBarChart.value,
      selectedColor.value,
      fillColor.value,
    ],
    updateChartConfig
  );

  watch(isSelected, (newValue) => {
    emit("update:selected-charts", {
      title: props.title,
      date: props.date,
      chartType: props.chartType,
      selected: newValue,
      data: data.value,
    });
  });
};

/**
 * Generates random data for the specified chart type.
 *
 * @param {string} chartType - The type of chart (e.g., 'temperature', 'humidity').
 * @return {Object} - An object containing the generated random data for the chart type.
 */
const generateRandomData = (chartType) => {
  const dataGenerators = {
    temperature: RandomDataGenerators.generateRandomTemperatureData,
    humidity: RandomDataGenerators.generateRandomHumidityData,
    pressure: RandomDataGenerators.generateRandomPressureData,
    light: RandomDataGenerators.generateRandomLightIntensityData,
  };
  return { [chartType]: dataGenerators[chartType]?.() || {} };
};

const updateChartConfig = () => {
  chartOptions.value = getChartConfig(
    isBarChart.value ? "column" : "area",
    props.title,
    props.date,
    data.value,
    props.chartType,
    selectedColor.value,
    fillColor.value
  );
};

const toggleChartType = () => {
  isBarChart.value = !isBarChart.value;
  updateChartConfig();
};
</script>

<template>
  <v-col cols="12" md="6" class="chart-element">
    <v-card
      class="border rounded shadow pa-3 grey lighten-4"
      style="min-width: 320px"
    >
      <v-container class="d-flex flex-wrap flex-sm-row align-center mb-2">
        <v-btn
          @click="toggleChartType"
          class="mb-2 ml-2 green darken-2 white--text"
          small
        >
          Switch to {{ isBarChart ? "Line" : "Bar" }} Chart
        </v-btn>

        <v-btn
          @click="colorDialog = true"
          class="mb-2 ml-2 teal darken-4 white--text"
          small
        >
          Select Line/Bar Color
        </v-btn>

        <v-btn
          @click="fillColorDialog = true"
          class="mb-2 ml-2 cyan darken-3 white--text"
          small
        >
          Change Fill Color
        </v-btn>
      </v-container>

      <v-dialog v-model="colorDialog" max-width="290">
        <v-color-picker v-model="selectedColor"></v-color-picker>
      </v-dialog>

      <v-dialog v-model="fillColorDialog" max-width="290">
        <v-color-picker v-model="fillColor"></v-color-picker>
      </v-dialog>

      <v-container class="d-flex pa-0 ma-0 justify-center" style="width: 100%">
        <v-checkbox
          v-model="isSelected"
          label="Select for Combined Chart"
          class="pa-0 ma-0"
        ></v-checkbox>
      </v-container>

      <highcharts :options="chartOptions" class="mt-3"></highcharts>
    </v-card>
  </v-col>
</template>
