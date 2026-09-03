from backend.database.models import LocationRisk






def save_location_risk(

    location,

    latitude,

    longitude,

    risk_level,

    risk_score,

    db

):


    existing = (

        db.query(LocationRisk)

        .filter(

            LocationRisk.location == location

        )

        .first()

    )





    if existing:


        existing.latitude = latitude

        existing.longitude = longitude

        existing.risk_level = risk_level

        existing.risk_score = risk_score




    else:


        record = LocationRisk(


            location=location,


            latitude=latitude,


            longitude=longitude,


            risk_level=risk_level,


            risk_score=risk_score


        )


        db.add(record)





    db.commit()





    return {


        "location": location,

        "latitude": latitude,

        "longitude": longitude,

        "risk_level": risk_level,

        "risk_score": risk_score

    }