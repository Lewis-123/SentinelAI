from apscheduler.schedulers.background import BackgroundScheduler


from backend.monitoring.monitor import (
    monitor_location
)





scheduler = BackgroundScheduler()





MONITORED_LOCATIONS = [

    "Nairobi",

    "Turkana",

    "Mombasa"

]





def start_scheduler():



    for location in MONITORED_LOCATIONS:


        scheduler.add_job(

            monitor_location,

            "interval",

            minutes=60,

            args=[location]

        )



    scheduler.start()