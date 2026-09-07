import random





# =====================================
# Simulated Satellite Environmental Data
# =====================================


def fetch_satellite_data(

    latitude,

    longitude

):


    """
    Simulated satellite environmental connector.

    Current MVP implementation.

    Future integrations:

    - Sentinel-2
    - MODIS
    - Google Earth Engine


    Returns:

    ndvi
    rainfall
    rainfall anomaly

    """



    # =====================================
    # NDVI Simulation
    # =====================================

    # Higher vegetation around wetter areas

    ndvi = round(

        random.uniform(

            0.25,

            0.85

        ),

        2

    )







    # =====================================
    # Rainfall Simulation
    # =====================================

    # Simulated monthly rainfall estimate

    rainfall = round(

        random.uniform(

            10,

            180

        ),

        2

    )







    # =====================================
    # Rainfall Anomaly
    # =====================================

    rainfall_anomaly = round(

        random.uniform(

            -40,

            40

        ),

        2

    )







    return {


        "ndvi":

        ndvi,



        "rainfall":

        rainfall,



        "rainfall_anomaly":

        rainfall_anomaly


    }