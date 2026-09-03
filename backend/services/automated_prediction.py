from backend.connectors import (

    fetch_weather,

    fetch_satellite_data,

    fetch_population_data,

    fetch_vulnerability_data

)


from backend.services.prediction import (
    predict_risk
)


from backend.services.location import (
    save_location_risk
)




CITY_COORDINATES = {


    "Nairobi":
    {

        "latitude": -1.286389,

        "longitude": 36.817223

    },


    "Turkana":
    {

        "latitude": 3.1167,

        "longitude": 35.6

    },


    "Mombasa":
    {

        "latitude": -4.0435,

        "longitude": 39.6682

    }

}





def predict_location_risk(

    city,

    db

):


    """
    Complete multi-source risk pipeline.

    Sources:

    - Weather API
    - Satellite data
    - Population data
    - Vulnerability data

    """



    coordinates = CITY_COORDINATES.get(

        city

    )



    if not coordinates:


        raise Exception(

            "Location coordinates unavailable"

        )





    # 1. Weather data


    weather = fetch_weather(

        city

    )





    # 2. Satellite/environment data


    satellite = fetch_satellite_data(

        coordinates["latitude"],

        coordinates["longitude"]

    )





    # 3. Population data


    population = fetch_population_data(

        city

    )





    # 4. Vulnerability data


    vulnerability = fetch_vulnerability_data(

        city

    )






    # Combine all features


    features = {


        "temperature":

        weather["temperature"],



        "rainfall":

        satellite.get(

            "rainfall",

            50

        ),



        "humidity":

        weather["humidity"],



        "population":

        population["population"],



        "density":

        population["density"],



        "poverty_rate":

        vulnerability["poverty_rate"],



        "ndvi":

        satellite["ndvi"],



        "rainfall_anomaly":

        satellite["rainfall_anomaly"]

    }






    # Run ML prediction


    prediction = predict_risk(

        features,

        db

    )





    # Save GIS location


    save_location_risk(

        db,

        city,

        coordinates["latitude"],

        coordinates["longitude"],

        prediction

    )





    prediction["location"] = city


    prediction["weather"] = weather


    prediction["environment"] = satellite


    prediction["population"] = population


    prediction["vulnerability"] = vulnerability



    return prediction