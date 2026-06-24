import fitz
import re

latest_resume_data = {}

degree_map = {

    "MBA": [
        "Business Analyst",
        "Marketing Executive",
        "Finance Executive",
        "HR Executive"
    ],

    "B.Com": [
        "Accountant",
        "Finance Executive",
        "Banking Associate"
    ],

    "BBA": [
        "Business Development Executive",
        "Sales Executive"
    ],

    "BCA": [
        "Software Developer",
        "Web Developer"
    ],

    "MCA": [
        "Software Engineer",
        "Full Stack Developer"
    ],

    "B.Tech": [
        "Software Engineer",
        "System Engineer"
    ],

    "B.Sc": [
        "Data Analyst",
        "Research Assistant"
    ],

    "Mechanical": [
        "Mechanical Engineer",
        "Production Engineer"
    ],

    "Civil": [
        "Civil Engineer",
        "Site Engineer"
    ],

    "Electrical": [
        "Electrical Engineer",
        "Maintenance Engineer"
    ],

    "ITI": [
        "Technician",
        "Electrician",
        "Fitter",
        "Operator"
    ]
}

skill_job_map = {

    "Python": [
        "Python Developer",
        "Backend Developer"
    ],

    "Java": [
        "Java Developer"
    ],

    "SQL": [
        "Database Developer"
    ],

    "Machine Learning": [
        "ML Engineer",
        "AI Engineer"
    ],

    "Data Science": [
        "Data Scientist"
    ],

    "React": [
        "Frontend Developer"
    ],

    "Power BI": [
        "Business Analyst",
        "Data Analyst"
    ],

    "Financial Analysis": [
        "Financial Analyst"
    ],

    "Accounting": [
        "Accountant"
    ],

    "Marketing": [
        "Marketing Executive"
    ],

    "Recruitment": [
        "HR Executive"
    ],

    "Business Development": [
        "Business Development Associate"
    ],

    "PLC": [
        "Automation Engineer"
    ],

    "Power Systems": [
        "Electrical Engineer"
    ],

    "AutoCAD": [
        "Design Engineer"
    ],

    "Circuit Design": [
        "Electronics Engineer"
    ],

    "Electrical Wiring": [
        "Electrician"
    ],

    "Motor Rewinding": [
        "Electrical Technician"
    ],

    "Welding": [
        "Welder"
    ],

    "Lathe": [
        "Fitter"
    ]
}


def extract_resume_text(file_path):

    text = ""

    try:

        pdf = fitz.open(file_path)

        for page in pdf:
            text += page.get_text()

        pdf.close()

    except Exception as e:

        print("PDF ERROR:", e)

    return text


def extract_resume_data(text):

    global latest_resume_data

    qualifications = []
    skills = []
    jobs = set()

    lower_text = text.lower()

    for degree in degree_map:

        if re.search(
            r"\b" + re.escape(degree.lower()) + r"\b",
            lower_text
        ):

            qualifications.append(degree)

            jobs.update(
                degree_map[degree]
            )

    for skill in skill_job_map:

        if re.search(
            re.escape(skill),
            text,
            re.IGNORECASE
        ):

            skills.append(skill)

            jobs.update(
                skill_job_map[skill]
            )

    experience = len(
        re.findall(
            r"experience|intern|internship",
            text,
            re.IGNORECASE
        )
    )

    if len(jobs) == 0:

        jobs.add(
            "General Graduate Jobs"
        )

    latest_resume_data = {

        "qualification": qualifications,

        "skills": skills,

        "resume_text": text,

        "experience_score": experience,

        "recommended_jobs": list(jobs)

    }

    return latest_resume_data