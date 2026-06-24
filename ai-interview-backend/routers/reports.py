from fastapi import APIRouter
from database import SessionLocal
from models.report import Report

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/stats")
def get_stats():

    db = SessionLocal()

    try:

        reports = db.query(Report).all()

        if not reports:
            return {
                "total_interviews": 0,
                "average_score": 0,
                "highest_score": 0,
                "lowest_score": 0
            }

        scores = [
            report.overall_score
            for report in reports
        ]

        return {
            "total_interviews": len(scores),
            "average_score": round(
                sum(scores) / len(scores),
                2
            ),
            "highest_score": max(scores),
            "lowest_score": min(scores)
        }

    finally:
        db.close()


@router.get("/history")
def get_history():

    db = SessionLocal()

    try:

        reports = db.query(Report).all()

        history = []

        for report in reports:

            history.append({
                "id": report.id,
                "role": report.role,
                "technical_score":
                    report.technical_score,
                "communication_score":
                    report.communication_score,
                "overall_score":
                    report.overall_score,
                "feedback":
                    report.feedback
            })

        return {
            "reports": history
        }

    finally:
        db.close()


@router.get("/all")
def get_all_reports():

    db = SessionLocal()

    try:

        reports = db.query(Report).all()

        result = []

        for report in reports:

            result.append({
                "id": report.id,
                "role": report.role,
                "technical_score":
                    report.technical_score,
                "communication_score":
                    report.communication_score,
                "overall_score":
                    report.overall_score,
                "feedback":
                    report.feedback
            })

        return {
            "reports": result
        }

    finally:
        db.close()