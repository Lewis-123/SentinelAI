import os

import requests

from dotenv import load_dotenv

from pathlib import Path



BASE_DIR = Path(__file__).resolve().parents[2]


load_dotenv(
    BASE_DIR / ".env"
)



API_KEY = os.getenv(
    "WEATHER_API_KEY"
)




def fetch_weather(city:str):


    """
    Weather data connector.

    Source:
    OpenWeather API
    """



    if not API_KEY:

        raise Exception(
            "WEATHER_API_KEY missing"
        )



    url = (

        "https://api.openweathermap.org/data/2.5/weather"

    )



    params = {

        "q":city,

        "appid":API_KEY,

        "units":"metric"

    }



    response = requests.get(

        url,

        params=params

    )



    data = response.json()



    if response.status_code != 200:

        raise Exception(

            data.get(
                "message",
                "Weather API error"
            )

        )



    return {


        "temperature":

        data["main"]["temp"],



        "humidity":

        data["main"]["humidity"],



        "weather":

        data["weather"][0]["description"]

    }
