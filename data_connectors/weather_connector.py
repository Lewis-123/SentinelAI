import requests
import os

from dotenv import load_dotenv


load_dotenv()


API_KEY = os.getenv(
    "WEATHER_API_KEY"
)



def get_weather(city):


    url = (
        "https://api.openweathermap.org/data/2.5/weather"
    )


    params = {

        "q": city,

        "appid": API_KEY,

        "units": "metric"

    }


    response = requests.get(
        url,
        params=params
    )


    data = response.json()



    return {

        "location": city,

        "temperature":
        data["main"]["temp"],


        "humidity":
        data["main"]["humidity"],


        "weather":
        data["weather"][0]["description"]

    }