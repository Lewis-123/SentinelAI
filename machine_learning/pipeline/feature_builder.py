import pandas as pd



def build_features(

    weather,

    population,

    satellite

):


    features = {


        "temperature": weather["temperature"],


        "rainfall": weather.get(
            "rainfall",
            0
        ),


        "humidity": weather["humidity"],



        "population": population["population"],


        "density": population["density"],


        "poverty_rate": population["poverty_rate"],



        "ndvi": satellite["ndvi"],


        "rainfall_anomaly": satellite["rainfall_anomaly"]

    }



    df = pd.DataFrame(

        [features]

    )


    return df