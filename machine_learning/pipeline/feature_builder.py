import pandas as pd



def build_features(
    weather_data,
    population_data,
    satellite_data
):

    """
    Creates ML features matching
    the trained SentinelAI model.
    """



    features = {


        "rainfall":
        weather_data["rainfall"],



        "temperature":
        weather_data["temperature"],



        "humidity":
        weather_data["humidity"],



        "population":
        population_data["population"],



        "density":
        population_data["density"],



        "poverty_rate":
        population_data["poverty_rate"]

    }



    return pd.DataFrame(
        [features]
    )