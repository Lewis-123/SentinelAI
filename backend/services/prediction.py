import os

import joblib

import pandas as pd





# =====================================
# Model Path
# =====================================

MODEL_PATH = os.path.join(

    os.path.dirname(__file__),

    "../../machine_learning/models/risk_classifier.pkl"

)







# =====================================
# Expected ML Features
# =====================================

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





_model = None







# =====================================
# Load ML Model
# =====================================

def load_model():


    global _model



    if _model is None:


        if not os.path.exists(MODEL_PATH):


            raise FileNotFoundError(

                f"Model file not found: {MODEL_PATH}"

            )



        _model = joblib.load(

            MODEL_PATH

        )



    return _model







# =====================================
# Prepare ML Features
# =====================================

def prepare_features(features:dict):


    data = {}



    for column in FEATURE_COLUMNS:


        data[column] = features.get(

            column,

            0

        )



    return pd.DataFrame(

        [data],

        columns=FEATURE_COLUMNS

    )









# =====================================
# Dynamic Environmental Risk Score
# =====================================

def calculate_risk_score(features):


    score = 40





    temperature = features.get(

        "temperature",

        25

    )



    rainfall = features.get(

        "rainfall",

        0

    )



    humidity = features.get(

        "humidity",

        50

    )



    ndvi = features.get(

        "ndvi",

        0.5

    )



    rainfall_anomaly = features.get(

        "rainfall_anomaly",

        0

    )



    density = features.get(

        "density",

        0

    )



    poverty_rate = features.get(

        "poverty_rate",

        0

    )







    # =========================
    # Temperature Stress
    # =========================

    if temperature >= 38:


        score += 15



    elif temperature >= 32:


        score += 8







    # =========================
    # Rainfall Risk
    # =========================

    if rainfall >= 180:


        score += 15



    elif rainfall <= 20:


        score += 10







    # =========================
    # Humidity / Flood Conditions
    # =========================

    if humidity >= 85:


        score += 8







    # =========================
    # Vegetation Condition
    # =========================

    if ndvi < 0.25:


        score += 15



    elif ndvi < 0.4:


        score += 8



    elif ndvi > 0.7:


        score -= 5







    # =========================
    # Rainfall Anomaly
    # =========================

    if rainfall_anomaly <= -30:


        score += 12



    elif rainfall_anomaly >= 30:


        score += 8







    # =========================
    # Population Vulnerability
    # =========================

    if density >= 5000:


        score += 10



    elif density >= 1000:


        score += 5







    # =========================
    # Poverty Vulnerability
    # =========================

    if poverty_rate >= 40:


        score += 10



    elif poverty_rate >= 20:


        score += 5







    return round(

        max(

            0,

            min(

                score,

                100

            )

        ),

        2

    )









# =====================================
# Convert Score To Risk Category
# =====================================

def score_to_level(score):


    if score < 35:


        return "LOW"



    elif score < 65:


        return "MEDIUM"



    else:


        return "HIGH"









# =====================================
# Predict Risk
# =====================================

def predict_risk(

    features:dict,

    db=None

):


    model = load_model()



    dataframe = prepare_features(

        features

    )





    # ML prediction

    prediction = model.predict(

        dataframe

    )[0]







    confidence = None



    if hasattr(

        model,

        "predict_proba"

    ):



        probabilities = model.predict_proba(

            dataframe

        )[0]



        confidence = round(

            float(

                max(probabilities)

            )

            * 100,

            2

        )









    # Convert ML output

    if isinstance(

        prediction,

        str

    ):


        model_level = prediction.upper()



    else:


        model_level = {


            0:"LOW",

            1:"MEDIUM",

            2:"HIGH"


        }.get(

            int(prediction),

            "MEDIUM"

        )











    # Environmental score

    environmental_score = calculate_risk_score(

        features

    )







    # Combine ML and environmental intelligence

    final_score = environmental_score





    # Slight adjustment based on model

    if model_level == "HIGH":


        final_score += 5



    elif model_level == "LOW":


        final_score -= 5







    final_score = round(

        max(

            0,

            min(

                final_score,

                100

            )

        ),

        2

    )







    risk_level = score_to_level(

        final_score

    )







    return {


        "risk_level":

        risk_level,



        "risk_score":

        final_score,



        "confidence":

        confidence,



        "features":

        features

    }