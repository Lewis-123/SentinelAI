from fastapi import FastAPI

from backend.api.routes import router



app = FastAPI(

    title="SentinelAI",

    description=
    "AI-powered community risk prediction system",

    version="1.0"

)



app.include_router(
    router
)



@app.get("/")
def home():

    return {

        "system":"SentinelAI",

        "status":"running"

    }