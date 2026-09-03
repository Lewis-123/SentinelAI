from backend.database.models import LocationRisk



def save_location_risk(

    db,

    name,

    latitude,

    longitude,

    result

):


    location = LocationRisk(

        name=name,

        latitude=latitude,

        longitude=longitude,

        risk_level=result["risk_level"],

        confidence=result["confidence"]

    )


    db.add(location)


    db.commit()


    db.refresh(location)


    return location





def get_locations(db):


    return (

        db.query(LocationRisk)

        .all()

    )