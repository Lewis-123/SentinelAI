from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


from backend.api.routes import router


from backend.database.connection import engine

from backend.database.models import Base



Base.metadata.create_all(
    bind=engine
)



app = FastAPI(

    title="SentinelAI",

    version="1.0"

)



app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

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