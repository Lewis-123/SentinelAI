import joblib
import pandas as pd

from pathlib import Path


from machine_learning.explainability.explainer import (
    explain_prediction
)


from backend.alerts.alert_engine import (
    generate_alert
)


from backend.alerts.alert_store import (
    save_alert
)



# Project root

BASE_DIR = Path(__file__).resolve().parents[2]



# Model path

MODEL_PATH = (

    BASE_DIR

    / "machine_learning"

    / "models"

    / "risk_classifier.pkl"

)



# Load ML model

model = joblib.load(
    MODEL_PATH
)



# Risk mapping

RISK_LABELS = {

    0: "LOW",

    1: "MEDIUM",

    2: "HIGH"

}




def predict_risk(
    features: dict,
    db
):

    """
    Predict community risk level.

    Parameters:
        features:
            ML input features

        db:
            SQLAlchemy database session

    Returns:
        Prediction result with:
        - risk level
        - confidence
        - SHAP drivers
        - generated alert
    """



    # Convert input into dataframe

    dataframe = pd.DataFrame(
        [features]
    )



    # Prediction

    prediction = model.predict(
        dataframe
    )[0]



    # Confidence score

    probabilities = model.predict_proba(
        dataframe
    )[0]


    confidence = round(

        float(
            max(probabilities)
        ) * 100,

        2

    )



    # Explainable AI

    explanation = explain_prediction(
        features
    )



    # Top three contributing factors

    drivers = [

        item[0]

        for item in explanation[:3]

    ]



    # Main response

    result = {


        "risk_score":

        int(prediction),



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



    # Generate alert

    alert = generate_alert(
        result
    )



    # Save alert permanently

    saved_alert = save_alert(

        db,

        alert

    )



    # Add alert information

    result["alert"] = {


        "id":

        saved_alert.id,


        "location":

        saved_alert.location,


        "severity":

        saved_alert.severity,


        "message":

        saved_alert.message,


        "timestamp":

        saved_alert.timestamp

    }



    return result