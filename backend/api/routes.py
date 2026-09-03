from fastapi import APIRouter

from backend.services.prediction import predict_risk


router = APIRouter()



@router.post("/predict")
def predict(data: dict):


    result = predict_risk(
        data
    )


    risk_names = {
        0:"LOW",
        1:"MEDIUM",
        2:"HIGH"
    }


    return {

        "risk_score": int(result),

        "risk_level":
        risk_names[result]

    }