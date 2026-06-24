import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def evaluate_answers(
    questions,
    answers
):

    prompt = f"""
You are an expert technical interviewer.

Interview Questions:
{questions}

Candidate Answers:
{answers}

Evaluate all answers together.

Return ONLY valid JSON.

{{
    "technical_score": 8,
    "communication_score": 7,
    "overall_score": 8,
    "feedback": "Good understanding of concepts.",

    "strengths": [
        "Good Python fundamentals",
        "Clear communication"
    ],

    "improvements": [
        "Improve SQL concepts",
        "Provide more detailed answers"
    ],

    "recommended_topics": [
        "SQL",
        "DBMS",
        "Pandas"
    ]
}}
"""

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text.strip()

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        result = json.loads(text)

        return {
            "technical_score":
                result.get(
                    "technical_score",
                    0
                ),

            "communication_score":
                result.get(
                    "communication_score",
                    0
                ),

            "overall_score":
                result.get(
                    "overall_score",
                    0
                ),

            "feedback":
                result.get(
                    "feedback",
                    ""
                ),

            "strengths":
                result.get(
                    "strengths",
                    []
                ),

            "improvements":
                result.get(
                    "improvements",
                    []
                ),

            "recommended_topics":
                result.get(
                    "recommended_topics",
                    []
                )
        }

    except Exception as e:

        print(
            "Evaluation Error:",
            str(e)
        )

        return {
            "technical_score": 0,
            "communication_score": 0,
            "overall_score": 0,
            "feedback":
                f"Evaluation failed: {str(e)}",
            "strengths": [],
            "improvements": [],
            "recommended_topics": []
        }