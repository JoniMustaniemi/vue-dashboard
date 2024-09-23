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

// Define Props
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

// Define Emits
const emit = defineEmits(["update:selected-charts"]);

// Reactive References
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
    <v-card class="border rounded shadow pa-3">
      <v-container class="d-flex flex-column flex-sm-row align-center mb-2">
        <v-btn
          @click="toggleChartType"
          class="mb-2 mb-sm-0 mr-sm-2 mb-xs-3 teal darken-3 white--text"
          small
        >
          Switch to {{ isBarChart ? "Line" : "Bar" }} Chart
        </v-btn>

        <v-btn
          @click="colorDialog = true"
          class="mb-2 mb-sm-0 mr-sm-2 mb-xs-3 teal lighten-1 white--text"
          small
        >
          Select Line/Bar Color
        </v-btn>

        <v-btn
          @click="fillColorDialog = true"
          class="mb-2 mb-sm-0 cyan darken-3 white--text"
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

      <v-container class="d-flex justify-center mt-2" style="width: 100%">
        <v-checkbox
          v-model="isSelected"
          label="Select for Combined Chart"
          class="mx-auto"
        ></v-checkbox>
      </v-container>

      <highcharts :options="chartOptions" class="mt-3"></highcharts>
    </v-card>
  </v-col>
</template>
