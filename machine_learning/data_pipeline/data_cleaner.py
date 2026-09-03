import pandas as pd


def clean_dataset(df):

    """
    Basic cleaning operations.
    """

    # Remove duplicate records
    df = df.drop_duplicates()


    # Handle missing values
    df = df.fillna(0)


    return df