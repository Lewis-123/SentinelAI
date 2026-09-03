"""
SentinelAI Data Loader

Responsible for loading and preparing
risk assessment datasets.
"""


import pandas as pd
from pathlib import Path


BASE_PATH = Path("../../data")


def load_dataset(file_path):
    """
    Load CSV dataset.
    """

    path = BASE_PATH / file_path

    if not path.exists():
        raise FileNotFoundError(
            f"Dataset not found: {path}"
        )

    return pd.read_csv(path)



def check_dataset(df):
    """
    Basic dataset information.
    """

    print("Dataset Shape:")
    print(df.shape)

    print("\nColumns:")
    print(df.columns)

    print("\nMissing Values:")
    print(df.isnull().sum())