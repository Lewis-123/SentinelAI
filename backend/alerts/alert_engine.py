from datetime import datetime



def generate_alert(
    prediction,
    location="Unknown"
):


    risk_level = prediction["risk_level"]



    severity_map = {


        "LOW":
        "NORMAL",


        "MEDIUM":
        "WARNING",


        "HIGH":
        "CRITICAL"

    }



    severity = severity_map.get(

        risk_level,

        "UNKNOWN"

    )



    message_map = {


        "LOW":
        "Community conditions are stable",


        "MEDIUM":
        "Potential risk detected. Monitoring recommended",


        "HIGH":
        "Immediate attention required. High vulnerability detected"

    }



    return {


        "location":
        location,


        "risk_level":
        risk_level,


        "severity":
        severity,


        "message":
        message_map.get(

            risk_level,

            "Unknown risk"

        ),


        "timestamp":
        datetime.utcnow().isoformat()

    }