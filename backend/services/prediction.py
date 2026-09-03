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
# Load Machine Learning Model
# =====================================

def load_model():


    global _model



    if _model is None:


        if not os.path.exists(MODEL_PATH):


            raise FileNotFoundError(

                f"Model file not found: {MODEL_PATH}"

            )



        try:


            _model = joblib.load(

                MODEL_PATH

            )


        except Exception as e:


            raise Exception(

                f"Unable to load ML model: {str(e)}"

            )



    return _model







# =====================================
# Prepare Input Features
# =====================================

def prepare_features(

    features: dict

):


    data = {}



    for column in FEATURE_COLUMNS:


        value = features.get(

            column,

            0

        )


        data[column] = value





    dataframe = pd.DataFrame(

        [data],

        columns=FEATURE_COLUMNS

    )



    return dataframe







# =====================================
# Predict Risk
# =====================================

def predict_risk(

    features: dict,

    db=None

):


    model = load_model()



    dataframe = prepare_features(

        features

    )





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






    # Convert model output

    # into SentinelAI risk levels


    if isinstance(

        prediction,

        str

    ):


        risk_level = prediction.upper()



    else:


        risk_mapping = {


            0: "LOW",

            1: "MEDIUM",

            2: "HIGH"

        }



        risk_level = risk_mapping.get(

            int(prediction),

            "MEDIUM"

        )






    # Assign readable score


    score_mapping = {


        "LOW": 30,

        "MEDIUM": 65,

        "HIGH": 90

    }



    risk_score = score_mapping.get(

        risk_level,

        50

    )







    return {


        "risk_level":

        risk_level,



        "risk_score":

        risk_score,



        "confidence":

        confidence

    }