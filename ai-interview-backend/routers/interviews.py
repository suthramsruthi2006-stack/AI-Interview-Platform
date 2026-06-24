from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from ai_services.question_generator import generate_questions
from ai_services.answer_evaluator import evaluate_answers
import ai_services.resume_parser as resume_parser

from models.report import Report

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


class InterviewRequest(BaseModel):
    role: str


class InterviewSubmission(BaseModel):
    role: str
    questions: list
    answers: list


@router.post("/start")
def start_interview(data: InterviewRequest):

    if not resume_parser.latest_resume_data:
        raise HTTPException(
            status_code=400,
            detail="Upload resume first"
        )

    questions = generate_questions(
        resume_parser.latest_resume_data["qualification"],
        resume_parser.latest_resume_data["skills"],
        resume_parser.latest_resume_data["experience_score"],
        resume_parser.latest_resume_data["resume_text"],
        data.role
    )

    return {
        "status": "Interview Started",
        "selected_role": data.role,
        "questions": questions
    }


@router.post("/evaluate")
def evaluate_interview(
    data: InterviewSubmission,
    db: Session = Depends(get_db)
):

    result = evaluate_answers(
        data.questions,
        data.answers
    )

    report = {
        "role": data.role,
        "technical_score": result.get(
            "technical_score", 0
        ),
        "communication_score": result.get(
            "communication_score", 0
        ),
        "overall_score": result.get(
            "overall_score", 0
        ),
        "feedback": result.get(
            "feedback",
            "Evaluation completed."
        )
    }

    db_report = Report(
        role=report["role"],
        technical_score=report["technical_score"],
        communication_score=report["communication_score"],
        overall_score=report["overall_score"],
        feedback=report["feedback"]
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return report


@router.get("/reports")
def get_reports(
    db: Session = Depends(get_db)
):

    reports = db.query(Report).all()

    return {
        "reports": reports
    }