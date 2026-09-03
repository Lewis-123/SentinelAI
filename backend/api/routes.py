from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)


from sqlalchemy.orm import Session


from backend.auth.dependencies import (
    get_current_user
)


from backend.database.database import (
    get_db
)


from backend.services.automated_prediction import (
    predict_location_risk
)


from backend.gis.risk_map import (
    generate_risk_map
)





router = APIRouter(

    tags=["SentinelAI API"]

)





# =====================================
# Risk Analysis Endpoint
# =====================================

@router.get("/analyze/{city}")
def analyze_location(

    city: str,

    current_user = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):

    """
    Run AI risk prediction.

    Prediction is stored
    in database history.
    """

    try:


        result = predict_location_risk(

            city,

            db

        )



        return {


            "user":

            current_user["username"],



            "role":

            current_user["role"],



            **result

        }




    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )







# =====================================
# GIS Risk Map Endpoint
# =====================================

@router.get("/risk-map")
def risk_map(

    current_user = Depends(
        get_current_user
    )

):

    """
    Returns locations and
    risk information for GIS map.
    """

    try:


        return {


            "user":

            current_user["username"],



            "locations":

            generate_risk_map()

        }




    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )







# =====================================
# Current User Endpoint
# =====================================

@router.get("/user")
def user_profile(

    current_user = Depends(
        get_current_user
    )

):


    return {


        "username":

        current_user["username"],



        "role":

        current_user["role"]

    }