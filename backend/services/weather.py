import os

import requests

from dotenv import load_dotenv



load_dotenv()



API_KEY = os.getenv(
    "WEATHER_API_KEY"
)



def get_weather(city:str):


    url = (

        "https://api.openweathermap.org/data/2.5/weather"

    )



    params = {


        "q": city,


        "appid": API_KEY,


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


        "city":

        city,


        "temperature":

        data["main"]["temp"],


        "humidity":

        data["main"]["humidity"],


        "weather":

        data["weather"][0]["description"]

    }