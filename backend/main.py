from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


from backend.api.routes import router as api_router

from backend.auth.routes import router as auth_router


from backend.monitoring.scheduler import start_scheduler





app = FastAPI(

    title="SentinelAI",

    description=(
        "AI-powered environmental and social "
        "risk early warning system"
    ),

    version="1.0.0"

)





# ==================================
# CORS Configuration
# ==================================


app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "http://127.0.0.1:5173"

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)





# ==================================
# Register API Routers
# ==================================


app.include_router(

    api_router

)



app.include_router(

    auth_router

)





# ==================================
# Application Startup
# ==================================


@app.on_event("startup")
def startup_event():

    """
    Start background monitoring system.

    Runs scheduled risk checks.
    """

    start_scheduler()





# ==================================
# Root Endpoint
# ==================================


@app.get("/")
def home():

    return {


        "system":

        "SentinelAI",



        "status":

        "running",



        "message":

        "AI risk monitoring platform operational"

    }





# ==================================
# Health Check
# ==================================


@app.get("/health")
def health_check():

    return {


        "status":

        "healthy",



        "service":

        "SentinelAI API"

    }