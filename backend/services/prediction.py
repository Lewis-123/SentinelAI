import joblib
import pandas as pd
from pathlib import Path


# Find project root
BASE_DIR = Path(__file__).resolve().parents[2]


# Model location
MODEL_PATH = (
    BASE_DIR
    / "machine_learning"
    / "models"
    / "risk_classifier.pkl"
)


# Load trained model
model = joblib.load(MODEL_PATH)



def predict_risk(features):

    data = pd.DataFrame(
        [features]
    )


    prediction = model.predict(
        data
    )


    return prediction[0]