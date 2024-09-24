import { ref } from "vue";
import { getChartConfig } from "@/charts/chartOptions";
import moment from "moment";

/**
 * Shades a given hex color by a specified percentage.
 *
 * @param {string} color - The hex color code (e.g., '#3498db').
 * @param {number} percent - The percentage to shade the color. Positive values lighten the color, while negative values darken it.
 * @return {string} - The shaded color as a hex code.
 */
export const shadeColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min((num >> 16) + amt, 255);
  const G = Math.min(((num >> 8) & 0x00ff) + amt, 255);
  const B = Math.min((num & 0x0000ff) + amt, 255);

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 235) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 235) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 235)
  )
    .toString(16)
    .slice(1)}`;
};

/**
 * Returns the unit of measurement for a given chart type.
 *
 * @param {string} chartType - The type of chart (e.g., 'temperature', 'humidity').
 * @return {string} - The corresponding unit of measurement for the chart type.
 */
export const getUnit = (chartType) => {
  switch (chartType) {
    case "temperature":
      return "°C";
    case "humidity":
      return "%";
    case "pressure":
      return "hPa";
    case "light":
      return "lux";
    default:
      return "";
  }
};

/**
 * A mapping of chart types to their respective base colors.
 *
 * @type {Object<string, string>}
 */
export const colorMap = {
  temperature: "#3498db",
  humidity: "#2ecc71",
  pressure: "#e74c3c",
  light: "#f1c40f",
};

/**
 * Generates chart options for Highcharts based on provided charts and chart type.
 *
 * @param {Array} charts - An array of chart objects containing data and metadata.
 * @param {Object} chartType - The type of chart (e.g., 'temperature', 'humidity').
 * @return {Object} - A configuration object for Highcharts containing chart options.
 */
export const generateChartOptions = (charts, chartType) => {
  const seriesData = [];

  charts.forEach((chart, index) => {
    const baseColor = colorMap[chart.chartType];
    const sensorColor = shadeColor(baseColor, (index % 5) * 30);

    if (chart.selected) {
      const series = {
        name: `${chart.title} (${chart.date}) (${getUnit(chart.chartType)})`,
        type: chartType.value,
        color: sensorColor,
        borderColor: "#000000",
        borderWidth: 1,
      };

      switch (chart.chartType) {
        case "temperature":
          if (chart.data.temperature && chart.data.temperature.length > 0) {
            series.data = chart.data.temperature;
            seriesData.push(series);
          }
          break;

        case "humidity":
          if (chart.data.humidity && chart.data.humidity.length > 0) {
            series.data = chart.data.humidity;
            seriesData.push(series);
          }
          break;

        case "pressure":
          if (chart.data.pressure && chart.data.pressure.length > 0) {
            series.data = chart.data.pressure;
            seriesData.push(series);
          }
          break;

        case "light":
          if (chart.data.light && chart.data.light.length > 0) {
            series.data = chart.data.light;
            seriesData.push(series);
          }
          break;

        default:
          break;
      }
    }
  });

  return {
    chart: {
      type: chartType.value,
    },
    title: {
      text: "Combined Sensory Data",
    },
    xAxis: {
      categories: getChartConfig().xAxis.categories,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Values",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltipContent = "";
        this.points.forEach((point) => {
          tooltipContent += `${point.series.name}: ${point.y} <br/>`;
        });
        return tooltipContent;
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    series: seriesData.map((series) => ({
      ...series,
      data: series.data.map((value) => ({
        y: value,
        name: series.name,
      })),
    })),
  };
};

/**
 * Creates a reference for the chart type and provides a method to toggle between chart types.
 *
 * @return {Object} - An object containing the current chart type and a function to toggle the chart type.
 */
export const createChartTypeRef = () => {
  const chartType = ref("column");
  const toggleChartType = () => {
    chartType.value = chartType.value === "column" ? "line" : "column";
  };
  return { chartType, toggleChartType };
};

/**
 * Filters charts based on the selected filter criteria from the filter store.
 * @param {Array} charts - The array of charts to filter.
 * @param {Object} filterStore - The filter store containing selected filters.
 * @returns {Array} - The filtered array of charts.
 */
export const getFilteredCharts = (charts, filterStore) => {
  let result = charts;

  // Filter by selected dates.
  if (filterStore.selectedDates.length > 0) {
    result = result.filter((chart) => {
      const chartDateFormatted = moment(chart.date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      return filterStore.selectedDates.includes(chartDateFormatted);
    });
  }

  // Filter by selected sensory type.
  if (
    filterStore.selectedSensoryType &&
    filterStore.selectedSensoryType !== "All"
  ) {
    result = result.filter(
      (chart) => chart.sensoryType === filterStore.selectedSensoryType
    );
  }

  // Limit the number of displayed charts.
  if (filterStore.numberOfDisplayedCharts !== "All") {
    result = result.slice(0, filterStore.numberOfDisplayedCharts);
  }

  return result;
};
