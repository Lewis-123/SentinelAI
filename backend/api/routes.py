from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session


from backend.database.database import get_db


from backend.database.models import (

    LocationRisk,

    RiskPrediction

)


from backend.auth.dependencies import (

    get_current_user

)


from backend.services.automated_prediction import (

    predict_location_risk

)





router = APIRouter()







# =====================================================
# Health Check
# =====================================================

@router.get("/health")
def health():


    return {


        "status": "healthy",

        "service": "SentinelAI",

        "version": "1.0"

    }









# =====================================================
# AI Risk Analysis
# =====================================================

@router.get("/analyze/{location}")

def analyze_location(

    location: str,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

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









# =====================================================
# Kenya Risk Map
# =====================================================

@router.get("/risk-map")

def risk_map(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):


    try:


        locations = (

            db.query(LocationRisk)

            .all()

        )



        markers = []



        for item in locations:



            color = "yellow"



            if item.risk_level:


                level = item.risk_level.upper()



                if level == "LOW":

                    color = "green"



                elif level == "HIGH":

                    color = "red"



                elif level == "MEDIUM":

                    color = "yellow"





            markers.append(


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

                    item.risk_score,



                    "color":

                    color


                }

            )





        return {


            "locations": markers

        }



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================================
# Prediction History
# =====================================================

@router.get("/history/")

def prediction_history(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):


    try:


        records = (

            db.query(RiskPrediction)

            .order_by(

                RiskPrediction.created_at.desc()

            )

            .all()

        )





        history = []




        for item in records:



            history.append(


                {


                    "location":

                    item.location,



                    "risk_level":

                    item.risk_level,



                    "risk_score":

                    item.risk_score,



                    "confidence":

                    getattr(

                        item,

                        "confidence",

                        None

                    ),



                    "created_at":

                    item.created_at


                }

            )





        return {


            "history": history

        }





    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )








# =====================================================
# Location List (Autocomplete Support)
# =====================================================

@router.get("/locations")

def available_locations(

    current_user = Depends(get_current_user)

):


    from backend.data.kenya_locations import (

        KENYA_LOCATIONS

    )



    return {


        "locations": [

            {

                "name": value["name"],

                "county": value["county"],

                "latitude": value["latitude"],

                "longitude": value["longitude"]

            }

            for value in KENYA_LOCATIONS.values()

        ]

    }