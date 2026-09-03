import pandas as pd




def build_environment_features(

    weather,

    environmental,

    vulnerability

):


    features = {


        "rainfall":

        weather.get(

            "rainfall",

            50

        ),



        "temperature":

        weather["temperature"],



        "humidity":

        weather["humidity"],



        "population":

        vulnerability["population"],



        "density":

        vulnerability["density"],



        "poverty_rate":

        vulnerability["poverty_rate"],



        "ndvi":

        environmental["ndvi"],



        "rainfall_anomaly":

        environmental["rainfall_anomaly"]

    }



    return pd.DataFrame(

        [features]

    )