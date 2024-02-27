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

## How to Run

### Install the required dependencies:

```bash
pip install -r requirements.txt
```
### Run the API server

```bash
uvicorn main:app --reload
```

### Prerequisites:
Make sure you have the Live Server extension installed in Visual Studio Code.

### Viewing the User Interface:
Navigate to `index.html` and click on `Live Server` to view the user interface.

Feel free to explore the weather data by making requests to the /search-weather endpoint.

Happy coding!
