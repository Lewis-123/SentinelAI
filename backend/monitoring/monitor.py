from backend.services.automated_prediction import (
    predict_location_risk
)


from backend.monitoring.alerts import (
    create_alert
)


from backend.notifications.notification_service import (
    send_notification
)





# Temporary in-memory storage

# Later replaced with database storage

risk_history = {}





def monitor_location(

    location: str

):

    """
    Monitor a location automatically.

    Workflow:

    1. Fetch latest data
    2. Run AI prediction
    3. Compare previous risk
    4. Generate alert if risk changes
    5. Send notifications

    """



    try:


        # Run SentinelAI prediction


        result = predict_location_risk(

            location,

            None

        )




        current_risk = result.get(

            "risk_level",

            "UNKNOWN"

        )



        current_score = result.get(

            "risk_score",

            0

        )





        previous = risk_history.get(

            location

        )



        alert = None





        # Detect risk change


        if previous:



            previous_risk = previous.get(

                "risk_level"

            )



            if previous_risk != current_risk:



                alert = create_alert(

                    location,

                    previous_risk,

                    current_risk,

                    current_score

                )




                # Send notifications


                send_notification(

                    alert,

                    {

                        "email":

                        "admin@sentinelai.com",



                        "phone":

                        "+254700000000"

                    }

                )






        # Update history


        risk_history[location] = {


            "risk_level":

            current_risk,



            "risk_score":

            current_score

        }






        return {


            "location":

            location,



            "prediction":

            result,



            "alert":

            alert

        }





    except Exception as e:



        return {


            "location":

            location,



            "error":

            str(e)

        }