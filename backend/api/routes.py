from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)


from sqlalchemy.orm import Session


from backend.services.prediction import (
    predict_risk
)


from backend.services.weather import (
    get_weather
)


from backend.services.automated_prediction import (
    predict_location_risk
)


from backend.alerts.alert_store import (
    get_alerts
)


from backend.services.history import (
    get_prediction_history
)


from backend.services.location import (
    get_locations
)


from backend.database.connection import (
    get_db
)



router = APIRouter()





@router.get("/weather/{city}")

def weather(city: str):


    try:

        return get_weather(
            city
        )


    except Exception as e:


        raise HTTPException(

            status_code=400,

            detail=str(e)

        )







@router.get("/analyze/{city}")

def analyze_location(

    city: str,

    db: Session = Depends(get_db)

):


    try:


        return predict_location_risk(

            city,

            db

        )


    except Exception as e:


        raise HTTPException(

            status_code=400,

            detail=str(e)

        )







@router.post("/predict")

def predict(

    data: dict,

    db: Session = Depends(get_db)

):


    return predict_risk(

        data,

        db

    )







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








@router.get("/history")

def history(

    db: Session = Depends(get_db)

):


    records = get_prediction_history(
        db
    )


    return {


        "history":[


            {


                "id":
                item.id,


                "risk_level":
                item.risk_level,


                "confidence":
                item.confidence,


                "timestamp":
                item.timestamp


            }


            for item in records


        ]

    }








@router.get("/locations")

def locations(

    db: Session = Depends(get_db)

):


    data = get_locations(
        db
    )



    return {


        "locations":[


            {


                "name":
                item.name,


                "latitude":
                item.latitude,


                "longitude":
                item.longitude,


                "risk":
                item.risk_level,


                "confidence":
                item.confidence,


                "timestamp":
                item.timestamp


            }


            for item in data


        ]

    }