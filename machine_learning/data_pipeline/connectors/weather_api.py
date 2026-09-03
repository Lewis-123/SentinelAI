"""
Weather Data Connector

Collects climate information
for SentinelAI risk prediction.
"""

import requests
import pandas as pd


class WeatherAPI:


    def __init__(self, api_key):

        self.api_key = api_key
        self.base_url = (
            "https://api.openweathermap.org/data/2.5/weather"
        )


    def get_weather(self, city):

        params = {

            "q": city,
            "appid": self.api_key,
            "units": "metric"

        }


        response = requests.get(
            self.base_url,
            params=params
        )


        response.raise_for_status()


        return response.json()



    def extract_features(self, data):

        weather = {

            "location":
            data["name"],

            "temperature":
            data["main"]["temp"],

            "humidity":
            data["main"]["humidity"],

            "rainfall":
            data.get("rain", {})
                .get("1h", 0)

        }


        return pd.DataFrame([weather])