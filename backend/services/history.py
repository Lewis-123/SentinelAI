from backend.database.models import PredictionHistory



def save_prediction_history(

    db,

    features,

    result

):


    history = PredictionHistory(

        risk_level=result["risk_level"],

        confidence=result["confidence"],

        rainfall=features["rainfall"],

        temperature=features["temperature"],

        humidity=features["humidity"],

        population=features["population"],

        density=features["density"],

        poverty_rate=features["poverty_rate"]

    )



    db.add(history)


    db.commit()


    db.refresh(history)


    return history





def get_prediction_history(db):


    return (

        db.query(PredictionHistory)

        .order_by(

            PredictionHistory.timestamp.desc()

        )

        .all()

    )