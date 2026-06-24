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


def evaluate_answer(question, answer):

    prompt = f"""
You are an expert technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON:

{{
    "technical_score": 0-10,
    "communication_score": 0-10,
    "feedback": "short feedback"
}}

If answer is irrelevant, wrong, blank, or too short like 's', 'ok', 'yes',
give very low scores.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    try:
        return json.loads(text)
    except:
        return {
            "technical_score": 0,
            "communication_score": 0,
            "feedback": "Unable to evaluate answer."
        }