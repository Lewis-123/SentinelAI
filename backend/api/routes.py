from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session


from backend.database.database import get_db


from backend.database.models import (

    LocationRisk,

    RiskPrediction,

    Alert

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


        return predict_location_risk(

            location,

            db

        )


    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================================
# Kenya Risk Map With Intelligence Data
# =====================================================

@router.get("/risk-map")
def risk_map(


    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)


):


    try:



        locations = (

            db.query(LocationRisk)

            .order_by(

                LocationRisk.risk_score.desc()

            )

            .all()

        )





        markers = []





        for item in locations:




            latest_prediction = (

                db.query(RiskPrediction)

                .filter(

                    RiskPrediction.location == item.location

                )

                .order_by(

                    RiskPrediction.created_at.desc()

                )

                .first()

            )







            level = item.risk_level.upper()



            color = "yellow"



            if level == "LOW":

                color = "green"



            elif level == "HIGH":

                color = "red"








            markers.append({


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

                color,






                "temperature":

                latest_prediction.temperature

                if latest_prediction and latest_prediction.temperature is not None

                else 0,






                "rainfall":

                latest_prediction.rainfall

                if latest_prediction and latest_prediction.rainfall is not None

                else 0,






                "humidity":

                latest_prediction.humidity

                if latest_prediction and latest_prediction.humidity is not None

                else 0,






                "ndvi":

                latest_prediction.ndvi

                if latest_prediction and latest_prediction.ndvi is not None

                else 0,






                "confidence":

                latest_prediction.confidence

                if latest_prediction and latest_prediction.confidence is not None

                else 0,






                "updated_at":

                item.updated_at


            })







        return {


            "locations":

            markers


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



                    "created_at":

                    item.created_at


                }



                for item in records



            ]

        }






    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================================
# Active Risk Alerts
# =====================================================

@router.get("/alerts")
def get_alerts(


    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)


):


    try:


        alerts = (


            db.query(Alert)


            .filter(

                Alert.resolved == False

            )


            .order_by(

                Alert.created_at.desc()

            )


            .limit(20)


            .all()


        )





        return {


            "alerts":[



                {


                    "id":

                    alert.id,



                    "location":

                    alert.location,



                    "previous_risk":

                    alert.previous_risk,



                    "current_risk":

                    alert.current_risk,



                    "risk_score":

                    alert.risk_score,



                    "message":

                    alert.message,



                    "created_at":

                    alert.created_at


                }



                for alert in alerts



            ]

        }






    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )









# =====================================================
# Highest Risk Locations
# =====================================================

@router.get("/risk-locations")
def highest_risk_locations(


    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)


):


    locations = (


        db.query(LocationRisk)


        .order_by(

            LocationRisk.risk_score.desc()

        )


        .limit(10)


        .all()


    )





    return {


        "locations":[



            {


                "location":

                item.location,



                "risk_level":

                item.risk_level,



                "risk_score":

                item.risk_score,



                "latitude":

                item.latitude,



                "longitude":

                item.longitude,



                "updated_at":

                item.updated_at


            }



            for item in locations



        ]

    }









# =====================================================
# Risk Trend
# =====================================================

@router.get("/risk-trend")
def risk_trend(


    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)


):


    predictions = (


        db.query(RiskPrediction)


        .order_by(

            RiskPrediction.created_at.desc()

        )


        .limit(10)


        .all()


    )





    return {


        "trend":[



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



            for item in reversed(predictions)



        ]

    }









# =====================================================
# Kenya Locations Autocomplete
# =====================================================

@router.get("/locations")
def available_locations(


    current_user = Depends(get_current_user)


):


    from backend.data.kenya_locations import KENYA_LOCATIONS





    return {


        "locations":[



            {


                "name":

                value["name"],



                "county":

                value["county"],



                "latitude":

                value["latitude"],



                "longitude":

                value["longitude"]


            }



            for value in KENYA_LOCATIONS.values()



        ]

    }