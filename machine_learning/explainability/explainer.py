import joblib
import shap
import pandas as pd

from pathlib import Path


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


explainer = shap.TreeExplainer(
    model
)



def explain_prediction(features):

    dataframe = pd.DataFrame(
        [features]
    )


    explanation = explainer(
        dataframe
    )


    values = explanation.values


    # Handle multiclass SHAP output

    if len(values.shape) == 3:

        values = values[0]

        importance_values = (
            abs(values)
            .mean(axis=1)
        )

    else:

        importance_values = abs(
            values[0]
        )



    importance = {}


    for feature, value in zip(

        dataframe.columns,

        importance_values

    ):

        importance[feature] = float(
            value
        )



    total = sum(
        importance.values()
    )


    if total > 0:

        importance = {

            key:
            round(
                (value / total) * 100,
                2
            )

            for key, value in importance.items()

        }



    ranked = sorted(

        importance.items(),

        key=lambda x:x[1],

        reverse=True

    )


    return ranked