from backend.database.models import RiskPrediction






def save_prediction_history(

    db,

    location,

    prediction

):


    features = prediction.get(

        "features",

        {}

    )





    record = RiskPrediction(


        location=location,



        risk_level=prediction.get(

            "risk_level"

        ),



        risk_score=prediction.get(

            "risk_score"

        ),



        confidence=prediction.get(

            "confidence"

        ),





        temperature=features.get(

            "temperature"

        ),



        rainfall=features.get(

            "rainfall"

        ),



        humidity=features.get(

            "humidity"

        ),



        population=features.get(

            "population"

        ),



        density=features.get(

            "density"

        ),



        poverty_rate=features.get(

            "poverty_rate"

        ),



        ndvi=features.get(

            "ndvi"

        ),



        rainfall_anomaly=features.get(

            "rainfall_anomaly"

        )

    )





    db.add(record)



    db.commit()



    db.refresh(record)





    return record