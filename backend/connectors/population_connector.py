# =====================================
# Population Data Connector
# =====================================


def fetch_population_data(location):


    """
    Population and density connector.

    Current MVP:
    Simulated Kenya population data.

    Future integrations:

    - Kenya Population Census
    - WorldPop
    - UN Population datasets
    - GIS population layers

    """



    population_data = {



        "Nairobi":

        {

            "population": 4397073,

            "density": 6693

        },



        "Mombasa":

        {

            "population": 1208333,

            "density": 4292

        },



        "Kisumu":

        {

            "population": 610082,

            "density": 609

        },



        "Nakuru":

        {

            "population": 570674,

            "density": 642

        },



        "Kakamega":

        {

            "population": 1969000,

            "density": 650

        },



        "Kiambu":

        {

            "population": 2417735,

            "density": 952

        },



        "Narok":

        {

            "population": 1157873,

            "density": 43

        },



        "Turkana":

        {

            "population": 926976,

            "density": 7

        },



        "Garissa":

        {

            "population": 163399,

            "density": 10

        },



        "Marsabit":

        {

            "population": 459785,

            "density": 5

        }



    }





    location_name = location.strip().title()





    if location_name in population_data:


        return population_data[location_name]





    # Default values

    return {


        "population":500000,


        "density":50

    }