"""
Satellite Data Connector

Future integration:
NASA MODIS
Sentinel-2
Google Earth Engine
"""


class SatelliteData:


    def calculate_ndvi(
        self,
        nir,
        red
    ):

        ndvi = (
            (nir-red)
            /
            (nir+red)
        )


        return ndvi