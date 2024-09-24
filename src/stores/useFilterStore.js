import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Defines the filter store to manage the state related to filtering charts.
 *
 * @return {Object} - The store state and actions for managing filters.
 */
export const useFilterStore = defineStore("filterStore", () => {
  const selectedDates = ref([]);
  const selectedSensoryType = ref("All");
  const numberOfDisplayedCharts = ref(4);

  /**
   * Sets the selected dates in the store.
   *
   * @param {Array} dates - An array of selected date objects to be stored.
   * @return void
   */
  const setSelectedDates = (dates) => {
    selectedDates.value = dates;
  };

  /**
   * Sets the selected sensory type in the store.
   *
   * @param {string} type - The sensory type to be stored, e.g., "Temperature", "Humidity", etc.
   * @return void
   */
  const setSelectedSensoryType = (type) => {
    selectedSensoryType.value = type;
  };

  /**
   * Sets the number of charts to be displayed in the store.
   *
   * @param {number} value - The number of charts to display.
   * @return void
   */
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
