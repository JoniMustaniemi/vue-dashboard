const RandomDataGenerators = {
  generateRandomTemperatureData: () => {
    // Random temperature between 15°C and 35°C.
    return Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * (35 - 15 + 1)) + 15
    );
  },

  generateRandomHumidityData: () => {
    // Random humidity between 20% and 100%.
    return Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * (100 - 20 + 1)) + 20
    );
  },

  generateRandomPressureData: () => {
    // Random pressure between 900 hPa and 1150 hPa.
    return Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * (1150 - 900 + 1)) + 900
    );
  },

  generateRandomLightIntensityData: () => {
    // Random light intensity between 200 lux and 1000 lux.
    return Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * (1000 - 200 + 1)) + 200
    );
  },
};

export default RandomDataGenerators;
