from backend.database.models import LocationRisk





def save_location_risk(

    location,

    latitude,

    longitude,

    risk_level,

    risk_score,

    db

):


    # Normalize location name

    location = location.strip().title()





    # Check if location already exists

    existing = (

        db.query(LocationRisk)

        .filter(

            LocationRisk.location == location

        )

        .first()

    )







    if existing:



        # Update existing location

        existing.latitude = latitude

        existing.longitude = longitude

        existing.risk_level = risk_level

        existing.risk_score = risk_score





        db.commit()

        db.refresh(existing)





        return {


            "id": existing.id,


            "location": existing.location,


            "latitude": existing.latitude,


            "longitude": existing.longitude,


            "risk_level": existing.risk_level,


            "risk_score": existing.risk_score,


            "updated_at": existing.updated_at


        }









    # Create new location record

    record = LocationRisk(


        location=location,


        latitude=latitude,


        longitude=longitude,


        risk_level=risk_level,


        risk_score=risk_score


    )






    db.add(record)


    db.commit()


    db.refresh(record)







    return {


        "id": record.id,


        "location": record.location,


        "latitude": record.latitude,


        "longitude": record.longitude,


        "risk_level": record.risk_level,


        "risk_score": record.risk_score,


        "updated_at": record.updated_at


    }