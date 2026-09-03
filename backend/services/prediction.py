import joblib
import pandas as pd

from pathlib import Path


from machine_learning.explainability.explainer import (
    explain_prediction
)



BASE_DIR = Path(__file__).resolve().parents[2]


MODEL_PATH = (
    BASE_DIR
    / "machine_learning"
    / "models"
    / "risk_classifier.pkl"
)



model = joblib.load(
    MODEL_PATH
)



RISK_LABELS = {

    0: "LOW",

    1: "MEDIUM",

    2: "HIGH"

}



def predict_risk(features):


    dataframe = pd.DataFrame(
        [features]
    )



    prediction = model.predict(
        dataframe
    )[0]



    # Probability/confidence

    probabilities = model.predict_proba(
        dataframe
    )[0]



    confidence = round(

        float(
            max(probabilities)
        ) * 100,

        2

    )



    explanation = explain_prediction(
        features
    )



    drivers = [

        item[0]

        for item in explanation[:3]

    ]



    return {


        "risk_score": int(prediction),


        "risk_level":

        RISK_LABELS.get(

            int(prediction),

            "UNKNOWN"

        ),


        "confidence":

        confidence,


        "risk_drivers":

        drivers

    }