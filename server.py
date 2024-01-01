from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from requests_html import HTMLSession
import requests

app = FastAPI()
session = HTMLSession()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the appropriate frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_request_session(url):
    return session.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})

def scrape_weather_data(location):
    request = create_request_session(f'https://www.google.com/search?q=weather+{location}')
    
    # Check if the request was successful
    if request.status_code != 200:
        raise HTTPException(status_code=request.status_code, detail=f"Failed to retrieve data. Status code: {request.status_code}")

    try:
        place = request.html.find('div.eKPi4 span span.BBwThe', first=True).text
        temperature = request.html.find('span#wob_tm', first=True).text
        unit = request.html.find('div.vk_bk.wob-unit span.wob_t', first=True).text
        description = request.html.find('div.VQF4g', first=True).find('span#wob_dc', first=True).text
        precipitation = request.html.find('div.wtsRwe div span#wob_pp', first=True).text
        humidity = request.html.find('div.wtsRwe div span#wob_hm', first=True).text
        wind = request.html.find('div.wtsRwe div span#wob_ws', first=True).text

        return {
            "place": place,
            "temperature": temperature,
            "unit": unit,
            "description": description,
            "precipitation": precipitation,
            "humidity": humidity,
            "wind": wind
        }
    except AttributeError:
        raise HTTPException(status_code=500, detail="Failed to retrieve weather data.")

@app.get("/search-weather")
def search_weather(location: str):
    weather_data = scrape_weather_data(location)
    return weather_data
