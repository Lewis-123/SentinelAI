import os

import requests

from dotenv import load_dotenv

from pathlib import Path




# =====================================
# Load Environment Variables
# =====================================


BASE_DIR = Path(__file__).resolve().parents[2]


load_dotenv(

    BASE_DIR / ".env"

)




API_KEY = os.getenv(

    "WEATHER_API_KEY"

)







# =====================================
# OpenWeather Connector
# =====================================


def fetch_weather(city: str):


    """
    Fetch real-time weather data.

    Source:
    OpenWeather API


    Returns:

    temperature
    humidity
    rainfall
    weather condition

    """



    if not API_KEY:


        raise Exception(

            "WEATHER_API_KEY missing"

        )





    url = (

        "https://api.openweathermap.org/data/2.5/weather"

    )





    params = {


        "q": city,


        "appid": API_KEY,


        "units": "metric"


    }







    try:


        response = requests.get(

            url,

            params=params,

            timeout=10

        )



        data = response.json()



    except Exception as e:


        raise Exception(

            f"Weather request failed: {str(e)}"

        )








    if response.status_code != 200:


        raise Exception(

            data.get(

                "message",

                "Weather API error"

            )

        )









    # =====================================
    # Rainfall Extraction
    # =====================================


    rainfall = 0





    if "rain" in data:


        rainfall = data["rain"].get(

            "1h",

            data["rain"].get(

                "3h",

                0

            )

        )









    # =====================================
    # Return Weather Data
    # =====================================


    return {


        "temperature":

        data["main"]["temp"],





        "humidity":

        data["main"]["humidity"],





        "rainfall":

        rainfall,





        "weather":

        data["weather"][0]["description"]


    }