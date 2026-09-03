from fastapi import FastAPI


app = FastAPI(
    title="SentinelAI API",
    description="AI-powered community risk prediction API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "system": "SentinelAI",
        "status": "online"
    }