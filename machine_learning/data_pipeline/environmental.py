import random



def get_environmental_data(

    latitude,

    longitude

):

    """
    Environmental data connector.

    Currently simulated.
    Later connected to:
    - Sentinel-2
    - MODIS
    - Google Earth Engine
    """



    ndvi = round(

        random.uniform(
            0.1,
            0.9
        ),

        2

    )


    rainfall_anomaly = round(

        random.uniform(
            -50,
            50
        ),

        2

    )


    vegetation_stress = (

        "HIGH"

        if ndvi < 0.3

        else

        "LOW"

    )



    return {


        "latitude":

        latitude,


        "longitude":

        longitude,


        "ndvi":

        ndvi,


        "rainfall_anomaly":

        rainfall_anomaly,


        "vegetation_stress":

        vegetation_stress

    }