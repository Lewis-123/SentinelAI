from backend.services.weather import get_weather

from backend.services.prediction import predict_risk

from backend.services.location import save_location_risk


from machine_learning.data_pipeline.environmental import (
    get_environmental_data
)



CITY_COORDINATES = {


    "Nairobi":

    {

        "latitude":-1.286389,

        "longitude":36.817223

    },


    "Turkana":

    {

        "latitude":3.1167,

        "longitude":35.6

    },


    "Mombasa":

    {

        "latitude":-4.0435,

        "longitude":39.6682

    }

}




def predict_location_risk(

    city,

    db

):


    coordinates = CITY_COORDINATES.get(

        city

    )



    if not coordinates:

        raise Exception(
            "Location coordinates unavailable"
        )



    weather = get_weather(

        city

    )



    environmental = get_environmental_data(

        coordinates["latitude"],

        coordinates["longitude"]

    )



    vulnerability = {


        "population":500000,


        "density":20,


        "poverty_rate":50

    }




    features = {


        "rainfall":50,


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



    prediction = predict_risk(

        features,

        db

    )



    save_location_risk(

        db,

        city,

        coordinates["latitude"],

        coordinates["longitude"],

        prediction

    )



    prediction["location"] = city


    prediction["weather"] = weather


    prediction["environment"] = environmental



    return prediction