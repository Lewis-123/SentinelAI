from backend.services.weather import get_weather

from backend.services.prediction import predict_risk

from backend.services.location import save_location_risk




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


    weather = get_weather(
        city
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
        vulnerability["poverty_rate"]

    }



    prediction = predict_risk(

        features,

        db

    )



    coordinates = CITY_COORDINATES.get(

        city,

        {

        "latitude":0,

        "longitude":0

        }

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


    return prediction