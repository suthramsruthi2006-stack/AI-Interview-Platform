from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from routers import (
    auth,
    resumes,
    jobroles,
    interviews,
    reports
)

from routers.report_pdf import router as report_pdf_router

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",

        # Vercel Frontend
        "https://ai-interview-platform-lac-beta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
import models
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth.router)
app.include_router(resumes.router)
app.include_router(jobroles.router)
app.include_router(interviews.router)
app.include_router(reports.router)
app.include_router(report_pdf_router)


@app.get("/")
def home():
    return {
        "message": "AI Interview Platform"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }