// Import necessary modules
import fs from 'fs/promises';
import cheerio from 'cheerio';

async function extractMarsWeather() {
  try {
    // Read the HTML file
    const htmlContent = await fs.readFile('nasa1.html', 'utf8');

    // Load the HTML into cheerio
    const $ = cheerio.load(htmlContent);

    // Initialize an array to hold our weather data
    const weatherData = [];

    // Extract data from each row in the table body
    $('#weather_observation tbody tr').each((i, elem) => {
      const date = $(elem).find('th.sol').first().text();
      const sol = $(elem).find('th.sol').last().text();
      const tempMaxF = $(elem).find('td.temperature.max .fahrenheit nobr').text();
      const tempMinF = $(elem).find('td.temperature.min .fahrenheit nobr').text();
      const pressure = $(elem).find('td.pressure.max').text();
      const sunrise = $(elem).find('td.sun.rise').text();
      const sunset = $(elem).find('td.sun.set').text();

      // Convert Fahrenheit to Celsius for max and min temperatures
      const tempMaxC = (parseFloat(tempMaxF) - 32) * 5/9;
      const tempMinC = (parseFloat(tempMinF) - 32) * 5/9;

      weatherData.push({
        date,
        sol,
        temperatureMaxF: tempMaxF,
        temperatureMinF: tempMinF,
        temperatureMaxC: tempMaxC.toFixed(1),
        temperatureMinC: tempMinC.toFixed(1),
        pressure,
        sunrise,
        sunset
      });
    });

    // Output the weather data
    console.log(weatherData);
  } catch (error) {
    console.error(`Error extracting Mars weather: ${error.message}`);
  }
}

extractMarsWeather();
