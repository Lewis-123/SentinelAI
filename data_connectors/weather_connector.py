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
    # Extract Main Weather Data
    # =====================================


    temperature = data.get(

        "main",

        {}

    ).get(

        "temp",

        0

    )





    humidity = data.get(

        "main",

        {}

    ).get(

        "humidity",

        0

    )









    # =====================================
    # Extract Weather Condition
    # =====================================


    weather_condition = (

        data.get(

            "weather",

            [{}]

        )[0]

        .get(

            "description",

            ""

        )

    )









    # =====================================
    # Rainfall Extraction
    # =====================================


    rainfall = 0





    rain_data = data.get(

        "rain",

        {}

    )





    if rain_data:


        rainfall = rain_data.get(

            "1h",

            rain_data.get(

                "3h",

                0

            )

        )









    # =====================================
    # Rainfall Estimation Backup
    # =====================================


    if rainfall == 0:


        condition = weather_condition.lower()



        if "heavy rain" in condition:


            rainfall = 25



        elif "rain" in condition:


            rainfall = 5



        elif "storm" in condition:


            rainfall = 20



        else:


            rainfall = 0











    # =====================================
    # Return Weather Intelligence Data
    # =====================================


    return {


        "temperature":

        round(

            float(temperature),

            2

        ),




        "humidity":

        round(

            float(humidity),

            2

        ),




        "rainfall":

        round(

            float(rainfall),

            2

        ),




        "weather":

        weather_condition


    }