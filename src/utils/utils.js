import { ref } from "vue";
import { getChartConfig } from "@/charts/chartOptions";

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

export const colorMap = {
  temperature: "#3498db",
  humidity: "#2ecc71",
  pressure: "#e74c3c",
  light: "#f1c40f",
};

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

export const createChartTypeRef = () => {
  const chartType = ref("column");
  const toggleChartType = () => {
    chartType.value = chartType.value === "column" ? "line" : "column";
  };
  return { chartType, toggleChartType };
};
