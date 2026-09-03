from backend.database.models import Alert



def save_alert(
    db,
    alert_data
):


    alert = Alert(

        location=
        alert_data["location"],


        risk_level=
        alert_data["risk_level"],


        severity=
        alert_data["severity"],


        message=
        alert_data["message"]

    )



    db.add(alert)


    db.commit()


    db.refresh(alert)



    return alert




def get_alerts(db):


    return (

        db.query(Alert)

        .order_by(
            Alert.timestamp.desc()
        )

        .all()

    )