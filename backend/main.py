from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware



from backend.api.routes import router as api_router

from backend.auth.routes import router as auth_router





app = FastAPI(

    title="SentinelAI",

    description="AI-powered environmental and social risk early warning system",

    version="1.0.0"

)





# ==========================
# CORS Configuration
# ==========================

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





# ==========================
# Register API Routes
# ==========================


app.include_router(

    api_router

)



# Authentication routes

app.include_router(

    auth_router

)





# ==========================
# Root Endpoint
# ==========================


@app.get("/")

def home():

    return {


        "system":

        "SentinelAI",


        "status":

        "running",


        "message":

        "AI environmental risk platform operational"

    }





# ==========================
# Health Check
# ==========================


@app.get("/health")

def health_check():

    return {


        "status":

        "healthy"


    }