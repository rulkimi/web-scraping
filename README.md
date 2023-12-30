# Weather Scraper API

## Introduction
This FastAPI-based API scrapes real-time weather data from Google for a specified location.

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
