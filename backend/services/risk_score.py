def calculate_risk_score(

    features,

    prediction_probability

):

    """
    Converts ML probability + environmental
    indicators into a 0-100 risk score.
    """



    score = 0



    # Model confidence contribution

    score += (

        prediction_probability * 50

    )




    # Environmental stress


    if features.get("ndvi", 1) < 0.3:

        score += 15



    if features.get("rainfall_anomaly", 0) < -20:

        score += 15



    if features.get("temperature", 0) > 35:

        score += 10




    # Social vulnerability


    if features.get("poverty_rate", 0) > 60:

        score += 10




    # Limit between 0 and 100

    score = min(

        round(score),

        100

    )



    return score





def classify_risk(score):


    if score >= 70:

        return "HIGH"



    elif score >= 40:

        return "MEDIUM"



    else:

        return "LOW"