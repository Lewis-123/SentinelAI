from fastapi import APIRouter


from backend.services.prediction import predict_risk


from backend.alerts.alert_store import get_alerts



router = APIRouter()



@router.post("/predict")

def predict(data:dict):


    return predict_risk(
        data
    )




@router.get("/alerts")

def alerts():


    return {

        "alerts":
        get_alerts()

    }