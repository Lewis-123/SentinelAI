def send_email_alert(

    recipient,

    alert

):

    """
    Email notification service.

    Currently simulated.

    Later integrate:

    - SMTP
    - SendGrid
    - AWS SES

    """


    message = {


        "type": "email",


        "recipient": recipient,


        "subject":

        "SentinelAI Risk Alert",


        "body":

        alert["message"]

    }


    print(
        "EMAIL SENT:",
        message
    )


    return message