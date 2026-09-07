import os


from fastapi import FastAPI


from fastapi.middleware.cors import CORSMiddleware




from backend.database.database import engine


from backend.database.models import Base




from backend.api.routes import router as api_router

from backend.api.history import router as history_router


from backend.auth.routes import router as auth_router


from backend.monitoring.scheduler import start_scheduler







# =====================================
# Environment Configuration
# =====================================


ENVIRONMENT = os.getenv(

    "ENVIRONMENT",

    "development"

)



FRONTEND_URL = os.getenv(

    "FRONTEND_URL",

    "http://localhost:5173"

)



# Allow multiple frontend URLs if needed

ADDITIONAL_FRONTENDS = os.getenv(

    "ADDITIONAL_FRONTENDS",

    ""

)







allowed_origins = [



    FRONTEND_URL,



    "http://localhost:5173",



    "http://127.0.0.1:5173"



]





if ADDITIONAL_FRONTENDS:



    allowed_origins.extend(

        [

            url.strip()

            for url in ADDITIONAL_FRONTENDS.split(",")

            if url.strip()

        ]

    )









# =====================================
# Initialize Database
# =====================================


Base.metadata.create_all(

    bind=engine

)









# =====================================
# Create FastAPI Application
# =====================================


app = FastAPI(


    title="SentinelAI",



    description=(

        "AI-powered environmental "

        "risk early warning platform "

        "for Kenya"

    ),



    version="1.0.0"

)









# =====================================
# CORS Configuration
# =====================================


app.add_middleware(



    CORSMiddleware,



    allow_origins=allowed_origins,



    allow_credentials=True,



    allow_methods=["*"],



    allow_headers=["*"]



)









# =====================================
# Register API Routes
# =====================================



app.include_router(

    auth_router

)



app.include_router(

    api_router

)



app.include_router(

    history_router

)









# =====================================
# Startup Events
# =====================================



@app.on_event("startup")

def startup_event():



    try:



        start_scheduler()



        print(

            "✅ SentinelAI scheduler started"

        )



        print(

            f"Environment: {ENVIRONMENT}"

        )



        print(

            f"Allowed frontend origins: {allowed_origins}"

        )



    except Exception as e:



        print(

            f"⚠ Scheduler startup failed: {e}"

        )









# =====================================
# Root Endpoint
# =====================================


@app.get("/")

def root():



    return {



        "system":

        "SentinelAI",



        "status":

        "running",



        "environment":

        ENVIRONMENT,



        "version":

        "1.0.0"



    }









# =====================================
# Health Endpoint
# =====================================


@app.get("/health")

def health():



    return {



        "status":

        "healthy",



        "database":

        "connected",



        "service":

        "SentinelAI API",



        "environment":

        ENVIRONMENT



    }