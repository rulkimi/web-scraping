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

def scrape_weather_data(place):
    request = create_request_session(f'https://www.google.com/search?q=weather+{place}')
    
    # Check if the request was successful
    if request.status_code != 200:
        raise HTTPException(status_code=request.status_code, detail=f"Failed to retrieve data. Status code: {request.status_code}")

    try:
        temperature = request.html.find('span#wob_tm', first=True).text
        unit = request.html.find('div.vk_bk.wob-unit span.wob_t', first=True).text
        description = request.html.find('div.VQF4g', first=True).find('span#wob_dc', first=True).text

        return {"place": place, "temperature": temperature, "unit": unit, "description": description}
    except AttributeError:
        raise HTTPException(status_code=500, detail="Failed to retrieve weather data.")
    
def get_country_flag(country_name):
    # Using the Restcountries API to get country data
    api_url = f'https://restcountries.com/v3.1/name/{country_name}?fields=flags'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        if data and 'flags' in data[0]:
            return data[0]['flags'].get('png', None)
        else:
            return None
    else:
        return None

@app.get("/search-weather")
def search_weather(place: str):
    weather_data = scrape_weather_data(place)
    return weather_data

@app.get("/search-flags")
def search_flags(country_name: str):
    flag = get_country_flag(country_name)
    return flag
