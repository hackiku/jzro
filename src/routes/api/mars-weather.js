// src/routes/api/mars-weather.js
import ScrapingAntClient from '@scrapingant/scrapingant-client';

// Initialize the ScrapingAnt client with your API key
const client = new ScrapingAntClient({ apiKey: 'bf3f2c2378df4a7d85ee9e11e05c5c29' });

// Configure the scraping request
const url = 'https://mars.nasa.gov/mars2020/mission/weather/';
const params = {
  browser: true, // Use headless browser
  wait_for_selector: '#weather_observation tbody tr',
};

// Perform the scraping request
client.scrape(url, params)
  .then(response => {
    console.log(response); // Process your response here
  })
  .catch(err => {
    console.error(`Scraping error: ${err.message}`);
  });
