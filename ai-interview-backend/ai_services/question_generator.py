import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_questions(
    qualification,
    skills,
    experience,
    resume_text,
    role
):

    prompt = f"""
You are an expert interviewer.

Selected Role:
{role}

Resume Content:
{resume_text}

Qualification:
{qualification}

Skills:
{skills}

Experience:
{experience}

Generate exactly 10 interview questions.

Rules:
1. Questions must be specific to the role: {role}
2. Use information from the resume.
3. Include technical questions.
4. Include scenario-based questions.
5. Include project-based questions.
6. One question per line.
7. No headings.
8. No explanations.
9. No markdown.
10. Return only questions.
"""

    try:

        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:

            questions = []

            for q in response.text.split("\n"):

                q = q.strip()

                if not q:
                    continue

                if "here are" in q.lower():
                    continue

                questions.append(q)

            return questions[:10]

        return []

    except Exception as e:

        print(f"Gemini Error: {e}")

        return [
            f"Why are you interested in the {role} role?",
            f"What skills make you suitable for {role}?",
            f"Describe a project related to {role}.",
            f"What challenges have you faced in your projects?",
            f"How would you solve a real-world problem as a {role}?",
            f"What tools are commonly used in {role}?",
            f"Explain one technical concept related to {role}.",
            f"How do you keep your skills updated for {role}?",
            f"What are your strengths for this role?",
            f"Where do you see yourself in five years?"
        ]