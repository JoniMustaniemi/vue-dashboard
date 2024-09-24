<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { generateChartOptions, createChartTypeRef } from "@/utils/utils";

const props = defineProps({
  charts: {
    type: Array,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const { chartType, toggleChartType } = createChartTypeRef();

const chartOptions = computed(() =>
  generateChartOptions(props.charts, chartType)
);
</script>

<template>
  <v-dialog persistent :value="isVisible" width="100%">
    <v-card>
      <v-card-title>
        <span class="headline">Combined Chart</span>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-5 green darken-3 white--text mt-2"
          @click="toggleChartType"
          small
        >
          Switch to {{ chartType === "column" ? "Line" : "Bar" }} Chart
        </v-btn>
        <v-btn class="red darken-3 white--text mt-2" @click="close" small>
          Close
        </v-btn>
      </v-card-title>

      <v-card-text>
        <highcharts :options="chartOptions" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
