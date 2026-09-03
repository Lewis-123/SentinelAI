from machine_learning.pipeline.feature_builder import build_features

from backend.services.prediction import predict_risk



def run_risk_pipeline(
    weather,
    population,
    satellite
):


    features = build_features(

        weather,

        population,

        satellite

    )



    prediction = predict_risk(

        features.iloc[0].to_dict()

    )



    return {

        "risk_score": prediction

    }