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


from backend.services.history import (

    save_prediction_history

)


from backend.services.alerts import (

    create_alert_if_needed

)


from backend.database.models import LocationRisk


from backend.data.kenya_locations import (

    get_location_coordinates

)









def predict_location_risk(

    city,

    db

):


    """
    Complete Kenya-wide environmental risk pipeline.

    Flow:

    Location
        ↓
    Data Collection
        ↓
    Feature Engineering
        ↓
    AI Prediction
        ↓
    Alert Detection
        ↓
    Location Update
        ↓
    Prediction History

    """





    # =====================================
    # Location Lookup
    # =====================================


    location = get_location_coordinates(

        city

    )



    if location is None:


        raise Exception(

            f"Location '{city}' not found."

        )





    latitude = location["latitude"]

    longitude = location["longitude"]









    # =====================================
    # Previous Risk Check
    # =====================================


    existing_location = (

        db.query(LocationRisk)

        .filter(

            LocationRisk.location == location["name"]

        )

        .first()

    )



    previous_risk = None



    if existing_location:


        previous_risk = existing_location.risk_level







    # =====================================
    # Collect Environmental Data
    # =====================================


    weather = fetch_weather(

        location["name"]

    )




    satellite = fetch_satellite_data(

        latitude,

        longitude

    )





    population = fetch_population_data(

        location["name"]

    )





    vulnerability = fetch_vulnerability_data(

        location["name"]

    )









    # =====================================
    # Feature Engineering
    # =====================================


    features = {


        "temperature":

        weather.get(

            "temperature",

            0

        ),



        "rainfall":

        satellite.get(

            "rainfall",

            0

        ),



        "humidity":

        weather.get(

            "humidity",

            0

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

            0

        ),



        "rainfall_anomaly":

        satellite.get(

            "rainfall_anomaly",

            0

        )

    }









    # =====================================
    # AI Prediction
    # =====================================


    prediction = predict_risk(

        features,

        db

    )









    # =====================================
    # Generate Alert If Risk Increased
    # =====================================


    create_alert_if_needed(

        db,

        location["name"],

        previous_risk,

        prediction["risk_level"],

        prediction["risk_score"]

    )









    # =====================================
    # Save Map Location
    # =====================================


    save_location_risk(

        location["name"],

        latitude,

        longitude,

        prediction["risk_level"],

        prediction["risk_score"],

        db

    )









    # =====================================
    # Save Prediction History
    # =====================================


    save_prediction_history(

        db,

        location["name"],

        prediction

    )









    # =====================================
    # Response
    # =====================================


    return {


        "location":

        location["name"],



        "county":

        location["county"],



        "latitude":

        latitude,



        "longitude":

        longitude,



        "risk_level":

        prediction["risk_level"],



        "risk_score":

        prediction["risk_score"],



        "confidence":

        prediction.get(

            "confidence"

        ),



        "weather":

        weather,



        "environment":

        satellite,



        "population":

        population,



        "vulnerability":

        vulnerability,



        "features":

        features


    }