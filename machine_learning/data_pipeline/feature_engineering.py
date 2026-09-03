import pandas as pd


def create_features(df):

    """
    Create ML features
    """

    features = df.copy()


    # Example:
    # rainfall intensity
    if "rainfall" in features.columns:

        features["rainfall_risk"] = (
            features["rainfall"] /
            features["rainfall"].max()
        )


    return features