from pathlib import Path

import joblib

import pandas as pd


from backend.services.risk_score import (
    calculate_risk_score,
    classify_risk
)



# ==========================
# Load trained ML model
# ==========================

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



print(
    "Loaded model:",
    MODEL_PATH
)



print(
    "Model features:",
    model.feature_names_in_
)





# ==========================
# Prediction Function
# ==========================

def predict_risk(

    features: dict,

    db=None

):

    """
    SentinelAI Risk Prediction Engine


    Expected features:

    temperature
    rainfall
    humidity
    population
    density
    poverty_rate
    ndvi
    rainfall_anomaly

    """



    # Convert dictionary into dataframe

    dataframe = pd.DataFrame(

        [features]

    )



    print(
        "\nPREDICTION INPUT FEATURES"
    )

    print(
        dataframe.columns
    )

    print(
        dataframe
    )




    # Ensure feature order matches model

    expected_features = list(

        model.feature_names_in_

    )



    missing_features = [

        feature

        for feature in expected_features

        if feature not in dataframe.columns

    ]



    if missing_features:


        raise ValueError(

            f"Missing model features: {missing_features}. "
            f"Received: {list(dataframe.columns)}"

        )




    dataframe = dataframe[

        expected_features

    ]




    # Model prediction

    prediction = model.predict(

        dataframe

    )[0]




    # Probability

    probabilities = model.predict_proba(

        dataframe

    )[0]



    confidence = max(

        probabilities

    )




    # Convert prediction label

    if hasattr(

        model,

        "classes_"

    ):


        model_prediction = model.classes_[

            prediction

        ]


    else:


        model_prediction = prediction





    # Calculate continuous risk score

    risk_score = calculate_risk_score(

        features,

        confidence * 100

    )




    # Convert score into category

    risk_level = classify_risk(

        risk_score

    )




    return {


        "risk_level":

        risk_level,



        "risk_score":

        risk_score,



        "confidence":

        round(

            confidence * 100,

            2

        ),



        "model_prediction":

        str(

            model_prediction

        ),



        "features":

        features

    }