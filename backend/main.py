from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware



from backend.database.database import engine

from backend.database.models import Base



from backend.api.routes import router as api_router

from backend.api.history import router as history_router


from backend.auth.routes import router as auth_router


from backend.monitoring.scheduler import start_scheduler





# =====================================
# Initialize Database Tables
# =====================================

Base.metadata.create_all(

    bind=engine

)





# =====================================
# Create Application
# =====================================

app = FastAPI(

    title="SentinelAI",

    description=(

        "AI-powered environmental "

        "risk early warning platform"

    ),

    version="1.0.0"

)





# =====================================
# CORS Configuration
# =====================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "http://127.0.0.1:5173"

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)







# =====================================
# Register API Routers
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
# Startup Services
# =====================================


@app.on_event("startup")
def startup_event():


    start_scheduler()







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



        "version":

        "1.0.0"

    }








# =====================================
# Health Check
# =====================================


@app.get("/health")
def health():


    return {


        "status":

        "healthy",



        "database":

        "connected",



        "service":

        "SentinelAI API"

    }