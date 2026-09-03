"""
Creates initial risk labels
for supervised learning.
"""


def calculate_risk(row):


    score = 0


    # drought indicator
    if row["rainfall"] < 100:
        score += 2


    # extreme temperature
    if row["temperature"] > 35:
        score += 1


    # vulnerability
    if row["poverty_rate"] > 50:
        score += 2



    if score >= 4:
        return "HIGH"


    elif score >= 2:
        return "MEDIUM"


    else:
        return "LOW"