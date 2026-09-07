from backend.database.models import Alert





def create_alert_if_needed(

    db,

    location,

    previous_risk,

    current_risk,

    risk_score

):


    risk_order = {


        "LOW": 1,

        "MEDIUM": 2,

        "HIGH": 3

    }





    previous_value = risk_order.get(

        previous_risk,

        0

    )



    current_value = risk_order.get(

        current_risk,

        0

    )







    # Only create alert when risk increases

    if current_value <= previous_value:


        return None







    message = (

        f"Risk increased "

        f"{previous_risk} → {current_risk}"

    )







    alert = Alert(


        location=location,


        previous_risk=previous_risk,


        current_risk=current_risk,


        risk_score=risk_score,


        message=message,


        resolved=False


    )






    db.add(alert)

    db.commit()

    db.refresh(alert)





    return alert