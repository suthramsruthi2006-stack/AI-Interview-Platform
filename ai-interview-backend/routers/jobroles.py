from fastapi import APIRouter
import ai_services.resume_parser as resume_parser

router = APIRouter(
    prefix="/jobroles",
    tags=["Job Roles"]
)


@router.get("/")
def get_roles():

    if not resume_parser.latest_resume_data:

        return {
            "success": False,
            "message": "Upload resume first"
        }

    return {
        "success": True,
        "qualification": resume_parser.latest_resume_data.get(
            "qualification",
            []
        ),
        "skills": resume_parser.latest_resume_data.get(
            "skills",
            []
        ),
        "recommended_jobs": resume_parser.latest_resume_data.get(
            "recommended_jobs",
            []
        ),
        "experience_score": resume_parser.latest_resume_data.get(
            "experience_score",
            0
        )
    }