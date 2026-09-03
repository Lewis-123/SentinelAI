import random




def fetch_satellite_data(

    latitude,

    longitude

):


    """
    Satellite environmental connector.

    Currently simulated.

    Future integrations:

    - Sentinel-2
    - MODIS
    - Google Earth Engine

    """



    return {


        "ndvi":

        round(

            random.uniform(
                0.1,
                0.9
            ),

            2

        ),



        "rainfall_anomaly":

        round(

            random.uniform(
                -50,
                50
            ),

            2

        )

    }
