from datetime import datetime




def create_alert(

    location,

    previous_risk,

    current_risk,

    risk_score

):


    alert = {


        "location":

        location,


        "previous_risk":

        previous_risk,


        "current_risk":

        current_risk,


        "risk_score":

        risk_score,


        "timestamp":

        datetime.utcnow().isoformat(),


        "message":

        f"Risk changed from {previous_risk} to {current_risk}"

    }


    return alert