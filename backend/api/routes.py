from fastapi import APIRouter, Depends, HTTPException


from backend.auth.dependencies import get_current_user


from backend.services.automated_prediction import (
    predict_location_risk
)





router = APIRouter(

    prefix="",

    tags=["Risk Analysis"]

)





@router.get("/analyze/{city}")

def analyze_location(

    city: str,

    current_user = Depends(
        get_current_user
    )

):

    """
    Analyze environmental and social risk
    for a specific location.

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



            **result

        }



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





@router.get("/user")

def get_user_profile(

    current_user = Depends(
        get_current_user
    )

):

    """
    Return logged-in user information.
    """



    return {


        "username":

        current_user["username"],



        "role":

        current_user["role"]

    }