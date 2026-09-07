# Kenya location intelligence database


KENYA_LOCATIONS = {


    "nairobi": {

        "name": "Nairobi",

        "county": "Nairobi",

        "latitude": -1.286389,

        "longitude": 36.817223

    },


    "mombasa": {

        "name": "Mombasa",

        "county": "Mombasa",

        "latitude": -4.043477,

        "longitude": 39.668206

    },


    "kisumu": {

        "name": "Kisumu",

        "county": "Kisumu",

        "latitude": -0.102206,

        "longitude": 34.761711

    },


    "nakuru": {

        "name": "Nakuru",

        "county": "Nakuru",

        "latitude": -0.303099,

        "longitude": 36.080025

    },


    "eldoret": {

        "name": "Eldoret",

        "county": "Uasin Gishu",

        "latitude": 0.514277,

        "longitude": 35.269779

    },


    "garissa": {

        "name": "Garissa",

        "county": "Garissa",

        "latitude": -0.453229,

        "longitude": 39.640129

    },


    "kitale": {

        "name": "Kitale",

        "county": "Trans Nzoia",

        "latitude": 1.01572,

        "longitude": 35.00622

    },


    "kakamega": {

        "name": "Kakamega",

        "county": "Kakamega",

        "latitude": 0.28273,

        "longitude": 34.75186

    },


    "machakos": {

        "name": "Machakos",

        "county": "Machakos",

        "latitude": -1.51768,

        "longitude": 37.26341

    },


    "meru": {

        "name": "Meru",

        "county": "Meru",

        "latitude": 0.04626,

        "longitude": 37.65587

    },


    "nyeri": {

        "name": "Nyeri",

        "county": "Nyeri",

        "latitude": -0.41694,

        "longitude": 36.95103

    },


    "malindi": {

        "name": "Malindi",

        "county": "Kilifi",

        "latitude": -3.21919,

        "longitude": 40.11689

    },


    "narok": {

        "name": "Narok",

        "county": "Narok",

        "latitude": -1.07829,

        "longitude": 35.86012

    },


    "turkana": {

        "name": "Turkana",

        "county": "Turkana",

        "latitude": 3.11667,

        "longitude": 35.6

    }

}





def get_location_coordinates(location: str):


    if not location:

        return None



    key = location.lower().strip()



    return KENYA_LOCATIONS.get(key)






def search_locations(query: str):


    if not query:

        return []



    query = query.lower()



    results = []



    for location in KENYA_LOCATIONS.values():


        if query in location["name"].lower():


            results.append(location)



    return results