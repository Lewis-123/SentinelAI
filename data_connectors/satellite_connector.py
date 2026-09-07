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
    # Vegetation Index (NDVI)
    # =====================================


    ndvi = round(

        random.uniform(

            0.2,

            0.9

        ),

        2

    )







    # =====================================
    # Simulated Rainfall
    # =====================================


    rainfall = round(

        random.uniform(

            0,

            200

        ),

        2

    )








    # =====================================
    # Rainfall Anomaly
    # =====================================


    rainfall_anomaly = round(

        random.uniform(

            -50,

            50

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