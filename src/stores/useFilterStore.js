import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const selectedDates = ref([]);
  const selectedSensoryType = ref("All"); // Set default to "All"
  const numberOfDisplayedCharts = ref(4);

  const setSelectedDates = (dates) => {
    selectedDates.value = dates;
  };

  const setSelectedSensoryType = (type) => {
    selectedSensoryType.value = type;
  };

  const setNumberOfDisplayedCharts = (value) => {
    numberOfDisplayedCharts.value = value;
  };

  return {
    selectedDates,
    selectedSensoryType,
    numberOfDisplayedCharts,
    setSelectedDates,
    setSelectedSensoryType,
    setNumberOfDisplayedCharts,
  };
});
