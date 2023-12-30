const location = document.querySelector('.js-location');
const searchBtn = document.querySelector('.js-search-btn');
const place = document.querySelector('.js-place');
const description = document.querySelector('.js-description');
const weather = document.querySelector('.js-weather');

searchBtn.addEventListener('click', () => {
  const locationName = location.value;

  const url = `http://localhost:8000/search-weather?place=${encodeURIComponent(locationName)}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      place.innerText = data.place;
      weather.innerText = data.temperature + data.unit;
      description.innerText = data.description;
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
});

const flagImage = document.getElementById('countryFlag');
const searchFlagBtn = document.querySelector('.js-search-flag-btn');
const countryInput = document.querySelector('.js-country');

searchFlagBtn.addEventListener('click', () => {
  const countryName = countryInput.value;
  
  const url = `http://localhost:8000/search-flags?country_name=${encodeURIComponent(countryName)}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      flagImage.src = data;
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
});
