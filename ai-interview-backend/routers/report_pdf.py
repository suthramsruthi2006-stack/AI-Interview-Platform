from fastapi import APIRouter
from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

router = APIRouter(
    prefix="/report",
    tags=["PDF Report"]
)

@router.get("/download")
def download_report():

    pdf_file = "interview_report.pdf"

    doc = SimpleDocTemplate(pdf_file)
    styles = getSampleStyleSheet()

    content = [
        Paragraph("AI Interview Report", styles["Title"]),
        Spacer(1, 20),
        Paragraph("Role: Data Analyst", styles["Normal"]),
        Paragraph("Technical Score: 8/10", styles["Normal"]),
        Paragraph("Communication Score: 7/10", styles["Normal"]),
        Paragraph("Overall Score: 8/10", styles["Normal"]),
        Paragraph("Feedback: Good Performance", styles["Normal"]),
    ]

    doc.build(content)

    return FileResponse(
        pdf_file,
        media_type="application/pdf",
        filename="Interview_Report.pdf"
    )