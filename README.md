# Weather Scraper API

## Introduction
This FastAPI-based API serves as a practice project for web scraping real-time weather data from Google for a specified location. Additionally, it includes a basic API server setup to fetch data from the frontend and display a user interface.

## Usage
### Endpoint
- `/search-weather`

### Request
- **Method**: GET
- **Parameters**:
  - `place` (string): The location for which weather data is requested.

### Response
- Successful response:
  ```json
  {
    "place": "specified_location",
    "temperature": "current_temperature",
    "unit": "temperature_unit",
    "description": "weather_description"
  }
