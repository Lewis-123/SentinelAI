import joblib
import pandas as pd
from pathlib import Path


MODEL_PATH = Path(
    "../../machine_learning/models/risk_classifier.pkl"
)


model = joblib.load(
    MODEL_PATH
)


def predict_risk(features):

    data = pd.DataFrame(
        [features]
    )


    prediction = model.predict(
        data
    )


    return prediction[0]