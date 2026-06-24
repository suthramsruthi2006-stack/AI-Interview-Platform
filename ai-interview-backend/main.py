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

# Create FastAPI App
app = FastAPI(
    title="AI Interview Platform API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporary fix for testing
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
import models
Base.metadata.create_all(bind=engine)

# Include Routers
app.include_router(auth.router)
app.include_router(resumes.router)
app.include_router(jobroles.router)
app.include_router(interviews.router)
app.include_router(reports.router)
app.include_router(report_pdf_router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Interview Platform"
    }

# Health Check Route
@app.get("/health")
def health():
    return {
        "status": "OK"
    }