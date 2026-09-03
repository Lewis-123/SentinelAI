from backend.services.automated_prediction import (
    predict_location_risk
)


from backend.monitoring.alerts import (
    create_alert
)





risk_history = {}





def monitor_location(

    location

):


    """
    Automatically checks
    location risk.
    """



    result = predict_location_risk(

        location,

        None

    )



    current_risk = result[

        "risk_level"

    ]



    current_score = result[

        "risk_score"

    ]





    previous = risk_history.get(

        location

    )





    alert = None



    if previous:


        if previous["risk_level"] != current_risk:


            alert = create_alert(

                location,

                previous["risk_level"],

                current_risk,

                current_score

            )





    risk_history[location] = {


        "risk_level":

        current_risk,


        "risk_score":

        current_score

    }



    return {


        "prediction":

        result,


        "alert":

        alert

    }