import os


from dotenv import load_dotenv



load_dotenv()







# =====================================
# Application Environment
# =====================================


ENVIRONMENT = os.getenv(

    "ENVIRONMENT",

    "development"

)









# =====================================
# Database Configuration
# =====================================


DATABASE_URL = os.getenv(

    "DATABASE_URL",

    "sqlite:///./sentinelai.db"

)









# =====================================
# Authentication Configuration
# =====================================


SECRET_KEY = os.getenv(

    "SECRET_KEY"

)





if not SECRET_KEY:



    if ENVIRONMENT == "production":


        raise ValueError(

            "SECRET_KEY environment variable is required in production"

        )


    else:


        SECRET_KEY = "development-secret-key"









ALGORITHM = os.getenv(

    "ALGORITHM",

    "HS256"

)









ACCESS_TOKEN_EXPIRE_MINUTES = int(


    os.getenv(


        "ACCESS_TOKEN_EXPIRE_MINUTES",


        "60"


    )

)









# =====================================
# Frontend Configuration
# =====================================


FRONTEND_URL = os.getenv(

    "FRONTEND_URL",

    "http://localhost:5173"

)









# =====================================
# External API Keys
# =====================================


OPENWEATHER_API_KEY = os.getenv(

    "OPENWEATHER_API_KEY",

    ""

)









# =====================================
# Debug Information
# =====================================


def get_settings():



    return {



        "environment":

        ENVIRONMENT,



        "database":

        DATABASE_URL.split(":")[0],



        "frontend":

        FRONTEND_URL



    }