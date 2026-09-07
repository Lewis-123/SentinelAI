import os

import pandas as pd

from pathlib import Path






# =====================================
# Population Dataset Location
# =====================================

BASE_DIR = Path(__file__).resolve().parents[2]


DATA_FILE = BASE_DIR / "data" / "kenya_population.csv"








# =====================================
# Load Population Dataset
# =====================================

def load_population_data():



    if not DATA_FILE.exists():

        raise FileNotFoundError(

            f"Population dataset missing: {DATA_FILE}"

        )



    return pd.read_csv(

        DATA_FILE

    )









# =====================================
# Fetch Location Population Data
# =====================================

def fetch_population_data(location:str):



    try:



        population_df = load_population_data()



        location = location.strip().lower()





        result = population_df[

            population_df["location"]

            .str.lower()

            == location

        ]





        if result.empty:



            return {


                "population":0,


                "density":0


            }








        row = result.iloc[0]






        return {



            "population":

            float(

                row["population"]

            ),





            "density":

            float(

                row["density"]

            )



        }






    except Exception as e:



        print(

            "Population connector error:",

            e

        )



        return {


            "population":0,


            "density":0


        }