from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from backend.database.database import get_db

from backend.database.models import RiskPrediction

from backend.auth.dependencies import get_current_user





router = APIRouter(

    prefix="/history",

    tags=["Risk History"]

)






@router.get("/")
def get_prediction_history(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):


    records = (

        db.query(RiskPrediction)

        .order_by(

            RiskPrediction.created_at.desc()

        )

        .limit(100)

        .all()

    )



    return {


        "user":

        current_user["username"],



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







@router.get("/{location}")
def location_history(

    location: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):


    records = (

        db.query(RiskPrediction)

        .filter(

            RiskPrediction.location == location

        )

        .order_by(

            RiskPrediction.created_at

        )

        .all()

    )




    return {


        "location":

        location,



        "history":[


            {


                "risk_score":

                item.risk_score,



                "risk_level":

                item.risk_level,



                "date":

                item.created_at

            }


            for item in records

        ]

    }