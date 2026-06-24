import google.generativeai as genai

genai.configure(
    api_key="PASTE_NEW_KEY_HERE"
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

response = model.generate_content(
    "Generate 3 interview questions for Power BI."
)

print(response.text)