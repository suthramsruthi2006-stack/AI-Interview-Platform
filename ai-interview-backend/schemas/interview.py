from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ai_services.question_generator import generate_questions
import ai_services.resume_parser as resume_parser

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


class InterviewRequest(BaseModel):
    role: str


class InterviewSubmission(BaseModel):
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
def evaluate_interview(data: InterviewSubmission):

    total_answers = len(data.answers)

    answered = 0

    for answer in data.answers:
        if answer.strip():
            answered += 1

    if answered == 0:

        return {
            "technical_score": 0,
            "communication_score": 0,
            "overall_score": 0,
            "feedback": "Candidate did not answer any questions."
        }

    score = round((answered / total_answers) * 10)

    return {
        "technical_score": score,
        "communication_score": score,
        "overall_score": score,
        "feedback": "Interview completed successfully."
    }