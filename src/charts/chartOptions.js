export const getChartConfig = (
  chartType,
  title,
  subtitle,
  sensoryData,
  sensoryType,
  color,
  fillColor
) => {
  const seriesOptions = [];

  const commonSeriesOptions = {
    borderRadius: 2,
    borderColor: "#000000",
    borderWidth: 1,
  };

  if (sensoryType === "temperature" && sensoryData.temperature) {
    seriesOptions.push({
      name: "Temperature (°C)",
      data: sensoryData.temperature,
      color: color,
      fillColor: chartType === "area" ? fillColor : undefined,
      type: chartType,
      ...commonSeriesOptions,
    });
  } else if (sensoryType === "humidity" && sensoryData.humidity) {
    seriesOptions.push({
      name: "Humidity (%)",
      data: sensoryData.humidity,
      color: color,
      fillColor: chartType === "area" ? fillColor : undefined,
      type: chartType,
      ...commonSeriesOptions,
    });
  } else if (sensoryType === "pressure" && sensoryData.pressure) {
    seriesOptions.push({
      name: "Pressure (hPa)",
      data: sensoryData.pressure,
      color: color,
      fillColor: chartType === "area" ? fillColor : undefined,
      type: chartType,
      ...commonSeriesOptions,
    });
  } else if (sensoryType === "light" && sensoryData.light) {
    seriesOptions.push({
      name: "Light Intensity (lux)",
      data: sensoryData.light,
      color: color,
      fillColor: chartType === "area" ? fillColor : undefined,
      type: chartType,
      ...commonSeriesOptions,
    });
  }

  const getYAxisTitle = (sensoryType) => {
    switch (sensoryType) {
      case "temperature":
        return "°C";
      case "humidity":
        return "%";
      case "pressure":
        return "hPa";
      case "light":
        return "lux";
      default:
        return "Value";
    }
  };

  const xAxisOptions = {
    categories: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    title: {
      text: "Time (Hours)",
    },
  };

  const yAxisOptions = {
    title: {
      text: getYAxisTitle(sensoryType),
      style: {
        color: color,
      },
      rotation: 0,
    },
    labels: {
      style: {
        color: color,
      },
    },
  };

  return {
    chart: {
      type: chartType,
      backgroundColor: null,
      borderColor: "#000000",
      borderWidth: 1,
      borderRadius: 10,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: xAxisOptions,
    yAxis: yAxisOptions,
    series: seriesOptions,
  };
};
