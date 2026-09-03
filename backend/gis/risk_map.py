from backend.gis.locations import (
    LOCATIONS
)


from backend.services.automated_prediction import (
    predict_location_risk
)





def generate_risk_map():



    results = []



    for location in LOCATIONS:


        coordinates = LOCATIONS[location]



        risk = predict_location_risk(

            location,

            None

        )



        results.append({

            "location":

            location,


            "latitude":

            coordinates["latitude"],


            "longitude":

            coordinates["longitude"],


            "risk_level":

            risk["risk_level"],


            "risk_score":

            risk["risk_score"]

        })




    return results