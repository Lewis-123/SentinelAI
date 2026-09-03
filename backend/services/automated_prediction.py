from backend.services.weather import get_weather

from backend.services.prediction import predict_risk



def predict_location_risk(

    city,

    db

):


    # Get live weather

    weather = get_weather(
        city
    )



    # Temporary vulnerability data

    # Later replaced with census/API data

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



    prediction["location"] = city


    prediction["weather"] = weather



    return prediction