"""
SentinelAI Dataset Builder

Combines multiple risk indicators
into one machine learning dataset.
"""


import pandas as pd


class DatasetBuilder:


    def __init__(self):

        self.dataset = None



    def load_weather(self, path):

        weather = pd.read_csv(path)

        return weather



    def load_population(self, path):

        population = pd.read_csv(path)

        return population



    def merge_data(
        self,
        weather,
        population
    ):

        self.dataset = weather.merge(
            population,
            on="location",
            how="left"
        )

        return self.dataset



    def save_dataset(self, path):

        self.dataset.to_csv(
            path,
            index=False
        )
        