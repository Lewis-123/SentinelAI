LOCATIONS = {


    "Nairobi": {

        "latitude": -1.2921,

        "longitude": 36.8219

    },


    "Turkana": {

        "latitude": 3.1167,

        "longitude": 35.5976

    },


    "Mombasa": {

        "latitude": -4.0435,

        "longitude": 39.6682

    },


    "Kisumu": {

        "latitude": -0.1022,

        "longitude": 34.7617

    }


}




def get_location_coordinates(

    location

):


    return LOCATIONS.get(

        location

    )