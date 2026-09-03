def send_sms_alert(

    phone_number,

    alert

):

    """
    SMS notification service.

    Currently simulated.

    Later integrate:

    - Twilio
    - Africa's Talking
    - AWS SNS

    """


    message = {


        "type": "sms",


        "phone":

        phone_number,


        "message":

        alert["message"]

    }


    print(

        "SMS SENT:",

        message

    )


    return message