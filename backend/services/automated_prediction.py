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



    "nairobi":

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


    coordinates = CITY_COORDINATES.get(

        city

    )



    if coordinates is None:


        coordinates = CITY_COORDINATES.get(

            city.capitalize()

        )





    if coordinates is None:


        raise Exception(

            "Location coordinates unavailable"

        )







    weather = fetch_weather(

        city

    )




    satellite = fetch_satellite_data(

        coordinates["latitude"],

        coordinates["longitude"]

    )




    population = fetch_population_data(

        city

    )




    vulnerability = fetch_vulnerability_data(

        city

    )







    features = {


        "temperature":

        weather.get(

            "temperature",

            25

        ),



        "rainfall":

        satellite.get(

            "rainfall",

            50

        ),



        "humidity":

        weather.get(

            "humidity",

            50

        ),



        "population":

        population.get(

            "population",

            0

        ),



        "density":

        population.get(

            "density",

            0

        ),



        "poverty_rate":

        vulnerability.get(

            "poverty_rate",

            0

        ),



        "ndvi":

        satellite.get(

            "ndvi",

            0.5

        ),



        "rainfall_anomaly":

        satellite.get(

            "rainfall_anomaly",

            0

        )

    }







    prediction = predict_risk(

        features,

        db

    )







    save_location_risk(

        city,

        coordinates["latitude"],

        coordinates["longitude"],

        prediction["risk_level"],

        prediction["risk_score"],

        db

    )







    prediction["location"] = city

    prediction["features"] = features

    prediction["weather"] = weather

    prediction["environment"] = satellite

    prediction["population"] = population

    prediction["vulnerability"] = vulnerability





    return prediction