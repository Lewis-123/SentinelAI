from backend.notifications.email import (
    send_email_alert
)


from backend.notifications.sms import (
    send_sms_alert
)





def send_notification(

    alert,

    user

):


    """
    Sends alerts through
    configured channels.
    """



    results = []




    if user.get(

        "email"

    ):


        results.append(

            send_email_alert(

                user["email"],

                alert

            )

        )





    if user.get(

        "phone"

    ):


        results.append(

            send_sms_alert(

                user["phone"],

                alert

            )

        )




    return results