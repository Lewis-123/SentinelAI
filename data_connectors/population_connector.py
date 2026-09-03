import pandas as pd



def load_population_data(
    filepath
):


    population = pd.read_csv(
        filepath
    )


    return population