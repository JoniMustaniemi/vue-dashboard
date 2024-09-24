import { ref } from "vue";
import { defineStore } from "pinia";

/**
 * Defines the filter store to manage the state related to filtering charts.
 *
 * @return {Object} - The store state and actions for managing filters.
 */
export const useFilterStore = defineStore("filterStore", () => {
  const defaultSensoryType = "All";
  const defaultNumberOfDisplayedCharts = 4;
  const defaultSelectedDates = [];

  const selectedDates = ref(defaultSelectedDates);
  const selectedSensoryType = ref(defaultSensoryType);
  const numberOfDisplayedCharts = ref(defaultNumberOfDisplayedCharts);

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

  const reset = () => {
    selectedDates.value = defaultSelectedDates;
    selectedSensoryType.value = defaultSensoryType;
    numberOfDisplayedCharts.value = defaultNumberOfDisplayedCharts;
  };

  return {
    selectedDates,
    selectedSensoryType,
    numberOfDisplayedCharts,
    reset,
    setSelectedDates,
    setSelectedSensoryType,
    setNumberOfDisplayedCharts,
  };
});
