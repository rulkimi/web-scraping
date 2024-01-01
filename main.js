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
