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


from backend.services.history import (
    save_prediction_history
)



# Project root

BASE_DIR = Path(__file__).resolve().parents[2]



# ML model path

MODEL_PATH = (

    BASE_DIR

    / "machine_learning"

    / "models"

    / "risk_classifier.pkl"

)



# Load model

model = joblib.load(
    MODEL_PATH
)



# Risk labels

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
    Generate risk prediction,
    explanation, alert, and save history.
    """



    # Convert input to dataframe

    dataframe = pd.DataFrame(
        [features]
    )



    # Model prediction

    prediction = model.predict(
        dataframe
    )[0]



    # Prediction confidence

    probabilities = model.predict_proba(
        dataframe
    )[0]



    confidence = round(

        float(
            max(probabilities)
        ) * 100,

        2

    )



    # SHAP explanation

    explanation = explain_prediction(
        features
    )



    # Select top risk drivers

    drivers = [

        item[0]

        for item in explanation[:3]

    ]



    # Prediction result

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



    # Save alert in database

    saved_alert = save_alert(

        db,

        alert

    )



    # Save prediction history

    save_prediction_history(

        db,

        features,

        result

    )



    # Attach alert details

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