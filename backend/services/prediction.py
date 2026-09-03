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



# Project root directory

BASE_DIR = Path(__file__).resolve().parents[2]



# ML model location

MODEL_PATH = (

    BASE_DIR

    / "machine_learning"

    / "models"

    / "risk_classifier.pkl"

)



# Load trained model

model = joblib.load(
    MODEL_PATH
)



# Risk class mapping

RISK_LABELS = {

    0: "LOW",

    1: "MEDIUM",

    2: "HIGH"

}





def predict_risk(features: dict):

    """
    Run SentinelAI risk prediction.

    Input:
        Dictionary containing ML features

    Output:
        Risk prediction,
        confidence,
        explanations,
        generated alert
    """



    # Convert input into dataframe

    dataframe = pd.DataFrame(
        [features]
    )



    # Generate prediction

    prediction = model.predict(
        dataframe
    )[0]



    # Generate confidence score

    probabilities = model.predict_proba(
        dataframe
    )[0]



    confidence = round(

        float(
            max(probabilities)
        ) * 100,

        2

    )



    # Generate SHAP explanation

    explanation = explain_prediction(
        features
    )



    # Select top risk factors

    drivers = [

        item[0]

        for item in explanation[:3]

    ]



    # Main prediction response

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



    # Generate alert from prediction

    alert = generate_alert(
        result
    )



    # Store alert

    save_alert(
        alert
    )



    # Attach alert information

    result["alert"] = alert



    return result