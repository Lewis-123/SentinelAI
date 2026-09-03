from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session


from backend.database.database import get_db


from backend.database.models import (

    LocationRisk,

    RiskPrediction

)


from backend.auth.dependencies import get_current_user



from backend.services.automated_prediction import (

    predict_location_risk

)





router = APIRouter()







# =====================================
# Health Check
# =====================================

@router.get("/health")
def health():

    return {

        "status": "healthy",

        "service": "SentinelAI"

    }









# =====================================
# Analyze Location
# =====================================

@router.get("/analyze/{location}")

def analyze_location(

    location: str,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):


    try:


        result = predict_location_risk(

            location,

            db

        )


        return result



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================
# Risk Map
# =====================================

@router.get("/risk-map")

def risk_map(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):


    try:


        locations = (

            db.query(LocationRisk)

            .all()

        )



        return {


            "locations":[


                {


                    "location":

                    item.location,


                    "latitude":

                    item.latitude,


                    "longitude":

                    item.longitude,


                    "risk_level":

                    item.risk_level,


                    "risk_score":

                    item.risk_score


                }


                for item in locations


            ]


        }



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================
# Prediction History
# =====================================

@router.get("/history")

def history(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):


    records = (

        db.query(RiskPrediction)

        .order_by(

            RiskPrediction.created_at.desc()

        )

        .all()

    )




    return {


        "history":[


            {


                "location":

                item.location,


                "risk_level":

                item.risk_level,


                "risk_score":

                item.risk_score,


                "confidence":

                item.confidence,


                "date":

                item.created_at


            }


            for item in records


        ]

    }