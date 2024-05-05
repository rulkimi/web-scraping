const locationInput = document.querySelector('.js-location');
const searchBtn = document.querySelector('.js-search-btn');
const place = document.querySelector('.js-place');
const weather = document.querySelector('.js-weather');
const description = document.querySelector('.js-description');
const precipitation = document.querySelector('.js-precipitation');
const humidity = document.querySelector('.js-humidity');
const wind = document.querySelector('.js-wind');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

const weatherTable = document.getElementById('weatherTable');

hideLoading();

searchBtn.addEventListener('click', async () => {
  errorMessage.innerHTML = '';
  const locationName = locationInput.value;

  try {
    // Display loading indicator
    showLoading();

    const url = `http://localhost:8000/search-weather?location=${encodeURIComponent(locationName)}`;
    const response = await fetch(url);

    if (!response.ok) {
      showError('Failed to fetch weather data for ' + locationName);
      errorMessage.innerHTML = 'Failed to fetch weather data for ' + locationName;
      return;
    }

    const data = await response.json();

    // Show table
    weatherTable.style.display = 'table';

    // Handle the response data
    place.innerText = data.place;
    weather.innerText = data.temperature + data.unit;
    description.innerText = data.description;
    precipitation.innerText = data.precipitation;
    humidity.innerText = data.humidity;
    wind.innerText = data.wind;
  } catch (error) {
    // Handle errors
    console.error('Fetch error:', error);
    showError('Failed to fetch weather data');
  } finally {
    // Hide loading indicator
    hideLoading();
  }
});

// Additional functions for loading and error handling
function showLoading() {
  loadingSpinner.style.display = 'block';
  weatherTable.style.display = 'none';
}

function hideLoading() {
  loadingSpinner.style.display = 'none';
}

function showError(message) {
  // Implement your error display logic here, e.g., show a modal or an alert
  console.error('Error:', message);
}
