import joblib

from pathlib import Path


from sqlalchemy.orm import Session


from backend.database.models import RiskPrediction





MODEL_PATH = (

    Path(__file__)

    .resolve()

    .parent.parent.parent

    / "machine_learning"

    / "models"

    / "risk_classifier.pkl"

)





model = joblib.load(

    MODEL_PATH

)







FEATURE_COLUMNS = [

    "temperature",

    "rainfall",

    "humidity",

    "population",

    "density",

    "poverty_rate",

    "ndvi",

    "rainfall_anomaly"

]







def predict_risk(

    features: dict,

    db: Session = None,

    location: str = "Unknown"

):


    """
    Run ML prediction and store result.

    """



    model_input = {


        feature:

        features.get(

            feature,

            0

        )

        for feature in FEATURE_COLUMNS

    }





    prediction = model.predict(

        [

            model_input

        ]

    )[0]





    probability = None



    if hasattr(

        model,

        "predict_proba"

    ):


        probability = max(

            model.predict_proba(

                [

                    model_input

                ]

            )[0]

        )






    # Convert prediction

    risk_levels = {

        0: "LOW",

        1: "MEDIUM",

        2: "HIGH"

    }





    risk_level = risk_levels.get(

        prediction,

        str(prediction)

    )






    risk_score = {


        "LOW": 30,

        "MEDIUM": 60,

        "HIGH": 85

    }.get(

        risk_level,

        50

    )







    result = {


        "location":

        location,



        "risk_level":

        risk_level,



        "risk_score":

        risk_score,



        "confidence":

        round(

            probability * 100,

            2

        )

        if probability

        else None,



        "features":

        model_input

    }







    # Save prediction

    if db:


        prediction_record = RiskPrediction(


            location=location,


            risk_level=risk_level,


            risk_score=risk_score,


            confidence=result["confidence"],



            temperature=

            model_input["temperature"],



            rainfall=

            model_input["rainfall"],



            humidity=

            model_input["humidity"],



            ndvi=

            model_input["ndvi"],



            rainfall_anomaly=

            model_input["rainfall_anomaly"]

        )



        db.add(

            prediction_record

        )


        db.commit()


        db.refresh(

            prediction_record

        )






    return result