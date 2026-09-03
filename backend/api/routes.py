from fastapi import APIRouter, Depends, HTTPException


from backend.auth.dependencies import get_current_user


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
    )

):

    """
    Run AI risk analysis for a location.

    Requires JWT authentication.
    """

    try:


        result = predict_location_risk(

            city,

            None

        )



        return {


            "user":

            current_user["username"],



            "role":

            current_user["role"],



            "location":

            city,



            **result

        }




    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )







# =====================================
# User Profile Endpoint
# =====================================

@router.get("/user")
def get_user_profile(

    current_user = Depends(
        get_current_user
    )

):

    """
    Return authenticated user details.
    """

    return {


        "username":

        current_user["username"],



        "role":

        current_user["role"]

    }







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
    Returns geographic risk information
    for dashboard visualization.

    Includes:

    - location
    - coordinates
    - risk level
    - risk score

    """

    try:


        locations = generate_risk_map()



        return {


            "user":

            current_user["username"],



            "locations":

            locations

        }




    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )