from fastapi import (
    APIRouter,
    Depends
)


from sqlalchemy.orm import Session


from backend.services.prediction import (
    predict_risk
)


from backend.alerts.alert_store import (
    get_alerts
)


from backend.database.connection import (
    get_db
)



router = APIRouter()




@router.post("/predict")

def predict(

    data: dict,

    db: Session = Depends(get_db)

):


    result = predict_risk(

        data,

        db

    )


    return result





@router.get("/alerts")

def read_alerts(

    db: Session = Depends(get_db)

):


    alerts = get_alerts(
        db
    )



    return {


        "alerts":[


            {


                "id":

                alert.id,


                "location":

                alert.location,


                "risk_level":

                alert.risk_level,


                "severity":

                alert.severity,


                "message":

                alert.message,


                "timestamp":

                alert.timestamp

            }


            for alert in alerts


        ]

    }